// ============================================================================
// COMPONENTE: AstronautLogbookModal (Caderneta de Voo & Medalhas de Astronauta da NASA)
// Responsabilidade: Exibir o registo oficial de voo, patentes, conquistas e medalhas
// desbloqueadas pelo jogador em cada missão da NASA, estimulando a continuação do jogo.
// Comentários: Todos em Português conforme solicitado pela equipa.
// ============================================================================

import React from 'react';
import { Award, CheckCircle2, Lock, Sparkles, X, Rocket, Shield, Compass, Star } from 'lucide-react';

export default function AstronautLogbookModal({
  isOpen,
  onClose,
  completedObjectiveIds = [],
  sciencePoints = 0,
  onOpenCertificate,
}) {
  if (!isOpen) return null;

  // As 5 Conquistas e Medalhas de Honra Espacial da NASA
  const officialBadges = [
    {
      id: 'apollo_touchdown',
      title: 'Comandante Apollo 11 (Águia Lunar)',
      agency: 'NASA Apollo Program • 1969',
      desc: 'Completou com sucesso o pouso manual do Módulo Eagle em Mare Tranquillitatis com velocidade vertical < 3.2 m/s.',
      icon: '🦅',
      points: 100,
      isUnlocked: completedObjectiveIds.includes('touchdown') || completedObjectiveIds.includes('flag'),
    },
    {
      id: 'iss_docking',
      title: 'Engenheiro de Voo da ISS (Harmony)',
      agency: 'NASA / ESA / JAXA • LEO',
      desc: 'Executou acoplagem suave na porta Node 2 Harmony da Estação Espacial Internacional a 400 km de altitude.',
      icon: '🛰️',
      points: 120,
      isUnlocked: completedObjectiveIds.includes('soft_dock') || completedObjectiveIds.includes('rendezvous'),
    },
    {
      id: 'perseverance_sample',
      title: 'Astrobiólogo de Marte (Cratera Jezero)',
      agency: 'NASA JPL • Mars 2020',
      desc: 'Conduziu o rover Perseverance pelas dunas e selou amostras de rochas sedimentares com a broca do braço robótico.',
      icon: '🔴',
      points: 90,
      isUnlocked: completedObjectiveIds.includes('drill_rock') || completedObjectiveIds.includes('regolith') || completedObjectiveIds.includes('drive_rover'),
    },
    {
      id: 'ingenuity_flight',
      title: 'Aviador Marciano (Drone Ingenuity)',
      agency: 'NASA JPL • Rotores Coaxiais',
      desc: 'Realizou o primeiro voo motorizado noutro mundo, girando pás de carbono a 2.400 RPM na atmosfera de CO2.',
      icon: '🚁',
      points: 120,
      isUnlocked: completedObjectiveIds.includes('fly_ingenuity'),
    },
    {
      id: 'europa_slingshot',
      title: 'Navegador do Espaço Profundo (Júpiter Slingshot)',
      agency: 'NASA Flagship • Europa Clipper',
      desc: 'Dominou a manobra de assistência gravitacional em Júpiter e ativou o radar REASON para sondar o oceano sob o gelo.',
      icon: '🪐',
      points: 110,
      isUnlocked: completedObjectiveIds.includes('slingshot') || completedObjectiveIds.includes('radar_penetrate') || completedObjectiveIds.includes('descent'),
    },
  ];

  const unlockedCount = officialBadges.filter((b) => b.isUnlocked).length;

  // Patente do Astronauta conforme a pontuação acumulada
  let rank = "Candidato a Astronauta";
  if (sciencePoints >= 400 || unlockedCount >= 4) rank = "Comandante de Missões Interplanetárias (Grau Ouro)";
  else if (sciencePoints >= 250 || unlockedCount >= 2) rank = "Especialista de Missão da NASA";
  else if (sciencePoints >= 100 || unlockedCount >= 1) rank = "Piloto Espacial Graduado";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md select-none">
      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border-2 border-amber-400/50 p-6 sm:p-8 shadow-2xl text-left space-y-6 relative overflow-hidden">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-lg">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                Caderneta Oficial de Conquistas Aeroespaciais
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white font-mono">
                {rank}
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

        {/* Resumo de Progresso do Jogador */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-950 to-cyan-950/30 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-400">Medalhas de Honra Espacial</div>
            <div className="text-xl font-black text-amber-400 font-mono">
              {unlockedCount} / {officialBadges.length} Desbloqueadas
            </div>
          </div>

          <div className="space-y-1 text-right">
            <div className="text-xs font-mono text-slate-400">Total de Ciência Coletada</div>
            <div className="text-xl font-black text-cyan-400 font-mono">
              {sciencePoints} pts
            </div>
          </div>
        </div>

        {/* Lista das 5 Medalhas */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {officialBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                badge.isUnlocked
                  ? 'bg-amber-950/20 border-amber-500/40 shadow-sm'
                  : 'bg-slate-950/50 border-slate-800/80 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl shrink-0 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
                  {badge.icon}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs sm:text-sm text-white font-mono">
                      {badge.title}
                    </h4>
                    {badge.isUnlocked ? (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono font-bold">
                        CONQUISTADA
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[9px] font-mono flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Bloqueada
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400">{badge.agency}</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans pt-1">
                    {badge.desc}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-xs font-mono font-bold text-amber-300">
                  +{badge.points} pts
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé com Botão do Certificado */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <p className="text-[11px] font-mono text-slate-400">
            Joga as 4 missões para completar a coleção de medalhas da NASA.
          </p>

          <button
            onClick={() => {
              onClose();
              if (onOpenCertificate) onOpenCertificate();
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs cursor-pointer transition-all shadow-md shadow-amber-500/20"
          >
            Emitir Certificado Oficial →
          </button>
        </div>

      </div>
    </div>
  );
}
