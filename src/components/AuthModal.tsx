import React, { useState } from 'react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (login: string, pwd: string) => Promise<boolean>;
  onRegister: (email: string, username: string, pwd: string) => Promise<boolean>;
  onGoogleAuth: (email: string, name: string) => Promise<boolean>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  onGoogleAuth
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (tab === 'login') {
        const ok = await onLogin(loginInput, password);
        if (ok) onClose();
      } else {
        const ok = await onRegister(email, username, password);
        if (ok) onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Lỗi xác thực');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const ok = await onGoogleAuth('nguyenhung42154.016@gmail.com', 'Nguyen Hung');
      if (ok) onClose();
    } catch (err: any) {
      setError(err.message || 'Lỗi xác thực Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm p-1 rounded-lg"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-cyan-400 font-extrabold text-lg">
            <span>⚡</span>
            <span>SUZLAB CLOUD AUTH</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            {tab === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Tài Khoản Mới'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Hệ sinh thái dịch vụ đám mây & treo hộ Google Colab Suzlab
          </p>
        </div>

        {/* 1-Tap Google Fast Login */}
        <button
          type="button"
          onClick={handleQuickGoogle}
          disabled={loading}
          className="w-full py-2.5 px-4 mb-5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Đăng nhập nhanh bằng Google (1-Chạm)</span>
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 border-t border-slate-800" />
          <span className="text-[11px] font-mono text-slate-500 uppercase">Hoặc email</span>
          <div className="flex-1 border-t border-slate-800" />
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl mb-4 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setError(null);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'login' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Đăng Nhập
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setError(null);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'register' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Đăng Ký
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-lg bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email:</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tên tài khoản (Username):</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="suzlab_user"
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </>
          )}

          {tab === 'login' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email hoặc Username:</label>
              <input
                type="text"
                required
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                placeholder="Email hoặc tên đăng nhập"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Mật khẩu:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl transition-all shadow-md shadow-cyan-500/20"
          >
            {loading ? 'Đang xử lý...' : tab === 'login' ? 'Đăng Nhập Ngay' : 'Hoàn Tất Đăng Ký'}
          </button>
        </form>
      </div>
    </div>
  );
};
