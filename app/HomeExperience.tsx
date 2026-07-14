'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './homepage.module.css';

type World = {
  id: string;
  prompt: string;
  name: string;
  frequency: string;
  icon: string;
  href: string;
  color: string;
  items: string[];
  summary: string;
};

const worlds: World[] = [
  {
    id: 'melodic',
    prompt: 'Hear something?',
    name: 'Melodic',
    frequency: 'Music Frequency',
    icon: '♪',
    href: '/worlds/melodic',
    color: '#a952ff',
    items: ['Beats & Songs', 'Studio Sessions', 'Behind The Sound', 'Melodic Voices'],
    summary: 'The source frequency for music, performance, studio sessions, releases, and the creative process behind Melodic.',
  },
  {
    id: 'two-harmonic',
    prompt: 'Ready to resonate?',
    name: '2 Harmonic',
    frequency: 'Fashion Frequency',
    icon: '∞',
    href: '/worlds/two-harmonic',
    color: '#57bfff',
    items: ['Collections', 'Drops', 'Behind The Stitch', 'Harmonic Souls'],
    summary: 'The fashion world of stitched melodies, collection stories, garment design, drops, and community expression.',
  },
  {
    id: 'fried-em',
    prompt: 'Feeling competitive?',
    name: 'Fried Em',
    frequency: 'Hoops Frequency',
    icon: '◉',
    href: '/worlds/fried-em',
    color: '#ff8b2b',
    items: ['Game Highlights', 'Training', 'Challenges', 'Behind The Grind'],
    summary: 'Basketball, competition, smoke, training, highlights, challenges, and the grind behind every bucket.',
  },
  {
    id: 'schmackinn',
    prompt: 'Got the munchies?',
    name: 'Schmackinn',
    frequency: 'Food Frequency',
    icon: '◒',
    href: '/worlds/schmackinn',
    color: '#c05cff',
    items: ['Food Reviews', 'Tier Lists', 'Restaurant Map', 'Community Picks'],
    summary: 'Real food reviews, honest rankings, restaurant discoveries, community picks, and the Schmackinn tier archive.',
  },
];

export default function HomeExperience() {
  const router = useRouter();
  const [openWorld, setOpenWorld] = useState<string | null>(null);

  const active = worlds.find((world) => world.id === openWorld) ?? null;

  return (
    <main className={styles.page}>
      <div className={styles.noise} aria-hidden="true" />
      <header className={styles.topbar}>
        <button className={styles.brand} type="button" onClick={() => setOpenWorld(null)}>
          <span className={styles.brandMark}>∞</span>
          <span>Harmonic OS</span>
        </button>
        <nav className={styles.nav} aria-label="Primary navigation">
          <button type="button" onClick={() => setOpenWorld(null)}>Home</button>
          <a href="#worlds">Worlds</a>
          <a href="#overview">About</a>
          <a href="#community">Community</a>
          <a href="/worlds/two-harmonic">Shop</a>
        </nav>
        <span className={styles.navLogo}>∞</span>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>The connected multimedia ecosystem</p>
          <h1>Harmonic OS</h1>
          <p className={styles.tagline}>One Frequency. Many Worlds.</p>
        </div>
        <div className={styles.heroLogo} aria-hidden="true">∞</div>
      </section>

      <section className={styles.overview} id="overview">
        <span>Overview</span>
        <p>
          Harmonic OS is a multimedia ecosystem under the Melodic brand. Each world represents a different frequency of expression — all connected by the same purpose: Inspire. Entertain. Elevate.
        </p>
      </section>

      <section className={styles.sourceFlow}>
        <button className={styles.sourceCard} type="button" onClick={() => setOpenWorld(null)}>
          <span className={styles.crown}>♛</span>
          <strong>Melodic</strong>
          <small>The Source</small>
          <p>Vision. Purpose. Creation.</p>
        </button>
        <span className={styles.flowLine} aria-hidden="true" />
      </section>

      <section className={styles.worldSection} id="worlds">
        <div className={styles.worldGrid}>
          {worlds.map((world) => {
            const isOpen = openWorld === world.id;
            return (
              <button
                key={world.id}
                type="button"
                className={`${styles.worldCard} ${isOpen ? styles.worldCardOpen : ''}`}
                style={{ '--world-color': world.color } as React.CSSProperties}
                aria-expanded={isOpen}
                onClick={() => setOpenWorld(isOpen ? null : world.id)}
              >
                <span className={styles.worldPrompt}>{world.prompt}</span>
                <span className={styles.worldIcon}>{world.icon}</span>
                <span className={styles.worldName}>{world.name}</span>
                <span className={styles.worldFrequency}>{world.frequency}</span>
                <span className={styles.expandLabel}>{isOpen ? 'Close frequency' : 'Open frequency'}</span>
              </button>
            );
          })}
        </div>

        <div className={`${styles.dropdown} ${active ? styles.dropdownOpen : ''}`} aria-live="polite">
          {active && (
            <div className={styles.dropdownInner} style={{ '--world-color': active.color } as React.CSSProperties}>
              <div className={styles.dropdownLead}>
                <span className={styles.dropdownIcon}>{active.icon}</span>
                <div>
                  <small>{active.frequency}</small>
                  <h2>{active.name}</h2>
                </div>
              </div>
              <p>{active.summary}</p>
              <ul>
                {active.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <button type="button" onClick={() => router.push(active.href)}>Enter {active.name}</button>
            </div>
          )}
        </div>
      </section>

      <section className={styles.community} id="community">
        <span className={styles.communityIcon}>♙♙♙</span>
        <div>
          <h2>Harmonic Community</h2>
          <p>One community. Different frequencies.</p>
        </div>
        <div className={styles.communityLinks}>
          <span>Engage</span><i /> <span>Support</span><i /> <span>Create</span><i /> <span>Elevate</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>Stay in tune.</span>
        <div className={styles.wave}>⌁⌁⌁⌁⌁</div>
        <span>Stay in harmony.</span>
      </footer>
    </main>
  );
}
