// ============================================================================
// COMPONENTE: LaunchSimulatorModal (Janela Modal de Sequência de Lançamento)
// Responsabilidade: Simular as 4 etapas de voo, contagem T-0 e registo de telemetria
// com tradução integral e comentários em Português.
// ============================================================================

import React, { useState, useEffect } from 'react';
import { 
  Rocket, CheckCircle2, AlertTriangle, Play, X, Shield, Radio, Flame, Sparkles 
} from 'lucide-react';
import { playSound } from '../../utils/audio';

export default function LaunchSimulatorModal({
  isOpen,
  onClose,
  config,
  evaluation,
  onCompleted,
  soundEnabled = true,
  t = (k) => k,
}) {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);

  const flightPhases = [
    { id: 1, title: t('modal_step_1'), desc: "Ignição do primeiro estágio e ascensão atmosférica" },
    { id: 2, title: t('modal_step_2'), desc: "Separação de estágios e queima translunar / interplanetária" },
    { id: 3, title: t('modal_step_3'), desc: "Inserção orbital ou entrada atmosférica, descida e pouso" },
    { id: 4, title: t('modal_step_4'), desc: "Abertura de antenas parabólicas e transmissão para o DSN" },
  ];

  const startSequence = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setLogs([`[T-00:00:05] Contagem regressiva de lançamento iniciada...`]);
    playSound('launch', soundEnabled);

    // Avançar automaticamente os 4 passos da simulação
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step <= 4) {
        setCurrentStep(step);
        playSound(step === 4 ? 'touchdown' : 'warp', soundEnabled);
        setLogs((prev) => [
          ...prev,
          `[T+00:0${step * 2}:00] Fase ${step} confirmada: ${flightPhases[step - 1]?.title || 'Nominal'}`,
        ]);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        if (onCompleted) onCompleted();
      }
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-cyan-500/40 p-6 shadow-2xl text-left space-y-6">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Rocket className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-base text-white font-mono">
              {t('modal_launch_title')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Fases do Voo */}
        <div className="space-y-3">
          {flightPhases.map((phase, idx) => {
            const isDone = currentStep > idx;
            const isCurrent = currentStep === idx + 1;

            return (
              <div
                key={phase.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isDone
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : isCurrent
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-100 shadow-[0_0_15px_rgba(56,189,248,0.2)] animate-pulse'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 font-mono text-xs font-bold">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">
                        {phase.id}
                      </span>
                    )}
                    <span>{phase.title}</span>
                  </div>
                  {isCurrent && <span className="text-[10px] font-mono text-cyan-300">EM CURSO...</span>}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 pl-6">
                  {phase.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Terminal de Telemetria de Voo */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 h-28 overflow-y-auto space-y-1">
          {logs.length === 0 ? (
            <div className="text-slate-600">Aguardando comando de ignição T-0...</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="text-cyan-400">
                {log}
              </div>
            ))
          )}
        </div>

        {/* Ações */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs cursor-pointer"
          >
            {t('modal_return_btn')}
          </button>

          <button
            disabled={isRunning}
            onClick={startSequence}
            className={`px-6 py-2.5 rounded-xl font-bold font-mono text-xs flex items-center gap-2 cursor-pointer shadow-lg ${
              isRunning
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/25'
            }`}
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isRunning ? 'Sequência Ativa...' : 'Disparar Contagem T-0'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
