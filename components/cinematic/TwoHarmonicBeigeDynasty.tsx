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
const TRAVERTINE = '#bda57d';
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

function Stone({ position, scale, color = LIMESTONE, metalness = 0.08, roughness = 0.82, rotation = [0, 0, 0] }: { position: V3; scale: V3; color?: string; metalness?: number; roughness?: number; rotation?: V3 }) {
  return <mesh position={position} scale={scale} rotation={rotation} castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
  </mesh>;
}

function Column({ position, height = 8, radius = 0.7, color = LIMESTONE }: { position: V3; height?: number; radius?: number; color?: string }) {
  return <group position={position}>
    <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[radius * 0.82, radius, height, 24]} />
      <meshStandardMaterial color={color} roughness={0.72} />
    </mesh>
    <mesh position={[0, 0.35, 0]} castShadow><cylinderGeometry args={[radius * 1.2, radius * 1.28, 0.7, 20]} /><meshStandardMaterial color={TRAVERTINE} roughness={0.76} /></mesh>
    <mesh position={[0, height + 0.35, 0]} castShadow><cylinderGeometry args={[radius * 1.3, radius * 1.05, 0.75, 20]} /><meshStandardMaterial color={GOLD} metalness={0.78} roughness={0.2} /></mesh>
  </group>;
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

function Banner({ position, color = WALNUT, scale = 1 }: { position: V3; color?: string; scale?: number }) {
  const cloth = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!cloth.current) return;
    cloth.current.rotation.z = Math.sin(clock.elapsedTime * 0.85 + position[0] * 0.3) * 0.05;
    cloth.current.rotation.y = Math.sin(clock.elapsedTime * 0.45 + position[2]) * 0.03;
  });
  return <group position={position} scale={scale}>
    <mesh position={[0, 2.6, 0]} castShadow><cylinderGeometry args={[0.06, 0.08, 5.2, 12]} /><meshStandardMaterial color={OBSIDIAN} metalness={0.8} roughness={0.25} /></mesh>
    <mesh ref={cloth} position={[1.05, 3.35, 0]} castShadow><planeGeometry args={[2, 3.2, 16, 10]} /><meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.72} /></mesh>
    <Crest position={[1.05, 3.35, 0.02]} scale={0.42} />
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
    <Stone position={[0, height / 2, 0]} scale={[0.8, height, 0.8]} />
    <mesh position={[0, height + 0.55, 0]} castShadow><coneGeometry args={[0.72, 1.1, 4]} /><meshStandardMaterial color={GOLD} metalness={0.76} roughness={0.22} /></mesh>
    {[1.4, 2.8, 4.2, 5.6].filter((y) => y < height).map((y) => <mesh key={y} position={[0, y, 0.41]}><planeGeometry args={[0.28, 0.5]} /><meshBasicMaterial color={GOLD} transparent opacity={0.72} toneMapped={false} /></mesh>)}
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

function Staircase({ position, width, steps, rise, depth, color = IVORY }: { position: V3; width: number; steps: number; rise: number; depth: number; color?: string }) {
  return <group position={position}>{Array.from({ length: steps }, (_, i) => <Stone key={i} position={[0, i * rise / 2, -i * depth / 2]} scale={[width - i * 0.14, rise, depth]} color={color} />)}</group>;
}

