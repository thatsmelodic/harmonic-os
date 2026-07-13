'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Float, MeshReflectorMaterial, Sparkles } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { WebGLDistrictCanvasProps } from './WebGLDistrictCanvasV3';

type Route = { position: [number, number, number]; lookAt: [number, number, number] };

const routes: Route[] = [
  { position: [0, 6.4, 22], lookAt: [0, 2.4, -5] },
  { position: [-13, 5.2, 13], lookAt: [-5.2, 2.6, -9] },
  { position: [12, 4.8, 11], lookAt: [5.5, 2, -8] },
  { position: [0, 10.5, 16], lookAt: [0, 1.4, -12] },
  { position: [8, 6.5, 18], lookAt: [1.5, 2.2, -5] },
];

const palette = {
  ivory: '#e7d6b6',
  sand: '#b58a5b',
  dune: '#8c6848',
  gold: '#e5b95f',
  obsidian: '#11100e',
  olive: '#777054',
  lavender: '#b7a6d6',
};

function CameraRig({ activeLandmark }: { activeLandmark: number }) {
  const { camera, pointer } = useThree();
  const route = routes[activeLandmark % routes.length];
  const position = useRef(new THREE.Vector3(...route.position));
  const look = useRef(new THREE.Vector3(...route.lookAt));
  const free = useRef(new THREE.Vector3());
  const keys = useRef({ w: false, a: false, s: false, d: false });

  useEffect(() => {
    position.current.set(...route.position);
    look.current.set(...route.lookAt);
    free.current.multiplyScalar(.2);
  }, [route]);

  useEffect(() => {
    const setKey = (event: KeyboardEvent, pressed: boolean) => {
      const key = event.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') keys.current.w = pressed;
      if (key === 's' || key === 'arrowdown') keys.current.s = pressed;
      if (key === 'a' || key === 'arrowleft') keys.current.a = pressed;
      if (key === 'd' || key === 'arrowright') keys.current.d = pressed;
    };
    const down = (event: KeyboardEvent) => setKey(event, true);
    const up = (event: KeyboardEvent) => setKey(event, false);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  useFrame(({ clock }, delta) => {
    const speed = Math.min(delta, .05) * 4;
    if (keys.current.w) free.current.z -= speed;
    if (keys.current.s) free.current.z += speed;
    if (keys.current.a) free.current.x -= speed;
    if (keys.current.d) free.current.x += speed;
    free.current.x = THREE.MathUtils.clamp(free.current.x, -5, 5);
    free.current.z = THREE.MathUtils.clamp(free.current.z, -6, 4);
    const breathe = Math.sin(clock.elapsedTime * .19) * .14;
    const desired = position.current.clone().add(new THREE.Vector3(pointer.x * 1.25 + free.current.x, pointer.y * .5 + breathe, free.current.z));
    camera.position.lerp(desired, 1 - Math.pow(.001, delta));
    camera.lookAt(look.current.x + free.current.x * .28, look.current.y, look.current.z + free.current.z * .35);
  });
  return null;
}

function Stone({ color = palette.ivory, metalness = .08, roughness = .64 }: { color?: string; metalness?: number; roughness?: number }) {
  return <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />;
}

function Gold({ intensity = .25 }: { intensity?: number }) {
  return <meshStandardMaterial color={palette.gold} metalness={.8} roughness={.22} emissive={palette.gold} emissiveIntensity={intensity} />;
}

function Dunes() {
  const dunes = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    x: ((i * 17) % 42) - 21,
    z: -8 - ((i * 13) % 38),
    sx: 5 + ((i * 5) % 8),
    sy: .8 + ((i * 7) % 4) * .25,
    sz: 2.5 + ((i * 3) % 6),
    rot: ((i % 5) - 2) * .08,
  })), []);
  return <group>{dunes.map((dune, i) => <mesh key={i} position={[dune.x, -.2, dune.z]} scale={[dune.sx, dune.sy, dune.sz]} rotation={[0, dune.rot, 0]} receiveShadow><sphereGeometry args={[1, 32, 18]} /><meshStandardMaterial color={i % 3 === 0 ? palette.dune : palette.sand} roughness={.96} /></mesh>)}</group>;
}

