"""
Suzlab Colab - Main Production FastAPI Application (colab.suzlab.com)
Deployed on Railway with extreme RAM optimization (< 150MB footprint).
Integrates google-colab-cli, WebSockets, and @Colab_lab_bot Telemetry.
"""
import os
import sys
import json
import uuid
import time
import asyncio
import hashlib
import logging
from typing import Dict, Any, Optional, List
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect, Depends, Header, Request, status
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

import database
import colab_manager

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("suzlab.main")

# In-memory WebSocket connection manager for live telemetry
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, machine_code: str, websocket: WebSocket):
        await websocket.accept()
        code = machine_code.upper()
        if code not in self.active_connections:
            self.active_connections[code] = []
        self.active_connections[code].append(websocket)

    def disconnect(self, machine_code: str, websocket: WebSocket):
        code = machine_code.upper()
        if code in self.active_connections and websocket in self.active_connections[code]:
            self.active_connections[code].remove(websocket)

    async def broadcast(self, machine_code: str, message: dict):
        code = machine_code.upper()
        if code in self.active_connections:
            for connection in list(self.active_connections[code]):
                try:
                    await connection.send_json(message)
                except Exception:
                    self.disconnect(code, connection)

ws_manager = ConnectionManager()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize SQLite WAL DB and spawn Keep-Alive Daemon
    database.init_db()
    keep_alive_task = asyncio.create_task(colab_manager.keep_alive_daemon())
    logger.info("Suzlab Colab platform ready on Railway.")
    yield
    # Shutdown
    keep_alive_task.cancel()

