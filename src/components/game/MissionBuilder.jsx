// ============================================================================
// COMPONENTE: MissionBuilder (Painel de Configuração de Engenharia da Sonda)
// Responsabilidade: Controlos para seleção de destino, veículo, instrumentos, potência,
// comms e lançador com tradução dinâmica total em PT/EN/FR para todos os cards
// ============================================================================

import React from 'react';
import { universes } from '../../data/universes';
import { missionTypes, instruments, launchers, antennas } from '../../data/catalog';
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
  result,
  soundEnabled,
  lang = 'pt',
  t = (k) => k,
}) {
  const currentUniverse = universes[universeId] || universes.mars;

  // Alternar a inclusão ou remoção de um instrumento científico
  const toggleInstrument = (instId) => {
    playSound('click', soundEnabled);
    if (chosenInstruments.includes(instId)) {
      setChosenInstruments(chosenInstruments.filter((i) => i !== instId));
    } else {
      setChosenInstruments([...chosenInstruments, instId]);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ETAPA 1: SELEÇÃO DE DESTINO CELESTE */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs">1</span>
            <span>{t('builder_step_1')}</span>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            {t('builder_step_1_sub')} ${currentUniverse.budgetM}M
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {Object.values(universes).map((u) => {
            const active = universeId === u.id;
            const planetName = t(`dest_${u.id}_name`) || u.name;
            return (
              <button
                key={u.id}
                onClick={() => {
                  playSound('click', soundEnabled);
                  setUniverseId(u.id);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  active
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: u.color }} />
                  <span className="text-[10px] font-mono text-slate-400">{u.sunDistanceAU} UA</span>
                </div>
                <div className="font-bold text-white text-xs sm:text-sm truncate">
                  {planetName.split(' ')[0]}
                </div>
                <div className="text-[10px] text-slate-400 truncate">{u.surfaceGravity}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ETAPA 2: ARQUITETURA DA SONDA */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm mb-3">
          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs">2</span>
          <span>{t('builder_step_2')}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(missionTypes).map(([id, tObj]) => {
            const active = typeId === id;
            const typeName = t(`type_${id}_name`) || tObj.name;
            const typeDesc = t(`type_${id}_desc`) || tObj.description;

            return (
              <button
                key={id}
                onClick={() => {
                  playSound('click', soundEnabled);
                  setTypeId(id);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  active
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="font-bold text-white text-xs sm:text-sm">{typeName}</div>
                <div className="text-[11px] font-mono text-cyan-400/90 mt-1">
                  {t('builder_step_2_mass')}: {tObj.busMassKg}kg • ${tObj.busCostM}M
                </div>
                <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{typeDesc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ETAPA 3: INSTRUMENTOS CIENTÍFICOS */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs">3</span>
            <span>{t('builder_step_3')}</span>
          </div>
          <span className="text-xs font-mono text-purple-400">
            {chosenInstruments.length} {t('builder_step_3_selected')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {Object.entries(instruments).map(([id, inst]) => {
            const isSelected = chosenInstruments.includes(id);
            const isCompatible = inst.worksOn.includes(typeId);
            const instName = t(`inst_${id}_name`) || inst.name;
            const instDesc = t(`inst_${id}_desc`) || inst.desc;

            return (
              <div
                key={id}
                onClick={() => isCompatible && toggleInstrument(id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  !isCompatible
                    ? 'opacity-35 bg-slate-950/30 border-slate-800 cursor-not-allowed'
                    : isSelected
                    ? 'bg-purple-950/30 border-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.2)]'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  disabled={!isCompatible}
                  onChange={() => {}}
                  className="mt-1 accent-purple-400 cursor-pointer"
                />
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-xs sm:text-sm">{instName}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-300 font-bold">
                      +{inst.science} pts
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{instDesc}</p>
                  <div className="text-[10px] font-mono text-slate-400 mt-1 flex gap-2">
                    <span>{inst.massKg}kg</span>
                    <span>•</span>
                    <span>{inst.powerW}W</span>
                    <span>•</span>
                    <span className="text-emerald-400">${inst.costM}M</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ETAPA 4: SISTEMA DE POTÊNCIA & BATERIAS */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs">4</span>
            <span>{t('builder_step_4')}</span>
          </div>
          <span className="text-xs font-mono text-amber-400">
            {powerSource === 'solar' ? t('builder_step_4_active_solar') : t('builder_step_4_active_rtg')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => {
              playSound('toggle', soundEnabled);
              setPowerSource('solar');
            }}
            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
              powerSource === 'solar'
                ? 'bg-amber-950/30 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400'
            }`}
          >
            <div className="font-bold text-white text-xs sm:text-sm">{t('builder_solar_title')}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{t('builder_solar_desc')}</div>
          </button>

          <button
            onClick={() => {
              playSound('toggle', soundEnabled);
              setPowerSource('rtg');
            }}
            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
              powerSource === 'rtg'
                ? 'bg-amber-950/30 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                : 'bg-slate-950/60 border-slate-800 text-slate-400'
            }`}
          >
            <div className="font-bold text-white text-xs sm:text-sm">{t('builder_rtg_title')}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{t('builder_rtg_desc')}</div>
          </button>
        </div>

        {/* Sliders de Dimensionamento */}
        <div className="space-y-4 pt-2">
          {powerSource === 'solar' && (
            <div className="space-y-1 text-left">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>{t('builder_panel_area')}</span>
                <span className="text-amber-400 font-bold">{panelArea} m² ({panelArea * 6} kg)</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={panelArea}
                onChange={(e) => setPanelArea(e.target.value)}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>1 m²</span>
                <span>15 m²</span>
              </div>
            </div>
          )}

          <div className="space-y-1 text-left">
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>{t('builder_battery_mass')}</span>
              <span className="text-amber-400 font-bold">
                {batteryKg} kg ({(batteryKg * 150 * 0.8).toFixed(0)} {t('builder_wh_useful')})
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="35"
              step="1"
              value={batteryKg}
              onChange={(e) => setBatteryKg(e.target.value)}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>1 kg ({t('builder_emergency')})</span>
              <span>35 kg ({t('builder_long_eclipse')})</span>
            </div>
          </div>
        </div>
      </div>

      {/* ETAPA 5: TELECOMUNICAÇÕES & POTÊNCIA DO TRANSMISSOR */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs">5</span>
            <span>{t('builder_step_5')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
          {Object.entries(antennas).map(([id, a]) => {
            const active = antennaId === id;
            const antennaName = t(`antenna_${id}_name`) || a.name;

            return (
              <button
                key={id}
                onClick={() => {
                  playSound('click', soundEnabled);
                  setAntennaId(id);
                }}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  active
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-bold text-white text-xs sm:text-sm">{antennaName}</div>
                <div className="text-[10px] font-mono text-cyan-300 mt-1">
                  Ø {a.diameterM}m • {a.massKg}kg • ${a.costM}M
                </div>
              </button>
            );
          })}
        </div>

        <div className="space-y-1 text-left">
          <div className="flex justify-between text-xs font-mono text-slate-300">
            <span>{t('builder_tx_power')}</span>
            <span className="text-cyan-400 font-bold">
              {txPower} W ({result ? (result.comms.rateBps / 1000).toFixed(1) : 0} kbps)
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={txPower}
            onChange={(e) => setTxPower(e.target.value)}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>5 W</span>
            <span>120 W</span>
          </div>
        </div>
      </div>

      {/* ETAPA 6: FOGUETÃO LANÇADOR */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs">6</span>
            <span>{t('builder_step_6')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(launchers).map(([id, l]) => {
            const active = launcherId === id;
            const capacity = l.capacityKg[universeId] || 0;
            const launcherName = t(`launcher_${id}_name`) || l.name;
            const launcherDesc = t(`launcher_${id}_desc`) || l.desc;

            return (
              <button
                key={id}
                onClick={() => {
                  playSound('click', soundEnabled);
                  setLauncherId(id);
                }}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  active
                    ? 'bg-blue-950/40 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-bold text-white text-xs sm:text-sm">{launcherName}</div>
                <div className="text-[11px] font-mono text-cyan-300 mt-1 font-semibold">
                  {t('builder_launcher_cap')} {capacity} kg • ${l.costM}M
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  {t('builder_launcher_reliability')} {(l.reliability * 100).toFixed(0)}%
                </div>
                <p className="text-[10px] text-slate-500 line-clamp-2 mt-1">{launcherDesc}</p>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
