"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

type ConstructionSceneProps = {
  activeStage: number;
};

type BuildLayer = {
  group: THREE.Group;
  baseY: number;
  revealFrom: number;
};

const YELLOW = 0xf5c842;
const PAPER = 0xf0eee8;
const STEEL = 0x758286;
const DARK = 0x171817;

function makeMaterial(
  color: number,
  opacity = 1,
  roughness = 0.66,
  metalness = 0.18,
) {
  return new THREE.MeshStandardMaterial({
    color,
    transparent: opacity < 1,
    opacity,
    roughness,
    metalness,
    side: THREE.DoubleSide,
  });
}

function addBox(
  parent: THREE.Group,
  size: [number, number, number],
  position: [number, number, number],
  material: THREE.Material,
) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function addBeam(
  parent: THREE.Group,
  from: THREE.Vector3,
  to: THREE.Vector3,
  thickness: number,
  material: THREE.Material,
) {
  const midpoint = from.clone().add(to).multiplyScalar(0.5);
  const length = from.distanceTo(to);
  const beam = new THREE.Mesh(
    new THREE.BoxGeometry(thickness, length, thickness),
    material,
  );
  beam.position.copy(midpoint);
  beam.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    to.clone().sub(from).normalize(),
  );
  beam.castShadow = true;
  parent.add(beam);
  return beam;
}

function setLayerOpacity(layer: BuildLayer, opacity: number) {
  layer.group.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const material = child.material;
    if (Array.isArray(material)) {
      material.forEach((item) => {
        item.transparent = opacity < 1 || item.userData.layerOpacity < 1;
        item.opacity = (item.userData.layerOpacity ?? 1) * opacity;
      });
    } else {
      material.transparent = opacity < 1 || material.userData.layerOpacity < 1;
      material.opacity = (material.userData.layerOpacity ?? 1) * opacity;
    }
  });
}

