// ============================================================================
// DADOS OFICIAIS DAS MISSÕES HISTÓRICAS E MODERNAS DA NASA
// Responsabilidade: Catálogo interativo de missões reais da NASA para o jogo 3D,
// com parâmetros de física, locais reais de pouso, robôs, ISS e conceitos científicos.
// Comentários: Todos em Português conforme solicitado pela equipa.
// ============================================================================

export const nasaGameMissions = [
  {
    id: 'apollo11',
    name: 'Apollo 11: Pouso Lunar do Módulo Eagle',
    shortName: 'Apollo 11 (Lua)',
    badge: 'NASA 1969 • Histórico',
    tagline: 'O primeiro pouso humano na Lua e os 60 segundos críticos de combustível',
    targetBody: 'moon',
    targetBodyName: 'Lua (Satélite Terrestre)',
    vehicleType: 'lander',
    vehicleName: 'Módulo Lunar (LM Eagle)',
    landingSites: [
      { id: 'tranquility', name: 'Mare Tranquillitatis (Base da Tranquilidade)', coord: '0.67° N, 23.47° E', difficulty: 'Normal', desc: 'Sítio original de pouso de Neil Armstrong e Buzz Aldrin.' },
      { id: 'shackleton', name: 'Cratera Shackleton (Polo Sul - Artemis)', coord: '89.9° S, 0.0° E', difficulty: 'Desafiante', desc: 'Crateras em sombra perpétua ricas em gelo de água para a base lunar.' },
      { id: 'tycho', name: 'Planalto da Cratera Tycho', coord: '43.3° S, 11.2° W', difficulty: 'Extremo', desc: 'Terreno escarpado com raios de ejecta brilhantes e rochas acidentadas.' },
    ],
    initialAltitudeKm: 15,
    initialFuel: 100,
    gravity: 1.62, // m/s²
    hasAtmosphere: false,
    atmosphereDensity: 0.0,
    scienceConceptTitle: 'Vácuo Total & Desaceleração por Impulso Retrógrado',
    scienceConceptText: 'Na Lua não há ar nem paraquedas. A descida depende 100% do motor de descida DPS a bipropelente. A gravidade é apenas 1/6 da Terra (0.166g), dando uma sensação de voo flutuante onde cada toque no retrofoguete tem impacto duradouro.',
    objectives: [
      { id: 'descent', text: 'Desacelerar a descida para velocidade vertical < 3.0 m/s', reward: 50 },
      { id: 'touchdown', text: 'Efetuar pouso suave na superfície lunar com trem de pouso aberto', reward: 100 },
      { id: 'flag', text: 'Descer na escotilha e cravar a bandeira da missão', reward: 75 },
      { id: 'regolith', text: 'Recolher amostras de regolito e basalto lunar antigo', reward: 80 },
    ],
    radioQuote: 'Houston, Tranquility Base here. The Eagle has landed!',
  },
  {
    id: 'iss_docking',
    name: 'ISS: Acoplagem na Estação Espacial Internacional',
    shortName: 'ISS Acoplagem (LEO)',
    badge: 'NASA / ESA / JAXA • Órbita Terrestre',
    tagline: 'Rendezvous orbital a 27.600 km/h com a maior estrutura espacial humana',
    targetBody: 'earth',
    targetBodyName: 'Órbita Baixa da Terra (400 km)',
    vehicleType: 'capsule',
    vehicleName: 'Cápsula Tripulada (Crew Dragon / Orion)',
    landingSites: [
      { id: 'harmony', name: 'Porta de Acoplagem Node 2 Harmony', coord: 'Órbita LEO 51.6°', difficulty: 'Precisão', desc: 'O principal porto internacional para naves tripuladas da NASA e parceiros.' },
      { id: 'zenith', name: 'Porta Zenith (Superior da Estação)', coord: 'Zénite Espacial', difficulty: 'Avançado', desc: 'Porto de acoplagem para cargueiros espaciais e observação do espaço profundo.' },
    ],
    initialAltitudeKm: 400,
    initialFuel: 85,
    gravity: 8.7, // m/s² em órbita (queda livre com força centrífuga anulada)
    hasAtmosphere: false,
    atmosphereDensity: 0.0,
    scienceConceptTitle: 'Mecânica Orbital & Rendezvous de Kepler',
    scienceConceptText: 'No espaço, para alcançar um objeto à tua frente, não podes apenas acelerar em linha reta! Acelerar eleva a tua órbita e faz-te ficar mais lento relativamente à estação. Tens de igualar a velocidade orbital exata e usar propulsores de gás frio RCS com velocidade relativa menor que 0.3 m/s.',
    objectives: [
      { id: 'rendezvous', text: 'Aproximar a menos de 50 metros da Estação Espacial Internacional', reward: 60 },
      { id: 'align', text: 'Alinhar o cone de acoplagem com o anel luminoso da porta Harmony', reward: 90 },
      { id: 'soft_dock', text: 'Acoplagem suave com velocidade relativa < 0.25 m/s', reward: 120 },
      { id: 'microgravity', text: 'Iniciar transferência de tripulação e ciência em microgravidade', reward: 80 },
    ],
    radioQuote: 'Capture confirmed! Ring alignment nominal. Welcome aboard the International Space Station!',
  },
  {
    id: 'mars2020',
    name: 'Mars 2020: Rover Perseverance & Helicóptero Ingenuity',
    shortName: 'Mars Perseverance (Marte)',
    badge: 'NASA JPL • Robótica Planetária',
    tagline: 'Pouso com Skycrane, condução do rover e o primeiro voo motorizado noutro mundo',
    targetBody: 'mars',
    targetBodyName: 'Marte (Planeta Vermelho)',
    vehicleType: 'rover',
    vehicleName: 'Rover Perseverance & Mini-Drone Ingenuity',
    landingSites: [
      { id: 'jezero', name: 'Cratera Jezero (Delta de Rio Antigo)', coord: '18.38° N, 77.58° E', difficulty: 'Normal', desc: 'Antigo lago marciano rico em argilas que podem preservar bio-assinaturas microbianas.' },
      { id: 'valles', name: 'Valles Marineris (O Grande Desfiladeiro)', coord: '14.0° S, 59.2° W', difficulty: 'Difícil', desc: 'Canyon com 4000 km de comprimento e paredes rochosas de 7 km de altura.' },
      { id: 'olympus', name: 'Monte Olimpo (Maior Vulcão do Sistema Solar)', coord: '18.65° N, 226.2° E', difficulty: 'Extremo', desc: 'Caldeira vulcânica gigante com altitude de 21 km acima da planície marciana.' },
    ],
    initialAltitudeKm: 25,
    initialFuel: 100,
    gravity: 3.72, // m/s² (0.38g)
    hasAtmosphere: true,
    atmosphereDensity: 0.015, // 1% da Terra (CO2)
    scienceConceptTitle: 'Atmosfera Rarefeita de CO2 & Sustentação do Rotor',
    scienceConceptText: 'A atmosfera de Marte tem menos de 1% da pressão da Terra. Para um helicóptero como o Ingenuity voar, as suas pás de fibra de carbono têm de girar a mais de 2.400 RPM (5x mais rápido que na Terra) para gerar sustentação aerodinâmica!',
    objectives: [
      { id: 'skycrane', text: 'Entrada atmosférica com escudo térmico e descida por cabos Skycrane', reward: 70 },
      { id: 'drive_rover', text: 'Conduzir o Rover Perseverance pelas dunas e afloramentos rochosos', reward: 60 },
      { id: 'drill_rock', text: 'Utilizar o braço robótico com broca para extrair um núcleo de rocha', reward: 90 },
      { id: 'fly_ingenuity', text: 'Descolar o mini-helicóptero Ingenuity para reconhecimento aéreo a 5m de altitude', reward: 120 },
    ],
    radioQuote: 'Touchdown confirmed! Perseverance is alive on the surface of Mars, ready to seek signs of ancient life!',
  },
  {
    id: 'europa_clipper',
    name: 'Europa Clipper: Oceano Alienígena & Assistência Gravitacional',
    shortName: 'Europa Clipper (Júpiter)',
    badge: 'NASA Flagship • Astrobiologia',
    tagline: 'Manobra estilingue gravitacional e radar de penetração no oceano sob o gelo',
    targetBody: 'europa',
    targetBodyName: 'Europa (Lua de Júpiter)',
    vehicleType: 'orbiter',
    vehicleName: 'Sonda Europa Clipper',
    landingSites: [
      { id: 'conamara', name: 'Conamara Chaos (Placas de Gelo Quebradas)', coord: '9.0° N, 274.0° W', difficulty: 'Avançado', desc: 'Balsas de gelo que se movem sobre bolsas de água salgada subterrânea aquecidas.' },
      { id: 'lineae', name: 'Fraturas Lineae Vermelhas (Sais Minerais)', coord: '15.0° S, 180.0° W', difficulty: 'Normal', desc: 'Fissuras onde a água do oceano interior jorra e se solidifica com sais de magnésio.' },
    ],
    initialAltitudeKm: 120,
    initialFuel: 95,
    gravity: 1.315, // m/s² (0.134g)
    hasAtmosphere: false,
    atmosphereDensity: 0.0,
    scienceConceptTitle: 'Efeito Estilingue Gravitacional (Slingshot) & Efeito Oberth',
    scienceConceptText: 'Para chegar ao sistema de Júpiter sem gastar toneladas de combustível proibitivas, a NASA usa o campo gravitacional dos planetas como uma fisga cósmica. A sonda rouba uma fração infinitesimal da energia orbital do planeta para acelerar a dezenas de milhares de km/h!',
    objectives: [
      { id: 'slingshot', text: 'Executar aproximação rasante para ganho de velocidade hiperbólica', reward: 80 },
      { id: 'radar_penetrate', text: 'Disparar radar de subsolo REASON para mapear a espessura da crosta de gelo', reward: 100 },
      { id: 'ocean_detect', text: 'Detectar plumes de vapor de água e calcular a profundidade do oceano', reward: 110 },
      { id: 'radiation_shield', text: 'Ativar escudo magnético contra o forte cinturão de radiação de Júpiter', reward: 70 },
    ],
    radioQuote: 'Subsurface liquid water ocean confirmed beneath the ice shell! Telemetry returning to Earth.',
  },
];
