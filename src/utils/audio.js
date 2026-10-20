// ============================================================================
// SISTEMA DE ÁUDIO SINTETIZADO (Web Audio API)
// Responsabilidade: Efeitos sonoros espaciais de cockpit, propulsão, rádio,
// telemetria e fanfarras de vitória sem necessidade de ficheiros externos
// ============================================================================

let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export const playSound = (type = "beep", enabled = true) => {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "click") {
      // Clique de botão do cockpit
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "toggle") {
      // Alternância de chave de sistemas
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "launch" || type === "thrust") {
      // Rugido profundo dos motores de foguete / propulsores
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(85, now);
      osc.frequency.linearRampToValueAtTime(220, now + 0.8);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.9);
      osc.start(now);
      osc.stop(now + 0.9);
    } else if (type === "warp") {
      // Aceleração hiperespaço / queima máxima
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.6);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc.start(now);
      osc.stop(now + 0.7);
    } else if (type === "scanner") {
      // Pulso sonar do radar científico
      osc.type = "sine";
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.2);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "radio") {
      // Estática e sinal de rádio DSN
      const freqs = [620, 840, 1100];
      freqs.forEach((f, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "triangle";
        o.frequency.value = f;
        o.connect(g);
        g.connect(ctx.destination);
        const start = now + idx * 0.08;
        g.gain.setValueAtTime(0.07, start);
        g.gain.exponentialRampToValueAtTime(0.001, start + 0.15);
        o.start(start);
        o.stop(start + 0.15);
      });
    } else if (type === "success" || type === "touchdown") {
      // Fanfarra triunfal de pouso / conquista científica
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((f, idx) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = f;
        o.connect(g);
        g.connect(ctx.destination);
        const start = now + idx * 0.1;
        g.gain.setValueAtTime(0.1, start);
        g.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
        o.start(start);
        o.stop(start + 0.4);
      });
    } else if (type === "warning") {
      // Alarme de aproximação / impacto
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.setValueAtTime(260, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (err) {
    console.debug("Reprodução de áudio ignorada:", err);
  }
};
