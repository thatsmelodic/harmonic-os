'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Float, MeshReflectorMaterial, Sparkles, Stars } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { DistrictId } from '@/data/cinematic-districts';
import { districtModelAssets } from '@/data/district-models';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
  universe: [{ position: [0, 7, 20], lookAt: [0, 2, -2] }, { position: [-11, 5, 13], lookAt: [-4, 2, -5] }, { position: [11, 5, 13], lookAt: [4, 2, -5] }, { position: [0, 11, 16], lookAt: [0, 1, -9] }, { position: [7, 7, 18], lookAt: [1, 2, -2] }],
  'two-harmonic': [{ position: [0, 4.8, 16], lookAt: [0, 1.8, -3] }, { position: [-8, 4.2, 11], lookAt: [-3.5, 2, -5] }, { position: [8, 4.5, 11], lookAt: [3.5, 2, -5] }, { position: [0, 8.5, 14], lookAt: [0, .8, -8] }],
  'fried-em': [{ position: [0, 5.5, 16], lookAt: [0, .8, -3] }, { position: [-8.5, 3.8, 10], lookAt: [-3, 1, -5] }, { position: [8.5, 4.2, 10], lookAt: [3, 1, -5] }, { position: [0, 9.5, 13], lookAt: [0, 0, -7] }],
  schmackinn: [{ position: [0, 4.8, 16], lookAt: [0, 1.5, -4] }, { position: [-8.5, 3.4, 10], lookAt: [-3, 1.5, -6] }, { position: [8.5, 3.6, 10], lookAt: [3, 1.5, -6] }, { position: [0, 7.5, 13], lookAt: [0, 1, -8] }],
  melodic: [{ position: [0, 5.5, 17], lookAt: [0, 2, -4] }, { position: [-8, 4.4, 11], lookAt: [-3, 2.2, -6] }, { position: [8, 4.4, 11], lookAt: [3, 2.2, -6] }, { position: [0, 9.5, 14], lookAt: [0, 1.2, -9] }],
  business: [{ position: [0, 6.5, 19], lookAt: [0, 3, -5] }, { position: [-9.5, 5.5, 13], lookAt: [-4, 3, -7] }, { position: [9.5, 5.5, 13], lookAt: [4, 3, -7] }, { position: [0, 11.5, 16], lookAt: [0, 2, -11] }],
};

function CameraRig({ district, activeLandmark }: Pick<WebGLDistrictCanvasProps, 'district' | 'activeLandmark'>) {
  const { camera, pointer } = useThree();
  const target = useMemo(() => routes[district][activeLandmark % routes[district].length], [district, activeLandmark]);
  const position = useRef(new THREE.Vector3(...target.position));
  const look = useRef(new THREE.Vector3(...target.lookAt));
  const free = useRef(new THREE.Vector3());
  const keys = useRef({ w: false, s: false, a: false, d: false });

  useEffect(() => { position.current.set(...target.position); look.current.set(...target.lookAt); free.current.multiplyScalar(.3); }, [target]);
  useEffect(() => {
    const handle = (event: KeyboardEvent, down: boolean) => {
      const key = event.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') keys.current.w = down;
      if (key === 's' || key === 'arrowdown') keys.current.s = down;
      if (key === 'a' || key === 'arrowleft') keys.current.a = down;
      if (key === 'd' || key === 'arrowright') keys.current.d = down;
    };
    const down = (event: KeyboardEvent) => handle(event, true);
    const up = (event: KeyboardEvent) => handle(event, false);
    window.addEventListener('keydown', down); window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);

  useFrame(({ clock }, delta) => {
    const speed = Math.min(delta, .05) * 4.2;
    if (keys.current.w) free.current.z -= speed;
    if (keys.current.s) free.current.z += speed;
    if (keys.current.a) free.current.x -= speed;
    if (keys.current.d) free.current.x += speed;
    free.current.x = THREE.MathUtils.clamp(free.current.x, -4, 4);
    free.current.z = THREE.MathUtils.clamp(free.current.z, -5, 3);
    const breathe = Math.sin(clock.elapsedTime * .22) * .12;
    const desired = position.current.clone().add(new THREE.Vector3(pointer.x * 1.05 + free.current.x, pointer.y * .42 + breathe, free.current.z));
    camera.position.lerp(desired, 1 - Math.pow(.0012, delta));
    camera.lookAt(look.current.x + free.current.x * .32, look.current.y, look.current.z + free.current.z * .42);
  });
  return null;
}

function ImportedAssets({ district }: { district: DistrictId }) {
  const group = useRef<THREE.Group>(null);
  useEffect(() => {
    const root = group.current;
    if (!root) return;
    let alive = true;
    const loader = new GLTFLoader();
    const loaded: THREE.Object3D[] = [];
    districtModelAssets[district].forEach((asset) => {
      loader.load(asset.url, (gltf) => {
        if (!alive) return;
        const clone = gltf.scene.clone(true);
        const position: [number, number, number] = asset.position;
        const rotation: [number, number, number] = asset.rotation ?? [0, 0, 0];
        const scale: [number, number, number] = typeof asset.scale === 'number'
          ? [asset.scale, asset.scale, asset.scale]
          : asset.scale ?? [1, 1, 1];
        clone.position.set(position[0], position[1], position[2]);
        clone.rotation.set(rotation[0], rotation[1], rotation[2]);
        clone.scale.set(scale[0], scale[1], scale[2]);
        clone.traverse((child) => { if (child instanceof THREE.Mesh) { child.castShadow = true; child.receiveShadow = true; } });
        root.add(clone); loaded.push(clone);
      }, undefined, () => undefined);
    });
    return () => { alive = false; loaded.forEach((object) => root.remove(object)); };
  }, [district]);
  return <group ref={group} />;
}

function Building({ x, z, height, width, accent, warm }: { x: number; z: number; height: number; width: number; accent: string; warm?: boolean }) {
  const windows = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ x: (i % 3 - 1) * .24, y: (Math.floor(i / 3) - 1.5) * .2 })), []);
  return <group position={[x, height / 2 - .45, z]} scale={[width, height, 1.7]}><mesh castShadow receiveShadow><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color={warm ? '#31231c' : '#111620'} metalness={.72} roughness={.28} /></mesh>{windows.map((w, i) => <mesh key={i} position={[w.x, w.y, .505]}><planeGeometry args={[.12, .08]} /><meshBasicMaterial color={accent} transparent opacity={.25 + (i % 4) * .12} toneMapped={false} /></mesh>)}</group>;
}

