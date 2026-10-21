// ============================================================================
// COMPONENTE: SimulatorGame (Módulo Central do Jogo e Simulador Espacial 3D)
// Responsabilidade: Gestão unificada da física de voo 3D, consola de engenharia,
// telemetria em tempo real e modais de lançamento e certificado.
// Comentários: Todos em Português conforme solicitado pela equipa.
// ============================================================================

import React, { useState, useMemo } from 'react';
import SpaceCanvas3D from './SpaceCanvas3D';
import MissionBuilder from './MissionBuilder';
import TelemetryHUD from './TelemetryHUD';
import LaunchSimulatorModal from './LaunchSimulatorModal';
import MissionCertificateModal from './MissionCertificateModal';
import { evaluateMission } from '../../sim/evaluate';
import { 
  Rocket, ChevronLeft, Wrench, Eye, Shield, Radio, Sparkles, Activity 
} from 'lucide-react';
import { playSound } from '../../utils/audio';

export default function SimulatorGame({
  initialUniverse = 'mars',
  soundEnabled = true,
  onCloseToPortal,
  lang = 'pt',
  t = (k) => k,
}) {
  // Configuração da missão da sonda
  const [universeId, setUniverseId] = useState(initialUniverse);
  const [typeId, setTypeId] = useState('orbiter');
  const [chosenInstruments, setChosenInstruments] = useState(['camera', 'spectrometer']);
  const [powerSource, setPowerSource] = useState('solar');
  const [panelArea, setPanelArea] = useState(6.0);
  const [batteryKg, setBatteryKg] = useState(8.0);
  const [antennaId, setAntennaId] = useState('medium');
  const [txPower, setTxPower] = useState(30);
  const [launcherId, setLauncherId] = useState('medium');

  // Modais de Voo e Certificado
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Vista ativa no Simulador: 'cockpit' (foco total no 3D) ou 'engineering' (consola de peças)
  const [activeTab, setActiveTab] = useState('flight'); // 'flight' | 'engineering'

  // Objeto de configuração da missão
  const missionConfig = useMemo(() => ({
    universe: universeId,
    type: typeId,
    instruments: chosenInstruments,
    power: {
      source: powerSource,
      panelArea,
      batteryKg,
    },
    comms: {
      antenna: antennaId,
      txPower,
    },
    launcher: launcherId,
  }), [universeId, typeId, chosenInstruments, powerSource, panelArea, batteryKg, antennaId, txPower, launcherId]);

  // Avaliação física e de custos rigorosa
  const evaluation = useMemo(() => {
    return evaluateMission(missionConfig);
  }, [missionConfig]);

  const handleReturn = () => {
    playSound('click', soundEnabled);
    if (onCloseToPortal) onCloseToPortal();
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
        
        {/* Barra Superior de Controlo do Jogo */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md">
          
          {/* Botão de retorno ao portal */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleReturn}
              className="px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-cyan-400" />
              <span>{t('nav_return_portal')}</span>
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-bold text-white">
                MULTIVERSO 3D • NASA SPACE APPS 2026
              </span>
            </div>
          </div>

          {/* Abas: Modo Voo 3D vs Consola de Engenharia */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => { playSound('click', soundEnabled); setActiveTab('flight'); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'flight'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Simulador 3D (Voo & Pouso)</span>
            </button>

            <button
              onClick={() => { playSound('click', soundEnabled); setActiveTab('engineering'); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'engineering'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Consola de Engenharia</span>
            </button>
          </div>

        </div>

        {/* CENÁRIO 1: MODO SIMULADOR DE VOO 3D ATIVO */}
        {activeTab === 'flight' ? (
          <div className="space-y-6">
            {/* O Simulador Espacial 3D Completo */}
            <SpaceCanvas3D
              universeId={universeId}
              missionType={typeId}
              evaluation={evaluation}
              soundEnabled={soundEnabled}
              onOpenCertificate={() => setIsCertificateOpen(true)}
              lang={lang}
              t={t}
            />

            {/* Painel Inferior Rápido de Diagnóstico de Voo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-left space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Configuração da Sonda</span>
                </div>
                <div className="text-sm font-bold text-white font-mono capitalize">
                  {typeId} • {universeId}
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Massa Total: {Math.round(evaluation.mass?.launchMassKg || 0)} kg
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-left space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Balanço Energético & Link</span>
                </div>
                <div className="text-sm font-bold text-emerald-400 font-mono">
                  {Math.round(evaluation.power?.generatedW || 0)}W Gerados / {Math.round(evaluation.power?.consumedW || 0)}W Consumo
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Taxa DSN: {Math.round(evaluation.comms?.rateBps || 0)} bps
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-left flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Orçamento
                  </div>
                  <div className="text-sm font-bold text-cyan-400 font-mono">
                    ${Math.round(evaluation.cost?.totalCostM || 0)}M / ${evaluation.cost?.budgetM}M
                  </div>
                </div>

                <button
                  onClick={() => setIsLaunchModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  Sequência T-0 →
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* CENÁRIO 2: MODO CONSOLA DE ENGENHARIA & DESIGN */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Construtor de Peças e Sistemas (Esquerda) */}
            <div className="lg:col-span-8">
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
                soundEnabled={soundEnabled}
                lang={lang}
                t={t}
              />
            </div>

            {/* Painel de Telemetria e Diagnóstico (Direita) */}
            <div className="lg:col-span-4">
              <TelemetryHUD
                evaluation={evaluation}
                onLaunchModal={() => setIsLaunchModalOpen(true)}
                onOpenCertificate={() => setIsCertificateOpen(true)}
                soundEnabled={soundEnabled}
                lang={lang}
                t={t}
              />
            </div>

          </div>
        )}

      </div>

      {/* Modal de Sequência de Lançamento */}
      <LaunchSimulatorModal
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
        config={missionConfig}
        evaluation={evaluation}
        onCompleted={() => {
          setIsLaunchModalOpen(false);
          setIsCertificateOpen(true);
        }}
        soundEnabled={soundEnabled}
        t={t}
      />

      {/* Modal de Certificado de Desempenho de Missão */}
      <MissionCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        evaluation={evaluation}
        config={missionConfig}
        lang={lang}
        t={t}
      />

    </div>
  );
}
