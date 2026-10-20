// ============================================================================
// UTILITÁRIO: Estilos de cor da classificação da missão (E → S)
// Partilhado entre ObjectivesPanel, OperationsPhaseModal e Certificado
// ============================================================================

export const GRADE_COLORS = {
  S: 'text-amber-300 border-amber-400/60 bg-amber-500/10',
  A: 'text-emerald-300 border-emerald-400/60 bg-emerald-500/10',
  B: 'text-cyan-300 border-cyan-400/60 bg-cyan-500/10',
  C: 'text-slate-200 border-slate-400/60 bg-slate-500/10',
  D: 'text-orange-300 border-orange-400/60 bg-orange-500/10',
  E: 'text-rose-300 border-rose-400/60 bg-rose-500/10',
};

export const gradeBadgeClass = (grade) => GRADE_COLORS[grade] || GRADE_COLORS.C;
