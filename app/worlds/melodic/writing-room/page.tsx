'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const prompts = [
  'Turn the last thing you survived into a hook.',
  'Write the apology you never received.',
  'Describe love like a room you should have left sooner.',
  'Make ambition sound like hunger with a heartbeat.',
  'Write one line that could only belong to Melodic.',
];

export default function MelodicWritingRoomPage() {
  const [title, setTitle] = useState('Untitled Memory');
  const [lyrics, setLyrics] = useState('');
  const [mood, setMood] = useState('Late Night');
  const [promptIndex, setPromptIndex] = useState(0);
  const wordCount = useMemo(() => lyrics.trim() ? lyrics.trim().split(/\s+/).length : 0, [lyrics]);

  return (
    <main className="melodic-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 text-white sm:px-6">
      <div className="melodic-aurora absolute inset-0 -z-20" />
      <div className="frequency-grid absolute inset-0 -z-10 opacity-35" />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/worlds/melodic" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Melodic Universe</Link><Link href="/worlds/melodic/vault" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">Music Vault</Link></nav>

        <header className="rounded-[2.8rem] border border-purple-200/15 bg-black/50 p-7 shadow-purple-glow backdrop-blur-2xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Writing Room</p>
          <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">Turn feeling into language.</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/58">Draft songs, verses, hooks, concepts, and memories before they become records. This room is built for creation—not just storage.</p>
        </header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <article className="rounded-[2.2rem] border border-white/10 bg-black/45 p-6 backdrop-blur-2xl">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto]"><input value={title} onChange={(event) => setTitle(event.target.value)} className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-2xl font-black text-white outline-none" /><select value={mood} onChange={(event) => setMood(event.target.value)} className="rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm font-black text-white"><option>Late Night</option><option>Confession</option><option>Pressure</option><option>Healing</option><option>Motion</option></select></div>
            <textarea value={lyrics} onChange={(event) => setLyrics(event.target.value)} placeholder="Write the first line..." rows={22} className="mt-5 w-full rounded-[1.8rem] border border-white/10 bg-white/[.035] p-5 text-base leading-8 text-white outline-none placeholder:text-white/20" />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="font-mono text-xs text-white/35">{wordCount} words · {mood}</p><div className="flex gap-2"><button className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/60">Save Draft</button><button className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black">Send to Vault</button></div></div>
          </article>

          <div className="grid gap-5 content-start">
            <article className="rounded-[2.2rem] border border-purple-200/15 bg-purple-300/[.07] p-6 shadow-purple-glow backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[.25em] text-purple-100/45">Creative Spark</p><p className="mt-5 text-3xl font-black leading-tight tracking-[-.05em]">{prompts[promptIndex]}</p><button onClick={() => setPromptIndex((value) => (value + 1) % prompts.length)} className="mt-6 rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">New Prompt</button></article>
            <article className="rounded-[2.2rem] border border-white/10 bg-black/45 p-6 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[.25em] text-white/35">Song Architecture</p><div className="mt-5 grid gap-3">{['Intro — establish the wound','Verse — reveal the memory','Hook — make the feeling repeatable','Bridge — change perspective','Outro — leave the echo'].map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="font-mono text-xs text-purple-100/40">0{index + 1}</p><p className="mt-2 text-sm font-black text-white/65">{item}</p></div>)}</div></article>
          </div>
        </section>
      </div>
    </main>
  );
}