function buildArchitecturalModel() {
  const model = new THREE.Group();
  model.rotation.y = -0.38;

  const foundation = new THREE.Group();
  foundation.name = 'foundation';
  const foundationMaterial = makeMaterial(STEEL, 1, 0.88, 0.08);
  addBox(foundation, [5.4, 0.28, 3.7], [0, 0.14, 0], foundationMaterial);
  addBox(foundation, [4.8, 0.16, 3.1], [0, 0.38, 0], makeMaterial(0x4f595a, 1, 0.9, 0.05));
  const plinth = addBox(foundation, [4.4, 0.22, 2.7], [0, 0.56, 0], foundationMaterial);
  plinth.rotation.y = -0.08;
  model.add(foundation);

  const structure = new THREE.Group();
  structure.name = 'structure';
  const frameMaterial = makeMaterial(YELLOW, 1, 0.48, 0.55);
  const levels = [0.9, 1.85, 2.8, 3.75, 4.7];
  [-1.95, -0.65, 0.65, 1.95].forEach((x) => {
    levels.forEach((y) => addBox(structure, [0.095, 0.92, 0.095], [x, y, -1.18], frameMaterial));
  });
  [-1.95, -0.65, 0.65, 1.95].forEach((x) => {
    levels.forEach((y) => addBox(structure, [0.095, 0.92, 0.095], [x, y, 1.18], frameMaterial));
  });
  levels.forEach((y) => addBox(structure, [4.1, 0.08, 0.09], [0, y - 0.4, -1.18], frameMaterial));
  levels.forEach((y) => addBox(structure, [4.1, 0.08, 0.09], [0, y - 0.4, 1.18], frameMaterial));
  levels.forEach((y) => addBox(structure, [0.09, 0.08, 2.45], [-1.95, y - 0.4, 0], frameMaterial));
  levels.forEach((y) => addBox(structure, [0.09, 0.08, 2.45], [1.95, y - 0.4, 0], frameMaterial));
  model.add(structure);

  const envelope = new THREE.Group();
  envelope.name = 'envelope';
  const glassMaterial = makeMaterial(0x829195, 0.27, 0.2, 0.65);
  glassMaterial.userData.layerOpacity = 0.72;
  [-1.5, -0.48, 0.48, 1.5].forEach((x) => {
    levels.slice(0, 4).forEach((y) => {
      addBox(envelope, [0.75, 0.68, 0.035], [x, y, -1.2], glassMaterial);
    });
  });
  const sideGlass = makeMaterial(0x68777a, 0.2, 0.28, 0.52);
  sideGlass.userData.layerOpacity = 0.55;
  [-1.95, 1.95].forEach((x) => {
    levels.slice(0, 4).forEach((y) => addBox(envelope, [0.035, 0.68, 0.66], [x, y, 0], sideGlass));
  });
  addBox(envelope, [4.12, 0.055, 2.48], [0, 5.22, 0], makeMaterial(PAPER, 0.75, 0.35, 0.1));
  model.add(envelope);

  const facade = new THREE.Group();
  facade.name = 'facade';
  const facadeMaterial = makeMaterial(PAPER, 0.96, 0.62, 0.08);
  const darkGlass = makeMaterial(DARK, 0.96, 0.2, 0.5);
  [-1.95, 1.95].forEach((x) => addBox(facade, [0.13, 4.42, 0.14], [x, 2.95, -1.3], facadeMaterial));
  addBox(facade, [4.1, 0.14, 0.14], [0, 0.74, -1.3], facadeMaterial);
  addBox(facade, [4.1, 0.14, 0.14], [0, 5.15, -1.3], facadeMaterial);
  [-1.48, -0.49, 0.49, 1.48].forEach((x) => {
    levels.slice(0, 4).forEach((y) => addBox(facade, [0.63, 0.62, 0.08], [x, y, -1.34], darkGlass));
  });
  addBox(facade, [1.05, 1.18, 0.12], [0.05, 1.28, -1.37], darkGlass);
  model.add(facade);

  const detail = new THREE.Group();
  detail.name = 'detail';
  const detailMaterial = makeMaterial(YELLOW, 0.9, 0.48, 0.44);
  addBox(detail, [4.34, 0.05, 0.05], [0, 5.25, -1.42], detailMaterial);
  addBox(detail, [0.08, 0.35, 0.08], [-1.3, 0.98, -1.45], detailMaterial);
  addBox(detail, [0.08, 0.35, 0.08], [1.3, 0.98, -1.45], detailMaterial);
  const crane = new THREE.Group();
  crane.position.set(-3.15, 0, 1.4);
  addBeam(crane, new THREE.Vector3(0, 0.7, 0), new THREE.Vector3(0, 6.7, 0), 0.055, detailMaterial);
  addBeam(crane, new THREE.Vector3(0, 6.65, 0), new THREE.Vector3(3.35, 6.65, 0), 0.055, detailMaterial);
  addBeam(crane, new THREE.Vector3(2.7, 6.65, 0), new THREE.Vector3(2.7, 4.4, 0), 0.028, detailMaterial);
  detail.add(crane);
  model.add(detail);

  const layers: BuildLayer[] = [
    { group: foundation, baseY: 0, revealFrom: 0 },
    { group: structure, baseY: 0.22, revealFrom: 1 },
    { group: envelope, baseY: 0.42, revealFrom: 2 },
    { group: facade, baseY: 0.62, revealFrom: 3 },
    { group: detail, baseY: 0.82, revealFrom: 4 },
  ];

  layers.forEach((layer) => {
    layer.group.position.y = layer.baseY - 1.1;
    layer.group.scale.setScalar(0.72);
    setLayerOpacity(layer, layer.revealFrom === 0 ? 1 : 0);
  });

  return { model, layers };
}

