'use client';

import { Float, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type Props = {
  accent: string;
  quality: 'cinematic' | 'performance';
};

type V3 = [number, number, number];

const SAND = '#b99a68';
const IVORY = '#eadfca';
const LIMESTONE = '#cdb88f';
const WALNUT = '#5b442e';
const OBSIDIAN = '#11100e';
const GOLD = '#d6aa45';
const OLIVE = '#6d6a4f';
const LAVENDER = '#9f89bd';
const CAMO = [SAND, '#907553', WALNUT, OLIVE, OBSIDIAN, IVORY];

function Box({ position, scale, color = LIMESTONE, metalness = 0.08, roughness = 0.82 }: {
  position: V3;
  scale: V3;
  color?: string;
  metalness?: number;
  roughness?: number;
}) {
  return <mesh position={position} scale={scale} castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
  </mesh>;
}

function Dune({ position, scale, rotation = 0 }: { position: V3; scale: V3; rotation?: number }) {
  return <mesh position={position} scale={scale} rotation={[0, rotation, 0]} receiveShadow>
    <sphereGeometry args={[1, 48, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
    <meshStandardMaterial color={SAND} roughness={1} />
  </mesh>;
}

function HarmonicCrest({ position, scale = 1, rotation = [0, 0, 0] }: { position: V3; scale?: number; rotation?: V3 }) {
  return <group position={position} scale={scale} rotation={rotation}>
    <mesh rotation={[0, 0, Math.PI / 4]}>
      <torusGeometry args={[0.72, 0.11, 18, 72]} />
      <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.38} metalness={0.92} roughness={0.16} />
    </mesh>
    <mesh rotation={[0, 0, -Math.PI / 4]}>
      <torusGeometry args={[0.72, 0.11, 18, 72]} />
      <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.38} metalness={0.92} roughness={0.16} />
    </mesh>
  </group>;
}

function Banner({ position, rotation = 0, color = WALNUT }: { position: V3; rotation?: number; color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.85 + position[0] * 0.3) * 0.045;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.45 + position[2]) * 0.025;
  });
  return <group position={position} rotation={[0, rotation, 0]}>
    <mesh position={[0, 1.8, 0]} castShadow>
      <cylinderGeometry args={[0.045, 0.06, 3.6, 10]} />
      <meshStandardMaterial color={OBSIDIAN} metalness={0.8} roughness={0.25} />
    </mesh>
    <mesh ref={ref} position={[0.7, 2.35, 0]} castShadow>
      <planeGeometry args={[1.35, 2.1, 12, 8]} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.72} />
    </mesh>
    <HarmonicCrest position={[0.7, 2.35, 0.02]} scale={0.3} />
  </group>;
}

function Palm({ position, scale = 1 }: { position: V3; scale?: number }) {
  const leaves = useMemo(() => Array.from({ length: 9 }, (_, i) => i * Math.PI / 4.5), []);
  return <group position={position} scale={scale}>
    <mesh position={[0, 1.8, 0]} castShadow>
      <cylinderGeometry args={[0.14, 0.22, 3.6, 10]} />
      <meshStandardMaterial color="#5c3a20" roughness={0.95} />
    </mesh>
    {leaves.map((angle, i) => <mesh key={i} position={[Math.cos(angle) * 0.55, 3.7, Math.sin(angle) * 0.55]} rotation={[0.35, -angle, i % 2 ? 0.18 : -0.18]} castShadow>
      <capsuleGeometry args={[0.12, 1.3, 5, 10]} />
      <meshStandardMaterial color={i % 2 ? OLIVE : '#777252'} roughness={0.9} />
    </mesh>)}
  </group>;
}

function Obelisk({ position, height = 6 }: { position: V3; height?: number }) {
  return <group position={position}>
    <Box position={[0, height / 2, 0]} scale={[0.72, height, 0.72]} color={LIMESTONE} />
    <mesh position={[0, height + 0.45, 0]} castShadow>
      <coneGeometry args={[0.62, 0.9, 4]} />
      <meshStandardMaterial color={GOLD} metalness={0.76} roughness={0.22} />
    </mesh>
    {[1.3, 2.6, 3.9].filter((y) => y < height).map((y) => <mesh key={y} position={[0, y, 0.37]}>
      <planeGeometry args={[0.24, 0.42]} />
      <meshBasicMaterial color={GOLD} transparent opacity={0.72} toneMapped={false} />
    </mesh>)}
  </group>;
}

function RoyalGuard({ position, rotation = 0, tone = OLIVE }: { position: V3; rotation?: number; tone?: string }) {
  return <group position={position} rotation={[0, rotation, 0]}>
    <mesh position={[0, 1.25, 0]} castShadow>
      <capsuleGeometry args={[0.28, 1.4, 7, 14]} />
      <meshStandardMaterial color={tone} roughness={0.72} />
    </mesh>
    <mesh position={[0, 2.25, 0]} castShadow>
      <sphereGeometry args={[0.28, 16, 16]} />
      <meshStandardMaterial color={OBSIDIAN} roughness={0.55} />
    </mesh>
    <mesh position={[0, 2.65, 0]} castShadow>
      <coneGeometry args={[0.34, 0.9, 4]} />
      <meshStandardMaterial color={GOLD} metalness={0.82} roughness={0.2} />
    </mesh>
    <mesh position={[0, 1.3, 0.29]}>
      <planeGeometry args={[0.38, 0.9]} />
      <meshStandardMaterial color={CAMO[2]} roughness={0.8} />
    </mesh>
  </group>;
}

