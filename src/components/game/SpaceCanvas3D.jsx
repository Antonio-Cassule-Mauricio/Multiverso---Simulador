// ============================================================================
// COMPONENTE 3D: SpaceCanvas3D (Simulador e Jogo de Missões Reais da NASA 3D)
// Responsabilidade: Simulação 3D imersiva e interativa das missões históricas
// e modernas da NASA:
// 1. Apollo 11: Pouso Lunar do Módulo Eagle em Mare Tranquillitatis
// 2. ISS: Rendezvous e Acoplagem Orbital na Estação Espacial Internacional
// 3. Mars 2020: Pouso, condução do Rover Perseverance e voo do drone Ingenuity
// 4. Europa Clipper: Assistência gravitacional em Júpiter e sondagem do oceano
//
// Inclui física em tempo real, múltiplos sítios de pouso, piloto automático SAS,
// auxílio de pouso suave, painel de comandos táteis na tela, relógio MET,
// visualizador de transferência de Hohmann e caderneta de medalhas da NASA.
// Sem confetes invasivos que obstruam a visão ou a leitura do utilizador.
// Comentários: Todos em Português conforme solicitado pela equipa.
// ============================================================================

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Compass, Shield, Flame, Radio, Eye, 
  Sparkles, CheckCircle2, Flag, FlaskConical,
  Award, Zap, Target,
  ArrowUp, ArrowLeft, ArrowRight
} from 'lucide-react';
import { playSound } from '../../utils/audio';
import { nasaGameMissions } from '../../data/gameMissions';
import TrajectoryOrbitModal from './TrajectoryOrbitModal';
import AstronautLogbookModal from './AstronautLogbookModal';

