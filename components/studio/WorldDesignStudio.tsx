'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useWorldCustomization, type WorldKey } from '@/components/studio/WorldCustomizationProvider';

const worlds: Array<{ key: WorldKey; label: string; description: string; preview: string }> = [
  { key: 'global', label: 'Global System', description: 'Fallback styling and shared language across Harmonic OS.', preview: '/' },
  { key: 'home', label: 'Homepage', description: 'The Harmonic OS entrance and shared navigation language.', preview: '/' },
  { key: 'melodic', label: 'Melodic', description: 'Music, memories, releases, and immersive album language.', preview: '/worlds/melodic' },
  { key: 'fried-em', label: 'Fried Em', description: 'Courts, heat, seasons, episodes, rankings, and challenges.', preview: '/worlds/fried-em' },
  { key: 'schmackinn', label: 'Schmackinn', description: 'Flavor City, restaurants, callouts, reviews, and memories.', preview: '/worlds/schmackinn' },
  { key: 'two-harmonic', label: '2 Harmonic', description: 'The Fashion House, Stitched Melodies, drops, and archives.', preview: '/worlds/two-harmonic' },
];

const sharedCopy = [
  ['title', 'Main Title'],
  ['subtitle', 'Main Description'],
  ['eyebrow', 'Eyebrow / Section Label'],
  ['primaryCta', 'Primary Button'],
  ['secondaryCta', 'Secondary Button'],
];

const worldCopy: Partial<Record<WorldKey, string[][]>> = {
  schmackinn: [
    ['systemsTitle', 'World Systems Title'],
    ['mapEyebrow', 'Flavor City Map Eyebrow'],
    ['mapTitle', 'Flavor City Map Title'],
    ['mapDescription', 'Flavor City Map Description'],
    ['communityTitle', 'Callout Community Title'],
    ['communityDescription', 'Callout Community Description'],
    ['archiveTitle', 'Food Memories Title'],
    ['archiveDescription', 'Food Memories Description'],
    ['flavorLabTitle', 'Flavor Lab Title'],
    ['flavorLabDescription', 'Flavor Lab Description'],
    ['restaurantCta', 'Restaurant Entry Button'],
    ['firstBiteTitle', 'First-Bite Title'],
    ['studioTitle', 'Creator Automation Title'],
  ],
  melodic: [['archiveTitle', 'Memory Archive Title'], ['studioTitle', 'Upload Studio Title'], ['communityTitle', 'Listener Community Title']],
  'fried-em': [['communityTitle', 'Community / Heat Title'], ['archiveTitle', 'Episode Archive Title'], ['studioTitle', 'Fried Em CMS Title']],
  'two-harmonic': [['archiveTitle', 'Stitch Archive Title'], ['studioTitle', 'Fashion House Studio Title'], ['communityTitle', 'Community Stories Title']],
};

type Section = 'identity' | 'palette' | 'page-copy' | 'actions' | 'publishing';

const sections: Array<{ key: Section; label: string; description: string }> = [
  { key: 'identity', label: 'Identity', description: 'Main title, description, and live world preview.' },
  { key: 'palette', label: 'Colors', description: 'Every major color role, including borders and glow.' },
  { key: 'page-copy', label: 'Page Copy', description: 'Titles and descriptions grouped by page section.' },
  { key: 'actions', label: 'Buttons', description: 'Calls-to-action and navigation language.' },
  { key: 'publishing', label: 'Publishing', description: 'Reset, sync, preview, and production status.' },
];

