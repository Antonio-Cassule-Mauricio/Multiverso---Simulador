// Constantes físicas e de engenharia (simplificadas, para o jogo)
export const G0 = 9.80665; // gravidade padrão (m/s²), usada na equação do foguetão
export const ISP = 320; // impulso específico do motor da sonda (s), bipropelente
export const PANEL = { kgPerM2: 6, costPerM2M: 0.5, efficiency: 0.28, derate: 0.8 };
export const BATTERY = { whPerKg: 150, usableFraction: 0.8, costPerKgM: 0.2 };
export const RTG = { massKg: 45, powerW: 110, costM: 120 };
export const COMMS = {
  k: 2500, // calibrado: 100 W + antena de 3 m a 1,5 UA dá ~1 Mbps
  amplifierEfficiency: 0.3,
  txDuty: 0.25, // fração do tempo em que o transmissor está ligado
  kgPerW: 0.05,
  costPerWM: 0.05,
};
export const INTEGRATION_COST_PER_KG_M = 0.03;

// Tipos de missão (costM = milhões de dólares)
export const missionTypes = {
  orbiter: {
    name: "Orbitador",
    description: "Sonda orbital para mapeamento global, altimetria e relay de telecomunicações.",
    busMassKg: 300,
    busPowerW: 150,
    busCostM: 150,
    icon: "Satellite",
  },
  lander: {
    name: "Aterrissador (Lander)",
    description: "Módulo fixo de pouso de alta precisão com escudo térmico e paraquedas.",
    busMassKg: 250,
    busPowerW: 100,
    busCostM: 200,
    icon: "ShieldAlert",
  },
  rover: {
    name: "Veículo Móvel (Rover)",
    description: "Laboratório robótico com rodas articuladas para exploração de múltiplos sítios geológicos.",
    busMassKg: 450,
    busPowerW: 120,
    busCostM: 350,
    icon: "Compass",
  },
};

// Instrumentos científicos
export const instruments = {
  camera: {
    name: "Câmara Óptica Multi-espectral",
    desc: "Mapeamento em cores de alta resolução da superfície e topografia.",
    massKg: 8, powerW: 15, costM: 12, dataMbitDay: 2000, science: 20,
    worksOn: ["orbiter", "lander", "rover"],
    icon: "Camera",
  },
  spectrometer: {
    name: "Espectrómetro Infravermelho",
    desc: "Identificação da composição química e mineralogia do solo ou atmosfera.",
    massKg: 12, powerW: 25, costM: 25, dataMbitDay: 500, science: 35,
    worksOn: ["orbiter", "lander", "rover"],
    icon: "Radio",
  },
  radar: {
    name: "Radar de Subsolo (GPR)",
    desc: "Ondas de penetração para detectar gelo, bolsas de água subterrâneas ou cavernas de lava.",
    massKg: 40, powerW: 60, costM: 60, dataMbitDay: 800, science: 40,
    worksOn: ["orbiter"],
    icon: "Waves",
  },
  drillLab: {
    name: "Broca Perfuradora & Laboratório Bioquímico",
    desc: "Extração de amostras a profundidade com análise de biomarcadores e espectrometria de massa.",
    massKg: 45, powerW: 80, costM: 110, dataMbitDay: 100, science: 60,
    worksOn: ["lander", "rover"],
    icon: "Activity",
  },
  weather: {
    name: "Estação Meteorológica e Atmosférica",
    desc: "Sensores de pressão barométrica, temperatura, vento e concentração de poeira.",
    massKg: 3, powerW: 5, costM: 6, dataMbitDay: 10, science: 10,
    worksOn: ["orbiter", "lander", "rover"],
    icon: "Wind",
  },
  seismometer: {
    name: "Sismómetro de Banda Larga",
    desc: "Monitoramento de tremores tectónicos, impactos de meteoritos e estrutura do núcleo.",
    massKg: 20, powerW: 10, costM: 40, dataMbitDay: 50, science: 30,
    worksOn: ["lander", "rover"],
    icon: "Zap",
  },
  magnetometer: {
    name: "Magnetómetro de Fluxo Atómico",
    desc: "Medição de campos magnéticos planetários e interacções com o vento solar.",
    massKg: 6, powerW: 8, costM: 14, dataMbitDay: 80, science: 25,
    worksOn: ["orbiter", "lander", "rover"],
    icon: "Compass",
  },
};

// Lançadores: capacidade (kg) enviada para cada universo
export const launchers = {
  small: {
    name: "Lançador Ligeiro (ex: Electron / Vega)",
    desc: "Custo reduzido e preparação rápida, ideal para cubesats e sondas ultra-leves.",
    costM: 25,
    reliability: 0.92,
    capacityKg: { mars: 400, moon: 750, europa: 140, titan: 95 },
  },
  medium: {
    name: "Lançador Médio (ex: Falcon 9 / Ariane 62)",
    desc: "O cavalo de batalha comercial da exploração espacial, excelente custo-benefício.",
    costM: 90,
    reliability: 0.96,
    capacityKg: { mars: 1500, moon: 3200, europa: 750, titan: 520 },
  },
  heavy: {
    name: "Super-Lançador Pesado (ex: SLS / Falcon Heavy)",
    desc: "Capacidade máxima de injeção translunar e interplanetária para missões flagship com grande margem de carga.",
    costM: 150,
    reliability: 0.98,
    capacityKg: { mars: 4000, moon: 8500, europa: 2200, titan: 1500 },
  },
};

// Antenas
export const antennas = {
  low: {
    name: "Baixo Ganho (Omnidirecional)",
    desc: "Leve e compacta, mas com taxa de transmissão de dados muito limitada a longas distâncias.",
    diameterM: 0.3,
    massKg: 3,
    costM: 2,
  },
  medium: {
    name: "Médio Ganho (Refletor 1.0 m)",
    desc: "Equilíbrio padrão para orbitadores e rovers em Marte ou na Lua.",
    diameterM: 1.0,
    massKg: 10,
    costM: 8,
  },
  high: {
    name: "Alto Ganho Parabólica (Prato 2.5 m)",
    desc: "Prato parabólico com mecanismo de apontamento fino. Essencial para streaming científico veloz.",
    diameterM: 2.5,
    massKg: 35,
    costM: 25,
  },
};