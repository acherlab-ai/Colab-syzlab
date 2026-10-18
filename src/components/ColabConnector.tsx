import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, RefreshCw, KeyRound } from 'lucide-react';
import { User } from '../types';
import { TranslationStrings } from '../i18n';

interface ColabConnectorProps {
  user: User | null;
  t: TranslationStrings;
  onLinkColab: (authCode: string) => Promise<boolean>;
  onUnlinkColab: () => void;
  onOpenAuth: () => void;
  hasActiveSession: boolean;
}

export const ColabConnector: React.FC<ColabConnectorProps> = ({
  user,
  t,
  onLinkColab,
  onUnlinkColab,
  onOpenAuth,
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
    const url = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scopeStr}&access_type=offline&prompt=consent`;
    window.open(url, '_blank', 'width=600,height=700');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authCode.trim()) return;
    setLoading(true);
    setMessage(null);
    try {
      const ok = await onLinkColab(authCode.trim());
      if (ok) {
        setMessage({ text: t.colabLink.connected, type: 'success' });
        setAuthCode('');
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Verification error', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">{t.colabLink.title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{t.colabLink.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {user?.colab_connected ? (
            <>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.colabLink.connected}</span>
              </span>
              <button
                type="button"
                onClick={onUnlinkColab}
                className="text-xs text-slate-400 hover:text-rose-400 underline transition-colors whitespace-nowrap"
              >
                {t.colabLink.changeAccount}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
            >
              {t.nav.signInGoogle}
            </button>
          )}
        </div>
      </div>

      {user?.colab_connected ? (
        <div className="pt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="text-xs text-slate-400">{t.colabLink.linkedEmail}</div>
            <div className="text-sm font-bold text-white mt-1 truncate">
              {user.colab_email || user.email}
            </div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1">
              OAuth2 Token · 4 Scopes Active
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="text-xs text-slate-400">{t.colabLink.ccuBalance}</div>
            <div className="text-xl font-extrabold text-cyan-400 font-mono tabular-nums mt-0.5">
              {user.ccu_balance.toFixed(1)} <span className="text-xs font-normal text-slate-400">CCU</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-1">
              ~{user.ccu_rate > 0 ? user.ccu_rate.toFixed(2) : '1.96'} CCU/h
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="text-xs text-slate-400">{t.colabLink.labQuota}</div>
            <div className="text-base font-bold text-white font-mono mt-1">
              {hasActiveSession ? (
                <span className="text-amber-400">1 / 1 Active (suzlab_main)</span>
              ) : (
                <span className="text-emerald-400">0 / 1 Ready</span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              /tmp/suzlab_users/{user.id.slice(0, 8)}
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 1 */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">{t.colabLink.step1Title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t.colabLink.step1Desc}</p>
              </div>
              <button
                type="button"
                onClick={handleOpenGoogleAuth}
                className="min-h-[44px] w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.colabLink.step1Btn}</span>
              </button>
            </div>

            {/* Step 2 */}
            <form onSubmit={handleVerify} className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
              <div>
                <h3 className="text-sm font-bold text-white">{t.colabLink.step2Title}</h3>
                <p className="text-xs text-slate-400 mt-1">{t.colabLink.step2Desc}</p>
              </div>
              <input
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder={t.colabLink.step2Placeholder}
                className="w-full px-3 py-2.5 text-xs font-mono bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="min-h-[44px] w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                <span>{t.colabLink.step2Btn}</span>
              </button>
            </form>
          </div>

          {message && (
            <div className="p-3 rounded-xl text-xs font-medium bg-emerald-950/50 text-emerald-300 border border-emerald-800/50">
              {message.text}
            </div>
          )}

          <div className="flex items-center justify-between text-xs pt-1">
            <button
              type="button"
              onClick={onOpenAuth}
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline"
            >
              {t.hero.googleFastLogin} →
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthCode('4/0AV9sz_SUZLAB_GOOGLE_OAUTH_VERIFIED_2026');
              }}
              className="text-slate-400 hover:text-white underline text-[11px]"
            >
              {t.colabLink.quickDemoBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
