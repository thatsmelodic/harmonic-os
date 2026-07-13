'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { DistrictId } from '@/data/cinematic-districts';

type Props = {
  district: DistrictId;
  accent: string;
  skyTop: string;
  skyBottom: string;
  activeLandmark: number;
  quality: 'cinematic' | 'performance';
};

type CameraTarget = {
  position: [number, number, number];
  lookAt: [number, number, number];
};

const cameraRoutes: Record<DistrictId, CameraTarget[]> = {
  universe: [
    { position: [0, 6, 18], lookAt: [0, 2, 0] },
    { position: [-10, 5, 12], lookAt: [-4, 2, -4] },
    { position: [10, 4, 11], lookAt: [4, 1.5, -4] },
    { position: [0, 10, 15], lookAt: [0, 0, -7] },
    { position: [7, 6, 17], lookAt: [2, 2, 0] },
  ],
  'two-harmonic': [
    { position: [0, 4, 15], lookAt: [0, 1.5, -2] },
    { position: [-7, 3.8, 10], lookAt: [-3, 1.8, -4] },
    { position: [7, 4.2, 11], lookAt: [3, 2, -4] },
    { position: [0, 8, 14], lookAt: [0, 0, -7] },
  ],
  'fried-em': [
    { position: [0, 5, 15], lookAt: [0, 0.5, -2] },
    { position: [-8, 3.5, 10], lookAt: [-3, 1, -4] },
    { position: [8, 4, 10], lookAt: [3, 1, -4] },
    { position: [0, 9, 13], lookAt: [0, 0, -6] },
  ],
  schmackinn: [
    { position: [0, 4.5, 15], lookAt: [0, 1.5, -3] },
    { position: [-8, 3.2, 10], lookAt: [-3, 1.5, -5] },
    { position: [8, 3.4, 10], lookAt: [3, 1.5, -5] },
    { position: [0, 7, 13], lookAt: [0, 1, -7] },
  ],
  melodic: [
    { position: [0, 5, 16], lookAt: [0, 2, -3] },
    { position: [-7, 4, 11], lookAt: [-3, 2, -5] },
    { position: [7, 4, 11], lookAt: [3, 2, -5] },
    { position: [0, 9, 14], lookAt: [0, 1, -8] },
  ],
  business: [
    { position: [0, 6, 18], lookAt: [0, 3, -4] },
    { position: [-9, 5, 13], lookAt: [-4, 3, -6] },
    { position: [9, 5, 13], lookAt: [4, 3, -6] },
    { position: [0, 11, 16], lookAt: [0, 2, -10] },
  ],
};

