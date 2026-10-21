// ============================================================================
// COMPONENTE: ChallengeSection (Explicação do Desafio NASA Space Apps 2026)
// Responsabilidade: Apresentar os 4 pilares de engenharia espacial (Massa, Potência,
// Telecomunicações e Orçamento) com tradução dinâmica e integração direta com o jogo 3D.
// Comentários: Todos em Português conforme solicitado pela equipa.
// ============================================================================

import React from 'react';
import { Weight, SunMedium, Radio, DollarSign, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { playSound } from '../../utils/audio';

export default function ChallengeSection({ onOpenSimulator, soundEnabled = true, t = (k) => k }) {
  // Os 4 pilares fundamentais da engenharia de missões espaciais
  const pillars = [
    {
      id: 'mass',
      title: t('pillar_mass_title'),
      badge: t('pillar_mass_badge'),
      summary: t('pillar_mass_summary'),
      details: t('pillar_mass_details'),
      warning: t('pillar_mass_warning'),
      icon: Weight,
      color: 'from-amber-500/20 to-orange-600/20',
      border: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    {
      id: 'power',
      title: t('pillar_power_title'),
      badge: t('pillar_power_badge'),
      summary: t('pillar_power_summary'),
      details: t('pillar_power_details'),
      warning: t('pillar_power_warning'),
      icon: SunMedium,
      color: 'from-yellow-500/20 to-amber-600/20',
      border: 'border-yellow-500/30',
      iconColor: 'text-yellow-400',
    },
    {
      id: 'comms',
      title: t('pillar_comms_title'),
      badge: t('pillar_comms_badge'),
      summary: t('pillar_comms_summary'),
      details: t('pillar_comms_details'),
      warning: t('pillar_comms_warning'),
      icon: Radio,
      color: 'from-cyan-500/20 to-blue-600/20',
      border: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
    },
    {
      id: 'budget',
      title: t('pillar_budget_title'),
      badge: t('pillar_budget_badge'),
      summary: t('pillar_budget_summary'),
      details: t('pillar_budget_details'),
      warning: t('pillar_budget_warning'),
      icon: DollarSign,
      color: 'from-emerald-500/20 to-teal-600/20',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
  ];

  const handleLaunchGame = () => {
    playSound('launch', soundEnabled);
    if (onOpenSimulator) onOpenSimulator();
  };

  return (
    <section id="desafio" className="py-20 relative border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <span>{t('challenge_badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('challenge_title')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('challenge_desc')}
          </p>
        </div>

        {/* Grelha dos 4 Pilares de Engenharia de Sistemas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${pillar.color} border ${pillar.border} backdrop-blur-sm flex flex-col justify-between transition-all duration-300 hover:scale-[1.01]`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${pillar.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg sm:text-xl font-mono">
                          {pillar.title}
                        </h3>
                        <span className="text-xs font-mono text-slate-400">
                          {pillar.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-200 text-sm font-medium leading-relaxed">
                    {pillar.summary}
                  </p>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.details}
                  </p>
                </div>

                {/* Caixa de aviso de impacto direto no jogo */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-300 mr-1.5 font-mono">
                        {t('impact_critical')}
                      </span>
                      <span className="text-slate-300">
                        {pillar.warning}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Faixa inferior de chamada para testar no Simulador 3D */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-cyan-950/30 to-slate-900/90 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h4 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{t('challenge_tested_in_game')}</span>
            </h4>
            <p className="text-xs text-slate-400 max-w-xl">
              {t('hero_banner_sub')}
            </p>
          </div>

          <button
            onClick={handleLaunchGame}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 shrink-0"
          >
            <span>{t('challenge_test_btn')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
