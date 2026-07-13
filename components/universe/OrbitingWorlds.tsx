'use client';

import type { CSSProperties } from 'react';
import type { UniverseWorld } from './types';
import styles from './UniverseExperience.module.css';

type Props = {
  worlds: UniverseWorld[];
  selectedWorld: UniverseWorld | null;
  onSelect: (world: UniverseWorld) => void;
};

export function OrbitingWorlds({ worlds, selectedWorld, onSelect }: Props) {
  return (
    <div className={styles.orbitPlane} aria-label="Orbiting Harmonic OS worlds">
      <span className={styles.orbitRing} />
      <span className={`${styles.orbitRing} ${styles.orbitRingInner}`} />
      {worlds.map((world) => (
        <button
          key={world.id}
          className={`${styles.portal} ${selectedWorld?.id === world.id ? styles.portalSelected : ''}`}
          style={{ '--portal-color': world.color, '--portal-accent': world.accent, '--portal-angle': `${world.orbit}deg`, '--portal-delay': world.delay } as CSSProperties}
          onClick={() => onSelect(world)}
          type="button"
          aria-pressed={selectedWorld?.id === world.id}
        >
          <span className={styles.portalAtmosphere} />
          <span className={styles.portalCore}>{world.glyph}</span>
          <span className={styles.portalLabel}>{world.name}</span>
        </button>
      ))}
    </div>
  );
}
