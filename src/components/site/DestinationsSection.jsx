// ============================================================================
// COMPONENTE: DestinationsSection (Destinos Cósmicos de Exploração)
// Responsabilidade: Apresentar os corpos celestes disponíveis e parâmetros físicos
// ============================================================================

import React from 'react';
import { Compass, ArrowRight, Rocket } from 'lucide-react';
import { universes } from '../../data/universes';
import panoramaImg from '../../assets/images/planetary_destinations_1792514020395.jpg';
import { playSound } from '../../utils/audio';

export default function DestinationsSection({ onSelectDestination, soundEnabled }) {
  // Lista dos mundos disponíveis para simulação
  const destinationList = Object.values(universes);

  return (
    <section id="destinations" className="py-20 border-b border-cyan-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Destinos no Sistema Solar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Cada Mundo, Uma{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
              Nova Realidade Física
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            A física orbital e os desafios ambientais mudam drasticamente de um corpo celeste para outro.
            Da poeira fina e sol fraco de Marte até aos oceanos gelados e radiação joviana de Europa.
          </p>
        </div>

        {/* Banner Panorâmico de Exploração Planetária */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl relative group">
          <img
            src={panoramaImg}
            alt="Panorama das Fronteiras de Exploração Espacial"
            className="w-full h-56 sm:h-72 object-cover object-center group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6 sm:p-8">
            <div className="text-left">
              <span className="px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs">
                Mapeamento do Multiverso
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                4 Destinos Planetários Prontos para Simulação Científica
              </h3>
            </div>
          </div>
        </div>

        {/* Grelha de Cards dos Planetas / Luas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinationList.map((dest) => {
            return (
              <div
                key={dest.id}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-400/50 transition-all flex flex-col justify-between group hover:-translate-y-1 shadow-lg bg-slate-900/60"
              >
                <div className="space-y-4 text-left">
                  {/* Ponto indicador de cor e orçamento */}
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: dest.color, boxShadow: `0 0 12px ${dest.color}` }}
                    />
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                      ${dest.budgetM}M Orçamento
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-cyan-400 font-mono mt-0.5">
                      {dest.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {dest.description}
                  </p>

                  {/* Tabela de Grandezas Físicas */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px] font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Distância Solar:</span>
                      <span className="text-slate-200">{dest.sunDistanceAU} UA</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Distância à Terra:</span>
                      <span className="text-slate-200">{dest.earthDistanceAU} UA</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Gravidade:</span>
                      <span className="text-slate-200">{dest.surfaceGravity}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Atmosfera:</span>
                      <span className="text-slate-200 truncate max-w-[120px]">{dest.atmosphere}</span>
                    </div>
                  </div>
                </div>

                {/* Botão para carregar no Simulador com este destino selecionado */}
                <button
                  onClick={() => {
                    playSound('click', soundEnabled);
                    onSelectDestination(dest.id);
                  }}
                  className="mt-6 w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700 hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                >
                  <Rocket className="w-3.5 h-3.5 text-cyan-400 group-hover:text-slate-950" />
                  <span>Projetar Para Este Destino</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
