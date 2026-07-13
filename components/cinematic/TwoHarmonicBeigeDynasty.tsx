'use client';

import { Float, Sparkles } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type V3 = [number, number, number];

type Props = {
  accent: string;
  quality: 'cinematic' | 'performance';
  activeLandmark: number;
  onSelectLandmark?: (index: number) => void;
};

const SAND = '#b99a68';
const IVORY = '#eadfca';
const LIMESTONE = '#cdb88f';
const WALNUT = '#5b442e';
const OBSIDIAN = '#11100e';
const GOLD = '#d6aa45';
const OLIVE = '#6d6a4f';
const LAVENDER = '#9f89bd';
const CAMO = [SAND, '#907553', WALNUT, OLIVE, OBSIDIAN, IVORY];

function pointerHandlers(onClick?: () => void) {
  return {
    onClick: (event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onClick?.(); },
    onPointerOver: (event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); document.body.style.cursor = 'pointer'; },
    onPointerOut: () => { document.body.style.cursor = 'default'; },
  };
}

function Stone({ position, scale, color = LIMESTONE, metalness = 0.08, roughness = 0.82 }: { position: V3; scale: V3; color?: string; metalness?: number; roughness?: number }) {
  return <mesh position={position} scale={scale} castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
  </mesh>;
}

function Crest({ position, scale = 1, rotation = [0, 0, 0] }: { position: V3; scale?: number; rotation?: V3 }) {
  return <group position={position} scale={scale} rotation={rotation}>
    <mesh rotation={[0, 0, Math.PI / 4]}><torusGeometry args={[0.72, 0.11, 18, 72]} /><meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.42} metalness={0.92} roughness={0.16} /></mesh>
    <mesh rotation={[0, 0, -Math.PI / 4]}><torusGeometry args={[0.72, 0.11, 18, 72]} /><meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.42} metalness={0.92} roughness={0.16} /></mesh>
  </group>;
}

function Dune({ position, scale, rotation = 0 }: { position: V3; scale: V3; rotation?: number }) {
  return <mesh position={position} scale={scale} rotation={[0, rotation, 0]} receiveShadow>
    <sphereGeometry args={[1, 48, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
    <meshStandardMaterial color={SAND} roughness={1} />
  </mesh>;
}

function Banner({ position, color = WALNUT }: { position: V3; color?: string }) {
  const cloth = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!cloth.current) return;
    cloth.current.rotation.z = Math.sin(clock.elapsedTime * 0.85 + position[0] * 0.3) * 0.05;
    cloth.current.rotation.y = Math.sin(clock.elapsedTime * 0.45 + position[2]) * 0.03;
  });
  return <group position={position}>
    <mesh position={[0, 1.8, 0]} castShadow><cylinderGeometry args={[0.045, 0.06, 3.6, 10]} /><meshStandardMaterial color={OBSIDIAN} metalness={0.8} roughness={0.25} /></mesh>
    <mesh ref={cloth} position={[0.7, 2.35, 0]} castShadow><planeGeometry args={[1.35, 2.1, 12, 8]} /><meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.72} /></mesh>
    <Crest position={[0.7, 2.35, 0.02]} scale={0.3} />
  </group>;
}

function Palm({ position, scale = 1 }: { position: V3; scale?: number }) {
  const crown = useRef<THREE.Group>(null);
  const leaves = useMemo(() => Array.from({ length: 9 }, (_, i) => i * Math.PI / 4.5), []);
  useFrame(({ clock }) => { if (crown.current) crown.current.rotation.z = Math.sin(clock.elapsedTime * 0.35 + position[0]) * 0.035; });
  return <group position={position} scale={scale}>
    <mesh position={[0, 1.8, 0]} castShadow><cylinderGeometry args={[0.14, 0.22, 3.6, 10]} /><meshStandardMaterial color="#5c3a20" roughness={0.95} /></mesh>
    <group ref={crown}>{leaves.map((angle, i) => <mesh key={i} position={[Math.cos(angle) * 0.55, 3.7, Math.sin(angle) * 0.55]} rotation={[0.35, -angle, i % 2 ? 0.18 : -0.18]} castShadow><capsuleGeometry args={[0.12, 1.3, 5, 10]} /><meshStandardMaterial color={i % 2 ? OLIVE : '#777252'} roughness={0.9} /></mesh>)}</group>
  </group>;
}

