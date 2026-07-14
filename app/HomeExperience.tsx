'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './homepage.module.css';

type World = { id: string; label: string; href: string; feature: string };
type HomeSettings = {
  imagePath: string;
  fit: 'cover' | 'contain';
  zoom: number;
  positionX: number;
  positionY: number;
  brightness: number;
  saturation: number;
  camera: number;
  stars: number;
  motion: boolean;
  hotspots: boolean;
};

const STORAGE_KEY = 'harmonic-home-settings-v1';
const defaults: HomeSettings = {
  imagePath: '/cinematic/harmonic-os-home.jpg.png', fit: 'cover', zoom: 1.035,
  positionX: 50, positionY: 50, brightness: 1, saturation: 1,
  camera: 1, stars: .28, motion: true, hotspots: true,
};

const worlds: World[] = [
  { id: 'melodic', label: 'Melodic', href: '/worlds/melodic', feature: 'Sound Planet' },
  { id: 'fried', label: 'Fried Em', href: '/worlds/fried-em', feature: 'Basketball Universe' },
  { id: 'business', label: 'Business', href: '/worlds/business', feature: 'Growth Orbit' },
  { id: 'heart', label: 'Harmonic OS', href: '/worlds', feature: 'Central Frequency' },
  { id: 'schmackinn', label: 'Schmackinn', href: '/worlds/schmackinn', feature: 'Lasagna Mode' },
  { id: 'harmonic', label: '2 Harmonic', href: '/worlds/two-harmonic', feature: 'Design World' },
];