function CityMass({ district, accent }: { district: DistrictId; accent: string }) {
  const towers = useMemo(() => Array.from({ length: 34 }, (_, i) => { const side = i % 2 === 0 ? -1 : 1; const row = Math.floor(i / 2); return { x: side * (5.2 + (row % 4) * 1.05), z: -3 - row * 1.55, height: 2.8 + ((i * 5) % 8) * .56, width: 1.2 + ((i * 3) % 4) * .28 }; }), []);
  return <group>{towers.map((tower, i) => <Building key={i} {...tower} accent={accent} warm={district === 'schmackinn' || district === 'two-harmonic'} />)}</group>;
}

function StreetLamp({ x, z, accent }: { x: number; z: number; accent: string }) {
  return <group position={[x, 0, z]}><mesh position={[0, 1.5, 0]} castShadow><cylinderGeometry args={[.055, .08, 3, 12]} /><meshStandardMaterial color="#272b32" metalness={.9} roughness={.25} /></mesh><mesh position={[0, 3, 0]}><sphereGeometry args={[.18, 16, 16]} /><meshBasicMaterial color={accent} toneMapped={false} /></mesh><pointLight position={[0, 2.9, 0]} color={accent} intensity={8} distance={7} /></group>;
}

function Human({ position, scale = 1, accent }: { position: [number, number, number]; scale?: number; accent: string }) {
  return <group position={position} scale={scale}><mesh position={[0, 1.25, 0]} castShadow><capsuleGeometry args={[.2, 1.05, 6, 12]} /><meshStandardMaterial color="#090a0d" roughness={.9} /></mesh><mesh position={[0, 2.05, 0]} castShadow><sphereGeometry args={[.25, 16, 16]} /><meshStandardMaterial color="#090a0d" roughness={.9} /></mesh><mesh position={[0, 1.25, .22]}><planeGeometry args={[.18, .34]} /><meshBasicMaterial color={accent} transparent opacity={.32} toneMapped={false} /></mesh></group>;
}

function Ground({ district, accent, quality }: { district: DistrictId; accent: string; quality: 'cinematic' | 'performance' }) {
  const reflective = quality === 'cinematic' && ['two-harmonic', 'schmackinn', 'business'].includes(district);
  const color = district === 'two-harmonic' ? '#6f5940' : district === 'fried-em' ? '#24130d' : '#080a10';
  return <group><mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -.58, -7]}><planeGeometry args={[90, 90]} />{reflective ? <MeshReflectorMaterial blur={[350, 110]} resolution={512} mixBlur={1.5} mixStrength={35} roughness={.58} depthScale={.8} minDepthThreshold={.35} maxDepthThreshold={1.2} color={color} metalness={.7} /> : <meshStandardMaterial color={color} metalness={.35} roughness={.76} />}</mesh><mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.54, -9]}><planeGeometry args={[4.5, 48]} /><meshStandardMaterial color="#141820" metalness={.6} roughness={.42} /></mesh>{Array.from({ length: 14 }, (_, i) => <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -.5, 10 - i * 3.7]}><planeGeometry args={[.16, 1.3]} /><meshBasicMaterial color={accent} toneMapped={false} /></mesh>)}</group>;
}

