'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { bootRuntime } from '@/lib/harmonic-signal-bus';
import { worldDefaults } from '@/lib/harmonic-engine';
import { SeasonalWorldLayer } from '@/components/seasons/SeasonalWorldLayer';
import { RuntimeVisualDriver } from '@/components/runtime/RuntimeVisualDriver';
import { LivingWorldOverlay } from '@/components/runtime/LivingWorldOverlay';

const runtime = bootRuntime(worldDefaults['fried-em']);

type Room = 'park' | 'episodes' | 'leaderboard' | 'challenges' | 'film-room';

type Episode = {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  heat: number;
  views: string;
};

const rooms: Array<{ id: Room; label: string; icon: string }> = [
  { id: 'park', label: 'The Park', icon: '🏀' },
  { id: 'episodes', label: 'Episode Wall', icon: '🎥' },
  { id: 'leaderboard', label: 'Cooked Board', icon: '🔥' },
  { id: 'challenges', label: 'Challenge Arena', icon: '⚔️' },
  { id: 'film-room', label: 'Film Room', icon: '🎞️' },
];

const episodes: Episode[] = [
  { id: 1, title: 'They Wanted Smoke', subtitle: 'Best friends called me out. I answered.', duration: '12:48', heat: 97, views: '4.8K' },
  { id: 2, title: 'No Excuses at the Park', subtitle: 'First to 21. Loser hears about it all week.', duration: '10:16', heat: 91, views: '3.2K' },
  { id: 3, title: 'The Rematch', subtitle: 'Same court. New energy. More pressure.', duration: '14:03', heat: 94, views: '5.1K' },
];

const players = [
  { rank: 1, name: 'Melodic', record: '8-1', cooked: 96, badge: 'Head Chef' },
  { rank: 2, name: 'Jay Buckets', record: '6-2', cooked: 88, badge: 'Microwave' },
  { rank: 3, name: 'Tone', record: '5-3', cooked: 82, badge: 'Hot Hand' },
  { rank: 4, name: 'Dre', record: '4-4', cooked: 74, badge: 'Pressure Proof' },
];

const breakdowns = [
  { title: 'How the game opened up', body: 'Early drives forced the defense to collapse, creating cleaner kick-outs and second-side attacks.' },
  { title: 'The momentum swing', body: 'Three straight stops changed the pace. The crowd woke up and every possession started feeling heavier.' },
  { title: 'The finishing sequence', body: 'A hesitation into a hard downhill step created the separation that ended the run.' },
];

