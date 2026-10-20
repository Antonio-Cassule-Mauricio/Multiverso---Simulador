// ============================================================================
// SIMULAÇÃO: Avaliação de Objetivos Oficiais e Classificação da Missão
// Calcula o cumprimento das metas da agência e a nota final (E → S)
// ============================================================================

import { objectives } from "../data/objectives";

// Avalia cada meta do briefing contra o resultado da simulação física
export function evaluateObjectives(result, universeId) {
  const def = objectives[universeId];
  if (!def || !result) return [];

  return def.goals.map((g) => {
    let value;
    let met;
    let progress;
    switch (g.type) {
      case "science":
        value = result.science.returned;
        met = value >= g.target;
        progress = Math.min(1, value / g.target);
        break;
      case "downlink":
        value = result.comms.returnFraction;
        met = value >= g.target;
        progress = Math.min(1, value / g.target);
        break;
      case "cost":
        value = result.cost.total;
        met = value <= g.target;
        progress = Math.min(1, g.target / Math.max(1, value));
        break;
      case "success":
        value = result.successProbability;
        met = value >= g.target;
        progress = Math.min(1, value / g.target);
        break;
      default:
        value = 0;
        met = false;
        progress = 0;
    }
    return { ...g, value, met, progress };
  });
}

// Nota final 0-100 → classificação E, D, C, B, A, S
// ops (opcional) = { health, scienceBonus, reserveDelta } da Fase de Operações
export function computeGrade(result, universeId, ops = null) {
  if (!result) return null;

  const objs = evaluateObjectives(result, universeId);
  const def = objectives[universeId];
  const scienceTarget = def?.goals.find((g) => g.type === "science")?.target ?? 40;

  // 40 pts: objetivos oficiais cumpridos
  const objPts = objs.filter((o) => o.met).length * (40 / 3);
  // 25 pts: volume de ciência devolvida face à meta (inclui bónus de operações)
  const returned = result.science.returned + (ops?.scienceBonus ?? 0);
  const sciPts = 25 * Math.min(1, returned / Math.max(1, scienceTarget));
  // 20 pts: probabilidade de sucesso estimada
  const probPts = 20 * result.successProbability;
  // 15 pts: margem orçamental (≥25% de folga = pontuação máxima)
  const margin = result.cost.budget - result.cost.total;
  const marginPts =
    margin >= 0 ? 15 * Math.min(1, margin / (result.cost.budget * 0.25)) : 0;

  let score = objPts + sciPts + probPts + marginPts;

  // Modificadores da fase de operações: gestão da saúde da sonda e da reserva
  if (ops) {
    score += (ops.health - 60) / 6;
    score += Math.max(-8, Math.min(4, ops.reserveDelta / 20));
  }

  // Falhas críticas de engenharia impedem classificação alta
  if (!result.ok) score = Math.min(score, 49);
  // Sonda perdida durante as operações
  if (ops && ops.health <= 0) score = Math.min(score, 24);

  score = Math.max(0, Math.min(100, Math.round(score)));

  const grade =
    score >= 90 ? "S" : score >= 78 ? "A" : score >= 64 ? "B" : score >= 50 ? "C" : score >= 35 ? "D" : "E";

  return { score, grade, objectives: objs };
}
