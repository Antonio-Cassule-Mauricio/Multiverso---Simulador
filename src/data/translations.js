// ============================================================================
// DICIONÁRIO MULTILÍNGUE (i18n): Português (PT), Inglês (EN), Francês (FR)
// Responsabilidade: Fornecer traduções 100% completas para todos os cards do site,
// do construtor de missões e do simulador de voo espacial 3D
// ============================================================================

export const translations = {
  pt: {
    // ------------------------------------------------------------------------
    // BARRA DE NAVEGAÇÃO (NAVBAR)
    // ------------------------------------------------------------------------
    nav_title: "MULTIVERSO",
    nav_subtitle: "Simulador de Missões Espaciais • Estudantes de Engenharia de Software",
    nav_challenge: "O Desafio",
    nav_destinations: "Destinos",
    nav_physics: "Engenharia & Física",
    nav_team: "Nossa Equipa",
    nav_play: "Jogar Agora",
    nav_active_game: "Jogo 3D Ativo",
    nav_return_portal: "Voltar ao Portal",
    sound_enable: "Ativar efeitos sonoros",
    sound_disable: "Desativar efeitos sonoros",

    // ------------------------------------------------------------------------
    // SECÇÃO HERO (PORTAL PRINCIPAL)
    // ------------------------------------------------------------------------
    hero_badge: "NASA Space Apps Challenge 2026",
    hero_team_badge: "🇦🇴 Estudantes de Engenharia de Software • Angola",
    hero_title_1: "Projeta a tua missão espacial.",
    hero_title_2: "Domina o Multiverso.",
    hero_desc: "Projetar uma missão interplanetária exige equilibrar demandas concorrentes: massa de combustível, captação solar em órbitas distantes, enlaces de telecomunicação com a Terra e orçamentos rigorosos. Um simulador e jogo interativo 3D completo com pilotagem em tempo real, lançamento, cruzeiro com outras sondas e pouso tático.",
    hero_cta_play: "Jogar Agora (Jogo 3D)",
    hero_cta_explore: "Explorar Desafio NASA",
    hero_probe_status: "Sonda Orbital • Multiverso I",
    hero_probe_sub: "Telemetria DSN ativa • 1.52 UA de distância solar",
    hero_probe_nominal: "SISTEMAS NOMINAIS",
    hero_isp: "ISP 320s • Bipropelente",
    hero_comms_badge: "35 W • Antena 2.5m",
    hero_banner_ready: "Jogo 3D & Simulador Pronto para Voo",
    hero_banner_sub: "Pilota desde a Terra até ao pouso no planeta destino, encontra outras naves e cumpre os objetivos científicos.",
    hero_badge_tsiolkovsky: "Equação de Tsiolkovsky",
    hero_badge_solar: "Radiação Solar",
    hero_badge_telemetry: "Link de Telemetria",
    hero_badge_systems: "Engenharia de Sistemas",
    hero_propulsion_eff: "Eficiência de Propulsão",
    hero_dsn_link: "Enlace de Rádio DSN",

    // ------------------------------------------------------------------------
    // DESAFIO OFICIAL NASA & PILARES DE ENGENHARIA
    // ------------------------------------------------------------------------
    challenge_badge: "O Desafio Oficial NASA Space Apps 2026",
    challenge_title: "A Arte da Engenharia Espacial: Demandas Concorrentes",
    challenge_desc: "Para a maioria dos estudantes, projetar uma sonda espacial parece apenas escolher peças bonitas. Na realidade, cada decisão de engenharia afeta diretamente a física, a sobrevivência e a viabilidade financeira da missão.",
    challenge_tested_in_game: "Pronto para testar na prática?",
    challenge_test_btn: "Abrir Jogo 3D Interativo",
    impact_critical: "Impacto Crítico no Jogo:",

    pillar_mass_title: "Massa & Propulsão (Tsiolkovsky)",
    pillar_mass_badge: "Δv e Capacidade",
    pillar_mass_summary: "Cada quilograma adicional de instrumento científico exige massa exponencial de combustível e escudo térmico.",
    pillar_mass_details: "A equação de Tsiolkovsky rege que o propelente necessário cresce exponencialmente com a velocidade necessária (Δv). Se a massa da sonda exceder a capacidade do lançador selecionado, o foguete simplesmente não consegue escapar da gravidade terrestre ou falhará na injeção translunar.",
    pillar_mass_warning: "Adicionar muitos instrumentos pesados pode exceder o limite do lançador, exigindo um foguete mais potente e exponencialmente mais caro.",

    pillar_power_title: "Potência & Noites de Eclipse",
    pillar_power_badge: "Sol vs RTG Nuclear",
    pillar_power_summary: "A luz solar diminui com o quadrado da distância. Na órbita de Júpiter, a energia solar cai mais de 96%.",
    pillar_power_details: "Sondas próximas do Sol podem usar painéis solares compactos, mas precisam de baterias dimensionadas para sobreviver às noites ou eclipses orbitais quando o sol é bloqueado pelo planeta. Em destinos distantes como Europa ou Titã, painéis solares tornam-se impraticáveis e geradores nucleares RTG tornam-se obrigatórios.",
    pillar_power_warning: "Se a geração de energia for menor que o consumo elétrico dos computadores de bordo e sensores, a sonda sofrerá um blackout irreversível.",

    pillar_comms_title: "Telecomunicações & Enlace DSN",
    pillar_comms_badge: "Antenas & Downlink",
    pillar_comms_summary: "Não adianta recolher gigabytes de ciência se o transmissor de rádio não conseguir enviá-los à Terra.",
    pillar_comms_details: "A intensidade das ondas de rádio decai com o quadrado da distância interplanetária. Para transmitir imagens de alta resolução de Marte (a 1.5 UA) ou Júpiter (a 5.2 UA), é necessária uma antena de alto ganho com refletor parabólico e dezenas de watts de potência de rádio.",
    pillar_comms_warning: "Antenas fracas limitam a ciência devolvida a uma pequena fração dos dados coletados, desperdiçando o potencial da missão.",

    pillar_budget_title: "Orçamento & Margem de Custo",
    pillar_budget_badge: "Cap Financiamento",
    pillar_budget_summary: "O dinheiro é finito. Todo componente tem um custo de fabricação, teste e integração aeroespacial.",
    pillar_budget_details: "Desde os milhões investidos no lançador até aos instrumentos científicos e geradores de radioisótopos, a missão precisa respeitar rigorosamente o teto orçamental definido pela agência espacial (NASA/ESA).",
    pillar_budget_warning: "Projetos que ultrapassam o orçamento não são aprovados para voo no comitê de avaliação espacial.",

    // ------------------------------------------------------------------------
    // DESTINOS CÓSMICOS (CARDS DO SITE E SELETOR DO JOGO)
    // ------------------------------------------------------------------------
    dest_badge: "Destinos no Sistema Solar",
    dest_title: "Cada Mundo, Uma Nova Realidade Física",
    dest_desc: "A física orbital e os desafios ambientais mudam drasticamente de um corpo celeste para outro. Da poeira fina e sol fraco de Marte até aos oceanos gelados de Europa.",
    dest_mapping_tag: "Mapeamento do Multiverso",
    dest_banner_title: "4 Destinos Planetários Prontos para Exploração 3D",
    dest_launch_btn: "Voar Para Este Destino em 3D",
    dest_budget: "Orçamento",
    dest_sun_dist: "Distância Solar:",
    dest_earth_dist: "Distância à Terra:",
    dest_gravity: "Gravidade:",
    dest_atmosphere: "Atmosfera:",

    dest_mars_name: "Marte (Planeta Vermelho)",
    dest_mars_tagline: "O grande objetivo da exploração planetária robótica e humana",
    dest_mars_desc: "Atmosfera ténue de CO2, tempestades de poeira globais e terreno escarpado. Excelente para orbitadores de observação e rovers de exploração geológica.",
    dest_mars_atmo: "Ténue (95% CO2)",

    dest_moon_name: "Lua (Satélite Terrestre)",
    dest_moon_tagline: "O campo de testes para a expansão interplanetária humana",
    dest_moon_desc: "Sem atmosfera, vácuo total e noites frias de 14 dias terrestres. Comunicações quase instantâneas com a Terra, mas exige armazenamento massivo de bateria.",
    dest_moon_atmo: "Vácuo total",

    dest_europa_name: "Europa (Lua de Júpiter)",
    dest_europa_tagline: "Oceano subterrâneo líquido sob uma crosta de gelo alienígena",
    dest_europa_desc: "A 5.2 UA do Sol, o fluxo solar é apenas 3.7% do terrestre. Painéis solares tornam-se quase inúteis, tornando geradores RTG indispensáveis. Forte campo de radiação.",
    dest_europa_atmo: "Ténue (Oxigénio residual)",

    dest_titan_name: "Titã (Lua de Saturno)",
    dest_titan_tagline: "Mares de metano líquido e atmosfera mais densa que a da Terra",
    dest_titan_desc: "Distância extrema (9.58 UA). A densa atmosfera de azoto permite aterrissagens com paraquedas sem escudo térmico pesado, mas a luz solar não penetra.",
    dest_titan_atmo: "Densa (98% Nitrogénio)",

    // ------------------------------------------------------------------------
    // FÓRMULAS FÍSICAS (CARDS DO SITE)
    // ------------------------------------------------------------------------
    physics_badge: "Física Real Implementada",
    physics_title: "Fórmulas Científicas por Trás do Jogo",
    physics_desc: "O Multiverso é baseado nas leis da física orbital, eletrodinâmica solar e telecomunicações planetárias utilizadas por engenheiros da NASA e da ESA.",
    formula_rocket_title: "Equação de Tsiolkovsky",
    formula_rocket_sub: "Propulsão de Foguetão & Delta-V",
    formula_rocket_exp: "Calcula a quantidade de propelente necessária para alterar a velocidade orbital da sonda. O gasto de combustível cresce exponencialmente com a velocidade necessária (Δv).",
    formula_solar_title: "Lei do Inverso do Quadrado",
    formula_solar_sub: "Irradiância & Captação Solar",
    formula_solar_exp: "A energia da luz solar dissipa-se proporcionalmente ao quadrado da distância da estrela. Em Marte (1.52 UA), o fluxo cai para 43% da Terra; em Europa (5.2 UA), para menos de 4%.",
    formula_comms_title: "Equação de Enlace de RF",
    formula_comms_sub: "Downlink de Dados Deep Space Network (DSN)",
    formula_comms_exp: "O ganho da antena parabólica escala com o quadrado do seu diâmetro físico, enquanto a atenuação cresce com o quadrado da distância cósmica até às antenas na Terra.",
    formula_batt_title: "Capacidade de Baterias em Eclipse",
    formula_batt_sub: "Armazenamento Eletroquímico de Bordo",
    formula_batt_exp: "Durante as noites na superfície ou eclipses na sombra do planeta, os painéis solares produzem 0W. A sonda depende 100% da sua reserva de bateria de iões de lítio.",

    // ------------------------------------------------------------------------
    // EQUIPA DE ESTUDANTES (CARDS DO SITE)
    // ------------------------------------------------------------------------
    team_badge: "🇦🇴 Representação Nacional • Luanda, Angola",
    team_title: "Equipa Multiverso • Colegas de Engenharia de Software",
    team_desc: "Somos um grupo de 5 colegas e estudantes angolanos de Engenharia de Software, unidos pela paixão pela exploração espacial, ciência computacional e foco para alcançar a vitória no NASA Space Apps Challenge 2026.",
    team_banner_badge: "ESTUDANTES DE ENGENHARIA DE SOFTWARE",
    team_banner_title: "Centro de Operações & Inovação Aeroespacial",
    team_banner_sub: "Combinando rigor algorítmico, física espacial precisa e gráficos 3D interativos para democratizar o ensino aeroespacial.",
    team_commitment_title: "Foco na Vitória",
    team_commitment_heading: "Rumo ao Prémio Global NASA",
    team_commitment_desc: "Este projeto é o resultado de trabalho em equipa contínuo, estudo profundo das publicações do JPL/NASA e dedicação dos 5 colegas para demonstrar o elevado nível da engenharia de software em Angola.",
    team_software_eng: "Engenharia de Software",
    team_open_source: "Código Aberto & Simulação 3D",
    member_1_role: "Líder da Equipa & Arquitetura de Sistemas",
    member_1_focus: "Engenharia de Software • Coordenação Técnica • Simulação Multivariável",
    member_2_role: "Dinâmica Orbital & Lógica Numérica",
    member_2_focus: "Equação de Tsiolkovsky • Modelagem de Δv • Capacidade de Lançadores",
    member_3_role: "Instrumentação & Carga Científica",
    member_3_focus: "Espectrometria • Radares de Subsolo • Taxonomia de Missões Planetárias",
    member_4_role: "Sistemas de Potência & Telecomunicações",
    member_4_focus: "Equação de Enlace DSN • Fluxo Solar 1/r² • Balanço Térmico e Baterias",
    member_5_role: "Engenharia Frontend & Interface Gráfica 3D",
    member_5_focus: "Experiência de Utilizador • Telemetria em Tempo Real • Design Aeroespacial 3D",

    // ------------------------------------------------------------------------
    // CONSTRUTOR DE MISSÕES (CARDS DE ETAPAS E COMPONENTES)
    // ------------------------------------------------------------------------
    builder_step_1: "DESTINO CELESTE (UNIVERSO)",
    builder_step_1_sub: "Orçamento da Agência:",
    builder_step_2: "ARQUITETURA DA SONDA",
    builder_step_2_mass: "Massa Base",
    builder_step_3: "CARGA CIENTÍFICA & SENSORES",
    builder_step_3_selected: "selecionados",
    builder_step_4: "FONTE DE POTÊNCIA & BATERIAS",
    builder_step_4_active_solar: "Painéis Solares",
    builder_step_4_active_rtg: "RTG Nuclear (110W contínuos)",
    builder_solar_title: "☀️ Painéis Solares",
    builder_solar_desc: "Leve e económico, mas a potência decai com o quadrado da distância solar.",
    builder_rtg_title: "☢️ Gerador RTG Nuclear",
    builder_rtg_desc: "110W constantes no escuro • Operação perpétua • $120M",
    builder_panel_area: "Área dos Painéis Solares:",
    builder_battery_mass: "Massa de Bateria de Iões de Lítio:",
    builder_wh_useful: "Wh úteis",
    builder_emergency: "emergência",
    builder_long_eclipse: "longo eclipse",
    builder_step_5: "TELECOMUNICAÇÕES & ENLACE TERRA",
    builder_tx_power: "Potência de Transmissão RF:",
    builder_step_6: "FOGUETÃO LANÇADOR",
    builder_launcher_cap: "Capacidade:",
    builder_launcher_reliability: "Confiabilidade:",

    // Tipos de Veículos
    type_orbiter_name: "Orbitador",
    type_orbiter_desc: "Sonda orbital para mapeamento global, altimetria e relay de telecomunicações.",
    type_lander_name: "Aterrissador (Lander)",
    type_lander_desc: "Módulo fixo de pouso de alta precisão com escudo térmico e paraquedas.",
    type_rover_name: "Veículo Móvel (Rover)",
    type_rover_desc: "Laboratório robótico com rodas articuladas para exploração de múltiplos sítios geológicos.",

    // Instrumentos Científicos
    inst_camera_name: "Câmara Óptica Multi-espectral",
    inst_camera_desc: "Mapeamento em cores de alta resolução da superfície e topografia.",
    inst_spectrometer_name: "Espectrómetro Infravermelho",
    inst_spectrometer_desc: "Identificação da composição química e mineralogia do solo ou atmosfera.",
    inst_radar_name: "Radar de Subsolo (GPR)",
    inst_radar_desc: "Ondas de penetração para detectar gelo, bolsas de água subterrâneas ou cavernas de lava.",
    inst_drillLab_name: "Broca Perfuradora & Laboratório Bioquímico",
    inst_drillLab_desc: "Extração de amostras a profundidade com análise de biomarcadores e espectrometria de massa.",
    inst_weather_name: "Estação Meteorológica e Atmosférica",
    inst_weather_desc: "Sensores de pressão barométrica, temperatura, vento e concentração de poeira.",
    inst_seismometer_name: "Sismómetro de Banda Larga",
    inst_seismometer_desc: "Monitoramento de tremores tectónicos, impactos de meteoritos e estrutura do núcleo.",
    inst_magnetometer_name: "Magnetómetro de Fluxo Atómico",
    inst_magnetometer_desc: "Medição de campos magnéticos planetários e interacções com o vento solar.",

    // Antenas
    antenna_low_name: "Antena Omnidirecional (Baixo Ganho)",
    antenna_medium_name: "Antena Parabólica Média (1.4m)",
    antenna_high_name: "Antena Parabólica de Alto Ganho (2.4m)",

    // Lançadores
    launcher_small_name: "Lançador Ligeiro (Electron / Vega)",
    launcher_small_desc: "Custo reduzido e preparação rápida, ideal para cubesats e sondas leves.",
    launcher_medium_name: "Lançador Médio (Falcon 9 / Ariane 62)",
    launcher_medium_desc: "O cavalo de batalha comercial da exploração espacial, excelente custo-benefício.",
    launcher_heavy_name: "Super-Lançador Pesado (SLS / Falcon Heavy)",
    launcher_heavy_desc: "Capacidade máxima de injeção translunar e interplanetária para grandes missões.",

    // Presets Históricos
    preset_title: "Missões Históricas de Referência:",
    preset_mro_tag: "Clássico da NASA",
    preset_mro_desc: "Sonda orbital de alto volume científico em Marte com antena de 3m e radar de penetração de gelo.",
    preset_clipper_tag: "Flagship em Júpiter",
    preset_clipper_desc: "Explorador da lua gelada Europa com gerador RTG e suíte completa para procura de oceanos subterrâneos.",
    preset_dragonfly_tag: "Desafio Extremo em Titã",
    preset_dragonfly_desc: "Aterrissador com broca na densa atmosfera de Titã para investigar química pré-biótica em lagos de metano.",

    // ------------------------------------------------------------------------
    // TELEMETRIA E DIAGNÓSTICO EM TEMPO REAL (HUD)
    // ------------------------------------------------------------------------
    hud_title: "Telemetria de Voo (Tempo Real)",
    hud_flight_approved: "APROVADO P/ VOO",
    hud_flight_anomaly: "ANOMALIAS DETETADAS",
    hud_launch_mass: "Massa de Lançamento:",
    hud_dry_mass: "Seca:",
    hud_edl_mass: "EDL:",
    hud_propellant_mass: "Propelente:",
    hud_power_balance: "Balanço de Potência:",
    hud_power_generated: "gerados",
    hud_power_consumed: "consumo",
    hud_battery_reserve: "Reserva de Bateria (Eclipse):",
    hud_dsn_downlink: "Downlink Científico DSN:",
    hud_data_reaches_earth: "dos dados chegam à Terra",
    hud_budget_consumed: "Orçamento Consumido:",
    hud_success_prob: "Probabilidade de Sucesso",
    hud_science_score: "Pontuação de Ciência",
    hud_engineer_report: "Relatório dos Engenheiros:",
    hud_launch_btn: "🚀 Iniciar Voo no Jogo 3D",
    hud_certificate_btn: "Emitir Certificado Oficial",

    // ------------------------------------------------------------------------
    // SIMULADOR DE VOO 3D & JOGO ESTILO ROCKSTAR
    // ------------------------------------------------------------------------
    game_mode_earth: "Nível 1: Lançamento da Terra",
    game_mode_cruise: "Nível 2: Espaço Profundo & Frota",
    game_mode_orbit: "Nível 3: Órbita do Destino",
    game_mode_land: "Nível 4: Pouso Real na Superfície",
    game_camera_chase: "Câmara 3ª Pessoa (Chase)",
    game_camera_cockpit: "Cockpit HUD (1ª Pessoa)",
    game_camera_orbit: "Inspeção Livre",
    game_controls_thrust: "W / ↑: Acelerar | S / ↓: Retro-travar | A / D: Guinada | Q / E: Arfagem | ESPAÇO: Queima Máxima | R: Scanner | F: Pousar",
    game_touchdown_ready: "POUSO REAL CONFIRMADO NA SUPERFÍCIE!",
    game_touchdown_crash: "IMPACTO CRÍTICO! Velocidade excessiva no toque (> 4.5 m/s).",
    game_touchdown_speed: "Velocidade Vertical:",
    game_ship_hull: "Vida do Casco:",
    game_propellant: "Propelente Δv:",
    game_battery_level: "Bateria:",
    game_radar_vessels: "RADAR DA FROTA ESPACIAL (PROXIMIDADE)",
    game_hail_probe: "Iniciar Transmissão de Rádio",
    game_altitude: "Altitude:",
    game_speed: "Velocidade:",
    game_scan_target: "Anomalia Detectada! Pressiona [SCAN] (R)",
    game_science_collected: "Ciência Coletada:",
    game_flight_ready: "SISTEMAS PRONTOS",
    game_thrust_btn: "IMPULSO (W / ↑)",
    game_retro_btn: "RETRO-FRENAGEM (S / ↓)",
    game_scan_btn: "SCANNER CIENTÍFICO (R)",
    game_landing_gear: "Trem de Pouso Desdobrado",
    game_sample_collected: "Amostra de Solo Coletada! (+50 pts)",
    game_flag_planted: "Bandeira de Angola e NASA Cravada com Sucesso!",
    game_take_sample_btn: "🧪 Coletar Amostra de Solo",
    game_plant_flag_btn: "🇦🇴 Cravar Bandeira da Missão",
    game_dock_expand: "Mostrar Painel de Pilotagem 3D",
    game_dock_collapse: "Modo Cockpit Imersivo",
    game_level_objectives_title: "Objetivos da Missão em Curso:",
    obj_earth_orbit: "Atingir órbita terrestre estável (7.8 km/s)",
    obj_deep_space_contact: "Contactar outra sonda da frota no espaço profundo",
    obj_planetary_insertion: "Realizar queima retrógrada para entrar em órbita de mapeamento",
    obj_surface_landing: "Efetuar descida e pouso suave com velocidade < 4.0 m/s",

    // ------------------------------------------------------------------------
    // JANELAS MODAIS E CERTIFICADOS
    // ------------------------------------------------------------------------
    modal_launch_title: "CENTRO DE OPERAÇÕES • SEQUÊNCIA DE VOO",
    modal_target: "Alvo:",
    modal_vehicle: "Veículo:",
    modal_step_1: "1. T-0 Lançamento",
    modal_step_2: "2. Injeção & Cruzeiro",
    modal_step_3: "3. Inserção / EDL",
    modal_step_4: "4. Downlink Científico",
    modal_return_btn: "Retornar aos Comandos",
    cert_title: "CERTIFICADO DE QUALIFICAÇÃO DE VOO ESPACIAL",
    cert_sub: "NASA Space Apps Challenge 2026 • Simulador Multiverso",
    cert_status_approved: "MISSÃO QUALIFICADA COM SUCESSO",
    cert_status_failed: "MISSÃO COM RESTRIÇÕES DE ENGENHARIA",

    // ------------------------------------------------------------------------
    // RODAPÉ (FOOTER)
    // ------------------------------------------------------------------------
    footer_desc: "Simulador Interativo e Jogo 3D de Engenharia Espacial concebido para o NASA Space Apps Challenge 2026 por estudantes angolanos de Engenharia de Software.",
    footer_team_title: "Equipa de Engenharia",
    footer_physics_title: "Física & Equações",
    footer_open_game: "→ Abrir Jogo 3D",
    footer_copy: "© 2026 Multiverso • Desenvolvido para o NASA Space Apps Challenge por António Maurício, Adilson Francisco, Agostinho Mariti, Edmilson Segredo e Hilton Diamantino.",
  },

  en: {
    // ------------------------------------------------------------------------
    // NAVBAR
    // ------------------------------------------------------------------------
    nav_title: "MULTIVERSO",
    nav_subtitle: "Space Mission Simulator • Software Engineering Students",
    nav_challenge: "The Challenge",
    nav_destinations: "Destinations",
    nav_physics: "Engineering & Physics",
    nav_team: "Our Team",
    nav_play: "Play Game",
    nav_active_game: "3D Game Active",
    nav_return_portal: "Back to Portal",
    sound_enable: "Enable Sound Effects",
    sound_disable: "Disable Sound Effects",

    // ------------------------------------------------------------------------
    // HERO SECTION
    // ------------------------------------------------------------------------
    hero_badge: "NASA Space Apps Challenge 2026",
    hero_team_badge: "🇦🇴 Software Engineering Students • Angola",
    hero_title_1: "Design your space mission.",
    hero_title_2: "Master the Multiverse.",
    hero_desc: "Designing an interplanetary mission requires balancing competing demands: propellant mass, solar power at distant orbits, radio communication links with Earth, and strict budgets. A complete interactive 3D flight game with real-time controls, launch, deep space fleet encounters, and planetary surface landing.",
    hero_cta_play: "Play Now (3D Game)",
    hero_cta_explore: "Explore NASA Challenge",
    hero_probe_status: "Orbital Probe • Multiverso I",
    hero_probe_sub: "Active DSN Telemetry • 1.52 AU solar distance",
    hero_probe_nominal: "SYSTEMS NOMINAL",
    hero_isp: "ISP 320s • Bipropellant",
    hero_comms_badge: "35 W • 2.5m Dish",
    hero_banner_ready: "3D Flight Game & Simulator Ready",
    hero_banner_sub: "Fly from Earth into deep space, meet other spacecraft, land on target planetary terrain, and achieve scientific goals.",
    hero_badge_tsiolkovsky: "Tsiolkovsky Rocket Equation",
    hero_badge_solar: "Solar Irradiance",
    hero_badge_telemetry: "Telemetry Downlink",
    hero_badge_systems: "Systems Engineering",
    hero_propulsion_eff: "Propulsion Efficiency",
    hero_dsn_link: "Deep Space Network (DSN)",

    // ------------------------------------------------------------------------
    // NASA CHALLENGE & PILLARS
    // ------------------------------------------------------------------------
    challenge_badge: "Official NASA Space Apps Challenge 2026",
    challenge_title: "The Art of Space Engineering: Competing Demands",
    challenge_desc: "For most students, designing a space mission seems like picking cool parts. In reality, every engineering decision directly dictates orbital mechanics, survival during eclipses, and financial viability.",
    challenge_tested_in_game: "Ready to test in practice?",
    challenge_test_btn: "Open Interactive 3D Game",
    impact_critical: "Critical Impact in Game:",

    pillar_mass_title: "Mass & Propulsion (Tsiolkovsky)",
    pillar_mass_badge: "Δv & Capacity",
    pillar_mass_summary: "Each additional kilogram of science instrument demands exponential propellant mass and heat shielding.",
    pillar_mass_details: "Tsiolkovsky's rocket equation dictates that needed propellant grows exponentially with required delta-V. If the probe's mass exceeds launcher capacity, the rocket cannot escape Earth's gravity or will fail translunar injection.",
    pillar_mass_warning: "Adding too many heavy instruments can exceed the rocket payload limit, demanding a heavier and much more expensive launcher.",

    pillar_power_title: "Power & Eclipse Nights",
    pillar_power_badge: "Solar vs Nuclear RTG",
    pillar_power_summary: "Sunlight diminishes with the square of distance. In Jupiter orbit, solar irradiance drops by more than 96%.",
    pillar_power_details: "Probes close to the Sun can use compact solar arrays, but need batteries sized to survive orbital eclipses. At distant targets like Europa or Titan, solar arrays become impractical and RTGs are mandatory.",
    pillar_power_warning: "If power generation falls below onboard computer and sensor draw, the probe will suffer an irreversible blackout.",

    pillar_comms_title: "Telecommunications & DSN Link",
    pillar_comms_badge: "Antennas & Downlink",
    pillar_comms_summary: "Gathering gigabytes of science is worthless if the radio transmitter cannot beam it back to Earth.",
    pillar_comms_details: "Radio signal strength decays with the square of interplanetary distance. High-resolution imagery from Mars (1.5 AU) or Jupiter (5.2 AU) requires high-gain parabolic reflectors and dozens of RF watts.",
    pillar_comms_warning: "Weak antennas limit returned science to a tiny fraction of generated data, squandering the mission's potential.",

    pillar_budget_title: "Budget & Cost Margins",
    pillar_budget_badge: "Funding Cap",
    pillar_budget_summary: "Money is finite. Every aerospace component has manufacturing, testing, and integration costs.",
    pillar_budget_details: "From launch vehicle millions to science spectrometers and radioisotope generators, missions must stay under NASA/ESA caps.",
    pillar_budget_warning: "Projects exceeding their cost ceiling are rejected by agency flight review committees.",

    // ------------------------------------------------------------------------
    // DESTINATIONS CARDS
    // ------------------------------------------------------------------------
    dest_badge: "Solar System Targets",
    dest_title: "Each World, A New Physical Reality",
    dest_desc: "Orbital physics and environmental challenges change drastically between celestial bodies. From the fine dust and faint sun of Mars to the ocean beneath Europa's ice.",
    dest_mapping_tag: "Multiverse Mapping",
    dest_banner_title: "4 Planetary Destinations Ready for 3D Exploration",
    dest_launch_btn: "Fly to this World in 3D",
    dest_budget: "Budget",
    dest_sun_dist: "Solar Distance:",
    dest_earth_dist: "Distance to Earth:",
    dest_gravity: "Surface Gravity:",
    dest_atmosphere: "Atmosphere:",

    dest_mars_name: "Mars (The Red Planet)",
    dest_mars_tagline: "The prime destination for robotic and human exploration",
    dest_mars_desc: "Thin CO2 atmosphere, global dust storms, and rugged terrain. Ideal for orbital reconnaissance and geological exploration rovers.",
    dest_mars_atmo: "Thin (95% CO2)",

    dest_moon_name: "Moon (Earth's Natural Satellite)",
    dest_moon_tagline: "The proving ground for human deep space expansion",
    dest_moon_desc: "Zero atmosphere, total vacuum, and 14-day freezing lunar nights. Near-instant comms with Earth, but requires massive battery reserves.",
    dest_moon_atmo: "Total vacuum",

    dest_europa_name: "Europa (Jovian Ocean Moon)",
    dest_europa_tagline: "Global liquid ocean sheltered beneath an alien ice crust",
    dest_europa_desc: "At 5.2 AU from the Sun, solar flux is only 3.7% of Earth's. Solar panels become useless, making RTG nuclear generators essential. Severe Jovian radiation.",
    dest_europa_atmo: "Trace (Residual Oxygen)",

    dest_titan_name: "Titan (Saturn's Moon)",
    dest_titan_tagline: "Liquid methane lakes and an atmosphere denser than Earth's",
    dest_titan_desc: "Extreme distance (9.58 AU). Dense nitrogen atmosphere enables parachute landing without heavy thermal shield, but sunlight cannot penetrate.",
    dest_titan_atmo: "Dense (98% Nitrogen)",

    // ------------------------------------------------------------------------
    // PHYSICS FORMULAS
    // ------------------------------------------------------------------------
    physics_badge: "Real Physics Implemented",
    physics_title: "Scientific Formulas Behind the Game",
    physics_desc: "Multiverso is grounded in the laws of orbital mechanics, solar electrodynamics, and deep space RF links used by NASA and ESA engineers.",
    formula_rocket_title: "Tsiolkovsky Rocket Equation",
    formula_rocket_sub: "Rocket Propulsion & Delta-V",
    formula_rocket_exp: "Calculates the propellant mass required to change probe orbital velocity. Propellant burns scale exponentially with needed velocity change (Δv).",
    formula_solar_title: "Inverse Square Law",
    formula_solar_sub: "Solar Irradiance & Harvesting",
    formula_solar_exp: "Solar light energy dissipates with the square of distance from the star. At Mars (1.52 AU), flux drops to 43% of Earth; at Europa (5.2 AU), under 4%.",
    formula_comms_title: "RF Link Budget Equation",
    formula_comms_sub: "Deep Space Network (DSN) Data Downlink",
    formula_comms_exp: "Parabolic dish antenna gain scales with the square of its physical diameter, while attenuation grows with the square of interplanetary distance to Earth.",
    formula_batt_title: "Eclipse Battery Capacity",
    formula_batt_sub: "Onboard Electrochemical Storage",
    formula_batt_exp: "During surface nights or orbital eclipses behind the planet, solar arrays generate 0W. The probe relies entirely on its lithium-ion battery reserves.",

    // ------------------------------------------------------------------------
    // TEAM CARDS
    // ------------------------------------------------------------------------
    team_badge: "🇦🇴 National Representation • Luanda, Angola",
    team_title: "Multiverso Team • Software Engineering Colleagues",
    team_desc: "We are a team of 5 Angolan software engineering colleagues and students, united by our passion for space exploration, computational science, and drive to win the NASA Space Apps Challenge 2026.",
    team_banner_badge: "SOFTWARE ENGINEERING STUDENTS",
    team_banner_title: "Aerospace Operations & Innovation Center",
    team_banner_sub: "Combining algorithmic rigor, precise astrophysics, and interactive 3D graphics to democratize aerospace education worldwide.",
    team_commitment_title: "Focused on Victory",
    team_commitment_heading: "Aiming for the Global NASA Award",
    team_commitment_desc: "This project is the product of continuous teamwork, deep research into JPL/NASA publications, and dedication to showcase the high caliber of software engineering in Angola.",
    team_software_eng: "Software Engineering",
    team_open_source: "Open Source & 3D Simulation",
    member_1_role: "Team Leader & Systems Architecture",
    member_1_focus: "Software Engineering • Technical Coordination • Multivariable Simulation",
    member_2_role: "Orbital Dynamics & Numerical Logic",
    member_2_focus: "Tsiolkovsky Equation • Delta-V Modeling • Launcher Capacities",
    member_3_role: "Scientific Instrumentation & Payload",
    member_3_focus: "Spectrometry • Ground Penetrating Radar • Mission Taxonomy",
    member_4_role: "Power Systems & Telecommunications",
    member_4_focus: "DSN Link Equation • 1/r² Solar Irradiance • Thermal & Battery Balance",
    member_5_role: "Frontend Engineering & 3D Visual Interface",
    member_5_focus: "User Experience • Real-time Telemetry • 3D Aerospace Design",

    // ------------------------------------------------------------------------
    // MISSION BUILDER CARDS
    // ------------------------------------------------------------------------
    builder_step_1: "CELESTIAL DESTINATION (UNIVERSE)",
    builder_step_1_sub: "Agency Budget:",
    builder_step_2: "SPACECRAFT ARCHITECTURE",
    builder_step_2_mass: "Base Mass",
    builder_step_3: "SCIENTIFIC PAYLOAD & SENSORS",
    builder_step_3_selected: "selected",
    builder_step_4: "POWER SOURCE & BATTERIES",
    builder_step_4_active_solar: "Solar Arrays",
    builder_step_4_active_rtg: "Nuclear RTG (110W continuous)",
    builder_solar_title: "☀️ Solar Arrays",
    builder_solar_desc: "Lightweight and cost-effective, but power drops with distance squared.",
    builder_rtg_title: "☢️ Nuclear RTG Generator",
    builder_rtg_desc: "Constant 110W in shadow • Decades of operation • $120M",
    builder_panel_area: "Solar Panel Area:",
    builder_battery_mass: "Lithium-Ion Battery Mass:",
    builder_wh_useful: "useful Wh",
    builder_emergency: "emergency",
    builder_long_eclipse: "long eclipse",
    builder_step_5: "TELECOMMUNICATIONS & EARTH LINK",
    builder_tx_power: "RF Transmitter Power:",
    builder_step_6: "LAUNCH VEHICLE",
    builder_launcher_cap: "Capacity:",
    builder_launcher_reliability: "Reliability:",

    // Vehicle Types
    type_orbiter_name: "Orbiter",
    type_orbiter_desc: "Orbital probe for global reconnaissance, altimetry, and telecommunications relay.",
    type_lander_name: "Lander",
    type_lander_desc: "Precision stationary surface landing craft with heat shield and retro-thrusters.",
    type_rover_name: "Rover",
    type_rover_desc: "Mobile robotic lab with articulated wheels to traverse geological formations.",

    // Scientific Instruments
    inst_camera_name: "Multi-Spectral Optical Camera",
    inst_camera_desc: "High-resolution color surface mapping and topographical imaging.",
    inst_spectrometer_name: "Infrared Spectrometer",
    inst_spectrometer_desc: "Identifies mineral and chemical composition of ground and atmosphere.",
    inst_radar_name: "Ground-Penetrating Radar (GPR)",
    inst_radar_desc: "Radar sounding to detect subsurface ice, water pockets, or lava tubes.",
    inst_drillLab_name: "Deep Core Drill & Bio Lab",
    inst_drillLab_desc: "Subsurface sampling with mass spectrometry and biosignature detection.",
    inst_weather_name: "Weather & Atmospheric Station",
    inst_weather_desc: "Barometric pressure, temperature, wind, and airborne dust monitoring.",
    inst_seismometer_name: "Broadband Seismometer",
    inst_seismometer_desc: "Monitors internal tectonic tremors and meteorite impact shockwaves.",
    inst_magnetometer_name: "Atomic Fluxgate Magnetometer",
    inst_magnetometer_desc: "Measures planetary magnetic fields and solar wind interactions.",

    // Antennas
    antenna_low_name: "Omnidirectional Antenna (Low Gain)",
    antenna_medium_name: "Medium Parabolic Dish (1.4m)",
    antenna_high_name: "High-Gain Parabolic Dish (2.4m)",

    // Launchers
    launcher_small_name: "Small Launcher (Electron / Vega)",
    launcher_small_desc: "Low cost and fast turnaround, perfect for cubesats and lightweight probes.",
    launcher_medium_name: "Medium Launcher (Falcon 9 / Ariane 62)",
    launcher_medium_desc: "The commercial workhorse of deep space exploration, optimal cost-to-payload.",
    launcher_heavy_name: "Heavy-Lift Super Launcher (SLS / Falcon Heavy)",
    launcher_heavy_desc: "Maximum translunar injection capacity for flagship interplanetary science.",

    // Presets
    preset_title: "Historic Reference Missions:",
    preset_mro_tag: "NASA Classic",
    preset_mro_desc: "High-data Mars orbital probe with 3m high-gain dish and shallow subsurface radar.",
    preset_clipper_tag: "Jupiter Flagship",
    preset_clipper_desc: "Jovian moon Europa explorer with nuclear RTG and ice-penetrating suite.",
    preset_dragonfly_tag: "Titan Extreme Challenge",
    preset_dragonfly_desc: "Deep atmospheric lander investigating prebiotic organic chemistry on Titan.",

    // ------------------------------------------------------------------------
    // TELEMETRY HUD
    // ------------------------------------------------------------------------
    hud_title: "Flight Telemetry (Real-Time)",
    hud_flight_approved: "FLIGHT QUALIFIED",
    hud_flight_anomaly: "ANOMALIES DETECTED",
    hud_launch_mass: "Launch Mass:",
    hud_dry_mass: "Dry:",
    hud_edl_mass: "EDL:",
    hud_propellant_mass: "Propellant:",
    hud_power_balance: "Power Balance:",
    hud_power_generated: "generated",
    hud_power_consumed: "draw",
    hud_battery_reserve: "Battery Reserve (Eclipse):",
    hud_dsn_downlink: "DSN Science Downlink:",
    hud_data_reaches_earth: "of collected data returned",
    hud_budget_consumed: "Budget Consumed:",
    hud_success_prob: "Success Probability",
    hud_science_score: "Science Score",
    hud_engineer_report: "Flight Engineers Report:",
    hud_launch_btn: "🚀 Launch 3D Flight Game",
    hud_certificate_btn: "Issue Official Certificate",

    // ------------------------------------------------------------------------
    // 3D FLIGHT SIMULATION
    // ------------------------------------------------------------------------
    game_mode_earth: "Level 1: Earth Launch",
    game_mode_cruise: "Level 2: Deep Space & Fleet",
    game_mode_orbit: "Level 3: Target Orbit",
    game_mode_land: "Level 4: Surface Touchdown",
    game_camera_chase: "3rd-Person Chase Cam",
    game_camera_cockpit: "Cockpit HUD (1st Person)",
    game_camera_orbit: "Free Inspection",
    game_controls_thrust: "W / ↑: Accelerate | S / ↓: Retro-brake | A / D: Yaw | Q / E: Pitch | SPACE: Boost | R: Scan | F: Touchdown",
    game_touchdown_ready: "SURFACE TOUCHDOWN CONFIRMED!",
    game_touchdown_crash: "CRITICAL CRASH! High touchdown velocity (> 4.5 m/s).",
    game_touchdown_speed: "Descent Speed:",
    game_ship_hull: "Hull Health:",
    game_propellant: "Propellant Δv:",
    game_battery_level: "Battery:",
    game_radar_vessels: "FLEET RADAR (PROXIMITY)",
    game_hail_probe: "Open Radio Channel",
    game_altitude: "Altitude:",
    game_speed: "Velocity:",
    game_scan_target: "Anomaly Detected! Press [SCAN] (R)",
    game_science_collected: "Science Collected:",
    game_flight_ready: "SYSTEMS NOMINAL",
    game_thrust_btn: "THRUST (W / ↑)",
    game_retro_btn: "RETRO-BURN (S / ↓)",
    game_scan_btn: "SCIENCE SCAN (R)",
    game_landing_gear: "Landing Gear Deployed",
    game_sample_collected: "Surface Core Sample Collected! (+50 pts)",
    game_flag_planted: "Angola & NASA Mission Flag Planted!",
    game_take_sample_btn: "🧪 Collect Soil Sample",
    game_plant_flag_btn: "🇦🇴 Plant Mission Flag",
    game_dock_expand: "Show Flight Control Deck",
    game_dock_collapse: "Immersive Cockpit Mode",
    game_level_objectives_title: "Active Mission Objectives:",
    obj_earth_orbit: "Reach stable Earth orbit (7.8 km/s)",
    obj_deep_space_contact: "Contact another fleet vessel in deep space",
    obj_planetary_insertion: "Execute retrograde burn for mapping orbit insertion",
    obj_surface_landing: "Perform precision soft touchdown at speed < 4.0 m/s",

    // ------------------------------------------------------------------------
    // MODALS & CERTIFICATES
    // ------------------------------------------------------------------------
    modal_launch_title: "OPERATIONS CENTER • FLIGHT SEQUENCE",
    modal_target: "Target:",
    modal_vehicle: "Vehicle:",
    modal_step_1: "1. T-0 Launch",
    modal_step_2: "2. Injection & Cruise",
    modal_step_3: "3. Insertion / EDL",
    modal_step_4: "4. Science Downlink",
    modal_return_btn: "Return to Controls",
    cert_title: "SPACE FLIGHT QUALIFICATION CERTIFICATE",
    cert_sub: "NASA Space Apps Challenge 2026 • Multiverso Simulator",
    cert_status_approved: "MISSION FLIGHT QUALIFIED",
    cert_status_failed: "MISSION DEFICIENT (ENGINEERING VIOLATIONS)",

    // ------------------------------------------------------------------------
    // FOOTER
    // ------------------------------------------------------------------------
    footer_desc: "Interactive Space Engineering Simulator and 3D Flight Game created for the NASA Space Apps Challenge 2026 by Angolan software engineering students.",
    footer_team_title: "Engineering Team",
    footer_physics_title: "Physics & Equations",
    footer_open_game: "→ Launch 3D Game",
    footer_copy: "© 2026 Multiverso • Built for the NASA Space Apps Challenge by António Maurício, Adilson Francisco, Agostinho Mariti, Edmilson Segredo, and Hilton Diamantino.",
  },

  fr: {
    // ------------------------------------------------------------------------
    // NAVBAR
    // ------------------------------------------------------------------------
    nav_title: "MULTIVERSO",
    nav_subtitle: "Simulateur de Missions Spatiales • Étudiants en Génie Logiciel",
    nav_challenge: "Le Défi",
    nav_destinations: "Destinations",
    nav_physics: "Ingénierie & Physique",
    nav_team: "Notre Équipe",
    nav_play: "Jouer Maintenant",
    nav_active_game: "Jeu 3D Actif",
    nav_return_portal: "Retour au Portail",
    sound_enable: "Activer les effets sonores",
    sound_disable: "Désactiver les effets sonores",

    // ------------------------------------------------------------------------
    // HERO
    // ------------------------------------------------------------------------
    hero_badge: "NASA Space Apps Challenge 2026",
    hero_team_badge: "🇦🇴 Étudiants en Génie Logiciel • Angola",
    hero_title_1: "Concevez votre mission spatiale.",
    hero_title_2: "Dominez le Multivers.",
    hero_desc: "Concevoir une mission interplanétaire exige d'équilibrer des contraintes concurrentes : masse de carburant, énergie solaire en orbite lointaine, liaisons de télécommunication avec la Terre et budgets rigoureux. Un jeu 3D complet avec pilotage en temps réel, rencontres spatiales et atterrissage réel sur la surface.",
    hero_cta_play: "Jouer Maintenant (Jeu 3D)",
    hero_cta_explore: "Explorer le Défi NASA",
    hero_probe_status: "Sonde Orbitale • Multiverso I",
    hero_probe_sub: "Télémétrie DSN active • Distance solaire 1.52 UA",
    hero_probe_nominal: "SYSTÈMES NOMINAUX",
    hero_isp: "ISP 320s • Bipropergols",
    hero_comms_badge: "35 W • Antenne 2.5m",
    hero_banner_ready: "Jeu de Vol 3D & Simulateur Prêt",
    hero_banner_sub: "Pilotez de la Terre à l'atterrissage sur le monde cible, rencontrez d'autres sondes et accomplissez vos objectifs scientifiques.",
    hero_badge_tsiolkovsky: "Équation de Tsiolkovski",
    hero_badge_solar: "Irradiance Solaire",
    hero_badge_telemetry: "Liaison de Télémétrie",
    hero_badge_systems: "Ingénierie Système",
    hero_propulsion_eff: "Efficacité Propulsive",
    hero_dsn_link: "Réseau Deep Space (DSN)",

    // ------------------------------------------------------------------------
    // DÉFI NASA & PILIERS
    // ------------------------------------------------------------------------
    challenge_badge: "Défi Officiel NASA Space Apps 2026",
    challenge_title: "L'Art de l'Ingénierie Spatiale : Compromis et Contraintes",
    challenge_desc: "Pour la plupart des étudiants, concevoir une sonde semble se résumer à choisir des pièces. En réalité, chaque décision détermine la mécanique orbitale, la survie pendant les éclipses et la viabilité budgétaire.",
    challenge_tested_in_game: "Prêt à tester en pratique ?",
    challenge_test_btn: "Ouvrir le Jeu 3D Interactif",
    impact_critical: "Impact Critique dans le Jeu :",

    pillar_mass_title: "Masse & Propulsion (Tsiolkovski)",
    pillar_mass_badge: "Δv & Capacité",
    pillar_mass_summary: "Chaque kilogramme supplémentaire d'instrument exige une masse exponentielle de carburant et de bouclier thermique.",
    pillar_mass_details: "L'équation de Tsiolkovski stipule que le carburant nécessaire croît de manière exponentielle avec la vitesse requise (Δv). Si la masse dépasse la capacité du lanceur, la fusée ne pourra pas s'échapper de l'attraction terrestre.",
    pillar_mass_warning: "Trop d'instruments lourds peuvent dépasser la charge utile du lanceur, exigeant une fusée plus puissante et bien plus coûteuse.",

    pillar_power_title: "Puissance & Nuits d'Éclipse",
    pillar_power_badge: "Solaire vs RTG Nucléaire",
    pillar_power_summary: "La lumière du Soleil diminue avec le carré de la distance. En orbite de Jupiter, l'énergie solaire chute de plus de 96%.",
    pillar_power_details: "Les sondes proches du Soleil utilisent des panneaux compacts, mais ont besoin de batteries pour survivre aux éclipses. Vers des cibles lointaines comme Europe ou Titan, les panneaux solaires deviennent inopérants et les générateurs RTG sont obligatoires.",
    pillar_power_warning: "Si la production est inférieure à la consommation des ordinateurs de bord, la sonde subira un black-out fatal.",

    pillar_comms_title: "Télécommunications & Liaison DSN",
    pillar_comms_badge: "Antennes & Downlink",
    pillar_comms_summary: "Recueillir des gigaoctets de données scientifiques est inutile si l'émetteur radio ne peut pas les renvoyer à la Terre.",
    pillar_comms_details: "La puissance radio décroît avec le carré de la distance. Transmettre des images haute résolution depuis Mars ou Jupiter exige une parabole à grand gain et des dizaines de watts RF.",
    pillar_comms_warning: "Une antenne trop faible bride les données scientifiques reçues à une fraction infime, gâchant le potentiel de la mission.",

    pillar_budget_title: "Budget & Marge Financière",
    pillar_budget_badge: "Plafond Budgétaire",
    pillar_budget_summary: "L'argent est limité. Chaque composant a des coûts de fabrication, d'essais et d'intégration aérospatiale.",
    pillar_budget_details: "Du coût du lanceur aux spectromètres et générateurs RTG, les missions doivent impérativement respecter le plafond fixé par les agences spatiales.",
    pillar_budget_warning: "Les projets dépassant le budget alloué sont immédiatement rejetés par les comités d'examen de vol.",

    // ------------------------------------------------------------------------
    // DESTINATIONS CARDS
    // ------------------------------------------------------------------------
    dest_badge: "Cibles du Système Solaire",
    dest_title: "Chaque Monde, Une Nouvelle Réalité Physique",
    dest_desc: "La physique orbitale et les défis environnementaux changent radicalement d'un corps céleste à l'autre. De la poussière fine de Mars aux océans gelés d'Europe.",
    dest_mapping_tag: "Cartographie du Multivers",
    dest_banner_title: "4 Destinations Planétaires Prêtes pour l'Exploration 3D",
    dest_launch_btn: "Voler Vers ce Monde en 3D",
    dest_budget: "Budget",
    dest_sun_dist: "Distance Solaire :",
    dest_earth_dist: "Distance à la Terre :",
    dest_gravity: "Gravité de Surface :",
    dest_atmosphere: "Atmosphère :",

    dest_mars_name: "Mars (La Planète Rouge)",
    dest_mars_tagline: "L'objectif majeur de l'exploration robotique et humaine",
    dest_mars_desc: "Atmosphère ténue de CO2, tempêtes de poussière globales et terrain accidenté. Idéal pour les orbiteurs d'observation et les rovers géologiques.",
    dest_mars_atmo: "Ténue (95% CO2)",

    dest_moon_name: "Lune (Satellite de la Terre)",
    dest_moon_tagline: "Le banc d'essai pour l'expansion humaine interplanétaire",
    dest_moon_desc: "Aucune atmosphère, vide spatial total et nuits glaciales de 14 jours terrestres. Télécommunications quasi instantanées avec la Terre.",
    dest_moon_atmo: "Vide spatial",

    dest_europa_name: "Europe (Lune de Jupiter)",
    dest_europa_tagline: "Un océan liquide global sous une croûte de glace extraterrestre",
    dest_europa_desc: "À 5,2 UA du Soleil, le flux solaire ne représente que 3,7% de celui de la Terre. Panneaux solaires inutiles, générateur RTG obligatoire. Radiations intenses.",
    dest_europa_atmo: "Ténue (Oxygène résiduel)",

    dest_titan_name: "Titan (Lune de Saturne)",
    dest_titan_tagline: "Lacs de méthane liquide et atmosphère plus dense que celle de la Terre",
    dest_titan_desc: "Distance extrême (9,58 UA). L'atmosphère dense d'azote permet un atterrissage sous parachute sans lourd bouclier thermique, mais la lumière ne pénètre pas.",
    dest_titan_atmo: "Dense (98% Azote)",

    // ------------------------------------------------------------------------
    // FÓRMULAS FÍSICAS
    // ------------------------------------------------------------------------
    physics_badge: "Physique Réelle Implémentée",
    physics_title: "Formules Scientifiques du Jeu",
    physics_desc: "Multiverso repose sur les lois de la mécanique orbitale, de l'électrodynamique solaire et des liaisons radio interplanétaires utilisées par les ingénieurs de la NASA et de l'ESA.",
    formula_rocket_title: "Équation de Tsiolkovski",
    formula_rocket_sub: "Propulsion de Fusée & Delta-V",
    formula_rocket_exp: "Calcule la masse de carburant requise pour modifier la vitesse orbitale de la sonde. La consommation croît de manière exponentielle avec le delta-V nécessaire.",
    formula_solar_title: "Loi en Carré Inverse",
    formula_solar_sub: "Irradiance & Captation Solaire",
    formula_solar_exp: "L'énergie solaire se dissipe avec le carré de la distance à l'étoile. Sur Mars (1,52 UA), le flux tombe à 43% de la Terre ; sur Europe (5,2 UA), sous 4%.",
    formula_comms_title: "Bilan de Liaison RF",
    formula_comms_sub: "Downlink de Données Deep Space Network (DSN)",
    formula_comms_exp: "Le gain de l'antenne parabolique croît avec le carré de son diamètre, tandis que l'atténuation augmente avec le carré de la distance cosmique vers la Terre.",
    formula_batt_title: "Capacité des Batteries en Éclipse",
    formula_batt_sub: "Stockage Électrochimique Embarqué",
    formula_batt_exp: "Pendant les nuits à la surface ou les éclipses en orbite, les panneaux génèrent 0W. La sonde dépend intégralement de sa réserve de batteries lithium-ion.",

    // ------------------------------------------------------------------------
    // EQUIPA DE ESTUDANTES
    // ------------------------------------------------------------------------
    team_badge: "🇦🇴 Représentation Nationale • Luanda, Angola",
    team_title: "Équipe Multiverso • Collègues en Génie Logiciel",
    team_desc: "Nous sommes un groupe de 5 collègues et étudiants angolais en Génie Logiciel, unis par la passion de l'exploration spatiale, de l'informatique et la volonté de remporter le NASA Space Apps Challenge 2026.",
    team_banner_badge: "ÉTUDIANTS EN GÉNIE LOGICIEL",
    team_banner_title: "Centre d'Opérations & d'Innovation Aérospatiale",
    team_banner_sub: "Alliant rigueur algorithmique, astrophysique précise et graphismes 3D interactifs pour démocratiser l'enseignement spatial.",
    team_commitment_title: "Objectif Victoire",
    team_commitment_heading: "Viser le Prix Mondial de la NASA",
    team_commitment_desc: "Ce projet est l'aboutissement d'un travail d'équipe soutenu, de recherches approfondies dans les publications du JPL/NASA et de la détermination des 5 collègues à porter haut le génie logiciel angolais.",
    team_software_eng: "Génie Logiciel",
    team_open_source: "Open Source & Simulation 3D",
    member_1_role: "Chef d'Équipe & Architecture Système",
    member_1_focus: "Génie Logiciel • Coordination Technique • Simulation Multivariable",
    member_2_role: "Dynamique Orbitale & Modélisation Numérique",
    member_2_focus: "Équation de Tsiolkovski • Modélisation du Δv • Capacités des Lanceurs",
    member_3_role: "Instrumentation & Charge Scientifique",
    member_3_focus: "Spectrométrie • Radar de Sous-sol • Taxonomie des Missions",
    member_4_role: "Systèmes Électriques & Télécommunications",
    member_4_focus: "Liaisons DSN • Irradiance Solaire 1/r² • Bilan Électrique et Batteries",
    member_5_role: "Génie Frontend & Interface 3D Visuelle",
    member_5_focus: "Expérience Utilisateur • Télémétrie en Temps Réel • Design Aérospatial 3D",

    // ------------------------------------------------------------------------
    // CARDS DO CONSTRUTOR DE MISSÕES
    // ------------------------------------------------------------------------
    builder_step_1: "DESTINATION CÉLESTE (UNIVERS)",
    builder_step_1_sub: "Budget de l'Agence :",
    builder_step_2: "ARCHITECTURE DU VAISSEAU",
    builder_step_2_mass: "Masse de Base",
    builder_step_3: "CHARGE SCIENTIFIQUE & CAPTEURS",
    builder_step_3_selected: "sélectionnés",
    builder_step_4: "SOURCE D'ÉNERGIE & BATTERIES",
    builder_step_4_active_solar: "Panneaux Solaires",
    builder_step_4_active_rtg: "RTG Nucléaire (110W continus)",
    builder_solar_title: "☀️ Panneaux Solaires",
    builder_solar_desc: "Légers et économiques, mais le rendement chute avec le carré de la distance.",
    builder_rtg_title: "☢️ Générateur Nucléaire RTG",
    builder_rtg_desc: "110W constants dans l'obscurité • Durée décennale • $120M",
    builder_panel_area: "Surface des Panneaux Solaires :",
    builder_battery_mass: "Masse des Batteries Lithium-Ion :",
    builder_wh_useful: "Wh utiles",
    builder_emergency: "urgence",
    builder_long_eclipse: "éclipse prolongée",
    builder_step_5: "TÉLÉCOMMUNICATIONS & LIAISON TERRE",
    builder_tx_power: "Puissance d'Émission RF :",
    builder_step_6: "LANCEUR SPATIAL",
    builder_launcher_cap: "Capacité :",
    builder_launcher_reliability: "Fiabilité :",

    // Types de Véhicules
    type_orbiter_name: "Orbiteur",
    type_orbiter_desc: "Sonde orbitale pour la cartographie globale, l'altimétrie et le relais de communication.",
    type_lander_name: "Atterrisseur (Lander)",
    type_lander_desc: "Module d'atterrissage fixe de haute précision avec bouclier thermique et rétrofusées.",
    type_rover_name: "Rover Mobile",
    type_rover_desc: "Laboratoire mobile à roues articulées pour explorer plusieurs sites géologiques.",

    // Instruments Scientifiques
    inst_camera_name: "Caméra Optique Multi-spectrale",
    inst_camera_desc: "Cartographie couleur haute résolution de la surface et topographie.",
    inst_spectrometer_name: "Spectromètre Infrarouge",
    inst_spectrometer_desc: "Identification de la composition minérale et chimique du sol ou de l'atmosphère.",
    inst_radar_name: "Radar de Sous-sol (GPR)",
    inst_radar_desc: "Sondage radar pour détecter la glace souterraine ou cavités volcaniques.",
    inst_drillLab_name: "Foreuse de Profondeur & Labo Bio",
    inst_drillLab_desc: "Prélèvement d'échantillons en sous-sol avec spectrométrie de masse.",
    inst_weather_name: "Station Météo & Atmosphérique",
    inst_weather_desc: "Capteurs de pression, température, vents et concentration de poussière.",
    inst_seismometer_name: "Sismomètre Large Bande",
    inst_seismometer_desc: "Surveillance des secousses sismiques et ondes d'impacts météoritiques.",
    inst_magnetometer_name: "Magnétomètre Fluxgate",
    inst_magnetometer_desc: "Mesure des champs magnétiques planétaires et interaction avec le vent solaire.",

    // Antennes
    antenna_low_name: "Antenne Omnidirectionnelle (Faible Gain)",
    antenna_medium_name: "Antenne Parabolique Moyenne (1.4m)",
    antenna_high_name: "Antenne Parabolique Grand Gain (2.4m)",

    // Lanceurs
    launcher_small_name: "Lanceur Léger (Electron / Vega)",
    launcher_small_desc: "Coût réduit et cadence rapide, parfait pour cubesats et sondes légères.",
    launcher_medium_name: "Lanceur Moyen (Falcon 9 / Ariane 62)",
    launcher_medium_desc: "Le fer de lance commercial pour l'exploration spatiale lointaine.",
    launcher_heavy_name: "Super-Lanceur Lourd (SLS / Falcon Heavy)",
    launcher_heavy_desc: "Capacité maximale d'injection translunaire pour les grandes missions scientifiques.",

    // Presets
    preset_title: "Configurations Historiques de Référence :",
    preset_mro_tag: "Classique NASA",
    preset_mro_desc: "Sonde orbitale martienne à haut débit de données avec parabole de 3m et radar de glace.",
    preset_clipper_tag: "Flagship Jupiter",
    preset_clipper_desc: "Explorateur d'Europe avec générateur RTG pour sonder l'océan sous-glaciaire.",
    preset_dragonfly_tag: "Défi Extrême sur Titan",
    preset_dragonfly_desc: "Atterrisseur dans la dense atmosphère de Titan pour analyser la chimie prébiotique.",

    // ------------------------------------------------------------------------
    // TÉLÉMÉTRIE HUD
    // ------------------------------------------------------------------------
    hud_title: "Télémétrie de Vol (Temps Réel)",
    hud_flight_approved: "APPROUVÉ POUR LE VOL",
    hud_flight_anomaly: "ANOMALIES DÉTECTÉES",
    hud_launch_mass: "Masse au Lancement :",
    hud_dry_mass: "Sèche :",
    hud_edl_mass: "EDL :",
    hud_propellant_mass: "Carburant :",
    hud_power_balance: "Bilan Électrique :",
    hud_power_generated: "générés",
    hud_power_consumed: "consommés",
    hud_battery_reserve: "Réserve de Batterie (Éclipse) :",
    hud_dsn_downlink: "Liaison DSN Scientifique :",
    hud_data_reaches_earth: "des données atteignent la Terre",
    hud_budget_consumed: "Budget Utilisé :",
    hud_success_prob: "Probabilité de Succès",
    hud_science_score: "Score Scientifique",
    hud_engineer_report: "Rapport des Ingénieurs de Vol :",
    hud_launch_btn: "🚀 Lancer le Jeu Spatial 3D",
    hud_certificate_btn: "Délivrer le Certificat Officiel",

    // ------------------------------------------------------------------------
    // SIMULATION DE VOL 3D
    // ------------------------------------------------------------------------
    game_mode_earth: "Niveau 1 : Lancement Terrestre",
    game_mode_cruise: "Niveau 2 : Espace Profond & Flotte",
    game_mode_orbit: "Niveau 3 : Orbite Cible",
    game_mode_land: "Niveau 4 : Atterrissage Réel",
    game_camera_chase: "Caméra 3ème Personne (Poursuite)",
    game_camera_cockpit: "Cockpit HUD (1ère Personne)",
    game_camera_orbit: "Inspection Libre",
    game_controls_thrust: "W / ↑ : Propulsion | S / ↓ : Rétro-freinage | A / D : Lacet | Q / E : Tangage | ESPACE : Pleine Poussée | R : Scanner | F : Atterrir",
    game_touchdown_ready: "ATTERRISSAGE RÉEL CONFIRMÉ SUR LA SURFACE !",
    game_touchdown_crash: "CRASH CRITIQUE ! Vitesse d'impact trop élevée (> 4.5 m/s).",
    game_touchdown_speed: "Vitesse Verticale :",
    game_ship_hull: "Santé de la Coque :",
    game_propellant: "Carburant Δv :",
    game_battery_level: "Batterie :",
    game_radar_vessels: "RADAR DE LA FLOTTE SPATIALE",
    game_hail_probe: "Établir Liaison Radio",
    game_altitude: "Altitude :",
    game_speed: "Vitesse :",
    game_scan_target: "Anomalie Détectée ! Appuyez sur [SCAN] (R)",
    game_science_collected: "Science Collectée :",
    game_flight_ready: "SYSTÈMES PRÊTS",
    game_thrust_btn: "POUSSÉE (W / ↑)",
    game_retro_btn: "RÉTRO-FREIN (S / ↓)",
    game_scan_btn: "SCAN SCIENTIFIQUE (R)",
    game_landing_gear: "Train d'Atterrissage Déployé",
    game_sample_collected: "Échantillon de Sol Prélevé ! (+50 pts)",
    game_flag_planted: "Drapeau d'Angola et de la Mission Planté !",
    game_take_sample_btn: "🧪 Prélever Échantillon",
    game_plant_flag_btn: "🇦🇴 Planter le Drapeau",
    game_dock_expand: "Afficher le Pupitre de Pilotage",
    game_dock_collapse: "Mode Cockpit Immersif",
    game_level_objectives_title: "Objectifs de la Mission Active :",
    obj_earth_orbit: "Atteindre une orbite terrestre stable (7.8 km/s)",
    obj_deep_space_contact: "Contacter un autre vaisseau de la flotte en espace profond",
    obj_planetary_insertion: "Effectuer un allumage rétrograde pour l'orbite de cartographie",
    obj_surface_landing: "Réussir un atterrissage en douceur à vitesse < 4.0 m/s",

    // ------------------------------------------------------------------------
    // FENÊTRES MODALES & CERTIFICATS
    // ------------------------------------------------------------------------
    modal_launch_title: "CENTRE DES OPÉRATIONS • SÉQUENCE DE VOL",
    modal_target: "Cible :",
    modal_vehicle: "Vaisseau :",
    modal_step_1: "1. T-0 Décollage",
    modal_step_2: "2. Injection & Croisière",
    modal_step_3: "3. Insertion / EDL",
    modal_step_4: "4. Downlink Scientifique",
    modal_return_btn: "Retour aux Commandes",
    cert_title: "CERTIFICAT DE QUALIFICATION DE VOL SPATIAL",
    cert_sub: "NASA Space Apps Challenge 2026 • Simulateur Multiverso",
    cert_status_approved: "MISSION VALIDÉE POUR LE VOL",
    cert_status_failed: "MISSION NON CONFORME (VIOLATION DE CONTRAINTES)",

    // ------------------------------------------------------------------------
    // FOOTER
    // ------------------------------------------------------------------------
    footer_desc: "Simulateur Interactif et Jeu Spatial 3D conçu pour le NASA Space Apps Challenge 2026 par des étudiants angolais en Génie Logiciel.",
    footer_team_title: "Équipe d'Ingénierie",
    footer_physics_title: "Physique & Équations",
    footer_open_game: "→ Lancer le Jeu 3D",
    footer_copy: "© 2026 Multiverso • Conçu pour le NASA Space Apps Challenge par António Maurício, Adilson Francisco, Agostinho Mariti, Edmilson Segredo et Hilton Diamantino.",
  },
};

// Deteta automaticamente a linguagem do navegador (Português, Inglês ou Francês)
export function getInitialLanguage() {
  if (typeof window === "undefined" || !window.navigator) return "pt";
  const userLang = (window.navigator.language || window.navigator.userLanguage || "pt").toLowerCase();
  if (userLang.startsWith("pt")) return "pt";
  if (userLang.startsWith("fr")) return "fr";
  if (userLang.startsWith("en")) return "en";
  return "pt"; // Padrão caso não seja detetado
}
