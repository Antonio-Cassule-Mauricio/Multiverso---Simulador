export const universes = {
  mars: {
    id: "mars",
    name: "Marte (Planeta Vermelho)",
    tagline: "O grande objetivo da exploração planetária robótica e humana",
    description: "Atmosfera ténue de CO2, tempestades de poeira globais e terreno escarpado. Excelente para orbitadores de observação e rovers de exploração geológica.",
    sunDistanceAU: 1.52, // distância ao Sol
    earthDistanceAU: 1.5, // distância média à Terra (simplificação)
    budgetM: 800, // orçamento em milhões de dólares
    color: "#e05a47",
    glowColor: "rgba(224, 90, 71, 0.4)",
    surfaceGravity: "3.72 m/s²",
    atmosphere: "Ténue (95% CO2)",
    temperature: "-63 °C",
    types: {
      orbiter: {
        dvMs: 1500, edlFactor: 0, risk: 0.05,
        contactHours: 8, cycleHours: 2, sunFraction: 0.67, incidence: 1.0,
      },
      lander: {
        dvMs: 300, edlFactor: 1.0, risk: 0.2,
        contactHours: 4, cycleHours: 24.6, sunFraction: 0.5, incidence: 0.7,
      },
      rover: {
        dvMs: 300, edlFactor: 1.2, risk: 0.25,
        contactHours: 4, cycleHours: 24.6, sunFraction: 0.5, incidence: 0.7,
      },
    },
  },
  moon: {
    id: "moon",
    name: "Lua (Satélite Terrestre)",
    tagline: "O campo de testes para a expansão interplanetária humana",
    description: "Sem atmosfera, vácuo total e noites frias de 14 dias terrestres. Comunicações quase instantâneas com a Terra, mas exige armazenamento massivo de bateria para a longa noite lunar.",
    sunDistanceAU: 1.0,
    earthDistanceAU: 0.0026,
    budgetM: 550,
    color: "#cbd5e1",
    glowColor: "rgba(203, 213, 225, 0.4)",
    surfaceGravity: "1.62 m/s²",
    atmosphere: "Vácuo",
    temperature: "-130 °C a +120 °C",
    types: {
      orbiter: {
        dvMs: 850, edlFactor: 0, risk: 0.03,
        contactHours: 12, cycleHours: 2, sunFraction: 0.65, incidence: 1.0,
      },
      lander: {
        dvMs: 1750, edlFactor: 0.4, risk: 0.12,
        contactHours: 12, cycleHours: 708, sunFraction: 0.5, incidence: 0.9,
      },
      rover: {
        dvMs: 1750, edlFactor: 0.5, risk: 0.15,
        contactHours: 10, cycleHours: 708, sunFraction: 0.5, incidence: 0.9,
      },
    },
  },
  europa: {
    id: "europa",
    name: "Europa (Lua de Júpiter)",
    tagline: "Oceano subterrâneo líquido sob uma crosta de gelo alienígena",
    description: "A 5.2 UA do Sol, o fluxo solar é apenas 3.7% do terrestre. Painéis solares tornam-se quase inúteis, tornando geradores RTG indispensáveis. Campo de radiação joviano severo.",
    sunDistanceAU: 5.2,
    earthDistanceAU: 4.2,
    budgetM: 1400,
    color: "#67e8f9",
    glowColor: "rgba(103, 232, 249, 0.4)",
    surfaceGravity: "1.315 m/s²",
    atmosphere: "Ténue (Oxigénio residual)",
    temperature: "-170 °C",
    types: {
      orbiter: {
        dvMs: 2800, edlFactor: 0, risk: 0.12,
        contactHours: 6, cycleHours: 3.5, sunFraction: 0.6, incidence: 0.8,
      },
      lander: {
        dvMs: 2100, edlFactor: 0.8, risk: 0.35,
        contactHours: 4, cycleHours: 85, sunFraction: 0.5, incidence: 0.6,
      },
      rover: {
        dvMs: 2100, edlFactor: 1.0, risk: 0.4,
        contactHours: 3, cycleHours: 85, sunFraction: 0.5, incidence: 0.6,
      },
    },
  },
  titan: {
    id: "titan",
    name: "Titã (Lua de Saturno)",
    tagline: "Mares de metano líquido e atmosfera mais densa que a da Terra",
    description: "Distância extrema (9.58 UA). A densa atmosfera de azoto permite aterrissagens com paraquedas sem escudo térmico pesado, mas a luz solar não penetra. Exige RTG e antena de alto ganho.",
    sunDistanceAU: 9.58,
    earthDistanceAU: 8.5,
    budgetM: 1600,
    color: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.4)",
    surfaceGravity: "1.352 m/s²",
    atmosphere: "Densa (98% Nitrogénio)",
    temperature: "-179 °C",
    types: {
      orbiter: {
        dvMs: 3200, edlFactor: 0, risk: 0.15,
        contactHours: 5, cycleHours: 4, sunFraction: 0.5, incidence: 0.5,
      },
      lander: {
        dvMs: 800, edlFactor: 0.7, risk: 0.28,
        contactHours: 4, cycleHours: 382, sunFraction: 0.5, incidence: 0.4,
      },
      rover: {
        dvMs: 800, edlFactor: 0.9, risk: 0.32,
        contactHours: 4, cycleHours: 382, sunFraction: 0.5, incidence: 0.4,
      },
    },
  },
};