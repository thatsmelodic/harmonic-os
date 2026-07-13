'use client';

import type { CSSProperties } from 'react';
import type { UniverseWorld } from './types';
import styles from './UniverseExperience.module.css';
import polish from './UniversePolish.module.css';

type Props = {
  worlds: UniverseWorld[];
  selectedWorld: UniverseWorld | null;
  onSelect: (world: UniverseWorld) => void;
};

function WorldGlyph({ world }: { world: UniverseWorld }) {
  if (world.id === 'schmackinn') {
    return (
      <span className={polish.garfieldMark} aria-hidden="true">
        <span className={polish.catEarLeft} />
        <span className={polish.catEarRight} />
        <span className={polish.catEyeLeft} />
        <span className={polish.catEyeRight} />
        <span className={polish.catMuzzle} />
      </span>
    );
  }

  if (world.id === 'melodic') {
    return <span className={polish.musicMark} aria-hidden="true">𝄞</span>;
  }

  if (world.id === 'fried-em') {
    return (
      <span className={polish.basketballMark} aria-hidden="true">
        <i className={polish.ballSeamVertical} />
        <i className={polish.ballSeamHorizontal} />
        <i className={polish.ballSeamCurveA} />
        <i className={polish.ballSeamCurveB} />
      </span>
    );
  }

  if (world.id === 'business') {
    return <span className={polish.businessMark} aria-hidden="true">◆</span>;
  }

  return <span className={polish.fashionMark} aria-hidden="true">Ⅱ</span>;
}

export function OrbitingWorlds({ worlds, selectedWorld, onSelect }: Props) {
  return (
    <div className={styles.orbitPlane} aria-label="Orbiting Harmonic OS worlds">
      <span className={styles.orbitRing} />
      <span className={`${styles.orbitRing} ${styles.orbitRingInner}`} />
      {worlds.map((world) => {
        const worldClass = polish[`world-${world.id}` as keyof typeof polish] ?? '';
        const selected = selectedWorld?.id === world.id;
        return (
          <button
            key={world.id}
            className={`${styles.portal} ${worldClass} ${selected ? styles.portalSelected : ''}`}
            style={{ '--portal-color': world.color, '--portal-accent': world.accent, '--portal-angle': `${world.orbit}deg`, '--portal-delay': world.delay } as CSSProperties}
            onClick={() => onSelect(world)}
            type="button"
            aria-pressed={selected}
            aria-label={`Select ${world.name}`}
          >
            <span className={polish.portalTrail} />
            <span className={styles.portalAtmosphere} />
            <span className={`${styles.portalCore} ${polish.portalCoreIdentity}`}><WorldGlyph world={world} /></span>
            <span className={polish.portalIdentity} />
            {selected && <span className={polish.selectedHalo} />}
            <span className={styles.portalLabel}>{world.name}</span>
          </button>
        );
      })}
    </div>
  );
}