function MonumentalArch({ position, scale = 1 }: { position: V3; scale?: number }) {
  return <group position={position} scale={scale}>
    <Column position={[-2.2, 0, 0]} height={7.4} radius={0.62} />
    <Column position={[2.2, 0, 0]} height={7.4} radius={0.62} />
    <Stone position={[0, 7.5, 0]} scale={[5.4, 1.2, 1.2]} color={IVORY} />
    <mesh position={[0, 5.2, 0.62]}><torusGeometry args={[1.45, 0.28, 24, 96, Math.PI]} /><meshStandardMaterial color={TRAVERTINE} roughness={0.68} /></mesh>
    <Crest position={[0, 7.55, 0.7]} scale={0.72} />
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
    const opening = active ? 3.6 : 0;
    if (leftDoor.current) leftDoor.current.position.x = THREE.MathUtils.damp(leftDoor.current.position.x, -opening, 3.2, delta);
    if (rightDoor.current) rightDoor.current.position.x = THREE.MathUtils.damp(rightDoor.current.position.x, opening, 3.2, delta);
    if (active && leftDoor.current) leftDoor.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.01;
  });
  return <group position={[0, 0, 4]} {...pointerHandlers(onSelect)}>
    <LandmarkHalo active={active} radius={9.4} />
    {[-8, 8].map((x) => <group key={x} position={[x, 0, 0]}>
      <Stone position={[0, 6.5, 0]} scale={[4.4, 13, 4.2]} color={TRAVERTINE} />
      <Stone position={[0, 13.5, 0]} scale={[5.2, 1.2, 4.8]} color={IVORY} />
      <Stone position={[0, 3.4, 2.3]} scale={[3.4, 5.6, 0.5]} color={OBSIDIAN} metalness={0.58} roughness={0.14} />
      <Crest position={[0, 8.2, 2.22]} scale={1.3} />
      <Banner position={[x < 0 ? 2.1 : -2.1, 0.2, 2.35]} color={x < 0 ? WALNUT : OLIVE} scale={1.1} />
      <RoyalGuard position={[x < 0 ? 2.1 : -2.1, -0.45, 4]} />
      <Obelisk position={[x < 0 ? -3 : 3, -0.2, -2.4]} height={8.8} />
    </group>)}
    <Stone position={[0, 13.6, 0]} scale={[12.2, 1.4, 4.5]} color={IVORY} />
    <Stone position={[0, 11.7, 1.8]} scale={[7.2, 1.2, 0.6]} color={OBSIDIAN} metalness={0.5} roughness={0.16} />
    <Crest position={[0, 13.7, 2.45]} scale={2.25} />
    <mesh ref={leftDoor} position={[-2.45, 4.8, 1]} castShadow><boxGeometry args={[4.8, 9.6, 0.6]} /><meshStandardMaterial color={OBSIDIAN} metalness={0.56} roughness={0.18} /></mesh>
    <mesh ref={rightDoor} position={[2.45, 4.8, 1]} castShadow><boxGeometry args={[4.8, 9.6, 0.6]} /><meshStandardMaterial color={OBSIDIAN} metalness={0.56} roughness={0.18} /></mesh>
    <Staircase position={[0, -0.22, 7]} width={11.5} steps={8} rise={0.28} depth={1.1} color={TRAVERTINE} />
  </group>;
}

function IvoryPalace({ active, onSelect }: { active: boolean; onSelect?: () => void }) {
  const frontColumns = [-10.5, -7, -3.5, 3.5, 7, 10.5];
  const rearColumns = [-12, -8, -4, 0, 4, 8, 12];
  return <group position={[0, 0, -20]} {...pointerHandlers(onSelect)}>
    <LandmarkHalo active={active} radius={14.8} />
    <Stone position={[0, 1.1, 0]} scale={[30, 2.2, 16]} color={TRAVERTINE} />
    <Stone position={[0, 4.2, -2]} scale={[26, 6.2, 13]} color={IVORY} />
    <Stone position={[0, 8.2, -3.4]} scale={[21, 2.2, 10]} color={LIMESTONE} />
    <Stone position={[0, 11.4, -4.6]} scale={[15, 4.2, 7]} color={OBSIDIAN} metalness={0.68} roughness={0.14} />
    <Stone position={[0, 14, -5]} scale={[9, 1.1, 5]} color={GOLD} metalness={0.82} roughness={0.16} />
    {frontColumns.map((x) => <Column key={`front-${x}`} position={[x, 1.1, 7.6]} height={9.5} radius={0.78} />)}
    {rearColumns.map((x) => <Column key={`rear-${x}`} position={[x, 2.2, 2.8]} height={7.2} radius={0.58} color={TRAVERTINE} />)}
    <MonumentalArch position={[0, 1.15, 7.3]} scale={1.28} />
    <Crest position={[0, 10.9, 7.9]} scale={1.8} />
    <Staircase position={[0, -0.2, 14]} width={18} steps={12} rise={0.3} depth={1.15} color={IVORY} />
    <Stone position={[-13.8, 6.5, -1.8]} scale={[2.4, 11, 9]} color={TRAVERTINE} />
    <Stone position={[13.8, 6.5, -1.8]} scale={[2.4, 11, 9]} color={TRAVERTINE} />
    <Stone position={[-13.8, 12.6, -2.2]} scale={[3, 1.2, 10]} color={IVORY} />
    <Stone position={[13.8, 12.6, -2.2]} scale={[3, 1.2, 10]} color={IVORY} />
    <mesh position={[0, -0.3, 12]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[13, 18]} /><meshStandardMaterial color={OBSIDIAN} metalness={0.78} roughness={0.08} /></mesh>
    <Float speed={0.6} floatIntensity={0.18} rotationIntensity={0.04}><group position={[0, 4, 11]}><mesh castShadow><capsuleGeometry args={[1.2, 3.6, 12, 28]} /><meshStandardMaterial color={IVORY} roughness={0.38} /></mesh><Crest position={[0, 0.35, 1.05]} scale={0.55} /></group></Float>
    <pointLight position={[0, 9, 5]} color={GOLD} intensity={active ? 38 : 24} distance={34} />
  </group>;
}

