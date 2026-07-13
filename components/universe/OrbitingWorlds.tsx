'use client';

import type { CSSProperties, ReactNode } from 'react';
import type { UniverseWorld } from './types';
import styles from './UniverseExperience.module.css';
import polish from './UniversePolish.module.css';
import identity from './UniverseIdentity.module.css';

const GARFIELD_IMAGE = 'data:image/webp;base64,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';

type Props = {
  worlds: UniverseWorld[];
  selectedWorld: UniverseWorld | null;
  onSelect: (world: UniverseWorld) => void;
};

function renderWorldIdentity(world: UniverseWorld): ReactNode {
  switch (world.id) {
    case 'two-harmonic':
      return <span className={identity.twoHarmonicMini} />;
    case 'melodic':
      return <span className={identity.melodicSymbol}>𝄞</span>;
    case 'fried-em':
      return <span className={identity.basketball}><i className={identity.ballSeam} /></span>;
    case 'schmackinn':
      return <span className={identity.garfieldFrame}><img className={identity.garfieldImage} src={GARFIELD_IMAGE} alt="Garfield representing Schmackinn" /></span>;
    case 'business':
      return <span className={identity.businessCore}><span>↗</span></span>;
    default:
      return world.glyph;
  }
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
          >
            <span className={polish.portalTrail} />
            <span className={styles.portalAtmosphere} />
            <span className={styles.portalCore} aria-hidden="true" />
            <span className={identity.portalVisual}>{renderWorldIdentity(world)}</span>
            <span className={polish.portalIdentity} />
            {selected && <span className={polish.selectedHalo} />}
            <span className={styles.portalLabel}>{world.name}</span>
          </button>
        );
      })}
    </div>
  );
}
