'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { claimCreatorWorld, getCreatorUniverseSummary, submitUniverseExpansion, type ClaimWorldInput, type ExpansionApplicationInput } from '@/lib/supabase/creator-universe-client';

type Summary = Awaited<ReturnType<typeof getCreatorUniverseSummary>>;

const initialClaim: ClaimWorldInput = {
  name: '', slug: '', category: 'general', icon: '🌌', tagline: '', philosophy: '', constitution: '', progressionName: 'XP', progressionIcon: '⭐',
};

const initialExpansion: ExpansionApplicationInput = {
  requestedWorldName: '', requestedCategory: 'general', requestedIcon: '🌌', needReason: '', differentiation: '', existingWorldFitExplanation: '', communityBenefit: '',
};

export function CreatorUniverseStudio() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [claim, setClaim] = useState(initialClaim);
  const [expansion, setExpansion] = useState(initialExpansion);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setSummary(await getCreatorUniverseSummary()); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Could not load creator universe.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { void load(); }, []);

  const worldCount = summary?.worlds.length ?? 0;
  const worldLimit = summary?.profile.world_limit ?? 0;
  const canClaim = worldCount < worldLimit;
  const remaining = Math.max(0, worldLimit - worldCount);
  const hasPending = useMemo(() => summary?.applications.some((item) => ['pending', 'under_review', 'needs_info'].includes(item.status)) ?? false, [summary]);

  const createWorld = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setMessage('');
    try { await claimCreatorWorld(claim); setClaim(initialClaim); setMessage('Frequency claimed. Your new world is now in draft mode.'); await load(); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'World could not be created.'); }
    finally { setSaving(false); }
  };

  const apply = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setMessage('');
    try { await submitUniverseExpansion(expansion); setExpansion(initialExpansion); setMessage('Expansion application submitted for review.'); await load(); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Application could not be submitted.'); }
    finally { setSaving(false); }
  };

  if (loading) return <section className="rounded-[2.5rem] border border-white/10 bg-black/50 p-8 text-white/55">Loading your universe…</section>;

  return (
    <section className="rounded-[2.8rem] border border-cyan-300/15 bg-black/55 p-6 text-white shadow-[0_0_80px_rgba(54,178,203,.15)] backdrop-blur-2xl sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div><p className="text-xs font-black uppercase tracking-[.34em] text-cyan-200/45">Creator Identity</p><h1 className="mt-4 text-5xl font-black tracking-[-.07em] sm:text-7xl">Build with intention.</h1><p className="mt-4 max-w-3xl text-base leading-8 text-white/55">Every creator can own up to three worlds. A fourth frequency requires your platform approval through Expand Your Universe.</p></div>
        <div className="rounded-[1.6rem] border border-white/10 bg-white/[.04] px-5 py-4 text-right"><p className="text-xs uppercase tracking-[.18em] text-white/35">World capacity</p><p className="mt-2 text-3xl font-black">{worldCount} / {worldLimit}</p><p className="mt-1 text-xs text-cyan-200/60">{remaining} available</p></div>
      </div>

      {message && <p className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100/80">{message}</p>}

      <div className="mt-8 grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/[.035] p-6">
          <p className="text-xs font-black uppercase tracking-[.24em] text-cyan-200/45">Your Worlds</p>
          <div className="mt-5 grid gap-3">{summary?.worlds.length ? summary.worlds.map((world) => <div key={world.id} className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4"><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><span className="text-3xl">{world.icon}</span><div><h3 className="text-lg font-black">{world.name}</h3><p className="text-xs text-white/35">{world.category} · {world.status}</p></div></div><span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45">{world.visibility}</span></div></div>) : <p className="text-sm text-white/45">No creator worlds claimed yet.</p>}</div>
        </article>

        {canClaim ? <form onSubmit={createWorld} className="rounded-[2rem] border border-white/10 bg-white/[.035] p-6">
          <p className="text-xs font-black uppercase tracking-[.24em] text-cyan-200/45">Claim Your Frequency</p><h2 className="mt-3 text-3xl font-black tracking-[-.05em]">Found a world.</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-[.25fr_.75fr]"><Field label="Icon" value={claim.icon} onChange={(icon) => setClaim({ ...claim, icon })} /><Field label="World name" value={claim.name} onChange={(name) => setClaim({ ...claim, name })} required /></div>
          <Field label="Slug" value={claim.slug} onChange={(slug) => setClaim({ ...claim, slug })} placeholder="my-frequency" required />
          <Field label="Category" value={claim.category} onChange={(category) => setClaim({ ...claim, category })} required />
          <Field label="Tagline" value={claim.tagline} onChange={(tagline) => setClaim({ ...claim, tagline })} />
          <TextArea label="Philosophy" value={claim.philosophy} onChange={(philosophy) => setClaim({ ...claim, philosophy })} />
          <TextArea label="Community constitution" value={claim.constitution} onChange={(constitution) => setClaim({ ...claim, constitution })} />
          <div className="grid gap-4 sm:grid-cols-[.25fr_.75fr]"><Field label="Progress icon" value={claim.progressionIcon} onChange={(progressionIcon) => setClaim({ ...claim, progressionIcon })} /><Field label="Progress name" value={claim.progressionName} onChange={(progressionName) => setClaim({ ...claim, progressionName })} /></div>
          <button disabled={saving} className="mt-6 w-full rounded-full bg-cyan-400 px-6 py-4 text-sm font-black text-black disabled:opacity-50">{saving ? 'Creating…' : 'Claim Your Frequency'}</button>
        </form> : <form onSubmit={apply} className="rounded-[2rem] border border-violet-300/15 bg-violet-400/[.05] p-6">
          <p className="text-xs font-black uppercase tracking-[.24em] text-violet-200/45">Expand Your Universe</p><h2 className="mt-3 text-3xl font-black tracking-[-.05em]">Request another frequency.</h2><p className="mt-3 text-sm leading-7 text-white/50">You reached your current limit. Explain why this world deserves its own place in Harmonic OS.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-[.25fr_.75fr]"><Field label="Icon" value={expansion.requestedIcon} onChange={(requestedIcon) => setExpansion({ ...expansion, requestedIcon })} /><Field label="World name" value={expansion.requestedWorldName} onChange={(requestedWorldName) => setExpansion({ ...expansion, requestedWorldName })} required /></div>
          <Field label="Category" value={expansion.requestedCategory} onChange={(requestedCategory) => setExpansion({ ...expansion, requestedCategory })} required />
          <TextArea label="Why do you need another world?" value={expansion.needReason} onChange={(needReason) => setExpansion({ ...expansion, needReason })} required />
          <TextArea label="How is it different from your current worlds?" value={expansion.differentiation} onChange={(differentiation) => setExpansion({ ...expansion, differentiation })} required />
          <TextArea label="Why can’t it fit inside an existing world?" value={expansion.existingWorldFitExplanation} onChange={(existingWorldFitExplanation) => setExpansion({ ...expansion, existingWorldFitExplanation })} required />
          <TextArea label="What will the community gain?" value={expansion.communityBenefit} onChange={(communityBenefit) => setExpansion({ ...expansion, communityBenefit })} required />
          <button disabled={saving || hasPending} className="mt-6 w-full rounded-full bg-violet-400 px-6 py-4 text-sm font-black text-black disabled:opacity-50">{hasPending ? 'Application Under Review' : saving ? 'Submitting…' : 'Expand Your Universe'}</button>
        </form>}
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean }) { return <label className="mt-4 block text-xs font-black uppercase tracking-[.16em] text-white/35">{label}<input value={value} required={required} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-white outline-none" /></label>; }
function TextArea({ label, value, onChange, required = false }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) { return <label className="mt-4 block text-xs font-black uppercase tracking-[.16em] text-white/35">{label}<textarea value={value} required={required} rows={4} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-white outline-none" /></label>; }
