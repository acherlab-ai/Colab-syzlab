import React from 'react';

interface HeroSectionProps {
  onStartNow: () => void;
  onExplorePricing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartNow,
  onExplorePricing
}) => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle background cyber grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400">
              Dịch Vụ Đám Mây Độc Quyền Hệ Sinh Thái Suzlab
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              Treo Hộ Google Colab 24/7 & Cấp SSH Tự Động
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Giải pháp treo máy ảo Google Colab chạy liên tục trên hạ tầng <b>Railway</b>. Không cần giữ tab trình duyệt, bảo mật <b>Zero Source-Code Exposure</b> nạp trực tiếp qua RAM, tự động mở Tunnel và quản lý toàn diện qua Telegram Bot <b>@Colab_lab_bot</b>.
            </p>

            {/* Core Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartNow}
                className="px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl shadow-lg shadow-cyan-500/10 transition-all transform active:scale-95 whitespace-nowrap"
              >
                ⚡ Bật Treo Hộ Ngay
              </button>
              <button
                onClick={onExplorePricing}
                className="px-6 py-3 text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all whitespace-nowrap"
              >
                Xem Bảng Gói Dịch Vụ
              </button>
            </div>

            {/* Quiet metadata strip with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-4">
              <span>Chuẩn google-colab-cli</span>
              <span aria-hidden="true">·</span>
              <span>Keep-Alive Anti-Kill 24/7</span>
              <span aria-hidden="true">·</span>
              <span>Free Tunnel bore.pub</span>
              <span aria-hidden="true">·</span>
              <span>RAM Server &lt; 150MB</span>
            </div>
          </div>

          {/* Visual Showcase Box: Suzlab Architectural Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="text-cyan-400 font-semibold">SUZLAB CORE PROTOCOL</span>
                <span className="text-emerald-400 font-medium">STATUS: READY</span>
              </div>

              <div className="py-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 shrink-0 text-sm">
                    🔒
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Bảo Mật Zero-Code Exposure</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Script nén zlib + Base85 truyền thẳng vào RAM qua stdin. Không bao giờ lưu file .py trên /content hoặc Google Drive.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 shrink-0 text-sm">
                    ⚡
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Auto Free Tunnel Không Cần Token</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Tự động cấp phát cổng bore.pub công khai ngay khi bật máy. Người dùng không cần tài khoản hay cấu hình ngrok phức tạp.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-indigo-400 shrink-0 text-sm">
                    🤖
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Đồng Bộ @Colab_lab_bot 1-Chạm</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Bấm link gắn mã máy CL-XXXXXX để mở bảng điều khiển 100% Inline Buttons trên Telegram: Uptime, SSH, đổi mật khẩu.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-800/40 text-amber-400 shrink-0 text-sm">
                    🛡️
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Single-Session Lock (Khóa 1 Lab/User)</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Cô lập thư mục riêng tại /tmp/suzlab_users/{`{user_id}`} và đảm bảo 1 tài khoản chỉ giữ 1 phiên máy ảo tối ưu.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Hạ tầng: Railway Asia-East</span>
                <span className="text-cyan-400">colab.suzlab.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
