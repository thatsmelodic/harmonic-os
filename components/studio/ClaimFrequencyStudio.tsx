'use client';

import { useEffect, useState, type FormEvent } from 'react';
import {
  claimCreatorWorld,
  getCreatorWorldStatus,
  submitExpansionApplication,
  type CreatorWorldInput,
  type ExpansionApplicationInput,
} from '@/lib/supabase/creator-worlds-client';

const initialWorld: CreatorWorldInput = {
  name: '', slug: '', category: 'Music', icon: '🌌', philosophy: '', description: '', progressionName: 'XP', constitutionTitle: 'Welcome', constitutionBody: '',
};

const initialExpansion: ExpansionApplicationInput = {
  requestedWorldName: '', requestedCategory: 'Music', reasonForExpansion: '', differenceFromExisting: '', whyExistingWorldsAreNotEnough: '', communityBenefit: '',
};

export function ClaimFrequencyStudio() {
  const [status, setStatus] = useState<{ worldCount: number; worldLimit: number; worlds: Array<{ id: string; name: string; category: string; status: string; icon: string }> } | null>(null);
  const [world, setWorld] = useState<CreatorWorldInput>(initialWorld);
  const [expansion, setExpansion] = useState<ExpansionApplicationInput>(initialExpansion);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const data = await getCreatorWorldStatus();
      setStatus({ worldCount: data.worldCount, worldLimit: data.worldLimit, worlds: data.worlds });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not load creator status.');
    }
  };

  useEffect(() => { void load(); }, []);

  const saveWorld = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await claimCreatorWorld(world);
      setWorld(initialWorld);
      setMessage('Frequency claimed. Your world is now in draft mode.');
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not claim frequency.');
    } finally {
      setSaving(false);
    }
  };

  const saveExpansion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await submitExpansionApplication(expansion);
      setExpansion(initialExpansion);
      setMessage('Expansion application submitted for review.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not submit expansion application.');
    } finally {
      setSaving(false);
    }
  };

  const reachedLimit = Boolean(status && status.worldCount >= status.worldLimit);

  return (
    <section className="rounded-[2.8rem] border border-cyan-300/15 bg-black/55 p-6 text-white shadow-[0_0_80px_rgba(54,178,203,.16)] backdrop-blur-2xl sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[.34em] text-cyan-200/45">Creator Identity</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-.07em] sm:text-7xl">Claim Your Frequency.</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/55">Members participate in worlds. Creators found them. Every creator can own up to three worlds before applying to Expand Your Universe.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4 text-right">
          <p className="text-xs uppercase tracking-[.18em] text-white/35">Worlds founded</p>
          <p className="mt-2 text-3xl font-black text-cyan-100">{status ? `${status.worldCount} / ${status.worldLimit}` : '—'}</p>
        </div>
      </div>

      {message && <p className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100/80">{message}</p>}

      {status?.worlds.length ? <div className="mt-8 grid gap-4 lg:grid-cols-3">{status.worlds.map((item) => <article key={item.id} className="rounded-[1.7rem] border border-white/10 bg-white/[.035] p-5"><p className="text-3xl">{item.icon}</p><h2 className="mt-3 text-2xl font-black">{item.name}</h2><p className="mt-2 text-sm text-white/45">{item.category} · {item.status}</p></article>)}</div> : null}

      {!reachedLimit ? (
        <form onSubmit={saveWorld} className="mt-8 grid gap-4 lg:grid-cols-2">
          <Field label="World name" value={world.name} onChange={(name) => setWorld({ ...world, name })} required />
          <Field label="Slug" value={world.slug} onChange={(slug) => setWorld({ ...world, slug })} placeholder="my-frequency" required />
          <Field label="Icon" value={world.icon} onChange={(icon) => setWorld({ ...world, icon })} />
          <Select label="Category" value={world.category} onChange={(category) => setWorld({ ...world, category })} />
          <Field label="Progress name" value={world.progressionName} onChange={(progressionName) => setWorld({ ...world, progressionName })} placeholder="Heat, Frequency, Harmony…" />
          <Field label="Constitution title" value={world.constitutionTitle} onChange={(constitutionTitle) => setWorld({ ...world, constitutionTitle })} />
          <TextArea label="World description" value={world.description} onChange={(description) => setWorld({ ...world, description })} />
          <TextArea label="Philosophy" value={world.philosophy} onChange={(philosophy) => setWorld({ ...world, philosophy })} />
          <TextArea label="Community constitution" value={world.constitutionBody} onChange={(constitutionBody) => setWorld({ ...world, constitutionBody })} />
          <button disabled={saving} className="lg:col-span-2 rounded-full bg-cyan-400 px-6 py-4 text-sm font-black text-black disabled:opacity-50">{saving ? 'Claiming…' : 'Claim Your Frequency'}</button>
        </form>
      ) : (
        <form onSubmit={saveExpansion} className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="lg:col-span-2 rounded-[1.8rem] border border-cyan-300/15 bg-cyan-400/[.06] p-6"><p className="text-xs font-black uppercase tracking-[.24em] text-cyan-200/45">World Limit Reached</p><h2 className="mt-3 text-4xl font-black tracking-[-.06em]">Expand Your Universe</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-white/50">Creators can build up to three worlds automatically. A fourth world requires approval because one world already supports content, commerce, community, rewards, seasons, and events.</p></div>
          <Field label="Requested world name" value={expansion.requestedWorldName} onChange={(requestedWorldName) => setExpansion({ ...expansion, requestedWorldName })} required />
          <Select label="Requested category" value={expansion.requestedCategory} onChange={(requestedCategory) => setExpansion({ ...expansion, requestedCategory })} />
          <TextArea label="Why do you need another world?" value={expansion.reasonForExpansion} onChange={(reasonForExpansion) => setExpansion({ ...expansion, reasonForExpansion })} />
          <TextArea label="How is it different from your current worlds?" value={expansion.differenceFromExisting} onChange={(differenceFromExisting) => setExpansion({ ...expansion, differenceFromExisting })} />
          <TextArea label="Why can’t it fit inside an existing world?" value={expansion.whyExistingWorldsAreNotEnough} onChange={(whyExistingWorldsAreNotEnough) => setExpansion({ ...expansion, whyExistingWorldsAreNotEnough })} />
          <TextArea label="What will the community gain?" value={expansion.communityBenefit} onChange={(communityBenefit) => setExpansion({ ...expansion, communityBenefit })} />
          <button disabled={saving} className="lg:col-span-2 rounded-full bg-cyan-400 px-6 py-4 text-sm font-black text-black disabled:opacity-50">{saving ? 'Submitting…' : 'Submit Expansion Application'}</button>
        </form>
      )}
    </section>
  );
}

const categories = ['Music', 'Fashion', 'Basketball', 'Food', 'Business', 'Gaming', 'Education', 'Fitness', 'Art', 'Lifestyle', 'Other'];
function Field({ label, value, onChange, placeholder, required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean }) { return <label className="block text-xs font-black uppercase tracking-[.16em] text-white/35">{label}<input value={value} required={required} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-white outline-none" /></label>; }
function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="block text-xs font-black uppercase tracking-[.16em] text-white/35 lg:col-span-2">{label}<textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3 text-white outline-none" /></label>; }
function Select({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="block text-xs font-black uppercase tracking-[.16em] text-white/35">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#071215] px-4 py-3 text-white outline-none">{categories.map((category) => <option key={category}>{category}</option>)}</select></label>; }
