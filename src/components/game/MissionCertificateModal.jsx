// ============================================================================
// COMPONENTE: MissionCertificateModal (Certificado Oficial de Desempenho de Missão)
// Responsabilidade: Gerar o certificado de validação aeroespacial pronto a imprimir
// ============================================================================

import React from 'react';
import { X, Printer } from 'lucide-react';

export default function MissionCertificateModal({
  isOpen,
  onClose,
  result,
}) {
  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-slate-900 border-2 border-amber-400/50 p-6 sm:p-8 rounded-3xl shadow-[0_0_60px_rgba(251,191,36,0.25)] space-y-6 text-center relative text-slate-100">
        
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cabeçalho do Certificado */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase">
            <span>NASA SPACE APPS CHALLENGE 2026 • CERTIFICADO DE ENGENHARIA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide font-mono">
            CERTIFICADO DE DESEMPENHO DE MISSÃO
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Desenvolvido por Colegas e Estudantes de Engenharia de Software • Angola 🇦🇴
          </p>
        </div>

        {/* Caixa de Métricas e Resultados do Voo */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-4 font-mono text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-slate-500">Destino Cósmico:</span>
              <div className="text-white font-bold text-sm">{result.universeName}</div>
            </div>
            <div>
              <span className="text-slate-500">Tipo de Sonda:</span>
              <div className="text-white font-bold text-sm">{result.typeName}</div>
            </div>
            <div>
              <span className="text-slate-500">Ciência Coletada:</span>
              <div className="text-cyan-400 font-bold text-sm">{result.science.returned.toFixed(0)} Pontos</div>
            </div>
            <div>
              <span className="text-slate-500">Probabilidade de Êxito:</span>
              <div className="text-emerald-400 font-bold text-sm">{(result.successProbability * 100).toFixed(0)}%</div>
            </div>
            <div>
              <span className="text-slate-500">Custo Total de Voo:</span>
              <div className="text-slate-300 font-bold text-sm">${result.cost.total.toFixed(0)}M USD</div>
            </div>
            <div>
              <span className="text-slate-500">Status Geral:</span>
              <div className={`font-bold text-sm ${result.ok ? 'text-emerald-400' : 'text-amber-400'}`}>
                {result.ok ? "QUALIFICADO PELA NASA" : "COM RESTRIÇÕES OPERACIONAIS"}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            Este certificado valida a conformidade dos cálculos de Tsiolkovsky, irradiância inversa solar e capacidade de link de rádio simulados na plataforma Multiverso.
          </div>
        </div>

        {/* Assinaturas da Equipa Técnica de Angola */}
        <div className="grid grid-cols-2 gap-4 pt-2 text-[10px] font-mono text-slate-400 border-t border-slate-800">
          <div>
            <div className="font-bold text-slate-200">António Maurício & Equipa</div>
            <div>Estudantes de Engenharia de Software • Angola</div>
          </div>
          <div>
            <div className="font-bold text-slate-200">NASA Space Apps Challenge</div>
            <div>Global Hackathon Participant 2026</div>
          </div>
        </div>

        {/* Botão de Impressão */}
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar Certificado</span>
          </button>
        </div>

      </div>
    </div>
  );
}
