// ============================================================================
// COMPONENTE: Navbar (Barra de Navegação do Portal com Tradução 3 Idiomas)
// Responsabilidade: Navegação principal, seletor de idioma (PT/EN/FR), áudio e jogo
// ============================================================================

import React, { useState } from 'react';
import { Rocket, Volume2, VolumeX } from 'lucide-react';
import { playSound } from '../../utils/audio';

export default function Navbar({
  onOpenSimulator,
  soundEnabled,
  setSoundEnabled,
  currentView,
  setCurrentView,
  lang = 'pt',
  setLang,
  t = (k) => k,
}) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Lista com as 3 línguas disponíveis e respetivas bandeiras
  const languages = [
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  // Alternar estado de som sintetizado (efeitos sonoros espaciais)
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) playSound('toggle', true);
  };

  // Navegar de forma suave para as secções da landing page
  const handleNavClick = (sectionId) => {
    playSound('click', soundEnabled);
    if (currentView === 'simulator') {
      setCurrentView('portal');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logótipo e Marca MULTIVERSO */}
        <div 
          onClick={() => { setCurrentView('portal'); window.scrollTo({ top: 0, behavior: 'smooth' }); playSound('click', soundEnabled); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 group-hover:border-cyan-300 transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Rocket className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-wider text-white font-mono uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-200 to-indigo-300">
                {t('nav_title') || 'MULTIVERSO'}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono font-medium">
                NASA 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {t('nav_subtitle')}
            </p>
          </div>
        </div>

        {/* Links de Navegação da Página */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300 font-medium">
          <button 
            onClick={() => handleNavClick('challenge')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            {t('nav_challenge')}
          </button>
          <button 
            onClick={() => handleNavClick('destinations')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            {t('nav_destinations')}
          </button>
          <button 
            onClick={() => handleNavClick('physics')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            {t('nav_physics')}
          </button>
          <button 
            onClick={() => handleNavClick('team')}
            className="hover:text-cyan-400 transition-colors py-1 cursor-pointer flex items-center gap-1.5"
          >
            <span>{t('nav_team')}</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Angola 🇦🇴</span>
          </button>
        </nav>

        {/* Ações à Direita: Seletor de Idioma, Áudio e Botão Jogar */}
        <div className="flex items-center gap-3">
          
          {/* Seletor Multilíngue (PT / EN / FR) com Bandeiras */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-800 bg-slate-900/70 hover:bg-slate-800 text-xs font-mono text-slate-200 hover:border-cyan-400 transition-all cursor-pointer"
              title="Mudar idioma / Change language / Changer de langue"
            >
              <span className="text-base leading-none">{currentLangObj.flag}</span>
              <span className="font-bold uppercase">{currentLangObj.code}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-900 border border-cyan-500/30 shadow-2xl overflow-hidden z-50 py-1 backdrop-blur-md">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      if (setLang) setLang(l.code);
                      setLangMenuOpen(false);
                      playSound('click', soundEnabled);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs font-mono flex items-center gap-2 hover:bg-slate-800 transition-colors cursor-pointer ${
                      lang === l.code ? 'text-cyan-400 font-bold bg-slate-800/60' : 'text-slate-300'
                    }`}
                  >
                    <span className="text-base">{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Botão de Som */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? t('sound_disable') : t('sound_enable')}
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-all cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Botão Principal para Jogar o Simulador */}
          <button
            onClick={() => {
              playSound('click', soundEnabled);
              onOpenSimulator();
            }}
            className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all flex items-center gap-2 cursor-pointer border border-cyan-300/40"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Rocket className="w-4 h-4 text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              <span>{currentView === 'simulator' ? t('nav_active_game') : t('nav_play')}</span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </header>
  );
}