function Court({ accent }: { accent: string }) {
  const ball = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => { if (ball.current) ball.current.position.y = .05 + Math.abs(Math.sin(clock.elapsedTime * 2.5)) * 1.45; });
  return <group position={[0, 0, -5]}><mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.48, 0]} receiveShadow><planeGeometry args={[13, 19]} /><meshStandardMaterial color="#26140d" roughness={.88} /></mesh><mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.45, 0]}><ringGeometry args={[2.1, 2.18, 64]} /><meshBasicMaterial color="#d9d4cb" /></mesh><mesh position={[0, 1.8, -6]} castShadow><boxGeometry args={[4.5, 2.5, .18]} /><meshStandardMaterial color="#dadada" roughness={.38} /></mesh><mesh position={[0, .75, -5.15]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.82, .085, 14, 48]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.5} /></mesh><mesh position={[0, 3.2, -6.15]}><boxGeometry args={[3.2, .85, .28]} /><meshStandardMaterial color="#060606" emissive={accent} emissiveIntensity={.7} /></mesh><mesh ref={ball} position={[2.7, .3, 1.4]} castShadow><sphereGeometry args={[.5, 32, 32]} /><meshStandardMaterial color="#df5b18" roughness={.75} /></mesh><Human position={[-3.2, -.48, 1.8]} scale={1.05} accent={accent} /><Human position={[3.5, -.48, -1.4]} scale={.95} accent={accent} />{[-5.6, 5.6].map((x) => <StreetLamp key={x} x={x} z={-1} accent={accent} />)}</group>;
}

