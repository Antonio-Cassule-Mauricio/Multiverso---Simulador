// ============================================================================
// DADOS + i18n: Fase de Operações (eventos de voo) e Painel de Objetivos
// Textos em Português (pt), Inglês (en) e Francês (fr)
// ============================================================================

export const opsStrings = {
  pt: {
    panel_title: "Objetivos Oficiais da Missão",
    panel_briefing_label: "Briefing da Agência:",
    panel_met: "CUMPRIDO",
    panel_missing: "EM FALTA",
    projected_grade: "Classificação Projetada",
    goal_science: (t) => `Devolver ≥ ${t} pts de ciência à Terra`,
    goal_downlink: (t) => `Garantir downlink ≥ ${Math.round(t * 100)}% dos dados`,
    goal_cost: (t) => `Manter o custo total ≤ $${t}M`,
    goal_success: (t) => `Probabilidade de sucesso ≥ ${Math.round(t * 100)}%`,
    fmt_science: (v) => `${v.toFixed(0)} pts`,
    fmt_downlink: (v) => `${(v * 100).toFixed(0)}%`,
    fmt_cost: (v) => `$${v.toFixed(0)}M`,
    fmt_success: (v) => `${(v * 100).toFixed(0)}%`,
    ops_title: "FASE DE OPERAÇÕES",
    ops_sub: "Gestão da missão em voo — 5 dias de decisões críticas do Diretor de Voo",
    ops_day: "Dia de Missão",
    ops_health: "Saúde da Sonda",
    ops_science: "Ciência Extra",
    ops_reserve: "Reserva Orçamental",
    ops_event: "EVENTO DE VOO",
    ops_consequence: "Consequência da decisão",
    ops_next: "Avançar para o dia seguinte",
    ops_final: "RELATÓRIO FINAL DE OPERAÇÕES",
    ops_certificate: "Emitir Certificado Final",
    ops_close: "Concluir Operações",
    ops_start: "Iniciar Fase de Operações",
    ops_failed: "SONDA PERDIDA — a saúde estrutural chegou a 0%.",
    grade_label: "Classificação Final",
    grade_names: { S: "Excecional", A: "Excelente", B: "Bom", C: "Suficiente", D: "Limitado", E: "Fracasso" },
  },
  en: {
    panel_title: "Official Mission Objectives",
    panel_briefing_label: "Agency Briefing:",
    panel_met: "MET",
    panel_missing: "MISSING",
    projected_grade: "Projected Grade",
    goal_science: (t) => `Return ≥ ${t} science pts to Earth`,
    goal_downlink: (t) => `Ensure downlink ≥ ${Math.round(t * 100)}% of the data`,
    goal_cost: (t) => `Keep total cost ≤ $${t}M`,
    goal_success: (t) => `Success probability ≥ ${Math.round(t * 100)}%`,
    fmt_science: (v) => `${v.toFixed(0)} pts`,
    fmt_downlink: (v) => `${(v * 100).toFixed(0)}%`,
    fmt_cost: (v) => `$${v.toFixed(0)}M`,
    fmt_success: (v) => `${(v * 100).toFixed(0)}%`,
    ops_title: "OPERATIONS PHASE",
    ops_sub: "In-flight mission management — 5 days of critical Flight Director decisions",
    ops_day: "Mission Day",
    ops_health: "Spacecraft Health",
    ops_science: "Bonus Science",
    ops_reserve: "Budget Reserve",
    ops_event: "FLIGHT EVENT",
    ops_consequence: "Decision outcome",
    ops_next: "Advance to the next day",
    ops_final: "FINAL OPERATIONS REPORT",
    ops_certificate: "Issue Final Certificate",
    ops_close: "Finish Operations",
    ops_start: "Start Operations Phase",
    ops_failed: "SPACECRAFT LOST — structural health reached 0%.",
    grade_label: "Final Grade",
    grade_names: { S: "Outstanding", A: "Excellent", B: "Good", C: "Fair", D: "Limited", E: "Failure" },
  },
  fr: {
    panel_title: "Objectifs Officiels de la Mission",
    panel_briefing_label: "Briefing de l'Agence :",
    panel_met: "ATTEINT",
    panel_missing: "MANQUANT",
    projected_grade: "Note Projetée",
    goal_science: (t) => `Rapporter ≥ ${t} pts de science sur Terre`,
    goal_downlink: (t) => `Garantir un downlink ≥ ${Math.round(t * 100)}% des données`,
    goal_cost: (t) => `Maintenir le coût total ≤ ${t} M$`,
    goal_success: (t) => `Probabilité de succès ≥ ${Math.round(t * 100)}%`,
    fmt_science: (v) => `${v.toFixed(0)} pts`,
    fmt_downlink: (v) => `${(v * 100).toFixed(0)} %`,
    fmt_cost: (v) => `${v.toFixed(0)} M$`,
    fmt_success: (v) => `${(v * 100).toFixed(0)} %`,
    ops_title: "PHASE D'OPÉRATIONS",
    ops_sub: "Gestion de la mission en vol — 5 jours de décisions critiques du Directeur de Vol",
    ops_day: "Jour de Mission",
    ops_health: "Santé de la Sonde",
    ops_science: "Science Bonus",
    ops_reserve: "Réserve Budgétaire",
    ops_event: "ÉVÉNEMENT DE VOL",
    ops_consequence: "Conséquence de la décision",
    ops_next: "Passer au jour suivant",
    ops_final: "RAPPORT FINAL DES OPÉRATIONS",
    ops_certificate: "Émettre le Certificat Final",
    ops_close: "Terminer les Opérations",
    ops_start: "Lancer la Phase d'Opérations",
    ops_failed: "SONDE PERDUE — la santé structurelle a atteint 0 %.",
    grade_label: "Note Finale",
    grade_names: { S: "Exceptionnel", A: "Excellent", B: "Bon", C: "Suffisant", D: "Limité", E: "Échec" },
  },
};

