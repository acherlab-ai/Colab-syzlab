import React, { useState, useEffect } from 'react';
import { Copy, Check, Send, ExternalLink, ShieldCheck } from 'lucide-react';
import { ColabSession } from '../types';
import { TranslationStrings } from '../i18n';

interface LiveTelemetryProps {
  session: ColabSession;
  t: TranslationStrings;
  onOpenBotSimulator: () => void;
}

export const LiveTelemetry: React.FC<LiveTelemetryProps> = ({
  session,
  t,
  onOpenBotSimulator
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [currentUptime, setCurrentUptime] = useState(session.uptime_seconds || 0);

  useEffect(() => {
    setCurrentUptime(session.uptime_seconds || 0);
    const interval = setInterval(() => {
      setCurrentUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [session.uptime_seconds]);

  const formatUptime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  const copyMachineCode = () => {
    navigator.clipboard.writeText(session.machine_code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const isPaired = Boolean(session.paired_telegram?.username || session.paired_telegram?.chat_id);
  const telegramBotLink = `https://t.me/Colab_lab_bot?start=${session.machine_code}`;

  const parsePercent = (str: string) => {
    const match = str.match(/\(([0-9.]+)%\)/);
    return match ? parseFloat(match[1]) : 20;
  };

  const ramPct = parsePercent(session.ram_usage || '(18.9%)');
  const diskPct = parsePercent(session.disk_usage || '(29.5%)');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Card: Machine Identifier & @Colab_lab_bot Pairing */}
      <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 flex flex-col justify-between space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {t.telemetry.machineIdLabel}
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              ● LIVE WS
            </span>
          </div>

          <div className="mt-2.5 flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tracking-tight tabular-nums">
              {session.machine_code}
            </span>
            <button
              type="button"
              onClick={copyMachineCode}
              className="min-h-[38px] px-3 py-1.5 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? t.telemetry.copiedBtn : t.telemetry.copyBtn}</span>
            </button>
          </div>

          <div className="mt-4 p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {t.telemetry.telegramStatusLabel}
            </div>
            {isPaired ? (
              <div className="text-xs font-bold text-emerald-400 mt-1">
                🟢 {t.telemetry.telegramPaired}: @{session.paired_telegram.username || 'user'}
              </div>
            ) : (
              <div className="text-xs font-bold text-amber-400 mt-1">
                🟡 {t.telemetry.telegramWaiting}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2.5">
          <a
            href={telegramBotLink}
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] w-full py-2.5 px-4 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md shadow-sky-500/15"
          >
            <Send className="w-4 h-4" />
            <span>{t.telemetry.openBotBtn}</span>
          </a>

          <button
            type="button"
            onClick={onOpenBotSimulator}
            className="min-h-[42px] w-full py-2 px-3 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors whitespace-nowrap"
          >
            {t.telemetry.testBotWebBtn}
          </button>
        </div>
      </div>

      {/* Right Card: Live Uptime, RAM, Disk & Anti-Kill Shield */}
      <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 flex flex-col justify-between space-y-5">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {t.telemetry.uptimeLabel}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums mt-0.5">
                {formatUptime(currentUptime)}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 bg-cyan-950/50 border border-cyan-800/50 px-3 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{t.telemetry.antiKillBadge}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {/* RAM Gauge */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-300">{t.telemetry.ramLabel}</span>
                <span className="font-mono text-cyan-400 font-bold tabular-nums">
                  {session.ram_usage || '2.4 / 12.7 GB'}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-teal-400 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(ramPct, 100)}%` }}
                />
              </div>
            </div>

            {/* Disk Gauge */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-300">{t.telemetry.diskLabel}</span>
                <span className="font-mono text-emerald-400 font-bold tabular-nums">
                  {session.disk_usage || '31.8 / 107.7 GB'}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(diskPct, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <span>{session.hardware_type}</span>
            <span>·</span>
            <span className="text-cyan-400">{session.ssh_host}:{session.ssh_port}</span>
          </div>

          {session.colab_notebook_url && (
            <a
              href={session.colab_notebook_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>{t.launcher.openNotebookBtn}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
