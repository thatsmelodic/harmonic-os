'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const milestones = [
  { threshold: 100, title: 'Park Badge', description: 'Your first official Fried Em supporter badge.', type: 'Badge' },
  { threshold: 500, title: 'Early Episode Access', description: 'Watch selected Fried Em episodes before public release.', type: 'Access' },
  { threshold: 1000, title: 'Challenge Priority', description: 'Move higher in the official challenge review queue.', type: 'Access' },
  { threshold: 3000, title: '15% Merch Discount', description: 'Use your community loyalty toward eligible Fried Em merchandise.', type: 'Discount' },
  { threshold: 5000, title: 'Play on Fried Em', description: 'Become eligible for a creator-approved appearance on the court.', type: 'Experience' },
];

const actions = [
  { label: 'Watch an episode', amount: 15, icon: '🎥' },
  { label: 'Vote on a matchup', amount: 10, icon: '🗳️' },
  { label: 'Finish a season', amount: 100, icon: '🏆' },
  { label: 'Attend a live run', amount: 150, icon: '📍' },
  { label: 'Win an official challenge', amount: 400, icon: '⚔️' },
];

const titles = ['Rookie', 'Hooper', 'Starter', 'Bucket', 'Cooker', 'Dawg', 'Problem', 'Legend', 'GOAT'];

export default function FriedEmHeatPage() {
  const [heat, setHeat] = useState(840);
  const [activity, setActivity] = useState<string[]>(['Watched Episode 03 · +15 Heat', 'Voted on Jay Buckets vs. Tone · +10 Heat']);

  const level = Math.min(titles.length - 1, Math.floor(Math.sqrt(heat / 100)));
  const currentTitle = titles[level];
  const nextMilestone = milestones.find((item) => item.threshold > heat) ?? milestones[milestones.length - 1];
  const previousThreshold = [...milestones].reverse().find((item) => item.threshold <= heat)?.threshold ?? 0;
  const progress = useMemo(() => {
    if (heat >= milestones[milestones.length - 1].threshold) return 100;
    return Math.max(0, Math.min(100, ((heat - previousThreshold) / (nextMilestone.threshold - previousThreshold)) * 100));
  }, [heat, nextMilestone.threshold, previousThreshold]);

  const earn = (label: string, amount: number) => {
    setHeat((value) => value + amount);
    setActivity((current) => [`${label} · +${amount} Heat`, ...current].slice(0, 6));
  };

  return (
    <main className="fried-em-world min-h-screen px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/fried-em" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Back to Park</Link>
          <div className="flex flex-wrap gap-2"><Link href="/worlds/fried-em/episodes" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Episode Wall</Link><Link href="/worlds/fried-em/challenges" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Challenge Arena</Link></div>
        </nav>

        <header className="rounded-[2.8rem] border border-orange-300/15 bg-[radial-gradient(circle_at_top_right,rgba(255,122,26,.24),transparent_30rem),rgba(0,0,0,.58)] p-7 shadow-[0_0_90px_rgba(255,122,26,.18)] backdrop-blur-2xl sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div><p className="text-xs font-black uppercase tracking-[.34em] text-orange-200/45">My Fried Em Progress</p><h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">{heat.toLocaleString()} Heat</h1><p className="mt-4 text-xl font-black text-orange-200">{currentTitle}</p></div>
            <div className="rounded-[1.8rem] border border-white/10 bg-black/35 p-5 text-right"><p className="text-xs font-black uppercase tracking-[.18em] text-white/30">Next reward</p><p className="mt-2 text-2xl font-black">{nextMilestone.title}</p><p className="mt-2 text-sm text-white/40">{Math.max(0, nextMilestone.threshold - heat)} Heat away</p></div>
          </div>
          <div className="mt-7 h-4 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[linear-gradient(90deg,#ff5a1f,#ffb347)] transition-all duration-500" style={{ width: `${progress}%` }} /></div>
          <p className="mt-3 text-sm text-white/35">Your Heat stays private to your account. Badges and redeemed rewards can be displayed publicly when you choose.</p>
        </header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <article className="rounded-[2rem] border border-white/10 bg-black/45 p-6">
            <p className="text-xs font-black uppercase tracking-[.22em] text-orange-200/45">Earn Heat</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-.06em]">Participation matters.</h2>
            <p className="mt-3 text-sm leading-7 text-white/48">Watching, voting, attending, and competing all contribute. Spending is only one path—not the only path.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">{actions.map((action) => <button key={action.label} onClick={() => earn(action.label, action.amount)} className="rounded-[1.5rem] border border-white/10 bg-white/[.035] p-4 text-left transition hover:-translate-y-1 hover:border-orange-300/30"><span className="text-2xl">{action.icon}</span><p className="mt-3 font-black">{action.label}</p><p className="mt-1 text-sm text-orange-200">+{action.amount} Heat</p></button>)}</div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/45 p-6">
            <p className="text-xs font-black uppercase tracking-[.22em] text-orange-200/45">Recent Activity</p>
            <div className="mt-5 grid gap-3">{activity.map((item, index) => <div key={`${item}-${index}`} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-sm font-black">{item}</p><p className="mt-1 text-xs text-white/30">Recorded in your Fried Em ledger</p></div>)}</div>
          </article>
        </section>

        <section className="mt-6">
          <div><p className="text-xs font-black uppercase tracking-[.22em] text-orange-200/45">Reward Ladder</p><h2 className="mt-3 text-4xl font-black tracking-[-.06em]">Your support unlocks access.</h2></div>
          <div className="mt-5 grid gap-4 lg:grid-cols-5">{milestones.map((reward) => {
            const unlocked = heat >= reward.threshold;
            return <article key={reward.threshold} className={`rounded-[1.8rem] border p-5 ${unlocked ? 'border-orange-300/35 bg-orange-400/10' : 'border-white/10 bg-black/45'}`}><div className="flex items-center justify-between"><span className="text-xs font-black uppercase tracking-[.16em] text-orange-200/55">{reward.threshold} Heat</span><span className="text-xs text-white/35">{reward.type}</span></div><h3 className="mt-4 text-2xl font-black tracking-[-.04em]">{reward.title}</h3><p className="mt-3 text-sm leading-6 text-white/45">{reward.description}</p><p className={`mt-5 text-sm font-black ${unlocked ? 'text-orange-200' : 'text-white/30'}`}>{unlocked ? 'Unlocked ✓' : 'Locked'}</p></article>;
          })}</div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-black/45 p-6"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-black uppercase tracking-[.22em] text-orange-200/45">Community Principle</p><h2 className="mt-3 text-4xl font-black tracking-[-.06em]">Earn respect without buying it.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-white/48">Members can progress through meaningful participation even if they never purchase anything. Fried Em rewards the people who consistently show up for the community.</p></div><Link href="/worlds/fried-em/challenges" className="rounded-full bg-orange-400 px-5 py-3 text-sm font-black text-black">Enter Challenge Arena</Link></div></section>
      </div>
    </main>
  );
}
