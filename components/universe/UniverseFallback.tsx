import Link from 'next/link';
import type { UniverseWorld } from './types';
import styles from './UniverseExperience.module.css';

export function UniverseFallback({ worlds }: { worlds: UniverseWorld[] }) {
  return (
    <section className={styles.fallbackMap} aria-label="2D world fallback map">
      <p className={styles.eyebrow}>Fallback universe map</p>
      <h2>Choose your frequency.</h2>
      <div>
        {worlds.map((world) => <Link key={world.id} href={world.href}>{world.name}<span>{world.frequency}</span></Link>)}
      </div>
    </section>
  );
}
