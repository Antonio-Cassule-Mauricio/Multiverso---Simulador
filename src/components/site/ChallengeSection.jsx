// ============================================================================
// COMPONENTE: ChallengeSection (Explicação do Desafio NASA Space Apps 2026)
// Responsabilidade: Apresentar as 4 grandes demandas concorrentes de engenharia 100% traduzidas
// ============================================================================

import React, { useState } from 'react';
import { Target, Zap, Weight, Radio, DollarSign, AlertTriangle } from 'lucide-react';
import { playSound } from '../../utils/audio';

export default function ChallengeSection({ onOpenSimulator, soundEnabled, t = (k) => k }) {
  // Aba ativa selecionada pelo utilizador para inspecionar cada pilar
  const [activeTab, setActiveTab] = useState('mass');

  // Os 4 pilares essenciais da tomada de decisão em engenharia espacial com traduções dinâmicas
  const pillars = [
    {
      id: 'mass',
      title: t('pillar_mass_title'),
      icon: Weight,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      badge: t('pillar_mass_badge'),
      summary: t('pillar_mass_summary'),
      details: t('pillar_mass_details'),
      warning: t('pillar_mass_warning'),
    },
    {
      id: 'power',
      title: t('pillar_power_title'),
      icon: Zap,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      badge: t('pillar_power_badge'),
      summary: t('pillar_power_summary'),
      details: t('pillar_power_details'),
      warning: t('pillar_power_warning'),
    },
    {
      id: 'comms',
      title: t('pillar_comms_title'),
      icon: Radio,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/40',
      badge: t('pillar_comms_badge'),
      summary: t('pillar_comms_summary'),
      details: t('pillar_comms_details'),
      warning: t('pillar_comms_warning'),
    },
    {
      id: 'budget',
      title: t('pillar_budget_title'),
      icon: DollarSign,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      badge: t('pillar_budget_badge'),
      summary: t('pillar_budget_summary'),
      details: t('pillar_budget_details'),
      warning: t('pillar_budget_warning'),
    },
  ];

  const currentPillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  return (
    <section id="challenge" className="py-20 border-b border-cyan-900/30 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            <span>{t('challenge_badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t('challenge_title')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('challenge_desc')}
          </p>
        </div>

        {/* 4 Abas Selecionáveis com os Pilares de Engenharia */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            const isSelected = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActiveTab(p.id);
                  playSound('click', soundEnabled);
                }}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-slate-800/80 ${p.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base leading-tight">
                  {p.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Detalhes do Pilar Selecionado */}
        {currentPillar && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-slate-900/80 backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <span className={`text-xl font-bold ${currentPillar.color}`}>
                    {currentPillar.title}
                  </span>
                </div>
                
                <p className="text-base sm:text-lg text-slate-200 font-medium">
                  {currentPillar.summary}
                </p>

                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  {currentPillar.details}
                </p>

                {/* Caixa de Aviso de Impacto no Simulador */}
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                    <strong className="text-amber-300">{t('impact_critical')} </strong>
                    {currentPillar.warning}
                  </div>
                </div>
              </div>

              {/* Botão Lateral para Testar no Jogo */}
              <div className="lg:col-span-4 flex flex-col justify-center items-center p-6 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.2)]">
                  <currentPillar.icon className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-slate-400">{t('challenge_tested_in_game')}</div>
                  <div className="text-base font-bold text-white mt-1">3D Space Physics</div>
                </div>
                <button
                  onClick={() => {
                    playSound('click', soundEnabled);
                    onOpenSimulator();
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all cursor-pointer shadow-lg"
                >
                  {t('challenge_test_btn')}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
