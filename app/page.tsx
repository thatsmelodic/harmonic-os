import styles from './homepage.module.css';

export const metadata = {
  title: 'Harmonic OS | Enter the Frequency',
  description: 'Enter a cinematic living universe where music, fashion, food, basketball, and business move as connected frequencies.',
};

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true" />
      <img
        className={styles.image}
        src="/harmonic-os-home.jpg?v=20260714-final"
        alt="Harmonic OS cinematic universe with Melodic, Fried Em, Business, Schmackinn, and 2 Harmonic worlds"
      />
    </main>
  );
}