app = FastAPI(title="Suzlab Colab SaaS", version="2.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Helper Security & Auth ---

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

def verify_token(authorization: Optional[str] = Header(None)) -> Dict[str, Any]:
    if not authorization or not authorization.startswith("Bearer "):
        # Return default demo user for public previews if not signed in
        demo_user = database.get_user_by_username("demo_user")
        if not demo_user:
            demo_user = database.create_user("usr_demo_001", "demo@suzlab.com", "demo_user", hash_password("demo123"))
        return demo_user
    token = authorization.replace("Bearer ", "").strip()
    # Token is user_id for lightweight design
    user = database.get_user_by_id(token)
    if not user:
        raise HTTPException(status_code=401, detail="Phiên đăng nhập không hợp lệ hoặc đã hết hạn")
    return user

# --- Pydantic Request Models ---

class RegisterRequest(BaseModel):
    email: str
    username: str
    password: str

class LoginRequest(BaseModel):
    login: str  # email or username
    password: str

class GoogleAuthRequest(BaseModel):
    email: str
    name: str

class ColabVerifyAuthRequest(BaseModel):
    auth_code: str

class StartLabRequest(BaseModel):
    hardware_type: str = "GPU T4"
    high_mem: bool = False
    tunnel_mode: str = "bore"  # "bore", "web_tty", "ngrok"
    ngrok_token: Optional[str] = ""
    ssh_password: Optional[str] = "123456"

class CreateSSHUserRequest(BaseModel):
    username: str
    password: str

class ChangeSSHPasswordRequest(BaseModel):
    username: str  # specific username or "ALL"
    new_password: str

class TerminalExecRequest(BaseModel):
    command: str

class TelemetryWebhookPayload(BaseModel):
    machine_code: str
    event_type: str
    uptime_seconds: Optional[int] = 0
    ram_usage: Optional[str] = None
    disk_usage: Optional[str] = None
    ssh_host: Optional[str] = None
    ssh_port: Optional[int] = None
    ssh_users: Optional[List[Dict[str, str]]] = None
    paired_telegram: Optional[Dict[str, Any]] = None
    custom: Optional[Dict[str, Any]] = None

# --- REST Endpoints ---

@app.post("/api/v1/auth/register")
def register(req: RegisterRequest):
    if database.get_user_by_email(req.email):
        raise HTTPException(status_code=400, detail="Email này đã được đăng ký trên hệ thống Suzlab")
    if database.get_user_by_username(req.username):
        raise HTTPException(status_code=400, detail="Tên người dùng này đã tồn tại")
    
    user_id = f"usr_{uuid.uuid4().hex[:12]}"
    user = database.create_user(user_id, req.email, req.username, hash_password(req.password))
    return {"token": user["id"], "user": user}

@app.post("/api/v1/auth/login")
def login(req: LoginRequest):
    user = database.get_user_by_email(req.login) or database.get_user_by_username(req.login)
    if not user or user["password_hash"] != hash_password(req.password):
        raise HTTPException(status_code=401, detail="Sai tài khoản hoặc mật khẩu")
    return {"token": user["id"], "user": user}

@app.post("/api/v1/auth/google")
def google_auth(req: GoogleAuthRequest):
    user = database.get_user_by_email(req.email)
    if not user:
        clean_user = req.email.split("@")[0] + "_" + uuid.uuid4().hex[:4]
        user_id = f"usr_{uuid.uuid4().hex[:12]}"
        user = database.create_user(user_id, req.email, clean_user, hash_password(uuid.uuid4().hex))
    return {"token": user["id"], "user": user}

@app.get("/api/v1/auth/me")
def get_current_user(user: Dict[str, Any] = Depends(verify_token)):
    session = database.get_session_by_user_id(user["id"])
    return {
        "user": user,
        "has_active_session": session is not None and session.get("status") == "online",
        "session": session
    }

# --- Google Colab OAuth2 Link Endpoints ---

@app.get("/api/v1/colab/oauth-url")
def get_colab_oauth_url():
    """
    Standard OAuth2 URL used by google-colab-cli with required 4 scopes:
    openid, email, colaboratory, cloud-platform
    """
    scopes = [
        "openid",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/colaboratory",
        "https://www.googleapis.com/auth/cloud-platform"
    ]
    scope_str = "%20".join(scopes)
    client_id = "32555940559.apps.googleusercontent.com" # Google Cloud SDK default public client ID
    redirect_uri = "https://sdk.cloud.google.com/applicationdefaultauthcode.html"
    
    url = (
        f"https://accounts.google.com/o/oauth2/auth?"
        f"response_type=code&"
        f"client_id={client_id}&"
        f"redirect_uri={redirect_uri}&"
        f"scope={scope_str}&"
        f"state=suzlab_colab_auth&"
        f"access_type=offline&"
        f"prompt=consent"
    )
    return {"url": url, "scopes": scopes, "redirect_uri": redirect_uri}

@app.post("/api/v1/colab/verify-auth")
async def verify_colab_auth(req: ColabVerifyAuthRequest, user: Dict[str, Any] = Depends(verify_token)):
    user_id = user["id"]
    code = req.auth_code.strip()
    if not code:
        raise HTTPException(status_code=400, detail="Mã xác thực Google không được để trống")
    
    # Store token in isolated user config directory
    user_dir = colab_manager.get_user_dir(user_id)
    token_file = colab_manager.get_token_path(user_id)
    with open(token_file, "w") as f:
        json.dump({"auth_code": code, "linked_at": time.time()}, f)
    
    # Check identity and CCU usage via CLI
    identity = await colab_manager.check_identity_and_usage(user_id)
    return {
        "success": True,
        "message": "Liên kết tài khoản Google Colab thành công!",
        "identity": identity
    }

# --- Colab Lifecycle Endpoints ---

@app.get("/api/v1/colab/status")
async def get_colab_status(user: Dict[str, Any] = Depends(verify_token)):
    session = database.get_session_by_user_id(user["id"])
    return {
        "user_id": user["id"],
        "colab_connected": bool(user.get("colab_connected")),
        "colab_email": user.get("colab_email"),
        "ccu_balance": user.get("ccu_balance", 100.0),
        "ccu_rate": user.get("ccu_rate", 0.0),
        "session": session
    }

@app.post("/api/v1/colab/start")
async def start_colab(req: StartLabRequest, user: Dict[str, Any] = Depends(verify_token)):
    """
    Start or re-attach to the user's single Google Colab session.
    Strictly locked: 1 account = 1 session max.
    """
    user_id = user["id"]
    # Check if already running
    existing = database.get_session_by_user_id(user_id)
    if existing and existing.get("status") == "online":
        return {
            "status": "already_running",
            "message": "Tài khoản của bạn đã có 1 máy Colab đang chạy. Đã gắn kết lại phiên hiện tại.",
            "session": existing
        }
    
    # Start session
    session = await colab_manager.start_lab(
        user_id=user_id,
        hardware_type=req.hardware_type,
        high_mem=req.high_mem,
        tunnel_mode=req.tunnel_mode,
        ngrok_token=req.ngrok_token or "",
        ssh_password=req.ssh_password or "123456"
    )
    return {"status": "success", "session": session}

@app.post("/api/v1/colab/stop")
async def stop_colab(user: Dict[str, Any] = Depends(verify_token)):
    user_id = user["id"]
    session = database.get_session_by_user_id(user_id)
    if not session:
        return {"status": "no_session", "message": "Không tìm thấy máy ảo đang hoạt động"}
    
    machine_code = session["machine_code"]
    await colab_manager.stop_lab(user_id)
    # Broadcast stop via WebSocket
    await ws_manager.broadcast(machine_code, {"type": "session_stopped", "machine_code": machine_code})
    return {"status": "stopped", "message": f"Đã giải phóng máy ảo [{machine_code}] thành công"}

@app.post("/api/v1/colab/restart-kernel")
async def restart_colab_kernel(user: Dict[str, Any] = Depends(verify_token)):
    user_id = user["id"]
    ok = await colab_manager.restart_kernel(user_id)
    return {"status": "success" if ok else "failed"}

# --- SSH User Management ---

@app.post("/api/v1/colab/users/create")
async def create_user_ssh(req: CreateSSHUserRequest, user: Dict[str, Any] = Depends(verify_token)):
    user_id = user["id"]
    session = database.get_session_by_user_id(user_id)
    if not session or session.get("status") != "online":
        raise HTTPException(status_code=400, detail="Máy Colab chưa được bật")
    
    clean_user = "".join(c for c in req.username if c.isalnum() or c in "_-")
    # Command to add user
    cmd = f"id -u {clean_user} &>/dev/null || useradd -m -s /bin/bash {clean_user} && echo '{clean_user}:{req.password}' | chpasswd && usermod -aG sudo {clean_user}"
    await colab_manager.run_colab_cli(user_id, ["exec", "-s", "suzlab_main", "--", "bash", "-c", cmd])
    
    users = session.get("ssh_users", [])
    if not any(u["username"] == clean_user for u in users):
        users.append({"username": clean_user, "role": "sudo", "created_at": time.strftime("%H:%M:%S")})
    
    database.update_session_telemetry(machine_code=session["machine_code"], ssh_users=users)
    await ws_manager.broadcast(session["machine_code"], {"type": "users_updated", "users": users})
    return {"status": "success", "users": users}

@app.post("/api/v1/colab/users/change-password")
async def change_password_ssh(req: ChangeSSHPasswordRequest, user: Dict[str, Any] = Depends(verify_token)):
    user_id = user["id"]
    session = database.get_session_by_user_id(user_id)
    if not session or session.get("status") != "online":
        raise HTTPException(status_code=400, detail="Máy Colab chưa được bật")
    
    users = session.get("ssh_users", [])
    if req.username == "ALL":
        for u in users:
            cmd = f"echo '{u['username']}:{req.new_password}' | chpasswd"
            await colab_manager.run_colab_cli(user_id, ["exec", "-s", "suzlab_main", "--", "bash", "-c", cmd])
    else:
        cmd = f"echo '{req.username}:{req.new_password}' | chpasswd"
        await colab_manager.run_colab_cli(user_id, ["exec", "-s", "suzlab_main", "--", "bash", "-c", cmd])
        
    return {"status": "success", "message": f"Đã cập nhật mật khẩu mới cho {req.username}"}

# --- Web Terminal Direct Exec ---

@app.post("/api/v1/terminal/exec")
async def terminal_exec(req: TerminalExecRequest, user: Dict[str, Any] = Depends(verify_token)):
    user_id = user["id"]
    session = database.get_session_by_user_id(user_id)
    if not session or session.get("status") != "online":
        return {"stdout": "", "stderr": "Lỗi: Máy Colab chưa khởi chạy hoặc đang offline.", "code": 1}
    
    cmd = req.command.strip()
    # Execute bash command safely via colab CLI
    code, stdout, stderr = await colab_manager.run_colab_cli(user_id, ["exec", "-s", "suzlab_main", "--", "bash", "-c", cmd], timeout=30)
    return {"stdout": stdout, "stderr": stderr, "code": code}

# --- Telemetry Webhook (Called by agent running in Colab RAM) ---

@app.post("/api/v1/telemetry")
async def receive_telemetry(payload: TelemetryWebhookPayload):
    machine_code = payload.machine_code.upper()
    database.update_session_telemetry(
        machine_code=machine_code,
        ram_usage=payload.ram_usage,
        disk_usage=payload.disk_usage,
        uptime_seconds=payload.uptime_seconds,
        ssh_host=payload.ssh_host,
        ssh_port=payload.ssh_port,
        ssh_users=payload.ssh_users,
        paired_telegram=payload.paired_telegram,
        status="online" if payload.event_type != "stopped" else "stopped"
    )
    # Broadcast to connected web clients
    await ws_manager.broadcast(machine_code, {
        "type": "telemetry",
        "data": payload.dict()
    })
    return {"ok": True}

# --- Telemetry WebSocket ---

@app.websocket("/ws/telemetry/{machine_code}")
async def websocket_telemetry(websocket: WebSocket, machine_code: str):
    await ws_manager.connect(machine_code, websocket)
    try:
        # Send initial snapshot
        session = database.get_session_by_machine_code(machine_code)
        if session:
            await websocket.send_json({"type": "initial_state", "session": session})
        while True:
            # Keep socket alive
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        ws_manager.disconnect(machine_code, websocket)

# --- Serve SPA / Static / Fallback ---

@app.get("/health")
def health():
    return {"status": "ok", "platform": "Suzlab Colab", "uptime": time.time()}

# Mount assets directory if dist/assets exists
if os.path.exists("dist/assets"):
    app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")

def get_spa_html():
    if os.path.exists("templates/index.html"):
        return FileResponse("templates/index.html")
    if os.path.exists("dist/index.html"):
        return FileResponse("dist/index.html")
    if os.path.exists("index.html"):
        return FileResponse("index.html")
    return HTMLResponse("<h1>Suzlab Colab</h1><p>Hệ thống đang khởi động...</p>")

@app.get("/")
async def serve_root():
    return get_spa_html()

@app.get("/{full_path:path}")
async def serve_spa_fallback(full_path: str):
    # Exclude API and WebSocket routes
    if full_path.startswith("api/") or full_path.startswith("ws/") or full_path == "health":
        raise HTTPException(status_code=404, detail="API route not found")
    
    # Check if a static file exists in dist
    static_file = os.path.join("dist", full_path)
    if os.path.exists(static_file) and os.path.isfile(static_file):
        return FileResponse(static_file)
        
    return get_spa_html()

