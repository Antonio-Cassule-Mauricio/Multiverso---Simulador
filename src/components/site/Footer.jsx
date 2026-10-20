// ============================================================================
// COMPONENTE: Footer (Rodapé do Portal)
// Responsabilidade: Créditos da NASA Space Apps, equipa de colegas estudantes e links
// ============================================================================

import React from 'react';
import { Rocket } from 'lucide-react';

export default function Footer({ onOpenSimulator }) {
  return (
    <footer className="border-t border-cyan-900/40 bg-slate-950 text-slate-400 py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Coluna 1: Marca e Identificação do Projeto */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                <Rocket className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white font-mono tracking-wider">
                MULTIVERSO
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                NASA SPACE APPS 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Simulador Interativo de Engenharia e Missões Espaciais concebido para o NASA Space Apps Challenge 2026.
              Desenvolvido com rigor científico e dedicação por colegas e estudantes angolanos de <strong>Engenharia de Software</strong>.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
              <span>🇦🇴 Angola • Luanda</span>
            </div>
          </div>

          {/* Coluna 2: Lista dos Colegas da Equipa */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              Equipa de Engenharia
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-400 font-mono">
              <li className="text-slate-300 font-semibold">• António Maurício (Líder)</li>
              <li>• Adilson Francisco</li>
              <li>• Agostinho Mariti</li>
              <li>• Edmilson Segredo</li>
              <li>• Hilton Diamantino</li>
            </ul>
          </div>

          {/* Coluna 3: Fórmulas e Atalhos Rápidos */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              Física & Ferramentas
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-400">
              <li>• Equação de Tsiolkovsky (Δv)</li>
              <li>• Irradiância Inversa Solar</li>
              <li>• Telemetria Deep Space Network</li>
              <li>• Dimensionamento de Baterias</li>
              <li>
                <button
                  onClick={onOpenSimulator}
                  className="text-cyan-400 hover:underline cursor-pointer font-semibold pt-1 block"
                >
                  → Abrir Simulador de Voo
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Linha Inferior com Copyright e Menção aos Estudantes */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div>
            © 2026 Multiverso • Desenvolvido para o NASA Space Apps Challenge
          </div>
          <div className="flex items-center gap-4">
            <span>Colegas Estudantes de Engenharia de Software</span>
            <span>•</span>
            <span>Angola</span>
            <span>•</span>
            <span>Open Source</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