function Fashion({ accent }: { accent: string }) {
  return <group position={[0, 0, -5]}><mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.46, -2]} receiveShadow><planeGeometry args={[8, 27]} /><MeshReflectorMaterial blur={[220, 80]} resolution={512} mixStrength={20} roughness={.48} color="#d9c49c" metalness={.28} /></mesh>{[-4, 4].map((x) => <group key={x} position={[x, 2.5, -5]}><mesh castShadow><boxGeometry args={[2.8, 6, 2.8]} /><meshStandardMaterial color="#8f7656" roughness={.44} /></mesh><mesh position={[0, 0, 1.42]}><torusGeometry args={[.75, .1, 20, 60]} /><meshBasicMaterial color={accent} toneMapped={false} /></mesh></group>)}{[-1.8, 0, 1.8].map((x, i) => <Float key={x} speed={1.25 + i * .12} rotationIntensity={.14} floatIntensity={.42}><group position={[x, 1.8 + i * .1, -2 - i * .7]}><mesh castShadow><capsuleGeometry args={[.55, 1.8, 8, 20]} /><meshStandardMaterial color={i === 1 ? '#18130f' : '#eadbbd'} roughness={.58} /></mesh><mesh position={[0, .2, .52]}><torusGeometry args={[.18, .045, 12, 28]} /><meshBasicMaterial color={accent} toneMapped={false} /></mesh></group></Float>)}{[-5.5, 5.5].map((x) => <StreetLamp key={x} x={x} z={-2} accent={accent} />)}</group>;
}
function Food({ accent }: { accent: string }) { return <group position={[0, 0, -5]}>{[-4.2, 0, 4.2].map((x, i) => <group key={x} position={[x, 1.45, -4 - Math.abs(x) * .3]}><mesh castShadow><boxGeometry args={[3.5, 3.3, 3.2]} /><meshStandardMaterial color={i === 1 ? '#2d122e' : '#17131d'} metalness={.48} roughness={.4} /></mesh><mesh position={[0, .35, 1.62]}><planeGeometry args={[2.7, 1.35]} /><meshBasicMaterial color={i === 1 ? accent : '#ff9a68'} transparent opacity={.78} toneMapped={false} /></mesh><mesh position={[0, -1.2, 1.64]}><planeGeometry args={[2.8, .42]} /><meshBasicMaterial color={accent} transparent opacity={.45} toneMapped={false} /></mesh></group>)}<group position={[2.8, .35, 2.6]}><mesh castShadow><boxGeometry args={[3.4, 1.8, 2]} /><meshStandardMaterial color="#b64c67" metalness={.32} roughness={.48} /></mesh><mesh position={[0, .2, 1.02]}><planeGeometry args={[2.2, .72]} /><meshBasicMaterial color="#ffd89a" toneMapped={false} /></mesh></group><Human position={[-1.8, -.48, 1.5]} accent={accent} /><Human position={[.3, -.48, 2]} scale={.9} accent={accent} />{[-5.7, 5.7].map((x) => <StreetLamp key={x} x={x} z={0} accent={accent} />)}<Sparkles count={70} scale={[12, 5, 14]} size={2.6} speed={.3} color={accent} /></group>; }
function Studio({ accent }: { accent: string }) { const bars = useMemo(() => Array.from({ length: 22 }, (_, i) => ({ x: -5.2 + i * .5, h: .5 + Math.abs(Math.sin(i * 1.27)) * 2.4 })), []); return <group position={[0, 0, -5]}>{[-3.8, 3.8].map((x) => <group key={x} position={[x, 2.7, -4]}><mesh castShadow><boxGeometry args={[2.7, 6.4, 2.3]} /><meshStandardMaterial color="#0e1222" metalness={.78} roughness={.22} /></mesh>{[1.5, -.7].map((y) => <mesh key={y} position={[0, y, 1.18]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.78, .78, .2, 48]} /><meshStandardMaterial color="#05060a" emissive={accent} emissiveIntensity={.55} /></mesh>)}</group>)}{bars.map((bar, i) => <mesh key={i} position={[bar.x, bar.h / 2, -2]}><boxGeometry args={[.22, bar.h, .22]} /><meshBasicMaterial color={accent} toneMapped={false} /></mesh>)}<Float speed={.9} floatIntensity={.3}><mesh position={[0, 2.2, -5]}><torusKnotGeometry args={[1.15, .18, 110, 18]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={.75} metalness={.9} roughness={.2} /></mesh></Float><Human position={[0, -.48, 1.2]} scale={1.05} accent={accent} /></group>; }
function Finance({ accent }: { accent: string }) { return <group position={[0, 0, -6]}>{[-4.8, -1.6, 1.6, 4.8].map((x, i) => <group key={x} position={[x, 3 + i * .8, -4 - i * .9]}><mesh castShadow><boxGeometry args={[2.4, 7 + i * 1.5, 2.4]} /><meshStandardMaterial color="#2b3745" metalness={.9} roughness={.16} emissive={accent} emissiveIntensity={.06} /></mesh>{Array.from({ length: 7 }, (_, floor) => <mesh key={floor} position={[0, -2.5 + floor * .8, 1.22]}><planeGeometry args={[1.8, .08]} /><meshBasicMaterial color={accent} transparent opacity={.35} toneMapped={false} /></mesh>)}</group>)}<mesh position={[0, .2, 1.5]}><cylinderGeometry args={[2.2, 2.6, .7, 64]} /><meshStandardMaterial color="#111820" metalness={.82} roughness={.22} /></mesh><Human position={[-1.1, -.48, 1.8]} accent={accent} /><Human position={[1.1, -.48, 1.8]} accent={accent} /></group>; }
function DistrictSet({ district, accent }: { district: DistrictId; accent: string }) { if (district === 'fried-em') return <Court accent={accent} />; if (district === 'two-harmonic') return <Fashion accent={accent} />; if (district === 'schmackinn') return <Food accent={accent} />; if (district === 'melodic') return <Studio accent={accent} />; if (district === 'business') return <Finance accent={accent} />; return null; }
function Scene(props: WebGLDistrictCanvasProps) { const fog = useMemo(() => new THREE.Color(props.skyTop), [props.skyTop]); return <><color attach="background" args={[props.skyTop]} /><fog attach="fog" args={[fog, 18, props.quality === 'cinematic' ? 64 : 44]} /><ambientLight intensity={.52} /><hemisphereLight args={[props.accent, '#07080c', 1.25]} /><directionalLight position={[8, 17, 9]} intensity={2.2} color={props.accent} castShadow={props.quality === 'cinematic'} shadow-mapSize-width={1024} shadow-mapSize-height={1024} /><pointLight position={[-8, 4, 3]} intensity={24} distance={26} color={props.accent} /><Ground district={props.district} accent={props.accent} quality={props.quality} /><CityMass district={props.district} accent={props.accent} /><DistrictSet district={props.district} accent={props.accent} /><ImportedAssets district={props.district} />{props.quality === 'cinematic' && <ContactShadows position={[0, -.52, -3]} opacity={.52} scale={32} blur={2.5} far={18} />}{props.quality === 'cinematic' && <Stars radius={75} depth={46} count={1900} factor={3.2} saturation={.08} fade speed={.22} />}{props.quality === 'cinematic' && <Sparkles count={70} scale={[30, 11, 36]} size={1.7} speed={.16} color={props.accent} />}<CameraRig district={props.district} activeLandmark={props.activeLandmark} /></>; }
export function WebGLDistrictCanvasV3(props: WebGLDistrictCanvasProps) { return <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}><Canvas dpr={props.quality === 'cinematic' ? [1, 1.75] : 1} camera={{ position: [0, 6, 18], fov: 46, near: .1, far: 140 }} shadows={props.quality === 'cinematic'} gl={{ antialias: props.quality === 'cinematic', alpha: false, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping }}><Suspense fallback={null}><Scene {...props} /></Suspense></Canvas></div>; }
