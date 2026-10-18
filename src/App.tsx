import React, { useState, useEffect } from 'react';
import { User, ColabSession, SSHUser } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PricingSection } from './components/PricingSection';
import { ColabConnector } from './components/ColabConnector';
import { ColabLauncher } from './components/ColabLauncher';
import { LiveTelemetry } from './components/LiveTelemetry';
import { SSHManager } from './components/SSHManager';
import { WebTerminal } from './components/WebTerminal';
import { TelegramBotSimulator } from './components/TelegramBotSimulator';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'dashboard' | 'pricing' | 'telegram' | 'ecosystem'>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [botSimulatorOpen, setBotSimulatorOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize user from localStorage or realistic default
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('suzlab_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      id: 'usr_hung_001',
      email: 'nguyenhung42154.016@gmail.com',
      username: 'nguyenhung',
      tier: 'standard',
      colab_connected: true,
      colab_email: 'nguyenhung42154.016@gmail.com',
      ccu_balance: 98.4,
      ccu_rate: 1.96
    };
  });

  // Initialize session from localStorage or active demo session
  const [session, setSession] = useState<ColabSession | null>(() => {
    const saved = localStorage.getItem('suzlab_session');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      machine_code: 'CL-9A4F2E',
      hardware_type: 'GPU T4',
      tunnel_mode: 'bore',
      status: 'online',
      ssh_host: 'bore.pub',
      ssh_port: 45123,
      ssh_users: [
        { username: 'colab', role: 'root', created_at: '10:59:00' },
        { username: 'worker1', role: 'sudo', created_at: '11:02:14' }
      ],
      ram_usage: '2.4 / 12.7 GB (18.9%)',
      disk_usage: '31.8 / 107.7 GB (29.5%)',
      uptime_seconds: 8140, // ~2h 15m 40s
      paired_telegram: {
        username: 'hung_suzlab',
        chat_id: 182749120,
        paired_at: '11:00:15'
      },
      colab_notebook_url: 'https://colab.research.google.com/drive/1suzlab_CL9A4F2E?dbu=1#datalabBackendUrl=https%3A%2F%2Fcolab.suzlab.com',
      anti_kill_active: true,
      high_mem: false,
      started_at: new Date(Date.now() - 8140000).toISOString()
    };
  });

  // Save to localStorage whenever user or session changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('suzlab_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('suzlab_user');
    }
  }, [user]);

  useEffect(() => {
    if (session) {
      localStorage.setItem('suzlab_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('suzlab_session');
    }
  }, [session]);

  // Auth Handlers
  const handleLogin = async (loginInput: string, pwd: string): Promise<boolean> => {
    const newUser: User = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      email: loginInput.includes('@') ? loginInput : `${loginInput}@suzlab.com`,
      username: loginInput.split('@')[0],
      tier: 'standard',
      colab_connected: true,
      colab_email: loginInput.includes('@') ? loginInput : `${loginInput}@gmail.com`,
      ccu_balance: 100.0,
      ccu_rate: 1.96
    };
    setUser(newUser);
    return true;
  };

  const handleRegister = async (email: string, username: string, pwd: string): Promise<boolean> => {
    const newUser: User = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      email,
      username,
      tier: 'free',
      colab_connected: false,
      colab_email: '',
      ccu_balance: 100.0,
      ccu_rate: 0.0
    };
    setUser(newUser);
    return true;
  };

  const handleGoogleAuth = async (email: string, name: string): Promise<boolean> => {
    const newUser: User = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      email,
      username: name.toLowerCase().replace(/\s+/g, '_'),
      tier: 'standard',
      colab_connected: true,
      colab_email: email,
      ccu_balance: 100.0,
      ccu_rate: 1.96
    };
    setUser(newUser);
    return true;
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Google Colab OAuth Link Handlers
  const handleLinkColab = async (authCode: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    if (user) {
      setUser({
        ...user,
        colab_connected: true,
        colab_email: user.email || 'user.colab@gmail.com',
        ccu_balance: 100.0,
        ccu_rate: 1.96
      });
    }
    return true;
  };

  const handleUnlinkColab = () => {
    if (user) {
      setUser({
        ...user,
        colab_connected: false,
        colab_email: '',
        ccu_balance: 0,
        ccu_rate: 0
      });
    }
  };

  // Lab Lifecycle Handlers
  const handleStartLab = async (config: {
    hardwareType: string;
    highMem: boolean;
    tunnelMode: 'bore' | 'web_tty' | 'ngrok';
    ngrokToken: string;
    sshPassword: string;
  }) => {
    setLoading(true);
    try {
      // Check Single-Session Lock
      if (session && session.status === 'online') {
        alert('Tài khoản của bạn đã có 1 máy Colab đang chạy. Hệ thống chỉ cho phép tối đa 1 máy ảo hoạt động (Single-Session Lock).');
        return;
      }

      // Simulate CLI execution and in-memory injection latency
      await new Promise((r) => setTimeout(r, 2000));

      const newCode = 'CL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const port = config.tunnelMode === 'bore' ? 40000 + Math.floor(Math.random() * 9000) : 22;
      const host = config.tunnelMode === 'bore' ? 'bore.pub' : config.tunnelMode === 'ngrok' ? '0.tcp.ngrok.io' : 'colab.suzlab.com/colab/tty';

      const newSession: ColabSession = {
        machine_code: newCode,
        hardware_type: config.hardwareType,
        tunnel_mode: config.tunnelMode,
        status: 'online',
        ssh_host: host,
        ssh_port: port,
        ssh_users: [{ username: 'colab', role: 'root', created_at: new Date().toLocaleTimeString() }],
        ram_usage: '1.2 / 12.7 GB (9.4%)',
        disk_usage: '25.3 / 107.7 GB (23.5%)',
        uptime_seconds: 1,
        paired_telegram: {},
        colab_notebook_url: `https://colab.research.google.com/drive/1suzlab_${newCode}?dbu=1#datalabBackendUrl=https%3A%2F%2Fcolab.suzlab.com`,
        anti_kill_active: true,
        high_mem: config.highMem,
        started_at: new Date().toISOString()
      };

      setSession(newSession);
      setActiveSection('dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleStopLab = async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRestartKernel = async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      alert('Đã khởi động lại Kernel và nạp lại Agent ẩn vào RAM thành công!');
    } finally {
      setLoading(false);
    }
  };

  // SSH User Management Handlers
  const handleCreateUser = async (username: string, password: string) => {
    if (!session) return;
    const clean = username.trim().toLowerCase();
    const updatedUsers = [...(session.ssh_users || [])];
    if (!updatedUsers.some((u) => u.username === clean)) {
      updatedUsers.push({
        username: clean,
        role: 'sudo',
        created_at: new Date().toLocaleTimeString()
      });
      setSession({
        ...session,
        ssh_users: updatedUsers
      });
    }
  };

  const handleChangePassword = async (targetUser: string, newPassword: string) => {
    if (!session) return;
    // In real system, calls colab exec chpasswd
    // State is confirmed in UI
  };

  // Web Terminal Command Execution Simulator (Full fidelity)
  const handleExecCommand = async (cmd: string): Promise<{ stdout: string; stderr: string; code: number }> => {
    await new Promise((r) => setTimeout(r, 300));
    const c = cmd.trim();

    if (c === 'nvidia-smi') {
      return {
        stdout: `+-----------------------------------------------------------------------------+
| NVIDIA-SMI 535.104.05   Driver Version: 535.104.05   CUDA Version: 12.2     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  Tesla T4            Off  | 00000000:00:04.0 Off |                    0 |
| N/A   42C    P8     9W /  70W |    420MiB / 15360MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+`,
        stderr: '',
        code: 0
      };
    } else if (c === 'free -h') {
      return {
        stdout: `               total        used        free      shared  buff/cache   available
Mem:            12Gi       2.4Gi       8.1Gi       1.0Mi       2.2Gi       9.8Gi
Swap:             0B          0B          0B`,
        stderr: '',
        code: 0
      };
    } else if (c === 'df -h') {
      return {
        stdout: `Filesystem      Size  Used Avail Use% Mounted on
overlay         108G   32G   77G  30% /
tmpfs            64M     0   64M   0% /dev
shm             5.8G     0  5.8G   0% /dev/shm
/dev/root       2.0G  1.2G  800M  60% /etc/hosts`,
        stderr: '',
        code: 0
      };
    } else if (c === 'uptime') {
      return {
        stdout: ` 11:15:20 up 2:15,  1 user,  load average: 0.08, 0.04, 0.01`,
        stderr: '',
        code: 0
      };
    } else if (c.includes('cpuinfo')) {
      return {
        stdout: `model name\t: Intel(R) Xeon(R) CPU @ 2.20GHz (2 vCPUs, Haswell-EP)`,
        stderr: '',
        code: 0
      };
    } else if (c === 'whoami') {
      return {
        stdout: `colab`,
        stderr: '',
        code: 0
      };
    } else if (c.includes('ls')) {
      return {
        stdout: `total 16
drwxr-xr-x 1 root  root  4096 Oct 18 10:58 .
drwxr-xr-x 1 root  root  4096 Oct 18 10:55 ..
drwxr-xr-x 1 root  root  4096 Oct 18 10:58 sample_data`,
        stderr: '',
        code: 0
      };
    } else if (c.includes('ps aux')) {
      return {
        stdout: `root         412  0.0  0.0  14520  6544 ?        Ss   10:59   0:00 /usr/sbin/sshd -D
colab        781  0.0  0.1  22100  9412 ?        S    11:00   0:00 bore local 22 --to bore.pub`,
        stderr: '',
        code: 0
      };
    } else if (c === 'python3 -V' || c === 'python -V') {
      return {
        stdout: `Python 3.10.12`,
        stderr: '',
        code: 0
      };
    } else {
      return {
        stdout: `[bash: ${c}] Command completed successfully with status 0.`,
        stderr: '',
        code: 0
      };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3-Zone Top Navigation Bar */}
      <Header
        user={user}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        hasActiveSession={Boolean(session && session.status === 'online')}
      />

      {/* Main Content Viewports */}
      <main className="flex-1">
        {activeSection === 'home' && (
          <div>
            <HeroSection
              onStartNow={() => setActiveSection('dashboard')}
              onExplorePricing={() => setActiveSection('pricing')}
            />

            {/* Quick Live Preview Banner if session is active */}
            {session && session.status === 'online' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="p-4 rounded-2xl border border-emerald-800/80 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <div className="text-sm font-bold text-white">
                        Bạn đang có máy Colab [{session.machine_code}] đang được treo 24/7
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        Host: {session.ssh_host}:{session.ssh_port} · Phần cứng: {session.hardware_type}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveSection('dashboard')}
                    className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md whitespace-nowrap"
                  >
                    Vào Bảng Điều Khiển Ngay ↗
                  </button>
                </div>
              </div>
            )}

            {/* Feature Highlights Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
                  Ưu Thế Cốt Lõi
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Tại Sao Nên Sử Dụng Dịch Vụ Suzlab Colab?
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
                  <div className="text-2xl mb-3">🛡️</div>
                  <h3 className="text-base font-bold text-white mb-2">Bên Mình Treo Hộ 100%</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Bạn không cần mở máy tính, không cần giữ tab trình duyệt. Server Railway của Suzlab tự duy trì kết nối WebSocket và chống bị Google Colab ngắt phiên 24/7.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
                  <div className="text-2xl mb-3">🔒</div>
                  <h3 className="text-base font-bold text-white mb-2">Bảo Mật Zero-Exposure</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Mã nguồn script được nén zlib + Base85 và truyền thẳng vào RAM qua stdin. Tuyệt đối không lưu bất kỳ file .py nào lên Google Drive hay thư mục /content.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
                  <div className="text-2xl mb-3">🤖</div>
                  <h3 className="text-base font-bold text-white mb-2">Điều Khiển Bằng Telegram Bot</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Nhận báo cáo Uptime, kiểm tra RAM/Disk, tạo User SSH mới và đổi mật khẩu mọi lúc mọi nơi ngay trên điện thoại qua Bot <b>@Colab_lab_bot</b> bằng các nút bấm Inline.
                  </p>
                </div>
              </div>
            </div>

            <PricingSection
              onSelectPlan={(plan) => {
                setActiveSection('dashboard');
              }}
            />
          </div>
        )}

        {activeSection === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            {/* Breadcrumb strip */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span>Suzlab Cloud</span>
                <span>/</span>
                <span className="text-white font-medium">Bảng Điều Khiển Colab</span>
              </div>
              <div className="font-mono text-cyan-400 text-[11px]">
                Railway Worker: 1 Single Process (&lt;150MB)
              </div>
            </div>

            {/* Step 1: Colab OAuth2 Linker */}
            <ColabConnector
              user={user}
              onLinkColab={handleLinkColab}
              onUnlinkColab={handleUnlinkColab}
              hasActiveSession={Boolean(session && session.status === 'online')}
            />

            {/* Step 2: 1-Click Cloud Launcher */}
            <ColabLauncher
              user={user}
              session={session}
              onStartLab={handleStartLab}
              onStopLab={handleStopLab}
              onRestartKernel={handleRestartKernel}
              loading={loading}
            />

            {/* Step 3: When Session is Online -> Telemetry, SSH, Web Terminal */}
            {session && session.status === 'online' && (
              <>
                <LiveTelemetry
                  session={session}
                  onOpenBotSimulator={() => setBotSimulatorOpen(true)}
                />

                <SSHManager
                  session={session}
                  onCreateUser={handleCreateUser}
                  onChangePassword={handleChangePassword}
                />

                <div>
                  <div className="mb-2">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>💻</span>
                      <span>Web Terminal Trực Tiếp (Gõ lệnh Bash trực tiếp vào máy Colab)</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Thực thi lệnh an toàn qua luồng WebSocket CLI suzlab_main mà không cần mở phần mềm ngoài.
                    </p>
                  </div>
                  <WebTerminal
                    session={session}
                    onExecCommand={handleExecCommand}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {activeSection === 'pricing' && (
          <div className="py-8">
            <PricingSection
              onSelectPlan={(plan) => {
                setActiveSection('dashboard');
              }}
            />
          </div>
        )}

        {activeSection === 'telegram' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-950/60 text-sky-400 border border-sky-800/50">
                <span>🤖</span>
                <span>TELEGRAM BOT CHÍNH THỨC</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Tích Hợp Bot Telegram @Colab_lab_bot
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
                Quản lý toàn bộ vòng đời máy ảo Google Colab của bạn từ xa bằng giao diện nút bấm 100% Inline Keyboard trên ứng dụng Telegram.
              </p>
            </div>

            {session && session.status === 'online' ? (
              <TelegramBotSimulator
                session={session}
                onCreateUser={handleCreateUser}
                onChangePassword={handleChangePassword}
                onStopLab={handleStopLab}
              />
            ) : (
              <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/60 text-center space-y-4">
                <div className="text-4xl">⚠️</div>
                <h3 className="text-base font-bold text-white">Chưa Có Máy Colab Nào Đang Hoạt Động</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Hãy bấm vào Bảng điều khiển để bật máy Colab trước, sau đó mã định danh máy <b>CL-XXXXXX</b> sẽ sẵn sàng để liên kết với Bot Telegram.
                </p>
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
                >
                  ⚡ Mở Bảng Điều Khiển Để Bật Máy
                </button>
              </div>
            )}
          </div>
        )}

        {activeSection === 'ecosystem' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
            <div className="text-center space-y-3">
              <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400">
                Kiến Trúc & Bảo Mật Hệ Thống
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                Hệ Sinh Thái Suzlab (Suzlab Ecosystem)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Được thiết kế chuyên biệt để triển khai trên PaaS <b>Railway</b> với mức tiêu thụ RAM cực thấp, giao thức CLI chính thức và cơ chế chống lộ mã nguồn tuyệt đối.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  01. Giao Thức google-colab-cli
                </div>
                <h3 className="text-base font-bold text-white">Tối Ưu Hóa &lt; 150MB RAM</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Thay vì dùng trình duyệt ảo nặng nề (Selenium / Playwright ngốn 1–2GB RAM), Suzlab sử dụng trực tiếp giao thức CLI chính thức của Google Colab kết hợp với FastAPI bất đồng bộ trên 1 worker duy nhất.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  02. Bảo Mật Zero Source-Code
                </div>
                <h3 className="text-base font-bold text-white">Không Lưu File Trên Máy Khách</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Toàn bộ script quản lý SSH, Tunnel và Bot Telegram được nén 3 lớp (XOR + zlib + Base85) và bơm trực tiếp vào RAM qua stdin của lệnh colab exec. Người dùng và bên ngoài không thể tải hoặc thấy mã nguồn hệ thống.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase">
                  03. Single-Session Lock
                </div>
                <h3 className="text-base font-bold text-white">Khóa Cứng 1 Tài Khoản = 1 Lab</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Mỗi tài khoản người dùng chỉ được cấp phát duy nhất 1 phiên máy ảo suzlab_main. Mọi cấu hình được cô lập trong thư mục /tmp/suzlab_users/{'{user_id}'} và được bảo vệ bằng SQLite WAL.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
                <div className="text-xs font-mono font-bold text-indigo-400 uppercase">
                  04. Anti-Kill Keep-Alive 24/7
                </div>
                <h3 className="text-base font-bold text-white">Giữ Sống Kernel & Phục Hồi Tự Động</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Keep-Alive Daemon ngầm liên tục theo dõi nhịp tim (Heartbeat) của máy ảo. Khi phát hiện Kernel bị đứng hoặc mất kết nối, hệ thống sẽ tự động kích hoạt khởi động lại Kernel và nạp lại Agent ẩn ngay lập tức.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onGoogleAuth={handleGoogleAuth}
      />

      {/* Interactive Telegram Bot Simulator Modal */}
      {botSimulatorOpen && session && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <TelegramBotSimulator
            session={session}
            onClose={() => setBotSimulatorOpen(false)}
            onCreateUser={handleCreateUser}
            onChangePassword={handleChangePassword}
            onStopLab={handleStopLab}
          />
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
