import React, { useState, useRef, useEffect } from 'react';
import { Home, Cpu, Terminal, Send, CreditCard, Globe, LogOut, Check, UserCheck } from 'lucide-react';
import { User, NavSection } from '../types';
import { LanguageCode, SUPPORTED_LANGUAGES, TranslationStrings } from '../i18n';

interface HeaderProps {
  user: User | null;
  activeSection: NavSection;
  setActiveSection: (section: NavSection) => void;
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: TranslationStrings;
  onOpenAuth: () => void;
  onLogout: () => void;
  hasActiveSession: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  activeSection,
  setActiveSection,
  lang,
  setLang,
  t,
  onOpenAuth,
  onLogout,
  hasActiveSession
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];

  const navItems: { id: NavSection; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.nav.home, icon: <Home className="w-5 h-5" /> },
    { id: 'dashboard', label: t.nav.dashboard, icon: <Cpu className="w-5 h-5" /> },
    { id: 'ssh', label: t.nav.sshTerminal, icon: <Terminal className="w-5 h-5" /> },
    { id: 'telegram', label: t.nav.telegramBot, icon: <Send className="w-5 h-5" /> },
    { id: 'pricing', label: t.nav.pricing, icon: <CreditCard className="w-5 h-5" /> }
  ];

  return (
    <>
      {/* TOP BAR (Desktop 3-Zone Contract + Compact Mobile Top Bar) */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 lg:gap-8 px-4 sm:px-6 h-14 sm:h-16">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => setActiveSection('home')}
            className="text-base sm:text-lg font-extrabold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            ⚡ SUZLAB COLAB
          </button>

          {/* Zone 2: Desktop Navigation Links (5 clean single-line text links) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? 'text-cyan-400 border-cyan-400 font-semibold'
                      : 'text-slate-400 border-transparent hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language Switcher (12 Languages) + Google Auth Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* 12-Language Switcher Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                aria-label="Select Language"
                className="min-h-[38px] px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono">{currentLangMeta.shortLabel}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl py-2 z-50 grid grid-cols-1 max-h-80 overflow-y-auto">
                  <div className="px-3 py-1.5 text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800/80">
                    12 Languages · Global i18n
                  </div>
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setLang(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                        lang === l.code
                          ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[11px] text-slate-400 w-6">{l.shortLabel}</span>
                        <span>{l.nativeName}</span>
                      </div>
                      {lang === l.code && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Google Account / Primary Auth Button */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="min-h-[38px] px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 text-slate-950 font-extrabold text-[11px] flex items-center justify-center">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline max-w-[110px] truncate">{user.email}</span>
                  <span className="font-mono text-cyan-400 tabular-nums hidden lg:inline">
                    · {user.ccu_balance.toFixed(1)} CCU
                  </span>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl p-4 z-50 space-y-3">
                    <div className="pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs font-bold text-white truncate">{user.username}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">{user.email}</div>
                      <div className="mt-2 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-emerald-400">{t.auth.verifiedBadge}</span>
                        <span className="text-cyan-400 tabular-nums">{user.ccu_balance.toFixed(1)} CCU</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSection('dashboard');
                          setProfileMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-medium text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        {t.nav.dashboard} ({hasActiveSession ? t.nav.activeLab : '0/1 Lab'})
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onOpenAuth();
                          setProfileMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-medium text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        {t.colabLink.changeAccount}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onLogout();
                          setProfileMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-medium text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t.nav.signOut}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="min-h-[38px] px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-lg shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
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
                <span>{t.nav.signInGoogle}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE DEDICATED FIXED BOTTOM NAVIGATION BAR (Thumb-Zone Ergonomics) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 grid grid-cols-5 items-center px-1"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={`min-h-[48px] flex flex-col items-center justify-center rounded-xl transition-colors ${
                isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.id === 'dashboard' && hasActiveSession && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 truncate max-w-[68px] whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
