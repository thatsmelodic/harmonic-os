'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import type { DistrictId } from '@/data/cinematic-districts';
import { districtModelAssets, type DistrictModelAsset } from '@/data/district-models';

export type WebGLDistrictCanvasProps = {
  district: DistrictId;
  accent: string;
  skyTop: string;
  skyBottom: string;
  activeLandmark: number;
  quality: 'cinematic' | 'performance';
};

type CameraTarget = { position: [number, number, number]; lookAt: [number, number, number] };

const routes: Record<DistrictId, CameraTarget[]> = {
  universe: [
    { position: [0, 6, 18], lookAt: [0, 2, -2] }, { position: [-10, 5, 12], lookAt: [-4, 2, -5] },
    { position: [10, 5, 12], lookAt: [4, 2, -5] }, { position: [0, 10, 15], lookAt: [0, 1, -9] },
    { position: [7, 6, 17], lookAt: [2, 2, -2] },
  ],
  'two-harmonic': [
    { position: [0, 4, 15], lookAt: [0, 1.5, -3] }, { position: [-7, 4, 10], lookAt: [-3, 2, -5] },
    { position: [7, 4, 10], lookAt: [3, 2, -5] }, { position: [0, 8, 14], lookAt: [0, 0, -8] },
  ],
  'fried-em': [
    { position: [0, 5, 15], lookAt: [0, 0.5, -3] }, { position: [-8, 3.5, 10], lookAt: [-3, 1, -5] },
    { position: [8, 4, 10], lookAt: [3, 1, -5] }, { position: [0, 9, 13], lookAt: [0, 0, -7] },
  ],
  schmackinn: [
    { position: [0, 4.5, 15], lookAt: [0, 1.5, -4] }, { position: [-8, 3.2, 10], lookAt: [-3, 1.5, -6] },
    { position: [8, 3.4, 10], lookAt: [3, 1.5, -6] }, { position: [0, 7, 13], lookAt: [0, 1, -8] },
  ],
  melodic: [
    { position: [0, 5, 16], lookAt: [0, 2, -4] }, { position: [-7, 4, 11], lookAt: [-3, 2, -6] },
    { position: [7, 4, 11], lookAt: [3, 2, -6] }, { position: [0, 9, 14], lookAt: [0, 1, -9] },
  ],
  business: [
    { position: [0, 6, 18], lookAt: [0, 3, -5] }, { position: [-9, 5, 13], lookAt: [-4, 3, -7] },
    { position: [9, 5, 13], lookAt: [4, 3, -7] }, { position: [0, 11, 16], lookAt: [0, 2, -11] },
  ],
};

function CameraRig({ district, activeLandmark }: Pick<WebGLDistrictCanvasProps, 'district' | 'activeLandmark'>) {
  const { camera, pointer } = useThree();
  const keys = useRef({ forward: false, back: false, left: false, right: false });
  const freeOffset = useRef(new THREE.Vector3());
  const target = useMemo(() => {
    const districtRoutes = routes[district];
    return districtRoutes[activeLandmark % districtRoutes.length];
  }, [district, activeLandmark]);
  const lookAt = useRef(new THREE.Vector3(...target.lookAt));

  useEffect(() => {
    lookAt.current.set(...target.lookAt);
    freeOffset.current.multiplyScalar(0.35);
  }, [target]);

  useEffect(() => {
    const setKey = (event: KeyboardEvent, pressed: boolean) => {
      const key = event.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') keys.current.forward = pressed;
      if (key === 's' || key === 'arrowdown') keys.current.back = pressed;
      if (key === 'a' || key === 'arrowleft') keys.current.left = pressed;
      if (key === 'd' || key === 'arrowright') keys.current.right = pressed;
    };
    const down = (event: KeyboardEvent) => setKey(event, true);
    const up = (event: KeyboardEvent) => setKey(event, false);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);

  useFrame((_, delta) => {
    const speed = Math.min(delta, 0.05) * 4.5;
    if (keys.current.forward) freeOffset.current.z -= speed;
    if (keys.current.back) freeOffset.current.z += speed;
    if (keys.current.left) freeOffset.current.x -= speed;
    if (keys.current.right) freeOffset.current.x += speed;
    freeOffset.current.x = THREE.MathUtils.clamp(freeOffset.current.x, -4, 4);
    freeOffset.current.z = THREE.MathUtils.clamp(freeOffset.current.z, -5, 3);

    const desired = new THREE.Vector3(
      target.position[0] + pointer.x * 0.9 + freeOffset.current.x,
      target.position[1] + pointer.y * 0.35,
      target.position[2] + freeOffset.current.z,
    );
    camera.position.lerp(desired, 1 - Math.pow(0.002, delta));
    camera.lookAt(lookAt.current.x + freeOffset.current.x * 0.35, lookAt.current.y, lookAt.current.z + freeOffset.current.z * 0.45);
  });
  return null;
}

function OptionalModel({ asset }: { asset: DistrictModelAsset }) {
  const group = useRef<THREE.Group>(null);
  const [scene, setScene] = useState<THREE.Group | null>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    let alive = true;
    const loader = new GLTFLoader();
    loader.load(
      asset.url,
      (gltf) => {
        if (!alive) return;
        const clone = gltf.scene.clone(true);
        clone.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        if (asset.animated && gltf.animations.length) {
          mixer.current = new THREE.AnimationMixer(clone);
          gltf.animations.forEach((clip) => mixer.current?.clipAction(clip).play());
        }
        setScene(clone);
      },
      undefined,
      () => { if (alive) setScene(null); },
    );
    return () => { alive = false; mixer.current?.stopAllAction(); };
  }, [asset]);

  useFrame((_, delta) => mixer.current?.update(delta));
  if (!scene) return null;
  const scale = typeof asset.scale === 'number' ? [asset.scale, asset.scale, asset.scale] : asset.scale ?? [1, 1, 1];
  return <primitive ref={group} object={scene} position={asset.position} rotation={asset.rotation ?? [0, 0, 0]} scale={scale} />;
}

