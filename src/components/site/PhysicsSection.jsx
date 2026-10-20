// ============================================================================
// COMPONENTE: PhysicsSection (Modelagem Matemática & Fórmulas da NASA)
// Responsabilidade: Exibir com rigor as equações com tradução dinâmica em PT/EN/FR
// ============================================================================

import React from 'react';
import { Cpu, Orbit, Sun, Radio, BatteryCharging } from 'lucide-react';

export default function PhysicsSection({ t = (k) => k }) {
  // Lista com as 4 formulações físicas modeladas com chaves de tradução
  const formulas = [
    {
      title: t('formula_rocket_title'),
      subtitle: t('formula_rocket_sub'),
      formula: "Δv = Isp · g0 · ln(m₀ / m₁)",
      inverse: "m_propelente = m_seco · (e^(Δv / (Isp · g0)) - 1)",
      explanation: t('formula_rocket_exp'),
      icon: Orbit,
      badge: "Isp = 320 s (Bipropelente)",
    },
    {
      title: t('formula_solar_title'),
      subtitle: t('formula_solar_sub'),
      formula: "S(d) = 1361 / d²  [W/m²]",
      inverse: "P_elétrica = S(d) · Área · 28% η · 0.8 derate · f_sol",
      explanation: t('formula_solar_exp'),
      icon: Sun,
      badge: "Constante Solar = 1361 W/m²",
    },
    {
      title: t('formula_comms_title'),
      subtitle: t('formula_comms_sub'),
      formula: "Taxa (bps) = (k · P_tx · D_antena²) / d²",
      inverse: "Downlink (Mbit/dia) = (Taxa · Horas_contacto · 3600) / 10⁶",
      explanation: t('formula_comms_exp'),
      icon: Radio,
      badge: "k = 2500 calibrado DSN",
    },
    {
      title: t('formula_batt_title'),
      subtitle: t('formula_batt_sub'),
      formula: "Energia_necessária (Wh) = Consumo_W · Horas_noite",
      inverse: "Bateria_útil = Massa_bateria · 150 Wh/kg · 80% DoD",
      explanation: t('formula_batt_exp'),
      icon: BatteryCharging,
      badge: "Densidade = 150 Wh/kg",
    },
  ];

  return (
    <section id="physics" className="py-20 border-b border-cyan-900/30 bg-slate-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t('physics_badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t('physics_title')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('physics_desc')}
          </p>
        </div>

        {/* Grelha com os 4 Cartões de Fórmulas Dinamicamente Traduzidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formulas.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all bg-slate-900/70 text-left space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base sm:text-lg">
                        {item.title}
                      </h3>
                      <div className="text-xs text-slate-400 font-mono">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                    {item.badge}
                  </span>
                </div>

                {/* Exibição da Equação */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/20 font-mono space-y-1.5">
                  <div className="text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide">
                    {item.formula}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {item.inverse}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
