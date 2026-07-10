'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { challengeStatusOrder, friedEmChallenges, type FriedEmChallengeStatus } from '@/data/fried-em-challenges';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import {
  createFriedEmChallenge,
  listFriedEmChallenges,
  subscribeToFriedEmChallenges,
  voteForFriedEmChallenge,
  type FriedEmChallengeRow,
} from '@/lib/supabase/fried-em-client';

const statusLabels: Record<FriedEmChallengeStatus, string> = {
  pending: 'Pending', accepted: 'Accepted', scheduled: 'Scheduled', live: 'Live', completed: 'Completed', archived: 'Archived',
};

type ArenaChallenge = {
  id: string;
  challenger: string;
  opponent: string;
  matchup: string;
  court: string;
  date: string;
  time: string;
  stakes: string;
  status: FriedEmChallengeStatus;
  heat: number;
  votes: number;
  winner?: string;
  score?: string;
  episodeSlug?: string;
  live: boolean;
};

function rowToChallenge(row: FriedEmChallengeRow): ArenaChallenge {
  return {
    id: row.id,
    challenger: row.challenger_name,
    opponent: row.opponent_name,
    matchup: row.matchup,
    court: row.court,
    date: row.date_label || (row.scheduled_for ? new Date(row.scheduled_for).toLocaleDateString() : 'TBD'),
    time: row.time_label || (row.scheduled_for ? new Date(row.scheduled_for).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : 'TBD'),
    stakes: row.stakes,
    status: row.status,
    heat: row.heat,
    votes: row.vote_count ?? 0,
    winner: row.winner_name || undefined,
    score: row.score || undefined,
    live: true,
  };
}

const fallbackChallenges: ArenaChallenge[] = friedEmChallenges.map((challenge) => ({ ...challenge, live: false }));

