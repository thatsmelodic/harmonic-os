'use client';

import { useMemo, useState } from 'react';
import {
  categoryDefinitions,
  createCreatorWorldBlueprint,
  getCreatorWorldRevenueIdeas,
  type CreatorWorldCategory,
  type CreatorWorldVisibility,
} from '@/lib/creator-worlds-engine';

const allCategories = Object.keys(categoryDefinitions) as CreatorWorldCategory[];
const visibilityOptions: CreatorWorldVisibility[] = ['draft', 'private', 'invite-only', 'public'];

export function CreatorWorldsPanel() {
  const [name, setName] = useState('Melodic Universe');
  const [ownerHandle, setOwnerHandle] = useState('@thatsmelodic');
  const [visibility, setVisibility] = useState<CreatorWorldVisibility>('draft');
  const [categories, setCategories] = useState<CreatorWorldCategory[]>(['music', 'fashion', 'food']);
  const [vibe, setVibe] = useState('cinematic, purple-neon, fall-first, living-world energy');
  const [aiPersonality, setAiPersonality] = useState('assistant director: helpful, creative, approval-first, never autopilot');

  const blueprint = useMemo(() => createCreatorWorldBlueprint({ name, ownerHandle, visibility, categories, vibe, aiPersonality }), [name, ownerHandle, visibility, categories, vibe, aiPersonality]);
  const revenueIdeas = getCreatorWorldRevenueIdeas(blueprint);

  function toggleCategory(category: CreatorWorldCategory) {
    setCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category]);
  }

  return (
    <article className="rounded-[2rem] border border-purple-200/20 bg-[linear-gradient(135deg,rgba(183,108,255,.13),rgba(54,178,203,.05),rgba(0,0,0,.35))] p-5 backdrop-blur-2xl">
      <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Platform Layer</p>
      <h3 className="mt-3 text-4xl font-black tracking-[-.08em] sm:text-5xl">Creator Worlds</h3>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-white/60">This is the foundation that turns Harmonic OS into a creator platform: owned worlds, category lanes, AI personality, media, community, collaboration, activity rankings, commerce readiness, and marketplace readiness.</p>

      <div className="mt-6 grid gap-5 xl:grid-cols-[.85fr_1.15fr]">
        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">World Builder</p>
          <div className="mt-4 grid gap-3">
            <label className="grid gap-2 text-sm font-bold text-purple-100/70">World Name<input value={name} onChange={(event) => setName(event.target.value)} className="rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-purple-50 outline-none focus:border-purple-300" /></label>
            <label className="grid gap-2 text-sm font-bold text-purple-100/70">Owner Handle<input value={ownerHandle} onChange={(event) => setOwnerHandle(event.target.value)} className="rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-purple-50 outline-none focus:border-purple-300" /></label>
            <label className="grid gap-2 text-sm font-bold text-purple-100/70">Visibility<select value={visibility} onChange={(event) => setVisibility(event.target.value as CreatorWorldVisibility)} className="rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-purple-50 outline-none focus:border-purple-300">{visibilityOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
            <label className="grid gap-2 text-sm font-bold text-purple-100/70">World Vibe<textarea value={vibe} onChange={(event) => setVibe(event.target.value)} rows={3} className="rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-purple-50 outline-none focus:border-purple-300" /></label>
            <label className="grid gap-2 text-sm font-bold text-purple-100/70">AI Personality<textarea value={aiPersonality} onChange={(event) => setAiPersonality(event.target.value)} rows={3} className="rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-purple-50 outline-none focus:border-purple-300" /></label>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">Category Lanes</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {allCategories.map((category) => {
              const selected = categories.includes(category);
              const definition = categoryDefinitions[category];
              return (
                <button key={category} type="button" onClick={() => toggleCategory(category)} className="rounded-2xl border p-4 text-left transition hover:-translate-y-1" style={{ borderColor: selected ? 'rgba(216,180,254,.68)' : 'rgba(255,255,255,.10)', background: selected ? 'rgba(183,108,255,.16)' : 'rgba(255,255,255,.035)' }}>
                  <p className="font-black text-white/78">{definition.label}</p>
                  <p className="mt-2 text-xs leading-5 text-white/45">{definition.unlocks.slice(0, 3).join(' • ')}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Stat label="Monthly" value={`$${blueprint.pricing.estimatedMonthly}`} />
            <Stat label="Categories" value={String(blueprint.categories.length)} />
            <Stat label="Take Rate" value={`${blueprint.pricing.platformTakeRate}%`} />
          </div>
        </section>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <FeatureList title="Modules" items={blueprint.modules.map((item) => item.replace('-', ' '))} />
        <FeatureList title="Collaboration" items={blueprint.collaborationModes} />
        <FeatureList title="Media System" items={blueprint.mediaSystem} />
        <FeatureList title="Community" items={blueprint.communitySystem} />
        <FeatureList title="Ranking Signals" items={blueprint.rankingSignals} />
        <FeatureList title="Revenue Paths" items={revenueIdeas} />
      </div>

      <div className="mt-5 rounded-2xl border border-purple-200/15 bg-purple-200/[.06] p-5">
        <p className="text-xs font-black uppercase tracking-[.22em] text-purple-100/45">Commerce Ready, Not Commerce Yet</p>
        <h4 className="mt-3 text-2xl font-black tracking-[-.05em]">This prepares the platform for native world commerce.</h4>
        <p className="mt-3 text-sm leading-7 text-white/60">Creator Worlds defines who owns a world, what categories they pay for, what modules they unlock, how media and community work, how worlds collaborate, and how marketplace/commerce can plug in without feeling like generic checkout.</p>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.06em] text-purple-100">{value}</p></div>;
}

function FeatureList({ title, items }: { title: string; items: string[] }) {
  return <section className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-xs font-black uppercase tracking-[.22em] text-white/35">{title}</p><div className="mt-3 grid gap-2">{items.map((item) => <p key={item} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-6 text-white/52 capitalize">{item}</p>)}</div></section>;
}