export function FriedEmWorldExperience() {
  const [room, setRoom] = useState<Room>('park');
  const [likes, setLikes] = useState<Record<number, number>>({ 1: 341, 2: 228, 3: 419 });
  const [challengeSent, setChallengeSent] = useState(false);
  const [challenger, setChallenger] = useState('');
  const [matchup, setMatchup] = useState('1v1');
  const state = runtime.state;

  const activeRoom = useMemo(() => rooms.find((item) => item.id === room)!, [room]);

  return (
    <main className="fried-em-world relative isolate min-h-screen overflow-hidden pb-28 text-white">
      <SeasonalWorldLayer world="fried-em" />
      <RuntimeVisualDriver world="fried-em" />
      <LivingWorldOverlay world="fried-em" />
      <div className="fried-em-aurora absolute inset-0 -z-30" />
      <div className="court-grid absolute inset-0 -z-20 opacity-50" />
      <div className="arena-light arena-light-left" />
      <div className="arena-light arena-light-right" />
      <div className="frequency-scan" />

      <section className="harmonic-container py-8 sm:py-12">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="rounded-full border border-white/15 bg-white/[.05] px-4 py-3 text-sm font-black text-white/70 transition hover:bg-white/15">← Harmonic OS</Link>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-orange-300/20 bg-orange-400/10 px-3 py-2 font-mono text-xs text-orange-200">LIVE</span>
            <p className="font-mono text-xs uppercase tracking-[.28em] text-white/40">30.0 FM / FRIED EM</p>
          </div>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div className="glass-panel fried-panel rounded-[2.5rem] p-6 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[.42em] text-orange-200/55">Fried Em Frequency</p>
            <h1 className="mt-5 text-5xl font-black leading-none tracking-[-.09em] text-orange-50 sm:text-7xl lg:text-8xl">Welcome to Pressure.</h1>
            <p className="mt-6 max-w-2xl text-xl font-black leading-tight tracking-[-.04em] text-white/88 sm:text-3xl">Where hoopers get called out, cooked, ranked, replayed, and remembered.</p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/58">Every room feeds the same universe: episodes build reputations, challenges create matchups, rankings track heat, and the Film Room explains how somebody got fried.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Metric label="Competition" value={state.dna.competition} />
              <Metric label="Motion" value={state.dna.motion} />
              <Metric label="Community" value={state.dna.community} />
            </div>
          </div>

          <aside className="scoreboard rounded-[2.5rem] border border-orange-200/15 bg-black/55 p-6 shadow-[0_0_60px_rgba(255,122,26,.20)] backdrop-blur-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[.34em] text-white/40">Tonight's Run</p><span className="rounded-full border border-orange-200/20 px-3 py-1 font-mono text-xs text-orange-200/60">GAME POINT</span></div>
            <div className="rounded-[2rem] border border-orange-200/10 bg-[radial-gradient(circle,rgba(255,122,26,.22),rgba(0,0,0,.38)_62%)] p-5">
              <div className="grid grid-cols-2 gap-4 text-center">
                <Score label="HOME" value="21" active />
                <Score label="RIVALS" value="11" />
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-4">
                <div className="mb-2 flex justify-between text-xs font-black uppercase tracking-[.2em] text-white/45"><span>Cooked Meter</span><span>96%</span></div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-orange-400 shadow-[0_0_28px_rgba(255,122,26,.85)]" style={{ width: '96%' }} /></div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="harmonic-container py-4">
        <div className="grid gap-3 rounded-[2rem] border border-white/10 bg-black/35 p-3 backdrop-blur-xl sm:grid-cols-5">
          {rooms.map((item) => (
            <button key={item.id} onClick={() => setRoom(item.id)} className={`rounded-[1.35rem] px-4 py-4 text-left transition ${room === item.id ? 'bg-orange-400 text-black shadow-[0_0_28px_rgba(255,122,26,.45)]' : 'bg-white/[.035] text-white/65 hover:bg-white/[.08]'}`}>
              <span className="text-xl">{item.icon}</span>
              <span className="mt-2 block text-sm font-black">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="harmonic-container py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[.34em] text-orange-200/45">Active Room</p><h2 className="mt-3 text-4xl font-black tracking-[-.07em] sm:text-6xl">{activeRoom.icon} {activeRoom.label}</h2></div>
          <p className="max-w-xl text-sm leading-7 text-white/45">The room changes without leaving the world, keeping Fried Em feeling like one connected digital park.</p>
        </div>

        {room === 'park' && <ParkRoom onEnterEpisodes={() => setRoom('episodes')} onEnterChallenges={() => setRoom('challenges')} />}
        {room === 'episodes' && <EpisodeWall likes={likes} onLike={(id) => setLikes((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }))} />}
        {room === 'leaderboard' && <CookedBoard />}
        {room === 'challenges' && <ChallengeArena challenger={challenger} setChallenger={setChallenger} matchup={matchup} setMatchup={setMatchup} sent={challengeSent} onSubmit={() => setChallengeSent(true)} />}
        {room === 'film-room' && <FilmRoom />}
      </section>
    </main>
  );
}

function ParkRoom({ onEnterEpisodes, onEnterChallenges }: { onEnterEpisodes: () => void; onEnterChallenges: () => void }) {
  return <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]"><article className="glass-panel rounded-[2.5rem] p-7 sm:p-10"><p className="text-xs font-black uppercase tracking-[.28em] text-orange-200/45">Main Court</p><h3 className="mt-4 text-4xl font-black tracking-[-.06em] sm:text-6xl">Check ball. Cameras rolling.</h3><p className="mt-5 max-w-2xl text-base leading-8 text-white/58">The Park is the live entrance to every current run, episode, challenge, and rivalry. Nothing here feels static—every matchup should push another part of the universe forward.</p><div className="mt-7 flex flex-wrap gap-3"><button onClick={onEnterEpisodes} className="rounded-full bg-orange-400 px-6 py-3 text-sm font-black text-black shadow-[0_0_28px_rgba(255,122,26,.45)]">Watch Latest Episode</button><button onClick={onEnterChallenges} className="rounded-full border border-white/15 bg-white/[.04] px-6 py-3 text-sm font-black text-white/75">Call Next</button></div></article><div className="grid gap-4"><MiniCard eyebrow="Current Rivalry" title="Melodic vs. The Homies" body="Best of three. No excuses. Every game becomes content." /><MiniCard eyebrow="Next Event" title="Sunday Night Run" body="Open challenge slots, crowd voting, and a live Cooked Meter." /></div></div>;
}

function EpisodeWall({ likes, onLike }: { likes: Record<number, number>; onLike: (id: number) => void }) {
  return <div className="grid gap-5 lg:grid-cols-3">{episodes.map((episode) => <article key={episode.id} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl"><div className="relative grid aspect-video place-items-center bg-[radial-gradient(circle_at_center,rgba(255,122,26,.32),rgba(0,0,0,.8)_65%)]"><span className="text-6xl transition group-hover:scale-110">▶</span><span className="absolute bottom-3 right-3 rounded-lg bg-black/70 px-2 py-1 font-mono text-xs">{episode.duration}</span></div><div className="p-5"><div className="flex items-center justify-between gap-3"><p className="font-mono text-xs text-orange-200/55">EP. 0{episode.id}</p><p className="text-xs text-white/35">{episode.views} views</p></div><h3 className="mt-3 text-2xl font-black tracking-[-.04em]">{episode.title}</h3><p className="mt-2 text-sm leading-6 text-white/50">{episode.subtitle}</p><div className="mt-5 flex items-center justify-between"><span className="rounded-full border border-orange-300/20 bg-orange-400/10 px-3 py-2 text-xs font-black text-orange-200">Heat {episode.heat}</span><button onClick={() => onLike(episode.id)} className="rounded-full border border-white/10 px-3 py-2 text-xs font-black text-white/65 hover:bg-white/10">🔥 {likes[episode.id] ?? 0}</button></div></div></article>)}</div>;
}

function CookedBoard() {
  return <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl"><div className="grid grid-cols-[.45fr_1.4fr_.8fr_1fr] gap-3 border-b border-white/10 px-5 py-4 text-xs font-black uppercase tracking-[.18em] text-white/35"><span>Rank</span><span>Player</span><span>Record</span><span>Cooked</span></div>{players.map((player) => <div key={player.rank} className="grid grid-cols-[.45fr_1.4fr_.8fr_1fr] items-center gap-3 border-b border-white/5 px-5 py-5 last:border-0"><span className="text-2xl font-black text-orange-200">#{player.rank}</span><div><p className="text-lg font-black">{player.name}</p><p className="mt-1 text-xs text-white/35">{player.badge}</p></div><span className="font-mono text-sm text-white/60">{player.record}</span><div><div className="mb-2 flex justify-between text-xs text-white/40"><span>Heat</span><span>{player.cooked}%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-orange-400" style={{ width: `${player.cooked}%` }} /></div></div></div>)}</div>;
}

function ChallengeArena({ challenger, setChallenger, matchup, setMatchup, sent, onSubmit }: { challenger: string; setChallenger: (value: string) => void; matchup: string; setMatchup: (value: string) => void; sent: boolean; onSubmit: () => void }) {
  return <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]"><div className="glass-panel rounded-[2rem] p-6"><p className="text-xs font-black uppercase tracking-[.3em] text-orange-200/45">Open Challenge</p><h3 className="mt-4 text-4xl font-black tracking-[-.06em]">Think you can cook?</h3><p className="mt-4 text-sm leading-7 text-white/55">Submit a matchup request. Challenges eventually connect to profiles, RSVP status, voting, and episode scheduling.</p></div><form onSubmit={(event) => { event.preventDefault(); onSubmit(); }} className="rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-xl"><label className="block text-xs font-black uppercase tracking-[.2em] text-white/35">Your name or handle<input value={challenger} onChange={(event) => setChallenger(event.target.value)} required className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-white outline-none focus:border-orange-300/40" placeholder="@yourhandle" /></label><label className="mt-5 block text-xs font-black uppercase tracking-[.2em] text-white/35">Matchup<select value={matchup} onChange={(event) => setMatchup(event.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-[#130805] px-4 py-3 text-white outline-none"><option>1v1</option><option>2v2</option><option>3v3</option><option>King of the Court</option></select></label><button className="mt-6 w-full rounded-full bg-orange-400 px-6 py-3 text-sm font-black text-black shadow-[0_0_28px_rgba(255,122,26,.45)]">{sent ? 'Challenge Submitted ✓' : 'Send Challenge'}</button></form></div>;
}

function FilmRoom() {
  return <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]"><div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,122,26,.2),rgba(0,0,0,.82)_68%)] p-6"><div className="grid aspect-video place-items-center rounded-[1.5rem] border border-white/10 bg-black/35"><div className="text-center"><p className="text-6xl">🎞️</p><p className="mt-4 text-sm font-black text-white/60">Interactive breakdown player</p></div></div></div><div className="grid gap-4">{breakdowns.map((item, index) => <article key={item.title} className="rounded-[1.7rem] border border-white/10 bg-white/[.04] p-5"><p className="font-mono text-xs text-orange-200/45">0{index + 1}</p><h3 className="mt-3 text-xl font-black">{item.title}</h3><p className="mt-2 text-sm leading-6 text-white/50">{item.body}</p></article>)}</div></div>;
}

function Metric({ label, value }: { label: string; value: number }) { return <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.05em]">{value}%</p></div>; }
function Score({ label, value, active = false }: { label: string; value: string; active?: boolean }) { return <div className="rounded-2xl border border-white/10 bg-black/35 p-5"><p className="font-mono text-xs text-white/40">{label}</p><p className={`mt-2 text-6xl font-black tracking-[-.08em] ${active ? 'text-orange-200' : 'text-white/75'}`}>{value}</p></div>; }
function MiniCard({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) { return <article className="rounded-[1.8rem] border border-white/10 bg-white/[.04] p-5 backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[.2em] text-orange-200/40">{eyebrow}</p><h3 className="mt-3 text-2xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-white/48">{body}</p></article>; }
