// ============================================================================
// COMPONENTE 3D: SpaceCanvas3D (Simulador de Voo Espacial 3D, Pouso e Frota)
// Responsabilidade: Simulação 3D completa com pilotagem em tempo real, 4 níveis
// (Terra, Espaço Profundo com outras naves, Órbita e Pouso na Superfície),
// vida da nave, propelente, cockpit HUD em 1ª e 3ª pessoa e encontros espaciais.
// ============================================================================

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import confetti from 'canvas-confetti';
import { playSound } from '../../utils/audio';
import {
  Flame, Radio, Sparkles, ChevronDown, ChevronUp, Heart,
  Compass, Eye, CheckCircle2, AlertOctagon, MessageSquare,
  Crosshair, Shield, Zap, Flag, Award, Send
} from 'lucide-react';

export default function SpaceCanvas3D({
  missionConfig,
  result,
  gameMode = 'orbit',
  setGameMode,
  soundEnabled,
  onScienceBonus,
  lang = 'pt',
  t = (k) => k,
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const spacecraftGroupRef = useRef(null);
  const planetMeshRef = useRef(null);
  const earthMeshRef = useRef(null);
  const otherVesselsGroupRef = useRef(null);
  const asteroidFieldRef = useRef(null);
  const surfaceTerrainRef = useRef(null);
  const warpLinesRef = useRef(null);
  const thrusterPlumesRef = useRef([]);
  const rcsPuffsRef = useRef([]);

  // Estados de voo espacial e estatísticas de jogo (Vida, Combustível, Bateria)
  const [flightStage, setFlightStage] = useState('earth'); // 'earth' | 'cruise' | 'orbit' | 'land'
  const [cameraMode, setCameraMode] = useState('chase'); // 'chase' | 'cockpit' | 'free'
  const [shipHealth, setShipHealth] = useState(100); // Vida / Integridade do casco (%)
  const [propellantRemaining, setPropellantRemaining] = useState(1500); // Delta-v restante (m/s)
  const [batteryLevel, setBatteryLevel] = useState(100); // Bateria (%)
  const [altitudeKm, setAltitudeKm] = useState(480); // Altitude atual
  const [velocityKmS, setVelocityKmS] = useState(7.8); // Velocidade orbital
  const [verticalSpeed, setVerticalSpeed] = useState(0); // Velocidade de descida vertical (m/s)
  const [touchdownSuccess, setTouchdownSuccess] = useState(false);
  const [touchdownCrashed, setTouchdownCrashed] = useState(false);
  const [sampleCollected, setSampleCollected] = useState(false);
  const [flagPlanted, setFlagPlanted] = useState(false);
  const [isThrusting, setIsThrusting] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [collectedScience, setCollectedScience] = useState(0);

  // Refs de sincronização de alta performance para o loop Three.js
  const flightStageRef = useRef(flightStage);
  const cameraModeRef = useRef(cameraMode);
  const isThrustingRef = useRef(isThrusting);
  const isWarpingRef = useRef(isWarping);
  const soundEnabledRef = useRef(soundEnabled);

  useEffect(() => { flightStageRef.current = flightStage; }, [flightStage]);
  useEffect(() => { cameraModeRef.current = cameraMode; }, [cameraMode]);
  useEffect(() => { isThrustingRef.current = isThrusting; }, [isThrusting]);
  useEffect(() => { isWarpingRef.current = isWarping; }, [isWarping]);
  useEffect(() => { soundEnabledRef.current = soundEnabled; }, [soundEnabled]);

  // Sistema de Encontros com Outras Naves no Espaço Profundo (Frota Angolana & Internacional)
  const [activeEncounter, setActiveEncounter] = useState(null);
  const [encounterMessage, setEncounterMessage] = useState(null);
  const [hailCompleted, setHailCompleted] = useState(false);

  // Objetivos de missão completados
  const [completedObjectives, setCompletedObjectives] = useState({
    earth: false,
    cruise: false,
    orbit: false,
    land: false,
  });

  // Lista de outras naves viajando pelo sistema solar
  const fleetVessels = [
    {
      id: 'rainha_ginga',
      name: '🇦🇴 Sonda Rainha Ginga (Angola Deep Space)',
      dist: '1.2 km',
      pilot: 'Comandante António Maurício',
      msg: {
        pt: "📡 Sinal de Luanda recebido da Sonda Rainha Ginga: 'Aqui é a equipa angolana de exploração! Confirmamos telemetria sincronizada e vetor translunar ideal. Dados orbitais compartilhados!' (+50 pts Ciência)",
        en: "📡 Luanda Signal from Queen Ginga Probe: 'This is the Angolan deep space mission! We confirm synced telemetry and clean interplanetary trajectory. Orbit data shared!' (+50 pts Science)",
        fr: "📡 Signal de Luanda reçu de la Sonde Reine Ginga : 'Ici l'équipe angolaise d'exploration ! Télémétrie synchronisée et trajectoire interplanétaire nominale. Données partagées !' (+50 pts Science)",
      },
      pts: 50,
    },
    {
      id: 'voyager',
      name: '🛸 Voyager 1 (NASA Interstellar Probe)',
      dist: '4.8 km',
      pilot: 'Missão Interestelar NASA JPL',
      msg: {
        pt: "📡 Transmissão DSN da Voyager 1: 'O Disco de Ouro transporta as saudações da Terra para o infinito cósmico. Medições de plasma interestelar transferidas.' (+40 pts Ciência)",
        en: "📡 DSN Transmission from Voyager 1: 'The Golden Record carries Earth's greetings into the infinite cosmos. Interstellar plasma readings transferred.' (+40 pts Science)",
        fr: "📡 Signal DSN de Voyager 1 : 'Le Golden Record transporte les salutations de la Terre. Mesures de plasma interstellaire transférées.' (+40 pts Science)",
      },
      pts: 40,
    },
    {
      id: 'jwst',
      name: '🔭 Telescópio James Webb (JWST)',
      dist: '3.1 km',
      pilot: 'Observatório Espacial Infravermelho',
      msg: {
        pt: "🔭 Transmissão do Telescópio James Webb: 'Identificámos assinaturas espectrais de água e gelo na rota do vosso planeta destino. Coordenadas enviadas!' (+35 pts Ciência)",
        en: "🔭 Transmission from James Webb Telescope: 'Infrared signatures of water ice detected along your trajectory. Coordinates sent!' (+35 pts Science)",
        fr: "🔭 Transmission du télescope James Webb : 'Signatures spectrales d'eau détectées sur votre trajectoire vers la planète cible. Données partagées !' (+35 pts Science)",
      },
      pts: 35,
    },
    {
      id: 'kwanza',
      name: '🇦🇴 Explorador Kwanza (Sonda de Apoio)',
      dist: '2.4 km',
      pilot: 'Engenheiro Edmilson Segredo',
      msg: {
        pt: "📡 Explorador Kwanza: 'Sistemas elétricos e enlaces DSN funcionando a 100%. Boa sorte na queima de inserção e pouso!' (+30 pts Ciência)",
        en: "📡 Kwanza Explorer: 'Electrical systems and DSN link operating at 100%. Good luck with the planetary insertion burn and landing!' (+30 pts Science)",
        fr: "📡 Explorateur Kwanza : 'Systèmes électriques et liaison DSN à 100%. Bonne chance pour la mise en orbite et l'atterrissage !' (+30 pts Science)",
      },
      pts: 30,
    },
  ];

  // ==========================================================================
  // INICIALIZAÇÃO DA CENA THREE.JS
  // ==========================================================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detetar se o renderizador de hardware está disponível
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Renderizador WebGL de alta fidelidade
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Cena & Ambiente PBR
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Câmara e Controlos
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      4000
    );
    camera.position.set(0, 4, 12);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 250;
    controls.minDistance = 2.0;
    controlsRef.current = controls;

    // 4. Luz Solar Direcional e Luz Ambiente Nebular
    const sunLight = new THREE.DirectionalLight(0xfff8ee, 4.2);
    sunLight.position.set(60, 40, 50);
    sunLight.castShadow = !isSoftwareGl;
    scene.add(sunLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x05070e, 0.95);
    scene.add(hemiLight);

    // 5. Starfield Procedural com 4000 estrelas
    const starGeo = new THREE.BufferGeometry();
    const starCount = 4000;
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const r = 800 + Math.random() * 600;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPos[i] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i + 2] = r * Math.cos(phi);

      const tint = Math.random();
      if (tint > 0.8) {
        starColors[i] = 0.38; starColors[i + 1] = 0.85; starColors[i + 2] = 1.0;
      } else if (tint < 0.25) {
        starColors[i] = 1.0; starColors[i + 1] = 0.7; starColors[i + 2] = 0.35;
      } else {
        starColors[i] = 0.95; starColors[i + 1] = 0.95; starColors[i + 2] = 1.0;
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starField = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ size: 1.8, vertexColors: true, transparent: true, opacity: 0.95 })
    );
    scene.add(starField);

    // 6. Linhas de Velocidade Hiperespaço (Warp Lines)
    const warpCount = 200;
    const warpGeo = new THREE.BufferGeometry();
    const warpPositions = new Float32Array(warpCount * 6);
    for (let i = 0; i < warpCount; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 80;
      warpPositions[i * 6] = x;
      warpPositions[i * 6 + 1] = y;
      warpPositions[i * 6 + 2] = z;
      warpPositions[i * 6 + 3] = x;
      warpPositions[i * 6 + 4] = y;
      warpPositions[i * 6 + 5] = z - 6;
    }
    warpGeo.setAttribute('position', new THREE.BufferAttribute(warpPositions, 3));
    const warpMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.0 });
    const warpLines = new THREE.LineSegments(warpGeo, warpMat);
    scene.add(warpLines);
    warpLinesRef.current = warpLines;

    // 7. Grupo da Nave Espacial do Jogador
    const spacecraftGroup = new THREE.Group();
    scene.add(spacecraftGroup);
    spacecraftGroupRef.current = spacecraftGroup;

    // 8. Grupo de Outras Naves Viajando pelo Sistema Solar
    const otherVesselsGroup = new THREE.Group();
    scene.add(otherVesselsGroup);
    otherVesselsGroupRef.current = otherVesselsGroup;

    // Construir modelo 3D da Sonda Rainha Ginga (Angola)
    const gingaGroup = new THREE.Group();
    gingaGroup.position.set(12, 1.5, -14);
    // Corpo cúbico dourado com badge
    const gBus = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 2.2), new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.2 }));
    gingaGroup.add(gBus);
    // Painéis solares com bandeira
    const gWing = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.05, 0.9), new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.85, roughness: 0.15 }));
    gingaGroup.add(gWing);
    // Antena de 1.8m
    const gDish = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2.2), new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.9 }));
    gDish.rotation.x = -Math.PI / 2;
    gDish.position.set(0, 1.2, 0);
    gingaGroup.add(gDish);
    otherVesselsGroup.add(gingaGroup);

    // Construir modelo 3D da Voyager 1
    const voyagerGroup = new THREE.Group();
    voyagerGroup.position.set(-18, 3, -20);
    const vDish = new THREE.Mesh(new THREE.SphereGeometry(1.9, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9 }));
    vDish.rotation.x = Math.PI / 2;
    voyagerGroup.add(vDish);
    const goldRecord = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.05, 16), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.1 }));
    goldRecord.position.set(-0.6, -0.4, 0);
    voyagerGroup.add(goldRecord);
    otherVesselsGroup.add(voyagerGroup);

    // Construir modelo 3D do Telescópio James Webb (JWST)
    const jwstGroup = new THREE.Group();
    jwstGroup.position.set(16, -4, -25);
    const sunshield = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.1, 2.8), new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.9, roughness: 0.2 }));
    sunshield.rotation.y = Math.PI / 6;
    jwstGroup.add(sunshield);
    const mirror = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.1, 6), new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.98, roughness: 0.15 }));
    mirror.position.set(0, 0.8, 0);
    mirror.rotation.x = Math.PI / 3;
    jwstGroup.add(mirror);
    otherVesselsGroup.add(jwstGroup);

    // 9. Cinturão de Asteroides no Espaço Profundo (Detritos e Meteoritos 3D)
    const asteroidGroup = new THREE.Group();
    scene.add(asteroidGroup);
    asteroidFieldRef.current = asteroidGroup;

    for (let a = 0; a < 35; a++) {
      const astGeo = new THREE.DodecahedronGeometry(0.8 + Math.random() * 1.6, 1);
      const astMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.95, metalness: 0.1 });
      const astMesh = new THREE.Mesh(astGeo, astMat);
      astMesh.position.set(
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 30,
        -15 - Math.random() * 50
      );
      astMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      asteroidGroup.add(astMesh);
    }

    // 10. Esfera Planetária da Terra com Atmosfera Real
    const earthGroup = new THREE.Group();
    earthGroup.position.set(0, -32, 0);
    scene.add(earthGroup);

    const earthCanvas = document.createElement('canvas');
    earthCanvas.width = 512; earthCanvas.height = 256;
    const eCtx = earthCanvas.getContext('2d');
    eCtx.fillStyle = '#0284c7';
    eCtx.fillRect(0, 0, 512, 256);
    eCtx.fillStyle = '#15803d'; // Continentes
    eCtx.beginPath();
    eCtx.arc(150, 100, 60, 0, Math.PI * 2);
    eCtx.arc(320, 120, 80, 0, Math.PI * 2);
    eCtx.arc(240, 160, 50, 0, Math.PI * 2);
    eCtx.fill();
    eCtx.fillStyle = 'rgba(255,255,255,0.45)'; // Nuvens
    for (let c = 0; c < 30; c++) {
      eCtx.beginPath();
      eCtx.arc(Math.random() * 512, Math.random() * 256, 15 + Math.random() * 30, 0, Math.PI * 2);
      eCtx.fill();
    }
    const earthTexture = new THREE.CanvasTexture(earthCanvas);
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    const earthMesh = new THREE.Mesh(
      new THREE.SphereGeometry(28, 48, 48),
      new THREE.MeshStandardMaterial({ map: earthTexture, roughness: 0.6, metalness: 0.15 })
    );
    earthGroup.add(earthMesh);
    earthMeshRef.current = earthGroup;

    // 11. Esfera do Planeta Destino (Marte, Lua, Europa, Titã)
    const planetGroup = new THREE.Group();
    planetGroup.position.set(0, -32, 0);
    scene.add(planetGroup);

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 512; pCanvas.height = 256;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createLinearGradient(0, 0, 0, 256);
    if (missionConfig.universe === 'moon') {
      pGrad.addColorStop(0, '#94a3b8'); pGrad.addColorStop(1, '#64748b');
    } else if (missionConfig.universe === 'europa') {
      pGrad.addColorStop(0, '#bae6fd'); pGrad.addColorStop(1, '#0284c7');
    } else if (missionConfig.universe === 'titan') {
      pGrad.addColorStop(0, '#f59e0b'); pGrad.addColorStop(1, '#b45309');
    } else {
      pGrad.addColorStop(0, '#c2410c'); pGrad.addColorStop(1, '#9a3412');
    }
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 512, 256);
    pCtx.fillStyle = 'rgba(0,0,0,0.3)';
    for (let i = 0; i < 40; i++) {
      pCtx.beginPath();
      pCtx.arc(Math.random() * 512, Math.random() * 256, 5 + Math.random() * 25, 0, Math.PI * 2);
      pCtx.fill();
    }
    const planetTexture = new THREE.CanvasTexture(pCanvas);
    planetTexture.colorSpace = THREE.SRGBColorSpace;
    const planetMesh = new THREE.Mesh(
      new THREE.SphereGeometry(28, 48, 48),
      new THREE.MeshStandardMaterial({ map: planetTexture, roughness: 0.85, metalness: 0.1 })
    );
    planetGroup.add(planetMesh);
    planetMeshRef.current = planetGroup;

    // 12. Superfície de Terreno para Pouso Real (Malha com Crateras e Plataforma de Aterragem)
    const terrainGroup = new THREE.Group();
    terrainGroup.position.set(0, -3.2, 0);
    scene.add(terrainGroup);

    const terrainGeo = new THREE.PlaneGeometry(90, 90, 36, 36);
    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const dist = Math.sqrt(vx * vx + vy * vy);
      // Suavizar o centro (plataforma de pouso) e criar crateras em redor
      const elevation = dist < 8 ? 0 : Math.sin(vx * 0.25) * Math.cos(vy * 0.25) * 1.8;
      pos.setZ(i, elevation);
    }
    terrainGeo.computeVertexNormals();
    const terrainMat = new THREE.MeshStandardMaterial({
      color: missionConfig.universe === 'moon' ? 0x94a3b8 : missionConfig.universe === 'europa' ? 0x38bdf8 : 0x9a3412,
      roughness: 0.9,
      metalness: 0.05,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.rotation.x = -Math.PI / 2;
    terrainGroup.add(terrainMesh);

    // Plataforma de Pouso com Anel de Neon
    const padGeo = new THREE.RingGeometry(2.5, 3.2, 32);
    const padMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide });
    const padMesh = new THREE.Mesh(padGeo, padMat);
    padMesh.rotation.x = -Math.PI / 2;
    padMesh.position.y = 0.05;
    terrainGroup.add(padMesh);

    terrainGroup.visible = false;
    surfaceTerrainRef.current = terrainGroup;

    // Redimensionamento responsivo
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Loop de Animação e Física em Tempo Real
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Rotação dos corpos celestes
      if (earthMeshRef.current) earthMeshRef.current.rotation.y += delta * 0.02;
      if (planetMeshRef.current) planetMeshRef.current.rotation.y += delta * 0.03;
      starField.rotation.y += delta * 0.001;

      // Animação de asteroides flutuantes
      if (asteroidFieldRef.current && flightStage === 'cruise') {
        asteroidFieldRef.current.children.forEach((ast, idx) => {
          ast.rotation.x += delta * (0.1 + idx * 0.01);
          ast.rotation.y += delta * 0.15;
        });
      }

      // Rotação e órbita das outras naves
      if (otherVesselsGroupRef.current) {
        gingaGroup.position.x = 12 + Math.sin(elapsed * 0.5) * 2;
        gingaGroup.position.z = -14 + Math.cos(elapsed * 0.5) * 2;
        voyagerGroup.rotation.y += delta * 0.1;
        jwstGroup.rotation.x += delta * 0.05;
      }

      // Dinâmica de Voo e Movimentação da Nave do Jogador
      if (spacecraftGroupRef.current) {
        const ship = spacecraftGroupRef.current;

        if (flightStage === 'land') {
          // No nível de pouso, a nave desce em direção à superfície sob gravidade
          if (ship.position.y > -2.2) {
            const grav = 1.2;
            const thrustUp = isThrusting ? 2.4 : 0;
            const netY = thrustUp - grav;
            ship.position.y += netY * delta;
            setVerticalSpeed(Math.max(0, +(grav * 2.5 - thrustUp * 1.5).toFixed(1)));
            setAltitudeKm((alt) => Math.max(0, +(alt - delta * 40).toFixed(0)));
          } else {
            // Toque no solo
            if (!touchdownSuccess && !touchdownCrashed) {
              if (verticalSpeed <= 4.0) {
                setTouchdownSuccess(true);
                playSound('touchdown', soundEnabled);
                setCompletedObjectives((prev) => ({ ...prev, land: true }));
              } else {
                setTouchdownCrashed(true);
                setShipHealth((h) => Math.max(0, h - 45));
                playSound('warning', soundEnabled);
              }
            }
          }
        } else {
          // Flutuação em órbita ou cruzeiro
          ship.position.y = Math.sin(elapsed * 1.5) * 0.15;
          if (!isThrusting && cameraMode === 'free') {
            ship.rotation.y += delta * 0.08;
          }
        }

        // Animação dos jatos de chama dos propulsores
        thrusterPlumesRef.current.forEach((plume) => {
          if (plume) {
            plume.scale.set(
              1 + Math.sin(elapsed * 28) * 0.35,
              isThrusting ? (1.5 + Math.cos(elapsed * 32) * 0.8) : 0.01,
              1 + Math.sin(elapsed * 28) * 0.35
            );
          }
        });

        // Efeito de Linhas de Hiperespaço
        if (warpLinesRef.current) {
          warpLinesRef.current.material.opacity = isWarping ? 0.8 : 0.0;
          if (isWarping) {
            warpLinesRef.current.rotation.z += delta * 2;
          }
        }

        // Gestão de Câmara (Chase vs Cockpit vs Livre)
        if (cameraMode === 'chase' && cameraRef.current) {
          camera.position.x = ship.position.x;
          camera.position.y = ship.position.y + 3.2;
          camera.position.z = ship.position.z + 10;
          controls.target.copy(ship.position);
        } else if (cameraMode === 'cockpit' && cameraRef.current) {
          camera.position.x = ship.position.x;
          camera.position.y = ship.position.y + 0.9;
          camera.position.z = ship.position.z - 0.2;
          controls.target.set(ship.position.x, ship.position.y + 0.9, ship.position.z - 15);
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
    };
  }, [missionConfig.universe]);

  // ==========================================================================
  // CONSTRUÇÃO PROCEDURAL DA NAVE / ROVER / LANDER
  // ==========================================================================
  const buildSpacecraftModel = useCallback(() => {
    const group = spacecraftGroupRef.current;
    if (!group) return;

    while (group.children.length > 0) group.remove(group.children[0]);
    thrusterPlumesRef.current = [];
    rcsPuffsRef.current = [];

    const isRover = missionConfig.type === 'rover';
    const isLander = missionConfig.type === 'lander';
    const dishDiameter = missionConfig.comms.antenna === 'high' ? 2.4 : missionConfig.comms.antenna === 'medium' ? 1.4 : 0.6;
    const panelAreaM2 = missionConfig.power.panelArea || 5;

    const goldFoilMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.25, metalness: 0.9 });
    const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.45, metalness: 0.7 });
    const solarCellMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.15, metalness: 0.92 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.1, metalness: 0.95 });

    if (isRover) {
      // Chassi Robótico do Rover
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 1.6), goldFoilMat);
      group.add(chassis);
      // 6 Rodas Articuladas
      const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 16);
      [
        [1.0, -0.6, 1.1], [0, -0.6, 1.2], [-1.0, -0.6, 1.1],
        [1.0, -0.6, -1.1], [0, -0.6, -1.2], [-1.0, -0.6, -1.1],
      ].forEach((p) => {
        const w = new THREE.Mesh(wheelGeo, darkMetalMat);
        w.rotation.x = Math.PI / 2;
        w.position.set(...p);
        group.add(w);
      });
      // Mastro de câmara estereoscópica
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.5, 12), chromeMat);
      mast.position.set(0.8, 1.0, 0);
      group.add(mast);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.25, 0.5), darkMetalMat);
      head.position.set(0.8, 1.75, 0);
      group.add(head);
    } else if (isLander) {
      // Corpo Octogonal do Módulo de Pouso (Lander)
      const landerBus = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 1.2, 8), goldFoilMat);
      group.add(landerBus);
      // 4 Pernas Articuladas de Aterragem
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.6), chromeMat);
        leg.rotation.z = 0.55;
        leg.rotation.y = angle;
        leg.position.set(Math.cos(angle) * 1.5, -0.8, Math.sin(angle) * 1.5);
        group.add(leg);
      }
      // Motor de descida
      const descentEngine = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.5, 0.6, 16), darkMetalMat);
      descentEngine.position.set(0, -0.8, 0);
      group.add(descentEngine);
      const plume = new THREE.Mesh(
        new THREE.ConeGeometry(0.3, 1.6, 16),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: isThrusting ? 0.9 : 0.0 })
      );
      plume.rotation.x = Math.PI;
      plume.position.set(0, -1.6, 0);
      group.add(plume);
      thrusterPlumesRef.current.push(plume);
    } else {
      // Sonda Orbital (Orbiter)
      const bus = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 2.0, 6), goldFoilMat);
      group.add(bus);

      // Asas de Painéis Solares
      const wingLength = 1.6 + panelAreaM2 * 0.35;
      const wingGeo = new THREE.BoxGeometry(wingLength, 0.05, 0.95);
      const lWing = new THREE.Mesh(wingGeo, solarCellMat);
      lWing.position.set(-1.2 - wingLength / 2, 0, 0);
      group.add(lWing);

      const rWing = new THREE.Mesh(wingGeo, solarCellMat);
      rWing.position.set(1.2 + wingLength / 2, 0, 0);
      group.add(rWing);

      // Antena Parabólica de Alto Ganho com sub-refletor
      const dishGeo = new THREE.SphereGeometry(dishDiameter * 0.55, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2.2);
      const dish = new THREE.Mesh(dishGeo, chromeMat);
      dish.rotation.x = -Math.PI / 2;
      dish.position.set(0, 1.25, 0.4);
      group.add(dish);

      // Bico do Motor Principal
      const engine = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.6, 0.9, 16, 1, true), darkMetalMat);
      engine.position.set(0, -1.4, 0);
      group.add(engine);

      // Labareda de Propulsão Interativa
      const plume = new THREE.Mesh(
        new THREE.ConeGeometry(0.35, 1.8, 16),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: isThrusting ? 0.9 : 0.0 })
      );
      plume.rotation.x = Math.PI;
      plume.position.set(0, -2.3, 0);
      group.add(plume);
      thrusterPlumesRef.current.push(plume);
    }
  }, [missionConfig, isThrusting]);

  useEffect(() => {
    buildSpacecraftModel();
  }, [buildSpacecraftModel]);

  // Alternar a visibilidade de corpos celestes conforme o nível selecionado
  useEffect(() => {
    if (earthMeshRef.current) earthMeshRef.current.visible = flightStage === 'earth';
    if (planetMeshRef.current) planetMeshRef.current.visible = flightStage === 'orbit' || flightStage === 'land';
    if (otherVesselsGroupRef.current) otherVesselsGroupRef.current.visible = flightStage === 'cruise';
    if (asteroidFieldRef.current) asteroidFieldRef.current.visible = flightStage === 'cruise';
    if (surfaceTerrainRef.current) surfaceTerrainRef.current.visible = flightStage === 'land';

    if (flightStage === 'cruise') {
      setActiveEncounter(fleetVessels[0]);
    } else {
      setActiveEncounter(null);
      setEncounterMessage(null);
    }
  }, [flightStage]);

  // ==========================================================================
  // CONTROLOS DE PILOTAGEM DA NAVE
  // ==========================================================================

  // Aceleração / Impulso Principal
  const triggerThrust = useCallback(() => {
    if (propellantRemaining <= 0) return;
    playSound('thrust', soundEnabled);
    setIsThrusting(true);
    setPropellantRemaining((p) => Math.max(0, p - 30));
    setBatteryLevel((b) => Math.max(10, b - 1));
    setVelocityKmS((v) => +(v + 0.22).toFixed(2));
    setAltitudeKm((a) => a + 15);

    if (flightStage === 'earth' && velocityKmS >= 7.8) {
      setCompletedObjectives((prev) => ({ ...prev, earth: true }));
    }

    setTimeout(() => {
      setIsThrusting(false);
    }, 600);
  }, [propellantRemaining, soundEnabled, flightStage, velocityKmS]);

  // Retro-Queima / Frenagem
  const triggerRetro = useCallback(() => {
    if (propellantRemaining <= 0) return;
    playSound('warning', soundEnabled);
    setIsThrusting(true);
    setPropellantRemaining((p) => Math.max(0, p - 20));
    setVelocityKmS((v) => Math.max(1.0, +(v - 0.35).toFixed(2)));

    if (flightStage === 'orbit') {
      setCompletedObjectives((prev) => ({ ...prev, orbit: true }));
    }

    setTimeout(() => {
      setIsThrusting(false);
    }, 500);
  }, [propellantRemaining, soundEnabled, flightStage]);

  // Queima Máxima / Salto de Warp (Hiperespaço)
  const triggerWarp = useCallback(() => {
    if (propellantRemaining <= 100) return;
    playSound('warp', soundEnabled);
    setIsWarping(true);
    setIsThrusting(true);
    setPropellantRemaining((p) => Math.max(0, p - 80));
    setVelocityKmS((v) => +(v + 2.4).toFixed(2));

    setTimeout(() => {
      setIsWarping(false);
      setIsThrusting(false);
    }, 1200);
  }, [propellantRemaining, soundEnabled]);

  // Rotação de Atitude (Guinada para Esquerda / Direita)
  const rotateShip = useCallback((dir) => {
    if (!spacecraftGroupRef.current) return;
    playSound('click', soundEnabled);
    spacecraftGroupRef.current.rotation.y += dir * 0.15;
  }, [soundEnabled]);

  // Arfagem (Inclinação do Nariz para Cima / Baixo)
  const pitchShip = useCallback((dir) => {
    if (!spacecraftGroupRef.current) return;
    playSound('click', soundEnabled);
    spacecraftGroupRef.current.rotation.x += dir * 0.15;
  }, [soundEnabled]);

  // Varrimento com Scanner Científico
  const triggerScienceScan = useCallback(() => {
    playSound('scanner', soundEnabled);
    const pts = 30;
    setCollectedScience((s) => s + pts);
    if (onScienceBonus) onScienceBonus(pts);
  }, [soundEnabled, onScienceBonus]);

  // Comunicação de Rádio com Outra Nave da Frota
  const handleHailProbe = () => {
    if (!activeEncounter) return;
    playSound('radio', soundEnabled);
    const msg = activeEncounter.msg[lang] || activeEncounter.msg.pt;
    setEncounterMessage(msg);
    setHailCompleted(true);
    setCollectedScience((s) => s + activeEncounter.pts);
    setCompletedObjectives((prev) => ({ ...prev, cruise: true }));
    if (onScienceBonus) onScienceBonus(activeEncounter.pts);
  };

  // Coletar Amostra de Solo no Pouso
  const handleTakeSample = () => {
    playSound('success', soundEnabled);
    setSampleCollected(true);
    setCollectedScience((s) => s + 50);
    if (onScienceBonus) onScienceBonus(50);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  // Cravar Bandeira no Planeta
  const handlePlantFlag = () => {
    playSound('touchdown', soundEnabled);
    setFlagPlanted(true);
    setCollectedScience((s) => s + 60);
    if (onScienceBonus) onScienceBonus(60);
    confetti({ particleCount: 90, spread: 90, origin: { y: 0.6 } });
  };

  // Comandos de Teclado (WASD, Setas, Espaço, Q, E, R, F, C)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
        e.preventDefault();
        triggerThrust();
      } else if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
        e.preventDefault();
        triggerRetro();
      } else if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        e.preventDefault();
        rotateShip(-1);
      } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        e.preventDefault();
        rotateShip(1);
      } else if (e.key === 'q' || e.key === 'Q') {
        e.preventDefault();
        pitchShip(-1);
      } else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        pitchShip(1);
      } else if (e.key === ' ') {
        e.preventDefault();
        triggerWarp();
      } else if (e.key === 'r' || e.key === 'R') {
        triggerScienceScan();
      } else if (e.key === 'c' || e.key === 'C') {
        setCameraMode((m) => m === 'chase' ? 'cockpit' : m === 'cockpit' ? 'free' : 'chase');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerThrust, triggerRetro, triggerWarp, rotateShip, pitchShip, triggerScienceScan]);

  return (
    <div className="relative w-full h-[640px] sm:h-[700px] rounded-3xl overflow-hidden border border-cyan-500/40 bg-slate-950 shadow-[0_0_60px_rgba(56,189,248,0.25)] select-none">
      
      {/* 1. Canvas Three.js WebGL */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 2. HUD SUPERIOR: SELETOR DE NÍVEIS + CÂMARAS + VITAIS */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Seletor dos 4 Níveis de Voo Espacial */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-2xl font-mono text-xs">
          <button
            onClick={() => { setFlightStage('earth'); playSound('click', soundEnabled); }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              flightStage === 'earth' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('game_mode_earth')}
          </button>
          <button
            onClick={() => { setFlightStage('cruise'); playSound('click', soundEnabled); }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              flightStage === 'cruise' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('game_mode_cruise')}
          </button>
          <button
            onClick={() => { setFlightStage('orbit'); playSound('click', soundEnabled); }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              flightStage === 'orbit' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('game_mode_orbit')}
          </button>
          <button
            onClick={() => { setFlightStage('land'); playSound('click', soundEnabled); }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              flightStage === 'land' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('game_mode_land')}
          </button>
        </div>

        {/* Alternador de Câmaras (Chase / Cockpit / Livre) */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono backdrop-blur-md">
          <button
            onClick={() => { setCameraMode('chase'); playSound('click', soundEnabled); }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              cameraMode === 'chase' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('game_camera_chase')}
          </button>
          <button
            onClick={() => { setCameraMode('cockpit'); playSound('click', soundEnabled); }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              cameraMode === 'cockpit' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('game_camera_cockpit')}
          </button>
          <button
            onClick={() => { setCameraMode('free'); playSound('click', soundEnabled); }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              cameraMode === 'free' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t('game_camera_orbit')}
          </button>
        </div>

        {/* Indicadores Vitais da Nave: Vida, Combustível, Pontos de Ciência */}
        <div className="pointer-events-auto flex items-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md text-xs font-mono shadow-2xl">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-rose-950/70 text-rose-300 border border-rose-500/30">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{t('game_ship_hull')} {shipHealth}%</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
            <Flame className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('game_propellant')} {propellantRemaining} m/s</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-950/70 text-amber-300 border border-amber-500/30">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('game_battery_level')} {batteryLevel}%</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-purple-950/70 text-purple-300 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>+{collectedScience} pts</span>
          </div>
        </div>

      </div>

      {/* 3. COCKPIT HUD OVERLAY (VISOR EM 1ª PESSOA) */}
      {cameraMode === 'cockpit' && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Mira reticular central de navegação */}
          <div className="relative w-48 h-48 border border-cyan-400/20 rounded-full flex items-center justify-center">
            <Crosshair className="w-8 h-8 text-cyan-400/70 animate-pulse" />
            <div className="absolute top-2 text-[10px] font-mono text-cyan-300">VEL: {velocityKmS} km/s</div>
            <div className="absolute bottom-2 text-[10px] font-mono text-cyan-300">ALT: {altitudeKm} km</div>
            <div className="absolute left-2 text-[9px] font-mono text-slate-400">PITCH 0°</div>
            <div className="absolute right-2 text-[9px] font-mono text-slate-400">YAW 180°</div>
          </div>
        </div>
      )}

      {/* 4. PAINEL DE OBJETIVOS ATIVOS DA MISSÃO */}
      <div className="absolute top-20 right-4 max-w-xs p-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-xl backdrop-blur-md text-left font-mono text-xs pointer-events-auto">
        <div className="text-[10px] uppercase text-cyan-400 font-bold mb-2 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5" />
          <span>{t('game_level_objectives_title')}</span>
        </div>
        <div className="space-y-1.5 text-[11px] text-slate-300">
          <div className={`flex items-start gap-1.5 ${completedObjectives.earth ? 'text-emerald-400 line-through' : ''}`}>
            <span>{completedObjectives.earth ? '✓' : '○'}</span>
            <span>{t('obj_earth_orbit')}</span>
          </div>
          <div className={`flex items-start gap-1.5 ${completedObjectives.cruise ? 'text-emerald-400 line-through' : ''}`}>
            <span>{completedObjectives.cruise ? '✓' : '○'}</span>
            <span>{t('obj_deep_space_contact')}</span>
          </div>
          <div className={`flex items-start gap-1.5 ${completedObjectives.orbit ? 'text-emerald-400 line-through' : ''}`}>
            <span>{completedObjectives.orbit ? '✓' : '○'}</span>
            <span>{t('obj_planetary_insertion')}</span>
          </div>
          <div className={`flex items-start gap-1.5 ${completedObjectives.land ? 'text-emerald-400 line-through' : ''}`}>
            <span>{completedObjectives.land ? '✓' : '○'}</span>
            <span>{t('obj_surface_landing')}</span>
          </div>
        </div>
      </div>

      {/* 5. DIÁLOGO DO RADAR DE ENCONTRO NO ESPAÇO PROFUNDO */}
      {flightStage === 'cruise' && activeEncounter && (
        <div className="absolute top-20 left-4 max-w-sm p-4 rounded-2xl bg-slate-900/95 border border-cyan-400/40 shadow-2xl backdrop-blur-md space-y-2.5 text-left font-mono text-xs pointer-events-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>{t('game_radar_vessels')}</span>
            </div>
            <span className="text-[10px] text-slate-400">{activeEncounter.dist}</span>
          </div>

          <div className="text-white font-semibold text-sm">
            {activeEncounter.name}
          </div>
          <div className="text-[10px] text-slate-400">
            Piloto: {activeEncounter.pilot}
          </div>

          <button
            onClick={handleHailProbe}
            className="w-full py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{hailCompleted ? '✓ ' + t('game_hail_probe') : t('game_hail_probe')}</span>
          </button>

          {encounterMessage && (
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-200 text-[11px] leading-relaxed">
              {encounterMessage}
            </div>
          )}
        </div>
      )}

      {/* 6. NOTIFICAÇÕES DE POUSO NA SUPERFÍCIE & AÇÕES */}
      {flightStage === 'land' && touchdownSuccess && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 p-4 rounded-2xl bg-slate-900/95 border-2 border-emerald-400 text-emerald-300 shadow-[0_0_40px_rgba(16,185,129,0.4)] backdrop-blur-md flex flex-col items-center gap-3 font-mono text-xs pointer-events-auto">
          <div className="flex items-center gap-2 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{t('game_touchdown_ready')}</span>
          </div>

          <div className="flex items-center gap-2">
            {!sampleCollected ? (
              <button
                onClick={handleTakeSample}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all cursor-pointer"
              >
                {t('game_take_sample_btn')}
              </button>
            ) : (
              <span className="text-purple-300 text-[11px]">✓ {t('game_sample_collected')}</span>
            )}

            {!flagPlanted ? (
              <button
                onClick={handlePlantFlag}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{t('game_plant_flag_btn')}</span>
              </button>
            ) : (
              <span className="text-amber-300 text-[11px]">✓ {t('game_flag_planted')}</span>
            )}
          </div>
        </div>
      )}

      {flightStage === 'land' && touchdownCrashed && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-rose-950/95 border-2 border-rose-500 text-rose-300 shadow-2xl backdrop-blur-md flex items-center gap-3 font-mono text-sm font-bold pointer-events-auto">
          <AlertOctagon className="w-6 h-6 text-rose-500" />
          <span>{t('game_touchdown_crash')}</span>
        </div>
      )}

      {/* 7. DOCK INFERIOR DE PILOTAGEM (TOUCH & BOTÕES) */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl transition-transform duration-300 pointer-events-auto ${
        isDockCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
      }`}>
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => { playSound('click', soundEnabled); setIsDockCollapsed(!isDockCollapsed); }}
            className="px-4 py-1.5 rounded-t-xl bg-slate-900 border-t border-x border-cyan-500/30 text-[11px] font-mono text-cyan-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>{t('game_dock_expand')}</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>{t('game_dock_collapse')}</span>
              </>
            )}
          </button>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/30 bg-slate-900/95 shadow-2xl space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            {/* Controles de Propulsor e Manobras */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={triggerThrust}
                disabled={propellantRemaining <= 0}
                className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 disabled:opacity-40"
              >
                <Flame className="w-4 h-4 text-white" />
                <span>{t('game_thrust_btn')}</span>
              </button>

              <button
                onClick={triggerRetro}
                disabled={propellantRemaining <= 0}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all cursor-pointer active:scale-95 disabled:opacity-40"
              >
                {t('game_retro_btn')}
              </button>

              <button
                onClick={triggerWarp}
                disabled={propellantRemaining <= 100}
                className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95 disabled:opacity-40"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>WARP BOOST [ESPAÇO]</span>
              </button>

              <button
                onClick={triggerScienceScan}
                className="px-3.5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
              >
                <Radio className="w-4 h-4" />
                <span>{t('game_scan_btn')}</span>
              </button>
            </div>

            {/* Teclas de Ajuda de Navegação */}
            <div className="text-[11px] text-slate-400 font-mono hidden md:block">
              {t('game_controls_thrust')}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
