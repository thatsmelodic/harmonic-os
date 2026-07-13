'use client';

import { useMemo, useState, type CSSProperties, type PointerEvent } from 'react';
import { HarmonicHeart } from './HarmonicHeart';
import { HeartMaterialControls } from './HeartMaterialControls';
import { OrbitingWorlds } from './OrbitingWorlds';
import { UniverseFallback } from './UniverseFallback';
import { WorldSelectionPanel } from './WorldSelectionPanel';
import { heartMaterialPresets, universeWorlds } from './universeData';
import type { CameraState, HeartMaterial, UniverseWorld } from './types';
import styles from './UniverseExperience.module.css';
import polish from './UniversePolish.module.css';

export function UniverseScene() {
  const [selectedWorld, setSelectedWorld] = useState<UniverseWorld | null>(universeWorlds[0]);
  const [material, setMaterial] = useState<HeartMaterial>({ primary: heartMaterialPresets[0].primary, secondary: heartMaterialPresets[0].secondary });
  const [dragging, setDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: -10, y: 28 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, rx: -10, ry: 28 });
  const [camera, setCamera] = useState<CameraState>({ x: 0, y: 0, z: 0 });

  const cssVars = useMemo(() => ({
    '--heart-primary': material.primary,
    '--heart-secondary': material.secondary,
    '--selected-world': selectedWorld?.color ?? '#d9b875',
    '--selected-accent': selectedWorld?.accent ?? '#fff0c6',
    '--camera-x': `${camera.x}px`,
    '--camera-y': `${camera.y}px`,
    '--camera-z': `${camera.z}px`,
  }) as CSSProperties, [material, selectedWorld, camera]);

  function beginDrag(event: PointerEvent<HTMLDivElement>) {
    setDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY, rx: rotation.x, ry: rotation.y });
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    const dx = event.clientX - dragStart.x;
    const dy = event.clientY - dragStart.y;
    setRotation({ x: Math.max(-38, Math.min(34, dragStart.rx - dy * 0.16)), y: dragStart.ry + dx * 0.2 });
  }

  function endDrag() {
    setDragging(false);
  }

  function updateCamera(event: PointerEvent<HTMLElement>) {
    if (dragging) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setCamera({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 24,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * -18,
      z: selectedWorld ? 18 : 0,
    });
  }

  return (
    <section className={styles.stage} style={cssVars} onPointerMove={updateCamera} aria-label="Interactive Harmonic OS universe">
      <div className={polish.cosmicDepth} />
      <div className={polish.cosmicDust} />
      <div className={polish.cosmicLight} />

      <div className={styles.copyBlock}>
        <p className={styles.eyebrow}>Harmonic operating system</p>
        <h1>One Frequency.<br />Many Worlds.</h1>
        <p>Drag the official 2 Harmonic heart, tune its material, and select an orbiting world to enter a connected multimedia universe.</p>
      </div>

      <div className={`${styles.universe} ${selectedWorld ? styles.universeSelected : ''}`}>
        <div className={styles.cameraRig}>
          <OrbitingWorlds worlds={universeWorlds} selectedWorld={selectedWorld} onSelect={setSelectedWorld} />
          <HarmonicHeart dragging={dragging} rotation={rotation} onPointerDown={beginDrag} onPointerMove={moveDrag} onPointerUp={endDrag} />
        </div>
      </div>

      <HeartMaterialControls material={material} presets={heartMaterialPresets} onMaterialChange={setMaterial} />
      <WorldSelectionPanel world={selectedWorld} onClose={() => setSelectedWorld(null)} />
      <UniverseFallback worlds={universeWorlds} />
    </section>
  );
}
