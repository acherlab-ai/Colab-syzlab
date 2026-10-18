import React from 'react';

interface PricingSectionProps {
  onSelectPlan: (plan: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section className="py-16 sm:py-20 border-b border-slate-800/60 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
            Bảng Giá Dịch Vụ Đám Mây Treo Hộ
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Gói Dịch Vụ Treo Hộ Google Colab 24/7
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Hệ thống Suzlab tự động cấp phát máy, nạp SSH trong RAM, giữ kết nối liên tục và đồng bộ tức thời với Telegram Bot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1: Starter */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Cho Người Dùng Mới
              </div>
              <h3 className="text-xl font-bold text-white mt-1">Gói Trải Nghiệm</h3>
              <p className="text-xs text-slate-400 mt-2">
                Thử nghiệm quy trình treo hộ và trải nghiệm bot Telegram @Colab_lab_bot.
              </p>

              <div className="mt-6 mb-6">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums">0đ</span>
                <span className="text-xs text-slate-400 ml-1">/ vĩnh viễn</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-6">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>1 Máy Colab treo hộ (Single-Session)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Phần cứng CPU / T4 tiêu chuẩn</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Auto Free Tunnel bore.pub</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Bảo mật nạp RAM qua stdin</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-slate-500">×</span>
                  <span>Ưu tiên hàng đợi Railway</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('free')}
              className="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap"
            >
              Chọn Gói Trải Nghiệm
            </button>
          </div>

          {/* Plan 2: Standard (Featured) */}
          <div className="rounded-2xl border-2 border-cyan-500/80 bg-slate-900/90 p-6 flex flex-col justify-between relative shadow-xl shadow-cyan-950/20">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 rounded-full shadow">
              Khuyên Dùng · Phổ Biến Nhất
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mt-2">
                Cho Lập Trình Viên & Chạy Tool
              </div>
              <h3 className="text-xl font-bold text-white mt-1">Gói Tiêu Chuẩn 24/7</h3>
              <p className="text-xs text-slate-400 mt-2">
                Treo hộ 24/7 liên tục không bị ngắt quãng, bảo vệ Anti-Kill toàn diện.
              </p>

              <div className="mt-6 mb-6">
                <span className="text-3xl font-extrabold text-cyan-400 font-mono tabular-nums">49.000đ</span>
                <span className="text-xs text-slate-400 ml-1">/ tháng (hoặc $2.0)</span>
              </div>

              <div className="space-y-3 text-xs text-slate-200 border-t border-slate-800 pt-6">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span className="font-medium text-white">Treo hộ 24/7 Anti-Kill Keep-Alive</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Phần cứng GPU T4 16GB / GPU L4 24GB</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Auto Free Tunnel (bore.pub / pinggy.io)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Quản lý 100% bằng Bot @Colab_lab_bot</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Web Terminal trực tiếp trên trình duyệt</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Quản lý & tạo nhiều SSH User bằng 1-chạm</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('standard')}
              className="mt-8 w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap"
            >
              ⚡ Đăng Ký Treo Hộ 24/7
            </button>
          </div>

          {/* Plan 3: Pro AI */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Cho AI Research & Model Training
              </div>
              <h3 className="text-xl font-bold text-white mt-1">Gói Chuyên Nghiệp Pro AI</h3>
              <p className="text-xs text-slate-400 mt-2">
                Hỗ trợ phần cứng cao cấp nhất, High-RAM và tốc độ đường truyền ưu tiên.
              </p>

              <div className="mt-6 mb-6">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums">149.000đ</span>
                <span className="text-xs text-slate-400 ml-1">/ tháng (hoặc $6.0)</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-6">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>GPU A100 40GB / H100 80GB / TPU v5e1</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Công tắc High-RAM 52GB System RAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Đầy đủ 3 chế độ: bore, ngrok, Web TTY</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Giám sát & Tự phục hồi Kernel khi sập</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Hỗ trợ kỹ thuật 1-1 qua Telegram</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('pro')}
              className="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap"
            >
              Chọn Gói Pro AI
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
