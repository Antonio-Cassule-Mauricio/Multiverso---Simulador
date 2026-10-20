// ============================================================================
// COMPONENTE: HeroSection (Apresentação Principal do Portal)
// Responsabilidade: Cabeçalho de impacto, imagem principal da sonda e telemetria de entrada
// ============================================================================

import React from 'react';
import { Rocket, Shield, Activity, Radio, ArrowRight, Compass, Play } from 'lucide-react';
import heroImg from '../../assets/images/space_multiverso_hero_1792514006340.jpg';
import { playSound } from '../../utils/audio';

export default function HeroSection({ onOpenSimulator, soundEnabled }) {
  // Parâmetros científicos de destaque em formato de badge
  const telemetryBadges = [
    { label: "Equação de Tsiolkovsky", val: "Δv = Isp · g0 · ln(m0/m1)", icon: Rocket },
    { label: "Radiação Solar", val: "S = 1361 / d² AU (W/m²)", icon: Activity },
    { label: "Link de Telemetria", val: "Downlink DSN Terra", icon: Radio },
    { label: "Engenharia de Sistemas", val: "Massa · Potência · Custo", icon: Shield },
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-24 border-b border-cyan-900/30">
      {/* Luz ambiente de fundo estilo nebulosa espacial */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/15 to-purple-600/10 blur-[130px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Coluna Esquerda: Texto de Apresentação e Botões */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badges de Identificação da Competição e Equipa */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>NASA Space Apps Challenge 2026</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-medium">
                <span>🇦🇴 Estudantes de Engenharia de Software • Angola</span>
              </div>
            </div>

            {/* Título Principal de Impacto */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Projeta a tua missão espacial.{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                Domina o Multiverso.
              </span>
            </h1>

            {/* Descrição resumida da proposta do projeto */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Projetar uma missão interplanetária exige equilibrar demandas concorrentes:
              massa de combustível, captação solar em órbitas distantes, enlaces de telecomunicação com a Terra e orçamentos rigorosos. 
              Um simulador interativo completo para estudantes e entusiastas transformarem física aeroespacial em ciência real.
            </p>

            {/* Botões de Ação para o Usuário */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  playSound('click', soundEnabled);
                  onOpenSimulator();
                }}
                className="px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all flex items-center gap-3 cursor-pointer border border-cyan-300/40 group hover:scale-[1.02]"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Jogar Agora / Simulador</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#challenge"
                onClick={() => playSound('click', soundEnabled)}
                className="px-5 py-3.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Explorar Desafio NASA</span>
              </a>
            </div>

            {/* Fórmulas e Grandezas Chave em Cards Compactos */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {telemetryBadges.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 text-cyan-400 text-xs mb-1">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="font-mono">{b.label}</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-200 truncate">
                      {b.val}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Coluna Direita: Imagem de Arte Aeroespacial e Telemetria Flutuante */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(56,189,248,0.25)] group">
              <img
                src={heroImg}
                alt="Sonda Espacial Multiverso em órbita de Marte"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              {/* Overlay de Telemetria da Sonda */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-950/85 border border-cyan-500/30 backdrop-blur-md flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono uppercase text-cyan-400 font-semibold tracking-wider">
                    Sonda Orbital • Multiverso I
                  </div>
                  <div className="text-xs text-slate-300">
                    Telemetria DSN ativa • 1.52 UA de distância solar
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
                  SISTEMAS NOMINAIS
                </span>
              </div>
            </div>

            {/* Badges Flutuantes Decorativos de Engenharia */}
            <div className="hidden sm:flex absolute -top-5 -left-5 p-3 rounded-xl bg-slate-900/90 border border-cyan-500/40 shadow-xl backdrop-blur-md items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                <Rocket className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono text-slate-400">Eficiência de Propulsão</div>
                <div className="text-xs font-mono font-bold text-cyan-300">ISP 320s • Bipropelente</div>
              </div>
            </div>

            <div className="hidden sm:flex absolute -bottom-5 -right-5 p-3 rounded-xl bg-slate-900/90 border border-purple-500/40 shadow-xl backdrop-blur-md items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300">
                <Radio className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono text-slate-400">Enlace de Rádio DSN</div>
                <div className="text-xs font-mono font-bold text-purple-300">35 W • Antena 2.5m</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
