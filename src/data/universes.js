// ============================================================================
// DADOS DOS CORPOS CELESTES / UNIVERSOS DA MISSÃO
// ============================================================================

export const universes = {
  mars: {
    id: "mars",
    name: "Marte (Planeta Vermelho)",
    tagline: "O grande objetivo da exploração planetária robótica e humana",
    description: "Atmosfera ténue de CO2, tempestades de poeira globais e terreno escarpado. Excelente para orbitadores de observação e rovers de exploração geológica.",
    atmosphere: "Ténue (95% CO2)",
    sunDistanceAU: 1.52,
    earthDistanceAU: 1.5,
    budgetM: 800,
    surfaceGravity: "0.38 g (3.72 m/s²)",
    color: "#c2410c",
  },
  moon: {
    id: "moon",
    name: "Lua (Satélite Terrestre)",
    tagline: "O campo de testes para a expansão interplanetária humana",
    description: "Sem atmosfera, vácuo total e noites frias de 14 dias terrestres. Comunicações quase instantâneas com a Terra, mas exige armazenamento massivo de bateria.",
    atmosphere: "Vácuo total",
    sunDistanceAU: 1.0,
    earthDistanceAU: 0.0026,
    budgetM: 600,
    surfaceGravity: "0.166 g (1.62 m/s²)",
    color: "#94a3b8",
  },
  europa: {
    id: "europa",
    name: "Europa (Lua de Júpiter)",
    tagline: "Oceano subterrâneo líquido sob uma crosta de gelo alienígena",
    description: "A 5.2 UA do Sol, o fluxo solar é apenas 3.7% do terrestre. Painéis solares tornam-se quase inúteis, tornando geradores RTG indispensáveis. Forte campo de radiação.",
    atmosphere: "Ténue (Oxigénio residual)",
    sunDistanceAU: 5.2,
    earthDistanceAU: 4.2,
    budgetM: 1400,
    surfaceGravity: "0.134 g (1.31 m/s²)",
    color: "#38bdf8",
  },
  titan: {
    id: "titan",
    name: "Titã (Lua de Saturno)",
    tagline: "Mares de metano líquido e atmosfera mais densa que a da Terra",
    description: "Distância extrema (9.58 UA). A densa atmosfera de azoto permite aterrissagens com paraquedas sem escudo térmico pesado, mas a luz solar não penetra.",
    atmosphere: "Densa (98% Nitrogénio)",
    sunDistanceAU: 9.58,
    earthDistanceAU: 8.58,
    budgetM: 1600,
    surfaceGravity: "0.14 g (1.35 m/s²)",
    color: "#f59e0b",
  },
};
