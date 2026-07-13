'use client';

import { Float, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type Props = {
  accent: string;
  quality: 'cinematic' | 'performance';
};

const SAND = '#b99a68';
const IVORY = '#eadfca';
const LIMESTONE = '#cdb88f';
const WALNUT = '#5b442e';
const OBSIDIAN = '#11100e';
const GOLD = '#d6aa45';
const OLIVE = '#6d6a4f';
const LAVENDER = '#9f89bd';

function Stone({ position, scale, color = LIMESTONE, metalness = 0.08, roughness = 0.82 }: {
  position: [number, number, number];
  scale: [number, number, number];
  color?: string;
  metalness?: number;
  roughness?: number;
}) {
  return <mesh position={position} scale={scale} castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
  </mesh>;
}

function Dune({ position, scale, rotation = 0 }: { position: [number, number, number]; scale: [number, number, number]; rotation?: number }) {
  return <mesh position={position} scale={scale} rotation={[0, rotation, 0]} receiveShadow>
    <sphereGeometry args={[1, 48, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
    <meshStandardMaterial color={SAND} roughness={1} />
  </mesh>;
}

function Banner({ position, rotation = 0, color = WALNUT }: { position: [number, number, number]; rotation?: number; color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.9 + position[0]) * 0.035;
  });
  return <group position={position} rotation={[0, rotation, 0]}>
    <mesh position={[0, 1.8, 0]} castShadow>
      <cylinderGeometry args={[0.045, 0.06, 3.6, 10]} />
      <meshStandardMaterial color={OBSIDIAN} metalness={0.8} roughness={0.25} />
    </mesh>
    <mesh ref={ref} position={[0.7, 2.35, 0]} castShadow>
      <planeGeometry args={[1.35, 2.1, 10, 6]} />
      <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.72} />
    </mesh>
    <mesh position={[0.7, 2.35, 0.01]}>
      <ringGeometry args={[0.22, 0.28, 48]} />
      <meshBasicMaterial color={GOLD} toneMapped={false} />
    </mesh>
  </group>;
}

function Palm({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const leaves = useMemo(() => Array.from({ length: 8 }, (_, i) => i * Math.PI / 4), []);
  return <group position={position} scale={scale}>
    <mesh position={[0, 1.8, 0]} castShadow>
      <cylinderGeometry args={[0.14, 0.22, 3.6, 10]} />
      <meshStandardMaterial color="#5c3a20" roughness={0.95} />
    </mesh>
    {leaves.map((angle, i) => <mesh key={i} position={[Math.cos(angle) * 0.55, 3.7, Math.sin(angle) * 0.55]} rotation={[0.35, -angle, 0]} castShadow>
      <capsuleGeometry args={[0.12, 1.3, 5, 10]} />
      <meshStandardMaterial color={i % 2 ? OLIVE : '#777252'} roughness={0.9} />
    </mesh>)}
  </group>;
}

function Obelisk({ position, height = 6 }: { position: [number, number, number]; height?: number }) {
  return <group position={position}>
    <Stone position={[0, height / 2, 0]} scale={[0.72, height, 0.72]} color={LIMESTONE} />
    <mesh position={[0, height + 0.45, 0]} castShadow>
      <coneGeometry args={[0.62, 0.9, 4]} />
      <meshStandardMaterial color={GOLD} metalness={0.76} roughness={0.22} />
    </mesh>
    {[1.3, 2.6, 3.9].filter((y) => y < height).map((y) => <mesh key={y} position={[0, y, 0.37]}>
      <planeGeometry args={[0.24, 0.42]} />
      <meshBasicMaterial color={GOLD} transparent opacity={0.7} toneMapped={false} />
    </mesh>)}
  </group>;
}

function FrequencyGate() {
  return <group position={[0, 0, 2.5]}>
    {[-5.2, 5.2].map((x) => <group key={x} position={[x, 0, 0]}>
      <Stone position={[0, 3.6, 0]} scale={[2.4, 7.2, 2]} />
      <Stone position={[0, 7.4, 0]} scale={[2.9, 0.8, 2.4]} color={IVORY} />
      <mesh position={[0, 4.5, 1.03]}>
        <torusGeometry args={[0.7, 0.12, 18, 64]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.55} metalness={0.88} roughness={0.18} />
      </mesh>
      <Banner position={[x < 0 ? 1.35 : -1.35, 1.0, 1.2]} rotation={x < 0 ? 0.06 : -0.06} />
    </group>)}
    <Stone position={[0, 7.5, 0]} scale={[8.3, 0.9, 2.2]} color={IVORY} />
    <mesh position={[0, 7.55, 1.2]}>
      <torusKnotGeometry args={[1.05, 0.13, 120, 16, 2, 3]} />
      <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.6} metalness={0.92} roughness={0.15} />
    </mesh>
  </group>;
}

