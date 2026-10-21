// ============================================================================
// COMPONENTE: Footer (Rodapé Oficial do Portal Multiverso)
// Responsabilidade: Exibir links de navegação rápida, créditos aos estudantes
// de engenharia de software e botão de acesso direto ao simulador 3D.
// Comentários: Todos em Português conforme solicitado pela equipa.
// ============================================================================

import React from 'react';
import { Rocket, Heart, Globe2, ShieldCheck, ChevronRight } from 'lucide-react';
import { playSound } from '../../utils/audio';

export default function Footer({ onOpenSimulator, t = (k) => k }) {
  const teamMembers = [
    "António Maurício",
    "Adilson Francisco",
    "Agostinho Mariti",
    "Edmilson Segredo",
    "Hilton Diamantino",
  ];

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 py-12 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/60">
          
          {/* Coluna 1: Marca & Missão */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Rocket className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-wider font-mono">
                {t('nav_title')}
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              {t('footer_desc')}
            </p>
            <div className="pt-2">
              <button
                onClick={() => { playSound('click', true); if (onOpenSimulator) onOpenSimulator(); }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 transition-colors cursor-pointer"
              >
                <span>{t('footer_open_game')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Coluna 2: Equipa de Colegas de Engenharia */}
          <div className="space-y-2">
            <h4 className="text-white font-bold tracking-wider uppercase text-[11px]">
              {t('footer_team_title')}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              {teamMembers.map((name, i) => (
                <li key={i} className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
                  <span className="w-1 h-1 rounded-full bg-cyan-400" />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Links de Navegação do Desafio */}
          <div className="space-y-2">
            <h4 className="text-white font-bold tracking-wider uppercase text-[11px]">
              {t('footer_physics_title')}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a href="#desafio" className="hover:text-cyan-400 transition-colors">
                  {t('nav_challenge')}
                </a>
              </li>
              <li>
                <a href="#destinos" className="hover:text-cyan-400 transition-colors">
                  {t('nav_destinations')}
                </a>
              </li>
              <li>
                <a href="#fisica" className="hover:text-cyan-400 transition-colors">
                  {t('nav_physics')}
                </a>
              </li>
              <li>
                <a href="#equipa" className="hover:text-cyan-400 transition-colors">
                  {t('nav_team')}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Linha Inferior com Copyright e Créditos */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500">
          <p>
            {t('footer_copy')}
          </p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>NASA Space Apps 2026</span>
            <span>•</span>
            <span>Luanda, Angola 🇦🇴</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
