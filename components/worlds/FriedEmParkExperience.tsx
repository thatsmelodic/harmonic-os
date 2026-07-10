'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
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

const roomRoutes: Partial<Record<RoomId, string>> = {
  episodes: '/worlds/fried-em/episodes',
  leaderboard: '/worlds/fried-em/players',
  challenges: '/worlds/fried-em/challenges',
};

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

const roomOrder: RoomId[] = ['episodes', 'leaderboard', 'park', 'challenges', 'film'];

export function FriedEmParkExperience() {
  const [entered, setEntered] = useState(false);
  const [room, setRoom] = useState<RoomId>('park');
  const [ambientOn, setAmbientOn] = useState(true);
  const [nightMode, setNightMode] = useState(true);
  const [fullRoomOpen, setFullRoomOpen] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const activeRoom = useMemo(() => rooms.find((item) => item.id === room)!, [room]);
  const activeRoute = roomRoutes[room];

  const playBounce = () => {
    if (!ambientOn || typeof window === 'undefined') return;
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = audioContextRef.current ?? new AudioContextClass();
    audioContextRef.current = context;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(120, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(68, context.currentTime + 0.14);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.14, context.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.18);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.2);
  };

  const moveToRoom = (nextRoom: RoomId) => {
    setRoom(nextRoom);
    playBounce();
    window.setTimeout(() => document.getElementById('fried-em-room-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!entered || fullRoomOpen) {
        if (event.key === 'Escape') setFullRoomOpen(false);
        return;
      }
      if (event.key === 'Enter') {
        setFullRoomOpen(true);
        return;
      }
      if (!['ArrowLeft', 'ArrowRight', 'a', 'd'].includes(event.key)) return;
      event.preventDefault();
      const currentIndex = roomOrder.indexOf(room);
      const direction = event.key === 'ArrowLeft' || event.key === 'a' ? -1 : 1;
      const nextIndex = (currentIndex + direction + roomOrder.length) % roomOrder.length;
      moveToRoom(roomOrder[nextIndex]);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [entered, fullRoomOpen, room, ambientOn]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as RoomId;
    if (roomOrder.includes(hash)) setRoom(hash);
  }, []);

  useEffect(() => {
    if (entered) window.history.replaceState(null, '', `#${room}`);
  }, [entered, room]);

  return (
    <main className={styles.world} style={{ filter: nightMode ? undefined : 'brightness(1.16) saturate(.9)' }}>
      <section className={`${styles.spawn} ${entered ? styles.spawnHidden : ''}`}>
        <div className={styles.spawnCard}>
          <div className={styles.ball}>🏀</div>
          <p className={styles.eyebrow}>30.0 FM / Fried Em Frequency</p>
          <h1 className={styles.spawnTitle}>Welcome to Pressure.</h1>
          <p className={styles.spawnCopy}>Step onto the blacktop where hoopers get called out, cooked, ranked, replayed, and remembered.</p>
          <button className={styles.enterButton} onClick={() => { setEntered(true); playBounce(); }}>Enter The Park</button>
        </div>
      </section>

      <header className={styles.topbar}>
        <Link href="/" className={styles.brand}><span className={styles.liveDot} /> FRIED EM</Link>
        <div className={styles.controls}>
          <button className={styles.controlButton} onClick={() => setAmbientOn((value) => !value)}>{ambientOn ? '🔊 Court FX On' : '🔇 Court FX Off'}</button>
          <button className={styles.controlButton} onClick={() => setNightMode((value) => !value)}>{nightMode ? '🌙 Night Run' : '☀️ Day Run'}</button>
          <Link href="/" className={styles.controlButton}>Universe Map</Link>
        </div>
      </header>

      <section className={styles.park} aria-label="Interactive Fried Em park">
        <div className={styles.skyGlow} />
        <div className={styles.scoreboard}>
          <p className={styles.eyebrow}>Game Point</p>
          <div className={styles.score}><span>HOME 21</span><span>11 AWAY</span></div>
          <p style={{ margin: '.6rem 0 0', fontSize: '.7rem', color: 'rgba(255,255,255,.4)' }}>Use ← → or A / D to move · Enter opens room</p>
        </div>
        <div className={styles.hoop}><div className={styles.backboard} /><div className={styles.rim} /></div>
        <div className={styles.court} />

        {rooms.map((item) => (
          <button
            key={item.id}
            onClick={() => moveToRoom(item.id)}
            className={`${styles.hotspot} ${item.className} ${room === item.id ? styles.hotspotActive : ''}`}
            aria-pressed={room === item.id}
          >
            <span className={styles.hotspotIcon}>{item.icon}</span>
            <span className={styles.hotspotTitle}>{item.label}</span>
            <span className={styles.hotspotCopy}>{item.description}</span>
          </button>
        ))}
      </section>

      <section id="fried-em-room-panel" className={styles.roomPanel}>
        <div className={styles.roomHeader}>
          <div>
            <p className={styles.eyebrow}>Active Location</p>
            <h2 className={styles.roomTitle}>{activeRoom.icon} {activeRoom.label}</h2>
          </div>
          <div className={styles.controls}>
            {activeRoute ? <Link className={styles.primaryButton} href={activeRoute}>Enter Live System</Link> : <button className={styles.primaryButton} onClick={() => setFullRoomOpen(true)}>Open Full Room</button>}
            <button className={styles.secondaryButton} onClick={() => moveToRoom('park')}>Back to Center Court</button>
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

      {fullRoomOpen && (
        <div role="dialog" aria-modal="true" aria-label={`${activeRoom.label} full room`} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'grid', placeItems: 'center', padding: '1rem', background: 'rgba(0,0,0,.84)', backdropFilter: 'blur(18px)' }} onClick={() => setFullRoomOpen(false)}>
          <section style={{ width: 'min(1050px, 100%)', maxHeight: '88vh', overflowY: 'auto', border: '1px solid rgba(255,140,60,.3)', borderRadius: '2.4rem', padding: 'clamp(1.25rem,4vw,3rem)', background: 'radial-gradient(circle at top,rgba(255,122,26,.16),transparent 30rem),#0b0301', boxShadow: '0 0 90px rgba(255,90,0,.2)' }} onClick={(event) => event.stopPropagation()}>
            <div className={styles.roomHeader}>
              <div><p className={styles.eyebrow}>Full Room Loaded</p><h2 className={styles.roomTitle}>{activeRoom.icon} {activeRoom.label}</h2></div>
              <button className={styles.secondaryButton} onClick={() => setFullRoomOpen(false)}>Close ×</button>
            </div>
            <div className={styles.roomGrid}>
              {roomContent[room].map((item) => <article key={item.title} className={styles.card}><p className={styles.eyebrow}>{item.eyebrow}</p><h3>{item.title}</h3><p>{item.body}</p><button className={styles.primaryButton} style={{ marginTop: '1rem' }}>{room === 'film' ? 'Break It Down' : 'Enter Activity'}</button></article>)}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
