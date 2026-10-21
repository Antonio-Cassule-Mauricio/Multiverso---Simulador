// ============================================================================
// COMPONENTE: TelemetryHUD (Painel de Instrumentação e Diagnóstico em Tempo Real)
// Responsabilidade: Exibir KPIs de engenharia aeroespacial com tradução dinâmica em
// Português, Inglês e Francês, cálculo de aprovação de voo e botões de ação 3D.
// ============================================================================

import React from 'react';
import { 
  Rocket, Sun, Radio, DollarSign, Award, AlertTriangle, CheckCircle2, 
  Play, FileText, ChevronRight, Activity, BatteryCharging, ShieldAlert 
} from 'lucide-react';
import { playSound } from '../../utils/audio';

export default function TelemetryHUD({
  evaluation,
  onLaunchModal,
  onOpenCertificate,
  soundEnabled = true,
  lang = 'pt',
  t = (k) => k,
}) {
  if (!evaluation) return null;

  const {
    mass,
    power,
    comms,
    cost,
    science,
    successProb,
    isApproved,
    issues = [],
  } = evaluation;

  const handleStart3DFlight = () => {
    playSound('launch', soundEnabled);
    if (onLaunchModal) onLaunchModal();
  };

  const handleCertificate = () => {
    playSound('click', soundEnabled);
    if (onOpenCertificate) onOpenCertificate();
  };

  return (
    <div className="space-y-6 text-left sticky top-24">
      
      {/* CARD PRINCIPAL DE STATUS DE QUALIFICAÇÃO DE VOO */}
      <div className={`p-5 rounded-2xl border backdrop-blur-xl transition-all ${
        isApproved
          ? 'bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.15)]'
          : 'bg-rose-950/40 border-rose-500/50 shadow-[0_0_25px_rgba(244,63,94,0.15)]'
      }`}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className={`w-4 h-4 ${isApproved ? 'text-emerald-400' : 'text-rose-400'}`} />
            <span className="font-bold font-mono text-xs text-white uppercase tracking-wider">
              {t('hud_title')}
            </span>
          </div>
          <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${
            isApproved 
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
          }`}>
            {isApproved ? t('hud_flight_approved') : t('hud_flight_anomaly')}
          </span>
        </div>

        {/* Métricas Principais de Probabilidade de Sucesso e Ciência */}
        <div className="grid grid-cols-2 gap-3 py-4">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400">
              {t('hud_success_prob')}
            </div>
            <div className={`text-xl font-black font-mono mt-0.5 ${
              successProb >= 75 ? 'text-emerald-400' : successProb >= 50 ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {Math.round(successProb)}%
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400">
              {t('hud_science_score')}
            </div>
            <div className="text-xl font-black font-mono mt-0.5 text-cyan-400">
              {science.totalScore} pts
            </div>
          </div>
        </div>

        {/* Lista de Alertas / Diagnóstico de Engenharia */}
        {issues.length > 0 && (
          <div className="space-y-1.5 pb-3">
            {issues.map((issue, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-rose-950/50 border border-rose-500/30 text-[11px] text-rose-200">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>{issue}</span>
              </div>
            ))}
          </div>
        )}

        {/* Botão de Lançamento no Jogo 3D */}
        <button
          onClick={handleStart3DFlight}
          className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/25 border border-cyan-300/40"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{t('hud_launch_btn')}</span>
        </button>
      </div>

      {/* CARDS DETALHADOS DE ENGENHARIA DE SISTEMAS */}
      <div className="space-y-3">
        
        {/* MASSA & FOGUETÃO */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('hud_launch_mass')}</span>
            </span>
            <span className={`font-bold ${mass.isWithinCapacity ? 'text-emerald-400' : 'text-rose-400'}`}>
              {Math.round(mass.launchMassKg)} / {mass.launcherCapacityKg} kg
            </span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full ${mass.isWithinCapacity ? 'bg-amber-400' : 'bg-rose-500'}`}
              style={{ width: `${Math.min(100, (mass.launchMassKg / mass.launcherCapacityKg) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>{t('hud_dry_mass')} {Math.round(mass.dryMassKg)}kg</span>
            <span>{t('hud_propellant_mass')} {Math.round(mass.propellantKg)}kg</span>
          </div>
        </div>

        {/* POTÊNCIA & BATERIA */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-yellow-400" />
              <span>{t('hud_power_balance')}</span>
            </span>
            <span className={`font-bold ${power.isSufficient ? 'text-emerald-400' : 'text-rose-400'}`}>
              {Math.round(power.generatedW)}W / {Math.round(power.consumedW)}W
            </span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>{t('hud_battery_reserve')}</span>
            <span className={power.batterySurvivesEclipse ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
              {Math.round(power.batteryWh)} Wh ({power.batterySurvivesEclipse ? 'OK' : 'Blackout'})
            </span>
          </div>
        </div>

        {/* ENLACE DSN & DADOS */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t('hud_dsn_downlink')}</span>
            </span>
            <span className="font-bold text-cyan-400">
              {Math.round(comms.rateBps)} bps
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-400">
            {Math.round(comms.downlinkMbitDay)} Mbit/dia • <b className="text-white">{Math.round(comms.downlinkRatio * 100)}%</b> {t('hud_data_reaches_earth')}
          </p>
        </div>

        {/* ORÇAMENTO & CUSTOS */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('hud_budget_consumed')}</span>
            </span>
            <span className={`font-bold ${cost.isWithinBudget ? 'text-emerald-400' : 'text-rose-400'}`}>
              ${Math.round(cost.totalCostM)}M / ${cost.budgetM}M
            </span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full ${cost.isWithinBudget ? 'bg-emerald-400' : 'bg-rose-500'}`}
              style={{ width: `${Math.min(100, (cost.totalCostM / cost.budgetM) * 100)}%` }}
            />
          </div>
        </div>

      </div>

      {/* BOTÃO PARA EMISSÃO DO CERTIFICADO OFICIAL */}
      <button
        onClick={handleCertificate}
        className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <FileText className="w-3.5 h-3.5 text-cyan-400" />
        <span>{t('hud_certificate_btn')}</span>
      </button>

    </div>
  );
}
