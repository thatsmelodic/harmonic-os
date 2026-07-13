'use client';

import { MeshReflectorMaterial, RoundedBox, Sparkles } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type V3 = [number, number, number];
type Props = { accent: string; quality: 'cinematic' | 'performance'; activeLandmark: number; onSelectLandmark?: (index: number) => void };

const SAND = '#a98a63';
const STONE = '#c8b38f';
const IVORY = '#e8ddc8';
const OBSIDIAN = '#090909';
const GOLD = '#b99245';
const WALNUT = '#4f3929';
const OLIVE = '#69664c';
const LAVENDER = '#8977a5';

function useStoneTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#bda784'; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 3400; i++) {
      const v = 110 + Math.random() * 70;
      ctx.fillStyle = `rgba(${v},${v * .88},${v * .7},${Math.random() * .08})`;
      ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 3 + .4, Math.random() * 3 + .4);
    }
    for (let y = 48; y < 512; y += 62) {
      ctx.strokeStyle = 'rgba(70,48,28,.16)'; ctx.lineWidth = 1 + Math.random() * 1.5;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.bezierCurveTo(130, y + 5, 360, y - 5, 512, y + 2); ctx.stroke();
    }
    const t = new THREE.CanvasTexture(canvas); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 2); t.colorSpace = THREE.SRGBColorSpace; return t;
  }, []);
}

function handlers(onClick?: () => void) {
  return {
    onClick: (e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onClick?.(); },
    onPointerOver: (e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; },
    onPointerOut: () => { document.body.style.cursor = 'default'; },
  };
}

function StoneBlock({ position, scale, color = STONE, radius = .18, texture }: { position: V3; scale: V3; color?: string; radius?: number; texture?: THREE.Texture }) {
  return <RoundedBox position={position} scale={scale} args={[1, 1, 1]} radius={radius} smoothness={5} castShadow receiveShadow>
    <meshStandardMaterial color={color} map={texture} roughness={.82} metalness={.02} normalScale={new THREE.Vector2(.32, .32)} />
  </RoundedBox>;
}

function GoldInlay({ position, scale }: { position: V3; scale: V3 }) {
  return <RoundedBox position={position} scale={scale} args={[1, 1, 1]} radius={.12} smoothness={4} castShadow>
    <meshStandardMaterial color={GOLD} metalness={.86} roughness={.24} />
  </RoundedBox>;
}

function HarmonicCrest({ position, scale = 1 }: { position: V3; scale?: number }) {
  return <group position={position} scale={scale}>
    <mesh rotation={[0, 0, Math.PI / 4]}><torusGeometry args={[.72, .075, 24, 96]} /><meshStandardMaterial color={GOLD} metalness={.95} roughness={.16} emissive={GOLD} emissiveIntensity={.08} /></mesh>
    <mesh rotation={[0, 0, -Math.PI / 4]}><torusGeometry args={[.72, .075, 24, 96]} /><meshStandardMaterial color={GOLD} metalness={.95} roughness={.16} emissive={GOLD} emissiveIntensity={.08} /></mesh>
  </group>;
}

function MonumentalGate({ active, onSelect, texture }: { active: boolean; onSelect?: () => void; texture: THREE.Texture }) {
  const left = useRef<THREE.Group>(null); const right = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    const x = active ? 2.9 : .15;
    if (left.current) left.current.position.x = THREE.MathUtils.damp(left.current.position.x, -x, 3, d);
    if (right.current) right.current.position.x = THREE.MathUtils.damp(right.current.position.x, x, 3, d);
  });
  return <group position={[0, 0, 4]} {...handlers(onSelect)}>
    {[-7.4, 7.4].map((x) => <group key={x} position={[x, 0, 0]}>
      <StoneBlock position={[0, 5.8, 0]} scale={[3.4, 11.6, 3.6]} texture={texture} />
      <StoneBlock position={[0, 11.7, 0]} scale={[4.6, 1.25, 4.2]} color={IVORY} texture={texture} />
      <StoneBlock position={[0, 8.6, .4]} scale={[2.2, 2.6, 3.9]} color={WALNUT} radius={.35} />
      <HarmonicCrest position={[0, 8.6, 2.42]} scale={1.15} />
      {[2.4, 5.1, 7.8].map((y) => <GoldInlay key={y} position={[0, y, 1.84]} scale={[2.2, .12, .08]} />)}
    </group>)}
    <StoneBlock position={[0, 12.2, 0]} scale={[11.2, 1.4, 4]} color={IVORY} texture={texture} />
    <HarmonicCrest position={[0, 12.3, 2.1]} scale={2.1} />
    <group ref={left} position={[-.15, 4.6, .55]}><StoneBlock position={[-2.35, 0, 0]} scale={[4.7, 9.2, .55]} color={OBSIDIAN} radius={.1} /><GoldInlay position={[-2.35, 0, .32]} scale={[.14, 8.1, .08]} /></group>
    <group ref={right} position={[.15, 4.6, .55]}><StoneBlock position={[2.35, 0, 0]} scale={[4.7, 9.2, .55]} color={OBSIDIAN} radius={.1} /><GoldInlay position={[2.35, 0, .32]} scale={[.14, 8.1, .08]} /></group>
    <mesh position={[0, -.48, 5.6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[18, 12]} /><MeshReflectorMaterial mirror={.35} blur={[500, 160]} resolution={1024} mixBlur={1.4} mixStrength={.8} roughness={.2} depthScale={.3} minDepthThreshold={.25} maxDepthThreshold={1.2} color="#16120f" metalness={.5} /></mesh>
  </group>;
}

