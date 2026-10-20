// ============================================================================
// DADOS: Objetivos Científicos Oficiais por Destino (briefings da agência)
// Cada universo define 3 metas mensuráveis avaliadas ao vivo durante o design.
// Tipos de métrica: 'science' (pts devolvidos), 'downlink' (fração 0-1),
// 'cost' (limite em M$), 'success' (probabilidade 0-1)
// ============================================================================

export const objectives = {
  mars: {
    briefing: {
      pt: "A Agência quer mapear os depósitos de gelo subterrâneo e a mineralogia da Cratera Jezero, mantendo o programa dentro do teto orçamental da classe Discovery.",
      en: "The Agency wants to map subsurface ice deposits and the mineralogy of Jezero Crater while keeping the program within the Discovery-class cost cap.",
      fr: "L'Agence veut cartographier les dépôts de glace souterraine et la minéralogie du cratère Jezero, tout en respectant le plafond budgétaire de la classe Discovery.",
    },
    goals: [
      { id: "mars_sci", type: "science", target: 45 },
      { id: "mars_dl", type: "downlink", target: 0.6 },
      { id: "mars_cost", type: "cost", target: 700 },
    ],
  },
  moon: {
    briefing: {
      pt: "Prospectar água congelada nas crateras permanentemente sombreadas do Polo Sul, preparando o terreno para a infraestrutura do programa Artemis.",
      en: "Prospect frozen water in the permanently shadowed craters of the South Pole, paving the way for the Artemis program infrastructure.",
      fr: "Prospecter l'eau gelée dans les cratères en ombre permanente du pôle Sud, en préparant l'infrastructure du programme Artemis.",
    },
    goals: [
      { id: "moon_sci", type: "science", target: 35 },
      { id: "moon_succ", type: "success", target: 0.75 },
      { id: "moon_cost", type: "cost", target: 480 },
    ],
  },
  europa: {
    briefing: {
      pt: "Sondar o oceano global sob a crosta de gelo e avaliar a habitabilidade do oceano alienígena, apesar da radiação joviana e da distância extrema à Terra.",
      en: "Probe the global ocean beneath the ice crust and assess the habitability of the alien ocean, despite Jovian radiation and the extreme distance from Earth.",
      fr: "Sonder l'océan global sous la croûte de glace et évaluer l'habitabilité de cet océan extraterrestre, malgré le rayonnement jovien et la distance extrême.",
    },
    goals: [
      { id: "eu_sci", type: "science", target: 55 },
      { id: "eu_dl", type: "downlink", target: 0.45 },
      { id: "eu_cost", type: "cost", target: 1200 },
    ],
  },
  titan: {
    briefing: {
      pt: "Caracterizar os lagos de metano e a química orgânica complexa da atmosfera densa de Titã — a missão flagship mais ambiciosa da década.",
      en: "Characterize Titan's methane lakes and the complex organic chemistry of its dense atmosphere — the most ambitious flagship mission of the decade.",
      fr: "Caractériser les lacs de méthane et la chimie organique complexe de l'atmosphère dense de Titan — la mission flagship la plus ambitieuse de la décennie.",
    },
    goals: [
      { id: "ti_sci", type: "science", target: 55 },
      { id: "ti_succ", type: "success", target: 0.65 },
      { id: "ti_cost", type: "cost", target: 1400 },
    ],
  },
};
