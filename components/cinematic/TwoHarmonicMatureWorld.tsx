'use client';

import { MeshReflectorMaterial, RoundedBox, Sparkles } from '@react-three/drei';
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

const PALETTE = {
  sandstone: '#a98a62',
  limestone: '#c7b18a',
  ivory: '#e4d7bd',
  travertine: '#b89d72',
  obsidian: '#11100f',
  gold: '#b98b3f',
  bronze: '#72563b',
  olive: '#68634b',
  lavender: '#8f7aa5',
};

function interactions(onClick?: () => void) {
  return {
    onClick: (event: ThreeEvent<MouseEvent>) => { event.stopPropagation(); onClick?.(); },
    onPointerOver: (event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); document.body.style.cursor = 'pointer'; },
    onPointerOut: () => { document.body.style.cursor = 'default'; },
  };
}

function useStoneTexture(base: string) {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 9000; i += 1) {
      const shade = 120 + Math.floor(Math.random() * 80);
      ctx.fillStyle = `rgba(${shade},${shade - 12},${shade - 28},${Math.random() * 0.045})`;
      ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 3 + 0.4, Math.random() * 2 + 0.3);
    }
    for (let i = 0; i < 18; i += 1) {
      ctx.strokeStyle = `rgba(65,45,28,${0.05 + Math.random() * 0.08})`;
      ctx.lineWidth = 0.5 + Math.random() * 1.5;
      ctx.beginPath();
      let x = Math.random() * 512;
      let y = Math.random() * 512;
      ctx.moveTo(x, y);
      for (let j = 0; j < 6; j += 1) {
        x += (Math.random() - 0.5) * 55;
        y += Math.random() * 45;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2.2, 2.2);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return texture;
  }, [base]);
}

function StoneBox({ position, scale, color = PALETTE.limestone, rotation = [0, 0, 0], bevel = 0.08 }: { position: V3; scale: V3; color?: string; rotation?: V3; bevel?: number }) {
  const map = useStoneTexture(color);
  return (
    <RoundedBox position={position} scale={scale} rotation={rotation} args={[1, 1, 1]} radius={bevel} smoothness={4} castShadow receiveShadow>
      <meshStandardMaterial map={map ?? undefined} color={map ? '#ffffff' : color} roughness={0.82} metalness={0.03} bumpMap={map ?? undefined} bumpScale={0.035} />
    </RoundedBox>
  );
}

function GoldBand({ position, scale, rotation = [0, 0, 0] }: { position: V3; scale: V3; rotation?: V3 }) {
  return <RoundedBox position={position} scale={scale} rotation={rotation} args={[1, 1, 1]} radius={0.05} smoothness={3} castShadow>
    <meshStandardMaterial color={PALETTE.gold} metalness={0.88} roughness={0.26} />
  </RoundedBox>;
}

function FlutedColumn({ position, height = 10, radius = 0.8 }: { position: V3; height?: number; radius?: number }) {
  return <group position={position}>
    <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[radius * 0.78, radius, height, 32, 1, false]} />
      <meshStandardMaterial color={PALETTE.limestone} roughness={0.78} />
    </mesh>
    {Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      return <mesh key={i} position={[Math.cos(angle) * radius * 0.84, height / 2, Math.sin(angle) * radius * 0.84]} castShadow>
        <boxGeometry args={[0.08, height * 0.9, 0.08]} />
        <meshStandardMaterial color="#8f7654" roughness={0.9} />
      </mesh>;
    })}
    <mesh position={[0, 0.28, 0]} castShadow><cylinderGeometry args={[radius * 1.35, radius * 1.5, 0.56, 32]} /><meshStandardMaterial color={PALETTE.travertine} roughness={0.7} /></mesh>
    <mesh position={[0, height + 0.36, 0]} castShadow><cylinderGeometry args={[radius * 1.45, radius * 1.05, 0.72, 32]} /><meshStandardMaterial color={PALETTE.gold} metalness={0.82} roughness={0.25} /></mesh>
    <GoldBand position={[0, height - 0.55, 0]} scale={[radius * 2.15, 0.12, radius * 2.15]} />
  </group>;
}