function LavenderTemple({ active, onSelect }: { active: boolean; onSelect?: () => void }) {
  return <group position={[-17, 0, -11]} {...pointerHandlers(onSelect)}>
    <LandmarkHalo active={active} radius={7.4} />
    <Stone position={[0, 1, 0]} scale={[10.5, 2, 8]} color={TRAVERTINE} />
    <Stone position={[0, 4.6, -0.6]} scale={[9.2, 7.2, 6.8]} color={IVORY} />
    <Stone position={[0, 9.1, -1.4]} scale={[6.6, 1.8, 5]} color={LIMESTONE} />
    {[-3.2, 0, 3.2].map((x) => <Column key={x} position={[x, 1.1, 3.8]} height={7.3} radius={0.62} />)}
    <MonumentalArch position={[0, 1.1, 3.8]} scale={0.82} />
    <mesh position={[0, -0.28, 7]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><circleGeometry args={[5.4, 96]} /><meshStandardMaterial color="#5f5570" metalness={0.72} roughness={0.08} transparent opacity={0.88} /></mesh>
    <Crest position={[0, 6.1, 4.25]} scale={1.15} />
    <pointLight position={[0, 3, 4.5]} color={LAVENDER} intensity={active ? 30 : 18} distance={16} />
    <Sparkles count={48} scale={[10, 7, 10]} size={2} speed={0.16} color={LAVENDER} />
  </group>;
}

function BecomingCourtyard({ active, onSelect }: { active: boolean; onSelect?: () => void }) {
  const stages = [0.22, 0.48, 0.72, 1];
  return <group position={[17, 0, -9]} {...pointerHandlers(onSelect)}>
    <LandmarkHalo active={active} radius={8} />
    <mesh position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><circleGeometry args={[8, 96]} /><meshStandardMaterial color={IVORY} roughness={0.58} /></mesh>
    <mesh position={[0, -0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[6.2, 6.55, 96]} /><meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.18} /></mesh>
    {stages.map((stage, i) => <group key={stage} position={[-4.5 + i * 3, 0, 0]}><Stone position={[0, 0.45, 0]} scale={[1.6, 0.9, 1.6]} color={TRAVERTINE} /><mesh position={[0, 2.1, 0]} castShadow scale={[0.8, 0.8 + stage * 0.65, 0.8]}><capsuleGeometry args={[0.55, 2.4, 10, 22]} /><meshStandardMaterial color={i === 3 ? IVORY : '#9f8d6d'} roughness={1 - stage * 0.48} metalness={stage * 0.16} /></mesh><mesh position={[0, 3.65, 0]} castShadow><sphereGeometry args={[0.48, 22, 22]} /><meshStandardMaterial color={i === 3 ? IVORY : '#9f8d6d'} roughness={1 - stage * 0.45} /></mesh></group>)}
    <Obelisk position={[0, 0, -5.2]} height={8.4} />
    <Stone position={[0, 1.1, 5.4]} scale={[12, 2.2, 1.4]} color={TRAVERTINE} />
    <Crest position={[0, 2.5, 6.15]} scale={0.9} />
  </group>;
}

function LegacyPassage({ active, onSelect }: { active: boolean; onSelect?: () => void }) {
  return <group position={[0, 0, -43]} {...pointerHandlers(onSelect)}>
    <LandmarkHalo active={active} radius={10.2} />
    <Stone position={[0, 1.1, 0]} scale={[18, 2.2, 13]} color={WALNUT} />
    <Stone position={[0, 6.2, -1]} scale={[16, 10.2, 11]} color={TRAVERTINE} />
    <Stone position={[0, 11.9, -1.8]} scale={[18, 1.2, 12]} color={OBSIDIAN} metalness={0.6} roughness={0.14} />
    {[-6, -2, 2, 6].map((x) => <Column key={x} position={[x, 1.1, 5.7]} height={9.4} radius={0.7} />)}
    {[-5.2, -1.7, 1.7, 5.2].map((x, i) => <RoyalGuard key={x} position={[x, 0.6, 7.1]} tone={i % 2 ? LIMESTONE : OLIVE} />)}
    <MonumentalArch position={[0, 1.1, 5.7]} scale={1.05} />
    <Crest position={[0, 8.5, 6.35]} scale={1.25} />
    <Staircase position={[0, -0.2, 12]} width={14} steps={9} rise={0.28} depth={1.1} color={TRAVERTINE} />
  </group>;
}

function DesertCamoRoad() {
  const patches = useMemo(() => Array.from({ length: 88 }, (_, i) => ({ x: ((i * 17) % 13 - 6) * 0.76, z: 11 - i * 0.8, s: 0.3 + ((i * 13) % 5) * 0.12, c: CAMO[i % CAMO.length] })), []);
  return <group><mesh position={[0, -0.46, -18]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[12, 82]} /><meshStandardMaterial color="#8b744f" roughness={0.88} /></mesh>{patches.map((p, i) => <mesh key={i} position={[p.x, -0.43, p.z]} rotation={[-Math.PI / 2, 0, (i % 4) * 0.35]}><circleGeometry args={[p.s, 7]} /><meshBasicMaterial color={p.c} transparent opacity={0.48} /></mesh>)}</group>;
}

function DistantPyramids() {
  return <group position={[0, -0.5, -70]}>{[-34, -17, 0, 18, 37].map((x, i) => <mesh key={x} position={[x, 6 + i * 0.6, -i * 2]} castShadow><coneGeometry args={[8 + i * 0.8, 13 + i * 1.2, 4]} /><meshStandardMaterial color={i % 2 ? '#9d7f5d' : '#b3946b'} roughness={1} /></mesh>)}</group>;
}

function SkyBridges() {
  return <group>
    <Stone position={[-9.5, 6.8, -15]} scale={[8, 0.55, 1.5]} color={OBSIDIAN} metalness={0.58} roughness={0.16} rotation={[0, 0.08, 0]} />
    <Stone position={[9.5, 7.8, -16]} scale={[8, 0.55, 1.5]} color={OBSIDIAN} metalness={0.58} roughness={0.16} rotation={[0, -0.08, 0]} />
    <Crest position={[-9.5, 7.15, -14.2]} scale={0.45} />
    <Crest position={[9.5, 8.15, -15.2]} scale={0.45} />
  </group>;
}

function Birds() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (group.current) { group.current.position.x = Math.sin(clock.elapsedTime * 0.1) * 12; group.current.position.z = -35 + Math.cos(clock.elapsedTime * 0.1) * 6; } });
  return <group ref={group} position={[0, 16, -42]}>{[-2, 0, 2].map((x) => <mesh key={x} position={[x, Math.abs(x) * 0.25, 0]} rotation={[0, 0, x * 0.08]}><coneGeometry args={[0.18, 0.8, 3]} /><meshBasicMaterial color={OBSIDIAN} /></mesh>)}</group>;
}

