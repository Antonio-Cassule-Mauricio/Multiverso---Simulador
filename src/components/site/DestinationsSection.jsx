// ============================================================================
// COMPONENTE: DestinationsSection (Destinos Planetários no Sistema Solar)
// Responsabilidade: Apresentar Marte, Lua, Europa e Titã com tradução integral
// de todos os cartões, métricas orbitais e botão para voo 3D direto.
// Comentários: Todos em Português conforme solicitado pela equipa.
// ============================================================================

import React from 'react';
import { Rocket, Globe, Compass, Sparkles, ArrowRight, Sun, Radio, Shield } from 'lucide-react';
import { playSound } from '../../utils/audio';

export default function DestinationsSection({ onSelectDestination, soundEnabled = true, t = (k) => k }) {
  // Lista dos 4 mundos planetários com chaves traduzidas dinamicamente
  const celestialBodies = [
    {
      id: 'mars',
      name: t('dest_mars_name'),
      tagline: t('dest_mars_tagline'),
      desc: t('dest_mars_desc'),
      atmo: t('dest_mars_atmo'),
      sunDist: '1.52 AU',
      earthDist: '1.50 AU',
      gravity: '0.38 g',
      budget: '$800M',
      color: 'from-orange-500/20 via-red-900/30 to-amber-950/40',
      border: 'border-orange-500/40',
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      glow: 'shadow-[0_0_30px_rgba(249,115,22,0.15)]',
    },
    {
      id: 'moon',
      name: t('dest_moon_name'),
      tagline: t('dest_moon_tagline'),
      desc: t('dest_moon_desc'),
      atmo: t('dest_moon_atmo'),
      sunDist: '1.00 AU',
      earthDist: '0.0026 AU',
      gravity: '0.166 g',
      budget: '$600M',
      color: 'from-slate-500/20 via-slate-800/30 to-slate-950/40',
      border: 'border-slate-500/40',
      badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
      glow: 'shadow-[0_0_30px_rgba(148,163,184,0.15)]',
    },
    {
      id: 'europa',
      name: t('dest_europa_name'),
      tagline: t('dest_europa_tagline'),
      desc: t('dest_europa_desc'),
      atmo: t('dest_europa_atmo'),
      sunDist: '5.20 AU',
      earthDist: '4.20 AU',
      gravity: '0.134 g',
      budget: '$1,400M',
      color: 'from-cyan-500/20 via-blue-900/30 to-sky-950/40',
      border: 'border-cyan-500/40',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      glow: 'shadow-[0_0_30px_rgba(56,189,248,0.15)]',
    },
    {
      id: 'titan',
      name: t('dest_titan_name'),
      tagline: t('dest_titan_tagline'),
      desc: t('dest_titan_desc'),
      atmo: t('dest_titan_atmo'),
      sunDist: '9.58 AU',
      earthDist: '8.58 AU',
      gravity: '0.140 g',
      budget: '$1,600M',
      color: 'from-amber-500/20 via-yellow-900/30 to-orange-950/40',
      border: 'border-amber-500/40',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      glow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    },
  ];

  const handleLaunch = (id) => {
    playSound('launch', soundEnabled);
    if (onSelectDestination) onSelectDestination(id);
  };

  return (
    <section id="destinos" className="py-20 relative border-t border-slate-800/80 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('dest_badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('dest_title')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('dest_desc')}
          </p>
        </div>

        {/* Grelha de Cartões de Destino com Tradução Dinâmica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {celestialBodies.map((world) => (
            <div
              key={world.id}
              className={`rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${world.color} border ${world.border} ${world.glow} backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:scale-[1.01]`}
            >
              <div className="space-y-4">
                {/* Cabeçalho do Card */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-white text-xl sm:text-2xl font-mono">
                      {world.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyan-300/90 font-medium mt-1">
                      {world.tagline}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border shrink-0 ${world.badgeColor}`}>
                    {world.budget}
                  </span>
                </div>

                {/* Descrição científica do ambiente */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {world.desc}
                </p>

                {/* Métricas e Fatores de Voo Espacial */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-left">
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Sun className="w-3 h-3 text-amber-400" />
                      <span>{t('dest_sun_dist')}</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-white mt-1">
                      {world.sunDist}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-left">
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Radio className="w-3 h-3 text-cyan-400" />
                      <span>{t('dest_earth_dist')}</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-white mt-1">
                      {world.earthDist}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-left">
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Compass className="w-3 h-3 text-indigo-400" />
                      <span>{t('dest_gravity')}</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-white mt-1">
                      {world.gravity}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-left">
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Shield className="w-3 h-3 text-emerald-400" />
                      <span>{t('dest_atmosphere')}</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-200 mt-1 truncate">
                      {world.atmo}
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão de Ação Direta para o Simulador 3D */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-end">
                <button
                  onClick={() => handleLaunch(world.id)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  <Rocket className="w-4 h-4" />
                  <span>{t('dest_launch_btn')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
