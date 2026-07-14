import Link from 'next/link';
import styles from './homepage.module.css';

export const metadata = {
  title: 'Harmonic OS | Enter the Frequency',
  description: 'Enter a cinematic living universe where music, fashion, food, basketball, and business move as connected frequencies.',
};

export default function Home() {
  return (
    <main className={styles.page}>
      <img
        className={styles.image}
        src="/harmonic-os-home.jpg?v=20260714b"
        alt="Harmonic OS cinematic universe with Melodic, Fried Em, Business, Schmackinn, and 2 Harmonic worlds"
      />
      <div className={styles.shade} />

      <Link className={`${styles.hotspot} ${styles.melodic}`} href="/worlds/melodic" aria-label="Enter Melodic" />
      <Link className={`${styles.hotspot} ${styles.fried}`} href="/worlds/fried-em" aria-label="Enter Fried Em" />
      <Link className={`${styles.hotspot} ${styles.business}`} href="/worlds/business" aria-label="Enter Business" />
      <Link className={`${styles.hotspot} ${styles.heart}`} href="/worlds" aria-label="Open world index" />
      <Link className={`${styles.hotspot} ${styles.schmackinn}`} href="/worlds/schmackinn" aria-label="Enter Schmackinn" />
      <Link className={`${styles.hotspot} ${styles.harmonic}`} href="/worlds/two-harmonic" aria-label="Enter 2 Harmonic" />
      <Link className={`${styles.hotspot} ${styles.settings}`} href="/studio" aria-label="Open system settings" />
    </main>
  );
}
