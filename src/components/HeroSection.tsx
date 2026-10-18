import React, { useState } from 'react';
import { Terminal, Shield, Cpu, Send, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { TranslationStrings } from '../i18n';
import { ColabSession, User } from '../types';

interface HeroSectionProps {
  t: TranslationStrings;
  user: User | null;
  session: ColabSession | null;
  onStartNow: () => void;
  onExploreSSH: () => void;
  onOpenAuth: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  t,
  user,
  session,
  onStartNow,
  onExploreSSH,
  onOpenAuth
}) => {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeArchTab, setActiveArchTab] = useState<'ram' | 'tunnel' | 'bot'>('ram');

  const sampleSshCmd = `ssh colab@${session?.ssh_host || 'bore.pub'} -p ${session?.ssh_port || 45123}`;

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(sampleSshCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION: Desktop 12-Col Split + Mobile Ergonomic Stack */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 lg:pt-20 pb-12 border-b border-slate-800/70 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950">
        {/* Subtle technical radial grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column (7 cols on Desktop): Headline, Copy, Primary CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6">
              <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400">
                {t.hero.kicker}
              </div>

              <h1
                className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                {t.hero.title}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {t.hero.subtitle}
              </p>

              {/* Action Buttons (Touch-Friendly >=48px on Mobile) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onStartNow}
                  className="min-h-[48px] px-6 py-3.5 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl shadow-lg shadow-cyan-500/15 transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98]"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {!user ? (
                  <button
                    type="button"
                    onClick={onOpenAuth}
                    className="min-h-[48px] px-5 py-3.5 text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-all flex items-center justify-center gap-2.5 whitespace-nowrap shadow-sm"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                    <span>{t.hero.googleFastLogin}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onExploreSSH}
                    className="min-h-[48px] px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>{t.hero.secondaryCta}</span>
                  </button>
                )}
              </div>

              {/* Clean Unboxed Metadata with Typographic Separators */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-400 pt-2">
                <span>google-colab-cli Official</span>
                <span aria-hidden="true">·</span>
                <span>Single-Session Lock</span>
                <span aria-hidden="true">·</span>
                <span>@Colab_lab_bot Ready</span>
                <span aria-hidden="true">·</span>
                <span>12 Languages Supported</span>
              </div>
            </div>

            {/* Right Column (5 cols on Desktop): Interactive Live Cloud Node & Stdin Preview */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-2xl flex flex-col justify-between space-y-5">
                {/* Top Header of Showcase Card */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white">
                      Suzlab Cloud Runtime Console
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      Session: suzlab_main · ID: {session?.machine_code || 'CL-9A4F2E'}
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 tabular-nums">
                    {session?.hardware_type || 'GPU T4 16GB'}
                  </span>
                </div>

                {/* Interactive Segmented Control inside Card */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800/80 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveArchTab('ram')}
                    className={`py-1.5 px-2 rounded-lg font-medium transition-colors whitespace-nowrap truncate ${
                      activeArchTab === 'ram'
                        ? 'bg-slate-800 text-cyan-300 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    RAM Stdin
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveArchTab('tunnel')}
                    className={`py-1.5 px-2 rounded-lg font-medium transition-colors whitespace-nowrap truncate ${
                      activeArchTab === 'tunnel'
                        ? 'bg-slate-800 text-emerald-300 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Auto Tunnel
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveArchTab('bot')}
                    className={`py-1.5 px-2 rounded-lg font-medium transition-colors whitespace-nowrap truncate ${
                      activeArchTab === 'bot'
                        ? 'bg-slate-800 text-sky-300 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    @Colab_lab_bot
                  </button>
                </div>

                {/* Dynamic Content Based on Tab */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 font-mono text-xs space-y-2.5">
                  {activeArchTab === 'ram' && (
                    <>
                      <div className="text-[11px] text-slate-400">
                        Zero Source-Code Exposure (RAM Stdin Pipe):
                      </div>
                      <div className="text-cyan-300 break-all leading-relaxed text-[11px]">
                        $ echo &quot;import zlib,base64;exec(zlib.decompress(base64.b85decode(&apos;c-o6*ierk...&apos;)))&quot; | colab --config sessions.json exec -s suzlab_main
                      </div>
                      <div className="text-[11px] text-emerald-400 pt-1">
                        ✓ 0 files written to /content or Google Drive
                      </div>
                    </>
                  )}

                  {activeArchTab === 'tunnel' && (
                    <>
                      <div className="text-[11px] text-slate-400">
                        Suzlab Auto Free Tunnel (bore.pub / pinggy.io):
                      </div>
                      <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-emerald-400 font-semibold truncate">
                          {sampleSshCmd}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyCmd}
                          className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-white rounded flex items-center gap-1 shrink-0"
                        >
                          {copiedCmd ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCmd ? t.telemetry.copiedBtn : t.telemetry.copyBtn}</span>
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Port 22 OpenSSH · User: colab (NOPASSWD:ALL)
                      </div>
                    </>
                  )}

                  {activeArchTab === 'bot' && (
                    <>
                      <div className="text-[11px] text-slate-400">
                        Telegram Inline Control (@Colab_lab_bot):
                      </div>
                      <div className="text-sky-300 text-[11px]">
                        https://t.me/Colab_lab_bot?start={session?.machine_code || 'CL-9A4F2E'}
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                        <span className="p-1.5 rounded bg-slate-900 text-slate-200 text-center">📊 Uptime & RAM</span>
                        <span className="p-1.5 rounded bg-slate-900 text-slate-200 text-center">📋 SSH Command</span>
                        <span className="p-1.5 rounded bg-slate-900 text-slate-200 text-center">➕ Create User</span>
                        <span className="p-1.5 rounded bg-slate-900 text-slate-200 text-center">🔑 Rotate Pass</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Live Telemetry Summary Bar */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
                  <div>
                    <div className="text-[10px] text-slate-400">RAM Colab</div>
                    <div className="text-xs font-mono font-bold text-white tabular-nums mt-0.5">
                      2.4 / 12.7 GB
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">SSD Disk</div>
                    <div className="text-xs font-mono font-bold text-white tabular-nums mt-0.5">
                      31.8 / 108 GB
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Keep-Alive</div>
                    <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                      24/7 ACTIVE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column KPI Strip Below Hero Split */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40">
              <div className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-mono tabular-nums">
                24/7/365
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">{t.hero.statUptime}</div>
            </div>
            <div className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">
                &lt; 150 MB
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">{t.hero.statRam}</div>
            </div>
            <div className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40">
              <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono tabular-nums">
                0 Token
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">{t.hero.statTunnel}</div>
            </div>
            <div className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40">
              <div className="text-xl sm:text-2xl font-extrabold text-sky-400 font-mono tabular-nums">
                Zero-File
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">{t.hero.statSecurity}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE ARCHITECTURAL FEATURES SECTION (4 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.features.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {t.features.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{t.features.f1Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">{t.features.f1Desc}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{t.features.f2Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">{t.features.f2Desc}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{t.features.f3Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">{t.features.f3Desc}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{t.features.f4Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">{t.features.f4Desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