export function WorldDesignStudio() {
  const { settings, updateWorld, updateLabel, copyToAll, resetWorld } = useWorldCustomization();
  const [world, setWorld] = useState<WorldKey>('schmackinn');
  const [section, setSection] = useState<Section>('identity');
  const active = settings[world];
  const worldInfo = useMemo(() => worlds.find((item) => item.key === world)!, [world]);
  const extraCopy = worldCopy[world] ?? [];

  return (
    <div className="mx-auto max-w-7xl pb-28 text-white">
      <header className="rounded-[2.5rem] border border-white/10 bg-black/45 p-6 backdrop-blur-2xl sm:p-9">
        <p className="text-xs font-black uppercase tracking-[.34em] text-white/35">Design Department</p>
        <h1 className="mt-3 text-5xl font-black tracking-[-.07em] sm:text-7xl">World Design & Copy</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/55">Each world has its own organized design file. Colors stay under Colors, wording stays under Page Copy, buttons stay under Buttons, and world content remains in that world’s CMS.</p>
      </header>

      <div className="mt-6 grid gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-[2rem] border border-white/10 bg-black/45 p-4 backdrop-blur-xl lg:sticky lg:top-5">
          <p className="px-2 text-xs font-black uppercase tracking-[.24em] text-white/35">Choose World</p>
          <div className="mt-3 grid gap-2">{worlds.map((item) => <button key={item.key} onClick={() => { setWorld(item.key); setSection('identity'); }} className={`rounded-2xl border p-4 text-left transition ${world === item.key ? 'border-white/25 bg-white/12' : 'border-white/8 bg-white/[.025] hover:bg-white/[.06]'}`}><p className="font-black">{item.label}</p><p className="mt-1 text-xs leading-5 text-white/38">{item.description}</p></button>)}</div>
        </aside>

        <section className="rounded-[2.4rem] border border-white/10 bg-black/45 p-5 backdrop-blur-2xl sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-xs font-black uppercase tracking-[.24em] text-white/35">Editing</p><h2 className="mt-2 text-4xl font-black tracking-[-.06em]">{worldInfo.label}</h2></div>
            <Link href={worldInfo.preview} className="rounded-full border border-white/10 bg-white/[.05] px-4 py-3 text-xs font-black">Open Live Preview ↗</Link>
          </div>

          <nav className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">{sections.map((item) => <button key={item.key} onClick={() => setSection(item.key)} className={`rounded-2xl border p-4 text-left ${section === item.key ? 'border-white/30 bg-white text-black' : 'border-white/10 bg-white/[.035] text-white'}`}><p className="font-black">{item.label}</p><p className={`mt-1 text-xs leading-5 ${section === item.key ? 'text-black/55' : 'text-white/35'}`}>{item.description}</p></button>)}</nav>

          {section === 'identity' && <div className="mt-7 grid gap-4 sm:grid-cols-2"><Field label="World Title" value={active.title ?? ''} onChange={(value) => updateWorld(world, { title: value })} /><Field label="World Description" value={active.subtitle ?? ''} onChange={(value) => updateWorld(world, { subtitle: value })} multiline /><Preview active={active} worldInfo={worldInfo} /></div>}

          {section === 'palette' && <div className="mt-7"><div className="mb-5 rounded-2xl border border-white/10 bg-white/[.025] p-4 text-sm leading-7 text-white/45">These are semantic colors. Change Primary once and connected primary buttons, progress bars, focus states, and highlights respond together instead of editing random elements one at a time.</div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{([['primary','Primary Actions'],['secondary','Secondary Actions'],['accent','Accent / Highlights'],['background','World Background'],['surface','Panels / Cards'],['text','Main Text'],['muted','Muted Text'],['border','Borders / Dividers'],['glow','Glow / Energy']] as const).map(([key,label]) => <ColorField key={key} label={label} value={active[key]} onChange={(value) => updateWorld(world, { [key]: value })} />)}</div></div>}

          {section === 'page-copy' && <div className="mt-7"><SectionHeading title="Main World" note="Core language used at the entrance of this world." /><div className="grid gap-4 sm:grid-cols-2">{sharedCopy.slice(0, 3).map(([key,label]) => <Field key={key} label={label} value={key === 'title' ? active.title ?? '' : key === 'subtitle' ? active.subtitle ?? '' : active.labels[key] ?? ''} onChange={(value) => key === 'title' ? updateWorld(world, { title: value }) : key === 'subtitle' ? updateWorld(world, { subtitle: value }) : updateLabel(world, key, value)} multiline={key === 'subtitle'} />)}</div>{extraCopy.length > 0 && <><SectionHeading title={`${worldInfo.label} Sections`} note="Copy stays grouped with the feature it controls." /><div className="grid gap-4 sm:grid-cols-2">{extraCopy.map(([key,label]) => <Field key={key} label={label} value={active.labels[key] ?? ''} onChange={(value) => updateLabel(world, key, value)} multiline={key.toLowerCase().includes('description')} />)}</div></>}</div>}

          {section === 'actions' && <div className="mt-7"><SectionHeading title="Calls to Action" note="Button wording and navigation language only." /><div className="grid gap-4 sm:grid-cols-2">{sharedCopy.slice(3).map(([key,label]) => <Field key={key} label={label} value={active.labels[key] ?? ''} onChange={(value) => updateLabel(world, key, value)} />)}</div></div>}

          {section === 'publishing' && <div className="mt-7"><div className="grid gap-4 lg:grid-cols-3"><Info title="Auto-Saved Draft" text="Changes save in this browser immediately and preview across connected world surfaces." /><Info title="World Override" text="Every universe keeps its own colors and words without affecting the others." /><Info title="Global Campaign Sync" text="Apply one world’s direction to all for synchronized releases, seasons, or campaigns." /></div><div className="mt-5 flex flex-wrap gap-3"><button onClick={() => copyToAll(world)} className="rounded-full bg-white px-5 py-4 text-sm font-black text-black">Apply This Design to All Worlds</button><button onClick={() => resetWorld(world)} className="rounded-full border border-red-300/20 bg-red-400/10 px-5 py-4 text-sm font-black text-red-100">Reset {worldInfo.label}</button></div></div>}
        </section>
      </div>
    </div>
  );
}

