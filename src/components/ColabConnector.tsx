import React, { useState } from 'react';
import { User } from '../types';

interface ColabConnectorProps {
  user: User | null;
  onLinkColab: (authCode: string) => Promise<boolean>;
  onUnlinkColab: () => void;
  hasActiveSession: boolean;
}

export const ColabConnector: React.FC<ColabConnectorProps> = ({
  user,
  onLinkColab,
  onUnlinkColab,
  hasActiveSession
}) => {
  const [authCode, setAuthCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const googleOAuthScopes = [
    'openid',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/colaboratory',
    'https://www.googleapis.com/auth/cloud-platform'
  ];

  const handleOpenGoogleAuth = () => {
    const clientId = '32555940559.apps.googleusercontent.com';
    const redirectUri = 'https://sdk.cloud.google.com/applicationdefaultauthcode.html';
    const scopeStr = encodeURIComponent(googleOAuthScopes.join(' '));
    const url = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopeStr}&access_type=offline&prompt=consent`;
    
    window.open(url, '_blank', 'width=600,height=700');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authCode.trim()) {
      setMessage({ text: 'Vui lòng dán mã xác thực nhận được từ Google.', type: 'error' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const success = await onLinkColab(authCode.trim());
      if (success) {
        setMessage({ text: 'Liên kết tài khoản Google Colab thành công!', type: 'success' });
        setAuthCode('');
      } else {
        setMessage({ text: 'Mã xác thực không đúng hoặc đã hết hạn. Hãy thử lấy lại mã mới.', type: 'error' });
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Lỗi khi kết nối Google Colab', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>🔗</span>
            <span>Liên Kết Tài Khoản Google Colab Cá Nhân</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Sử dụng giao thức xác thực chính thức của <b>google-colab-cli</b> với 4 Scopes bảo mật.
          </p>
        </div>

        {user?.colab_connected ? (
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Đã Kết Nối
            </span>
            <button
              onClick={onUnlinkColab}
              className="text-xs text-slate-400 hover:text-rose-400 underline transition-colors"
            >
              Đổi tài khoản
            </button>
          </div>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/50">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Chưa Kết Nối
          </span>
        )}
      </div>

      {user?.colab_connected ? (
        /* Connected State Overview */
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40">
            <div className="text-xs text-slate-400 font-medium">Tài Khoản Google Đã Gắn</div>
            <div className="text-sm font-semibold text-white mt-1 truncate" title={user.colab_email}>
              {user.colab_email || 'user.colab@gmail.com'}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 font-mono">Xác thực OAuth2 Token OK</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40">
            <div className="text-xs text-slate-400 font-medium">Số Dư Compute Units (CCU)</div>
            <div className="text-xl font-extrabold text-cyan-400 mt-0.5 font-mono tabular-nums">
              {user.ccu_balance.toFixed(1)} <span className="text-xs font-normal text-slate-400">CCU</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">
              Tiêu thụ: ~{user.ccu_rate > 0 ? user.ccu_rate.toFixed(2) : '1.96'} CCU/giờ (GPU T4)
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40">
            <div className="text-xs text-slate-400 font-medium">Hạn Mức Máy Ảo Suzlab</div>
            <div className="text-lg font-bold text-white mt-1 font-mono">
              {hasActiveSession ? (
                <span className="text-amber-400">1 / 1 Lab Đang Chạy</span>
              ) : (
                <span className="text-emerald-400">0 / 1 Lab Hoạt Động</span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Khóa cứng 1 tài khoản = 1 Lab (Single-Session)
            </div>
          </div>
        </div>
      ) : (
        /* 2-Step OAuth2 Setup Flow */
        <div className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Step 1 */}
            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-400 text-xs font-bold font-mono">
                  1
                </span>
                <h3 className="text-sm font-semibold text-white">Mở Trang Ủy Quyền Của Google</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Đăng nhập tài khoản Google có Google Colab của bạn và nhấn <b>Allow (Cho phép)</b> để cấp quyền CLI quản lý phiên máy ảo.
              </p>
              <button
                type="button"
                onClick={handleOpenGoogleAuth}
                className="mt-4 w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
              >
                <span>🔑</span>
                <span>1. Mở trang cấp quyền Google</span>
              </button>
            </div>

            {/* Step 2 */}
            <form onSubmit={handleVerify} className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 text-xs font-bold font-mono">
                  2
                </span>
                <h3 className="text-sm font-semibold text-white">Dán Mã Xác Thực Google</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Sau khi bấm Cho phép, Google sẽ trả về mã xác thực <code>4/0A...</code>. Hãy copy và dán vào đây:
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  placeholder="Dán mã Authorization Code tại đây (VD: 4/0AbCd...)"
                  className="w-full px-3 py-2 text-xs font-mono bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {loading ? (
                    <span>Đang kiểm tra colab whoami...</span>
                  ) : (
                    <>
                      <span>✓</span>
                      <span>2. Xác nhận liên kết tài khoản</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg text-xs font-medium ${
                message.type === 'success'
                  ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/50'
                  : 'bg-rose-950/50 text-rose-300 border border-rose-800/50'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Quick simulation helper for instant preview testing */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => {
                setAuthCode('4/0AV9sz_SUZLAB_SIMULATED_OAUTH_CODE_2026');
              }}
              className="text-[11px] text-cyan-400/70 hover:text-cyan-400 underline transition-colors"
            >
              (Thử nghiệm nhanh: Điền mã mẫu giả lập)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