export default function HomeExperience() {
  const router = useRouter();
  const pageRef = useRef<HTMLElement>(null);
  const [activeWorld, setActiveWorld] = useState<string | null>(null);
  const [entering, setEntering] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<HomeSettings>(defaults);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSettings({ ...defaults, ...JSON.parse(stored) });
    } catch { /* ignore invalid local data */ }
  }, []);

  const cssVars = useMemo(() => ({
    '--home-image': `url("${settings.imagePath}")`,
    '--image-fit': settings.fit,
    '--image-zoom': String(settings.zoom),
    '--image-x': `${settings.positionX}%`,
    '--image-y': `${settings.positionY}%`,
    '--image-brightness': String(settings.brightness),
    '--image-saturation': String(settings.saturation),
    '--star-opacity': String(settings.stars),
  } as React.CSSProperties), [settings]);

  const patch = <K extends keyof HomeSettings>(key: K, value: HomeSettings[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSaved(true);
  };

  const reset = () => {
    setSettings(defaults);
    localStorage.removeItem(STORAGE_KEY);
    setSaved(false);
  };

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (editing || !settings.motion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    const strength = settings.camera;
    event.currentTarget.style.setProperty('--camera-x', `${x * 12 * strength}px`);
    event.currentTarget.style.setProperty('--camera-y', `${y * 8 * strength}px`);
    event.currentTarget.style.setProperty('--tilt-x', `${y * -1.3 * strength}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${x * 1.8 * strength}deg`);
  }, [editing, settings.camera, settings.motion]);

  const resetCamera = useCallback((event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--camera-x', '0px');
    event.currentTarget.style.setProperty('--camera-y', '0px');
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  }, []);

  const enterWorld = useCallback((world: World) => {
    if (editing || entering) return;
    setEntering(world.id);
    window.setTimeout(() => router.push(world.href), 650);
  }, [editing, entering, router]);

  return (
    <main ref={pageRef} style={cssVars} className={`${styles.page} ${entering ? styles.isEntering : ''} ${editing ? styles.editing : ''} ${!settings.motion ? styles.motionOff : ''}`} onPointerMove={handlePointerMove} onPointerLeave={resetCamera}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.image} role="img" aria-label="Harmonic OS cinematic universe" />
      <div className={styles.starVeil} aria-hidden="true" />

      {settings.hotspots && worlds.map((world) => (
        <button key={world.id} type="button" className={`${styles.worldHotspot} ${styles[world.id]}`} aria-label={`Enter ${world.label}: ${world.feature}`} onPointerEnter={() => setActiveWorld(world.id)} onPointerLeave={() => setActiveWorld(null)} onFocus={() => setActiveWorld(world.id)} onBlur={() => setActiveWorld(null)} onClick={() => enterWorld(world)}>
          <span className={styles.orbitRing} aria-hidden="true" /><span className={styles.worldPulse} aria-hidden="true" />
          <span className={styles.worldTooltip}><strong>{world.label}</strong><small>{world.feature}</small></span>
        </button>
      ))}

      <button className={styles.editButton} type="button" onClick={() => setEditing((value) => !value)}>{editing ? 'Close Editor' : 'Edit Home'}</button>
      {editing && <aside className={styles.editor} aria-label="Homepage editor">
        <header><div><small>Harmonic OS</small><h2>Homepage Editor</h2></div><button type="button" onClick={() => setEditing(false)}>×</button></header>
        <label>Image path<input value={settings.imagePath} onChange={(event) => patch('imagePath', event.target.value)} /></label>
        <label>Image fit<select value={settings.fit} onChange={(event) => patch('fit', event.target.value as HomeSettings['fit'])}><option value="cover">Fill screen</option><option value="contain">Show full image</option></select></label>
        <label>Zoom <output>{settings.zoom.toFixed(3)}</output><input type="range" min="0.8" max="1.3" step="0.005" value={settings.zoom} onChange={(event) => patch('zoom', Number(event.target.value))} /></label>
        <label>Horizontal position <output>{settings.positionX}%</output><input type="range" min="0" max="100" value={settings.positionX} onChange={(event) => patch('positionX', Number(event.target.value))} /></label>
        <label>Vertical position <output>{settings.positionY}%</output><input type="range" min="0" max="100" value={settings.positionY} onChange={(event) => patch('positionY', Number(event.target.value))} /></label>
        <label>Brightness <output>{settings.brightness.toFixed(2)}</output><input type="range" min="0.5" max="1.5" step="0.01" value={settings.brightness} onChange={(event) => patch('brightness', Number(event.target.value))} /></label>
        <label>Saturation <output>{settings.saturation.toFixed(2)}</output><input type="range" min="0" max="1.8" step="0.01" value={settings.saturation} onChange={(event) => patch('saturation', Number(event.target.value))} /></label>
        <label>Camera strength <output>{settings.camera.toFixed(1)}</output><input type="range" min="0" max="2" step="0.1" value={settings.camera} onChange={(event) => patch('camera', Number(event.target.value))} /></label>
        <label>Star layer <output>{settings.stars.toFixed(2)}</output><input type="range" min="0" max="0.8" step="0.01" value={settings.stars} onChange={(event) => patch('stars', Number(event.target.value))} /></label>
        <div className={styles.switches}><label><input type="checkbox" checked={settings.motion} onChange={(event) => patch('motion', event.target.checked)} /> Motion</label><label><input type="checkbox" checked={settings.hotspots} onChange={(event) => patch('hotspots', event.target.checked)} /> World hotspots</label></div>
        <footer><button type="button" onClick={reset}>Reset</button><button type="button" onClick={save}>{saved ? 'Saved' : 'Save Changes'}</button></footer>
        <p>Changes save to this browser instantly. The preview updates while you edit.</p>
      </aside>}

      <div className={styles.cameraHint} aria-hidden="true"><span>Move to orbit</span><i /><span>Click to enter</span></div>
      <div className={`${styles.focusReadout} ${activeWorld ? styles.visible : ''}`} aria-live="polite">{activeWorld ? worlds.find((world) => world.id === activeWorld)?.label : ''}</div>
      <div className={styles.transitionFlash} aria-hidden="true" />
    </main>
  );
}
