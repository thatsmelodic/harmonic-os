'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './UniverseExperience.module.css';

const districts = [
  {
    name: '2 Harmonic',
    kicker: 'Lift U Up · Fashion District',
    href: '/worlds/two-harmonic/collections',
    description: 'A warm beige fashion house shaped by stone, fabric, desert wind, and golden-hour light. Every collection enters like an exhibition, not a product grid.',
    scene: 'linear-gradient(135deg,rgba(20,15,11,.1),rgba(17,13,10,.7)),radial-gradient(circle at 72% 24%,rgba(255,219,160,.72),transparent 26%),linear-gradient(160deg,#d5c1a2 0%,#aa8762 36%,#4b3827 68%,#17130f 100%)',
  },
  {
    name: 'Fried Em',
    kicker: 'Orange Dawn · Blacktop District',
    href: '/worlds/fried-em',
    description: 'A real court at first light: burnt-orange sky, chain nets, long shadows, drifting dust, city silhouettes, and the quiet pressure before the first check-up.',
    scene: 'linear-gradient(180deg,rgba(12,10,9,.02),rgba(6,7,9,.7)),radial-gradient(circle at 72% 18%,rgba(255,197,118,.88),transparent 22%),linear-gradient(180deg,#f08b4d 0%,#9f4730 35%,#1a1c22 66%,#08090b 100%)',
  },
  {
    name: 'Schmackinn',
    kicker: 'After Hours · Restaurant District',
    href: '/worlds/schmackinn',
    description: 'Rain on glass, steam over wet pavement, warm restaurant windows, low purple reflections, distant traffic, and a city block built around taste, memory, and culture.',
    scene: 'linear-gradient(180deg,rgba(5,5,9,.08),rgba(4,5,8,.74)),radial-gradient(circle at 22% 28%,rgba(174,93,255,.55),transparent 24%),radial-gradient(circle at 76% 48%,rgba(255,143,92,.32),transparent 19%),linear-gradient(145deg,#28203b 0%,#15111c 42%,#090a0d 100%)',
  },
  {
    name: 'Melodic',
    kicker: 'Night Session · Recording Complex',
    href: '/worlds/melodic',
    description: 'A premium studio after midnight: acoustic walls, glass booths, city lights, soft chrome, moving meters, speaker vibration, and restrained notes drifting like breath.',
    scene: 'linear-gradient(180deg,rgba(7,8,15,.03),rgba(5,6,10,.78)),radial-gradient(circle at 70% 30%,rgba(116,101,255,.5),transparent 28%),linear-gradient(145deg,#17192c 0%,#0e1220 48%,#07080c 100%)',
  },
  {
    name: 'Business',
    kicker: 'Morning Glass · Financial District',
    href: '/worlds/business',
    description: 'A restrained skyline of glass, steel, reflection, and early light. Private rooms, executive calm, live systems, and ambition without noise.',
    scene: 'linear-gradient(180deg,rgba(9,12,18,.04),rgba(7,9,13,.78)),radial-gradient(circle at 65% 20%,rgba(214,185,124,.35),transparent 26%),linear-gradient(145deg,#243040 0%,#141b25 45%,#090c11 100%)',
  },
];

export function UniverseExperience() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setEntered(true), reduced ? 250 : 4700);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className={styles.shell}>
      <div className={styles.sky} />
      <div className={styles.stars} />
      <div className={styles.haze} />
      <div className={styles.city} />
      <div className={styles.reflection} />

      <section className={`${styles.intro} ${entered ? styles.introHidden : ''}`} aria-hidden={entered}>
        <div className="relative grid place-items-center text-center">
          <div className={styles.cup} aria-label="Schmackinn cup pouring into Harmonic OS" />
          <div className={styles.pour} />
          <div className={styles.flood} />
          <p className="mt-8 text-[.64rem] font-black uppercase tracking-[.38em] text-white/45">One source. Every frequency.</p>
          <button className={styles.skip} onClick={() => setEntered(true)}>Enter now</button>
        </div>
      </section>

      <section className={styles.hero}>
        <nav className={styles.nav}>
          <div className={styles.brand}>
            <div className={styles.mark} aria-label="Harmonic mark" />
            <div>
              <p className="text-sm font-black tracking-[-.02em]">Harmonic OS</p>
              <p className={styles.brandText}>A living system of worlds</p>
            </div>
          </div>
          <div className={styles.navLinks}>
            <Link className={styles.navLink} href="/studio">Creator Studio</Link>
            <Link className={styles.navLink} href="/worlds">World Index</Link>
          </div>
        </nav>

        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Music is the harmony connecting every world</p>
          <h1 className={styles.title}>Enter the frequency.</h1>
          <p className={styles.lede}>Harmonic OS is a cinematic living universe where music becomes memory, fashion becomes body, food becomes culture, basketball becomes fire, and business becomes motion. Every district carries its own light, weather, sound, and identity—while the same heartbeat keeps them in harmony.</p>
          <div className={styles.ctaRow}>
            <button className={styles.ctaPrimary} onClick={() => document.getElementById('districts')?.scrollIntoView({ behavior: 'smooth' })}>Explore the districts</button>
            <Link className={styles.ctaSecondary} href="/studio/design">Shape the universe</Link>
          </div>
        </div>

        <p className="relative z-10 max-w-xl text-xs uppercase tracking-[.24em] text-white/35">Real place first. Harmonic interface second. Choose your frequency.</p>
      </section>

      <section id="districts" className={styles.districts}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The connected city</p>
          <h2 className={styles.sectionTitle}>Every world has its own atmosphere.</h2>
          <p className={styles.sectionCopy}>These are not skins laid over the same page. Each district has a separate visual language, climate, architecture, soundscape, pace, and emotional temperature. The transition between them should feel like moving through one real city whose neighborhoods speak different frequencies.</p>
        </div>

        <div className={styles.districtGrid}>
          {districts.map((district) => (
            <article key={district.name} className={styles.district} style={{ '--scene': district.scene } as React.CSSProperties}>
              <div className={styles.districtBody}>
                <p className={styles.districtKicker}>{district.kicker}</p>
                <h3 className={styles.districtName}>{district.name}</h3>
                <p className={styles.districtDesc}>{district.description}</p>
                <Link className={styles.districtAction} href={district.href}>Enter district</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>Harmonic OS · Living Worlds Engine</span>
        <span>Choose your frequency</span>
      </footer>
    </main>
  );
}