function SectionHeading({ title, note }: { title: string; note: string }) { return <div className="mb-4 mt-7 first:mt-0"><p className="text-xs font-black uppercase tracking-[.22em] text-white/30">{title}</p><p className="mt-1 text-sm text-white/40">{note}</p></div>; }
function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) { return <label className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><span className="text-xs font-black uppercase tracking-[.16em] text-white/35">{label}</span>{multiline ? <textarea rows={4} value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 w-full resize-y rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none" /> : <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none" />}</label>; }
function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><span className="text-xs font-black uppercase tracking-[.16em] text-white/35">{label}</span><div className="mt-3 flex items-center gap-3"><input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-14 rounded-lg border-0 bg-transparent" /><input value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/35 px-3 py-3 font-mono text-sm text-white outline-none" /></div></label>; }
function Preview({ active, worldInfo }: { active: ReturnType<typeof useWorldCustomization>['settings'][WorldKey]; worldInfo: (typeof worlds)[number] }) { return <div className="sm:col-span-2 rounded-[2rem] border border-white/10 p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">Live Style Preview</p><div className="mt-4 rounded-[2rem] border p-6" style={{ background: `linear-gradient(135deg, ${active.surface}, ${active.background})`, color: active.text, borderColor: active.border, boxShadow: `0 0 45px ${active.glow}55` }}><p className="text-sm font-black" style={{ color: active.accent }}>HARMONIC WORLD</p><h3 className="mt-3 text-4xl font-black">{active.title || worldInfo.label}</h3><p className="mt-3" style={{ color: active.muted }}>{active.subtitle || worldInfo.description}</p><div className="mt-5 flex gap-3"><button className="rounded-full px-5 py-3 text-sm font-black" style={{ background: active.primary, color: active.background }}>{active.labels.primaryCta || 'Enter World'}</button><button className="rounded-full border px-5 py-3 text-sm font-black" style={{ borderColor: active.secondary, color: active.text }}>{active.labels.secondaryCta || 'Explore'}</button></div></div></div>; }
function Info({ title, text }: { title: string; text: string }) { return <article className="rounded-[2rem] border border-white/10 bg-white/[.025] p-5"><h3 className="text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-white/45">{text}</p></article>; }