// ============================================================================
// Eventos aleatórios da Fase de Operações
// Efeitos: { science (pts extra), health (0-100), reserve (M$) }
// ============================================================================

export const opsEvents = [
  {
    id: "dust_storm",
    title: { pt: "Tempestade de Poeira Global", en: "Global Dust Storm", fr: "Tempête de Poussière Globale" },
    desc: {
      pt: "Uma tempestade de poeira cobre o céu e reduz drasticamente a captação solar. Os controladores debatem o modo de sobrevivência.",
      en: "A dust storm covers the sky and drastically reduces solar intake. Controllers debate the survival mode.",
      fr: "Une tempête de poussière couvre le ciel et réduit fortement la captation solaire. Les contrôleurs débattent du mode de survie.",
    },
    options: [
      {
        label: { pt: "Entrar em modo seguro até passar", en: "Enter safe mode until it passes", fr: "Passer en mode sans échec" },
        note: {
          pt: "A sonda hiberna protegida. Perde-se tempo de ciência, mas o hardware fica intacto.",
          en: "The probe hibernates safely. Science time is lost, but the hardware stays intact.",
          fr: "La sonde hiberne en sécurité. Du temps scientifique est perdu, mais le matériel reste intact.",
        },
        effects: { science: -3, health: -4, reserve: 0 },
      },
      {
        label: { pt: "Continuar a operar os instrumentos", en: "Keep instruments running", fr: "Continuer à faire fonctionner les instruments" },
        note: {
          pt: "Dados raros da tempestade recolhidos! Mas o pó abrasivo degrada painéis e juntas.",
          en: "Rare storm data collected! But abrasive dust degrades panels and joints.",
          fr: "Des données rares sur la tempête collectées ! Mais la poussière abrasive dégrade panneaux et joints.",
        },
        effects: { science: 12, health: -18, reserve: 0 },
      },
    ],
  },
  {
    id: "solar_flare",
    title: { pt: "Erupção Solar (CME) a Caminho", en: "Incoming Solar Flare (CME)", fr: "Éruption Solaire (CME) en Approche" },
    desc: {
      pt: "O observatório solar da Terra deteta uma ejeção de massa coronal dirigida à sonda. Tens 24 horas para decidir.",
      en: "Earth's solar observatory detects a coronal mass ejection heading toward the probe. You have 24 hours to decide.",
      fr: "L'observatoire solaire terrestre détecte une éjection de masse coronale vers la sonde. Vous avez 24 heures pour décider.",
    },
    options: [
      {
        label: { pt: "Proteger a eletrónica (48h offline)", en: "Shield electronics (48h offline)", fr: "Protéger l'électronique (48h hors ligne)" },
        note: {
          pt: "Sistemas desligados atrás da blindagem. Nenhum dano, mas dois dias de ciência perdidos.",
          en: "Systems powered down behind shielding. No damage, but two days of science lost.",
          fr: "Systèmes éteints derrière le blindage. Aucun dégât, mais deux jours de science perdus.",
        },
        effects: { science: -4, health: 2, reserve: 0 },
      },
      {
        label: { pt: "Manter instrumentos ligados", en: "Keep instruments online", fr: "Garder les instruments en ligne" },
        note: {
          pt: "Medições únicas do evento solar! A radiação, porém, causa single-event upsets nos computadores.",
          en: "Unique measurements of the solar event! Radiation, however, causes single-event upsets in the computers.",
          fr: "Mesures uniques de l'événement solaire ! Le rayonnement provoque cependant des erreurs dans les ordinateurs.",
        },
        effects: { science: 8, health: -12, reserve: 0 },
      },
    ],
  },
  {
    id: "dsn_window",
    title: { pt: "Janela DSN Reduzida", en: "Reduced DSN Window", fr: "Fenêtre DSN Réduite" },
    desc: {
      pt: "A estação de Goldstone entra em manutenção. O tempo de antena disponível para a tua missão é cortado ao meio esta semana.",
      en: "The Goldstone station enters maintenance. Antenna time available for your mission is cut in half this week.",
      fr: "La station de Goldstone entre en maintenance. Le temps d'antenne pour votre mission est réduit de moitié cette semaine.",
    },
    options: [
      {
        label: { pt: "Priorizar downlink de dados científicos", en: "Prioritize science data downlink", fr: "Prioriser le downlink des données scientifiques" },
        note: {
          pt: "Imagens e espectros chegam à Terra. A telemetria de engenharia fica para trás.",
          en: "Images and spectra reach Earth. Engineering telemetry falls behind.",
          fr: "Images et spectres arrivent sur Terre. La télémétrie d'ingénierie prend du retard.",
        },
        effects: { science: 10, health: -3, reserve: 0 },
      },
      {
        label: { pt: "Descarregar telemetria de engenharia", en: "Downlink engineering telemetry", fr: "Télécharger la télémétrie d'ingénierie" },
        note: {
          pt: "Os engenheiros corrigem dois parâmetros de degradação. A ciência aguarda na memória da sonda.",
          en: "Engineers correct two degrading parameters. Science waits in the probe's memory.",
          fr: "Les ingénieurs corrigent deux paramètres dégradés. La science attend dans la mémoire de la sonde.",
        },
        effects: { science: -2, health: 10, reserve: 0 },
      },
    ],
  },
  {
    id: "instrument_anomaly",
    title: { pt: "Anomalia no Instrumento Principal", en: "Primary Instrument Anomaly", fr: "Anomalie de l'Instrument Principal" },
    desc: {
      pt: "O instrumento científico principal reporta leituras fora do padrão após um reinício inesperado do seu processador.",
      en: "The primary science instrument reports out-of-range readings after an unexpected processor reset.",
      fr: "L'instrument scientifique principal signale des lectures anormales après un redémarrage inattendu de son processeur.",
    },
    options: [
      {
        label: { pt: "Reinício remoto de software", en: "Remote software reboot", fr: "Redémarrage logiciel à distance" },
        note: {
          pt: "O patch resolve a maior parte das leituras, mas algumas cadeias de dados ficaram corrompidas.",
          en: "The patch fixes most readings, but some data chains were corrupted.",
          fr: "Le correctif résout la plupart des lectures, mais certaines chaînes de données sont corrompues.",
        },
        effects: { science: -2, health: -6, reserve: 0 },
      },
      {
        label: { pt: "Recalibração completa com a equipa", en: "Full recalibration with the team", fr: "Recalibrage complet avec l'équipe" },
        note: {
          pt: "Sessões extra de antena e análise restauram a precisão total — com custo adicional de operações.",
          en: "Extra antenna sessions and analysis restore full accuracy — at additional operations cost.",
          fr: "Des sessions d'antenne supplémentaires restaurent la précision totale — avec un coût opérationnel additionnel.",
        },
        effects: { science: 8, health: -2, reserve: -15 },
      },
    ],
  },
  {
    id: "orbit_correction",
    title: { pt: "Correção de Trajetória Necessária", en: "Trajectory Correction Needed", fr: "Correction de Trajectoire Nécessaire" },
    desc: {
      pt: "A navegação deteta um desvio acumulado na trajetória que ameaça as janelas de observação planeadas.",
      en: "Navigation detects an accumulated trajectory drift that threatens the planned observation windows.",
      fr: "La navigation détecte une dérive de trajectoire qui menace les fenêtres d'observation prévues.",
    },
    options: [
      {
        label: { pt: "Executar a queima de correção agora", en: "Execute the correction burn now", fr: "Exécuter la correction maintenant" },
        note: {
          pt: "Manobra nominal. O propelente extra foi contratado como margem, pago pela reserva do programa.",
          en: "Nominal maneuver. The extra propellant margin is paid from the program reserve.",
          fr: "Manœuvre nominale. La marge de propergol supplémentaire est payée par la réserve du programme.",
        },
        effects: { science: 4, health: 6, reserve: -10 },
      },
      {
        label: { pt: "Adiar e aceitar o desvio", en: "Postpone and accept the drift", fr: "Reporter et accepter la dérive" },
        note: {
          pt: "Poupa-se propelente, mas duas passagens de observação ficam degradadas.",
          en: "Propellant is saved, but two observation passes are degraded.",
          fr: "Le propergol est économisé, mais deux passages d'observation sont dégradés.",
        },
        effects: { science: -6, health: -8, reserve: 0 },
      },
    ],
  },
  {
    id: "science_opportunity",
    title: { pt: "Alvo Científico Inesperado", en: "Unexpected Science Target", fr: "Cible Scientifique Inattendue" },
    desc: {
      pt: "As últimas imagens revelam um fenómeno transitório de enorme interesse — mas observá-lo exige reescrever o plano da semana.",
      en: "The latest images reveal a transient phenomenon of enormous interest — but observing it requires rewriting the week's plan.",
      fr: "Les dernières images révèlent un phénomène transitoire d'un énorme intérêt — mais l'observer exige de réécrire le plan de la semaine.",
    },
    options: [
      {
        label: { pt: "Desviar o planeamento para observar", en: "Replan to observe it", fr: "Replanifier pour l'observer" },
        note: {
          pt: "Observações de oportunidade de elevadíssimo valor! A equipa de planeamento trabalha o fim de semana.",
          en: "Extremely high-value opportunity observations! The planning team works the weekend.",
          fr: "Observations d'opportunité de très grande valeur ! L'équipe de planification travaille le week-end.",
        },
        effects: { science: 15, health: -3, reserve: -12 },
      },
      {
        label: { pt: "Manter o plano nominal", en: "Keep the nominal plan", fr: "Garder le plan nominal" },
        note: {
          pt: "Disciplina de programa: o plano aprovado cumpre-se sem riscos adicionais.",
          en: "Program discipline: the approved plan is executed with no additional risk.",
          fr: "Discipline de programme : le plan approuvé est exécuté sans risque supplémentaire.",
        },
        effects: { science: 0, health: 4, reserve: 0 },
      },
    ],
  },
  {
    id: "thermal",
    title: { pt: "Ciclos Térmicos Extremos", en: "Extreme Thermal Cycles", fr: "Cycles Thermiques Extrêmes" },
    desc: {
      pt: "As oscilações de temperatura entre o sol e a sombra estão a forçar os limites do desenho térmico da sonda.",
      en: "Temperature swings between sunlight and shadow are pushing the probe's thermal design limits.",
      fr: "Les variations de température entre soleil et ombre poussent les limites de la conception thermique de la sonde.",
    },
    options: [
      {
        label: { pt: "Ativar aquecedores (consome energia)", en: "Activate heaters (uses power)", fr: "Activer les chauffages (consomme de l'énergie)" },
        note: {
          pt: "A eletrónica fica dentro da envelope térmica. Menos energia disponível para a ciência.",
          en: "Electronics stay within the thermal envelope. Less power available for science.",
          fr: "L'électronique reste dans l'enveloppe thermique. Moins d'énergie disponible pour la science.",
        },
        effects: { science: -3, health: 8, reserve: 0 },
      },
      {
        label: { pt: "Aceitar a degradação térmica", en: "Accept thermal degradation", fr: "Accepter la dégradation thermique" },
        note: {
          pt: "A ciência continua a todo o vapor, mas os ciclos de fadiga encurtam a vida útil da sonda.",
          en: "Science continues at full pace, but fatigue cycles shorten the probe's lifespan.",
          fr: "La science continue à plein rythme, mais les cycles de fatigue raccourcissent la durée de vie de la sonde.",
        },
        effects: { science: 6, health: -14, reserve: 0 },
      },
    ],
  },
  {
    id: "budget_review",
    title: { pt: "Revisão Orçamental da Agência", en: "Agency Budget Review", fr: "Révision Budgétaire de l'Agence" },
    desc: {
      pt: "A agência revê todos os programas em voo. A tua missão precisa de justificar cada milhão gasto em operações.",
      en: "The agency reviews all in-flight programs. Your mission must justify every million spent on operations.",
      fr: "L'agence passe en revue tous les programmes en vol. Votre mission doit justifier chaque million dépensé en opérations.",
    },
    options: [
      {
        label: { pt: "Reduzir a equipa de operações", en: "Reduce the operations team", fr: "Réduire l'équipe d'opérations" },
        note: {
          pt: "Poupança imediata, mas turnos mais longos aumentam o risco de erro humano.",
          en: "Immediate savings, but longer shifts increase the risk of human error.",
          fr: "Économies immédiates, mais des quarts plus longs augmentent le risque d'erreur humaine.",
        },
        effects: { science: 0, health: -6, reserve: 12 },
      },
      {
        label: { pt: "Defender o financiamento com resultados", en: "Defend funding with results", fr: "Défendre le financement avec des résultats" },
        note: {
          pt: "A equipa publica dados preliminares fortes. O financiamento é mantido, mas a pressão científica sobe.",
          en: "The team publishes strong preliminary data. Funding is kept, but scientific pressure rises.",
          fr: "L'équipe publie des données préliminaires solides. Le financement est maintenu, mais la pression scientifique augmente.",
        },
        effects: { science: 8, health: 0, reserve: -8 },
      },
    ],
  },
];
