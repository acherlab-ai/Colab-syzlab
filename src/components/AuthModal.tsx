import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, CheckCircle2, X } from 'lucide-react';
import { TranslationStrings } from '../i18n';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationStrings;
  onGoogleAuth: (email: string, name: string, autoLinkColab: boolean, oauthCode?: string) => Promise<boolean>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  t,
  onGoogleAuth
}) => {
  const [googleEmail, setGoogleEmail] = useState('nguyenhung42154.016@gmail.com');
  const [googleName, setGoogleName] = useState('Nguyen Hung');
  const [autoLinkColab, setAutoLinkColab] = useState(true);
  const [oauthCode, setOauthCode] = useState('');
  const [mode, setMode] = useState<'instant' | 'oauth'>('instant');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const openGoogleOAuthPopup = () => {
    const scopes = [
      'openid',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/colaboratory',
      'https://www.googleapis.com/auth/cloud-platform'
    ];
    const clientId = '32555940559.apps.googleusercontent.com';
    const redirectUri = 'https://sdk.cloud.google.com/applicationdefaultauthcode.html';
    const url = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes.join(' '))}&access_type=offline&prompt=consent`;
    window.open(url, '_blank', 'width=560,height=680');
  };

  const handleOneTapAccount = async (email: string, name: string) => {
    setError(null);
    setLoading(true);
    try {
      const ok = await onGoogleAuth(email, name, true);
      if (ok) onClose();
    } catch (err: any) {
      setError(err.message || 'Google verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail.trim() || !googleEmail.includes('@')) {
      setError('Vui lòng nhập địa chỉ Gmail hợp lệ');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const ok = await onGoogleAuth(
        googleEmail.trim(),
        googleName.trim() || googleEmail.split('@')[0],
        autoLinkColab,
        oauthCode.trim() || undefined
      );
      if (ok) onClose();
    } catch (err: any) {
      setError(err.message || 'Lỗi xác thực Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-slate-900 border-t sm:border border-slate-700/90 rounded-t-3xl sm:rounded-2xl p-6 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Mobile grab bar */}
        <div className="sm:hidden w-10 h-1.5 bg-slate-700 rounded-full mx-auto mb-4" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-md shrink-0">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
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
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white leading-snug">{t.auth.modalTitle}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{t.auth.modalSubtitle}</p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => setMode('instant')}
            className={`py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              mode === 'instant' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Google 1-Tap Login
          </button>
          <button
            type="button"
            onClick={() => setMode('oauth')}
            className={`py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              mode === 'oauth' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Google OAuth2 SDK
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
            {error}
          </div>
        )}

        {/* Quick 1-Tap Verified Account Card */}
        <div className="mb-5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            {t.auth.continueWithGoogle}
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleOneTapAccount('nguyenhung42154.016@gmail.com', 'Nguyen Hung')}
            className="w-full p-3.5 rounded-xl border border-slate-700/90 bg-slate-950/90 hover:bg-slate-800/80 hover:border-cyan-500/60 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center shrink-0">
                N
              </div>
              <div className="text-left min-w-0">
                <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                  <span>Nguyen Hung</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </div>
                <div className="text-[11px] text-slate-400 font-mono truncate">
                  nguyenhung42154.016@gmail.com
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-cyan-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2">
              1-Tap →
            </span>
          </button>
        </div>

        {/* Custom Google Account or OAuth2 Code Form */}
        <form onSubmit={handleSubmit} className="space-y-4 border-t border-slate-800 pt-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t.auth.googleEmailLabel}
            </label>
            <input
              type="email"
              required
              value={googleEmail}
              onChange={(e) => setGoogleEmail(e.target.value)}
              placeholder="your.account@gmail.com"
              className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t.auth.googleNameLabel}
            </label>
            <input
              type="text"
              value={googleName}
              onChange={(e) => setGoogleName(e.target.value)}
              placeholder="Tên của bạn"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {mode === 'oauth' && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-400">Google Cloud SDK OAuth2</span>
                <button
                  type="button"
                  onClick={openGoogleOAuthPopup}
                  className="text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1"
                >
                  <span>Mở Google OAuth</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
              <input
                type="text"
                value={oauthCode}
                onChange={(e) => setOauthCode(e.target.value)}
                placeholder={t.colabLink.step2Placeholder}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          )}

          <label className="flex items-start gap-2.5 cursor-pointer select-none pt-1">
            <input
              type="checkbox"
              checked={autoLinkColab}
              onChange={(e) => setAutoLinkColab(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-700 text-cyan-400 focus:ring-0"
            />
            <span className="text-xs text-slate-300 leading-snug">{t.auth.autoLinkColabCheckbox}</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[44px] py-3 px-4 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? '...' : t.auth.verifyGoogleBtn}</span>
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-800/80 text-center text-[11px] text-slate-400">
          {t.auth.securityNote}
        </div>
      </div>
    </div>
  );
};
