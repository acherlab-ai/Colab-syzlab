import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  activeSection: 'home' | 'dashboard' | 'pricing' | 'telegram' | 'ecosystem';
  setActiveSection: (section: 'home' | 'dashboard' | 'pricing' | 'telegram' | 'ecosystem') => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  hasActiveSession: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  activeSection,
  setActiveSection,
  onOpenAuth,
  onLogout,
  hasActiveSession
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => setActiveSection('home')}
          className="flex items-center gap-2 text-lg sm:text-xl font-extrabold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
        >
          <span className="text-cyan-400">⚡</span>
          <span>SUZLAB COLAB</span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveSection('home')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'home' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Trang Chủ
          </button>
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'dashboard' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Bảng Điều Khiển
          </button>
          <button
            onClick={() => setActiveSection('pricing')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'pricing' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Gói Dịch Vụ
          </button>
          <button
            onClick={() => setActiveSection('telegram')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'telegram' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Bot @Colab_lab_bot
          </button>
          <button
            onClick={() => setActiveSection('ecosystem')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeSection === 'ecosystem' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Hệ Sinh Thái Suzlab
          </button>
        </nav>

        {/* Zone 3: Account / Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-slate-200 truncate max-w-[120px]">
                  {user.username}
                </span>
                <span className="text-[11px] font-mono tabular-nums text-cyan-400">
                  {user.ccu_balance.toFixed(1)} CCU
                </span>
              </div>
              <button
                onClick={onLogout}
                className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Đăng Xuất
              </button>
              {hasActiveSession && (
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="px-3 py-1.5 text-xs font-medium text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  Lab Đang Chạy
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm shadow-cyan-500/20 transition-all whitespace-nowrap shrink-0"
            >
              Đăng Nhập / Đăng Ký
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
