'use client';

import Link from 'next/link';
import { UniverseScene } from './UniverseScene';
import styles from './UniverseExperience.module.css';
import identity from './UniverseIdentity.module.css';

export function UniverseExperience() {
  return (
    <main className={styles.shell}>
      <div className={identity.galaxyBackdrop} />
      <div className={identity.galaxyBand} />
      <div className={identity.galaxyDust} />
      <div className={styles.starfield} />
      <div className={styles.nebula} />
      <div className={styles.noise} />

      <nav className={styles.nav}>
        <Link href="/" className={styles.brand} aria-label="Harmonic OS home">
          <span className={styles.brandMark} />
          <span><strong>Harmonic OS</strong><small>One Frequency. Many Worlds.</small></span>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/worlds">World Index</Link>
          <Link href="/studio">Creator Studio</Link>
        </div>
      </nav>

      <UniverseScene />
    </main>
  );
}
