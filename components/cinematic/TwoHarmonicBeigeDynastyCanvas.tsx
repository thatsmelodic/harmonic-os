'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { WebGLDistrictCanvasProps } from './WebGLDistrictCanvasV3';
import { TwoHarmonicBeigeDynasty } from './TwoHarmonicBeigeDynasty';

const routes = [
  { position: [0, 6.8, 25] as [number, number, number], lookAt: [0, 3.4, 2] as [number, number, number] },
  { position: [0, 7.5, 13] as [number, number, number], lookAt: [0, 3.2, -14] as [number, number, number] },
  { position: [-16, 5.8, 7] as [number, number, number], lookAt: [-12.5, 2.2, -9] as [number, number, number] },
  { position: [16, 5.4, 7] as [number, number, number], lookAt: [12, 2.0, -7] as [number, number, number] },
  { position: [0, 9.8, -5] as [number, number, number], lookAt: [0, 2.0, -31] as [number, number, number] },
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
  }, [activeLandmark]);

  useEffect(() => {
    const route = routes[0];
    camera.position.set(route.position[0], route.position[1], route.position[2]);
    targetPosition.current.copy(camera.position);
    targetLookAt.current.set(route.lookAt[0], route.lookAt[1], route.lookAt[2]);
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.12;
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
    const speed = Math.min(delta, 0.05) * 4.2;
    if (keys.current.w) free.current.z -= speed;
    if (keys.current.s) free.current.z += speed;
    if (keys.current.a) free.current.x -= speed;
    if (keys.current.d) free.current.x += speed;
    free.current.x = THREE.MathUtils.clamp(free.current.x, -5.5, 5.5);
    free.current.z = THREE.MathUtils.clamp(free.current.z, -7, 5);

    const desired = targetPosition.current.clone().add(new THREE.Vector3(
      pointer.x * 1.2 + free.current.x,
      pointer.y * 0.55 + Math.sin(clock.elapsedTime * 0.2) * 0.12,
      free.current.z,
    ));
    camera.position.lerp(desired, 1 - Math.pow(0.0012, delta));
    camera.lookAt(
      targetLookAt.current.x + free.current.x * 0.25,
      targetLookAt.current.y,
      targetLookAt.current.z + free.current.z * 0.28,
    );
  });

  return null;
}

function Scene(props: WebGLDistrictCanvasProps) {
  return <>
    <color attach="background" args={['#8f704d']} />
    <fog attach="fog" args={['#b28f68', 26, props.quality === 'cinematic' ? 96 : 68]} />
    <ambientLight intensity={0.58} />
    <hemisphereLight args={['#ffe2a3', '#3d291d', 1.5]} />
    <directionalLight
      position={[18, 24, 14]}
      intensity={3.4}
      color="#ffd08a"
      castShadow={props.quality === 'cinematic'}
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
    />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.62, -18]} receiveShadow>
      <planeGeometry args={[140, 140]} />
      <meshStandardMaterial color="#a8845f" roughness={0.98} />
    </mesh>
    <TwoHarmonicBeigeDynasty accent={props.accent} quality={props.quality} />
    {props.quality === 'cinematic' && <ContactShadows position={[0, -0.56, -10]} opacity={0.48} scale={62} blur={2.8} far={34} />}
    {props.quality === 'cinematic' && <Environment preset="sunset" background={false} environmentIntensity={0.42} />}
    <DynastyCamera activeLandmark={props.activeLandmark} />
  </>;
}

export function TwoHarmonicBeigeDynastyCanvas(props: WebGLDistrictCanvasProps) {
  return <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <Canvas
      dpr={props.quality === 'cinematic' ? [1, 1.65] : 1}
      camera={{ position: [0, 6.8, 25], fov: 44, near: 0.1, far: 180 }}
      shadows={props.quality === 'cinematic'}
      gl={{ antialias: props.quality === 'cinematic', alpha: false, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}><Scene {...props} /></Suspense>
    </Canvas>
  </div>;
}
