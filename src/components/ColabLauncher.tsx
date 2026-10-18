import React, { useState } from 'react';
import { RefreshCw, Power, ExternalLink, Shuffle, Lock } from 'lucide-react';
import { ColabSession, User } from '../types';
import { TranslationStrings } from '../i18n';

interface ColabLauncherProps {
  user: User | null;
  session: ColabSession | null;
  t: TranslationStrings;
  onStartLab: (config: {
    hardwareType: string;
    highMem: boolean;
    tunnelMode: 'bore' | 'web_tty' | 'ngrok';
    ngrokToken: string;
    sshPassword: string;
  }) => Promise<void>;
  onStopLab: () => Promise<void>;
  onRestartKernel: () => Promise<void>;
  onOpenAuth: () => void;
  loading: boolean;
}

export const ColabLauncher: React.FC<ColabLauncherProps> = ({
  user,
  session,
  t,
  onStartLab,
  onStopLab,
  onRestartKernel,
  onOpenAuth,
  loading
}) => {
  const [hardwareType, setHardwareType] = useState('GPU T4');
  const [highMem, setHighMem] = useState(false);
  const [tunnelMode, setTunnelMode] = useState<'bore' | 'web_tty' | 'ngrok'>('bore');
  const [ngrokToken, setNgrokToken] = useState('');
  const [sshPassword, setSshPassword] = useState('123456');
  const [showStopModal, setShowStopModal] = useState(false);

  const hardwareOptions = [
    { id: 'CPU', name: 'CPU', desc: '2 vCPU · 12.7GB', ccu: '0.08 CCU/h' },
    { id: 'GPU T4', name: 'GPU T4', desc: '16GB VRAM', ccu: '1.96 CCU/h' },
    { id: 'GPU L4', name: 'GPU L4', desc: '24GB VRAM', ccu: '2.82 CCU/h' },
    { id: 'GPU A100', name: 'GPU A100', desc: '40GB VRAM', ccu: '6.80 CCU/h' },
    { id: 'GPU H100', name: 'GPU H100', desc: '80GB VRAM', ccu: '11.5 CCU/h' },
    { id: 'TPU v5e1', name: 'TPU v5e1', desc: 'Cloud TPU v5e', ccu: '2.10 CCU/h' },
    { id: 'TPU v6e1', name: 'TPU v6e1', desc: 'Trillium TPU', ccu: '3.40 CCU/h' }
  ];

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSshPassword(result);
  };

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.colab_connected) {
      onOpenAuth();
      return;
    }
    await onStartLab({
      hardwareType,
      highMem,
      tunnelMode,
      ngrokToken,
      sshPassword
    });
  };

  const isOnline = session?.status === 'online';

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">{t.launcher.title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{t.launcher.subtitle}</p>
        </div>

        {isOnline && (
          <span className="text-xs font-mono font-bold text-emerald-400">
            ● SESSION ONLINE ({session.machine_code})
          </span>
        )}
      </div>

      {isOnline ? (
        <div className="pt-5 space-y-5">
          <div className="p-4 rounded-xl border border-amber-800/60 bg-amber-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>{t.launcher.singleLockTitle}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.launcher.singleLockDesc}
              </p>
            </div>
            <div className="text-left sm:text-right font-mono text-xs shrink-0">
              <div className="text-slate-400">Runtime:</div>
              <div className="text-cyan-400 font-bold">{session.hardware_type} · {session.tunnel_mode}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={onRestartKernel}
              disabled={loading}
              className="min-h-[44px] py-2.5 px-4 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{t.launcher.restartBtn}</span>
            </button>

            {session.colab_notebook_url && (
              <a
                href={session.colab_notebook_url}
                target="_blank"
                rel="noreferrer"
                className="min-h-[44px] py-2.5 px-4 text-xs font-bold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/60 rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.launcher.openNotebookBtn}</span>
              </a>
            )}

            <button
              type="button"
              onClick={() => setShowStopModal(true)}
              disabled={loading}
              className="min-h-[44px] py-2.5 px-4 text-xs font-bold text-rose-300 bg-rose-950/60 hover:bg-rose-900/80 disabled:opacity-50 border border-rose-800/80 rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Power className="w-4 h-4" />
              <span>{t.launcher.stopBtn}</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleLaunch} className="pt-5 space-y-5">
          {/* 1. Hardware Grid (7 options including TPU v6e1) */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2.5">
              {t.launcher.hwLabel}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {hardwareOptions.map((hw) => {
                const isSelected = hardwareType === hw.id;
                return (
                  <button
                    key={hw.id}
                    type="button"
                    onClick={() => setHardwareType(hw.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/30'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-extrabold text-white">{hw.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{hw.desc}</div>
                    </div>
                    <div className="text-[10px] font-mono text-cyan-400 mt-2 tabular-nums">
                      {hw.ccu}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* High-RAM Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/50 gap-4">
            <div>
              <div className="text-xs font-bold text-white">{t.launcher.highMemTitle}</div>
              <p className="text-[11px] text-slate-400 mt-0.5">{t.launcher.highMemDesc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={highMem}
                onChange={(e) => setHighMem(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500" />
            </label>
          </div>

          {/* 2. Tunnel Mode Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2.5">
              {t.launcher.tunnelLabel}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setTunnelMode('bore')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  tunnelMode === 'bore'
                    ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/30'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-white">{t.launcher.tunnelBoreTitle}</div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{t.launcher.tunnelBoreDesc}</p>
              </button>

              <button
                type="button"
                onClick={() => setTunnelMode('web_tty')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  tunnelMode === 'web_tty'
                    ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/30'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-white">{t.launcher.tunnelTtyTitle}</div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{t.launcher.tunnelTtyDesc}</p>
              </button>

              <button
                type="button"
                onClick={() => setTunnelMode('ngrok')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  tunnelMode === 'ngrok'
                    ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/30'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-white">{t.launcher.tunnelNgrokTitle}</div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{t.launcher.tunnelNgrokDesc}</p>
              </button>
            </div>

            {tunnelMode === 'ngrok' && (
              <div className="mt-3">
                <input
                  type="password"
                  value={ngrokToken}
                  onChange={(e) => setNgrokToken(e.target.value)}
                  placeholder="NGROK_AUTHTOKEN..."
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}
          </div>

          {/* 3. Initial SSH Password */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              {t.launcher.sshPwdLabel}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={sshPassword}
                onChange={(e) => setSshPassword(e.target.value)}
                className="flex-1 px-3.5 py-2.5 text-xs font-mono bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="min-h-[42px] px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.launcher.randomPwdBtn}</span>
              </button>
            </div>
          </div>

          {/* Primary Launch Button */}
          <button
            type="submit"
            disabled={loading}
            className="min-h-[50px] w-full py-3.5 px-6 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 disabled:opacity-50 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.99]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{t.launcher.startingBtn}</span>
              </>
            ) : (
              <span>{t.launcher.startBtn}</span>
            )}
          </button>
        </form>
      )}

      {/* Confirmation Modal */}
      {showStopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">{t.launcher.stopBtn}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Session <b>{session?.machine_code}</b> (suzlab_main) will be unassigned immediately.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowStopModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  setShowStopModal(false);
                  await onStopLab();
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl"
              >
                Confirm Stop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