function AssetLayer({ district }: { district: DistrictId }) {
  return <>{districtModelAssets[district].map((asset) => <OptionalModel key={asset.id} asset={asset} />)}</>;
}

function Building({ x, z, height, width, accent, glow }: { x: number; z: number; height: number; width: number; accent: string; glow: boolean }) {
  return (
    <group position={[x, height / 2 - 0.45, z]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, 1.8]} />
        <meshStandardMaterial color="#11141c" metalness={0.78} roughness={0.28} emissive={glow ? accent : '#000000'} emissiveIntensity={glow ? 0.06 : 0} />
      </mesh>
      <mesh position={[0, 0, 0.91]}>
        <planeGeometry args={[width * 0.72, height * 0.78]} />
        <meshBasicMaterial color={accent} transparent opacity={glow ? 0.5 : 0.18} toneMapped={false} />
      </mesh>
    </group>
  );
}

function ProceduralCity({ district, accent }: { district: DistrictId; accent: string }) {
  const towers = useMemo(() => Array.from({ length: 34 }, (_, index) => {
    const lane = index % 2 === 0 ? -1 : 1;
    const row = Math.floor(index / 2);
    return {
      x: lane * (4.3 + (row % 3) * 1.2), z: -2 - row * 1.45,
      height: 2.4 + ((index * 5) % 8) * 0.55, width: 1.15 + ((index * 3) % 4) * 0.22,
    };
  }), []);
  return <group>{towers.map((tower, index) => <Building key={index} {...tower} accent={accent} glow={district === 'business' || district === 'melodic'} />)}</group>;
}

function Ground({ accent, district }: { accent: string; district: DistrictId }) {
  const groundColor = district === 'two-harmonic' ? '#6f5940' : district === 'fried-em' ? '#24130d' : '#07090e';
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.55, -7]}>
        <planeGeometry args={[90, 90, 20, 20]} />
        <meshStandardMaterial color={groundColor} metalness={district === 'schmackinn' ? 0.7 : 0.3} roughness={district === 'schmackinn' ? 0.22 : 0.72} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.51, -9]}>
        <planeGeometry args={[4.4, 46]} />
        <meshStandardMaterial color="#151820" metalness={0.5} roughness={0.42} />
      </mesh>
      {Array.from({ length: 14 }, (_, index) => <mesh key={index} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 10 - index * 3.5]}><planeGeometry args={[0.16, 1.2]} /><meshBasicMaterial color={accent} toneMapped={false} /></mesh>)}
    </group>
  );
}