function CarvedRelief({ position, scale = 1 }: { position: V3; scale?: number }) {
  return <group position={position} scale={scale}>
    <mesh position={[0, 0, -0.08]}><circleGeometry args={[1.22, 64]} /><meshStandardMaterial color={PALETTE.obsidian} roughness={0.16} metalness={0.42} /></mesh>
    <mesh rotation={[0, 0, Math.PI / 4]} castShadow><torusGeometry args={[0.8, 0.095, 24, 96]} /><meshStandardMaterial color={PALETTE.gold} metalness={0.9} roughness={0.23} /></mesh>
    <mesh rotation={[0, 0, -Math.PI / 4]} castShadow><torusGeometry args={[0.8, 0.095, 24, 96]} /><meshStandardMaterial color={PALETTE.gold} metalness={0.9} roughness={0.23} /></mesh>
  </group>;
}

function MonumentStairs({ position, width = 14, steps = 12 }: { position: V3; width?: number; steps?: number }) {
  return <group position={position}>{Array.from({ length: steps }, (_, i) => (
    <StoneBox key={i} position={[0, i * 0.16, -i * 0.45]} scale={[width - i * 0.22, 0.32, 0.9]} color={i % 2 ? PALETTE.ivory : PALETTE.travertine} bevel={0.025} />
  ))}</group>;
}

function FrequencyGate({ active, onSelect }: { active: boolean; onSelect?: () => void }) {
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const target = active ? 3.4 : 0;
    if (left.current) left.current.position.x = THREE.MathUtils.damp(left.current.position.x, -target, 3, delta);
    if (right.current) right.current.position.x = THREE.MathUtils.damp(right.current.position.x, target, 3, delta);
  });
  return <group position={[0, 0, 7]} {...interactions(onSelect)}>
    <MonumentStairs position={[0, -0.45, 9]} width={17} />
    {[-9, 9].map((x) => <group key={x} position={[x, 0, 0]}>
      <StoneBox position={[0, 6.7, 0]} scale={[5.4, 13.4, 4.6]} color={PALETTE.travertine} bevel={0.14} />
      <StoneBox position={[0, 13.8, 0]} scale={[6.1, 1.25, 5.2]} color={PALETTE.ivory} bevel={0.1} />
      <StoneBox position={[0, 5.2, 2.4]} scale={[3.4, 7.4, 0.38]} color={PALETTE.obsidian} bevel={0.05} />
      <CarvedRelief position={[0, 8.7, 2.64]} scale={1.35} />
      <FlutedColumn position={[x < 0 ? 3.1 : -3.1, 0, 2.6]} height={9.8} radius={0.72} />
      {[2.5, 5, 7.5].map((y) => <GoldBand key={y} position={[0, y, 2.62]} scale={[3.6, 0.09, 0.1]} />)}
    </group>)}
    <StoneBox position={[0, 14.1, 0]} scale={[14.2, 1.5, 5]} color={PALETTE.ivory} bevel={0.12} />
    <StoneBox position={[0, 11.9, 2.1]} scale={[8.2, 1.35, 0.55]} color={PALETTE.obsidian} bevel={0.06} />
    <CarvedRelief position={[0, 14.2, 2.64]} scale={2.15} />
    <group ref={left} position={[0, 0, 0]}><StoneBox position={[-2.55, 4.9, 1.2]} scale={[5, 9.8, 0.72]} color={PALETTE.obsidian} bevel={0.06} /><GoldBand position={[-2.55, 4.9, 1.58]} scale={[4.4, 0.12, 0.08]} /></group>
    <group ref={right} position={[0, 0, 0]}><StoneBox position={[2.55, 4.9, 1.2]} scale={[5, 9.8, 0.72]} color={PALETTE.obsidian} bevel={0.06} /><GoldBand position={[2.55, 4.9, 1.58]} scale={[4.4, 0.12, 0.08]} /></group>
  </group>;
}

