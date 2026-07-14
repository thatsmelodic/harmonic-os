'use client';

import Link from 'next/link';
import styles from './CinematicImageExperience.module.css';

const mobileWorlds = [
  ['Melodic', '/worlds/melodic'],
  ['Fried Em', '/worlds/fried-em'],
  ['Schmackinn', '/worlds/schmackinn'],
  ['2 Harmonic', '/worlds/two-harmonic'],
  ['Business', '/worlds/business'],
] as const;

export function CinematicImageExperience() {
  return (
    <main className={styles.shell}>
      <div className={styles.canvas}>
        <div className={styles.artwork} role="img" aria-label="Harmonic OS cinematic universe with five interactive worlds" />

        <Link className={`${styles.hotspot} ${styles.melodic}`} href="/worlds/melodic"><span className={styles.srOnly}>Enter Melodic</span></Link>
        <Link className={`${styles.hotspot} ${styles.fried}`} href="/worlds/fried-em"><span className={styles.srOnly}>Enter Fried Em</span></Link>
        <Link className={`${styles.hotspot} ${styles.schmackinn}`} href="/worlds/schmackinn"><span className={styles.srOnly}>Enter Schmackinn</span></Link>
        <Link className={`${styles.hotspot} ${styles.harmonic}`} href="/worlds/two-harmonic"><span className={styles.srOnly}>Enter 2 Harmonic</span></Link>
        <Link className={`${styles.hotspot} ${styles.business}`} href="/worlds/business"><span className={styles.srOnly}>Enter Business</span></Link>
        <Link className={`${styles.hotspot} ${styles.heart}`} href="/worlds"><span className={styles.srOnly}>Open world index</span></Link>
        <Link className={`${styles.hotspot} ${styles.settings}`} href="/studio"><span className={styles.srOnly}>Open system settings</span></Link>
        <Link className={`${styles.hotspot} ${styles.worldIndex}`} href="/worlds"><span className={styles.srOnly}>Open world index</span></Link>
      </div>

      <section className={styles.mobileNotice} aria-label="Harmonic OS worlds">
        <div className={styles.mobileLinks}>
          {mobileWorlds.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          <Link href="/studio">System Settings</Link>
        </div>
      </section>
    </main>
  );
}
