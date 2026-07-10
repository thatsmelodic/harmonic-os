'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { challengeStatusOrder, friedEmChallenges, type FriedEmChallenge, type FriedEmChallengeStatus } from '@/data/fried-em-challenges';

const statusLabels: Record<FriedEmChallengeStatus, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  scheduled: 'Scheduled',
  live: 'Live',
  completed: 'Completed',
  archived: 'Archived',
};

export function FriedEmChallengeArena() {
  const [filter, setFilter] = useState<FriedEmChallengeStatus | 'all'>('all');
  const [votes, setVotes] = useState<Record<string, number>>(() => Object.fromEntries(friedEmChallenges.map((challenge) => [challenge.id, challenge.votes])));
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ challenger: '', opponent: '', matchup: '1v1', court: 'Center Court', date: '', time: '', stakes: '' });

  const visible = useMemo(() => filter === 'all' ? friedEmChallenges : friedEmChallenges.filter((challenge) => challenge.status === filter), [filter]);

  const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const submitChallenge = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="fried-em-world min-h-screen px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/fried-em#challenges" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Fried Em Park</Link>
          <Link href="/worlds/fried-em/players" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Player Passports</Link>
        </nav>

        <header className="rounded-[2.8rem] border border-orange-300/15 bg-black/50 p-7 shadow-[0_0_80px_rgba(255,122,26,.16)] backdrop-blur-2xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.34em] text-orange-200/45">Challenge Engine</p>
          <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">Challenge Arena</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/55">Call somebody out, track the status, let the community vote, and carry the result into records, player profiles, episodes, and the Cooked Board.</p>
        </header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[.78fr_1.22fr]">
          <form onSubmit={submitChallenge} className="rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[.25em] text-orange-200/45">Create Callout</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.05em]">Who wants smoke?</h2>
            <Field label="Your name or handle" value={form.challenger} onChange={(value) => updateField('challenger', value)} placeholder="@yourhandle" required />
            <Field label="Opponent" value={form.opponent} onChange={(value) => updateField('opponent', value)} placeholder="Player or open challenge" required />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <SelectField label="Matchup" value={form.matchup} onChange={(value) => updateField('matchup', value)} options={['1v1', '2v2', '3v3', 'Best of 3', 'King of the Court']} />
              <SelectField label="Court" value={form.court} onChange={(value) => updateField('court', value)} options={['Center Court', 'West Court', 'The Park', 'Open Gym']} />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Date" type="date" value={form.date} onChange={(value) => updateField('date', value)} />
              <Field label="Time" type="time" value={form.time} onChange={(value) => updateField('time', value)} />
            </div>
            <Field label="Stakes" value={form.stakes} onChange={(value) => updateField('stakes', value)} placeholder="What is on the line?" />
            <button className="mt-6 w-full rounded-full bg-orange-400 px-6 py-3 text-sm font-black text-black shadow-[0_0_28px_rgba(255,122,26,.45)]">{submitted ? 'Challenge Submitted ✓' : 'Send Challenge'}</button>
            {submitted && <p className="mt-4 text-sm leading-6 text-orange-100/70">The working UI is complete. Supabase persistence and authentication are the next wiring step.</p>}
          </form>

          <div>
            <div className="flex flex-wrap gap-2">
              <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
              {challengeStatusOrder.map((status) => <FilterButton key={status} active={filter === status} onClick={() => setFilter(status)}>{statusLabels[status]}</FilterButton>)}
            </div>

            <div className="mt-4 grid gap-4">
              {visible.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} votes={votes[challenge.id] ?? 0} onVote={() => setVotes((current) => ({ ...current, [challenge.id]: (current[challenge.id] ?? 0) + 1 }))} />)}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ChallengeCard({ challenge, votes, onVote }: { challenge: FriedEmChallenge; votes: number; onVote: () => void }) {
  return <article className="rounded-[2rem] border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.2em] text-orange-200/45">{challenge.matchup} · {challenge.court}</p><h3 className="mt-3 text-3xl font-black tracking-[-.05em]">{challenge.challenger} vs. {challenge.opponent}</h3></div><span className="rounded-full border border-orange-300/20 bg-orange-400/10 px-3 py-2 text-xs font-black text-orange-100">{statusLabels[challenge.status]}</span></div>
    <p className="mt-4 text-sm leading-7 text-white/52">{challenge.stakes}</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-4"><Mini label="Date" value={challenge.date} /><Mini label="Time" value={challenge.time} /><Mini label="Heat" value={String(challenge.heat)} /><Mini label="Votes" value={String(votes)} /></div>
    <div className="mt-5 flex flex-wrap gap-3"><button onClick={onVote} className="rounded-full bg-orange-400 px-4 py-2 text-sm font-black text-black">🔥 Vote Matchup</button>{challenge.episodeSlug && <Link href={`/worlds/fried-em/episodes/${challenge.episodeSlug}`} className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm font-black text-white/70">Watch Result</Link>}{challenge.winner && <span className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm font-black text-white/70">Winner: {challenge.winner} · {challenge.score}</span>}</div>
  </article>;
}

function Field({ label, value, onChange, placeholder, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string; required?: boolean }) {
  return <label className="mt-4 block text-xs font-black uppercase tracking-[.18em] text-white/35">{label}<input type={type} value={value} required={required} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-white outline-none focus:border-orange-300/40" /></label>;
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="block text-xs font-black uppercase tracking-[.18em] text-white/35">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#130805] px-4 py-3 text-white outline-none">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} className={`rounded-full px-4 py-2 text-xs font-black ${active ? 'bg-orange-400 text-black' : 'border border-white/10 bg-white/[.04] text-white/55'}`}>{children}</button>;
}

function Mini({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[.035] p-3"><p className="text-[.62rem] font-black uppercase tracking-[.14em] text-white/30">{label}</p><p className="mt-2 text-sm font-black">{value}</p></div>;
}
