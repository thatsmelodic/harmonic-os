'use client';

import { useMemo, useState } from 'react';
import { useWorldCustomization, type WorldKey } from '@/components/studio/WorldCustomizationProvider';

const worlds: Array<{ key: WorldKey; label: string; description: string }> = [
  { key: 'global', label: 'Global System', description: 'Fallback styling and shared language across Harmonic OS.' },
  { key: 'home', label: 'Homepage', description: 'The main Harmonic OS entrance and shared navigation language.' },
  { key: 'melodic', label: 'Melodic', description: 'Music, memories, releases, and immersive album language.' },
  { key: 'fried-em', label: 'Fried Em', description: 'Courts, heat, seasons, episodes, rankings, and challenges.' },
  { key: 'schmackinn', label: 'Schmackinn', description: 'Flavor City, restaurants, callouts, reviews, and memories.' },
  { key: 'two-harmonic', label: '2 Harmonic', description: 'The Fashion House, Stitched Melodies, drops, and archives.' },
];

const copyFields = [
  ['title', 'Main Title'],
  ['subtitle', 'Main Subtitle'],
  ['primaryCta', 'Primary Button'],
  ['secondaryCta', 'Secondary Button'],
  ['mapTitle', 'Map / Explorer Title'],
  ['communityTitle', 'Community Section Title'],
  ['archiveTitle', 'Archive / Memory Title'],
  ['studioTitle', 'Creator Tool Title'],
];

export function WorldDesignStudio() {
  const { settings, updateWorld, updateLabel, copyToAll, resetWorld } = useWorldCustomization();
  const [world, setWorld] = useState<WorldKey>('schmackinn');
  const [section, setSection] = useState<'identity' | 'colors' | 'copy' | 'publishing'>('identity');
  const active = settings[world];
  const worldInfo = useMemo(() => worlds.find((item) => item.key === world)!, [world]);

  return (
    <div className="mx-auto max-w-7xl pb-28 text-white">
      <header className="rounded-[2.5rem] border border-white/10 bg-black/45 p-6 backdrop-blur-2xl sm:p-9">
        <p className="text-xs font-black uppercase tracking-[.34em] text-white/35">Design System</p>
        <h1 className="mt-3 text-5xl font-black tracking-[-.07em] sm:text-7xl">World Design & Copy</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/55">Change colors, titles, labels, and calls-to-action without digging through unrelated controls. Every option lives with the world and section it belongs to.</p>
      </header>

      <div className="mt-6 grid gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-[2rem] border border-white/10 bg-black/45 p-4 backdrop-blur-xl lg:sticky lg:top-5">
          <p className="px-2 text-xs font-black uppercase tracking-[.24em] text-white/35">Choose World</p>
          <div className="mt-3 grid gap-2">{worlds.map((item) => <button key={item.key} onClick={() => setWorld(item.key)} className={`rounded-2xl border p-4 text-left transition ${world === item.key ? 'border-white/25 bg-white/12' : 'border-white/8 bg-white/[.025] hover:bg-white/[.06]'}`}><p className="font-black">{item.label}</p><p className="mt-1 text-xs leading-5 text-white/38">{item.description}</p></button>)}</div>
        </aside>

        <section className="rounded-[2.4rem] border border-white/10 bg-black/45 p-5 backdrop-blur-2xl sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-xs font-black uppercase tracking-[.24em] text-white/35">Editing</p><h2 className="mt-2 text-4xl font-black tracking-[-.06em]">{worldInfo.label}</h2></div>
            <div className="flex flex-wrap gap-2"><button onClick={() => copyToAll(world)} className="rounded-full border border-white/10 bg-white/[.05] px-4 py-3 text-xs font-black">Apply This World to All</button><button onClick={() => resetWorld(world)} className="rounded-full border border-red-300/20 bg-red-400/10 px-4 py-3 text-xs font-black text-red-100">Reset World</button></div>
          </div>

          <nav className="mt-6 flex flex-wrap gap-2">{(['identity','colors','copy','publishing'] as const).map((item) => <button key={item} onClick={() => setSection(item)} className={`rounded-full px-4 py-3 text-sm font-black capitalize ${section === item ? 'bg-white text-black' : 'border border-white/10 bg-white/[.04] text-white/55'}`}>{item}</button>)}</nav>

          {section === 'identity' && <div className="mt-7 grid gap-4 sm:grid-cols-2"><Field label="World Title" value={active.title ?? ''} onChange={(value) => updateWorld(world, { title: value })} /><Field label="World Subtitle" value={active.subtitle ?? ''} onChange={(value) => updateWorld(world, { subtitle: value })} /><div className="sm:col-span-2 rounded-[2rem] border border-white/10 p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">Preview</p><div className="mt-4 rounded-[2rem] p-6" style={{ background: `linear-gradient(135deg, ${active.surface}, ${active.background})`, color: active.text }}><p className="text-sm font-black" style={{ color: active.accent }}>HARMONIC WORLD</p><h3 className="mt-3 text-4xl font-black">{active.title || worldInfo.label}</h3><p className="mt-3" style={{ color: active.muted }}>{active.subtitle || worldInfo.description}</p><button className="mt-5 rounded-full px-5 py-3 text-sm font-black text-black" style={{ background: active.primary }}>{active.labels.primaryCta || 'Enter World'}</button></div></div></div>}

          {section === 'colors' && <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{([['primary','Primary'],['secondary','Secondary'],['accent','Accent'],['background','Background'],['surface','Panels / Surface'],['text','Main Text'],['muted','Muted Text']] as const).map(([key,label]) => <ColorField key={key} label={label} value={active[key]} onChange={(value) => updateWorld(world, { [key]: value })} />)}</div>}

          {section === 'copy' && <div className="mt-7 grid gap-4 sm:grid-cols-2">{copyFields.map(([key,label]) => <Field key={key} label={label} value={key === 'title' ? active.title ?? '' : key === 'subtitle' ? active.subtitle ?? '' : active.labels[key] ?? ''} onChange={(value) => key === 'title' ? updateWorld(world, { title: value }) : key === 'subtitle' ? updateWorld(world, { subtitle: value }) : updateLabel(world, key, value)} />)}</div>}

          {section === 'publishing' && <div className="mt-7 grid gap-4 lg:grid-cols-3"><Info title="Draft Changes" text="Your edits save automatically in this browser while the permanent Supabase publishing layer is connected." /><Info title="World Override" text="Each world can keep its own colors and language without changing the other universes." /><Info title="Global Sync" text="Use Apply This World to All when a campaign, season, or release needs one coordinated visual direction." /></div>}
        </section>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><span className="text-xs font-black uppercase tracking-[.16em] text-white/35">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none" /></label>; }
function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><span className="text-xs font-black uppercase tracking-[.16em] text-white/35">{label}</span><div className="mt-3 flex items-center gap-3"><input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-14 rounded-lg border-0 bg-transparent" /><input value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/35 px-3 py-3 font-mono text-sm text-white outline-none" /></div></label>; }
function Info({ title, text }: { title: string; text: string }) { return <article className="rounded-[2rem] border border-white/10 bg-white/[.025] p-5"><h3 className="text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-white/45">{text}</p></article>; }
