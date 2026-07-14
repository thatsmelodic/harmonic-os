'use client';

import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './homepage.module.css';

type World = {
  id: string;
  label: string;
  href: string;
  feature: string;
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

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--camera-x', `${x * 12}px`);
    event.currentTarget.style.setProperty('--camera-y', `${y * 8}px`);
    event.currentTarget.style.setProperty('--tilt-x', `${y * -1.3}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${x * 1.8}deg`);
  }, []);

  const resetCamera = useCallback((event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--camera-x', '0px');
    event.currentTarget.style.setProperty('--camera-y', '0px');
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  }, []);

  const enterWorld = useCallback((world: World) => {
    if (entering) return;
    setEntering(world.id);
    window.setTimeout(() => router.push(world.href), 650);
  }, [entering, router]);

  return (
    <main
      ref={pageRef}
      className={`${styles.page} ${entering ? styles.isEntering : ''}`}
      data-entering={entering ?? undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetCamera}
    >
      <div className={styles.backdrop} aria-hidden="true" />
      <div
        className={styles.image}
        role="img"
        aria-label="Harmonic OS cinematic universe with Melodic, Fried Em, Business, Schmackinn, and 2 Harmonic worlds"
      />
      <div className={styles.starVeil} aria-hidden="true" />

      {worlds.map((world) => (
        <button
          key={world.id}
          type="button"
          className={`${styles.worldHotspot} ${styles[world.id]}`}
          aria-label={`Enter ${world.label}: ${world.feature}`}
          onPointerEnter={() => setActiveWorld(world.id)}
          onPointerLeave={() => setActiveWorld(null)}
          onFocus={() => setActiveWorld(world.id)}
          onBlur={() => setActiveWorld(null)}
          onClick={() => enterWorld(world)}
        >
          <span className={styles.orbitRing} aria-hidden="true" />
          <span className={styles.worldPulse} aria-hidden="true" />
          <span className={styles.worldTooltip}>
            <strong>{world.label}</strong>
            <small>{world.feature}</small>
          </span>
        </button>
      ))}

      <div className={styles.cameraHint} aria-hidden="true">
        <span>Move to orbit</span><i /> <span>Click to enter</span>
      </div>

      <div className={`${styles.focusReadout} ${activeWorld ? styles.visible : ''}`} aria-live="polite">
        {activeWorld ? worlds.find((world) => world.id === activeWorld)?.label : ''}
      </div>
      <div className={styles.transitionFlash} aria-hidden="true" />
    </main>
  );
}
