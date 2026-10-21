// ============================================================================
// PRESETS DE MISSÕES HISTÓRICAS REAIS
// ============================================================================

export const presetMissions = [
  {
    id: "mro",
    name: "Mars Reconnaissance Orbiter (MRO)",
    tag: "Clássico da NASA",
    desc: "Sonda orbital de alto volume científico em Marte com antena de 3m e radar de penetração de gelo.",
    universe: "mars",
    type: "orbiter",
    instruments: ["camera", "spectrometer", "radar"],
    power: { source: "solar", panelArea: 9.5, batteryKg: 10 },
    comms: { antenna: "high", txPower: 100 },
    launcher: "medium",
  },
  {
    id: "clipper",
    name: "Europa Clipper Explorer",
    tag: "Flagship em Júpiter",
    desc: "Explorador da lua gelada Europa com gerador RTG e suíte completa para procura de oceanos subterrâneos.",
    universe: "europa",
    type: "orbiter",
    instruments: ["camera", "spectrometer", "radar", "magnetometer"],
    power: { source: "rtg", panelArea: 1, batteryKg: 12 },
    comms: { antenna: "high", txPower: 110 },
    launcher: "heavy",
  },
  {
    id: "dragonfly",
    name: "Titan Dragonfly Probe",
    tag: "Desafio Extremo em Titã",
    desc: "Aterrissador com broca na densa atmosfera de Titã para investigar química pré-biótica em lagos de metano.",
    universe: "titan",
    type: "lander",
    instruments: ["drillLab", "spectrometer", "seismometer"],
    power: { source: "rtg", panelArea: 1, batteryKg: 8 },
    comms: { antenna: "high", txPower: 40 },
    launcher: "heavy",
  },
];
