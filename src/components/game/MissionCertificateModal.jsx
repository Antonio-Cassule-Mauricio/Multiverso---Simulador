// ============================================================================
// COMPONENTE: MissionCertificateModal (Certificado Oficial de Qualificação de Voo)
// Responsabilidade: Exibir o diploma oficial da missão com nota da NASA,
// métricas de engenharia, assinaturas dos colegas e comentários em Português.
// ============================================================================

import React from 'react';
import { Award, CheckCircle2, AlertTriangle, Download, X, Rocket, Sparkles } from 'lucide-react';
import { opsStrings } from '../../data/opsContent';

export default function MissionCertificateModal({
  isOpen,
  onClose,
  evaluation,
  config,
  lang = 'pt',
  t = (k) => k,
}) {
  if (!isOpen || !evaluation) return null;

  const ops = opsStrings[lang] || opsStrings.pt;
  const isApproved = evaluation.isApproved;

  // Cálculo da nota da missão (S, A, B, C, D)
  let grade = 'B';
  if (evaluation.successProb >= 90 && isApproved) grade = 'S';
  else if (evaluation.successProb >= 75 && isApproved) grade = 'A';
  else if (evaluation.successProb >= 50 && isApproved) grade = 'B';
  else if (isApproved) grade = 'C';
  else grade = 'D';

  const gradeName = ops.grade_names[grade] || ops.grade_names.B;

  const teamMembers = [
    "António Maurício (Tech Lead)",
    "Adilson Francisco (Orbital Dynamics)",
    "Agostinho Mariti (Payloads)",
    "Edmilson Segredo (Power & RF)",
    "Hilton Diamantino (Frontend 3D)",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-400/60 p-8 shadow-2xl text-left space-y-6 relative overflow-hidden">
        
        {/* Marca d'água de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Rocket className="w-96 h-96 text-cyan-400" />
        </div>

        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho do Diploma */}
        <div className="text-center space-y-2 border-b border-slate-800 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>NASA SPACE APPS CHALLENGE 2026</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white font-mono tracking-wider">
            {t('cert_title')}
          </h3>

          <p className="text-xs text-slate-400 font-mono">
            {t('cert_sub')}
          </p>
        </div>

        {/* Classificação Oficial (Grade S / A / B / C) */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              {ops.grade_label}
            </div>
            <div className="text-sm font-bold text-white font-mono mt-0.5">
              {gradeName}
            </div>
          </div>

          <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 border border-cyan-400/50 flex items-center justify-center font-black text-2xl text-cyan-300 font-mono shadow-md">
            {grade}
          </div>
        </div>

        {/* Resumo de Métricas de Voo */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] text-slate-400 font-mono">Destino</div>
            <div className="text-xs font-bold text-white font-mono capitalize mt-0.5">{config?.universe || 'Mars'}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] text-slate-400 font-mono">Massa Total</div>
            <div className="text-xs font-bold text-white font-mono mt-0.5">{Math.round(evaluation.mass?.launchMassKg || 0)} kg</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] text-slate-400 font-mono">Ciência Retornada</div>
            <div className="text-xs font-bold text-cyan-400 font-mono mt-0.5">{evaluation.science?.totalScore || 0} pts</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] text-slate-400 font-mono">Margem Custo</div>
            <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">${Math.round(evaluation.cost?.budgetM - evaluation.cost?.totalCostM || 0)}M</div>
          </div>
        </div>

        {/* Assinaturas da Equipa de Estudantes de Engenharia de Software */}
        <div className="pt-4 border-t border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 mb-2 uppercase tracking-wider text-center">
            Comité de Engenharia de Software • Luanda, Angola 🇦🇴
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono text-slate-300">
            {teamMembers.map((member, i) => (
              <div key={i} className="p-2 rounded bg-slate-950/60 border border-slate-800/80 text-center truncate">
                {member}
              </div>
            ))}
          </div>
        </div>

        {/* Ações Inferiores */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-cyan-500/25"
          >
            <Download className="w-4 h-4" />
            <span>Imprimir / Guardar PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
}