function DistrictHero({ district, accent }: { district: DistrictId; accent: string }) {
  if (district === 'fried-em') return <group position={[0, 0, -4]}><mesh position={[0, 1.8, -5.4]} castShadow><boxGeometry args={[4.2, 2.4, 0.16]} /><meshStandardMaterial color="#ddd" /></mesh><mesh position={[0, .78, -4.6]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.8, .08, 14, 40]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.6} /></mesh><Float speed={2.2} rotationIntensity={0.15} floatIntensity={0.4}><mesh position={[2.5, .2, 1.2]} castShadow><sphereGeometry args={[.48, 32, 32]} /><meshStandardMaterial color="#d64a12" roughness={.7} /></mesh></Float></group>;
  if (district === 'two-harmonic') return <group position={[0, 0, -4]}><mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.45, -2]} receiveShadow><planeGeometry args={[7, 24]} /><meshStandardMaterial color="#dfc9a0" metalness={.28} roughness={.34} /></mesh>{[-1.8, 0, 1.8].map((x, i) => <Float key={x} speed={1.2 + i * .2} rotationIntensity={.22} floatIntensity={.5}><mesh position={[x, 1.55 + i * .2, -2 - i]} castShadow><capsuleGeometry args={[.48, 1.8, 8, 20]} /><meshStandardMaterial color={i === 1 ? '#17120f' : '#eadbbd'} roughness={.55} /></mesh></Float>)}</group>;
  if (district === 'schmackinn') return <group position={[0, 0, -4]}>{[-4, 0, 4].map((x, i) => <group key={x} position={[x, 1.2, -3 - Math.abs(x) * .35]}><mesh castShadow><boxGeometry args={[3.3, 2.8, 3]} /><meshStandardMaterial color={i === 1 ? '#251027' : '#15121b'} metalness={.45} roughness={.4} /></mesh><mesh position={[0, .3, 1.52]}><planeGeometry args={[2.5, 1.25]} /><meshBasicMaterial color={accent} transparent opacity={.72} toneMapped={false} /></mesh></group>)}</group>;
  if (district === 'melodic') return <group position={[0, 0, -4]}>{[-3.3, 3.3].map((x) => <group key={x} position={[x, 2.4, -3]}><mesh castShadow><boxGeometry args={[2.4, 5.5, 2]} /><meshStandardMaterial color="#101321" metalness={.72} roughness={.25} /></mesh>{[1.2, -.6].map((y) => <mesh key={y} position={[0, y, 1.05]}><cylinderGeometry args={[.7, .7, .18, 40]} /><meshStandardMaterial color="#07080c" emissive={accent} emissiveIntensity={.55} /></mesh>)}</group>)}{Array.from({ length: 18 }, (_, i) => <mesh key={i} position={[-4.25 + i * .5, 1 + Math.sin(i * .9) * .9, -1.7]}><boxGeometry args={[.18, .35 + Math.abs(Math.sin(i)) * 1.6, .18]} /><meshBasicMaterial color={accent} toneMapped={false} /></mesh>)}</group>;
  if (district === 'business') return <group position={[0, 0, -5]}>{[-4.5, -1.5, 1.5, 4.5].map((x, i) => <mesh key={x} position={[x, 2.5 + i * .75, -3 - i * .9]} castShadow><boxGeometry args={[2.2, 6 + i * 1.4, 2.2]} /><meshStandardMaterial color="#283340" metalness={.88} roughness={.18} emissive={accent} emissiveIntensity={.08} /></mesh>)}</group>;
  return null;
}

function Scene(props: WebGLDistrictCanvasProps) {
  const fogColor = useMemo(() => new THREE.Color(props.skyTop), [props.skyTop]);
  return <><color attach="background" args={[props.skyTop]} /><fog attach="fog" args={[fogColor, 18, props.quality === 'cinematic' ? 62 : 44]} /><ambientLight intensity={.55} /><hemisphereLight args={[props.accent, '#08090d', 1.2]} /><directionalLight position={[8, 16, 8]} intensity={2.2} color={props.accent} castShadow={props.quality === 'cinematic'} shadow-mapSize-width={1024} shadow-mapSize-height={1024} /><pointLight position={[-8, 4, 2]} intensity={22} distance={24} color={props.accent} /><Ground accent={props.accent} district={props.district} /><ProceduralCity district={props.district} accent={props.accent} /><DistrictHero district={props.district} accent={props.accent} /><AssetLayer district={props.district} />{props.quality === 'cinematic' && <Stars radius={70} depth={42} count={1700} factor={3} saturation={.1} fade speed={.25} />}{props.quality === 'cinematic' && <Sparkles count={props.district === 'schmackinn' ? 95 : 58} scale={[28, 10, 32]} size={1.6} speed={.18} color={props.accent} />}<CameraRig district={props.district} activeLandmark={props.activeLandmark} /></>;
}

export function WebGLDistrictCanvasV2(props: WebGLDistrictCanvasProps) {
  return <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}><Canvas dpr={props.quality === 'cinematic' ? [1, 1.75] : 1} camera={{ position: [0, 6, 18], fov: 46, near: .1, far: 130 }} shadows={props.quality === 'cinematic'} gl={{ antialias: props.quality === 'cinematic', alpha: false, powerPreference: 'high-performance' }}><Suspense fallback={null}><Scene {...props} /></Suspense></Canvas></div>;
}
