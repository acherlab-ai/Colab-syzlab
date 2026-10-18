import React, { useState } from 'react';
import { ColabSession, User } from '../types';

interface ColabLauncherProps {
  user: User | null;
  session: ColabSession | null;
  onStartLab: (config: {
    hardwareType: string;
    highMem: boolean;
    tunnelMode: 'bore' | 'web_tty' | 'ngrok';
    ngrokToken: string;
    sshPassword: string;
  }) => Promise<void>;
  onStopLab: () => Promise<void>;
  onRestartKernel: () => Promise<void>;
  loading: boolean;
}

export const ColabLauncher: React.FC<ColabLauncherProps> = ({
  user,
  session,
  onStartLab,
  onStopLab,
  onRestartKernel,
  loading
}) => {
  const [hardwareType, setHardwareType] = useState('GPU T4');
  const [highMem, setHighMem] = useState(false);
  const [tunnelMode, setTunnelMode] = useState<'bore' | 'web_tty' | 'ngrok'>('bore');
  const [ngrokToken, setNgrokToken] = useState('');
  const [sshPassword, setSshPassword] = useState('123456');
  const [showStopModal, setShowStopModal] = useState(false);

  const hardwareOptions = [
    { id: 'CPU', name: 'CPU Tiêu Chuẩn', desc: '2 vCPU · 12.7GB RAM', badge: 'Tiết kiệm CCU' },
    { id: 'GPU T4', name: 'GPU NVIDIA T4', desc: '16GB VRAM · 12.7GB RAM', badge: 'Phổ biến nhất' },
    { id: 'GPU L4', name: 'GPU NVIDIA L4', desc: '24GB VRAM · Thế hệ Ada', badge: 'Tốc độ cao' },
    { id: 'GPU A100', name: 'GPU NVIDIA A100', desc: '40GB VRAM Tensor Core', badge: 'Pro AI' },
    { id: 'GPU H100', name: 'GPU NVIDIA H100', desc: '80GB VRAM Hopper', badge: 'Siêu điện toán' },
    { id: 'TPU v5e1', name: 'Google TPU v5e1', desc: 'Chuyên dụng JAX / PyTorch', badge: 'TPU Cloud' },
  ];

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSshPassword(result);
  };

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>⚡</span>
            <span>Khởi Tạo & Cấu Hình Treo Hộ (1-Click Cloud Launcher)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Điều phối tự động qua <b>google-colab-cli</b> trên máy chủ Railway. Khóa cứng 1 tài khoản chỉ treo tối đa 1 Lab.
          </p>
        </div>

        {isOnline && (
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold">1 LAB ĐANG HOẠT ĐỘNG</span>
          </div>
        )}
      </div>

      {isOnline ? (
        /* Control bar when session is already running */
        <div className="pt-6 space-y-6">
          <div className="p-4 rounded-xl border border-amber-900/50 bg-amber-950/20 flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>🔒</span>
                <span>GIỚI HẠN SINGLE-SESSION ĐANG KÍCH HOẠT</span>
              </div>
              <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                Tài khoản của bạn đang có máy Colab mã <b>{session.machine_code}</b> chạy với phần cứng <b>{session.hardware_type}</b> ({session.tunnel_mode === 'bore' ? 'Auto Free Tunnel' : session.tunnel_mode}). Nếu muốn đổi cấu hình hoặc phần cứng, hãy giải phóng máy cũ trước.
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[11px] font-mono text-slate-400">Thư mục cô lập:</span>
              <div className="text-xs font-mono text-cyan-400">/tmp/suzlab_users/{user?.id?.slice(0, 10)}...</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onRestartKernel}
              disabled={loading}
              className="py-2.5 px-5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <span>🔄</span>
              <span>Khởi động lại Kernel</span>
            </button>

            <button
              type="button"
              onClick={() => setShowStopModal(true)}
              disabled={loading}
              className="py-2.5 px-5 text-xs font-semibold text-rose-300 bg-rose-950/60 hover:bg-rose-900/80 disabled:opacity-50 border border-rose-800/80 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <span>🛑</span>
              <span>Tắt & Giải Phóng Máy Colab</span>
            </button>

            {session.colab_notebook_url && (
              <a
                href={session.colab_notebook_url}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-5 text-xs font-semibold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/60 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <span>📓</span>
                <span>Mở Giao Diện Google Colab Notebook</span>
              </a>
            )}
          </div>
        </div>
      ) : (
        /* Configuration & Launcher Form */
        <form onSubmit={handleLaunch} className="pt-6 space-y-6">
          {/* Hardware Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              1. Chọn Loại Phần Cứng Máy Ảo
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {hardwareOptions.map((hw) => {
                const isSelected = hardwareType === hw.id;
                return (
                  <button
                    key={hw.id}
                    type="button"
                    onClick={() => setHardwareType(hw.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/40 shadow-sm'
                        : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] text-cyan-400 font-mono font-medium">{hw.badge}</div>
                      <div className="text-xs font-bold text-white mt-1">{hw.name}</div>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-2 font-mono leading-tight">{hw.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* High-Mem Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/40">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>Cấu hình RAM Cao (--high-mem)</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  52GB System RAM
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Bật tùy chọn cấp phát thêm bộ nhớ hệ thống từ Google Colab cho các tác vụ xử lý dataset lớn.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={highMem}
                onChange={(e) => setHighMem(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          {/* Tunnel Selection (3 Modes) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              2. Chọn Chế Độ Tunnel Kết Nối SSH
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setTunnelMode('bore')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  tunnelMode === 'bore'
                    ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/40'
                    : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Khuyên Dùng · Mặc Định</div>
                <div className="text-xs font-bold text-white mt-1">Suzlab Auto Free Tunnel</div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Dùng binary <b>bore.pub</b> / <b>pinggy.io</b> tự cấp cổng. Không cần đăng ký hay nhập bất kỳ Token nào.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setTunnelMode('web_tty')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  tunnelMode === 'web_tty'
                    ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/40'
                    : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Trực Tiếp Trên Web</div>
                <div className="text-xs font-bold text-white mt-1">Web Terminal TTY Trực Tiếp</div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Mở console bash trực tiếp trên trình duyệt colab.suzlab.com mà không cần cài phần mềm ngoài.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setTunnelMode('ngrok')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  tunnelMode === 'ngrok'
                    ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/40'
                    : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Tùy Chọn Cá Nhân</div>
                <div className="text-xs font-bold text-white mt-1">Ngrok TCP Tunnel</div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Sử dụng tài khoản ngrok riêng của bạn với Auth Token để mở TCP tunnel cổng 22.
                </p>
              </button>
            </div>

            {tunnelMode === 'ngrok' && (
              <div className="mt-3 p-3 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Nhập NGROK_AUTHTOKEN cá nhân:</label>
                <input
                  type="password"
                  value={ngrokToken}
                  onChange={(e) => setNgrokToken(e.target.value)}
                  placeholder="2NgrOkToken..."
                  className="w-full px-3 py-2 text-xs font-mono bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}
          </div>

          {/* SSH Password Configuration */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              3. Mật Khẩu SSH Ban Đầu (User: colab)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={sshPassword}
                onChange={(e) => setSshPassword(e.target.value)}
                className="flex-1 px-3 py-2 text-xs font-mono bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                placeholder="123456"
              />
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                🎲 Tạo ngẫu nhiên
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Bạn có thể tạo thêm nhiều user SSH khác và đổi mật khẩu bất kỳ lúc nào trên Bảng điều khiển hoặc qua Bot Telegram.
            </p>
          </div>

          {/* Launch Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !user?.colab_connected}
              className="w-full py-4 px-6 text-sm sm:text-base font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform active:scale-98 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-slate-950" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Đang cấp phát máy ảo & nạp Agent vào RAM...</span>
                </>
              ) : !user?.colab_connected ? (
                <span>⚠️ Hãy hoàn thành liên kết Google Colab ở bước trên trước</span>
              ) : (
                <>
                  <span>⚡</span>
                  <span>BẬT TREO HỘ COLAB NGAY (24/7 AUTO TUNNEL)</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Confirmation Modal to Stop VM */}
      {showStopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-rose-400">⚠️</span>
              <span>Xác Nhận Tắt & Giải Phóng Máy Colab</span>
            </h3>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Bạn có chắc chắn muốn tắt máy ảo <b>{session?.machine_code}</b>? Mọi tiến trình SSH, cổng Tunnel và tác vụ chưa lưu trên máy ảo sẽ dừng lại ngay lập tức.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowStopModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
              >
                Hủy Bỏ
              </button>
              <button
                type="button"
                onClick={async () => {
                  setShowStopModal(false);
                  await onStopLab();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-sm transition-colors"
              >
                Tắt Máy Ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