function Obelisk({ position, height = 6 }: { position: V3; height?: number }) {
  return <group position={position}>
    <Stone position={[0, height / 2, 0]} scale={[0.72, height, 0.72]} />
    <mesh position={[0, height + 0.45, 0]} castShadow><coneGeometry args={[0.62, 0.9, 4]} /><meshStandardMaterial color={GOLD} metalness={0.76} roughness={0.22} /></mesh>
    {[1.3, 2.6, 3.9].filter((y) => y < height).map((y) => <mesh key={y} position={[0, y, 0.37]}><planeGeometry args={[0.24, 0.42]} /><meshBasicMaterial color={GOLD} transparent opacity={0.72} toneMapped={false} /></mesh>)}
  </group>;
}

function RoyalGuard({ position, tone = OLIVE }: { position: V3; tone?: string }) {
  return <group position={position}>
    <mesh position={[0, 1.25, 0]} castShadow><capsuleGeometry args={[0.28, 1.4, 7, 14]} /><meshStandardMaterial color={tone} roughness={0.72} /></mesh>
    <mesh position={[0, 2.25, 0]} castShadow><sphereGeometry args={[0.28, 16, 16]} /><meshStandardMaterial color={OBSIDIAN} roughness={0.55} /></mesh>
    <mesh position={[0, 2.65, 0]} castShadow><coneGeometry args={[0.34, 0.9, 4]} /><meshStandardMaterial color={GOLD} metalness={0.82} roughness={0.2} /></mesh>
    <mesh position={[0, 1.3, 0.29]}><planeGeometry args={[0.38, 0.9]} /><meshStandardMaterial color={WALNUT} roughness={0.8} /></mesh>
  </group>;
}

function LandmarkHalo({ active, radius = 5 }: { active: boolean; radius?: number }) {
  if (!active) return null;
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.38, 0]}><ringGeometry args={[radius, radius + 0.12, 96]} /><meshBasicMaterial color={GOLD} transparent opacity={0.88} toneMapped={false} /></mesh>;
}

function FrequencyGate({ active, onSelect }: { active: boolean; onSelect?: () => void }) {
  const leftDoor = useRef<THREE.Mesh>(null);
  const rightDoor = useRef<THREE.Mesh>(null);
  useFrame(({ clock }, delta) => {
    const opening = active ? 2.4 : 0;
    if (leftDoor.current) leftDoor.current.position.x = THREE.MathUtils.damp(leftDoor.current.position.x, -opening, 3.2, delta);
    if (rightDoor.current) rightDoor.current.position.x = THREE.MathUtils.damp(rightDoor.current.position.x, opening, 3.2, delta);
    if (active && leftDoor.current) leftDoor.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.01;
  });
  return <group position={[0, 0, 3]} {...pointerHandlers(onSelect)}>
    <LandmarkHalo active={active} radius={6.2} />
    {[-5.4, 5.4].map((x) => <group key={x} position={[x, 0, 0]}><Stone position={[0, 3.7, 0]} scale={[2.6, 7.4, 2.2]} /><Stone position={[0, 7.6, 0]} scale={[3.1, 0.9, 2.6]} color={IVORY} /><Crest position={[0, 4.7, 1.14]} scale={0.95} /><Banner position={[x < 0 ? 1.5 : -1.5, 1, 1.25]} color={x < 0 ? WALNUT : OLIVE} /><RoyalGuard position={[x < 0 ? 1.2 : -1.2, -0.45, 2.1]} /></group>)}
    <Stone position={[0, 7.7, 0]} scale={[8.7, 0.9, 2.4]} color={IVORY} />
    <Crest position={[0, 7.75, 1.3]} scale={1.5} />
    <mesh ref={leftDoor} position={[-1.65, 2.6, 0.3]} castShadow><boxGeometry args={[3.2, 5.2, 0.38]} /><meshStandardMaterial color={OBSIDIAN} metalness={0.42} roughness={0.28} /></mesh>
    <mesh ref={rightDoor} position={[1.65, 2.6, 0.3]} castShadow><boxGeometry args={[3.2, 5.2, 0.38]} /><meshStandardMaterial color={OBSIDIAN} metalness={0.42} roughness={0.28} /></mesh>
  </group>;
}

