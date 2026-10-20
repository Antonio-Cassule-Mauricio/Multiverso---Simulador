// ============================================================================
// COMPONENTE: ObjectivesPanel (Briefing da Agência + Metas em Tempo Real)
// Mostra os 3 objetivos oficiais do destino e a classificação projetada (E→S),
// atualizados instantaneamente com cada decisão de engenharia do jogador.
// ============================================================================

import React, { useMemo } from 'react';
import { Target, CheckCircle2, XCircle } from 'lucide-react';
import { objectives } from '../../data/objectives';
import { evaluateObjectives, computeGrade } from '../../sim/score';
import { opsStrings } from '../../data/opsContent';
import { gradeBadgeClass } from './gradeStyle';

// Formata o valor atual de uma meta conforme o seu tipo de métrica
function formatGoalValue(s, type, value) {
  switch (type) {
    case 'science': return s.fmt_science(value);
    case 'downlink': return s.fmt_downlink(value);
    case 'cost': return s.fmt_cost(value);
    case 'success': return s.fmt_success(value);
    default: return String(value);
  }
}

// Gera a descrição textual da meta no idioma ativo
function goalLabel(s, goal) {
  switch (goal.type) {
    case 'science': return s.goal_science(goal.target);
    case 'downlink': return s.goal_downlink(goal.target);
    case 'cost': return s.goal_cost(goal.target);
    case 'success': return s.goal_success(goal.target);
    default: return goal.id;
  }
}

export default function ObjectivesPanel({ result, universeId, lang = 'pt' }) {
  const s = opsStrings[lang] || opsStrings.pt;
  const def = objectives[universeId];

  const goals = useMemo(() => evaluateObjectives(result, universeId), [result, universeId]);
  const gradeInfo = useMemo(() => computeGrade(result, universeId), [result, universeId]);

  if (!def || !result || !gradeInfo) return null;

  const briefing = def.briefing[lang] || def.briefing.pt;
  const metCount = goals.filter((g) => g.met).length;

  return (
    <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-slate-900/90 shadow-xl space-y-4">

      {/* Cabeçalho: Título + Classificação Projetada */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-mono font-bold uppercase text-white tracking-wider">
            {s.panel_title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase text-slate-400 hidden sm:inline">
            {s.projected_grade}
          </span>
          <span
            className={`w-9 h-9 rounded-lg border font-mono font-extrabold text-lg flex items-center justify-center ${gradeBadgeClass(gradeInfo.grade)}`}
            title={`${s.grade_label}: ${s.grade_names[gradeInfo.grade]} (${gradeInfo.score}/100)`}
          >
            {gradeInfo.grade}
          </span>
        </div>
      </div>

      {/* Briefing Oficial da Agência Espacial */}
      <p className="text-xs text-slate-300 leading-relaxed">
        <span className="font-mono font-bold text-amber-300 uppercase">{s.panel_briefing_label} </span>
        {briefing}
      </p>

      {/* Lista das 3 Metas com Progresso em Tempo Real */}
      <div className="space-y-2.5">
        {goals.map((g) => (
          <div
            key={g.id}
            className={`p-3 rounded-xl border transition-all ${
              g.met
                ? 'bg-emerald-950/30 border-emerald-500/30'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2 min-w-0">
                {g.met ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className={`truncate ${g.met ? 'text-emerald-200' : 'text-slate-300'}`}>
                  {goalLabel(s, g)}
                </span>
              </div>
              <span className={`shrink-0 font-bold ${g.met ? 'text-emerald-400' : 'text-amber-300'}`}>
                {formatGoalValue(s, g.type, g.value)}
              </span>
            </div>
            <div className="mt-2 w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${g.met ? 'bg-emerald-400' : 'bg-amber-400'}`}
                style={{ width: `${Math.round(g.progress * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé: Contagem de Metas Cumpridas */}
      <div className="flex items-center justify-between text-[11px] font-mono pt-1">
        <span className="text-slate-400">
          {metCount} / {goals.length} {s.panel_met}
        </span>
        <span className={`font-bold ${gradeBadgeClass(gradeInfo.grade).split(' ')[0]}`}>
          {gradeInfo.score}/100 • {s.grade_names[gradeInfo.grade]}
        </span>
      </div>

    </div>
  );
}
