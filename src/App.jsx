// ============================================================================
// COMPONENTE PRINCIPAL: App.jsx
// Responsabilidade: Gestão da vista ativa (Portal do Site vs Jogo 3D) e Tradução
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

// Módulos do Jogo / Simulador 3D de Engenharia
import SimulatorGame from './components/game/SimulatorGame';

import { Rocket, Play } from 'lucide-react';
import { playSound } from './utils/audio';
import { translations, getInitialLanguage } from './data/translations';

export default function App() {
  // Estado de navegação: 'portal' (página inicial) ou 'simulator' (jogo 3D)
  const [currentView, setCurrentView] = useState('portal');
  // Planeta ou lua inicialmente selecionado no jogo
  const [selectedUniverse, setSelectedUniverse] = useState('mars');
  // Ativação global dos efeitos sonoros espaciais
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Idioma ativo: detetado automaticamente do navegador ('pt' | 'en' | 'fr')
  const [lang, setLang] = useState(() => getInitialLanguage());

  // Função auxiliar de tradução
  const t = (key) => {
    const dict = translations[lang] || translations.pt;
    return dict[key] || translations.pt[key] || key;
  };

  // Abertura do simulador/jogo 3D com destino opcional
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
      {/* Barra de Navegação Superior Fixa com Seletor Multilíngue */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenSimulator={() => handleOpenSimulator(selectedUniverse)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        lang={lang}
        setLang={setLang}
        t={t}
      />

      {/* Conteúdo Principal com Alternância Dinâmica */}
      <main className="flex-1">
        {currentView === 'simulator' ? (
          /* VISTA DO JOGO: SIMULADOR ESPACIAL 3D */
          <SimulatorGame
            initialUniverse={selectedUniverse}
            soundEnabled={soundEnabled}
            onCloseToPortal={handleCloseToPortal}
            lang={lang}
            t={t}
          />
        ) : (
          /* VISTA DO SITE: PORTAL INFORMATIVO E DESAFIO NASA */
          <>
            {/* Secção Hero de Impacto Visual */}
            <HeroSection
              onOpenSimulator={() => handleOpenSimulator('mars')}
              soundEnabled={soundEnabled}
              t={t}
            />

            {/* Faixa Rápida de Chamada para Ação para o Jogo 3D */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 -mt-8 relative z-20">
              <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-cyan-500/30 bg-slate-900/90 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
                    <Rocket className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                      <span>{t('hero_banner_ready')}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                        ONLINE 3D
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {t('hero_banner_sub')}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenSimulator('mars')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.3)] shrink-0 border border-cyan-300/40"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{t('hero_cta_play')}</span>
                </button>
              </div>
            </div>

            {/* Secção com a Explicação Oficial do Desafio NASA Space Apps 2026 */}
            <ChallengeSection
              onOpenSimulator={() => handleOpenSimulator('mars')}
              soundEnabled={soundEnabled}
              t={t}
            />

            {/* Secção de Destinos no Sistema Solar */}
            <DestinationsSection
              onSelectDestination={(univId) => handleOpenSimulator(univId)}
              soundEnabled={soundEnabled}
              t={t}
            />

            {/* Secção de Fórmulas e Modelagem Física */}
            <PhysicsSection t={t} />

            {/* Secção de Destaque da Equipa de Colegas de Engenharia de Software */}
            <TeamSection t={t} />
          </>
        )}
      </main>

      {/* Rodapé Oficial com Créditos e Links */}
      <Footer onOpenSimulator={() => handleOpenSimulator('mars')} t={t} />
    </div>
  );
}