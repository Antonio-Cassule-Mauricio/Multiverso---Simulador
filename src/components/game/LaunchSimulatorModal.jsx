// ============================================================================
// COMPONENTE: LaunchSimulatorModal (Janela Modal de Sequência de Lançamento)
// Responsabilidade: Simular as 4 etapas de voo, contagem T-0 e registo de telemetria
// ============================================================================

import React from 'react';
import { Rocket, X, Award } from 'lucide-react';

export default function LaunchSimulatorModal({
  isOpen,
  onClose,
  launchStage,
  launchLog,
  result,
  onOpenCertificate,
}) {
  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-2xl w-full glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-slate-900/95 shadow-[0_0_50px_rgba(56,189,248,0.3)] space-y-6 text-left">
        
        {/* Cabeçalho da Janela de Lançamento */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Rocket className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono">
                CENTRO DE OPERAÇÕES • SEQUÊNCIA DE VOO
              </h3>
              <p className="text-xs text-slate-400">
                Alvo: {result.universeName} • Veículo: {result.typeName}
              </p>
            </div>
          </div>

          {/* Botão de Fechar disponível após conclusão */}
          {launchStage === 5 && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Pipeline Visual das 4 Etapas de Lançamento */}
        <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
          <div className={`p-2 rounded-lg border ${launchStage >= 1 ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            1. T-0 Lançamento
          </div>
          <div className={`p-2 rounded-lg border ${launchStage >= 2 ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            2. Injeção & Cruzeiro
          </div>
          <div className={`p-2 rounded-lg border ${launchStage >= 3 ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            3. Inserção / EDL
          </div>
          <div className={`p-2 rounded-lg border ${launchStage >= 4 ? 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            4. Downlink Científico
          </div>
        </div>

        {/* Consola com Logs de Telemetria ao Vivo */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 h-48 overflow-y-auto space-y-1.5 shadow-inner">
          {launchLog.map((log, i) => (
            <div key={i} className="leading-relaxed">
              {log}
            </div>
          ))}
        </div>

        {/* Ações Finais ao Concluir o Voo */}
        {launchStage === 5 && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={onOpenCertificate}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Award className="w-4 h-4" />
              <span>Emitir Certificado da Missão</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all cursor-pointer"
            >
              Retornar aos Comandos
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