export function FriedEmChallengeArena() {
  const [filter, setFilter] = useState<FriedEmChallengeStatus | 'all'>('all');
  const [challenges, setChallenges] = useState<ArenaChallenge[]>(fallbackChallenges);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ challenger: '', opponent: '', matchup: '1v1', court: 'Center Court', date: '', time: '', stakes: '' });

  const loadChallenges = async () => {
    if (!isSupabaseConfigured) return;
    try {
      const rows = await listFriedEmChallenges();
      if (rows.length) setChallenges(rows.map(rowToChallenge));
      setMessage(rows.length ? 'Live Supabase data connected.' : 'Database connected. No live challenges yet.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not load live challenges.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadChallenges();
    return subscribeToFriedEmChallenges(() => void loadChallenges());
  }, []);

  const visible = useMemo(() => filter === 'all' ? challenges : challenges.filter((challenge) => challenge.status === filter), [filter, challenges]);
  const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const submitChallenge = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const created = await createFriedEmChallenge({
        challengerName: form.challenger,
        opponentName: form.opponent,
        matchup: form.matchup,
        court: form.court,
        date: form.date,
        time: form.time,
        stakes: form.stakes,
      });
      setChallenges((current) => [rowToChallenge({ ...created, vote_count: 0 }), ...current.filter((item) => item.id !== created.id)]);
      setForm({ challenger: '', opponent: '', matchup: '1v1', court: 'Center Court', date: '', time: '', stakes: '' });
      setMessage('Challenge saved to Supabase.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Challenge could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  const vote = async (challenge: ArenaChallenge) => {
    if (!challenge.live) {
      setMessage('Seeded preview challenge. Live voting begins after the migration is run.');
      return;
    }
    try {
      await voteForFriedEmChallenge(challenge.id);
      setChallenges((current) => current.map((item) => item.id === challenge.id ? { ...item, votes: item.votes + 1 } : item));
      setMessage('Vote saved.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Vote could not be saved.');
    }
  };

  return (
    <main className="fried-em-world min-h-screen px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/fried-em#challenges" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Fried Em Park</Link>
          <Link href="/worlds/fried-em/players" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Player Passports</Link>
        </nav>

        <header className="rounded-[2.8rem] border border-orange-300/15 bg-black/50 p-7 shadow-[0_0_80px_rgba(255,122,26,.16)] backdrop-blur-2xl sm:p-10">
          <div className="flex flex-wrap items-center gap-3"><p className="text-xs font-black uppercase tracking-[.34em] text-orange-200/45">Challenge Engine</p><span className={`rounded-full px-3 py-1 text-[.65rem] font-black ${isSupabaseConfigured ? 'bg-emerald-400/15 text-emerald-200' : 'bg-white/10 text-white/45'}`}>{isSupabaseConfigured ? 'SUPABASE READY' : 'PREVIEW DATA'}</span></div>
          <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">Challenge Arena</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/55">Call somebody out, vote on matchups, and watch updates arrive in real time.</p>
        </header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[.78fr_1.22fr]">
          <form onSubmit={submitChallenge} className="rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[.25em] text-orange-200/45">Create Callout</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.05em]">Who wants smoke?</h2>
            <Field label="Your name or handle" value={form.challenger} onChange={(value) => updateField('challenger', value)} placeholder="@yourhandle" required />
            <Field label="Opponent" value={form.opponent} onChange={(value) => updateField('opponent', value)} placeholder="Player or open challenge" required />
            <div className="mt-4 grid gap-4 sm:grid-cols-2"><SelectField label="Matchup" value={form.matchup} onChange={(value) => updateField('matchup', value)} options={['1v1', '2v2', '3v3', 'Best of 3', 'King of the Court']} /><SelectField label="Court" value={form.court} onChange={(value) => updateField('court', value)} options={['Center Court', 'West Court', 'The Park', 'Open Gym']} /></div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2"><Field label="Date" type="date" value={form.date} onChange={(value) => updateField('date', value)} /><Field label="Time" type="time" value={form.time} onChange={(value) => updateField('time', value)} /></div>
            <Field label="Stakes" value={form.stakes} onChange={(value) => updateField('stakes', value)} placeholder="What is on the line?" />
            <button disabled={saving} className="mt-6 w-full rounded-full bg-orange-400 px-6 py-3 text-sm font-black text-black shadow-[0_0_28px_rgba(255,122,26,.45)] disabled:opacity-50">{saving ? 'Saving…' : 'Send Challenge'}</button>
            {message && <p className="mt-4 text-sm leading-6 text-orange-100/70">{message}</p>}
          </form>

          <div>
            <div className="flex flex-wrap gap-2"><FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>{challengeStatusOrder.map((status) => <FilterButton key={status} active={filter === status} onClick={() => setFilter(status)}>{statusLabels[status]}</FilterButton>)}</div>
            <div className="mt-4 grid gap-4">{loading ? <p className="rounded-[2rem] border border-white/10 bg-black/40 p-6 text-white/50">Loading live challenges…</p> : visible.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} onVote={() => void vote(challenge)} />)}</div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ChallengeCard({ challenge, onVote }: { challenge: ArenaChallenge; onVote: () => void }) {
  return <article className="rounded-[2rem] border border-white/10 bg-black/40 p-5 backdrop-blur-xl"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.2em] text-orange-200/45">{challenge.matchup} · {challenge.court}</p><h3 className="mt-3 text-3xl font-black tracking-[-.05em]">{challenge.challenger} vs. {challenge.opponent}</h3></div><span className="rounded-full border border-orange-300/20 bg-orange-400/10 px-3 py-2 text-xs font-black text-orange-100">{statusLabels[challenge.status]}</span></div><p className="mt-4 text-sm leading-7 text-white/52">{challenge.stakes}</p><div className="mt-5 grid gap-3 sm:grid-cols-4"><Mini label="Date" value={challenge.date} /><Mini label="Time" value={challenge.time} /><Mini label="Heat" value={String(challenge.heat)} /><Mini label="Votes" value={String(challenge.votes)} /></div><div className="mt-5 flex flex-wrap gap-3"><button onClick={onVote} className="rounded-full bg-orange-400 px-4 py-2 text-sm font-black text-black">🔥 Vote Matchup</button>{challenge.episodeSlug && <Link href={`/worlds/fried-em/episodes/${challenge.episodeSlug}`} className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm font-black text-white/70">Watch Result</Link>}{challenge.winner && <span className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm font-black text-white/70">Winner: {challenge.winner} · {challenge.score}</span>}</div></article>;
}

function Field({ label, value, onChange, placeholder, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string; required?: boolean }) { return <label className="mt-4 block text-xs font-black uppercase tracking-[.18em] text-white/35">{label}<input type={type} value={value} required={required} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-white outline-none focus:border-orange-300/40" /></label>; }
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) { return <label className="block text-xs font-black uppercase tracking-[.18em] text-white/35">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#130805] px-4 py-3 text-white outline-none">{options.map((option) => <option key={option}>{option}</option>)}</select></label>; }
function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) { return <button onClick={onClick} className={`rounded-full px-4 py-2 text-xs font-black ${active ? 'bg-orange-400 text-black' : 'border border-white/10 bg-white/[.04] text-white/55'}`}>{children}</button>; }
function Mini({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[.035] p-3"><p className="text-[.62rem] font-black uppercase tracking-[.14em] text-white/30">{label}</p><p className="mt-2 text-sm font-black">{value}</p></div>; }