function FrequencyGate() {
  return <group position={[0, 0, 3]}>
    {[-5.4, 5.4].map((x) => <group key={x} position={[x, 0, 0]}>
      <Box position={[0, 3.7, 0]} scale={[2.6, 7.4, 2.2]} />
      <Box position={[0, 7.6, 0]} scale={[3.1, 0.9, 2.6]} color={IVORY} />
      <HarmonicCrest position={[0, 4.7, 1.14]} scale={0.95} />
      <Banner position={[x < 0 ? 1.5 : -1.5, 1.0, 1.25]} rotation={x < 0 ? 0.06 : -0.06} color={x < 0 ? WALNUT : OLIVE} />
      <RoyalGuard position={[x < 0 ? 1.2 : -1.2, -0.45, 2.1]} rotation={x < 0 ? 0.2 : -0.2} />
    </group>)}
    <Box position={[0, 7.7, 0]} scale={[8.7, 0.9, 2.4]} color={IVORY} />
    <HarmonicCrest position={[0, 7.75, 1.3]} scale={1.5} />
    <mesh position={[0, 0.25, 0.7]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2.1, 2.22, 80]} />
      <meshBasicMaterial color={GOLD} toneMapped={false} />
    </mesh>
  </group>;
}

function IvoryPalace() {
  const columns = useMemo(() => [-7.5, -5, -2.5, 2.5, 5, 7.5], []);
  return <group position={[0, 0, -15]}>
    <Box position={[0, 2.3, 0]} scale={[19, 4.6, 8.4]} color={IVORY} />
    <Box position={[0, 5.4, -0.8]} scale={[14.2, 2.1, 5.8]} color={LIMESTONE} />
    <Box position={[0, 7.05, -1.25]} scale={[9.2, 1.15, 4.3]} color={OBSIDIAN} metalness={0.58} roughness={0.22} />
    {columns.map((x) => <group key={x} position={[x, 0, 4.25]}>
      <mesh position={[0, 3, 0]} castShadow>
        <cylinderGeometry args={[0.48, 0.68, 6, 18]} />
        <meshStandardMaterial color={LIMESTONE} roughness={0.78} />
      </mesh>
      <mesh position={[0, 6.25, 0]} castShadow>
        <cylinderGeometry args={[0.76, 0.58, 0.7, 12]} />
        <meshStandardMaterial color={GOLD} metalness={0.72} roughness={0.25} />
      </mesh>
    </group>)}
    <Box position={[0, 2.0, 4.35]} scale={[4.4, 4, 0.42]} color={OBSIDIAN} metalness={0.35} roughness={0.18} />
    <HarmonicCrest position={[0, 2.55, 4.6]} scale={1.25} />
    <mesh position={[0, -0.39, 8.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[7.6, 10]} />
      <meshStandardMaterial color={IVORY} metalness={0.34} roughness={0.28} />
    </mesh>
    <Float speed={0.8} floatIntensity={0.28} rotationIntensity={0.08}>
      <group position={[0, 2.25, 7.2]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.9, 2.6, 10, 24]} />
          <meshStandardMaterial color={IVORY} roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.25, 0.78]}>
          <torusGeometry args={[0.35, 0.06, 16, 40]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.35} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  </group>;
}

function LavenderTemple() {
  return <group position={[-13.5, 0, -9]}>
    <Box position={[0, 1.6, 0]} scale={[6.8, 3.2, 5.8]} color={IVORY} />
    <Box position={[0, 3.7, 0]} scale={[4.6, 0.9, 4.6]} color={LIMESTONE} />
    <mesh position={[0, -0.34, 3.7]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[3.5, 64]} />
      <meshStandardMaterial color="#776b82" metalness={0.5} roughness={0.16} transparent opacity={0.78} />
    </mesh>
    <HarmonicCrest position={[0, 2.2, 2.95]} scale={0.9} />
    <pointLight position={[0, 2.5, 2.3]} color={LAVENDER} intensity={15} distance={12} />
    <Sparkles count={42} scale={[7.5, 4.5, 7.5]} size={2} speed={0.18} color={LAVENDER} />
  </group>;
}

