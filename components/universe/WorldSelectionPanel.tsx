'use client';

import Link from 'next/link';
import type { UniverseWorld } from './types';
import styles from './UniverseExperience.module.css';

type Props = {
  world: UniverseWorld | null;
  onClose: () => void;
};

export function WorldSelectionPanel({ world, onClose }: Props) {
  if (!world) return null;

  return (
    <aside className={styles.worldPanel} aria-live="polite">
      <button className={styles.closePanel} type="button" onClick={onClose}>Close</button>
      <p className={styles.panelKicker}>{world.frequency}</p>
      <h2>{world.name}</h2>
      <p>{world.description}</p>
      <div className={styles.panelActions}>
        <Link href={world.href}>Enter World</Link>
        <button type="button" onClick={onClose}>Back to orbit</button>
      </div>
    </aside>
  );
}