function CamoTile({ position, rotation = [-Math.PI / 2, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return <group position={position} rotation={rotation}>{[
    [-.55, .28, .22, .42, palette.olive],
    [.2, -.12, .38, .24, palette.obsidian],
    [.44, .3, .22, .34, palette.dune],
    [-.12, -.38, .34, .18, palette.gold],
  ].map(([x, y, sx, sy, color], i) => <mesh key={i} position={[x as number, y as number, .012]} scale={[sx as number, sy as number, 1]}><circleGeometry args={[1, 18]} /><meshBasicMaterial color={color as string} transparent opacity={.66} /></mesh>)}</group>;
}

function FrequencyGate() {
  return <group position={[0, 0, 2]}>
    {[-4.2, 4.2].map((x, i) => <group key={x} position={[x, 3.5, 0]} rotation={[0, 0, i ? -.12 : .12]}>
      <mesh castShadow><boxGeometry args={[2.2, 7.2, 2.3]} /><Stone color={palette.dune} /></mesh>
      <mesh position={[0, .4, 1.17]}><torusGeometry args={[.72, .13, 18, 64]} /><Gold intensity={.55} /></mesh>
      <mesh position={[0, -2.55, 1.2]}><planeGeometry args={[1.2, 1.2]} /><meshBasicMaterial color={palette.gold} transparent opacity={.35} /></mesh>
    </group>)}
    <mesh position={[0, 6.2, 0]} castShadow><boxGeometry args={[8.8, 1.1, 2.1]} /><Stone color={palette.ivory} /></mesh>
    <mesh position={[-1.05, 4.15, 1.12]} rotation={[Math.PI / 2, 0, .68]}><torusGeometry args={[1.1, .12, 16, 80]} /><Gold intensity={.65} /></mesh>
    <mesh position={[1.05, 4.15, 1.12]} rotation={[Math.PI / 2, 0, -.68]}><torusGeometry args={[1.1, .12, 16, 80]} /><Gold intensity={.65} /></mesh>
    <mesh position={[0, 2.45, -.05]} castShadow><boxGeometry args={[4.9, 4.9, .8]} /><meshStandardMaterial color={palette.obsidian} metalness={.72} roughness={.28} /></mesh>
    <mesh position={[0, 2.45, .4]}><planeGeometry args={[3.9, 3.9]} /><meshBasicMaterial color={palette.gold} transparent opacity={.12} /></mesh>
  </group>;
}

function Column({ x, z, height = 5.6 }: { x: number; z: number; height?: number }) {
  return <group position={[x, 0, z]}><mesh position={[0, height / 2, 0]} castShadow><cylinderGeometry args={[.48, .62, height, 20]} /><Stone /></mesh><mesh position={[0, height + .18, 0]} castShadow><boxGeometry args={[1.2, .36, 1.2]} /><Gold intensity={.14} /></mesh></group>;
}

function IvoryPalace() {
  return <group position={[-7.5, 0, -10]}>
    <mesh position={[0, 3.2, -1]} castShadow receiveShadow><boxGeometry args={[8.5, 6.4, 5.3]} /><Stone color={palette.ivory} roughness={.52} /></mesh>
    <mesh position={[0, 3.6, 1.68]}><planeGeometry args={[6.8, 4.8]} /><meshStandardMaterial color={palette.obsidian} metalness={.82} roughness={.2} /></mesh>
    {[-3.2, -1.1, 1.1, 3.2].map((x) => <Column key={x} x={x} z={2.15} height={6.2} />)}
    <mesh position={[0, 6.75, -.8]}><boxGeometry args={[9.4, .55, 5.8]} /><Gold intensity={.18} /></mesh>
    <mesh position={[0, 1.4, 2.23]}><planeGeometry args={[2.5, 2.8]} /><meshBasicMaterial color={palette.gold} transparent opacity={.5} /></mesh>
    <Float speed={1.1} rotationIntensity={.08} floatIntensity={.38}><group position={[0, 2.2, 4.5]}>
      <mesh castShadow><capsuleGeometry args={[.72, 2.5, 10, 24]} /><meshStandardMaterial color={palette.ivory} roughness={.5} /></mesh>
      <mesh position={[0, .25, .66]}><torusGeometry args={[.24, .055, 14, 42]} /><Gold intensity={.5} /></mesh>
      <mesh position={[0, 1.4, 0]}><sphereGeometry args={[.5, 24, 24]} /><meshStandardMaterial color={palette.obsidian} roughness={.42} /></mesh>
    </group></Float>
  </group>;
}

function LavenderTemple() {
  return <group position={[7.5, 0, -11]}>
    <mesh position={[0, 2.7, -1.5]} castShadow><boxGeometry args={[7.2, 5.4, 4.6]} /><Stone color="#cbbda8" /></mesh>
    <mesh position={[0, 5.8, -1.5]} rotation={[0, Math.PI / 4, 0]} castShadow><octahedronGeometry args={[3.1, 0]} /><meshStandardMaterial color={palette.lavender} transparent opacity={.22} metalness={.52} roughness={.18} /></mesh>
    {[-2.7, -.9, .9, 2.7].map((x) => <Column key={x} x={x} z={1.15} height={4.8} />)}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.43, 3.4]}><planeGeometry args={[7, 7]} /><MeshReflectorMaterial mirror={.72} blur={[180, 60]} resolution={256} mixStrength={16} roughness={.35} color="#8f82a8" metalness={.3} /></mesh>
    <pointLight position={[0, 4, 2]} color={palette.lavender} intensity={16} distance={13} />
  </group>;
}