export default function SpaceCanvas3D({
  soundEnabled = true,
  onOpenCertificate,
}) {
  const mountRef = useRef(null);

  // Missão da NASA ativa no momento (Apollo 11, ISS, Mars 2020, Europa Clipper)
  const [selectedMissionId, setSelectedMissionId] = useState('apollo11');
  const currentMission = nasaGameMissions.find((m) => m.id === selectedMissionId) || nasaGameMissions[0];

  // Sítio de pouso selecionado dentro da missão
  const [selectedSiteId, setSelectedSiteId] = useState(currentMission.landingSites[0].id);

  // Modo de controlo do jogador: 'flight' (nave no espaço) | 'rover' (conduzir rover) | 'drone' (voar Ingenuity)
  const [playerControlMode, setPlayerControlMode] = useState('flight');

  // Modo de câmara: 'chase' (3ª pessoa) | 'cockpit' (1ª pessoa com HUD) | 'orbit' (livre)
  const [cameraMode, setCameraMode] = useState('chase');

  // Sistemas de Voo da NASA: SAS (Estabilização Giroscópica) e Auxílio de Pouso Suave
  const [sasEnabled, setSasEnabled] = useState(true);
  const [autoHoverEnabled, setAutoHoverEnabled] = useState(false);

  // Indicadores de Voo e Voo Espacial
  const [hullIntegrity, setHullIntegrity] = useState(100);
  const [fuelPercentage, setFuelPercentage] = useState(100);
  const [verticalVelocity, setVerticalVelocity] = useState(0);
  const [horizontalSpeed, setHorizontalSpeed] = useState(0);
  const [currentAltitude, setCurrentAltitude] = useState(1200); // metros
  const [sciencePoints, setSciencePoints] = useState(0);

  // Relógio MET (Mission Elapsed Time da NASA)
  const [metSeconds, setMetSeconds] = useState(0);

  // Estados de Missão
  const [touchdownOccurred, setTouchdownOccurred] = useState(false);
  const [touchdownSuccess, setTouchdownSuccess] = useState(false);
  const [dockingSuccess, setDockingSuccess] = useState(false);
  const [flagPlanted, setFlagPlanted] = useState(false);
  const [sampleCollected, setSampleCollected] = useState(false);
  const [radioTransmission, setRadioTransmission] = useState(null);

  // Notificação elegante de conquista (substitui confetes invasivos para nunca obstruir a leitura)
  const [badgeToast, setBadgeToast] = useState(null);

  // Modais de Trajetória e Caderneta de Voo
  const [isTrajectoryModalOpen, setIsTrajectoryModalOpen] = useState(false);
  const [isLogbookModalOpen, setIsLogbookModalOpen] = useState(false);

  // Objetivos cumpridos da missão ativa
  const [completedObjectiveIds, setCompletedObjectiveIds] = useState([]);

  // Referências mutáveis para o loop de física e animação sem re-renderizar
  const animFrameRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  // Entidades 3D da cena
  const playerVehicleRef = useRef(null);
  const issStationRef = useRef(null);
  const enginePlumeRef = useRef(null);
  const droneGroupRef = useRef(null);

  // Vetores de movimento e física da nave
  const velocityRef = useRef(new THREE.Vector3(0, -2.5, -4.0));
  const positionRef = useRef(new THREE.Vector3(0, 30, 0));
  const rotationRef = useRef(new THREE.Euler(0, 0, 0));
  const isThrustingRef = useRef(false);
  const isRCSLeftRef = useRef(false);
  const isRCSRightRef = useRef(false);
  const isBrakingRef = useRef(false);

  // Atualização do relógio de missão (Mission Elapsed Time)
  useEffect(() => {
    const timer = setInterval(() => {
      setMetSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatação do MET em formato NASA: T+ 00:04:12
  const formatMET = (totalSec) => {
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `T+ 00:${m}:${s}`;
  };

  // Marcar objetivo como cumprido com notificação limpa e elegante (sem cobrir o ecrã)
  const markObjectiveComplete = useCallback((objId, reward, title = 'Objetivo Cumprido') => {
    setCompletedObjectiveIds((prev) => {
      if (prev.includes(objId)) return prev;
      playSound('success', soundEnabled);
      setSciencePoints((pts) => pts + reward);

      // Exibir toast elegante no canto superior sem tapar o jogo
      setBadgeToast({
        title,
        reward,
      });
      setTimeout(() => {
        setBadgeToast(null);
      }, 3500);

      return [...prev, objId];
    });
  }, [soundEnabled]);

  // Reiniciar estado ao trocar de missão da NASA
  const handleSelectMission = (missionId) => {
    playSound('warp', soundEnabled);
    setSelectedMissionId(missionId);
    const mission = nasaGameMissions.find((m) => m.id === missionId);
    if (mission) {
      setSelectedSiteId(mission.landingSites[0].id);
      setFuelPercentage(mission.initialFuel);
    }
    setPlayerControlMode('flight');
    setHullIntegrity(100);
    setTouchdownOccurred(false);
    setTouchdownSuccess(false);
    setDockingSuccess(false);
    setFlagPlanted(false);
    setSampleCollected(false);
    setCompletedObjectiveIds([]);
    setRadioTransmission(null);
    setAutoHoverEnabled(false);
    setMetSeconds(0);

    // Reposicionar nave
    if (positionRef.current) {
      positionRef.current.set(0, missionId === 'iss_docking' ? 5 : 45, missionId === 'iss_docking' ? 40 : 0);
      velocityRef.current.set(0, missionId === 'iss_docking' ? 0 : -2.0, missionId === 'iss_docking' ? -0.8 : -3.0);
      rotationRef.current.set(0, 0, 0);
    }
  };

  // ============================================================================
  // CRIAÇÃO E RENDERIZAÇÃO DO MUNDO 3D (Three.js)
  // ============================================================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 560;

    // 1. Cena com nevoeiro espacial subtil
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030712, 0.0006);

    // 2. Câmara de Perspetiva
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 8000);
    cameraRef.current = camera;
    camera.position.set(0, 20, 50);

    // 3. Renderizador WebGL de alta qualidade
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.replaceChildren(renderer.domElement);

    // 4. Luzes: Sol Cósmico Direcional e Luz Ambiente
    const ambientLight = new THREE.AmbientLight(0x334155, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8eb, 3.5);
    sunLight.position.set(250, 300, 180);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Luz de preenchimento azul suave da Terra/Planeta
    const planetBounceLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    planetBounceLight.position.set(-150, -100, -100);
    scene.add(planetBounceLight);

    // 5. Campo de Estrelas Cósmico
    const starGeo = new THREE.BufferGeometry();
    const starCount = 4000;
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 5000;
      starPos[i + 1] = (Math.random() - 0.5) * 5000;
      starPos[i + 2] = (Math.random() - 0.5) * 5000;

      const temp = Math.random();
      if (temp > 0.8) {
        starCol[i] = 1.0; starCol[i + 1] = 0.8; starCol[i + 2] = 0.7; // Alaranjada
      } else if (temp > 0.4) {
        starCol[i] = 0.8; starCol[i + 1] = 0.9; starCol[i + 2] = 1.0; // Azulada
      } else {
        starCol[i] = 1.0; starCol[i + 1] = 1.0; starCol[i + 2] = 1.0; // Branca
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 6. Construção dos Ambientes Específicos para cada Missão
    const isMoon = selectedMissionId === 'apollo11';
    const isISS = selectedMissionId === 'iss_docking';
    const isMars = selectedMissionId === 'mars2020';
    const isEuropa = selectedMissionId === 'europa_clipper';

    // A) TERRENO DO CORPO CELESTE (LUA / MARTE / EUROPA)
    if (!isISS) {
      let groundColor = 0x94a3b8; // Lua cinzenta
      let groundRoughness = 0.95;
      if (isMars) groundColor = 0xc2410c; // Marte avermelhado
      if (isEuropa) { groundColor = 0x38bdf8; groundRoughness = 0.3; } // Europa gelo vítreo

      const terrainGeo = new THREE.PlaneGeometry(1600, 1600, 64, 64);
      const posAttr = terrainGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const vx = posAttr.getX(i);
        const vy = posAttr.getY(i);
        const dCenter = Math.sqrt(vx * vx + vy * vy);
        let bump = Math.sin(vx * 0.02) * Math.cos(vy * 0.02) * 4.5;
        if (dCenter < 80) bump *= 0.3; // Centro suave para zona de pouso
        posAttr.setZ(i, bump);
      }
      terrainGeo.computeVertexNormals();

      const terrainMat = new THREE.MeshStandardMaterial({
        color: groundColor,
        roughness: groundRoughness,
        metalness: isEuropa ? 0.4 : 0.1,
      });

      const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
      terrainMesh.rotation.x = -Math.PI / 2;
      terrainMesh.position.y = -20;
      terrainMesh.receiveShadow = true;
      scene.add(terrainMesh);

      // Adicionar rochas procedurais espalhadas na superfície
      const rockGeo = new THREE.DodecahedronGeometry(1.5, 1);
      const rockMat = new THREE.MeshStandardMaterial({ color: isMars ? 0x9a3412 : 0x64748b, roughness: 0.9 });
      for (let r = 0; r < 35; r++) {
        const rock = new THREE.Mesh(rockGeo, rockMat);
        rock.position.set((Math.random() - 0.5) * 300, -19.5, (Math.random() - 0.5) * 300);
        rock.scale.set(0.5 + Math.random(), 0.5 + Math.random(), 0.5 + Math.random());
        rock.castShadow = true;
        scene.add(rock);
      }
    }

    // B) ESTAÇÃO ESPACIAL INTERNACIONAL (ISS) EM 3D COMPLETO
    if (isISS) {
      const issGroup = new THREE.Group();

      const centralLabGeo = new THREE.CylinderGeometry(2.4, 2.4, 18, 16);
      const centralLabMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85, roughness: 0.25 });
      const centralLab = new THREE.Mesh(centralLabGeo, centralLabMat);
      centralLab.rotation.z = Math.PI / 2;
      issGroup.add(centralLab);

      const crossLabGeo = new THREE.CylinderGeometry(2.2, 2.2, 14, 16);
      const crossLab = new THREE.Mesh(crossLabGeo, centralLabMat);
      issGroup.add(crossLab);

      const trussGeo = new THREE.BoxGeometry(45, 0.8, 0.8);
      const trussMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7 });
      const truss = new THREE.Mesh(trussGeo, trussMat);
      truss.position.set(0, 3.5, 0);
      issGroup.add(truss);

      const solarPanelGeo = new THREE.BoxGeometry(10, 0.1, 4.5);
      const solarPanelMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.6, roughness: 0.2 });
      
      [-18, -12, 12, 18].forEach((xPos) => {
        const panelTop = new THREE.Mesh(solarPanelGeo, solarPanelMat);
        panelTop.position.set(xPos, 5.5, 0);
        issGroup.add(panelTop);

        const panelBottom = new THREE.Mesh(solarPanelGeo, solarPanelMat);
        panelBottom.position.set(xPos, 1.5, 0);
        issGroup.add(panelBottom);
      });

      const ringGeo = new THREE.TorusGeometry(1.4, 0.2, 16, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const dockRing = new THREE.Mesh(ringGeo, ringMat);
      dockRing.position.set(0, 0, 7.2);
      issGroup.add(dockRing);

      const beaconLight = new THREE.PointLight(0x38bdf8, 2, 35);
      beaconLight.position.set(0, 0, 8);
      issGroup.add(beaconLight);

      const earthGlobeGeo = new THREE.SphereGeometry(180, 64, 64);
      const earthGlobeMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.6 });
      const earthGlobe = new THREE.Mesh(earthGlobeGeo, earthGlobeMat);
      earthGlobe.position.set(0, -220, -100);
      scene.add(earthGlobe);

      issGroup.position.set(0, 10, -50);
      scene.add(issGroup);
      issStationRef.current = issGroup;
    }

    // C) PLANETA JÚPITER COM FAIXAS GASOSAS AO FUNDO (SE FOR EUROPA CLIPPER)
    if (isEuropa) {
      const jupiterGeo = new THREE.SphereGeometry(160, 64, 64);
      const jupiterMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 });
      const jupiterMesh = new THREE.Mesh(jupiterGeo, jupiterMat);
      jupiterMesh.position.set(220, 80, -400);
      scene.add(jupiterMesh);
    }

    // 7. CONSTRUÇÃO DA NAVE DO JOGADOR CONFORME A MISSÃO
    const playerGroup = new THREE.Group();
    playerVehicleRef.current = playerGroup;

    if (isMoon) {
      // --- MÓDULO LUNAR APOLLO 11 (LM EAGLE) ---
      const descentGeo = new THREE.CylinderGeometry(3.2, 3.8, 2.5, 8);
      const descentMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.3 });
      const descentStage = new THREE.Mesh(descentGeo, descentMat);
      descentStage.castShadow = true;
      playerGroup.add(descentStage);

      const ascentGeo = new THREE.BoxGeometry(2.6, 2.4, 2.6);
      const ascentMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.3 });
      const ascentStage = new THREE.Mesh(ascentGeo, ascentMat);
      ascentStage.position.y = 2.2;
      ascentStage.castShadow = true;
      playerGroup.add(ascentStage);

      const winGeo = new THREE.PlaneGeometry(0.6, 0.6);
      const winMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
      const winLeft = new THREE.Mesh(winGeo, winMat);
      winLeft.position.set(-0.6, 2.4, 1.31);
      playerGroup.add(winLeft);
      const winRight = new THREE.Mesh(winGeo, winMat);
      winRight.position.set(0.6, 2.4, 1.31);
      playerGroup.add(winRight);

      const legMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 });
      const padMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9 });

      [
        { x: 3.2, z: 3.2, rotZ: -0.4, rotX: 0.4 },
        { x: -3.2, z: 3.2, rotZ: 0.4, rotX: 0.4 },
        { x: 3.2, z: -3.2, rotZ: -0.4, rotX: -0.4 },
        { x: -3.2, z: -3.2, rotZ: 0.4, rotX: -0.4 },
      ].forEach((legCfg) => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.5), legMat);
        leg.position.set(legCfg.x * 0.7, -1.2, legCfg.z * 0.7);
        leg.rotation.z = legCfg.rotZ;
        leg.rotation.x = legCfg.rotX;
        leg.castShadow = true;
        playerGroup.add(leg);

        const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.15, 12), padMat);
        pad.position.set(legCfg.x * 1.05, -2.5, legCfg.z * 1.05);
        playerGroup.add(pad);
      });

    } else if (isISS) {
      // --- CÁPSULA TRIPULADA CREW DRAGON / ORION ---
      const capsuleGeo = new THREE.ConeGeometry(2.4, 4.5, 16);
      const capsuleMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.7, roughness: 0.2 });
      const capsule = new THREE.Mesh(capsuleGeo, capsuleMat);
      capsule.rotation.x = -Math.PI / 2;
      playerGroup.add(capsule);

      const noseRingGeo = new THREE.TorusGeometry(0.9, 0.15, 12, 24);
      const noseRingMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.9 });
      const noseRing = new THREE.Mesh(noseRingGeo, noseRingMat);
      noseRing.position.set(0, 0, -2.4);
      playerGroup.add(noseRing);

    } else if (isMars) {
      // --- ROVER PERSEVERANCE & SKYCRANE ---
      const roverBodyGeo = new THREE.BoxGeometry(3.0, 1.4, 4.2);
      const roverBodyMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.8, roughness: 0.3 });
      const roverBody = new THREE.Mesh(roverBodyGeo, roverBodyMat);
      roverBody.castShadow = true;
      playerGroup.add(roverBody);

      const mastGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.5);
      const mastMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
      const mast = new THREE.Mesh(mastGeo, mastMat);
      mast.position.set(0.8, 1.6, -1.2);
      playerGroup.add(mast);

      const camHeadGeo = new THREE.BoxGeometry(0.8, 0.5, 0.6);
      const camHeadMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
      const camHead = new THREE.Mesh(camHeadGeo, camHeadMat);
      camHead.position.set(0.8, 2.8, -1.2);
      playerGroup.add(camHead);

      const wheelGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.6, 16);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.4 });

      [-1.8, 1.8].forEach((wx) => {
        [-1.4, 0, 1.4].forEach((wz) => {
          const wheel = new THREE.Mesh(wheelGeo, wheelMat);
          wheel.rotation.z = Math.PI / 2;
          wheel.position.set(wx, -0.9, wz);
          wheel.castShadow = true;
          playerGroup.add(wheel);
        });
      });

      const rtgGeo = new THREE.CylinderGeometry(0.6, 0.6, 1.2, 12);
      const rtgMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8 });
      const rtg = new THREE.Mesh(rtgGeo, rtgMat);
      rtg.rotation.x = Math.PI / 2;
      rtg.position.set(0, 0.5, 2.4);
      playerGroup.add(rtg);

      const droneGroup = new THREE.Group();
      droneGroupRef.current = droneGroup;
      const droneBodyGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const droneBodyMat = new THREE.MeshStandardMaterial({ color: 0xd97706 });
      const droneBody = new THREE.Mesh(droneBodyGeo, droneBodyMat);
      droneGroup.add(droneBody);

      const bladeGeo = new THREE.BoxGeometry(2.4, 0.05, 0.2);
      const bladeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const blade1 = new THREE.Mesh(bladeGeo, bladeMat);
      blade1.position.y = 0.6;
      droneGroup.add(blade1);
      const blade2 = new THREE.Mesh(bladeGeo, bladeMat);
      blade2.position.y = 0.8;
      droneGroup.add(blade2);

      droneGroup.position.set(-3.5, -0.8, 0);
      playerGroup.add(droneGroup);

    } else {
      // --- SONDA EUROPA CLIPPER ---
      const clipperGeo = new THREE.BoxGeometry(2.8, 2.8, 3.2);
      const clipperMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.85 });
      const clipper = new THREE.Mesh(clipperGeo, clipperMat);
      playerGroup.add(clipper);

      const bigWingGeo = new THREE.BoxGeometry(14, 0.1, 2.5);
      const bigWingMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.7 });
      const leftWing = new THREE.Mesh(bigWingGeo, bigWingMat);
      leftWing.position.set(-8.5, 0, 0);
      playerGroup.add(leftWing);
      const rightWing = new THREE.Mesh(bigWingGeo, bigWingMat);
      rightWing.position.set(8.5, 0, 0);
      playerGroup.add(rightWing);

      const dishGeo = new THREE.SphereGeometry(2.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2.8);
      const dishMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.8, side: THREE.DoubleSide });
      const dish = new THREE.Mesh(dishGeo, dishMat);
      dish.position.set(0, 1.8, -1.8);
      dish.rotation.x = Math.PI / 3;
      playerGroup.add(dish);
    }

    // Pluma de Propulsão Incandescente (Fogo do Foguetão)
    const plumeGeo = new THREE.ConeGeometry(1.2, 5.0, 16);
    const plumeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.0,
    });
    const plume = new THREE.Mesh(plumeGeo, plumeMat);
    plume.position.y = -3.8;
    plume.rotation.x = Math.PI;
    playerGroup.add(plume);
    enginePlumeRef.current = plume;

    // Posicionamento inicial da nave no espaço
    playerGroup.position.copy(positionRef.current);
    scene.add(playerGroup);

    // 8. CONTROLOS DE TECLADO INTERATIVOS (WASD, Setas, Espaço, R, F, C, H)
    const keyState = {};

    const onKeyDown = (e) => {
      keyState[e.code] = true;

      if (e.code === 'KeyW' || e.code === 'ArrowUp') {
        isThrustingRef.current = true;
        playSound('thrust', soundEnabled);
      }
      if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        isBrakingRef.current = true;
        playSound('rcs', soundEnabled);
      }
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        isRCSLeftRef.current = true;
        playSound('rcs', soundEnabled);
      }
      if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        isRCSRightRef.current = true;
        playSound('rcs', soundEnabled);
      }
      if (e.code === 'Space') {
        isThrustingRef.current = true;
        playSound('launch', soundEnabled);
      }
      if (e.code === 'KeyC') {
        setCameraMode((prev) => (prev === 'chase' ? 'cockpit' : prev === 'cockpit' ? 'orbit' : 'chase'));
        playSound('click', soundEnabled);
      }
      if (e.code === 'KeyR') {
        triggerScienceScan();
      }
    };

    const onKeyUp = (e) => {
      keyState[e.code] = false;
      if (e.code === 'KeyW' || e.code === 'ArrowUp' || e.code === 'Space') {
        isThrustingRef.current = false;
      }
      if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        isBrakingRef.current = false;
      }
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        isRCSLeftRef.current = false;
      }
      if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        isRCSRightRef.current = false;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // 9. LOOP DE FÍSICA E ANIMAÇÃO DA SIMULAÇÃO (60 FPS)
    let clock = new THREE.Clock();

    const animateLoop = () => {
      animFrameRef.current = requestAnimationFrame(animateLoop);
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      stars.rotation.y += 0.0003;

      if (issStationRef.current) {
        issStationRef.current.rotation.y += 0.001;
      }

      // FÍSICA DE VOO DA NAVE
      const pos = positionRef.current;
      const vel = velocityRef.current;
      const rot = rotationRef.current;

      // Controlo de Guinada e Rotação
      if (isRCSLeftRef.current) {
        rot.y += 1.8 * delta;
        rot.z = Math.min(0.35, rot.z + 0.08);
      } else if (isRCSRightRef.current) {
        rot.y -= 1.8 * delta;
        rot.z = Math.max(-0.35, rot.z - 0.08);
      } else if (sasEnabled) {
        // SAS (Stability Augmentation System) ativo: estabiliza a rotação automaticamente
        rot.z *= 0.90;
      }

      if (keyState['KeyQ']) rot.x -= 1.4 * delta;
      if (keyState['KeyE']) rot.x += 1.4 * delta;

      // Gravidade Planetária Realista
      const g = currentMission.gravity * 0.15;
      if (!isISS) {
        vel.y -= g * delta;
      }

      // Auto-Hover / Auxílio de Pouso Suave Automático
      let effectiveThrust = isThrustingRef.current;
      if (autoHoverEnabled && !isISS && pos.y < 0) {
        // Se a velocidade vertical for mais rápida que -1.8 m/s, aplica empuxo suave
        if (vel.y < -0.4) {
          effectiveThrust = true;
        }
      }

      // Propulsão do Foguete
      if (effectiveThrust && fuelPercentage > 0) {
        const thrustForce = 8.5;
        const forward = new THREE.Vector3(0, 1, 0).applyEuler(rot);
        vel.addScaledVector(forward, thrustForce * delta);

        if (enginePlumeRef.current) {
          enginePlumeRef.current.material.opacity = 0.9 + Math.sin(time * 40) * 0.1;
        }

        setFuelPercentage((prev) => Math.max(0, prev - 0.08));
      } else if (isBrakingRef.current && fuelPercentage > 0) {
        vel.multiplyScalar(0.96);
        if (enginePlumeRef.current) enginePlumeRef.current.material.opacity = 0.2;
        setFuelPercentage((prev) => Math.max(0, prev - 0.04));
      } else {
        if (enginePlumeRef.current) enginePlumeRef.current.material.opacity = 0.0;
      }

      // Atualizar posição com a velocidade calculada
      pos.addScaledVector(vel, delta);
      playerGroup.position.copy(pos);
      playerGroup.rotation.copy(rot);

      // Calcular telemetria para o HUD
      const alt = Math.max(0, Math.round((pos.y + 18) * 25));
      setCurrentAltitude(alt);
      const vSpd = parseFloat((vel.y * 5).toFixed(1));
      setVerticalVelocity(vSpd);
      const hSpd = parseFloat((Math.sqrt(vel.x * vel.x + vel.z * vel.z) * 10).toFixed(1));
      setHorizontalSpeed(hSpd);

      // TESTE DE POUSO NA SUPERFÍCIE (LUA / MARTE / EUROPA)
      if (!isISS && pos.y <= -17.8) {
        pos.y = -17.8;
        vel.set(0, 0, 0);

        if (!touchdownOccurred) {
          setTouchdownOccurred(true);
          if (Math.abs(vSpd) <= 3.2 && hSpd <= 5.0) {
            setTouchdownSuccess(true);
            playSound('touchdown', soundEnabled);
            markObjectiveComplete(currentMission.objectives[1]?.id || 'touchdown', 100, 'Pouso Suave Confirmado!');
            setRadioTransmission(currentMission.radioQuote);
          } else {
            setTouchdownSuccess(false);
            playSound('alarm', soundEnabled);
            setHullIntegrity((prev) => Math.max(0, prev - 50));
          }
        }
      }

      // TESTE DE ACOPLAGEM NA ISS
      if (isISS && issStationRef.current) {
        const distToISS = pos.distanceTo(issStationRef.current.position);
        if (distToISS < 15 && !dockingSuccess) {
          if (Math.abs(vSpd) <= 1.2 && hSpd <= 2.0) {
            setDockingSuccess(true);
            playSound('dock', soundEnabled);
            markObjectiveComplete('soft_dock', 120, 'Acoplagem na ISS com Sucesso!');
            setRadioTransmission(currentMission.radioQuote);
          }
        }
      }

      // POSICIONAMENTO DA CÂMARA SEGUNDO O MODO
      if (cameraMode === 'cockpit') {
        const headOffset = new THREE.Vector3(0, 1.8, -1.2).applyEuler(rot);
        camera.position.copy(pos).add(headOffset);
        const lookDir = pos.clone().add(new THREE.Vector3(0, 0, -50).applyEuler(rot));
        camera.lookAt(lookDir);
      } else if (cameraMode === 'orbit') {
        const camDist = 35;
        camera.position.set(pos.x + Math.sin(time * 0.2) * camDist, pos.y + 12, pos.z + Math.cos(time * 0.2) * camDist);
        camera.lookAt(pos);
      } else {
        const chaseOffset = new THREE.Vector3(0, 8, 28).applyEuler(rot);
        camera.position.copy(pos).add(chaseOffset);
        camera.lookAt(pos.clone().add(new THREE.Vector3(0, 1.5, 0)));
      }

      renderer.render(scene, camera);
    };

    animateLoop();

    // Redimensionamento responsivo
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [selectedMissionId, soundEnabled, markObjectiveComplete, currentMission, sasEnabled, autoHoverEnabled]);

  // Ação: Disparar Scanner Científico
  const triggerScienceScan = () => {
    playSound('scanner', soundEnabled);
    markObjectiveComplete(currentMission.objectives[0]?.id || 'scan', 50, 'Escaneamento Espectroscópico Completo');
  };

  // Ação: Cravar Bandeira
  const handlePlantFlag = () => {
    playSound('click', soundEnabled);
    setFlagPlanted(true);
    markObjectiveComplete('flag', 75, 'Bandeira Cravada na Superfície');
  };

  // Ação: Recolher Amostra de Solo / Rocha
  const handleCollectSample = () => {
    playSound('scanner', soundEnabled);
    setSampleCollected(true);
    markObjectiveComplete('regolith', 80, 'Amostra de Regolito Guardada');
    markObjectiveComplete('drill_rock', 90, 'Núcleo de Rocha Sedimentar Selado');
  };

  // Ação: Conduzir Rover
  const handleDriveRover = () => {
    playSound('rover', soundEnabled);
    setPlayerControlMode('rover');
    markObjectiveComplete('drive_rover', 60, 'Sistemas do Rover Perseverance Ativos');
  };

  // Ação: Descolar Ingenuity
  const handleFlyIngenuity = () => {
    playSound('thrust', soundEnabled);
    setPlayerControlMode('drone');
    markObjectiveComplete('fly_ingenuity', 120, 'Primeiro Voo Motorizado do Ingenuity');
  };

  // Controlo táctil de impulso (para jogadores sem teclado ou no rato)
  const handleTouchThrustStart = () => {
    isThrustingRef.current = true;
    playSound('thrust', soundEnabled);
  };
  const handleTouchThrustEnd = () => {
    isThrustingRef.current = false;
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* SELETOR DE MISSÕES REAIS DA NASA (VISUAL, DIRETO E DIVERTIDO) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {nasaGameMissions.map((mission) => {
          const isSelected = mission.id === selectedMissionId;
          return (
            <button
              key={mission.id}
              onClick={() => handleSelectMission(mission.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-500/25 via-blue-600/20 to-slate-900 border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.3)] scale-[1.02]'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300">
                  {mission.badge.split('•')[0]}
                </span>
                {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />}
              </div>

              <h4 className="font-bold text-xs sm:text-sm font-mono text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                {mission.shortName}
              </h4>

              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {mission.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* ÁREA PRINCIPAL DA SIMULAÇÃO 3D */}
      <div className="relative w-full h-[620px] rounded-3xl overflow-hidden border-2 border-cyan-500/40 bg-slate-950 shadow-2xl select-none">
        
        {/* Canvas WebGL do Three.js */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* NOTIFICAÇÃO ELEGANTE DE CONQUISTA NO TOPO DIREITO (SEM BLOQUEAR A TELA) */}
        {badgeToast && (
          <div className="absolute top-20 right-4 z-40 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
            <div className="p-3.5 rounded-2xl bg-slate-950/95 border-2 border-amber-400/80 shadow-[0_0_25px_rgba(251,191,36,0.35)] backdrop-blur-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 font-bold">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  NASA Desafio Cumprido!
                </div>
                <div className="text-xs font-bold text-white font-mono">
                  {badgeToast.title} <span className="text-cyan-400 ml-1">+{badgeToast.reward} pts</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CABEÇALHO SUPERIOR DO JOGO: SÍTIO DE POUSO, RELÓGIO MET & MODOS DE CÂMARA */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-auto z-20">
          
          {/* Seletor de Sítios de Pouso Oficiais & Relógio MET da NASA */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950/85 border border-slate-800 backdrop-blur-md">
            <div className="px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-500/40 font-mono text-xs font-bold text-cyan-300">
              {formatMET(metSeconds)}
            </div>

            <span className="text-slate-700">|</span>

            <Target className="w-3.5 h-3.5 text-cyan-400 ml-0.5" />
            <span className="text-[11px] font-mono font-bold text-slate-300 mr-1 hidden sm:inline">Sítio:</span>
            {currentMission.landingSites.map((site) => (
              <button
                key={site.id}
                onClick={() => { playSound('click', soundEnabled); setSelectedSiteId(site.id); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedSiteId === site.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {site.name.split('(')[0]}
              </button>
            ))}
          </div>

          {/* Ferramentas Vencedoras da NASA: Trajetória Hohmann & Caderneta de Voo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => { playSound('click', soundEnabled); setIsTrajectoryModalOpen(true); }}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-amber-300 flex items-center gap-1.5 backdrop-blur-md cursor-pointer transition-colors shadow-sm"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Órbita Hohmann</span>
            </button>

            <button
              onClick={() => { playSound('click', soundEnabled); setIsLogbookModalOpen(true); }}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 backdrop-blur-md cursor-pointer transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Medalhas ({completedObjectiveIds.length})</span>
            </button>

            <button
              onClick={() => {
                setCameraMode((prev) => (prev === 'chase' ? 'cockpit' : prev === 'cockpit' ? 'orbit' : 'chase'));
                playSound('click', soundEnabled);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300 flex items-center gap-1.5 backdrop-blur-md cursor-pointer transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span className="capitalize">{cameraMode} HUD</span>
            </button>
          </div>
        </div>

        {/* MIRA DO COCKPIT (MODO 1ª PESSOA COM HORIZONTE ARTIFICIAL) */}
        {cameraMode === 'cockpit' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            <div className="w-56 h-56 border border-cyan-400/30 rounded-full flex items-center justify-center">
              <div className="w-20 h-0.5 bg-cyan-400/80" />
              <div className="w-0.5 h-20 bg-cyan-400/80" />
              <div className="absolute font-mono text-[10px] text-cyan-300 -top-6">PITCH 0° • LEVEL</div>
            </div>
          </div>
        )}

        {/* FEEDBACK DE RÁDIO CAPCOM DA NASA NO ECRÃ */}
        {radioTransmission && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 max-w-xl w-full px-4 z-30 pointer-events-auto">
            <div className="p-4 rounded-2xl bg-slate-950/95 border-2 border-emerald-400/60 shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-xl text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>TRANSMISSÃO OFICIAL DA NASA (CAPCOM):</span>
                </span>
                <button
                  onClick={() => setRadioTransmission(null)}
                  className="text-xs text-slate-400 hover:text-white cursor-pointer font-mono"
                >
                  ✕ Fechar
                </button>
              </div>
              <p className="text-sm font-bold text-white font-mono leading-relaxed">
                "{radioTransmission}"
              </p>
            </div>
          </div>
        )}

        {/* PAINEL DE POUSO BEM SUCEDIDO / ACOPLAGEM */}
        {touchdownOccurred && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 max-w-md w-full px-4 z-30 pointer-events-auto">
            <div className={`p-5 rounded-2xl border backdrop-blur-xl text-center space-y-4 ${
              touchdownSuccess
                ? 'bg-emerald-950/95 border-emerald-500 text-emerald-200 shadow-[0_0_35px_rgba(16,185,129,0.35)]'
                : 'bg-rose-950/95 border-rose-500 text-rose-200 shadow-[0_0_35px_rgba(244,63,94,0.35)]'
            }`}>
              <div className="font-mono font-black text-base">
                {touchdownSuccess ? '🦅 CONTACT LIGHT! POUSO SUAVE CONFIRMADO!' : '💥 IMPACTO CRÍTICO! Velocidade excessiva.'}
              </div>

              {touchdownSuccess && (
                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                  <button
                    disabled={flagPlanted}
                    onClick={handlePlantFlag}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all ${
                      flagPlanted ? 'bg-slate-800 text-slate-400' : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/25'
                    }`}
                  >
                    <Flag className="w-4 h-4" />
                    <span>{flagPlanted ? '✓ Bandeira Cravada' : 'Cravar Bandeira'}</span>
                  </button>

                  <button
                    disabled={sampleCollected}
                    onClick={handleCollectSample}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all ${
                      sampleCollected ? 'bg-slate-800 text-slate-400' : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/25'
                    }`}
                  >
                    <FlaskConical className="w-4 h-4" />
                    <span>{sampleCollected ? '✓ Amostra Guardada' : 'Recolher Amostra (+80 pts)'}</span>
                  </button>

                  {selectedMissionId === 'mars2020' && (
                    <>
                      <button
                        onClick={handleDriveRover}
                        className="px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Compass className="w-4 h-4" />
                        <span>Conduzir Rover</span>
                      </button>

                      <button
                        onClick={handleFlyIngenuity}
                        className="px-3 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Descolar Ingenuity</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CONTROLOS TÁTEIS VIRTUAIS NO ECRÃ (IDEAL PARA JOGAR COM O RATO OU TOUCHSCREEN) */}
        <div className="absolute bottom-20 left-4 z-20 pointer-events-auto flex items-center gap-2">
          {/* Botão de Empuxo Principal */}
          <button
            onMouseDown={handleTouchThrustStart}
            onMouseUp={handleTouchThrustEnd}
            onTouchStart={handleTouchThrustStart}
            onTouchEnd={handleTouchThrustEnd}
            className="w-16 h-16 rounded-2xl bg-cyan-500/30 hover:bg-cyan-500/50 active:bg-cyan-400 border-2 border-cyan-400 text-cyan-200 active:text-slate-950 flex flex-col items-center justify-center font-mono font-bold text-[10px] cursor-pointer shadow-lg backdrop-blur-md transition-all active:scale-95"
          >
            <ArrowUp className="w-6 h-6" />
            <span>EMPUXO</span>
          </button>

          {/* D-Pad de Manobra RCS */}
          <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => {
                rotationRef.current.y += 0.3;
                playSound('rcs', soundEnabled);
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                rotationRef.current.y -= 0.3;
                playSound('rcs', soundEnabled);
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Toggles de Piloto Automático SAS e Pouso Suave */}
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => { setSasEnabled((prev) => !prev); playSound('toggle', soundEnabled); }}
              className={`px-3 py-1.5 rounded-xl border text-[10px] font-mono font-bold transition-all cursor-pointer ${
                sasEnabled
                  ? 'bg-emerald-950 border-emerald-500/60 text-emerald-300 shadow-sm'
                  : 'bg-slate-950/80 border-slate-800 text-slate-500'
              }`}
            >
              SAS: {sasEnabled ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => { setAutoHoverEnabled((prev) => !prev); playSound('toggle', soundEnabled); }}
              className={`px-3 py-1.5 rounded-xl border text-[10px] font-mono font-bold transition-all cursor-pointer ${
                autoHoverEnabled
                  ? 'bg-cyan-950 border-cyan-500/60 text-cyan-300 shadow-sm'
                  : 'bg-slate-950/80 border-slate-800 text-slate-500'
              }`}
            >
              AUTO-POUSO: {autoHoverEnabled ? 'ATIVO' : 'OFF'}
            </button>
          </div>
        </div>

        {/* BARRA INFERIOR DE INSTRUMENTOS (VIDA, COMBUSTÍVEL, ALTITUDE, VELOCIDADE VERTICAL) */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-auto z-20">
          
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/90 border border-slate-800 backdrop-blur-md font-mono text-xs shadow-xl">
            {/* Casco */}
            <div className="flex items-center gap-1.5">
              <Shield className={`w-4 h-4 ${hullIntegrity > 50 ? 'text-emerald-400' : 'text-rose-400'}`} />
              <span className="text-slate-400">Casco:</span>
              <span className="font-bold text-white">{hullIntegrity}%</span>
            </div>

            <span className="text-slate-700">|</span>

            {/* Combustível */}
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400">Combustível:</span>
              <span className="font-bold text-cyan-300">{Math.round(fuelPercentage)}%</span>
            </div>

            <span className="text-slate-700">|</span>

            {/* Altitude Radar */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-slate-400">Altitude:</span>
              <span className="font-bold text-white">{currentAltitude} m</span>
            </div>

            <span className="text-slate-700">|</span>

            {/* Taxa de Descida (Velocidade Vertical e Horizontal) */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">V. Vert:</span>
              <span className={`font-bold ${Math.abs(verticalVelocity) > 3.2 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {verticalVelocity} m/s
              </span>
              <span className="text-slate-500 text-[10px]">({horizontalSpeed} h)</span>
            </div>

            <span className="text-slate-700">|</span>

            {/* Pontos de Ciência */}
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-slate-400">Ciência:</span>
              <span className="font-bold text-purple-300">{sciencePoints} pts</span>
            </div>

            <span className="text-slate-700">|</span>

            {/* Modo Ativo */}
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold uppercase">
              {playerControlMode === 'flight' ? 'Voo 🚀' : playerControlMode === 'rover' ? 'Rover 🚙' : 'Ingenuity 🚁'}
            </span>
          </div>

          {/* Teclas de Voo Rápido */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-[11px] font-mono text-slate-400 backdrop-blur-md">
            <span className="text-cyan-400 font-bold">W / S</span> Empuxo •
            <span className="text-cyan-400 font-bold">A / D</span> RCS •
            <span className="text-cyan-400 font-bold">ESPAÇO</span> Turbo •
            <span className="text-cyan-400 font-bold">R</span> Scanner •
            <span className="text-cyan-400 font-bold">C</span> Câmara
          </div>

        </div>

      </div>

      {/* PAINEL DE CIÊNCIA INTELIGENTE & OBJETIVOS DA MISSÃO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Lado Esquerdo: Conceito Científico Inteligente da NASA */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-cyan-950/30 border border-cyan-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>CIÊNCIA DA MISSÃO • POR QUE ESTA FÍSICA IMPORTA?</span>
            </div>
            <button
              onClick={() => setIsTrajectoryModalOpen(true)}
              className="text-[11px] font-mono text-cyan-400 hover:underline cursor-pointer"
            >
              Ver Trajetória Hohmann →
            </button>
          </div>

          <h3 className="text-lg font-bold text-white font-mono">
            {currentMission.scienceConceptTitle}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {currentMission.scienceConceptText}
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs font-mono text-slate-400">
            <span>Gravidade: <b className="text-white">{currentMission.gravity} m/s²</b></span>
            <span>•</span>
            <span>Atmosfera: <b className="text-white">{currentMission.hasAtmosphere ? `${currentMission.atmosphereDensity * 100}% CO2` : 'Vácuo Total'}</b></span>
          </div>
        </div>

        {/* Lado Direito: Objetivos Interativos da Missão com Recompensas */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>Objetivos Oficiais da Missão:</span>
            </span>
            <span className="text-cyan-400 font-bold">
              {completedObjectiveIds.length} / {currentMission.objectives.length} Concluídos
            </span>
          </div>

          <div className="space-y-2">
            {currentMission.objectives.map((obj) => {
              const isCompleted = completedObjectiveIds.includes(obj.id);
              return (
                <div
                  key={obj.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    isCompleted
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs font-mono">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${isCompleted ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className={isCompleted ? 'line-through text-slate-400' : 'text-slate-200'}>
                      {obj.text}
                    </span>
                  </div>

                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold shrink-0 ${
                    isCompleted ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                  }`}>
                    +{obj.reward} pts
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Modal de Trajetória Orbital e Transferência de Hohmann */}
      <TrajectoryOrbitModal
        isOpen={isTrajectoryModalOpen}
        onClose={() => setIsTrajectoryModalOpen(false)}
        targetBody={currentMission.targetBody}
        onExecuteManeuver={() => {
          markObjectiveComplete(currentMission.objectives[0]?.id || 'slingshot', 80, 'Queima de Injeção Executada com Sucesso!');
        }}
        soundEnabled={soundEnabled}
      />

      {/* Modal de Caderneta de Conquistas e Medalhas de Astronauta da NASA */}
      <AstronautLogbookModal
        isOpen={isLogbookModalOpen}
        onClose={() => setIsLogbookModalOpen(false)}
        completedObjectiveIds={completedObjectiveIds}
        sciencePoints={sciencePoints}
        onOpenCertificate={onOpenCertificate}
      />

    </div>
  );
}