function IvoryPalace({ active, onSelect }: { active: boolean; onSelect?: () => void }) {
  const columns = [-11, -7.4, -3.7, 3.7, 7.4, 11];
  return <group position={[0, 0, -23]} {...interactions(onSelect)}>
    <StoneBox position={[0, 1.15, 0]} scale={[31, 2.3, 18]} color={PALETTE.travertine} bevel={0.14} />
    <StoneBox position={[0, 4.6, -1]} scale={[28, 6.9, 14]} color={PALETTE.ivory} bevel={0.18} />
    <StoneBox position={[0, 9.15, -1.6]} scale={[22, 2.15, 10]} color={PALETTE.limestone} bevel={0.12} />
    <StoneBox position={[0, 11.2, -2.3]} scale={[15, 1.65, 7]} color={PALETTE.obsidian} bevel={0.09} />
    <MonumentStairs position={[0, -0.4, 10.5]} width={20} steps={14} />
    {columns.map((x) => <FlutedColumn key={x} position={[x, 2.15, 7.2]} height={9.2} radius={0.76} />)}
    <StoneBox position={[0, 6.15, 7.5]} scale={[7.3, 8.3, 0.6]} color={PALETTE.obsidian} bevel={0.08} />
    <CarvedRelief position={[0, 7.4, 7.84]} scale={1.6} />
    {[-1, 1].map((side) => <group key={side} position={[side * 11.8, 0, 2]}>
      <StoneBox position={[0, 6.6, 0]} scale={[5.8, 8.6, 5.5]} color={PALETTE.travertine} bevel={0.13} />
      <StoneBox position={[0, 11.4, 0]} scale={[6.4, 1.1, 6]} color={PALETTE.ivory} bevel={0.1} />
      <CarvedRelief position={[0, 7, 2.8]} scale={1.05} />
    </group>)}
    <mesh position={[0, 0.1, 13]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[18, 10]} />
      <MeshReflectorMaterial mirror={0.5} blur={[320, 90]} resolution={512} mixBlur={1} mixStrength={2.2} roughness={0.16} depthScale={0.35} color="#171513" metalness={0.72} />
    </mesh>
    <pointLight position={[0, 8, 6]} color={PALETTE.gold} intensity={active ? 42 : 24} distance={35} />
  </group>;
}

function SupportingCity() {
  return <>
    {[-1, 1].flatMap((side) => [0, -8, -16, -28].map((z, i) => <group key={`${side}-${z}`} position={[side * (16 + i * 1.5), 0, z]}>
      <StoneBox position={[0, 2.4, 0]} scale={[5.2, 4.8 + i * 0.7, 5.8]} color={i % 2 ? PALETTE.sandstone : PALETTE.travertine} bevel={0.12} />
      <StoneBox position={[0, 5.2 + i * 0.7, 0]} scale={[4.4, 0.8, 5]} color={PALETTE.obsidian} bevel={0.08} />
      <GoldBand position={[0, 3.3, 2.95]} scale={[3.6, 0.11, 0.08]} />
    </group>))}
  </>;
}

export function TwoHarmonicMatureWorld({ accent, quality, activeLandmark, onSelectLandmark }: Props) {
  return <group position={[0, 0, -2]}>
    <FrequencyGate active={activeLandmark === 0} onSelect={() => onSelectLandmark?.(0)} />
    <IvoryPalace active={activeLandmark === 1} onSelect={() => onSelectLandmark?.(1)} />
    <SupportingCity />
    <Sparkles count={quality === 'cinematic' ? 95 : 38} scale={[55, 18, 72]} size={1.2} speed={0.08} color={accent || PALETTE.gold} />
  </group>;
}
