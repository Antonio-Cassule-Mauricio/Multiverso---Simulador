// ============================================================================
// COMPONENTE: HeroSection (Secção Principal / Apresentação de Impacto)
// Responsabilidade: Apresentar o simulador interativo, destacar o desafio NASA
// e fornecer métricas e call-to-actions traduzidos para PT, EN e FR.
// Comentários: Todos em Português conforme solicitado pela equipa.
// ============================================================================

import React from 'react';
import { Rocket, Sparkles, Compass, ShieldCheck, ChevronRight, Activity, Radio, Cpu } from 'lucide-react';
import { playSound } from '../../utils/audio';

export default function HeroSection({ onOpenSimulator, soundEnabled = true, t = (k) => k }) {
  // Badges com métricas e princípios físicos fundamentais traduzidos
  const telemetryBadges = [
    { label: t('hero_badge_tsiolkovsky'), val: "Δv = Isp · g0 · ln(m0/m1)", icon: Rocket },
    { label: t('hero_badge_solar'), val: "S = 1361 / d² AU (W/m²)", icon: Sparkles },
    { label: t('hero_badge_telemetry'), val: "Pt · Gt · Gr · (λ / 4πR)²", icon: Radio },
    { label: t('hero_badge_systems'), val: "SW Eng • NASA Space Apps", icon: Cpu },
  ];

  const handleStartGame = () => {
    playSound('launch', soundEnabled);
    if (onOpenSimulator) onOpenSimulator();
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Luz ambiente de fundo e partículas simuladas */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-500/10 to-purple-600/15 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo: Mensagem de Impacto, Título e CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Tag de identificação da equipa e do desafio */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{t('hero_badge')}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">{t('hero_team_badge')}</span>
            </div>

            {/* Título Principal */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              {t('hero_title_1')}{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                {t('hero_title_2')}
              </span>
            </h1>

            {/* Descrição em conformidade com o desafio de engenharia espacial */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {t('hero_desc')}
            </p>

            {/* Ações Rápidas: Jogar Agora em 3D ou Explorar o Desafio */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleStartGame}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm tracking-wide font-mono transition-all duration-200 shadow-[0_0_30px_rgba(56,189,248,0.4)] flex items-center gap-3 cursor-pointer group border border-cyan-300/40 hover:scale-[1.02]"
              >
                <Rocket className="w-5 h-5 text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                <span>{t('hero_cta_play')}</span>
                <ChevronRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#desafio"
                onClick={() => playSound('click', soundEnabled)}
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm font-mono border border-slate-700/80 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>{t('hero_cta_explore')}</span>
              </a>
            </div>

            {/* Grid de 4 badges de física e telemetria */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {telemetryBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="truncate">{badge.label}</span>
                    </div>
                    <div className="mt-1 font-mono text-xs font-bold text-slate-200 truncate">
                      {badge.val}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lado Direito: Card Flutuante 3D de Telemetria da Nave */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl p-6 bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
              
              {/* Cabeçalho do HUD Flutuante */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {t('hero_probe_nominal')}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {t('hero_isp')}
                </span>
              </div>

              {/* Corpo com Mockup Visual da Sonda Espacial */}
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <div className="relative w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.25)]">
                  <Rocket className="w-16 h-16 text-cyan-300 animate-pulse" />
                  <div className="absolute -top-1 -right-1 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400 text-[10px] font-mono text-cyan-300">
                    3D
                  </div>
                </div>

                <div className="mt-5 space-y-1">
                  <h3 className="font-bold text-lg text-white font-mono">
                    {t('hero_probe_status')}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xs">
                    {t('hero_probe_sub')}
                  </p>
                </div>
              </div>

              {/* Botão de Lançamento no HUD */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>{t('hero_comms_badge')}</span>
                </div>
                <button
                  onClick={handleStartGame}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  {t('hero_cta_play')} →
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
