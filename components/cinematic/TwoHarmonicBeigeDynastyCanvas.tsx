'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, SoftShadows } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { WebGLDistrictCanvasProps } from './WebGLDistrictCanvasV3';
import { TwoHarmonicRealismPass } from './TwoHarmonicRealismPass';

export type TwoHarmonicCanvasProps = WebGLDistrictCanvasProps & {
  onSelectLandmark?: (index: number) => void;
};

const routes = [
  { position: [0, 5.8, 34] as const, lookAt: [0, 6.4, 2] as const },
  { position: [-10.5, 7.2, 20] as const, lookAt: [0, 6.8, -21] as const },
  { position: [-24, 5.8, 9] as const, lookAt: [-16, 3.8, -11] as const },
  { position: [23, 5.8, 10] as const, lookAt: [16, 3.2, -9] as const },
  { position: [8, 8.2, -12] as const, lookAt: [0, 4.8, -42] as const },
];

function DynastyCamera({ activeLandmark }: { activeLandmark: number }) {
  const { camera, pointer, gl } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

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
    gl.toneMappingExposure = 0.86;
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [camera, gl]);

  useFrame(({ clock }, delta) => {
    const desired = targetPosition.current.clone().add(new THREE.Vector3(
      pointer.x * 0.55,
      pointer.y * 0.22 + Math.sin(clock.elapsedTime * 0.12) * 0.035,
      0,
    ));
    camera.position.lerp(desired, 1 - Math.pow(0.0007, delta));
    camera.lookAt(targetLookAt.current);
  });
  return null;
}

function GroundDetail() {
  return <>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.68, -20]} receiveShadow>
      <planeGeometry args={[190, 190, 64, 64]} />
      <meshStandardMaterial color="#8b765e" roughness={1} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, -18]} receiveShadow>
      <planeGeometry args={[16, 104]} />
      <meshPhysicalMaterial color="#4f4338" roughness={0.72} metalness={0.1} clearcoat={0.1} clearcoatRoughness={0.74} />
    </mesh>
  </>;
}

function Scene(props: TwoHarmonicCanvasProps) {
  return <>
    {props.quality === 'cinematic' && <SoftShadows size={25} samples={20} focus={0.4} />}
    <color attach="background" args={['#6a7079']} />
    <fog attach="fog" args={['#8b8278', 38, props.quality === 'cinematic' ? 138 : 88]} />
    <ambientLight intensity={0.1} />
    <hemisphereLight args={['#d9e0e8', '#49372d', 0.62]} />
    <directionalLight
      position={[28, 34, 18]}
      intensity={5.3}
      color="#fff1d8"
      castShadow={props.quality === 'cinematic'}
      shadow-mapSize-width={4096}
      shadow-mapSize-height={4096}
      shadow-camera-left={-52}
      shadow-camera-right={52}
      shadow-camera-top={46}
      shadow-camera-bottom={-46}
      shadow-camera-near={1}
      shadow-camera-far={140}
      shadow-bias={-0.0001}
    />
    <directionalLight position={[-26, 17, -24]} intensity={0.72} color="#8fa3bf" />
    <spotLight position={[0, 24, 17]} angle={0.38} penumbra={0.85} intensity={4.8} color="#e7c68f" distance={100} castShadow={props.quality === 'cinematic'} />
    <GroundDetail />
    <TwoHarmonicRealismPass accent={props.accent} quality={props.quality} activeLandmark={props.activeLandmark} onSelectLandmark={props.onSelectLandmark} />
    {props.quality === 'cinematic' && <ContactShadows position={[0, -0.58, -15]} opacity={0.82} scale={98} blur={2.4} far={52} resolution={1024} />}
    {props.quality === 'cinematic' && <Environment preset="warehouse" background={false} environmentIntensity={0.32} />}
    <DynastyCamera activeLandmark={props.activeLandmark} />
  </>;
}

export function TwoHarmonicBeigeDynastyCanvas(props: TwoHarmonicCanvasProps) {
  return <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <Canvas
      dpr={props.quality === 'cinematic' ? [1, 1.75] : 1}
      camera={{ position: [0, 5.8, 34], fov: 38, near: 0.1, far: 240 }}
      shadows={props.quality === 'cinematic'}
      gl={{ antialias: props.quality === 'cinematic', alpha: false, powerPreference: 'high-performance', stencil: false }}
    >
      <Suspense fallback={null}><Scene {...props} /></Suspense>
    </Canvas>
  </div>;
}
