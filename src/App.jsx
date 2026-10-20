// ============================================================================
// COMPONENTE PRINCIPAL: App.jsx
// Responsabilidade: Gestão da vista ativa (Portal do Site vs Jogo Simulador Interativo)
// ============================================================================

import React, { useState } from 'react';

// Módulos do Site / Portal Informativo
import Navbar from './components/site/Navbar';
import HeroSection from './components/site/HeroSection';
import ChallengeSection from './components/site/ChallengeSection';
import DestinationsSection from './components/site/DestinationsSection';
import PhysicsSection from './components/site/PhysicsSection';
import TeamSection from './components/site/TeamSection';
import Footer from './components/site/Footer';

// Módulos do Jogo / Simulador de Engenharia
import SimulatorGame from './components/game/SimulatorGame';

import { Rocket, Play } from 'lucide-react';
import { playSound } from './utils/audio';

export default function App() {
  // Estado de navegação: 'portal' (página inicial) ou 'simulator' (jogo interativo)
  const [currentView, setCurrentView] = useState('portal');
  // Planeta ou lua inicialmente selecionado no simulador
  const [selectedUniverse, setSelectedUniverse] = useState('mars');
  // Ativação global dos efeitos sonoros espaciais
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Abertura do simulador com destino opcional
  const handleOpenSimulator = (universe = 'mars') => {
    setSelectedUniverse(universe);
    setCurrentView('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playSound('toggle', soundEnabled);
  };

  // Retorno ao portal informativo principal
  const handleCloseToPortal = () => {
    setCurrentView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playSound('click', soundEnabled);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans bg-starfield">
      {/* Barra de Navegação Superior Fixa */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenSimulator={() => handleOpenSimulator(selectedUniverse)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Conteúdo Principal com Alternância Dinâmica */}
      <main className="flex-1">
        {currentView === 'simulator' ? (
          /* VISTA DO JOGO: SIMULADOR DE MISSÕES ESPACIAIS */
          <SimulatorGame
            initialUniverse={selectedUniverse}
            soundEnabled={soundEnabled}
            onCloseToPortal={handleCloseToPortal}
          />
        ) : (
          /* VISTA DO SITE: PORTAL INFORMATIVO E DESAFIO NASA */
          <>
            {/* Secção Hero de Impacto Visual */}
            <HeroSection
              onOpenSimulator={() => handleOpenSimulator('mars')}
              soundEnabled={soundEnabled}
            />

            {/* Faixa Rápida de Chamada para Ação para o Jogo */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 -mt-8 relative z-20">
              <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-cyan-500/30 bg-slate-900/90 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
                    <Rocket className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                      <span>Simulador Interativo Pronto para Voo</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                        ONLINE
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Monta o teu orbitador, lander ou rover e testa o balanço de energia, massa e telemetria.
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenSimulator('mars')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.3)] shrink-0 border border-cyan-300/40"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>JOGAR SIMULADOR AGORA</span>
                </button>
              </div>
            </div>

            {/* Secção com a Explicação Oficial do Desafio NASA Space Apps 2026 */}
            <ChallengeSection
              onOpenSimulator={() => handleOpenSimulator('mars')}
              soundEnabled={soundEnabled}
            />

            {/* Secção de Destinos no Sistema Solar */}
            <DestinationsSection
              onSelectDestination={(univId) => handleOpenSimulator(univId)}
              soundEnabled={soundEnabled}
            />

            {/* Secção de Fórmulas e Modelagem Física */}
            <PhysicsSection />

            {/* Secção de Destaque da Equipa de Colegas de Engenharia de Software */}
            <TeamSection />
          </>
        )}
      </main>

      {/* Rodapé Oficial com Créditos e Links */}
      <Footer onOpenSimulator={() => handleOpenSimulator('mars')} />
    </div>
  );
}