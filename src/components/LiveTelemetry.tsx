import React, { useState, useEffect } from 'react';
import { ColabSession } from '../types';

interface LiveTelemetryProps {
  session: ColabSession;
  onOpenBotSimulator: () => void;
}

export const LiveTelemetry: React.FC<LiveTelemetryProps> = ({
  session,
  onOpenBotSimulator
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [currentUptime, setCurrentUptime] = useState(session.uptime_seconds || 0);

  // Tick uptime counter every second for real-time feel
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

  // Parse RAM and Disk percentages for progress bars
  const parsePercent = (str: string) => {
    const match = str.match(/\(([0-9.]+)%\)/);
    return match ? parseFloat(match[1]) : 20;
  };

  const ramPct = parsePercent(session.ram_usage || '(18.9%)');
  const diskPct = parsePercent(session.disk_usage || '(29.5%)');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Machine Identifier & Telegram Link Card */}
      <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between backdrop-blur-sm">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Mã Định Danh Máy Ảo
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE 24/7
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tracking-tight tabular-nums">
              {session.machine_code}
            </span>
            <button
              onClick={copyMachineCode}
              title="Copy mã máy"
              className="px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              {copiedCode ? '✓ Đã Copy' : 'Copy Mã'}
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Dùng mã này để kết nối với Bot Telegram <b>@Colab_lab_bot</b> để nhận báo cáo Uptime và tạo/đổi mật khẩu SSH từ xa.
          </p>

          <div className="mt-4 p-3 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Trạng Thái Telegram Bot:
            </div>
            {isPaired ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span>🟢</span>
                <span>Đã liên kết: @{session.paired_telegram.username || 'user'}</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  (lúc {session.paired_telegram.paired_at || 'vừa xong'})
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <span className="animate-pulse">🟡</span>
                <span>Đang chờ liên kết Telegram...</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <a
            href={telegramBotLink}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 rounded-xl transition-all shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>🚀</span>
            <span>Mở @Colab_lab_bot & Tự Động Liên Kết Máy</span>
          </a>

          <button
            type="button"
            onClick={onOpenBotSimulator}
            className="w-full py-2 px-3 text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <span>📱</span>
            <span>Trải nghiệm Inline Keyboard Bot trên Web</span>
          </button>
        </div>
      </div>

      {/* Live System Metrics Card */}
      <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between backdrop-blur-sm">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Thời Gian Chạy Liên Tục (Uptime)
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums mt-0.5">
                {formatUptime(currentUptime)}
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">
                <span>🛡️</span>
                <span>Anti-Kill Keep-Alive: 24/7 BẢO VỆ</span>
              </span>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                Tự động ping & phục hồi Kernel ngầm
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* RAM Usage Bar */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-300">RAM Hệ Thống</span>
                <span className="font-mono text-cyan-400 font-semibold">{session.ram_usage || '2.4 / 12.7 GB'}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-teal-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(ramPct, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>0 GB</span>
                <span>{ramPct.toFixed(1)}% Sử dụng</span>
                <span>12.7 GB</span>
              </div>
            </div>

            {/* Disk Usage Bar */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-300">Dung Lượng Đĩa SSD</span>
                <span className="font-mono text-emerald-400 font-semibold">{session.disk_usage || '31.8 / 107.7 GB'}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(diskPct, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>0 GB</span>
                <span>{diskPct.toFixed(1)}% Sử dụng</span>
                <span>107.7 GB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Phần cứng:</span>
            <span className="text-white font-mono font-semibold">{session.hardware_type}</span>
            <span>·</span>
            <span>Chế độ:</span>
            <span className="text-cyan-400 font-mono font-semibold">{session.tunnel_mode}</span>
          </div>

          {session.colab_notebook_url && (
            <a
              href={session.colab_notebook_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium"
            >
              Mở Notebook trực tiếp tại Google Colab ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
