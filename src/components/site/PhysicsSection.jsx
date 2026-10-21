// ============================================================================
// COMPONENTE: PhysicsSection (Modelagem Matemática e Fórmulas de Engenharia)
// Responsabilidade: Apresentar as fórmulas físicas implementadas (Tsiolkovsky,
// fluxo solar, enlace RF DSN e baterias) com cartões traduzidos dinamicamente.
// Comentários: Todos em Português conforme solicitado pela equipa.
// ============================================================================

import React from 'react';
import { Rocket, Sun, Radio, BatteryCharging, Sparkles, BookOpen } from 'lucide-react';

export default function PhysicsSection({ t = (k) => k }) {
  // Lista dos 4 módulos físicos rigorosos modelados no simulador
  const physicsCards = [
    {
      id: 'tsiolkovsky',
      title: t('formula_rocket_title'),
      subtitle: t('formula_rocket_sub'),
      formula: "Δv = Isp · g₀ · ln(m₀ / m₁)",
      explanation: t('formula_rocket_exp'),
      icon: Rocket,
      border: "border-cyan-500/30",
      accent: "text-cyan-400",
      bg: "from-cyan-950/30 to-slate-900/60",
    },
    {
      id: 'solar',
      title: t('formula_solar_title'),
      subtitle: t('formula_solar_sub'),
      formula: "S = S₀ / d²  (W/m²)",
      explanation: t('formula_solar_exp'),
      icon: Sun,
      border: "border-amber-500/30",
      accent: "text-amber-400",
      bg: "from-amber-950/30 to-slate-900/60",
    },
    {
      id: 'rf_link',
      title: t('formula_comms_title'),
      subtitle: t('formula_comms_sub'),
      formula: "Pr = Pt · Gt · Gr · (λ / 4πR)²",
      explanation: t('formula_comms_exp'),
      icon: Radio,
      border: "border-blue-500/30",
      accent: "text-blue-400",
      bg: "from-blue-950/30 to-slate-900/60",
    },
    {
      id: 'battery',
      title: t('formula_batt_title'),
      subtitle: t('formula_batt_sub'),
      formula: "E_req = P_cons · t_eclipse",
      explanation: t('formula_batt_exp'),
      icon: BatteryCharging,
      border: "border-emerald-500/30",
      accent: "text-emerald-400",
      bg: "from-emerald-950/30 to-slate-900/60",
    },
  ];

  return (
    <section id="fisica" className="py-20 relative border-t border-slate-800/80 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('physics_badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('physics_title')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('physics_desc')}
          </p>
        </div>

        {/* Grelha de 4 Fórmulas de Física Espacial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {physicsCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${card.bg} border ${card.border} backdrop-blur-sm flex flex-col justify-between transition-all duration-300 hover:scale-[1.01]`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${card.accent}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg font-mono">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Caixa com a Expressão Matemática em Notação de Código */}
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-cyan-300 text-base sm:text-lg font-bold text-center tracking-wider shadow-inner">
                    {card.formula}
                  </div>

                  {/* Explicação da Formulação */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {card.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