export default function ConstructionScene({ activeStage }: ConstructionSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealStageRef = useRef<(index: number) => void>(() => undefined);
  const initialStageRef = useRef(activeStage);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(DARK, 7, 14);
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(5.7, 3.1, 8.4);
    camera.lookAt(0, 3, 0);

    const webglContext =
      canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!webglContext) {
      root.dataset.fallback = 'true';
      return undefined;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context: webglContext,
        alpha: true,
        antialias: !window.matchMedia('(max-width: 640px)').matches,
        powerPreference: 'high-performance',
      });
    } catch {
      root.dataset.fallback = 'true';
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = !window.matchMedia('(max-width: 640px)').matches;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    scene.add(new THREE.HemisphereLight(0xf0eee8, 0x171817, 2.1));
    const keyLight = new THREE.DirectionalLight(0xf5c842, 3.2);
    keyLight.position.set(-4, 7, 5);
    keyLight.castShadow = renderer.shadowMap.enabled;
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x9aa4a4, 1.4);
    rimLight.position.set(5, 3, -4);
    scene.add(rimLight);

    const { model, layers } = buildArchitecturalModel();
    scene.add(model);
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(5.7, 48),
      new THREE.MeshStandardMaterial({ color: 0x242725, roughness: 0.9, metalness: 0.04 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.02;
    floor.receiveShadow = true;
    scene.add(floor);

    const syncSize = () => {
      const width = root.clientWidth;
      const height = Math.max(root.clientHeight, 360);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    syncSize();
    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(root);

    const revealStage = (index: number, immediate = false) => {
      layers.forEach((layer) => {
        const shouldShow = layer.revealFrom <= index;
        const targetScale = shouldShow ? 1 : 0.72;
        const targetY = shouldShow ? layer.baseY : layer.baseY - 1.1;
        const targetOpacity = shouldShow ? 1 : 0;
        gsap.killTweensOf(layer.group.position);
        gsap.killTweensOf(layer.group.scale);
        layer.group.visible = true;
        if (immediate || reducedMotion) {
          layer.group.position.y = targetY;
          layer.group.scale.setScalar(targetScale);
          setLayerOpacity(layer, targetOpacity);
          return;
        }
        gsap.to(layer.group.position, { y: targetY, duration: 0.85, ease: 'power3.out', overwrite: true });
        gsap.to(layer.group.scale, { x: targetScale, y: targetScale, z: targetScale, duration: 0.9, ease: 'power3.out', overwrite: true });
        const proxy = { opacity: shouldShow ? 0 : 1 };
        gsap.to(proxy, {
          opacity: targetOpacity,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: true,
          onUpdate: () => setLayerOpacity(layer, proxy.opacity),
        });
      });
    };
    revealStage(initialStageRef.current, true);
    revealStageRef.current = (index: number) => revealStage(index);

    const scrollTimeline = reducedMotion
      ? null
      : gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top 78%',
            end: 'bottom 22%',
            scrub: 1.15,
          },
        });
    scrollTimeline?.to(model.rotation, { y: 0.2, x: 0.035, ease: 'none' }, 0);
    scrollTimeline?.to(camera.position, { x: 5.1, y: 4.55, z: 16.8, ease: 'none' }, 0);
    scrollTimeline?.to(model.position, { y: 0.05, ease: 'none' }, 0);

    let frameId = 0;
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.01 });
    visibilityObserver.observe(root);
    const render = () => {
      frameId = requestAnimationFrame(render);
      if (!isVisible) return;
      if (!reducedMotion) {
        model.rotation.z = Math.sin(performance.now() * 0.00032) * 0.006;
      }
      camera.lookAt(0, 3.6, 0);
      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      scrollTimeline?.scrollTrigger?.kill();
      scrollTimeline?.kill();
      gsap.killTweensOf(model.rotation);
      gsap.killTweensOf(camera.position);
      revealStageRef.current = () => undefined;
      scene.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        child.geometry.dispose();
        if (Array.isArray(child.material)) child.material.forEach((material) => material.dispose());
        else child.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    revealStageRef.current(activeStage);
  }, [activeStage]);

  return (
    <div className="lr-three-scene" ref={rootRef} data-stage={activeStage} aria-label="Three dimensional architectural build visualization">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="lr-three-scene-legend lr-mono">
        <span>THREE / STRUCTURAL MODEL</span><span>STAGE {String(activeStage + 1).padStart(2, '0')} OF 05</span>
      </div>
    </div>
  );
}