// ============================================================================
// COMPONENTE: TeamSection (Apresentação dos Estudantes e Colegas de Engenharia)
// Responsabilidade: Destaque da equipa de 5 colegas estudantes de engenharia de software de Angola
// ============================================================================

import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import missionRoomImg from '../../assets/images/mission_operations_room_1792514036256.jpg';

export default function TeamSection() {
  // Dados dos 5 colegas participantes no NASA Space Apps Challenge 2026
  const members = [
    {
      name: "António Maurício",
      role: "Líder da Equipa & Arquitetura de Sistemas",
      focus: "Engenharia de Software • Coordenação Técnica • Simulação Multivariável",
      tag: "Líder de Equipa",
      badgeColor: "border-cyan-400/40 text-cyan-300 bg-cyan-950/60",
    },
    {
      name: "Adilson Francisco",
      role: "Dinâmica Orbital & Lógica Numérica",
      focus: "Equação de Tsiolkovsky • Modelagem de Δv • Capacidade de Lançadores",
      tag: "Dinâmica Orbital",
      badgeColor: "border-blue-400/40 text-blue-300 bg-blue-950/60",
    },
    {
      name: "Agostinho Mariti",
      role: "Instrumentação & Carga Científica",
      focus: "Espectrometria • Radares de Subsolo • Taxonomia de Missões Planetárias",
      tag: "Carga Útil",
      badgeColor: "border-purple-400/40 text-purple-300 bg-purple-950/60",
    },
    {
      name: "Edmilson Segredo",
      role: "Sistemas de Potência & Telecomunicações",
      focus: "Equação de Enlace DSN • Fluxo Solar 1/r² • Balanço Térmico e Baterias",
      tag: "Potência & Rádio",
      badgeColor: "border-amber-400/40 text-amber-300 bg-amber-950/60",
    },
    {
      name: "Hilton Diamantino",
      role: "Engenharia Frontend & Interface Gráfica",
      focus: "Experiência de Utilizador • Telemetria em Tempo Real • Design Aeroespacial",
      tag: "Interface de Voo",
      badgeColor: "border-emerald-400/40 text-emerald-300 bg-emerald-950/60",
    },
  ];

  return (
    <section id="team" className="py-20 border-b border-cyan-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Secção da Equipa */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono uppercase tracking-wider">
            <span>🇦🇴 Representação Nacional • Luanda, Angola</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Equipa Multiverso •{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400">
              Colegas de Engenharia de Software
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Somos um grupo de 5 colegas e estudantes angolanos de <strong className="text-white">Engenharia de Software</strong>, 
            unidos pela paixão pela exploração espacial, ciência computacional e foco para alcançar a vitória no 
            <strong className="text-cyan-400"> NASA Space Apps Challenge 2026</strong>.
          </p>
        </div>

        {/* Banner com Imagem do Centro de Operações de Missão */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl relative group">
          <img
            src={missionRoomImg}
            alt="Sala de Operações da Missão NASA Space Apps"
            className="w-full h-64 sm:h-80 object-cover object-center group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent flex items-end p-6 sm:p-8">
            <div className="text-left max-w-2xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-semibold">
                  ESTUDANTES DE ENGENHARIA DE SOFTWARE
                </span>
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs">
                  ANGOLA 🇦🇴
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Centro de Operações & Inovação Aeroespacial
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Combinando rigor algorítmico, física espacial precisa e design intuitivo para democratizar o ensino e o planeamento de missões interplanetárias.
              </p>
            </div>
          </div>
        </div>

        {/* Grelha com os 5 Colegas da Equipa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m, idx) => {
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-400/50 transition-all text-left flex flex-col justify-between bg-slate-900/60 shadow-lg group hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider font-semibold ${m.badgeColor}`}>
                      {m.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Angola</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {m.name}
                    </h3>
                    <p className="text-xs font-medium text-cyan-400 mt-0.5">
                      {m.role}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {m.focus}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Engenharia de Software</span>
                  <span className="text-cyan-400 font-bold">Space Apps 2026</span>
                </div>
              </div>
            );
          })}

          {/* Cartão de Compromisso de Vitória no Concurso */}
          <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-slate-900/90 to-amber-950/20 text-left flex flex-col justify-between shadow-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <Award className="w-5 h-5" />
                <span className="text-xs font-mono uppercase font-bold tracking-wider">Foco na Vitória</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Rumo ao Prémio Global NASA
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Este projeto é o resultado de trabalho em equipa contínuo, estudo profundo das publicações do JPL/NASA e dedicação dos 5 colegas para demonstrar o elevado nível da engenharia de software em Angola.
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center gap-2 text-xs font-mono text-amber-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Código Aberto & Simulação Fidedigna</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