function IvoryPalace({ active, onSelect, texture }: { active: boolean; onSelect?: () => void; texture: THREE.Texture }) {
  const columns = [-10.5, -7, -3.5, 3.5, 7, 10.5];
  return <group position={[0, 0, -20]} {...handlers(onSelect)}>
    <StoneBlock position={[0, 3.2, 0]} scale={[26, 6.4, 11]} color={IVORY} texture={texture} radius={.3} />
    <StoneBlock position={[0, 7.1, -1]} scale={[20, 2.2, 8]} texture={texture} radius={.22} />
    <StoneBlock position={[0, 9.2, -2]} scale={[14, 2.1, 6]} color={OBSIDIAN} radius={.18} />
    <StoneBlock position={[0, 11.1, -2.8]} scale={[8.4, 1.6, 4.4]} color={IVORY} texture={texture} />
    {columns.map((x) => <group key={x} position={[x, 0, 5.7]}>
      <mesh position={[0, 4.2, 0]} castShadow receiveShadow><cylinderGeometry args={[.62, .82, 8.4, 32]} /><meshStandardMaterial map={texture} color={STONE} roughness={.76} /></mesh>
      <mesh position={[0, 8.65, 0]} castShadow><cylinderGeometry args={[1.05, .7, .8, 32]} /><meshStandardMaterial color={GOLD} metalness={.84} roughness={.23} /></mesh>
      <GoldInlay position={[0, 2.2, .68]} scale={[.3, 3.2, .08]} />
    </group>)}
    <StoneBlock position={[0, 3.2, 5.72]} scale={[6.6, 6.4, .62]} color={OBSIDIAN} radius={.12} />
    <HarmonicCrest position={[0, 4.1, 6.12]} scale={1.65} />
    {[-1, 1].map((s) => <group key={s} position={[s * 8.7, 5, 5.95]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.25, .11, 24, 96]} /><meshStandardMaterial color={GOLD} metalness={.9} roughness={.18} /></mesh>
      <GoldInlay position={[0, -2.8, 0]} scale={[.16, 4.8, .1]} />
    </group>)}
    {[0, 1, 2, 3].map((i) => <StoneBlock key={i} position={[0, -.1 + i * .18, 8 + i * 1.4]} scale={[10 + i * 1.3, .36, 2.1]} color={i % 2 ? STONE : IVORY} texture={texture} radius={.08} />)}
    <mesh position={[0, -.52, 11.3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[15, 11]} /><MeshReflectorMaterial mirror={active ? .55 : .3} blur={[420, 120]} resolution={1024} mixBlur={1.2} mixStrength={1} roughness={.16} depthScale={.35} minDepthThreshold={.2} maxDepthThreshold={1.2} color="#0c0b0a" metalness={.7} /></mesh>
    <pointLight position={[0, 7, 8]} color={GOLD} intensity={active ? 34 : 16} distance={28} />
  </group>;
}

