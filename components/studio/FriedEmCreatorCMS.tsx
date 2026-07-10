'use client';

import { useEffect, useState } from 'react';
import {
  createCreatorEpisode,
  createCreatorPlayer,
  listCreatorChallenges,
  updateCreatorChallenge,
} from '@/lib/supabase/fried-em-creator-client';

type Panel = 'episode' | 'player' | 'challenge';

type ChallengeRow = {
  id: string;
  challenger_name: string;
  opponent_name: string;
  matchup: string;
  court: string;
  status: 'pending' | 'accepted' | 'scheduled' | 'live' | 'completed' | 'archived';
  scheduled_for: string | null;
  winner_name: string | null;
  score: string | null;
  created_at: string;
};

const initialEpisode = {
  title: '', slug: '', episodeNumber: 1, subtitle: '', description: '', youtubeId: '', court: 'Center Court', opponent: '', result: 'W' as const, score: '', heat: 75, status: 'draft' as const,
};

const initialPlayer = {
  name: '', slug: '', handle: '', badge: 'Rookie', bio: '', wins: 0, losses: 0, respect: 50, heat: 50, cookedMeter: 50, clutch: 50, gameIq: 50, signatureMove: '',
};

export function FriedEmCreatorCMS() {
  const [panel, setPanel] = useState<Panel>('episode');
  const [episode, setEpisode] = useState(initialEpisode);
  const [player, setPlayer] = useState(initialPlayer);
  const [challenges, setChallenges] = useState<ChallengeRow[]>([]);
  const [loadingChallenges, setLoadingChallenges] = useState(false);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const loadChallenges = async () => {
    setLoadingChallenges(true);
    setMessage('');
    try {
      const data = await listCreatorChallenges();
      setChallenges(data as ChallengeRow[]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not load creator challenges.');
    } finally {
      setLoadingChallenges(false);
    }
  };

  useEffect(() => {
    if (panel === 'challenge') void loadChallenges();
  }, [panel]);

  const saveEpisode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await createCreatorEpisode(episode);
      setEpisode(initialEpisode);
      setMessage('Episode saved to Fried Em.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Episode could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  const savePlayer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await createCreatorPlayer(player);
      setPlayer(initialPlayer);
      setMessage('Player Passport created.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Player could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  const saveChallenge = async (challenge: ChallengeRow) => {
    setSaving(true);
    setMessage('');
    try {
      await updateCreatorChallenge({ id: challenge.id, status: challenge.status, winnerName: challenge.winner_name || '', score: challenge.score || '' });
      setMessage('Challenge updated.');
      await loadChallenges();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Challenge could not be updated.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-[2.8rem] border border-orange-300/15 bg-black/55 p-6 text-white shadow-[0_0_80px_rgba(255,122,26,.16)] backdrop-blur-2xl sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[.34em] text-orange-200/45">Fried Em Creator CMS</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-.07em] sm:text-7xl">Run the whole park.</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/55">Publish episodes, create Player Passports, and control challenge outcomes from one dashboard.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Tab active={panel === 'episode'} onClick={() => setPanel('episode')}>Episodes</Tab>
          <Tab active={panel === 'player'} onClick={() => setPanel('player')}>Players</Tab>
          <Tab active={panel === 'challenge'} onClick={() => setPanel('challenge')}>Challenges</Tab>
        </div>
      </div>

      {message && <p className="mt-6 rounded-2xl border border-orange-300/15 bg-orange-400/10 px-4 py-3 text-sm text-orange-100/80">{message}</p>}

      {panel === 'episode' && (
        <form onSubmit={saveEpisode} className="mt-8 grid gap-4 lg:grid-cols-2">
          <Field label="Title" value={episode.title} onChange={(value) => setEpisode({ ...episode, title: value })} required />
          <Field label="Slug" value={episode.slug} onChange={(value) => setEpisode({ ...episode, slug: value })} placeholder="they-wanted-smoke" required />
          <NumberField label="Episode number" value={episode.episodeNumber} onChange={(value) => setEpisode({ ...episode, episodeNumber: value })} min={1} />
          <Field label="YouTube ID" value={episode.youtubeId} onChange={(value) => setEpisode({ ...episode, youtubeId: value })} placeholder="dQw4w9WgXcQ" />
          <Field label="Subtitle" value={episode.subtitle} onChange={(value) => setEpisode({ ...episode, subtitle: value })} />
          <Field label="Opponent" value={episode.opponent} onChange={(value) => setEpisode({ ...episode, opponent: value })} />
          <Field label="Court" value={episode.court} onChange={(value) => setEpisode({ ...episode, court: value })} />
          <Field label="Score" value={episode.score} onChange={(value) => setEpisode({ ...episode, score: value })} placeholder="21-11" />
          <Select label="Result" value={episode.result} onChange={(value) => setEpisode({ ...episode, result: value as 'W' | 'L' | 'D' })} options={['W', 'L', 'D']} />
          <Select label="Status" value={episode.status} onChange={(value) => setEpisode({ ...episode, status: value as 'draft' | 'published' | 'archived' })} options={['draft', 'published', 'archived']} />
          <NumberField label="Heat" value={episode.heat} onChange={(value) => setEpisode({ ...episode, heat: value })} min={0} max={100} />
          <TextArea label="Description" value={episode.description} onChange={(value) => setEpisode({ ...episode, description: value })} />
          <button disabled={saving} className="lg:col-span-2 rounded-full bg-orange-400 px-6 py-4 text-sm font-black text-black shadow-[0_0_28px_rgba(255,122,26,.45)] disabled:opacity-50">{saving ? 'Saving…' : 'Save Episode'}</button>
        </form>
      )}

      {panel === 'player' && (
        <form onSubmit={savePlayer} className="mt-8 grid gap-4 lg:grid-cols-2">
          <Field label="Name" value={player.name} onChange={(value) => setPlayer({ ...player, name: value })} required />
          <Field label="Slug" value={player.slug} onChange={(value) => setPlayer({ ...player, slug: value })} required />
          <Field label="Handle" value={player.handle} onChange={(value) => setPlayer({ ...player, handle: value })} placeholder="@player" required />
          <Field label="Badge" value={player.badge} onChange={(value) => setPlayer({ ...player, badge: value })} />
          <NumberField label="Wins" value={player.wins} onChange={(value) => setPlayer({ ...player, wins: value })} min={0} />
          <NumberField label="Losses" value={player.losses} onChange={(value) => setPlayer({ ...player, losses: value })} min={0} />
          <NumberField label="Respect" value={player.respect} onChange={(value) => setPlayer({ ...player, respect: value })} min={0} max={100} />
          <NumberField label="Heat" value={player.heat} onChange={(value) => setPlayer({ ...player, heat: value })} min={0} max={100} />
          <NumberField label="Cooked Meter" value={player.cookedMeter} onChange={(value) => setPlayer({ ...player, cookedMeter: value })} min={0} max={100} />
          <NumberField label="Clutch" value={player.clutch} onChange={(value) => setPlayer({ ...player, clutch: value })} min={0} max={100} />
          <NumberField label="Game IQ" value={player.gameIq} onChange={(value) => setPlayer({ ...player, gameIq: value })} min={0} max={100} />
          <Field label="Signature move" value={player.signatureMove} onChange={(value) => setPlayer({ ...player, signatureMove: value })} />
          <TextArea label="Bio" value={player.bio} onChange={(value) => setPlayer({ ...player, bio: value })} />
          <button disabled={saving} className="lg:col-span-2 rounded-full bg-orange-400 px-6 py-4 text-sm font-black text-black shadow-[0_0_28px_rgba(255,122,26,.45)] disabled:opacity-50">{saving ? 'Saving…' : 'Create Player Passport'}</button>
        </form>
      )}

      {panel === 'challenge' && (
        <div className="mt-8 grid gap-4">
          {loadingChallenges ? <p className="text-white/50">Loading challenges…</p> : challenges.length ? challenges.map((challenge) => (
            <article key={challenge.id} className="rounded-[1.8rem] border border-white/10 bg-white/[.035] p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><p className="text-xs font-black uppercase tracking-[.18em] text-orange-200/45">{challenge.matchup} · {challenge.court}</p><h3 className="mt-2 text-2xl font-black">{challenge.challenger_name} vs. {challenge.opponent_name}</h3></div>
                <Select label="Status" value={challenge.status} onChange={(value) => setChallenges((current) => current.map((item) => item.id === challenge.id ? { ...item, status: value as ChallengeRow['status'] } : item))} options={['pending', 'accepted', 'scheduled', 'live', 'completed', 'archived']} compact />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Winner" value={challenge.winner_name || ''} onChange={(value) => setChallenges((current) => current.map((item) => item.id === challenge.id ? { ...item, winner_name: value } : item))} />
                <Field label="Score" value={challenge.score || ''} onChange={(value) => setChallenges((current) => current.map((item) => item.id === challenge.id ? { ...item, score: value } : item))} />
              </div>
              <button disabled={saving} onClick={() => void saveChallenge(challenge)} className="mt-4 rounded-full bg-orange-400 px-5 py-3 text-sm font-black text-black disabled:opacity-50">Save Challenge</button>
            </article>
          )) : <p className="text-white/50">No live challenges found.</p>}
        </div>
      )}
    </section>
  );
}

function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) { return <button onClick={onClick} className={`rounded-full px-4 py-2 text-xs font-black ${active ? 'bg-orange-400 text-black' : 'border border-white/10 bg-white/[.04] text-white/55'}`}>{children}</button>; }
function Field({ label, value, onChange, placeholder, required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean }) { return <label className="block text-xs font-black uppercase tracking-[.16em] text-white/35">{label}<input value={value} required={required} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-white outline-none focus:border-orange-300/40" /></label>; }
function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="block text-xs font-black uppercase tracking-[.16em] text-white/35 lg:col-span-2">{label}<textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-white outline-none focus:border-orange-300/40" /></label>; }
function NumberField({ label, value, onChange, min, max }: { label: string; value: number; onChange: (value: number) => void; min?: number; max?: number }) { return <label className="block text-xs font-black uppercase tracking-[.16em] text-white/35">{label}<input type="number" value={value} min={min} max={max} onChange={(event) => onChange(Number(event.target.value))} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-white outline-none focus:border-orange-300/40" /></label>; }
function Select({ label, value, onChange, options, compact = false }: { label: string; value: string; onChange: (value: string) => void; options: string[]; compact?: boolean }) { return <label className={`block text-xs font-black uppercase tracking-[.16em] text-white/35 ${compact ? 'min-w-40' : ''}`}>{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#130805] px-4 py-3 text-white outline-none">{options.map((option) => <option key={option}>{option}</option>)}</select></label>; }
