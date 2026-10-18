import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { TranslationStrings } from '../i18n';

interface PricingSectionProps {
  t: TranslationStrings;
  onSelectPlan: (plan: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ t, onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-2">
              {t.pricing.kicker}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.pricing.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400">
              {t.pricing.subtitle}
            </p>
          </div>

          {/* Interactive Billing Cadence Switcher */}
          <div className="inline-flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl self-start">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                billingCycle === 'monthly'
                  ? 'bg-cyan-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.pricing.monthly}
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                billingCycle === 'annual'
                  ? 'bg-cyan-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.pricing.annual}
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Plan 1: Starter */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">{t.pricing.starterName}</h3>
              <p className="text-xs text-slate-400 mt-1.5 min-h-[34px]">{t.pricing.starterDesc}</p>

              <div className="my-6">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums">$0</span>
                <span className="text-xs text-slate-400 ml-1">/ 0đ</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-5">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1 Lab Single-Session (suzlab_main)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>CPU / GPU T4 Standard Runtime</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Auto Free Tunnel (bore.pub)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% In-Memory Stdin Security</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan('free')}
              className="min-h-[44px] mt-8 w-full py-2.5 px-4 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap"
            >
              {t.pricing.selectBtn}
            </button>
          </div>

          {/* Plan 2: Standard 24/7 */}
          <div className="rounded-2xl border-2 border-cyan-400 bg-slate-900 p-6 flex flex-col justify-between shadow-xl shadow-cyan-950/30">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{t.pricing.standardName}</h3>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  {t.pricing.popularBadge}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 min-h-[34px]">{t.pricing.standardDesc}</p>

              <div className="my-6">
                <span className="text-3xl font-extrabold text-cyan-400 font-mono tabular-nums">
                  {billingCycle === 'monthly' ? '49.000đ' : '39.000đ'}
                </span>
                <span className="text-xs text-slate-400 ml-1">
                  / {billingCycle === 'monthly' ? '$2.00' : '$1.60'}
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-200 border-t border-slate-800 pt-5">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-semibold text-white">24/7 Anti-Kill Keep-Alive Daemon</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>GPU T4 (16GB) / GPU L4 (24GB)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>bore.pub + pinggy.io + Web Terminal TTY</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Telegram Bot @Colab_lab_bot 100% Inline</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Unlimited Multi-User SSH Sudo Accounts</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan('standard')}
              className="min-h-[44px] mt-8 w-full py-2.5 px-4 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl transition-all whitespace-nowrap shadow-md shadow-cyan-500/20"
            >
              ⚡ {t.pricing.selectBtn}
            </button>
          </div>

          {/* Plan 3: Pro AI */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">{t.pricing.proName}</h3>
              <p className="text-xs text-slate-400 mt-1.5 min-h-[34px]">{t.pricing.proDesc}</p>

              <div className="my-6">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                  {billingCycle === 'monthly' ? '149.000đ' : '119.000đ'}
                </span>
                <span className="text-xs text-slate-400 ml-1">
                  / {billingCycle === 'monthly' ? '$6.00' : '$4.80'}
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-5">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>GPU A100 (40GB) / H100 (80GB) / TPU v6e1</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High-RAM 52GB System Memory (--high-mem)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom Ngrok TCP + Bore + Web TTY</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Auto Kernel Restart & Payload Re-Injection</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan('pro')}
              className="min-h-[44px] mt-8 w-full py-2.5 px-4 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap"
            >
              {t.pricing.selectBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