function BecomingCourtyard() {
  return <group position={[0, 0, -5]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.47, 0]} receiveShadow><circleGeometry args={[5.4, 64]} /><Stone color="#cab18c" /></mesh>
    {[0, 1, 2, 3].map((i) => {
      const angle = i * Math.PI / 2 + Math.PI / 4;
      const x = Math.cos(angle) * 3.7;
      const z = Math.sin(angle) * 3.7;
      return <group key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
        <mesh position={[0, .35, 0]} castShadow><cylinderGeometry args={[.78, .95, .7, 24]} /><Stone color={palette.dune} /></mesh>
        <mesh position={[0, 1.7, 0]} castShadow><capsuleGeometry args={[.38 + i * .05, 1.6 + i * .25, 8, 16]} /><meshStandardMaterial color={i < 2 ? palette.dune : palette.ivory} roughness={i < 2 ? .95 : .48} /></mesh>
        <mesh position={[0, 3, 0]} castShadow><sphereGeometry args={[.42, 20, 20]} /><meshStandardMaterial color={i < 2 ? palette.dune : palette.ivory} roughness={i < 2 ? .95 : .48} /></mesh>
      </group>;
    })}
    <Float speed={.9} rotationIntensity={.12} floatIntensity={.32}><mesh position={[0, 2.1, 0]} castShadow><capsuleGeometry args={[.65, 2.2, 10, 22]} /><meshStandardMaterial color="#d8c4a4" roughness={.52} /></mesh></Float>
  </group>;
}