function IvoryPalace({ active, onSelect }: { active: boolean; onSelect?: () => void }) {
  const columns = [-7.5, -5, -2.5, 2.5, 5, 7.5];
  return <group position={[0, 0, -15]} {...pointerHandlers(onSelect)}>
    <LandmarkHalo active={active} radius={8.8} />
    <Stone position={[0, 2.3, 0]} scale={[19, 4.6, 8.4]} color={IVORY} />
    <Stone position={[0, 5.4, -0.8]} scale={[14.2, 2.1, 5.8]} color={LIMESTONE} />
    <Stone position={[0, 7.05, -1.25]} scale={[9.2, 1.15, 4.3]} color={OBSIDIAN} metalness={0.72} roughness={0.16} />
    {columns.map((x) => <group key={x} position={[x, 0, 4.25]}><mesh position={[0, 3, 0]} castShadow><cylinderGeometry args={[0.48, 0.68, 6, 18]} /><meshStandardMaterial color={LIMESTONE} roughness={0.7} /></mesh><mesh position={[0, 6.25, 0]} castShadow><cylinderGeometry args={[0.76, 0.58, 0.7, 12]} /><meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.18} /></mesh></group>)}
    <Stone position={[0, 2, 4.35]} scale={[4.4, 4, 0.42]} color={OBSIDIAN} metalness={0.5} roughness={0.12} />
    <Crest position={[0, 2.55, 4.6]} scale={1.25} />
    <mesh position={[0, -0.39, 8.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[7.6, 10]} /><meshStandardMaterial color={IVORY} metalness={0.42} roughness={0.24} /></mesh>
    <Float speed={0.8} floatIntensity={0.28} rotationIntensity={0.08}><group position={[0, 2.25, 7.2]}><mesh castShadow><capsuleGeometry args={[0.9, 2.6, 10, 24]} /><meshStandardMaterial color={IVORY} roughness={0.5} /></mesh><Crest position={[0, 0.25, 0.82]} scale={0.42} /></group></Float>
  </group>;
}

function LavenderTemple({ active, onSelect }: { active: boolean; onSelect?: () => void }) {
  return <group position={[-13.5, 0, -9]} {...pointerHandlers(onSelect)}>
    <LandmarkHalo active={active} radius={5.2} />
    <Stone position={[0, 1.6, 0]} scale={[6.8, 3.2, 5.8]} color={IVORY} />
    <Stone position={[0, 3.7, 0]} scale={[4.6, 0.9, 4.6]} color={LIMESTONE} />
    <mesh position={[0, -0.34, 3.7]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><circleGeometry args={[3.5, 64]} /><meshStandardMaterial color="#776b82" metalness={0.55} roughness={0.12} transparent opacity={0.82} /></mesh>
    <Crest position={[0, 2.2, 2.95]} scale={0.9} />
    <pointLight position={[0, 2.5, 2.3]} color={LAVENDER} intensity={active ? 24 : 15} distance={12} />
    <Sparkles count={42} scale={[7.5, 4.5, 7.5]} size={2} speed={0.18} color={LAVENDER} />
  </group>;
}

function BecomingCourtyard({ active, onSelect }: { active: boolean; onSelect?: () => void }) {
  const stages = [0.22, 0.48, 0.72, 1];
  return <group position={[13, 0, -7]} {...pointerHandlers(onSelect)}>
    <LandmarkHalo active={active} radius={5.8} />
    <mesh position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><circleGeometry args={[5.8, 64]} /><meshStandardMaterial color={IVORY} roughness={0.68} /></mesh>
    {stages.map((stage, i) => <group key={stage} position={[-3.4 + i * 2.25, 0, 0]}><mesh position={[0, 1.1, 0]} castShadow scale={[0.62, 0.62 + stage * 0.5, 0.62]}><capsuleGeometry args={[0.5, 1.9, 8, 18]} /><meshStandardMaterial color={i === 3 ? IVORY : '#9f8d6d'} roughness={1 - stage * 0.45} metalness={stage * 0.12} /></mesh><mesh position={[0, 2.35, 0]} castShadow><sphereGeometry args={[0.42, 18, 18]} /><meshStandardMaterial color={i === 3 ? IVORY : '#9f8d6d'} roughness={1 - stage * 0.45} /></mesh></group>)}
    <Obelisk position={[0, 0, -3.3]} height={5.2} />
  </group>;
}

function LegacyPassage({ active, onSelect }: { active: boolean; onSelect?: () => void }) {
  return <group position={[0, 0, -31]} {...pointerHandlers(onSelect)}>
    <LandmarkHalo active={active} radius={6.8} />
    <Stone position={[0, 1.6, 0]} scale={[11, 3.2, 6]} color={WALNUT} />
    <Stone position={[0, 4, 0]} scale={[12.4, 1.2, 6.8]} color={OBSIDIAN} metalness={0.55} roughness={0.18} />
    {[-4.2, -1.4, 1.4, 4.2].map((x, i) => <RoyalGuard key={x} position={[x, -0.45, 3.1]} tone={i % 2 ? LIMESTONE : OLIVE} />)}
    <Crest position={[0, 2.4, 3.2]} scale={1.05} />
  </group>;
}

function DesertCamoRoad() {
  const patches = useMemo(() => Array.from({ length: 74 }, (_, i) => ({ x: ((i * 17) % 11 - 5) * 0.7, z: 8 - i * 0.78, s: 0.28 + ((i * 13) % 5) * 0.11, c: CAMO[i % CAMO.length] })), []);
  return <group><mesh position={[0, -0.46, -15]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[9.2, 62]} /><meshStandardMaterial color="#8b744f" roughness={0.88} /></mesh>{patches.map((p, i) => <mesh key={i} position={[p.x, -0.43, p.z]} rotation={[-Math.PI / 2, 0, (i % 4) * 0.35]}><circleGeometry args={[p.s, 7]} /><meshBasicMaterial color={p.c} transparent opacity={0.58} /></mesh>)}</group>;
}

function DistantPyramids() {
  return <group position={[0, -0.5, -54]}>{[-24, -10, 13, 28].map((x, i) => <mesh key={x} position={[x, 5 + i * 0.7, -i * 2]} castShadow><coneGeometry args={[7 + i, 11 + i * 1.4, 4]} /><meshStandardMaterial color={i % 2 ? '#9d7f5d' : '#b3946b'} roughness={1} /></mesh>)}</group>;
}

function Birds() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (group.current) { group.current.position.x = Math.sin(clock.elapsedTime * 0.1) * 12; group.current.position.z = -35 + Math.cos(clock.elapsedTime * 0.1) * 6; } });
  return <group ref={group} position={[0, 12, -35]}>{[-2, 0, 2].map((x) => <mesh key={x} position={[x, Math.abs(x) * 0.25, 0]} rotation={[0, 0, x * 0.08]}><coneGeometry args={[0.18, 0.8, 3]} /><meshBasicMaterial color={OBSIDIAN} /></mesh>)}</group>;
}

