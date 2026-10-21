// ============================================================================
// COMPONENTE: TeamSection (Apresentação da Equipa Multiverso)
// Responsabilidade: Apresentar os 5 colegas estudantes de Engenharia de Software
// (António Maurício, Adilson Francisco, Agostinho Mariti, Edmilson Segredo, Hilton Diamantino)
// sem nenhuma referência a instituições externas, com tradução dinâmica e comentários em PT.
// ============================================================================

import React from 'react';
import { Users, Award, Code2, Globe2, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

export default function TeamSection({ t = (k) => k }) {
  // Lista dos 5 membros da equipa de estudantes de Engenharia de Software
  const teamMembers = [
    {
      name: "António Maurício",
      role: t('member_1_role'),
      focus: t('member_1_focus'),
      initials: "AM",
      isLead: true,
      tag: "Tech Lead",
    },
    {
      name: "Adilson Francisco",
      role: t('member_2_role'),
      focus: t('member_2_focus'),
      initials: "AF",
      isLead: false,
      tag: "Orbital Dynamics",
    },
    {
      name: "Agostinho Mariti",
      role: t('member_3_role'),
      focus: t('member_3_focus'),
      initials: "AM",
      isLead: false,
      tag: "Payload Systems",
    },
    {
      name: "Edmilson Segredo",
      role: t('member_4_role'),
      focus: t('member_4_focus'),
      initials: "ES",
      isLead: false,
      tag: "Power & RF Comms",
    },
    {
      name: "Hilton Diamantino",
      role: t('member_5_role'),
      focus: t('member_5_focus'),
      initials: "HD",
      isLead: false,
      tag: "3D Graphics & UI",
    },
  ];

  return (
    <section id="equipa" className="py-20 relative border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>{t('team_badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('team_title')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('team_desc')}
          </p>
        </div>

        {/* Banner de Compromisso e Excelência da Equipa */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-cyan-950/40 to-slate-900/90 border border-cyan-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-bold">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>{t('team_banner_badge')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
              {t('team_banner_title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {t('team_banner_sub')}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-2xl font-black text-cyan-400 font-mono">5</div>
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{t('team_software_eng')}</div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-2xl font-black text-emerald-400 font-mono">100%</div>
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">NASA Apps 2026</div>
            </div>
          </div>
        </div>

        {/* Grelha com os 5 Membros da Equipa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 bg-slate-900/70 border ${
                member.isLead ? 'border-cyan-500/50 shadow-[0_0_25px_rgba(56,189,248,0.15)] bg-slate-900/90' : 'border-slate-800/80 hover:border-slate-700'
              } flex flex-col justify-between transition-all duration-300 hover:scale-[1.01]`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600/30 via-blue-600/20 to-purple-600/30 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-base text-cyan-300 shadow-sm">
                    {member.initials}
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold border ${
                    member.isLead ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {member.tag}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span>{member.name}</span>
                  {member.isLead && <Award className="w-4 h-4 text-cyan-400" />}
                </h4>

                <p className="text-xs font-semibold text-cyan-400 font-mono mt-1">
                  {member.role}
                </p>

                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  {member.focus}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('team_software_eng')}</span>
                </span>
                <span className="text-slate-500">Angola 🇦🇴</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
