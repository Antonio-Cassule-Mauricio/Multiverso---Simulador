// ============================================================================
// COMPONENTE 3D: SpaceCanvas3D (Motor Gráfico e Simulação Interativa em Three.js)
// Responsabilidade: Renderização 3D da sonda, planeta, física orbital e controlos de voo
// ============================================================================

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { playSound } from '../../utils/audio';
import {
  Flame, Radio, Sparkles, ChevronDown, ChevronUp, Layers
} from 'lucide-react';

export default function SpaceCanvas3D({
  missionConfig,
  gameMode = 'orbit', // 'hangar' | 'orbit' | 'surface'
  setGameMode,
  soundEnabled,
  onScienceBonus,
  t,
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const spacecraftGroupRef = useRef(null);
  const planetMeshRef = useRef(null);
  const thrusterPlumesRef = useRef([]);
  const gameModeRef = useRef(gameMode);

  // Manter gameMode sincronizado na ref para o loop de animação
  useEffect(() => {
    gameModeRef.current = gameMode;
  }, [gameMode]);

  // Estados de controlo da interface 3D
  const [explodedFactor, setExplodedFactor] = useState(0); // 0 a 1 para vista explodida
  const [isThrusting, setIsThrusting] = useState(false);
  const [orbitalAltitude, setOrbitalAltitude] = useState(420); // km
  const [orbitalVelocity, setOrbitalVelocity] = useState(3.42); // km/s
  const [collectedScience, setCollectedScience] = useState(0);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);

  // ==========================================================================
  // INICIALIZAÇÃO DA CENA THREE.JS
  // ==========================================================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detetar se o ambiente WebGL é emulado por software para calibrar performance
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Criar Renderer com tone mapping cinematográfico
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Criar Cena e Ambiente PBR com RoomEnvironment
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Câmara e Controlos Orbitais
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 4, 12);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 150;
    controls.minDistance = 2.5;
    controlsRef.current = controls;

    // 4. Iluminação Solar de Estúdio (Sol Direcional + Luz de Preenchimento Cósmica)
    const sunLight = new THREE.DirectionalLight(0xfff8ee, 3.5);
    sunLight.position.set(40, 25, 30);
    sunLight.castShadow = !isSoftwareGl;
    if (sunLight.castShadow) {
      sunLight.shadow.mapSize.width = 1024;
      sunLight.shadow.mapSize.height = 1024;
      sunLight.shadow.bias = -0.0005;
    }
    scene.add(sunLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x05070e, 0.8);
    scene.add(hemiLight);

    // 5. Starfield Procedural (2500 estrelas e poeira estelar)
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2500;
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const r = 500 + Math.random() * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPos[i] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i + 2] = r * Math.cos(phi);

      // Cores variando entre azul brilhante, branco e âmbar
      const tint = Math.random();
      if (tint > 0.8) {
        starColors[i] = 0.4; starColors[i + 1] = 0.8; starColors[i + 2] = 1.0;
      } else if (tint < 0.2) {
        starColors[i] = 1.0; starColors[i + 1] = 0.7; starColors[i + 2] = 0.4;
      } else {
        starColors[i] = 0.95; starColors[i + 1] = 0.95; starColors[i + 2] = 1.0;
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 6. Grupo Principal da Sonda Espacial
    const spacecraftGroup = new THREE.Group();
    scene.add(spacecraftGroup);
    spacecraftGroupRef.current = spacecraftGroup;

    // 7. Esfera Planetária Procedural em Órbita
    const planetGroup = new THREE.Group();
    planetGroup.position.set(0, -32, 0);
    scene.add(planetGroup);

    const planetGeo = new THREE.SphereGeometry(28, 48, 48);
    // Criação de textura procedural para o planeta usando Canvas 2D
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Gradiente base do planeta
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#c2410c'); // Vermelho/ferrugem para Marte
    grad.addColorStop(0.5, '#ea580c');
    grad.addColorStop(1, '#9a3412');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Adicionar crateras e relevo procedural
    ctx.fillStyle = 'rgba(67, 20, 7, 0.4)';
    for (let i = 0; i < 40; i++) {
      const cx = Math.random() * 512;
      const cy = Math.random() * 256;
      const cr = 4 + Math.random() * 22;
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI * 2);
      ctx.fill();
    }
    // Calotas polares
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(0, 0, 512, 18);
    ctx.fillRect(0, 238, 512, 18);

    const planetTexture = new THREE.CanvasTexture(canvas);
    planetTexture.colorSpace = THREE.SRGBColorSpace;

    const planetMat = new THREE.MeshStandardMaterial({
      map: planetTexture,
      roughness: 0.85,
      metalness: 0.1,
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planetMesh);
    planetMeshRef.current = planetMesh;

    // Brilho atmosférico tênue (Glow)
    const atmoGeo = new THREE.SphereGeometry(28.5, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    planetGroup.add(atmoMesh);

    // Redimensionamento responsivo
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Loop de Animação e Renderização
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Rotação natural do planeta e das estrelas de fundo
      if (planetMeshRef.current) {
        planetMeshRef.current.rotation.y += delta * 0.03;
      }
      starField.rotation.y += delta * 0.002;

      // Animação da Sonda Espacial
      if (spacecraftGroupRef.current) {
        // Leve flutuação de altitude orbital
        if (gameModeRef.current === 'orbit') {
          spacecraftGroupRef.current.position.y = Math.sin(elapsed * 1.2) * 0.15;
          spacecraftGroupRef.current.rotation.y += delta * 0.1;
        } else if (gameModeRef.current === 'hangar') {
          spacecraftGroupRef.current.position.set(0, 0, 0);
          spacecraftGroupRef.current.rotation.y += delta * 0.15;
        }

        // Animação dos jatos propulsores quando acelerando
        thrusterPlumesRef.current.forEach((plume) => {
          if (plume) {
            plume.scale.set(
              1 + Math.sin(elapsed * 25) * 0.3,
              1 + Math.cos(elapsed * 30) * 0.5,
              1 + Math.sin(elapsed * 25) * 0.3
            );
          }
        });
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Limpeza de memória ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // ==========================================================================
  // CONSTRUÇÃO PROCEDURAL DA SONDA 3D (3 a 12 partes físicas)
  // ==========================================================================
  const buildSpacecraftModel = useCallback(() => {
    const group = spacecraftGroupRef.current;
    if (!group) return;

    // Limpar geometrias anteriores
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
    }
    thrusterPlumesRef.current = [];

    const isRover = missionConfig.type === 'rover';
    const isLander = missionConfig.type === 'lander';
    const dishDiameter = missionConfig.comms.antenna === 'high' ? 2.2 : missionConfig.comms.antenna === 'medium' ? 1.4 : 0.6;
    const panelAreaM2 = missionConfig.power.panelArea || 5;

    // Materiais PBR de alto realismo
    const goldFoilMat = new THREE.MeshStandardMaterial({
      color: 0xcca01a,
      roughness: 0.3,
      metalness: 0.85,
    });
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.45,
      metalness: 0.7,
    });
    const solarCellMat = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      roughness: 0.15,
      metalness: 0.9,
    });
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.1,
      metalness: 0.95,
    });
    const heatshieldMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.9,
      metalness: 0.05,
    });

    if (isRover) {
      // ----------------- MODELO 3D: ROVER EXPLORADOR -----------------
      // 1. Chassi Central
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 1.6), goldFoilMat);
      group.add(chassis);

      // 2. Convés Superior com Painéis ou RTG
      const deck = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.1, 1.5), darkMetalMat);
      deck.position.y = 0.4;
      group.add(deck);

      if (missionConfig.power.source === 'rtg') {
        const rtg = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.1, 16), darkMetalMat);
        rtg.rotation.z = Math.PI / 2;
        rtg.position.set(-1.1, 0.5, 0);
        group.add(rtg);
      } else {
        const roverSolar = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.04, 1.3), solarCellMat);
        roverSolar.position.y = 0.46;
        group.add(roverSolar);
      }

      // 3. Mastro da Câmara Estéreo
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.4, 12), chromeMat);
      mast.position.set(0.8, 1.0, 0);
      group.add(mast);

      const mastHead = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.25, 0.5), darkMetalMat);
      mastHead.position.set(0.8, 1.7, 0);
      group.add(mastHead);

      // 4. Seis Rodas Articuladas com Suspensão
      const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 16);
      const wheelPositions = [
        [1.0, -0.6, 1.1], [0, -0.6, 1.2], [-1.0, -0.6, 1.1],
        [1.0, -0.6, -1.1], [0, -0.6, -1.2], [-1.0, -0.6, -1.1],
      ];
      wheelPositions.forEach((pos) => {
        const wheel = new THREE.Mesh(wheelGeo, darkMetalMat);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(...pos);
        group.add(wheel);
      });

      // 5. Braço Robótico Articulado com Broca
      const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8), chromeMat);
      arm1.rotation.z = -Math.PI / 4;
      arm1.position.set(1.3, 0.2, 0.3);
      group.add(arm1);

      const drillHead = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 12), chromeMat);
      drillHead.position.set(1.6, -0.2, 0.3);
      group.add(drillHead);

    } else if (isLander) {
      // ----------------- MODELO 3D: ATERRISSADOR (LANDER) -----------------
      // 1. Corpo Central Octogonal
      const landerBus = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 1.2, 8), goldFoilMat);
      group.add(landerBus);

      // 2. Escudo Térmico Inferior
      const heatshield = new THREE.Mesh(new THREE.ConeGeometry(2.1, 0.4, 16), heatshieldMat);
      heatshield.rotation.x = Math.PI;
      heatshield.position.y = -0.7;
      group.add(heatshield);

      // 3. Quatro Pernas de Pouso com Amortecedores e Sapatas
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.6), chromeMat);
        leg.rotation.z = 0.55;
        leg.rotation.y = angle;
        leg.position.set(Math.cos(angle) * 1.5, -0.8, Math.sin(angle) * 1.5);
        group.add(leg);

        const footpad = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 12), darkMetalMat);
        footpad.position.set(Math.cos(angle) * 2.1, -1.5, Math.sin(angle) * 2.1);
        group.add(footpad);
      }

      // 4. Prato de Comunicação e Instrumentos Superiores
      const dish = new THREE.Mesh(new THREE.SphereGeometry(dishDiameter * 0.4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), chromeMat);
      dish.position.set(0, 0.8, 0);
      group.add(dish);

    } else {
      // ----------------- MODELO 3D: SONDA ORBITAL (ORBITER) -----------------
      // 1. Corpo Central Hexagonal (Foil Dourado)
      const busBody = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 2.0, 6), goldFoilMat);
      group.add(busBody);

      // 2. Tanques Internos de Propulsor Visíveis
      const tankGeo = new THREE.SphereGeometry(0.45, 16, 16);
      const tank1 = new THREE.Mesh(tankGeo, chromeMat);
      tank1.position.set(0.3, 0, 0);
      group.add(tank1);

      const tank2 = new THREE.Mesh(tankGeo, chromeMat);
      tank2.position.set(-0.3, 0, 0);
      group.add(tank2);

      // 3. Asas de Painéis Solares Desdobráveis (Escaladas dinamicamente)
      const wingLength = 1.6 + panelAreaM2 * 0.35;
      const wingWidth = 0.9;
      const wingGeo = new THREE.BoxGeometry(wingLength, 0.05, wingWidth);

      // Painel Esquerdo
      const leftWing = new THREE.Mesh(wingGeo, solarCellMat);
      leftWing.position.set(-1.2 - wingLength / 2, 0, 0);
      group.add(leftWing);

      // Painel Direito
      const rightWing = new THREE.Mesh(wingGeo, solarCellMat);
      rightWing.position.set(1.2 + wingLength / 2, 0, 0);
      group.add(rightWing);

      // 4. Antena Parabólica de Alto Ganho com Tripé e Alimentador
      const dishGeo = new THREE.SphereGeometry(dishDiameter * 0.55, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2.2);
      const dishMesh = new THREE.Mesh(dishGeo, chromeMat);
      dishMesh.rotation.x = -Math.PI / 2;
      dishMesh.position.set(0, 1.25, 0.4);
      group.add(dishMesh);

      const subreflector = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.3, 12), darkMetalMat);
      subreflector.rotation.x = Math.PI / 2;
      subreflector.position.set(0, 1.25, 0.9);
      group.add(subreflector);

      // 5. Motor Principal Bipropelente e Jatos RCS
      const engineNozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.6, 0.9, 16, 1, true), darkMetalMat);
      engineNozzle.position.set(0, -1.4, 0);
      group.add(engineNozzle);

      // Jato de Ignição de Propulsão (Flame Plume)
      const plumeGeo = new THREE.ConeGeometry(0.35, 1.6, 16);
      const plumeMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: isThrusting ? 0.85 : 0.0,
      });
      const plume = new THREE.Mesh(plumeGeo, plumeMat);
      plume.rotation.x = Math.PI;
      plume.position.set(0, -2.2, 0);
      group.add(plume);
      thrusterPlumesRef.current.push(plume);

      // 6. Mastros Científicos (Magnetómetro e Radar de Subsolo)
      if (missionConfig.instruments.includes('radar') || missionConfig.instruments.includes('magnetometer')) {
        const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.6, 8), chromeMat);
        boom.rotation.z = Math.PI / 3;
        boom.position.set(1.5, -0.6, 0);
        group.add(boom);

        const magSensor = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), darkMetalMat);
        magSensor.position.set(2.6, 0.1, 0);
        group.add(magSensor);
      }
    }
  }, [missionConfig, isThrusting]);

  // Recriar o modelo 3D sempre que as escolhas de engenharia mudam
  useEffect(() => {
    buildSpacecraftModel();
  }, [buildSpacecraftModel]);

  // ==========================================================================
  // VISTA EXPLODIDA 3D (Deslocamento paramétrico dos componentes)
  // ==========================================================================
  useEffect(() => {
    const group = spacecraftGroupRef.current;
    if (!group) return;

    group.children.forEach((child, index) => {
      // Aplica um afastamento proporcional ao slider de vista explodida
      const offset = (index % 2 === 0 ? 1 : -1) * (index * 0.25) * explodedFactor;
      child.position.x += offset * 0.05;
      child.position.y += Math.sin(index) * offset * 0.05;
    });
  }, [explodedFactor]);

  // ==========================================================================
  // CONTROLOS DE PILOTAGEM 3D (Teclado e Ações)
  // ==========================================================================
  const triggerThrust = useCallback((durationMs = 800) => {
    playSound('launch', soundEnabled);
    setIsThrusting(true);
    setOrbitalVelocity((v) => +(v + 0.15).toFixed(2));
    setOrbitalAltitude((a) => Math.min(850, a + 15));

    setTimeout(() => {
      setIsThrusting(false);
    }, durationMs);
  }, [soundEnabled]);

  const triggerRetroThrust = useCallback(() => {
    playSound('warning', soundEnabled);
    setIsRetroThrusting(true);
    setOrbitalVelocity((v) => Math.max(1.5, +(v - 0.12).toFixed(2)));
    setOrbitalAltitude((a) => Math.max(120, a - 12));

    setTimeout(() => {
      setIsRetroThrusting(false);
    }, 600);
  }, [soundEnabled]);

  const triggerScienceScan = useCallback(() => {
    playSound('success', soundEnabled);
    const bonus = 25;
    setCollectedScience((s) => s + bonus);
    if (onScienceBonus) onScienceBonus(bonus);
  }, [soundEnabled, onScienceBonus]);

  // Ouvinte de teclado para o jogo 3D
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp' || e.key === ' ') {
        e.preventDefault();
        triggerThrust(400);
      } else if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
        e.preventDefault();
        triggerRetroThrust();
      } else if (e.key === 'r' || e.key === 'R') {
        triggerScienceScan();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerThrust, triggerRetroThrust, triggerScienceScan]);

  return (
    <div className="relative w-full h-[580px] sm:h-[640px] rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-950 shadow-[0_0_50px_rgba(56,189,248,0.2)]">
      
      {/* 1. Canvas 3D Isolado em Ref Dedicada */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 2. HUD Superior Minimalista de Telemetria Orbital 3D */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        
        {/* Painel Esquerdo: Altitude e Velocidade em Tempo Real */}
        <div className="pointer-events-auto p-3 rounded-2xl bg-slate-900/85 border border-cyan-500/30 backdrop-blur-md flex items-center gap-4 text-xs font-mono shadow-xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-white font-bold uppercase tracking-wider">
              {missionConfig.type} • {missionConfig.universe.toUpperCase()}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 border-l border-slate-700 pl-3">
            <div>
              <span className="text-slate-400">{t('game_altitude') || 'Altitude:'} </span>
              <span className="text-cyan-300 font-bold">{orbitalAltitude} km</span>
            </div>
            <div>
              <span className="text-slate-400">{t('game_speed') || 'Velocidade:'} </span>
              <span className="text-emerald-300 font-bold">{orbitalVelocity} km/s</span>
            </div>
          </div>
        </div>

        {/* Painel Direito: Pontuação de Ciência Coletada e Modo de Jogo */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="p-3 rounded-2xl bg-purple-950/85 border border-purple-500/40 backdrop-blur-md text-xs font-mono flex items-center gap-2 text-purple-200 shadow-xl">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Ciência 3D: </span>
            <span className="font-bold text-white text-sm">+{collectedScience} pts</span>
          </div>

          <button
            onClick={triggerScienceScan}
            className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono transition-all cursor-pointer shadow-lg flex items-center gap-1.5"
            title="Escanear e coletar ciência"
          >
            <Radio className="w-4 h-4 animate-spin" />
            <span className="hidden sm:inline">SCAN</span>
          </button>
        </div>

      </div>

      {/* 3. DOCK INFERIOR CENTRAL UNIFICADO E COLAPSÁVEL (Diretiva Three.js Skill) */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl transition-transform duration-300 pointer-events-auto ${
        isDockCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
      }`}>
        
        {/* Aba de Expandir / Colapsar o Dock */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => {
              playSound('click', soundEnabled);
              setIsDockCollapsed(!isDockCollapsed);
            }}
            className="px-4 py-1.5 rounded-t-xl bg-slate-900 border-t border-x border-cyan-500/30 text-[11px] font-mono text-cyan-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Mostrar Controlos 3D (Modo Cinema Ativo)</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Minimizar Controles</span>
              </>
            )}
          </button>
        </div>

        {/* Corpo Principal do Dock de Voo 3D */}
        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/30 bg-slate-900/90 shadow-2xl space-y-3">
          
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            
            {/* Seletor de Modo de Jogo */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  playSound('click', soundEnabled);
                  setGameMode('orbit');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  gameMode === 'orbit' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Voo Orbital
              </button>
              <button
                onClick={() => {
                  playSound('click', soundEnabled);
                  setGameMode('hangar');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  gameMode === 'hangar' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Hangar 3D
              </button>
            </div>

            {/* Botoes de Impulso Manual (Propulsão 3D) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerThrust(800)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
              >
                <Flame className="w-4 h-4 text-slate-950" />
                <span>IGNIÇÃO DE PROPULSOR (W)</span>
              </button>
              
              <button
                onClick={triggerRetroThrust}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all cursor-pointer active:scale-95"
              >
                RÉFRENAGEM (S)
              </button>
            </div>

          </div>

          {/* Slider de Vista Explodida (Exclusivo Hangar 3D) */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-4 text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Vista Explodida 3D:</span>
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={explodedFactor}
              onChange={(e) => setExplodedFactor(Number(e.target.value))}
              className="flex-1 accent-cyan-400 cursor-pointer"
            />
            <span className="text-cyan-300 font-bold w-12 text-right">
              {(explodedFactor * 100).toFixed(0)}%
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
