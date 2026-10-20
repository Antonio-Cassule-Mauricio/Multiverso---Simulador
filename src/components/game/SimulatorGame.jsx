// ============================================================================
// COMPONENTE: SimulatorGame (Controlador Principal do Jogo & Simulador 3D)
// Responsabilidade: Gestão de estado da missão espacial, presets históricos e integração 3D
// ============================================================================

import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { evaluateMission } from '../../sim/evaluate';
import { presetMissions } from '../../data/missionsPreset';
import { playSound } from '../../utils/audio';

// Importação dos módulos específicos do jogo
import SpaceCanvas3D from './SpaceCanvas3D';
import MissionBuilder from './MissionBuilder';
import TelemetryHUD from './TelemetryHUD';
import LaunchSimulatorModal from './LaunchSimulatorModal';
import MissionCertificateModal from './MissionCertificateModal';

export default function SimulatorGame({
  initialUniverse = 'mars',
  soundEnabled,
  onCloseToPortal,
  lang = 'pt',
  t = (k) => k,
}) {
  // Estado das escolhas de engenharia da missão
  const [universeId, setUniverseId] = useState(initialUniverse);
  const [typeId, setTypeId] = useState('orbiter');
  const [chosenInstruments, setChosenInstruments] = useState(['camera', 'spectrometer', 'radar']);
  const [powerSource, setPowerSource] = useState('solar');
  const [panelArea, setPanelArea] = useState(5);
  const [batteryKg, setBatteryKg] = useState(8);
  const [antennaId, setAntennaId] = useState('medium');
  const [txPower, setTxPower] = useState(35);
  const [launcherId, setLauncherId] = useState('medium');

  // Modo do jogo 3D ('orbit' | 'hangar' | 'surface')
  const [gameMode, setGameMode] = useState('orbit');
  const [bonusScience3D, setBonusScience3D] = useState(0);

  // Estado da janela de lançamento e certificado
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStage, setLaunchStage] = useState(0); // 0: Repouso, 1: T-0, 2: Injeção, 3: Órbita/EDL, 4: Ciência, 5: Concluído
  const [launchLog, setLaunchLog] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);

  // Estrutura do objeto de missão para cálculo das equações
  const missionConfig = useMemo(() => ({
    universe: universeId,
    type: typeId,
    instruments: chosenInstruments,
    power: {
      source: powerSource,
      panelArea: Number(panelArea),
      batteryKg: Number(batteryKg),
    },
    comms: {
      antenna: antennaId,
      txPower: Number(txPower),
    },
    launcher: launcherId,
  }), [universeId, typeId, chosenInstruments, powerSource, panelArea, batteryKg, antennaId, txPower, launcherId]);

  // Execução da simulação física aeroespacial
  const result = useMemo(() => {
    try {
      const baseResult = evaluateMission(missionConfig);
      if (baseResult && bonusScience3D > 0) {
        return {
          ...baseResult,
          science: {
            ...baseResult.science,
            returned: baseResult.science.returned + bonusScience3D,
          },
        };
      }
      return baseResult;
    } catch (e) {
      console.error("Erro na avaliação da simulação:", e);
      return null;
    }
  }, [missionConfig, bonusScience3D]);

  // Carregar um preset de missão histórica real
  const handleLoadPreset = (preset) => {
    playSound('toggle', soundEnabled);
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

  // Recompensa de pontos de ciência obtidos nas manobras 3D
  const handleScienceBonus = (pts) => {
    setBonusScience3D((prev) => prev + pts);
  };

  // Iniciar a sequência simulada de voo e contagem
  const startLaunchSequence = () => {
    if (!result) return;
    playSound('launch', soundEnabled);
    setIsLaunching(true);
    setLaunchStage(1);
    setLaunchLog(["[T-00:03] Contagem decrescente iniciada pelo Centro de Operações..."]);

    // Etapa 1: T-0 e Ignição dos Motores
    setTimeout(() => {
      setLaunchStage(2);
      setLaunchLog((prev) => [
        ...prev,
        "[T+00:02] IGNIÇÃO! Os motores do primeiro estágio rugem com impulso máximo.",
        `[T+01:45] Separação de estágios nominal. Carga de ${result.mass.launch.toFixed(0)} kg em curso translunar/interplanetário.`
      ]);
    }, 1800);

    // Etapa 2: Injeção Planetária e Cruzeiro
    setTimeout(() => {
      setLaunchStage(3);
      setLaunchLog((prev) => [
        ...prev,
        `[CRUZEIRO] Manobra de injeção em direção a ${result.universeName}.`,
        powerSource === 'solar'
          ? `[SISTEMAS] Painéis de ${panelArea} m² desenrolados com sucesso. Geração: ${result.power.generationW.toFixed(0)} W.`
          : `[SISTEMAS] Gerador RTG nuclear ativo a fornecer 110 W contínuos no vácuo escuro.`
      ]);
    }, 3600);

    // Etapa 3: Inserção em Órbita ou Pouso (EDL)
    setTimeout(() => {
      setLaunchStage(4);
      setLaunchLog((prev) => [
        ...prev,
        typeId === 'orbiter'
          ? `[ÓRBITA] Queima de frenagem retrofoguete concluída. Sonda inserida em órbita nominal de ${result.universeName}!`
          : `[POUSO] Sequência de EDL (Entrada, Descida e Pouso) iniciada. Paraquedas abertos e retropropulsores ativados. POUSO CONFIRMADO!`
      ]);
    }, 5400);

    // Etapa 4: Downlink e Conclusão com Fogos de Artifício
    setTimeout(() => {
      setLaunchStage(5);
      const isSuccess = result.ok && result.successProbability > 0.4;
      if (isSuccess) {
        playSound('success', soundEnabled);
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.6 }
        });
      } else {
        playSound('warning', soundEnabled);
      }
      setLaunchLog((prev) => [
        ...prev,
        `[TELEMETRIA] Enlace DSN travado a ${(result.comms.returnFraction * 100).toFixed(0)}% da largura de banda.`,
        `[RELATÓRIO FINAL] Missão avaliada! Pontos de ciência devolvidos: ${result.science.returned.toFixed(0)} de ${result.science.raw}.`,
        isSuccess ? "🎉 MISSÃO BEM-SUCEDIDA! Todos os objetivos científicos alcançados!" : "⚠️ ATENÇÃO: A missão sofreu anomalias de engenharia registradas nos relatórios."
      ]);
    }, 7200);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left relative space-y-6">
      
      {/* Barra Superior com Botão de Voltar ao Portal e Presets */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound('click', soundEnabled);
              onCloseToPortal();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>{t('nav_return_portal') || 'Voltar ao Portal'}</span>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide font-mono flex items-center gap-2">
              <span className="text-cyan-400">MULTIVERSO</span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono">
                {t('nav_active_game') || 'JOGO ESPACIAL 3D'}
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              NASA Space Apps Challenge 2026 • Colegas Estudantes de Engenharia de Software
            </p>
          </div>
        </div>

        {/* Seletores de Presets Históricos Reais */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('game_presets_title') || 'Presets Históricos:'}</span>
          </span>
          {presetMissions.map((p) => (
            <button
              key={p.id}
              onClick={() => handleLoadPreset(p)}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900/90 border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 text-slate-300 transition-all cursor-pointer truncate max-w-[140px] sm:max-w-none"
              title={p.desc}
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 1. MOTOR 3D PRINCIPAL DO JOGO (Three.js WebGL Canvas) */}
      {/* ====================================================================== */}
      <div className="w-full">
        <SpaceCanvas3D
          missionConfig={missionConfig}
          result={result}
          gameMode={gameMode}
          setGameMode={setGameMode}
          soundEnabled={soundEnabled}
          onScienceBonus={handleScienceBonus}
          lang={lang}
          t={t}
        />
      </div>

      {/* ====================================================================== */}
      {/* 2. GRELHA DE ENGENHARIA: CONSTRUTOR DE MISSÃO + HUD DE TELEMETRIA */}
      {/* ====================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        
        {/* Painel do Construtor de Missão (Esquerda) */}
        <div className="lg:col-span-7 space-y-6">
          <MissionBuilder
            universeId={universeId}
            setUniverseId={setUniverseId}
            typeId={typeId}
            setTypeId={setTypeId}
            chosenInstruments={chosenInstruments}
            setChosenInstruments={setChosenInstruments}
            powerSource={powerSource}
            setPowerSource={setPowerSource}
            panelArea={panelArea}
            setPanelArea={setPanelArea}
            batteryKg={batteryKg}
            setBatteryKg={setBatteryKg}
            antennaId={antennaId}
            setAntennaId={setAntennaId}
            txPower={txPower}
            setTxPower={setTxPower}
            launcherId={launcherId}
            setLauncherId={setLauncherId}
            result={result}
            soundEnabled={soundEnabled}
          />
        </div>

        {/* HUD de Telemetria e Diagnóstico (Direita) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <TelemetryHUD
            result={result}
            onStartLaunch={startLaunchSequence}
          />
        </div>

      </div>

      {/* Modal da Sequência Animada de Lançamento */}
      <LaunchSimulatorModal
        isOpen={isLaunching}
        onClose={() => setIsLaunching(false)}
        launchStage={launchStage}
        launchLog={launchLog}
        result={result}
        onOpenCertificate={() => setShowCertificate(true)}
      />

      {/* Modal do Certificado Oficial de Desempenho de Missão */}
      <MissionCertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        result={result}
      />

    </div>
  );
}
