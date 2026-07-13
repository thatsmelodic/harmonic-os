'use client';

import Link from 'next/link';
import type { UniverseWorld } from './types';
import styles from './UniverseExperience.module.css';
import runtime from './RuntimeIdentityPanel.module.css';

type Props = {
  world: UniverseWorld | null;
  onClose: () => void;
};

export function WorldSelectionPanel({ world, onClose }: Props) {
  if (!world) return null;

  return (
    <aside className={`${styles.worldPanel} ${runtime.runtimePanel}`} aria-live="polite">
      <div className={runtime.runtimeHeader}>
        <div>
          <p className={styles.panelKicker}>Harmonic Runtime · Core Identity</p>
          <h2 className={runtime.runtimeTitle}>{world.name}</h2>
        </div>
        <span className={runtime.runtimeStatus}>Signal live</span>
      </div>

      <p>{world.description}</p>

      <div className={runtime.signalGrid} aria-label={`${world.name} runtime signals`}>
        <div className={runtime.signalRow}><span className={runtime.signalKey}>Frequency</span><span className={runtime.signalLine} /><span className={runtime.signalValue}>{world.frequency}</span></div>
        <div className={runtime.signalRow}><span className={runtime.signalKey}>Identity</span><span className={runtime.signalLine} /><span className={runtime.signalValue}>Locked</span></div>
        <div className={runtime.signalRow}><span className={runtime.signalKey}>World route</span><span className={runtime.signalLine} /><span className={runtime.signalValue}>Ready</span></div>
        <div className={runtime.signalRow}><span className={runtime.signalKey}>Runtime</span><span className={runtime.signalLine} /><span className={runtime.signalValue}>Synchronized</span></div>
      </div>

      <div className={runtime.runtimeFooter}>
        <span className={runtime.runtimeCode}>HRM::{world.id.toUpperCase()}::ACTIVE</span>
        <button className={styles.closePanel} type="button" onClick={onClose}>Close signal</button>
      </div>

      <div className={styles.panelActions}>
        <Link href={world.href}>Enter World</Link>
        <button type="button" onClick={onClose}>Return to orbit</button>
      </div>
    </aside>
  );
}
