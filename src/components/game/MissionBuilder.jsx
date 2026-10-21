// ============================================================================
// COMPONENTE: MissionBuilder (Painel de Configuração de Engenharia da Sonda)
// Responsabilidade: Controlos para seleção de destino, veículo, instrumentos, potência,
// antenas e foguete lançador, com tradução dinâmica e comentários em Português.
// ============================================================================

import React from 'react';
import { universes } from '../../data/universes';
import { missionTypes, instruments, launchers, antennas } from '../../data/catalog';
import { presetMissions } from '../../data/missionsPreset';
import { 
  Rocket, Satellite, ShieldAlert, Compass, Sun, Radio, Activity, 
  Camera, Waves, Wind, Zap, Check, AlertCircle, Sparkles, Layers
} from 'lucide-react';
import { playSound } from '../../utils/audio';

export default function MissionBuilder({
  universeId,
  setUniverseId,
  typeId,
  setTypeId,
  chosenInstruments,
  setChosenInstruments,
  powerSource,
  setPowerSource,
  panelArea,
  setPanelArea,
  batteryKg,
  setBatteryKg,
  antennaId,
  setAntennaId,
  txPower,
  setTxPower,
  launcherId,
  setLauncherId,
  soundEnabled = true,
  lang = 'pt',
  t = (k) => k,
}) {
  const currentUniverse = universes[universeId] || universes.mars;

  // Alternar seleção de instrumento científico
  const toggleInstrument = (instId) => {
    playSound('click', soundEnabled);
    if (chosenInstruments.includes(instId)) {
      setChosenInstruments(chosenInstruments.filter((id) => id !== instId));
    } else {
      setChosenInstruments([...chosenInstruments, instId]);
    }
  };

  // Carregar um preset de missão histórica
  const applyPreset = (preset) => {
    playSound('launch', soundEnabled);
    setUniverseId(preset.universe);
    setTypeId(preset.type);
    setChosenInstruments(preset.instruments);
    setPowerSource(preset.power.source);
    setPanelArea(preset.power.panelArea);
    setBatteryKg(preset.power.batteryKg);
    setAntennaId(preset.comms.antenna);
    setTxPower(preset.comms.txPower);
    setLauncherId(preset.launcher);
  };

  // Ícones dinâmicos de instrumentos
  const getInstIcon = (id) => {
    switch (id) {
      case 'camera': return Camera;
      case 'spectrometer': return Radio;
      case 'radar': return Waves;
      case 'drillLab': return Activity;
      case 'weather': return Wind;
      case 'seismometer': return Zap;
      case 'magnetometer': return Compass;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* SELECÇÃO DE PRESETS HISTÓRICOS */}
      <div className="glass-panel p-4 rounded-xl border border-cyan-500/30 bg-slate-900/60">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            {t('preset_title')}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {presetMissions.map((preset) => {
            const tagKey = `preset_${preset.id}_tag`;
            const descKey = `preset_${preset.id}_desc`;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group cursor-pointer hover:bg-slate-900/80"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white font-mono group-hover:text-cyan-300">
                    {preset.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono border border-cyan-500/30">
                    {t(tagKey)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {t(descKey)}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* PASSO 1: DESTINO CELESTE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-mono tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">1</span>
            <span>{t('builder_step_1')}</span>
          </h3>
          <span className="text-xs font-mono text-cyan-400">
            {t('builder_step_1_sub')} ${currentUniverse.budgetM}M
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(universes).map(([id, u]) => {
            const isSelected = universeId === id;
            const nameKey = `dest_${id}_name`;
            return (
              <button
                key={id}
                onClick={() => { playSound('click', soundEnabled); setUniverseId(id); }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-white">
                    {t(nameKey).split(' ')[0]}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">
                  ${u.budgetM}M
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PASSO 2: ARQUITETURA DA SONDA */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white font-mono tracking-wider flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">2</span>
          <span>{t('builder_step_2')}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(missionTypes).map(([id, type]) => {
            const isSelected = typeId === id;
            const nameKey = `type_${id}_name`;
            const descKey = `type_${id}_desc`;
            const Icon = id === 'orbiter' ? Satellite : id === 'lander' ? ShieldAlert : Compass;

            return (
              <button
                key={id}
                onClick={() => { playSound('click', soundEnabled); setTypeId(id); }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold font-mono text-white">
                      {t(nameKey)}
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t(descKey)}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{t('builder_step_2_mass')}: {type.busMassKg}kg</span>
                  <span className="text-cyan-400">${type.busCostM}M</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PASSO 3: CARGA CIENTÍFICA */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-mono tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">3</span>
            <span>{t('builder_step_3')}</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {chosenInstruments.length} {t('builder_step_3_selected')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(instruments).map(([id, inst]) => {
            const isSelected = chosenInstruments.includes(id);
            const isCompatible = inst.worksOn.includes(typeId);
            const nameKey = `inst_${id}_name`;
            const descKey = `inst_${id}_desc`;
            const Icon = getInstIcon(id);

            return (
              <button
                key={id}
                disabled={!isCompatible}
                onClick={() => toggleInstrument(id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  !isCompatible
                    ? 'opacity-40 bg-slate-950 border-slate-900 cursor-not-allowed'
                    : isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold font-mono text-white truncate max-w-[200px]">
                      {t(nameKey)}
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {t(descKey)}
                </p>

                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{inst.massKg}kg • {inst.powerW}W</span>
                  <span className="text-cyan-400">${inst.costM}M (+{inst.science} pts)</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PASSO 4: FONTE DE POTÊNCIA & BATERIAS */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white font-mono tracking-wider flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">4</span>
          <span>{t('builder_step_4')}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => { playSound('click', soundEnabled); setPowerSource('solar'); }}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              powerSource === 'solar'
                ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold font-mono text-white">
                {t('builder_solar_title')}
              </span>
              {powerSource === 'solar' && <Check className="w-4 h-4 text-amber-400" />}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t('builder_solar_desc')}
            </p>
          </button>

          <button
            onClick={() => { playSound('click', soundEnabled); setPowerSource('rtg'); }}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              powerSource === 'rtg'
                ? 'bg-purple-500/20 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold font-mono text-white">
                {t('builder_rtg_title')}
              </span>
              {powerSource === 'rtg' && <Check className="w-4 h-4 text-purple-400" />}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t('builder_rtg_desc')}
            </p>
          </button>
        </div>

        {powerSource === 'solar' && (
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">{t('builder_panel_area')}</span>
              <span className="text-cyan-400 font-bold">{panelArea} m²</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={panelArea}
              onChange={(e) => setPanelArea(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        )}

        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300">{t('builder_battery_mass')}</span>
            <span className="text-cyan-400 font-bold">{batteryKg} kg ({Math.round(batteryKg * 120)} {t('builder_wh_useful')})</span>
          </div>
          <input
            type="range"
            min="2"
            max="30"
            step="1"
            value={batteryKg}
            onChange={(e) => setBatteryKg(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>

      {/* PASSO 5: TELECOMUNICAÇÕES */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white font-mono tracking-wider flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">5</span>
          <span>{t('builder_step_5')}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(antennas).map(([id, ant]) => {
            const isSelected = antennaId === id;
            const nameKey = `antenna_${id}_name`;

            return (
              <button
                key={id}
                onClick={() => { playSound('click', soundEnabled); setAntennaId(id); }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold font-mono text-white truncate">
                    {t(nameKey)}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {ant.massKg}kg • ${ant.costM}M
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300">{t('builder_tx_power')}</span>
            <span className="text-cyan-400 font-bold">{txPower} W</span>
          </div>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={txPower}
            onChange={(e) => setTxPower(parseInt(e.target.value, 10))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>

      {/* PASSO 6: FOGUETÃO LANÇADOR */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white font-mono tracking-wider flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">6</span>
          <span>{t('builder_step_6')}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(launchers).map(([id, rocket]) => {
            const isSelected = launcherId === id;
            const nameKey = `launcher_${id}_name`;
            const descKey = `launcher_${id}_desc`;
            const cap = rocket.capacityKg[universeId] || 1000;

            return (
              <button
                key={id}
                onClick={() => { playSound('click', soundEnabled); setLauncherId(id); }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-mono text-white truncate">
                    {t(nameKey)}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t(descKey)}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{t('builder_launcher_cap')} <b className="text-white">{cap}kg</b></span>
                  <span className="text-cyan-400 font-bold">${rocket.costM}M</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