function CameraRig({ district, activeLandmark }: Pick<Props, 'district' | 'activeLandmark'>) {
  const { camera, pointer } = useThree();
  const target = useMemo(() => {
    const routes = cameraRoutes[district];
    return routes[activeLandmark % routes.length];
  }, [district, activeLandmark]);
  const lookTarget = useRef(new THREE.Vector3(...target.lookAt));

  useEffect(() => {
    lookTarget.current.set(...target.lookAt);
  }, [target]);

  useFrame((_, delta) => {
    const desired = new THREE.Vector3(
      target.position[0] + pointer.x * 0.9,
      target.position[1] + pointer.y * 0.35,
      target.position[2],
    );
    camera.position.lerp(desired, 1 - Math.pow(0.002, delta));
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function Building({ position, scale, accent, glow = false }: { position: [number, number, number]; scale: [number, number, number]; accent: string; glow?: boolean }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#11141c" metalness={0.72} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.505]}>
        <planeGeometry args={[0.72, 0.78]} />
        <meshBasicMaterial color={accent} transparent opacity={glow ? 0.7 : 0.25} toneMapped={false} />
      </mesh>
    </group>
  );
}

function CityMass({ accent, district }: { accent: string; district: DistrictId }) {
  const towers = useMemo(() => Array.from({ length: 30 }, (_, index) => {
    const lane = index % 2 === 0 ? -1 : 1;
    const row = Math.floor(index / 2);
    return {
      position: [lane * (4.2 + (row % 3) * 1.15), 0.8 + ((index * 7) % 5) * 0.42, -2 - row * 1.35] as [number, number, number],
      scale: [1.2 + ((index * 3) % 4) * 0.25, 2.2 + ((index * 5) % 7) * 0.55, 1.5] as [number, number, number],
    };
  }), []);

  return (
    <group>
      {towers.map((tower, index) => (
        <Building key={index} position={tower.position} scale={tower.scale} accent={accent} glow={district === 'business' || district === 'melodic'} />
      ))}
    </group>
  );
}

function Ground({ accent }: { accent: string }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.55, -5]}>
        <planeGeometry args={[80, 80, 40, 40]} />
        <meshStandardMaterial color="#07090e" metalness={0.35} roughness={0.72} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.52, -8]}>
        <planeGeometry args={[4.2, 42]} />
        <meshStandardMaterial color="#14171d" metalness={0.55} roughness={0.48} />
      </mesh>
      {Array.from({ length: 12 }, (_, index) => (
        <mesh key={index} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 8 - index * 3.5]}>
          <planeGeometry args={[0.16, 1.2]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function CourtWorld({ accent }: { accent: string }) {
  return (
    <group position={[0, 0, -4]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.46, 0]} receiveShadow>
        <planeGeometry args={[12, 18]} />
        <meshStandardMaterial color="#25130c" roughness={0.82} />
      </mesh>
      <mesh position={[0, 1.7, -5.5]} castShadow>
        <boxGeometry args={[4.2, 2.4, 0.16]} />
        <meshStandardMaterial color="#d8d8d8" roughness={0.42} />
      </mesh>
      <mesh position={[0, 0.75, -4.7]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.08, 14, 40]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[0, 2.9, -5.7]}>
        <boxGeometry args={[2.8, 0.7, 0.24]} />
        <meshStandardMaterial color="#080808" emissive={accent} emissiveIntensity={0.65} />
      </mesh>
      <Float speed={2.2} rotationIntensity={0.15} floatIntensity={0.35}>
        <mesh position={[2.6, 0.2, 1.2]} castShadow>
          <sphereGeometry args={[0.48, 32, 32]} />
          <meshStandardMaterial color="#d64a12" roughness={0.72} />
        </mesh>
      </Float>
    </group>
  );
}