function IvoryPalace() {
  const columns = useMemo(() => [-7, -5, -3, 3, 5, 7], []);
  return <group position={[0, 0, -14]}>
    <Stone position={[0, 2.1, 0]} scale={[18, 4.2, 7.5]} color={IVORY} />
    <Stone position={[0, 5.0, -0.9]} scale={[13, 2.0, 5.0]} color={LIMESTONE} />
    <Stone position={[0, 6.4, -1.3]} scale={[8.2, 0.9, 3.8]} color={OBSIDIAN} metalness={0.58} roughness={0.22} />
    {columns.map((x) => <group key={x} position={[x, 0, 3.7]}>
      <mesh position={[0, 2.8, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.62, 5.6, 16]} />
        <meshStandardMaterial color={LIMESTONE} roughness={0.78} />
      </mesh>
      <mesh position={[0, 5.9, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.55, 0.65, 12]} />
        <meshStandardMaterial color={GOLD} metalness={0.72} roughness={0.25} />
      </mesh>
    </group>)}
    <Stone position={[0, 1.8, 3.85]} scale={[3.6, 3.6, 0.4]} color={OBSIDIAN} metalness={0.35} roughness={0.18} />
    <mesh position={[0, 2.25, 4.08]}>
      <torusKnotGeometry args={[0.92, 0.12, 120, 16, 2, 3]} />
      <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.48} metalness={0.9} roughness={0.16} />
    </mesh>
    <Float speed={0.8} floatIntensity={0.28} rotationIntensity={0.08}>
      <group position={[0, 2.2, 7.0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.85, 2.5, 10, 24]} />
          <meshStandardMaterial color={IVORY} roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.2, 0.72]}>
          <torusGeometry args={[0.33, 0.06, 16, 40]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.35} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  </group>;
}

function LavenderSanctuary() {
  return <group position={[-12.5, 0, -9]}>
    <Stone position={[0, 1.5, 0]} scale={[6.2, 3, 5.2]} color={IVORY} />
    <Stone position={[0, 3.4, 0]} scale={[4.2, 0.8, 4.2]} color={LIMESTONE} />
    <mesh position={[0, 0.05, 3.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[3.2, 64]} />
      <meshStandardMaterial color="#776b82" metalness={0.5} roughness={0.16} transparent opacity={0.75} />
    </mesh>
    <pointLight position={[0, 2.2, 2]} color={LAVENDER} intensity={14} distance={11} />
    <Sparkles count={36} scale={[7, 4, 7]} size={2} speed={0.18} color={LAVENDER} />
  </group>;
}

function BecomingCourtyard() {
  const stages = [0.25, 0.5, 0.75, 1];
  return <group position={[12, 0, -7]}>
    <mesh position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[5.5, 64]} />
      <meshStandardMaterial color={IVORY} roughness={0.72} />
    </mesh>
    {stages.map((stage, i) => <group key={stage} position={[-3.3 + i * 2.2, 0, 0]}>
      <mesh position={[0, 1.1, 0]} castShadow scale={[0.62, 0.62 + stage * 0.5, 0.62]}>
        <capsuleGeometry args={[0.5, 1.9, 8, 18]} />
        <meshStandardMaterial color={i === stages.length - 1 ? IVORY : '#9f8d6d'} roughness={1 - stage * 0.45} metalness={stage * 0.12} />
      </mesh>
      <mesh position={[0, 2.35, 0]} castShadow>
        <sphereGeometry args={[0.42, 18, 18]} />
        <meshStandardMaterial color={i === stages.length - 1 ? IVORY : '#9f8d6d'} roughness={1 - stage * 0.45} />
      </mesh>
    </group>)}
    <Obelisk position={[0, 0, -3.3]} height={5.2} />
  </group>;
}

