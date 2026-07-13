'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, SoftShadows } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { WebGLDistrictCanvasProps } from './WebGLDistrictCanvasV3';
import { TwoHarmonicBeigeDynasty } from './TwoHarmonicBeigeDynasty';

export type TwoHarmonicCanvasProps = WebGLDistrictCanvasProps & {
  onSelectLandmark?: (index: number) => void;
};

const routes = [
  { position: [0, 5.2, 31] as const, lookAt: [0, 5.6, 2] as const },
  { position: [-10.5, 6.4, 17] as const, lookAt: [0, 6.2, -19] as const },
  { position: [-23, 5.1, 8] as const, lookAt: [-17, 4.2, -11] as const },
  { position: [22, 5.2, 9] as const, lookAt: [17, 3.4, -9] as const },
  { position: [8, 7.6, -10] as const, lookAt: [0, 5.2, -43] as const },
];

function DynastyCamera({ activeLandmark }: { activeLandmark: number }) {
  const { camera, pointer, gl } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const free = useRef(new THREE.Vector3());
  const keys = useRef({ w: false, a: false, s: false, d: false });

  useEffect(() => {
    const route = routes[activeLandmark % routes.length];
    targetPosition.current.set(route.position[0], route.position[1], route.position[2]);
    targetLookAt.current.set(route.lookAt[0], route.lookAt[1], route.lookAt[2]);
    free.current.multiplyScalar(0.25);
  }, [activeLandmark]);

  useEffect(() => {
    const route = routes[0];
    camera.position.set(route.position[0], route.position[1], route.position[2]);
    targetPosition.current.copy(camera.position);
    targetLookAt.current.set(route.lookAt[0], route.lookAt[1], route.lookAt[2]);
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 0.92;
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [camera, gl]);

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
    const speed = Math.min(delta, 0.05) * 3.2;
    if (keys.current.w) free.current.z -= speed;
    if (keys.current.s) free.current.z += speed;
    if (keys.current.a) free.current.x -= speed;
    if (keys.current.d) free.current.x += speed;
    free.current.x = THREE.MathUtils.clamp(free.current.x, -4.5, 4.5);
    free.current.z = THREE.MathUtils.clamp(free.current.z, -5, 4);
    const desired = targetPosition.current.clone().add(new THREE.Vector3(
      pointer.x * 0.75 + free.current.x,
      pointer.y * 0.28 + Math.sin(clock.elapsedTime * 0.15) * 0.045,
      free.current.z,
    ));
    camera.position.lerp(desired, 1 - Math.pow(0.0008, delta));
    camera.lookAt(
      targetLookAt.current.x + free.current.x * 0.18,
      targetLookAt.current.y,
      targetLookAt.current.z + free.current.z * 0.22,
    );
  });

  return null;
}

function GroundDetail() {
  return <>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.64, -20]} receiveShadow>
      <planeGeometry args={[180, 180, 96, 96]} />
      <meshStandardMaterial color="#8d755c" roughness={1} metalness={0} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.57, -18]} receiveShadow>
      <planeGeometry args={[13.6, 96]} />
      <meshPhysicalMaterial color="#6c5a47" roughness={0.86} metalness={0.06} clearcoat={0.06} clearcoatRoughness={0.82} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.54, -18]} receiveShadow>
      <planeGeometry args={[7.4, 96]} />
      <meshPhysicalMaterial color="#2a2622" roughness={0.28} metalness={0.42} clearcoat={0.72} clearcoatRoughness={0.18} />
    </mesh>
  </>;
}

function Scene(props: TwoHarmonicCanvasProps) {
  return <>
    {props.quality === 'cinematic' && <SoftShadows size={22} samples={18} focus={0.38} />}
    <color attach="background" args={['#5f6670']} />
    <fog attach="fog" args={['#8d8276', 34, props.quality === 'cinematic' ? 125 : 82]} />
    <ambientLight intensity={0.16} />
    <hemisphereLight args={['#d6dde6', '#4b3b30', 0.72]} />
    <directionalLight
      position={[24, 31, 17]}
      intensity={4.8}
      color="#fff0d6"
      castShadow={props.quality === 'cinematic'}
      shadow-mapSize-width={4096}
      shadow-mapSize-height={4096}
      shadow-camera-left={-48}
      shadow-camera-right={48}
      shadow-camera-top={42}
      shadow-camera-bottom={-42}
      shadow-camera-near={1}
      shadow-camera-far={120}
      shadow-bias={-0.00012}
    />
    <directionalLight position={[-24, 15, -22]} intensity={0.9} color="#91a5c2" />
    <spotLight position={[0, 22, 15]} angle={0.42} penumbra={0.8} intensity={5.5} color="#e8c994" distance={90} castShadow={props.quality === 'cinematic'} />
    <GroundDetail />
    <TwoHarmonicBeigeDynasty accent={props.accent} quality={props.quality} activeLandmark={props.activeLandmark} onSelectLandmark={props.onSelectLandmark} />
    {props.quality === 'cinematic' && <ContactShadows position={[0, -0.56, -14]} opacity={0.78} scale={92} blur={2.2} far={48} resolution={1024} />}
    {props.quality === 'cinematic' && <Environment preset="warehouse" background={false} environmentIntensity={0.24} />}
    <DynastyCamera activeLandmark={props.activeLandmark} />
  </>;
}

export function TwoHarmonicBeigeDynastyCanvas(props: TwoHarmonicCanvasProps) {
  return <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <Canvas
      dpr={props.quality === 'cinematic' ? [1, 1.8] : 1}
      camera={{ position: [0, 5.2, 31], fov: 39, near: 0.1, far: 220 }}
      shadows={props.quality === 'cinematic'}
      gl={{ antialias: props.quality === 'cinematic', alpha: false, powerPreference: 'high-performance', stencil: false }}
    >
      <Suspense fallback={null}><Scene {...props} /></Suspense>
    </Canvas>
  </div>;
}