function FashionWorld({ accent }: { accent: string }) {
  return (
    <group position={[0, 0, -4]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, -2]} receiveShadow>
        <planeGeometry args={[7, 23]} />
        <meshStandardMaterial color="#dfc9a0" metalness={0.28} roughness={0.36} />
      </mesh>
      {[-3.5, 3.5].map((x) => (
        <group key={x} position={[x, 2.2, -4]}>
          <mesh castShadow>
            <boxGeometry args={[2.4, 5.2, 2.4]} />
            <meshStandardMaterial color="#8b7356" roughness={0.46} />
          </mesh>
          <mesh position={[0, 0, 1.22]}>
            <circleGeometry args={[0.72, 48]} />
            <meshBasicMaterial color={accent} toneMapped={false} />
          </mesh>
        </group>
      ))}
      {[-1.6, 0, 1.6].map((x, index) => (
        <Float key={x} speed={1.2 + index * 0.2} rotationIntensity={0.22} floatIntensity={0.5}>
          <mesh position={[x, 1.5 + index * 0.22, -1.5 - index]} castShadow>
            <capsuleGeometry args={[0.48, 1.8, 8, 20]} />
            <meshStandardMaterial color={index === 1 ? '#18130f' : '#eadbbd'} roughness={0.6} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function FoodWorld({ accent }: { accent: string }) {
  return (
    <group position={[0, 0, -4]}>
      {[-4, 0, 4].map((x, index) => (
        <group key={x} position={[x, 1.2, -3 - Math.abs(x) * 0.35]}>
          <mesh castShadow>
            <boxGeometry args={[3.3, 2.8, 3]} />
            <meshStandardMaterial color={index === 1 ? '#251027' : '#15121b'} metalness={0.45} roughness={0.42} />
          </mesh>
          <mesh position={[0, 0.3, 1.52]}>
            <planeGeometry args={[2.5, 1.25]} />
            <meshBasicMaterial color={accent} transparent opacity={0.72} toneMapped={false} />
          </mesh>
        </group>
      ))}
      <Float speed={1.1} rotationIntensity={0.05} floatIntensity={0.4}>
        <mesh position={[2.6, 0.25, 2.4]} castShadow>
          <boxGeometry args={[3.1, 1.55, 1.8]} />
          <meshStandardMaterial color="#a8405f" metalness={0.35} roughness={0.5} />
        </mesh>
      </Float>
      <Sparkles count={45} scale={[10, 4, 12]} size={2.4} speed={0.35} color={accent} />
    </group>
  );
}

function StudioWorld({ accent }: { accent: string }) {
  return (
    <group position={[0, 0, -4]}>
      {[-3.3, 3.3].map((x) => (
        <group key={x} position={[x, 2.4, -3]}>
          <mesh castShadow>
            <boxGeometry args={[2.4, 5.5, 2]} />
            <meshStandardMaterial color="#101321" metalness={0.72} roughness={0.25} />
          </mesh>
          {[1.2, -0.6].map((y) => (
            <mesh key={y} position={[0, y, 1.05]}>
              <cylinderGeometry args={[0.7, 0.7, 0.18, 40]} />
              <meshStandardMaterial color="#07080c" emissive={accent} emissiveIntensity={0.45} />
            </mesh>
          ))}
        </group>
      ))}
      {Array.from({ length: 18 }, (_, index) => (
        <mesh key={index} position={[-4.25 + index * 0.5, 1 + Math.sin(index * 0.9) * 0.9, -1.7]}>
          <boxGeometry args={[0.18, 0.35 + Math.abs(Math.sin(index)) * 1.6, 0.18]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function FinanceWorld({ accent }: { accent: string }) {
  return (
    <group position={[0, 0, -5]}>
      {[-4.5, -1.5, 1.5, 4.5].map((x, index) => (
        <mesh key={x} position={[x, 2.5 + index * 0.75, -3 - index * 0.9]} castShadow>
          <boxGeometry args={[2.2, 6 + index * 1.4, 2.2]} />
          <meshStandardMaterial color="#283340" metalness={0.88} roughness={0.18} emissive={accent} emissiveIntensity={0.08} />
        </mesh>
      ))}
    </group>
  );
}

function DistrictArchitecture({ district, accent }: Pick<Props, 'district' | 'accent'>) {
  switch (district) {
    case 'two-harmonic': return <FashionWorld accent={accent} />;
    case 'fried-em': return <CourtWorld accent={accent} />;
    case 'schmackinn': return <FoodWorld accent={accent} />;
    case 'melodic': return <StudioWorld accent={accent} />;
    case 'business': return <FinanceWorld accent={accent} />;
    default: return null;
  }
}

function Scene({ district, accent, skyTop, activeLandmark, quality }: Omit<Props, 'skyBottom'>) {
  const fogColor = useMemo(() => new THREE.Color(skyTop), [skyTop]);
  return (
    <>
      <color attach="background" args={[skyTop]} />
      <fog attach="fog" args={[fogColor, 18, quality === 'cinematic' ? 58 : 42]} />
      <ambientLight intensity={0.55} />
      <hemisphereLight args={[accent, '#08090d', 1.25]} />
      <directionalLight position={[8, 16, 8]} intensity={2.1} color={accent} castShadow={quality === 'cinematic'} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[-8, 4, 2]} intensity={22} distance={24} color={accent} />
      <Ground accent={accent} />
      <CityMass accent={accent} district={district} />
      <DistrictArchitecture district={district} accent={accent} />
      {quality === 'cinematic' && <Stars radius={70} depth={42} count={1700} factor={3} saturation={0.1} fade speed={0.25} />}
      {quality === 'cinematic' && <Sparkles count={55} scale={[28, 10, 32]} size={1.6} speed={0.18} color={accent} />}
      <CameraRig district={district} activeLandmark={activeLandmark} />
    </>
  );
}

export function WebGLDistrictCanvas(props: Props) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        dpr={props.quality === 'cinematic' ? [1, 1.75] : 1}
        camera={{ position: [0, 6, 18], fov: 46, near: 0.1, far: 120 }}
        shadows={props.quality === 'cinematic'}
        gl={{ antialias: props.quality === 'cinematic', alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene
            district={props.district}
            accent={props.accent}
            skyTop={props.skyTop}
            activeLandmark={props.activeLandmark}
            quality={props.quality}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