function LegacyPassage() {
  return <group position={[0, 0, -31]}>
    <Stone position={[0, 1.6, 0]} scale={[10, 3.2, 5.4]} color={WALNUT} />
    <Stone position={[0, 3.8, 0]} scale={[11.2, 1.1, 6.2]} color={OBSIDIAN} metalness={0.45} roughness={0.25} />
    {[-3.4, -1.15, 1.15, 3.4].map((x) => <group key={x} position={[x, 0, 2.8]}>
      <mesh position={[0, 1.3, 0]} castShadow>
        <capsuleGeometry args={[0.45, 1.8, 7, 14]} />
        <meshStandardMaterial color={x < 0 ? OLIVE : LIMESTONE} roughness={0.72} />
      </mesh>
      <mesh position={[0, 2.45, 0]} castShadow>
        <sphereGeometry args={[0.36, 16, 16]} />
        <meshStandardMaterial color={OBSIDIAN} roughness={0.65} />
      </mesh>
    </group>)}
    <mesh position={[0, 2.1, 2.75]}>
      <torusKnotGeometry args={[0.78, 0.1, 100, 14, 2, 3]} />
      <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.38} metalness={0.84} roughness={0.18} />
    </mesh>
  </group>;
}

function DesertCamoRoad() {
  const patches = useMemo(() => Array.from({ length: 46 }, (_, i) => ({
    x: ((i * 17) % 9 - 4) * 0.72,
    z: 7 - i * 1.05,
    s: 0.35 + ((i * 13) % 5) * 0.11,
    c: [SAND, WALNUT, OLIVE, OBSIDIAN, IVORY][i % 5],
  })), []);
  return <group>
    <mesh position={[0, -0.46, -15]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[8.2, 58]} />
      <meshStandardMaterial color="#8b744f" roughness={0.9} />
    </mesh>
    {patches.map((p, i) => <mesh key={i} position={[p.x, -0.43, p.z]} rotation={[-Math.PI / 2, 0, (i % 4) * 0.35]}>
      <circleGeometry args={[p.s, 7]} />
      <meshBasicMaterial color={p.c} transparent opacity={0.58} />
    </mesh>)}
  </group>;
}

export function TwoHarmonicBeigeDynasty({ accent, quality }: Props) {
  const dunes = useMemo(() => [
    { position: [-18, -0.5, -5] as [number, number, number], scale: [9, 2.6, 7] as [number, number, number], rotation: 0.2 },
    { position: [19, -0.6, -3] as [number, number, number], scale: [10, 3, 8] as [number, number, number], rotation: -0.25 },
    { position: [-23, -0.8, -25] as [number, number, number], scale: [13, 4, 9] as [number, number, number], rotation: 0.35 },
    { position: [24, -0.8, -27] as [number, number, number], scale: [15, 4.4, 10] as [number, number, number], rotation: -0.35 },
  ], []);

  return <group position={[0, 0, -2]}>
    {dunes.map((d, i) => <Dune key={i} {...d} />)}
    <DesertCamoRoad />
    <FrequencyGate />
    <IvoryPalace />
    <LavenderSanctuary />
    <BecomingCourtyard />
    <LegacyPassage />
    {[-8, 8].flatMap((x) => [2, -4, -10, -17].map((z) => <Obelisk key={`${x}-${z}`} position={[x, 0, z]} height={4.8 + Math.abs(z) * 0.05} />))}
    {[-11, 11].flatMap((x) => [0, -7, -14, -22].map((z, i) => <Palm key={`${x}-${z}`} position={[x, -0.35, z]} scale={0.85 + i * 0.05} />))}
    {[-6.8, 6.8].flatMap((x) => [1, -6, -13, -20].map((z, i) => <Banner key={`${x}-${z}`} position={[x, -0.2, z]} color={i % 2 ? WALNUT : OLIVE} />))}
    <pointLight position={[0, 7, -14]} color={GOLD} intensity={22} distance={34} />
    <pointLight position={[-12, 4, -9]} color={LAVENDER} intensity={10} distance={18} />
    <Sparkles count={quality === 'cinematic' ? 120 : 54} scale={[38, 12, 52]} size={1.9} speed={0.12} color={accent || GOLD} />
  </group>;
}
