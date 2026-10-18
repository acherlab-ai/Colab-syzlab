import React, { useState, useEffect } from 'react';
import { User, ColabSession, NavSection } from './types';
import { LanguageCode, TRANSLATIONS, SUPPORTED_LANGUAGES } from './i18n';
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
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [botSimulatorOpen, setBotSimulatorOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 12-Language state persisted in localStorage
  const [lang, setLang] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('suzlab_lang') as LanguageCode;
    if (saved && TRANSLATIONS[saved]) return saved;
    return 'vi';
  });

  useEffect(() => {
    localStorage.setItem('suzlab_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  // User state (Google Verified account)
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('suzlab_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      id: 'usr_hung_001',
      email: 'nguyenhung42154.016@gmail.com',
      username: 'Nguyen Hung',
      google_verified: true,
      tier: 'standard',
      colab_connected: true,
      colab_email: 'nguyenhung42154.016@gmail.com',
      ccu_balance: 98.4,
      ccu_rate: 1.96
    };
  });

  // Active Colab Session state
  const [session, setSession] = useState<ColabSession | null>(() => {
    const saved = localStorage.getItem('suzlab_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
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
      uptime_seconds: 8140,
      paired_telegram: {
        username: 'hung_suzlab',
        chat_id: 182749120,
        paired_at: '11:00:15'
      },
      colab_notebook_url:
        'https://colab.research.google.com/drive/1suzlab_CL9A4F2E?dbu=1#datalabBackendUrl=https%3A%2F%2Fcolab.suzlab.com',
      anti_kill_active: true,
      high_mem: false,
      started_at: new Date(Date.now() - 8140000).toISOString()
    };
  });

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

  // Google Sign-In & Verification Handler (Calls backend API with graceful local fallback)
  const handleGoogleAuth = async (
    email: string,
    name: string,
    autoLinkColab: boolean,
    oauthCode?: string
  ): Promise<boolean> => {
    try {
      const resp = await fetch('/api/v1/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data?.user) {
          setUser({
            ...data.user,
            google_verified: true,
            colab_connected: autoLinkColab || Boolean(oauthCode),
            colab_email: email,
            ccu_balance: data.user.ccu_balance || 100.0,
            ccu_rate: 1.96
          });
          return true;
        }
      }
    } catch (e) {
      // Fallback for client-side preview
    }

    const newUser: User = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      email,
      username: name || email.split('@')[0],
      google_verified: true,
      tier: 'standard',
      colab_connected: autoLinkColab || Boolean(oauthCode),
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

  const handleLinkColab = async (authCode: string): Promise<boolean> => {
    try {
      await fetch('/api/v1/colab/verify-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.id ? { Authorization: `Bearer ${user.id}` } : {})
        },
        body: JSON.stringify({ auth_code: authCode })
      });
    } catch (e) {}

    if (user) {
      setUser({
        ...user,
        colab_connected: true,
        colab_email: user.email,
        ccu_balance: 100.0,
        ccu_rate: 1.96
      });
    } else {
      await handleGoogleAuth('nguyenhung42154.016@gmail.com', 'Nguyen Hung', true, authCode);
    }
    return true;
  };

  const handleUnlinkColab = () => {
    if (user) {
      setUser({
        ...user,
        colab_connected: false,
        colab_email: ''
      });
    }
  };

  const handleStartLab = async (config: {
    hardwareType: string;
    highMem: boolean;
    tunnelMode: 'bore' | 'web_tty' | 'ngrok';
    ngrokToken: string;
    sshPassword: string;
  }) => {
    setLoading(true);
    try {
      if (session && session.status === 'online') {
        return;
      }

      let serverSession: ColabSession | null = null;
      try {
        const res = await fetch('/api/v1/colab/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(user?.id ? { Authorization: `Bearer ${user.id}` } : {})
          },
          body: JSON.stringify({
            hardware_type: config.hardwareType,
            high_mem: config.highMem,
            tunnel_mode: config.tunnelMode,
            ngrok_token: config.ngrokToken,
            ssh_password: config.sshPassword
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.session) {
            serverSession = {
              ...data.session,
              anti_kill_active: true,
              high_mem: config.highMem,
              started_at: new Date().toISOString()
            };
          }
        }
      } catch (e) {}

      if (!serverSession) {
        await new Promise((r) => setTimeout(r, 1200));
        const newCode = 'CL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        const port = config.tunnelMode === 'bore' ? 40000 + Math.floor(Math.random() * 9000) : 22;
        const host =
          config.tunnelMode === 'bore'
            ? 'bore.pub'
            : config.tunnelMode === 'ngrok'
            ? '0.tcp.ngrok.io'
            : 'colab.suzlab.com/colab/tty';

        serverSession = {
          machine_code: newCode,
          hardware_type: config.hardwareType,
          tunnel_mode: config.tunnelMode,
          status: 'online',
          ssh_host: host,
          ssh_port: port,
          ssh_users: [{ username: 'colab', role: 'root', created_at: new Date().toLocaleTimeString() }],
          ram_usage: config.highMem ? '2.8 / 51.0 GB (5.5%)' : '1.4 / 12.7 GB (11.0%)',
          disk_usage: '25.3 / 107.7 GB (23.5%)',
          uptime_seconds: 1,
          paired_telegram: {},
          colab_notebook_url: `https://colab.research.google.com/drive/1suzlab_${newCode}?dbu=1#datalabBackendUrl=https%3A%2F%2Fcolab.suzlab.com`,
          anti_kill_active: true,
          high_mem: config.highMem,
          started_at: new Date().toISOString()
        };
      }

      setSession(serverSession);
    } finally {
      setLoading(false);
    }
  };

  const handleStopLab = async () => {
    setLoading(true);
    try {
      try {
        await fetch('/api/v1/colab/stop', {
          method: 'POST',
          headers: user?.id ? { Authorization: `Bearer ${user.id}` } : {}
        });
      } catch (e) {}
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRestartKernel = async () => {
    setLoading(true);
    try {
      try {
        await fetch('/api/v1/colab/restart-kernel', {
          method: 'POST',
          headers: user?.id ? { Authorization: `Bearer ${user.id}` } : {}
        });
      } catch (e) {}
      if (session) {
        setSession({ ...session, uptime_seconds: 1 });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (username: string, password: string) => {
    if (!session) return;
    const clean = username.trim().toLowerCase();
    try {
      await fetch('/api/v1/colab/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.id ? { Authorization: `Bearer ${user.id}` } : {})
        },
        body: JSON.stringify({ username: clean, password })
      });
    } catch (e) {}

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
    try {
      await fetch('/api/v1/colab/users/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.id ? { Authorization: `Bearer ${user.id}` } : {})
        },
        body: JSON.stringify({ username: targetUser, new_password: newPassword })
      });
    } catch (e) {}
  };

  const handleExecCommand = async (
    cmd: string
  ): Promise<{ stdout: string; stderr: string; code: number }> => {
    const c = cmd.trim();
    if (c === 'nvidia-smi') {
      return {
        stdout: `+-----------------------------------------------------------------------------+
| NVIDIA-SMI 535.104.05   Driver Version: 535.104.05   CUDA Version: 12.2     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
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
tmpfs            64M     0   64M   0% /dev`,
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
        stdout: `model name\t: Intel(R) Xeon(R) CPU @ 2.20GHz (2 vCPUs)`,
        stderr: '',
        code: 0
      };
    } else if (c === 'whoami') {
      return { stdout: 'colab', stderr: '', code: 0 };
    } else if (c.includes('ls')) {
      return {
        stdout: `total 12\ndrwxr-xr-x 1 root root 4096 Oct 18 10:58 .\ndrwxr-xr-x 1 root root 4096 Oct 18 10:58 sample_data`,
        stderr: '',
        code: 0
      };
    } else if (c.includes('ps aux')) {
      return {
        stdout: `root  412  0.0  0.0 /usr/sbin/sshd -D\ncolab 781  0.0  0.1 bore local 22 --to bore.pub`,
        stderr: '',
        code: 0
      };
    }
    return {
      stdout: `[suzlab_main: ${c}] OK (status 0)`,
      stderr: '',
      code: 0
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans pb-20 md:pb-0 overflow-x-hidden">
      {/* Desktop Top Header + Mobile Top & Fixed Bottom Navigation */}
      <Header
        user={user}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        lang={lang}
        setLang={setLang}
        t={t}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        hasActiveSession={Boolean(session && session.status === 'online')}
      />

      {/* Main Viewport Content */}
      <main className="flex-1">
        {/* PAGE 1: HOME */}
        {activeSection === 'home' && (
          <div>
            <HeroSection
              t={t}
              user={user}
              session={session}
              onStartNow={() => setActiveSection('dashboard')}
              onExploreSSH={() => setActiveSection('ssh')}
              onOpenAuth={() => setAuthModalOpen(true)}
            />

            <PricingSection
              t={t}
              onSelectPlan={() => setActiveSection('dashboard')}
            />
          </div>
        )}

        {/* PAGE 2: DASHBOARD (Desktop Multi-Column + Mobile Ergonomic Stack) */}
        {activeSection === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
            <ColabConnector
              user={user}
              t={t}
              onLinkColab={handleLinkColab}
              onUnlinkColab={handleUnlinkColab}
              onOpenAuth={() => setAuthModalOpen(true)}
              hasActiveSession={Boolean(session && session.status === 'online')}
            />

            <ColabLauncher
              user={user}
              session={session}
              t={t}
              onStartLab={handleStartLab}
              onStopLab={handleStopLab}
              onRestartKernel={handleRestartKernel}
              onOpenAuth={() => setAuthModalOpen(true)}
              loading={loading}
            />

            {session && session.status === 'online' && (
              <>
                <LiveTelemetry
                  session={session}
                  t={t}
                  onOpenBotSimulator={() => setBotSimulatorOpen(true)}
                />

                <SSHManager
                  session={session}
                  t={t}
                  onCreateUser={handleCreateUser}
                  onChangePassword={handleChangePassword}
                />
              </>
            )}
          </div>
        )}

        {/* PAGE 3: DEDICATED SSH & WEB TERMINAL WORKSPACE */}
        {activeSection === 'ssh' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
            {session && session.status === 'online' ? (
              <>
                <SSHManager
                  session={session}
                  t={t}
                  onCreateUser={handleCreateUser}
                  onChangePassword={handleChangePassword}
                />
                <WebTerminal
                  session={session}
                  onExecCommand={handleExecCommand}
                />
              </>
            ) : (
              <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/70 text-center space-y-4">
                <h2 className="text-lg font-bold text-white">{t.launcher.title}</h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {t.launcher.subtitle}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveSection('dashboard')}
                  className="min-h-[44px] px-6 py-2.5 text-xs font-extrabold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
                >
                  {t.launcher.startBtn}
                </button>
              </div>
            )}
          </div>
        )}

        {/* PAGE 4: TELEGRAM BOT @Colab_lab_bot COMMAND CENTER */}
        {activeSection === 'telegram' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  Telegram Bot · @Colab_lab_bot
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {t.features.f4Title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t.features.f4Desc}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
                    <div className="text-xs font-bold text-cyan-400 font-mono">
                      1. Multi-Instance Negative Offset (-25)
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Polls getUpdates with offset -25 and seen_updates deduplication so dozens of Colab VMs share @Colab_lab_bot simultaneously without stealing updates.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
                    <div className="text-xs font-bold text-emerald-400 font-mono">
                      2. Machine-Scoped Callback Prefix ({session?.machine_code || 'CL-9A4F2E'}|...)
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Every Inline Keyboard button carries the machine identifier prefix so commands route strictly to your assigned Colab kernel.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
                    <div className="text-xs font-bold text-amber-400 font-mono">
                      3. 3-Layer Encrypted Bot Token in RAM
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Encrypted with XOR + Zlib + Base85 (key: c0l4b_s5h_k3y_2026) and decrypted strictly in memory during API calls.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                {session && session.status === 'online' ? (
                  <TelegramBotSimulator
                    session={session}
                    onCreateUser={handleCreateUser}
                    onChangePassword={handleChangePassword}
                    onStopLab={handleStopLab}
                  />
                ) : (
                  <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/70 text-center space-y-4">
                    <p className="text-xs text-slate-400">{t.launcher.subtitle}</p>
                    <button
                      type="button"
                      onClick={() => setActiveSection('dashboard')}
                      className="min-h-[44px] px-6 py-2.5 text-xs font-extrabold text-slate-950 bg-cyan-400 rounded-xl"
                    >
                      {t.launcher.startBtn}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 5: PRICING & PLANS */}
        {activeSection === 'pricing' && (
          <PricingSection
            t={t}
            onSelectPlan={() => setActiveSection('dashboard')}
          />
        )}
      </main>

      {/* Google Verification & Sign-In Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        t={t}
        onGoogleAuth={handleGoogleAuth}
      />

      {/* Interactive Bot Simulator Modal */}
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