export function TwoHarmonicBeigeDynasty({ accent, quality, activeLandmark, onSelectLandmark }: Props) {
  const dunes = useMemo(() => [
    { position: [-24, -0.5, -4] as V3, scale: [13, 3.4, 10] as V3, rotation: 0.2 },
    { position: [25, -0.6, -2] as V3, scale: [14, 4, 11] as V3, rotation: -0.25 },
    { position: [-31, -0.8, -31] as V3, scale: [18, 5, 12] as V3, rotation: 0.35 },
    { position: [33, -0.8, -34] as V3, scale: [20, 5.8, 14] as V3, rotation: -0.35 },
  ], []);

  return <group position={[0, 0, -2]}>
    {dunes.map((d, i) => <Dune key={i} {...d} />)}
    <DistantPyramids />
    <DesertCamoRoad />
    <SkyBridges />
    <FrequencyGate active={activeLandmark === 0} onSelect={() => onSelectLandmark?.(0)} />
    <IvoryPalace active={activeLandmark === 1} onSelect={() => onSelectLandmark?.(1)} />
    <LavenderTemple active={activeLandmark === 2} onSelect={() => onSelectLandmark?.(2)} />
    <BecomingCourtyard active={activeLandmark === 3} onSelect={() => onSelectLandmark?.(3)} />
    <LegacyPassage active={activeLandmark === 4} onSelect={() => onSelectLandmark?.(4)} />
    {[-11, 11].flatMap((x) => [0, -8, -17, -27].map((z) => <Obelisk key={`${x}-${z}`} position={[x, 0, z]} height={6.2 + Math.abs(z) * 0.06} />))}
    {[-15, 15].flatMap((x) => [-2, -11, -21, -31].map((z, i) => <Palm key={`${x}-${z}`} position={[x, -0.35, z]} scale={0.95 + i * 0.08} />))}
    {[-9.5, 9.5].flatMap((x) => [0, -9, -18, -29].map((z, i) => <Banner key={`${x}-${z}`} position={[x, -0.2, z]} color={i % 2 ? WALNUT : OLIVE} scale={0.92} />))}
    <Birds />
    <pointLight position={[0, 12, -20]} color={GOLD} intensity={activeLandmark === 1 ? 38 : 26} distance={46} />
    <pointLight position={[-16, 7, -11]} color={LAVENDER} intensity={activeLandmark === 2 ? 24 : 12} distance={22} />
    <Sparkles count={quality === 'cinematic' ? 170 : 72} scale={[58, 20, 82]} size={1.8} speed={0.1} color={accent || GOLD} />
  </group>;
}