export function TwoHarmonicBeigeDynasty({ accent, quality, activeLandmark, onSelectLandmark }: Props) {
  const dunes = useMemo(() => [
    { position: [-18, -0.5, -5] as V3, scale: [9, 2.6, 7] as V3, rotation: 0.2 },
    { position: [19, -0.6, -3] as V3, scale: [10, 3, 8] as V3, rotation: -0.25 },
    { position: [-23, -0.8, -25] as V3, scale: [13, 4, 9] as V3, rotation: 0.35 },
    { position: [24, -0.8, -27] as V3, scale: [15, 4.4, 10] as V3, rotation: -0.35 },
  ], []);

  return <group position={[0, 0, -2]}>
    {dunes.map((d, i) => <Dune key={i} {...d} />)}
    <DistantPyramids />
    <DesertCamoRoad />
    <FrequencyGate active={activeLandmark === 0} onSelect={() => onSelectLandmark?.(0)} />
    <IvoryPalace active={activeLandmark === 1} onSelect={() => onSelectLandmark?.(1)} />
    <LavenderTemple active={activeLandmark === 2} onSelect={() => onSelectLandmark?.(2)} />
    <BecomingCourtyard active={activeLandmark === 3} onSelect={() => onSelectLandmark?.(3)} />
    <LegacyPassage active={activeLandmark === 4} onSelect={() => onSelectLandmark?.(4)} />
    {[-8, 8].flatMap((x) => [2, -4, -10, -17].map((z) => <Obelisk key={`${x}-${z}`} position={[x, 0, z]} height={4.8 + Math.abs(z) * 0.05} />))}
    {[-11, 11].flatMap((x) => [0, -7, -14, -22].map((z, i) => <Palm key={`${x}-${z}`} position={[x, -0.35, z]} scale={0.85 + i * 0.05} />))}
    {[-6.8, 6.8].flatMap((x) => [1, -6, -13, -20].map((z, i) => <Banner key={`${x}-${z}`} position={[x, -0.2, z]} color={i % 2 ? WALNUT : OLIVE} />))}
    <Birds />
    <pointLight position={[0, 7, -14]} color={GOLD} intensity={activeLandmark === 1 ? 32 : 22} distance={34} />
    <pointLight position={[-12, 4, -9]} color={LAVENDER} intensity={activeLandmark === 2 ? 18 : 10} distance={18} />
    <Sparkles count={quality === 'cinematic' ? 150 : 64} scale={[42, 14, 58]} size={1.9} speed={0.12} color={accent || GOLD} />
  </group>;
}
