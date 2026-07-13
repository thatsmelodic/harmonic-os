'use client';

import type { CSSProperties, PointerEvent } from 'react';
import styles from './UniverseExperience.module.css';
import polish from './UniversePolish.module.css';

type Props = {
  dragging: boolean;
  rotation: { x: number; y: number };
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: () => void;
};

export function HarmonicHeart({ dragging, rotation, onPointerDown, onPointerMove, onPointerUp }: Props) {
  return (
    <div
      className={`${styles.heartRig} ${dragging ? styles.heartDragging : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="img"
      aria-label="Interactive 3D 2 Harmonic interlocked heart logo"
    >
      <div className={polish.heartEnergy} />
      <div className={styles.heartShadow} />
      <div className={styles.heartObject} style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}>
        {Array.from({ length: 26 }, (_, index) => (
          <span key={index} className={styles.heartLayer} style={{ '--layer-depth': `${index - 13}px` } as CSSProperties} />
        ))}
        <span className={styles.heartBacklight} />
        <span className={styles.heartFace} />
        <span className={styles.heartRim} />
        <span className={styles.heartGlass} />
        <span className={styles.heartGlint} />
      </div>
    </div>
  );
}