function SecondaryLandmarks({ active, onSelect, texture }: { active: number; onSelect?: (i: number) => void; texture: THREE.Texture }) {
  return <>
    <group position={[-16, 0, -10]} {...handlers(() => onSelect?.(2))}>
      <StoneBlock position={[0, 2.1, 0]} scale={[8.5, 4.2, 7]} color={IVORY} texture={texture} />
      <StoneBlock position={[0, 4.9, -.8]} scale={[6.2, 1.5, 5.2]} texture={texture} />
      <mesh position={[0, -.42, 4.2]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[4.2, 96]} /><MeshReflectorMaterial mirror={.45} blur={[320, 90]} resolution={512} mixBlur={1} mixStrength={.7} roughness={.18} depthScale={.2} minDepthThreshold={.2} maxDepthThreshold={1} color={LAVENDER} metalness={.35} /></mesh>
      <HarmonicCrest position={[0, 2.8, 3.58]} scale={1.1} />
      <pointLight position={[0, 3.4, 3]} color={LAVENDER} intensity={active === 2 ? 24 : 10} distance={16} />
    </group>
    <group position={[16, 0, -9]} {...handlers(() => onSelect?.(3))}>
      <mesh position={[0, -.45, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><circleGeometry args={[6.2, 96]} /><meshStandardMaterial color={IVORY} map={texture} roughness={.7} /></mesh>
      {[-3.6, -1.2, 1.2, 3.6].map((x, i) => <group key={x} position={[x, 0, 0]}>
        <StoneBlock position={[0, .65 + i * .2, 0]} scale={[1.15, 1.3 + i * .4, 1.15]} texture={texture} />
        <mesh position={[0, 1.75 + i * .4, 0]} castShadow><sphereGeometry args={[.52, 28, 28]} /><meshStandardMaterial color={i === 3 ? IVORY : STONE} roughness={.7 - i * .12} /></mesh>
      </group>)}
      <GoldInlay position={[0, .08, -3.8]} scale={[5.7, .09, .12]} />
    </group>
    <group position={[0, 0, -39]} {...handlers(() => onSelect?.(4))}>
      <StoneBlock position={[0, 2.2, 0]} scale={[15, 4.4, 8]} color={WALNUT} texture={texture} />
      <StoneBlock position={[0, 5.2, 0]} scale={[17, 1.5, 9]} color={OBSIDIAN} />
      <HarmonicCrest position={[0, 3.1, 4.2]} scale={1.35} />
      {[-5.5, -2, 2, 5.5].map((x) => <GoldInlay key={x} position={[x, 2.3, 4.22]} scale={[.1, 3.2, .08]} />)}
    </group>
  </>;
}

function DesertWorld({ texture }: { texture: THREE.Texture }) {
  const dunes = [[-24, -1, -6, 12, 3.4, 8], [25, -1.2, -7, 14, 4, 9], [-27, -1.5, -28, 18, 5.2, 12], [29, -1.5, -30, 20, 5.5, 13]] as number[][];
  return <>
    {dunes.map((d, i) => <mesh key={i} position={[d[0], d[1], d[2]]} scale={[d[3], d[4], d[5]]} receiveShadow><sphereGeometry args={[1, 64, 24, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color={SAND} map={texture} roughness={1} /></mesh>)}
    {[-11, 11].flatMap((x) => [0, -9, -18, -28].map((z, i) => <group key={`${x}-${z}`} position={[x, 0, z]}>
      <mesh position={[0, 2.8, 0]} castShadow><cylinderGeometry args={[.12, .25, 5.6, 14]} /><meshStandardMaterial color={WALNUT} roughness={.9} /></mesh>
      {Array.from({ length: 8 }, (_, n) => <mesh key={n} position={[Math.cos(n * Math.PI / 4) * .75, 5.7, Math.sin(n * Math.PI / 4) * .75]} rotation={[.45, -n * Math.PI / 4, n % 2 ? .18 : -.18]} castShadow><capsuleGeometry args={[.12, 1.6, 5, 10]} /><meshStandardMaterial color={i % 2 ? OLIVE : '#777253'} roughness={.88} /></mesh>)}
    </group>))}
  </>;
}

export function TwoHarmonicRealismPass({ accent, quality, activeLandmark, onSelectLandmark }: Props) {
  const texture = useStoneTexture();
  return <group position={[0, 0, -2]}>
    <DesertWorld texture={texture} />
    <MonumentalGate active={activeLandmark === 0} onSelect={() => onSelectLandmark?.(0)} texture={texture} />
    <IvoryPalace active={activeLandmark === 1} onSelect={() => onSelectLandmark?.(1)} texture={texture} />
    <SecondaryLandmarks active={activeLandmark} onSelect={onSelectLandmark} texture={texture} />
    <Sparkles count={quality === 'cinematic' ? 90 : 36} scale={[48, 16, 72]} size={1.1} speed={.07} color={accent || GOLD} />
  </group>;
}
