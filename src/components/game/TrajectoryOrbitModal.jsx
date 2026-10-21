// ============================================================================
// COMPONENTE: TrajectoryOrbitModal (Visualizador de Órbitas & Transferência de Hohmann)
// Responsabilidade: Exibir o mapa interativo de trajetória orbital com as leis de Kepler,
// cálculo de Delta-V (Δv) da queima de injeção translunar/interplanetária e conceitos de mecânica orbital.
// Comentários: Todos em Português conforme solicitado pela equipa.
// ============================================================================

import React, { useState } from 'react';
import { Compass, Sparkles, X, Play, CheckCircle2, ArrowRight, Activity, Orbit, Globe2 } from 'lucide-react';
import { playSound } from '../../utils/audio';

export default function TrajectoryOrbitModal({
  isOpen,
  onClose,
  targetBody = 'mars',
  onExecuteManeuver,
  soundEnabled = true,
}) {
  if (!isOpen) return null;

  const [maneuverExecuted, setManeuverExecuted] = useState(false);

  // Parâmetros orbitais reais baseados no destino
  const orbitData = {
    moon: {
      destName: "Lua (Injeção Translunar - TLI)",
      r1: "6,678 km (LEO)",
      r2: "384,400 km (Órbita Lunar)",
      deltaV1: "3,150 m/s (Queima TLI)",
      deltaV2: "850 m/s (Captura Lunar)",
      totalDeltaV: "4,000 m/s",
      transferTime: "3 dias (Apollo 11)",
      keplerPeriod: "72 horas",
      eccentricity: "0.965 (Órbita Altamente Elíptica)",
      conceptText: "A queima de injeção translunar (TLI) é executada no perigeu da órbita terrestre. O foguete Saturn V disparou o motor J-2 do 3º estágio por 350 segundos para atingir a velocidade de escape de 10.8 km/s.",
    },
    mars: {
      destName: "Marte (Transferência de Hohmann Interplanetária)",
      r1: "1.00 AU (Órbita da Terra)",
      r2: "1.52 AU (Órbita de Marte)",
      deltaV1: "3,600 m/s (Queima Trans-Marte)",
      deltaV2: "2,100 m/s (Captura em Marte)",
      totalDeltaV: "5,700 m/s",
      transferTime: "210 dias (7 meses)",
      keplerPeriod: "520 dias (Órbita Elíptica Completa)",
      eccentricity: "0.207 (Elipse Heliocêntrica)",
      conceptText: "A órbita de transferência de Hohmann é a trajetória de menor gasto energético entre dois planetas. A Terra e Marte precisam de estar no alinhamento angular exato (janela de lançamento a cada 26 meses).",
    },
    earth: {
      destName: "ISS (Sincronização de Órbita Circular LEO)",
      r1: "300 km (Órbita de Inserção)",
      r2: "408 km (Órbita da ISS)",
      deltaV1: "32 m/s (Elevação de Perigeu)",
      deltaV2: "31 m/s (Circularização no Apogeu)",
      totalDeltaV: "63 m/s",
      transferTime: "90 minutos (1 volta orbital)",
      keplerPeriod: "92.6 minutos",
      eccentricity: "0.0008 (Quase Circular)",
      conceptText: "Para acoplar com a Estação Espacial Internacional, a cápsula manobra em órbitas ligeiramente inferiores para alcançar a ISS devido à velocidade angular mais rápida (3ª Lei de Kepler).",
    },
    europa: {
      destName: "Júpiter & Europa (Assistência Gravitacional Slingshot)",
      r1: "1.00 AU (Terra)",
      r2: "5.20 AU (Sistema Joviano)",
      deltaV1: "8,800 m/s (Injeção)",
      deltaV2: "Gravity Assist (+4,500 m/s grátis)",
      totalDeltaV: "13,300 m/s equivalente",
      transferTime: "5.5 anos",
      keplerPeriod: "11.8 anos terrestres",
      eccentricity: "0.677 (Trajetória Hiperbólica)",
      conceptText: "A sonda sobrevoa planetas interiores para 'roubar' momento orbital e ganhar velocidade estilingue sem gastar combustível químico, contornando a densa radiação de Júpiter.",
    },
  };

  const currentData = orbitData[targetBody] || orbitData.mars;

  const handleRunManeuver = () => {
    playSound('launch', soundEnabled);
    setManeuverExecuted(true);
    if (onExecuteManeuver) onExecuteManeuver();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md select-none">
      <div className="w-full max-w-3xl rounded-3xl bg-slate-900 border-2 border-cyan-500/50 p-6 sm:p-8 shadow-2xl text-left space-y-6 relative overflow-hidden">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Compass className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Mecânica Orbital de Kepler • Trajetória da Missão
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white font-mono">
                {currentData.destName}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagrama Orbital Interativo (Visualização Geométrica da Elipse de Transferência) */}
        <div className="relative h-56 w-full rounded-2xl bg-slate-950 border border-slate-800 p-4 flex items-center justify-center overflow-hidden">
          
          {/* Sol / Terra Central */}
          <div className="relative flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 shadow-[0_0_35px_rgba(251,191,36,0.6)] flex items-center justify-center font-bold text-[10px] text-slate-950 font-mono">
              Sol / LEO
            </div>
            <span className="text-[10px] font-mono text-amber-300 mt-1 font-bold">Origem (r₁)</span>
          </div>

          {/* Órbita Inicial (Tracejada Ciano) */}
          <div className="absolute w-44 h-44 rounded-full border border-dashed border-cyan-500/40 pointer-events-none" />

          {/* Elipse de Transferência de Hohmann (Linha Amarela) */}
          <div className="absolute w-80 h-48 rounded-[50%] border-2 border-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.2)] pointer-events-none" />

          {/* Planeta Destino na Elipse */}
          <div className="absolute right-12 top-10 flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-[0_0_25px_rgba(56,189,248,0.5)] flex items-center justify-center text-[10px] font-bold text-white font-mono">
              Destino
            </div>
            <span className="text-[10px] font-mono text-cyan-300 mt-1 font-bold">Apogeu (r₂)</span>
          </div>

          {/* Vetor de Queima de Manobra (Δv Burn Node) */}
          <div className="absolute left-20 bottom-8 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Manobra Δv₁: {currentData.deltaV1}</span>
          </div>

          {/* Trajetória Ativa do Veículo */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 text-[9px] font-mono animate-pulse">
            🚀 Sonda na Trajetória
          </div>

        </div>

        {/* Métricas e Fórmulas de Física Orbital */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400">Raio Inicial (r₁)</div>
            <div className="text-xs font-bold font-mono text-white mt-0.5">{currentData.r1}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400">Raio Final (r₂)</div>
            <div className="text-xs font-bold font-mono text-cyan-400 mt-0.5">{currentData.r2}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400">Δv Total Requerido</div>
            <div className="text-xs font-bold font-mono text-emerald-400 mt-0.5">{currentData.totalDeltaV}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400">Tempo de Voo</div>
            <div className="text-xs font-bold font-mono text-amber-400 mt-0.5">{currentData.transferTime}</div>
          </div>
        </div>

        {/* Explicação da Física Orbital Real */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
          <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Fórmula de Vis-Viva da NASA: v² = μ · (2/r - 1/a)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {currentData.conceptText}
          </p>
        </div>

        {/* Ações Inferiores */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Excentricidade Orbital: <b className="text-white">{currentData.eccentricity}</b></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs cursor-pointer"
            >
              Fechar Visualizador
            </button>

            <button
              disabled={maneuverExecuted}
              onClick={handleRunManeuver}
              className={`px-5 py-2.5 rounded-xl font-bold font-mono text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg ${
                maneuverExecuted
                  ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-300 cursor-default'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/25'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{maneuverExecuted ? '✓ Queima Δv Executada com Sucesso (+50 pts)' : 'Executar Queima de Injeção Δv'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
