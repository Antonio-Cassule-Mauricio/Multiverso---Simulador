// ============================================================================
// COMPONENTE: OperationsPhaseModal (Fase de Operações — Gestão em Voo)
// Após o lançamento, o jogador gere 5 dias de missão: eventos aleatórios
// exigem decisões com trade-offs reais (ciência vs saúde vs orçamento).
// No fim, o desempenho altera a classificação final e o certificado.
// ============================================================================

import React, { useState, useEffect, useMemo } from 'react';
import { Satellite, HeartPulse, FlaskConical, PiggyBank, X, Award, AlertTriangle } from 'lucide-react';
import { opsStrings, opsEvents } from '../../data/opsContent';
import { computeGrade } from '../../sim/score';
import { playSound } from '../../utils/audio';
import { gradeBadgeClass } from './gradeStyle';

const TOTAL_DAYS = 5;

// Baralha o baralho de eventos e seleciona N sem repetição
function drawEvents(n) {
  const pool = [...opsEvents];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
}

export default function OperationsPhaseModal({
  isOpen,
  onClose,
  result,
  universeId,
  lang = 'pt',
  soundEnabled = true,
  onComplete,
  onOpenCertificate,
}) {
  const s = opsStrings[lang] || opsStrings.pt;

  // Estado da campanha de operações
  const [events, setEvents] = useState([]);
  const [day, setDay] = useState(0);
  const [phase, setPhase] = useState('decide'); // 'decide' | 'feedback' | 'done'
  const [health, setHealth] = useState(100);
  const [scienceBonus, setScienceBonus] = useState(0);
  const [reserveDelta, setReserveDelta] = useState(0);
  const [lastChoice, setLastChoice] = useState(null);
  const [flightLog, setFlightLog] = useState([]);

  // (Re)inicialização sempre que a fase é aberta
  useEffect(() => {
    if (isOpen) {
      setEvents(drawEvents(TOTAL_DAYS));
      setDay(0);
      setPhase('decide');
      setHealth(100);
      setScienceBonus(0);
      setReserveDelta(0);
      setLastChoice(null);
      setFlightLog([]);
    }
  }, [isOpen]);

  const outcome = useMemo(
    () => ({ health, scienceBonus, reserveDelta }),
    [health, scienceBonus, reserveDelta]
  );
  const finalGrade = useMemo(
    () => (result ? computeGrade(result, universeId, outcome) : null),
    [result, universeId, outcome]
  );

  // Reporta o resultado da campanha ao controlador principal ao terminar
  useEffect(() => {
    if (phase === 'done' && onComplete) onComplete(outcome);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (!isOpen || !result) return null;

  const event = events[day];
  const t = (obj) => obj?.[lang] || obj?.pt || '';

  // Aplica os efeitos da decisão tomada pelo Diretor de Voo
  const handleChoice = (option) => {
    playSound('click', soundEnabled);
    const newHealth = Math.max(0, Math.min(100, health + option.effects.health));
    const newScience = scienceBonus + option.effects.science;
    const newReserve = reserveDelta + option.effects.reserve;
    setHealth(newHealth);
    setScienceBonus(newScience);
    setReserveDelta(newReserve);
    setLastChoice({ option, effects: option.effects });
    setFlightLog((prev) => [
      ...prev,
      `[${s.ops_day} ${day + 1}] ${t(event.title)} → ${t(option.label)}`,
    ]);
    // Sonda destruída termina a campanha imediatamente
    if (newHealth <= 0) {
      playSound('warning', soundEnabled);
      setPhase('done');
    } else {
      setPhase('feedback');
    }
  };

  // Avança para o dia seguinte ou encerra a campanha
  const handleNext = () => {
    playSound('click', soundEnabled);
    if (day + 1 >= TOTAL_DAYS) {
      setPhase('done');
    } else {
      setDay(day + 1);
      setPhase('decide');
    }
  };

  const statColor = (v, invert = false) =>
    v === 0 ? 'text-slate-400' : (v > 0) !== invert ? 'text-emerald-400' : 'text-rose-400';
  const statFmt = (v, unit = '') => `${v > 0 ? '+' : ''}${v}${unit}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full my-auto glass-panel p-5 sm:p-8 rounded-3xl border border-purple-500/40 bg-slate-900/95 shadow-[0_0_50px_rgba(168,85,247,0.25)] space-y-5 text-left">

        {/* Cabeçalho da Fase de Operações */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
              <Satellite className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-white font-mono truncate">
                {s.ops_title}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">{s.ops_sub}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {phase !== 'done' && (
              <span className="text-[10px] sm:text-xs font-mono font-bold px-2 sm:px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-500/40 text-purple-300 whitespace-nowrap">
                {s.ops_day} {day + 1}/{TOTAL_DAYS}
              </span>
            )}
            <button
              onClick={onClose}
              aria-label={s.ops_close}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Indicadores Vitals da Campanha: Saúde / Ciência Extra / Reserva */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-0 overflow-hidden">
            <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-mono uppercase text-slate-400 min-w-0">
              <HeartPulse className="w-3 h-3 shrink-0" />
              <span className="truncate">{s.ops_health}</span>
            </div>
            <div className={`text-lg sm:text-xl font-mono font-extrabold mt-0.5 ${health > 60 ? 'text-emerald-400' : health > 30 ? 'text-amber-400' : 'text-rose-400'}`}>
              {health}%
            </div>
            <div className="mt-1 w-full h-1 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${health > 60 ? 'bg-emerald-400' : health > 30 ? 'bg-amber-400' : 'bg-rose-500'}`}
                style={{ width: `${health}%` }}
              />
            </div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-0 overflow-hidden">
            <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-mono uppercase text-slate-400 min-w-0">
              <FlaskConical className="w-3 h-3 shrink-0" />
              <span className="truncate">{s.ops_science}</span>
            </div>
            <div className={`text-lg sm:text-xl font-mono font-extrabold mt-0.5 ${statColor(scienceBonus)}`}>
              {statFmt(scienceBonus)} pts
            </div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950 border border-slate-800 text-center min-w-0 overflow-hidden">
            <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-mono uppercase text-slate-400 min-w-0">
              <PiggyBank className="w-3 h-3 shrink-0" />
              <span className="truncate">{s.ops_reserve}</span>
            </div>
            <div className={`text-lg sm:text-xl font-mono font-extrabold mt-0.5 ${statColor(reserveDelta)}`}>
              {statFmt(reserveDelta, 'M$')}
            </div>
          </div>
        </div>

        {/* FASE 1: Evento de Voo + Decisão do Diretor de Voo */}
        {phase === 'decide' && event && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-300">
                {s.ops_event}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white">{t(event.title)}</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t(event.desc)}</p>
            </div>
            <div className="grid gap-2.5">
              {event.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(option)}
                  className="w-full p-3.5 rounded-xl border border-slate-700 bg-slate-950/70 hover:border-purple-400 hover:bg-purple-950/30 text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center text-xs font-mono font-bold group-hover:bg-purple-500/40 transition-colors">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                      {t(option.label)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FASE 2: Feedback da Consequência da Decisão */}
        {phase === 'feedback' && lastChoice && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                {s.ops_consequence}
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{t(lastChoice.option.note)}</p>
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                <span className={`px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 ${statColor(lastChoice.effects.science)}`}>
                  {s.ops_science}: {statFmt(lastChoice.effects.science)}
                </span>
                <span className={`px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 ${statColor(lastChoice.effects.health, true)}`}>
                  {s.ops_health}: {statFmt(lastChoice.effects.health)}%
                </span>
                <span className={`px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 ${statColor(lastChoice.effects.reserve)}`}>
                  {s.ops_reserve}: {statFmt(lastChoice.effects.reserve)}M$
                </span>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm font-mono transition-all cursor-pointer shadow-lg"
            >
              {s.ops_next} →
            </button>
          </div>
        )}

        {/* FASE 3: Relatório Final de Operações com Classificação */}
        {phase === 'done' && finalGrade && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                {s.ops_final}
              </span>
              {health <= 0 && (
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs font-mono">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{s.ops_failed}</span>
                </div>
              )}
              <div className="font-mono text-[11px] text-emerald-400/90 space-y-1 max-h-32 overflow-y-auto">
                {flightLog.map((log, i) => (
                  <div key={i} className="leading-relaxed">{log}</div>
                ))}
              </div>
            </div>

            {/* Classificação Final com o impacto das operações */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400">{s.grade_label}</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {s.grade_names[finalGrade.grade]} • {finalGrade.score}/100
                </div>
              </div>
              <span
                className={`w-14 h-14 rounded-2xl border-2 font-mono font-extrabold text-3xl flex items-center justify-center ${gradeBadgeClass(finalGrade.grade)}`}
              >
                {finalGrade.grade}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  playSound('success', soundEnabled);
                  onOpenCertificate();
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm font-mono transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                {s.ops_certificate}
              </button>
              <button
                onClick={onClose}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs font-mono transition-all cursor-pointer"
              >
                {s.ops_close}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
