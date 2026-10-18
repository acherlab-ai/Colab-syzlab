"""
Suzlab Colab - Database Module (SQLite WAL)
Lightweight, zero-overhead relational storage designed for Railway deployments (<150MB RAM target).
"""
import sqlite3
import os
import json
import logging
from typing import Optional, Dict, Any, List

logger = logging.getLogger("suzlab.db")

DB_PATH = os.environ.get("SUZLAB_DB_PATH", "suzlab_colab.db")

def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    # Enable WAL mode for high concurrency & low memory footprint
    conn.execute("PRAGMA journal_mode = WAL;")
    conn.execute("PRAGMA synchronous = NORMAL;")
    conn.execute("PRAGMA cache_size = -4000;") # ~4MB cache
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Users Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        tier TEXT DEFAULT 'free',
        colab_connected INTEGER DEFAULT 0,
        colab_email TEXT DEFAULT '',
        ccu_balance REAL DEFAULT 100.0,
        ccu_rate REAL DEFAULT 0.0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Colab Sessions Table - Enforce Single-Session Lock (user_id is UNIQUE)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS colab_sessions (
        user_id TEXT PRIMARY KEY,
        session_name TEXT DEFAULT 'suzlab_main',
        machine_code TEXT UNIQUE NOT NULL,
        hardware_type TEXT NOT NULL,
        tunnel_mode TEXT NOT NULL,
        status TEXT DEFAULT 'starting',
        ssh_host TEXT DEFAULT '',
        ssh_port INTEGER DEFAULT 0,
        ssh_users_json TEXT DEFAULT '[]',
        ram_usage TEXT DEFAULT '0 / 12.7 GB (0%)',
        disk_usage TEXT DEFAULT '0 / 107.7 GB (0%)',
        uptime_seconds INTEGER DEFAULT 0,
        paired_telegram_json TEXT DEFAULT '{}',
        colab_notebook_url TEXT DEFAULT '',
        last_heartbeat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Telemetry Log Table (last 100 logs per session)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS telemetry_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        machine_code TEXT NOT NULL,
        event_type TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    conn.commit()
    conn.close()
    logger.info("Suzlab SQLite database initialized in WAL mode.")

# --- Helper Query Functions ---

def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email = ? COLLATE NOCASE", (email,))
    row = cur.fetchone()
    conn.close()
    return dict(row) if row else None

def get_user_by_username(username: str) -> Optional[Dict[str, Any]]:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE username = ? COLLATE NOCASE", (username,))
    row = cur.fetchone()
    conn.close()
    return dict(row) if row else None

def get_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    row = cur.fetchone()
    conn.close()
    return dict(row) if row else None

def create_user(user_id: str, email: str, username: str, password_hash: str) -> Dict[str, Any]:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO users (id, email, username, password_hash) VALUES (?, ?, ?, ?)",
        (user_id, email, username, password_hash)
    )
    conn.commit()
    conn.close()
    return get_user_by_id(user_id) # type: ignore

def update_user_colab_status(user_id: str, connected: bool, colab_email: str, ccu_balance: float = 100.0, ccu_rate: float = 0.0):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "UPDATE users SET colab_connected = ?, colab_email = ?, ccu_balance = ?, ccu_rate = ? WHERE id = ?",
        (1 if connected else 0, colab_email, ccu_balance, ccu_rate, user_id)
    )
    conn.commit()
    conn.close()

def get_session_by_user_id(user_id: str) -> Optional[Dict[str, Any]]:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM colab_sessions WHERE user_id = ?", (user_id,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    data = dict(row)
    data["ssh_users"] = json.loads(data.get("ssh_users_json") or "[]")
    data["paired_telegram"] = json.loads(data.get("paired_telegram_json") or "{}")
    return data

def get_session_by_machine_code(machine_code: str) -> Optional[Dict[str, Any]]:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM colab_sessions WHERE machine_code = ?", (machine_code.upper(),))
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    data = dict(row)
    data["ssh_users"] = json.loads(data.get("ssh_users_json") or "[]")
    data["paired_telegram"] = json.loads(data.get("paired_telegram_json") or "{}")
    return data

def save_or_update_session(
    user_id: str,
    machine_code: str,
    hardware_type: str,
    tunnel_mode: str,
    status: str = "starting",
    ssh_host: str = "",
    ssh_port: int = 0,
    ssh_users: Optional[List[Dict[str, str]]] = None,
    colab_notebook_url: str = ""
):
    conn = get_connection()
    cur = conn.cursor()
    ssh_users_json = json.dumps(ssh_users or [{"username": "colab", "role": "root", "created_at": "Khởi tạo"}])
    cur.execute("""
    INSERT INTO colab_sessions (
        user_id, machine_code, hardware_type, tunnel_mode, status, ssh_host, ssh_port, ssh_users_json, colab_notebook_url, last_heartbeat
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id) DO UPDATE SET
        machine_code = excluded.machine_code,
        hardware_type = excluded.hardware_type,
        tunnel_mode = excluded.tunnel_mode,
        status = excluded.status,
        ssh_host = excluded.ssh_host,
        ssh_port = excluded.ssh_port,
        ssh_users_json = excluded.ssh_users_json,
        colab_notebook_url = excluded.colab_notebook_url,
        last_heartbeat = CURRENT_TIMESTAMP
    """, (user_id, machine_code, hardware_type, tunnel_mode, status, ssh_host, ssh_port, ssh_users_json, colab_notebook_url))
    conn.commit()
    conn.close()

def update_session_telemetry(
    machine_code: str,
    ram_usage: Optional[str] = None,
    disk_usage: Optional[str] = None,
    uptime_seconds: Optional[int] = None,
    ssh_host: Optional[str] = None,
    ssh_port: Optional[int] = None,
    ssh_users: Optional[List[Dict[str, str]]] = None,
    paired_telegram: Optional[Dict[str, Any]] = None,
    status: Optional[str] = None
):
    conn = get_connection()
    cur = conn.cursor()
    updates = ["last_heartbeat = CURRENT_TIMESTAMP"]
    params = []

    if ram_usage is not None:
        updates.append("ram_usage = ?")
        params.append(ram_usage)
    if disk_usage is not None:
        updates.append("disk_usage = ?")
        params.append(disk_usage)
    if uptime_seconds is not None:
        updates.append("uptime_seconds = ?")
        params.append(uptime_seconds)
    if ssh_host is not None:
        updates.append("ssh_host = ?")
        params.append(ssh_host)
    if ssh_port is not None:
        updates.append("ssh_port = ?")
        params.append(ssh_port)
    if ssh_users is not None:
        updates.append("ssh_users_json = ?")
        params.append(json.dumps(ssh_users))
    if paired_telegram is not None:
        updates.append("paired_telegram_json = ?")
        params.append(json.dumps(paired_telegram))
    if status is not None:
        updates.append("status = ?")
        params.append(status)

    params.append(machine_code.upper())
    query = f"UPDATE colab_sessions SET {', '.join(updates)} WHERE machine_code = ?"
    cur.execute(query, tuple(params))
    conn.commit()
    conn.close()

def delete_session_by_user_id(user_id: str):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM colab_sessions WHERE user_id = ?", (user_id,))
    conn.commit()
    conn.close()

def get_all_active_sessions() -> List[Dict[str, Any]]:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM colab_sessions WHERE status = 'online'")
    rows = cur.fetchall()
    conn.close()
    results = []
    for r in rows:
        d = dict(r)
        d["ssh_users"] = json.loads(d.get("ssh_users_json") or "[]")
        d["paired_telegram"] = json.loads(d.get("paired_telegram_json") or "{}")
        results.append(d)
    return results
