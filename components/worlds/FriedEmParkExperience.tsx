'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import styles from './FriedEmParkExperience.module.css';

type RoomId = 'park' | 'episodes' | 'leaderboard' | 'challenges' | 'film';

type Room = {
  id: RoomId;
  label: string;
  icon: string;
  description: string;
  className: string;
};

const rooms: Room[] = [
  { id: 'episodes', label: 'Episode Wall', icon: '🎥', description: 'Watch every run, highlight, and behind-the-scenes clip.', className: styles.episodes },
  { id: 'leaderboard', label: 'Cooked Board', icon: '🔥', description: 'Rankings, records, victims, and signature moments.', className: styles.leaderboard },
  { id: 'park', label: 'Center Court', icon: '🏀', description: 'Current game, score, momentum, and live park activity.', className: styles.parkSpot },
  { id: 'challenges', label: 'Challenge Arena', icon: '⚔️', description: 'Callouts, matchups, RSVPs, and community smoke.', className: styles.challenges },
  { id: 'film', label: 'Film Room', icon: '🎞️', description: 'Breakdowns, scouting, slow motion, and game IQ.', className: styles.film },
];

const roomContent: Record<RoomId, Array<{ eyebrow: string; title: string; body: string }>> = {
  park: [
    { eyebrow: 'Current Run', title: 'Melodic vs. The Homies', body: 'First to 21. Winner keeps court. Every possession feeds the live Cooked Meter.' },
    { eyebrow: 'Next Event', title: 'Sunday Night Run', body: 'Open challenge slots, live crowd voting, and episode recording.' },
    { eyebrow: 'Trending', title: 'Game Point Replay', body: 'The final bucket is drawing the most heat across the park.' },
  ],
  episodes: [
    { eyebrow: 'Episode 01', title: 'They Wanted Smoke', body: 'My best friends called me out, so I fried them on camera.' },
    { eyebrow: 'Episode 02', title: 'No Excuses at the Park', body: 'First to 21. Loser hears about it all week.' },
    { eyebrow: 'Episode 03', title: 'The Rematch', body: 'Same court. New energy. More pressure.' },
  ],
  leaderboard: [
    { eyebrow: '#1 Head Chef', title: 'Melodic — 8-1', body: 'Cooked Meter: 96%. Signature move: hesitation into stepback.' },
    { eyebrow: '#2 Microwave', title: 'Jay Buckets — 6-2', body: 'Cooked Meter: 88%. Dangerous once the first jumper falls.' },
    { eyebrow: '#3 Hot Hand', title: 'Tone — 5-3', body: 'Cooked Meter: 82%. Momentum rises fast after consecutive stops.' },
  ],
  challenges: [
    { eyebrow: 'Open Callout', title: 'Winner Keeps Court', body: '1v1 challenge slot waiting for an opponent and community approval.' },
    { eyebrow: 'Scheduled', title: 'Best of Three', body: 'Rematch request is pending. No excuses once both players accept.' },
    { eyebrow: 'Community Vote', title: 'Who Gets Next?', body: 'The audience decides which matchup becomes the next full episode.' },
  ],
  film: [
    { eyebrow: 'Breakdown 01', title: 'How the lane opened', body: 'Early drives forced help defense and created clean kick-out opportunities.' },
    { eyebrow: 'Breakdown 02', title: 'The momentum swing', body: 'Three straight stops changed the pace and put pressure on every possession.' },
    { eyebrow: 'Breakdown 03', title: 'The finishing move', body: 'A hesitation froze the defender before the downhill step created separation.' },
  ],
};

export function FriedEmParkExperience() {
  const [entered, setEntered] = useState(false);
  const [room, setRoom] = useState<RoomId>('park');
  const [ambientOn, setAmbientOn] = useState(true);
  const [nightMode, setNightMode] = useState(true);

  const activeRoom = useMemo(() => rooms.find((item) => item.id === room)!, [room]);

  return (
    <main className={styles.world} style={{ filter: nightMode ? undefined : 'brightness(1.16) saturate(.9)' }}>
      <section className={`${styles.spawn} ${entered ? styles.spawnHidden : ''}`}>
        <div className={styles.spawnCard}>
          <div className={styles.ball}>🏀</div>
          <p className={styles.eyebrow}>30.0 FM / Fried Em Frequency</p>
          <h1 className={styles.spawnTitle}>Welcome to Pressure.</h1>
          <p className={styles.spawnCopy}>Step onto the blacktop where hoopers get called out, cooked, ranked, replayed, and remembered.</p>
          <button className={styles.enterButton} onClick={() => setEntered(true)}>Enter The Park</button>
        </div>
      </section>

      <header className={styles.topbar}>
        <Link href="/" className={styles.brand}><span className={styles.liveDot} /> FRIED EM</Link>
        <div className={styles.controls}>
          <button className={styles.controlButton} onClick={() => setAmbientOn((value) => !value)}>{ambientOn ? '🔊 Ambience On' : '🔇 Ambience Off'}</button>
          <button className={styles.controlButton} onClick={() => setNightMode((value) => !value)}>{nightMode ? '🌙 Night Run' : '☀️ Day Run'}</button>
          <Link href="/" className={styles.controlButton}>Universe Map</Link>
        </div>
      </header>

      <section className={styles.park} aria-label="Interactive Fried Em park">
        <div className={styles.skyGlow} />
        <div className={styles.scoreboard}>
          <p className={styles.eyebrow}>Game Point</p>
          <div className={styles.score}><span>HOME 21</span><span>11 AWAY</span></div>
        </div>
        <div className={styles.hoop}><div className={styles.backboard} /><div className={styles.rim} /></div>
        <div className={styles.court} />

        {rooms.map((item) => (
          <button
            key={item.id}
            onClick={() => setRoom(item.id)}
            className={`${styles.hotspot} ${item.className} ${room === item.id ? styles.hotspotActive : ''}`}
            aria-pressed={room === item.id}
          >
            <span className={styles.hotspotIcon}>{item.icon}</span>
            <span className={styles.hotspotTitle}>{item.label}</span>
            <span className={styles.hotspotCopy}>{item.description}</span>
          </button>
        ))}
      </section>

      <section className={styles.roomPanel}>
        <div className={styles.roomHeader}>
          <div>
            <p className={styles.eyebrow}>Active Location</p>
            <h2 className={styles.roomTitle}>{activeRoom.icon} {activeRoom.label}</h2>
          </div>
          <div className={styles.controls}>
            <button className={styles.primaryButton}>Open Full Room</button>
            <button className={styles.secondaryButton} onClick={() => setRoom('park')}>Back to Center Court</button>
          </div>
        </div>

        <div className={styles.roomGrid}>
          {roomContent[room].map((item) => (
            <article key={item.title} className={styles.card}>
              <p className={styles.eyebrow}>{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
