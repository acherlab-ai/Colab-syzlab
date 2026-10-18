import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-sm font-extrabold text-white">
              <span className="text-cyan-400">⚡</span>
              <span>SUZLAB COLAB</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nền tảng dịch vụ đám mây cho thuê & treo hộ máy ảo Google Colab 24/7 trực thuộc Hệ sinh thái Suzlab. Triển khai nhẹ &lt; 150MB trên Railway.
            </p>
          </div>

          {/* Core Features */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Hạ Tầng & Công Nghệ</h4>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li>google-colab-cli chính thức</li>
              <li>Bảo mật nạp RAM qua stdin</li>
              <li>Auto Free Tunnel bore.pub</li>
              <li>Keep-Alive Anti-Kill 24/7</li>
            </ul>
          </div>

          {/* Telegram Ecosystem */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Điều Khiển & Bot</h4>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li>
                <a
                  href="https://t.me/Colab_lab_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Telegram Bot: @Colab_lab_bot ↗
                </a>
              </li>
              <li>Báo cáo Uptime & Hệ thống</li>
              <li>Tạo & Quản lý nhiều User SSH</li>
              <li>Đổi mật khẩu đồng loạt</li>
            </ul>
          </div>

          {/* Suzlab Network */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Hệ Sinh Thái Suzlab</h4>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li>
                <span className="text-slate-300">colab.suzlab.com</span> (Cloud Colab)
              </li>
              <li>
                <span className="text-slate-300">suzlab.com</span> (Trang Chủ Hệ Sinh Thái)
              </li>
              <li>Triển khai trên Railway Docker</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Hệ sinh thái Suzlab (Suzlab Ecosystem). Mọi quyền được bảo lưu.
          </div>
          <div className="flex items-center gap-4">
            <span>Bảo Mật Zero Source-Code</span>
            <span>·</span>
            <span>Single-Session Lock</span>
            <span>·</span>
            <span>Railway Deploy Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