function BecomingCourtyard() {
  const stages = [0.22, 0.48, 0.72, 1];
  return <group position={[13, 0, -7]}>
    <mesh position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[5.8, 64]} />
      <meshStandardMaterial color={IVORY} roughness={0.72} />
    </mesh>
    {stages.map((stage, i) => <group key={stage} position={[-3.4 + i * 2.25, 0, 0]}>
      <mesh position={[0, 1.1, 0]} castShadow scale={[0.62, 0.62 + stage * 0.5, 0.62]}>
        <capsuleGeometry args={[0.5, 1.9, 8, 18]} />
        <meshStandardMaterial color={i === stages.length - 1 ? IVORY : '#9f8d6d'} roughness={1 - stage * 0.45} metalness={stage * 0.12} />
      </mesh>
      <mesh position={[0, 2.35, 0]} castShadow>
        <sphereGeometry args={[0.42, 18, 18]} />
        <meshStandardMaterial color={i === stages.length - 1 ? IVORY : '#9f8d6d'} roughness={1 - stage * 0.45} />
      </mesh>
    </group>)}
    <Obelisk position={[0, 0, -3.5]} height={5.4} />
  </group>;
}

function LegacyPassage() {
  return <group position={[0, 0, -32]}>
    <Box position={[0, 1.7, 0]} scale={[11, 3.4, 6]} color={WALNUT} />
    <Box position={[0, 4.0, 0]} scale={[12.2, 1.2, 6.8]} color={OBSIDIAN} metalness={0.45} roughness={0.25} />
    {[-3.8, -1.25, 1.25, 3.8].map((x, i) => <group key={x} position={[x, 0, 3.1]}>
      <RoyalGuard position={[0, -0.4, 0]} tone={i % 2 ? LIMESTONE : OLIVE} />
    </group>)}
    <HarmonicCrest position={[0, 2.4, 3.42]} scale={1.05} />
  </group>;
}

function DesertCamoRoad() {
  const patches = useMemo(() => Array.from({ length: 64 }, (_, i) => ({
    x: ((i * 17) % 11 - 5) * 0.62,
    z: 9 - i * 0.82,
    s: 0.32 + ((i * 13) % 5) * 0.11,
    c: CAMO[i % CAMO.length],
    r: (i % 6) * 0.24,
  })), []);
  return <group>
    <mesh position={[0, -0.46, -16]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[9.4, 64]} />
      <meshStandardMaterial color="#8b744f" roughness={0.9} />
    </mesh>
    {patches.map((p, i) => <mesh key={i} position={[p.x, -0.43, p.z]} rotation={[-Math.PI / 2, 0, p.r]}>
      <circleGeometry args={[p.s, 7]} />
      <meshBasicMaterial color={p.c} transparent opacity={0.58} />
    </mesh>)}
    {Array.from({ length: 14 }, (_, i) => <mesh key={i} position={[0, -0.41, 6 - i * 4.1]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.15, 1.25]} />
      <meshBasicMaterial color={GOLD} transparent opacity={0.65} toneMapped={false} />
    </mesh>)}
  </group>;
}

function PyramidHorizon() {
  return <group position={[0, 0, -48]}>
    {[-24, -11, 7, 23].map((x, i) => <mesh key={x} position={[x, 4 + i * 0.4, -Math.abs(x) * 0.08]} castShadow>
      <coneGeometry args={[7 + i * 0.5, 8 + i * 0.8, 4]} />
      <meshStandardMaterial color={i % 2 ? '#a8875f' : '#c4a77a'} roughness={0.95} />
    </mesh>)}
  </group>;
}

export function TwoHarmonicBeigeDynasty({ accent, quality }: Props) {
  const dunes = useMemo(() => [
    { position: [-19, -0.5, -5] as V3, scale: [10, 2.8, 8] as V3, rotation: 0.2 },
    { position: [20, -0.6, -3] as V3, scale: [11, 3.2, 9] as V3, rotation: -0.25 },
    { position: [-24, -0.8, -25] as V3, scale: [14, 4.2, 10] as V3, rotation: 0.35 },
    { position: [25, -0.8, -27] as V3, scale: [16, 4.6, 11] as V3, rotation: -0.35 },
  ], []);

  return <group position={[0, 0, -2]}>
    <PyramidHorizon />
    {dunes.map((d, i) => <Dune key={i} {...d} />)}
    <DesertCamoRoad />
    <FrequencyGate />
    <IvoryPalace />
    <LavenderTemple />
    <BecomingCourtyard />
    <LegacyPassage />
    {[-8.5, 8.5].flatMap((x) => [2, -4, -10, -17, -24].map((z) => <Obelisk key={`${x}-${z}`} position={[x, 0, z]} height={4.8 + Math.abs(z) * 0.045} />))}
    {[-11.5, 11.5].flatMap((x) => [0, -7, -14, -22].map((z, i) => <Palm key={`${x}-${z}`} position={[x, -0.35, z]} scale={0.85 + i * 0.05} />))}
    {[-7, 7].flatMap((x) => [1, -6, -13, -20].map((z, i) => <Banner key={`${x}-${z}`} position={[x, -0.2, z]} color={i % 2 ? WALNUT : OLIVE} />))}
    <pointLight position={[0, 8, -15]} color={GOLD} intensity={24} distance={38} />
    <pointLight position={[-13, 4, -9]} color={LAVENDER} intensity={11} distance={19} />
    <Sparkles count={quality === 'cinematic' ? 150 : 64} scale={[42, 14, 60]} size={1.9} speed={0.11} color={accent || GOLD} />
  </group>;
}