function LegacyPassage() {
  return <group position={[0, 0, -16]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.5, 0]} receiveShadow><planeGeometry args={[5.2, 26]} /><Stone color="#aa8056" /></mesh>
    {Array.from({ length: 10 }, (_, i) => {
      const z = 8 - i * 2.8;
      return <group key={i}>{[-3.2, 3.2].map((x) => <group key={x} position={[x, 0, z]}>
        <mesh position={[0, .45, 0]} castShadow><boxGeometry args={[1.25, .9, 1.25]} /><Stone color={palette.obsidian} roughness={.3} /></mesh>
        <mesh position={[0, 1.85, 0]} castShadow><capsuleGeometry args={[.36, 1.55, 8, 14]} /><meshStandardMaterial color={i % 3 === 0 ? palette.olive : palette.ivory} roughness={.62} /></mesh>
        <CamoTile position={[0, 1.85, .38]} rotation={[0, 0, 0]} />
      </group>)}</group>;
    })}
  </group>;
}

function Banners() {
  const banners = useMemo(() => Array.from({ length: 10 }, (_, i) => ({ x: (i % 2 ? 1 : -1) * (5.2 + (i % 3) * 2.2), z: -2 - i * 3.8, phase: i * .55 })), []);
  return <group>{banners.map((banner, i) => <Float key={i} speed={.55 + i * .02} rotationIntensity={.08} floatIntensity={.18}><group position={[banner.x, 2.8, banner.z]}>
    <mesh position={[0, -1.4, 0]} castShadow><cylinderGeometry args={[.05, .07, 5.8, 10]} /><meshStandardMaterial color={palette.obsidian} metalness={.8} roughness={.25} /></mesh>
    <mesh position={[.72, .55, 0]}><planeGeometry args={[1.5, 3.4, 10, 10]} /><meshStandardMaterial color={i % 2 ? palette.olive : palette.dune} side={THREE.DoubleSide} roughness={.7} /></mesh>
    <mesh position={[.72, .55, .01]}><ringGeometry args={[.34, .43, 36]} /><meshBasicMaterial color={palette.gold} side={THREE.DoubleSide} /></mesh>
  </group></Float>)}</group>;
}

function Scene(props: WebGLDistrictCanvasProps) {
  return <>
    <color attach="background" args={['#7c5f45']} />
    <fog attach="fog" args={['#9b7959', 22, props.quality === 'cinematic' ? 78 : 55]} />
    <ambientLight intensity={.72} />
    <hemisphereLight args={['#ffe7b8', '#332419', 1.7]} />
    <directionalLight position={[14, 20, 10]} intensity={3.4} color="#ffd28a" castShadow={props.quality === 'cinematic'} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
    <pointLight position={[0, 7, 3]} intensity={22} distance={28} color={palette.gold} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.6, -12]} receiveShadow><planeGeometry args={[120, 120]} /><meshStandardMaterial color="#9d7652" roughness={.96} /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.53, -5]} receiveShadow><planeGeometry args={[7, 42]} /><MeshReflectorMaterial mirror={.5} blur={[260, 90]} resolution={512} mixStrength={18} roughness={.62} color="#c7a77a" metalness={.16} /></mesh>
    {Array.from({ length: 12 }, (_, i) => <CamoTile key={i} position={[0, -.5, 12 - i * 3.6]} />)}
    <Dunes />
    <FrequencyGate />
    <IvoryPalace />
    <LavenderTemple />
    <BecomingCourtyard />
    <LegacyPassage />
    <Banners />
    {props.quality === 'cinematic' && <ContactShadows position={[0, -.52, -5]} opacity={.58} scale={48} blur={2.8} far={28} />}
    {props.quality === 'cinematic' && <Sparkles count={150} scale={[48, 13, 58]} size={2.1} speed={.12} color={palette.gold} />}
    <CameraRig activeLandmark={props.activeLandmark} />
  </>;
}

export function TwoHarmonicDynastyCanvas(props: WebGLDistrictCanvasProps) {
  return <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}><Canvas dpr={props.quality === 'cinematic' ? [1, 1.7] : 1} camera={{ position: [0, 6.4, 22], fov: 45, near: .1, far: 160 }} shadows={props.quality === 'cinematic'} gl={{ antialias: props.quality === 'cinematic', alpha: false, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping }}><Suspense fallback={null}><Scene {...props} /></Suspense></Canvas></div>;
}
