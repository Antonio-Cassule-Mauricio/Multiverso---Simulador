// ============================================================================
// COMPONENTE: TelemetryHUD (Painel de Instrumentação e Diagnóstico em Tempo Real)
// Responsabilidade: Exibir KPIs de engenharia aeroespacial com tradução dinâmica em PT/EN/FR
// ============================================================================

import React from 'react';
import { Activity, Rocket } from 'lucide-react';

export default function TelemetryHUD({ result, onStartLaunch, lang = 'pt', t = (k) => k }) {
  if (!result) return null;

  return (
    <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 bg-slate-900/90 shadow-2xl space-y-6 text-left">
      
      {/* Cabeçalho do HUD com Status de Qualificação */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-mono font-bold uppercase text-white tracking-wider">
            {t('hud_title')}
          </span>
        </div>
        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
          result.ok 
            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
            : 'bg-rose-950 text-rose-300 border border-rose-500/40'
        }`}>
          {result.ok ? t('hud_flight_approved') : t('hud_flight_anomaly')}
        </span>
      </div>

      {/* 6 Barras de Telemetria de Engenharia */}
      <div className="space-y-4">
        
        {/* 1. Massa Total de Lançamento */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">{t('hud_launch_mass')}</span>
            <span className={`font-bold ${result.mass.launch > result.mass.capacity ? 'text-rose-400' : 'text-slate-200'}`}>
              {result.mass.launch.toFixed(0)} / {result.mass.capacity} kg
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                result.mass.launch > result.mass.capacity ? 'bg-rose-500' : 'bg-cyan-400'
              }`}
              style={{ width: `${Math.min(100, (result.mass.launch / result.mass.capacity) * 100)}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 font-mono flex justify-between">
            <span>{t('hud_dry_mass')} {result.mass.dry.toFixed(0)}kg</span>
            <span>{t('hud_edl_mass')} {result.mass.edl.toFixed(0)}kg</span>
            <span>{t('hud_propellant_mass')} {result.mass.propellant.toFixed(0)}kg</span>
          </div>
        </div>

        {/* 2. Balanço Elétrico (Geração vs Consumo) */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">{t('hud_power_balance')}</span>
            <span className={`font-bold ${result.power.generationW < result.power.consumptionW ? 'text-rose-400' : 'text-emerald-400'}`}>
              {result.power.generationW.toFixed(0)}W {t('hud_power_generated')} / {result.power.consumptionW.toFixed(0)}W {t('hud_power_consumed')}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                result.power.generationW < result.power.consumptionW ? 'bg-rose-500' : 'bg-amber-400'
              }`}
              style={{ width: `${Math.min(100, (result.power.generationW / Math.max(1, result.power.consumptionW)) * 100)}%` }}
            />
          </div>
        </div>

        {/* 3. Armazenamento de Baterias para o Eclipse */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">{t('hud_battery_reserve')}</span>
            <span className={`font-bold ${result.power.batteryWh < result.power.neededWh ? 'text-rose-400' : 'text-slate-200'}`}>
              {result.power.batteryWh.toFixed(0)} / {result.power.neededWh.toFixed(0)} Wh
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                result.power.batteryWh < result.power.neededWh ? 'bg-rose-500' : 'bg-emerald-400'
              }`}
              style={{ width: `${Math.min(100, (result.power.batteryWh / Math.max(1, result.power.neededWh)) * 100)}%` }}
            />
          </div>
        </div>

        {/* 4. Downlink Científico Deep Space Network */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">{t('hud_dsn_downlink')}</span>
            <span className={`font-bold ${result.comms.returnFraction < 0.5 ? 'text-amber-400' : 'text-purple-400'}`}>
              {(result.comms.returnFraction * 100).toFixed(0)}% {t('hud_data_reaches_earth')}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-purple-400 transition-all duration-300"
              style={{ width: `${result.comms.returnFraction * 100}%` }}
            />
          </div>
        </div>

        {/* 5. Custo Total vs Orçamento Máximo */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">{t('hud_budget_consumed')}</span>
            <span className={`font-bold ${result.cost.total > result.cost.budget ? 'text-rose-400' : 'text-emerald-400'}`}>
              ${result.cost.total.toFixed(0)}M / ${result.cost.budget}M
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                result.cost.total > result.cost.budget ? 'bg-rose-500' : 'bg-emerald-400'
              }`}
              style={{ width: `${Math.min(100, (result.cost.total / result.cost.budget) * 100)}%` }}
            />
          </div>
        </div>

        {/* 6. Probabilidade Global de Sucesso e Pontuação de Ciência */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] font-mono uppercase text-slate-400">{t('hud_success_prob')}</div>
            <div className={`text-xl font-mono font-extrabold mt-0.5 ${
              result.successProbability > 0.75 ? 'text-emerald-400' : result.successProbability > 0.5 ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {(result.successProbability * 100).toFixed(0)}%
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] font-mono uppercase text-slate-400">{t('hud_science_score')}</div>
            <div className="text-xl font-mono font-extrabold text-cyan-400 mt-0.5">
              {result.science.returned.toFixed(0)} <span className="text-xs text-slate-400 font-normal">/ {result.science.raw}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Relatório Detalhado dos Engenheiros */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
          {t('hud_engineer_report')}
        </div>
        {result.checks.map((c) => (
          <div
            key={c.id}
            className={`p-2.5 rounded-lg text-xs font-mono flex items-start gap-2 ${
              c.status === 'ok'
                ? 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-300'
                : c.status === 'warning'
                ? 'bg-amber-950/40 border border-amber-500/20 text-amber-300'
                : 'bg-rose-950/40 border border-rose-500/20 text-rose-300'
            }`}
          >
            <span className="shrink-0">{c.status === 'ok' ? '✓' : c.status === 'warning' ? '⚠' : '✗'}</span>
            <span className="leading-snug">{c.message}</span>
          </div>
        ))}
      </div>

      {/* Botão de Disparo para o Jogo / Sequência */}
      <button
        onClick={onStartLaunch}
        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(56,189,248,0.35)] border border-cyan-300/40 group"
      >
        <Rocket className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        <span>{t('hud_launch_btn')}</span>
      </button>

    </div>
  );
}
