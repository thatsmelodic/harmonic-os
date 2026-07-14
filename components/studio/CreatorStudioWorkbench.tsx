'use client';

import { useMemo, useState } from 'react';
import {
  useWorldCustomization,
  type WorldCustomization,
  type WorldKey,
} from '@/components/studio/WorldCustomizationProvider';

const worlds: Array<{ key: WorldKey; label: string; route: string }> = [
  { key: 'home', label: 'Homepage', route: '/' },
  { key: 'schmackinn', label: 'Schmackinn', route: '/worlds/schmackinn' },
  { key: 'fried-em', label: 'Fried Em', route: '/worlds/fried-em' },
  { key: 'melodic', label: 'Melodic', route: '/worlds/melodic' },
  { key: 'two-harmonic', label: '2 Harmonic', route: '/worlds/two-harmonic' },
  { key: 'global', label: 'Global System', route: '/' },
];

const presets = [
  { id: 'cinematic', label: 'Cinematic', description: 'Large hero, dramatic glow, deeper spacing.', patch: { primary: '#b45cff', secondary: '#f472d0', accent: '#ff9d42', background: '#050208', surface: '#14091d', glow: '#a855f7', labels: { typographyScale: 'poster', atmosphere: 'cinematic cosmic neon', entryMotion: 'fade', hoverMotion: 'glow' } } },
  { id: 'editorial', label: 'Editorial', description: 'Sharper hierarchy and cleaner surfaces.', patch: { primary: '#d8b4fe', secondary: '#93c5fd', accent: '#f8fafc', background: '#08070b', surface: '#17131c', glow: '#7c3aed', labels: { typographyScale: 'large', atmosphere: 'editorial gallery', entryMotion: 'slide-up', hoverMotion: 'lift' } } },
  { id: 'luxury', label: 'Luxury', description: 'Refined contrast, cream accents, slower energy.', patch: { primary: '#f5e6c8', secondary: '#d6b36a', accent: '#a855f7', background: '#050403', surface: '#15110c', glow: '#d6b36a', labels: { typographyScale: 'large', atmosphere: 'luxury black and cream', entryMotion: 'fade', hoverMotion: 'glow' } } },
  { id: 'minimal', label: 'Minimal', description: 'More space, less glow, direct messaging.', patch: { primary: '#ffffff', secondary: '#a1a1aa', accent: '#8b5cf6', background: '#09090b', surface: '#18181b', glow: '#52525b', labels: { typographyScale: 'balanced', atmosphere: 'minimal dark', entryMotion: 'none', hoverMotion: 'lift' } } },
  { id: 'experimental', label: 'Experimental', description: 'Asymmetry, stronger color and motion.', patch: { primary: '#ff3df2', secondary: '#22d3ee', accent: '#f97316', background: '#030107', surface: '#160421', glow: '#ff3df2', labels: { typographyScale: 'poster', atmosphere: 'experimental frequency', entryMotion: 'pulse', hoverMotion: 'tilt' } } },
] as const;

type Proposal = { id: string; label: string; description: string; settings: WorldCustomization };
type Viewport = 'desktop' | 'tablet' | 'mobile';

export function CreatorStudioWorkbench() {
  const { settings, updateWorld, updateLabel, replaceWorld, saveDraft, publishWorld, cloudStatus } = useWorldCustomization();
  const [world, setWorld] = useState<WorldKey>('home');
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [secret, setSecret] = useState('');
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [baseline, setBaseline] = useState<WorldCustomization | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [previewVersion, setPreviewVersion] = useState(0);
  const [message, setMessage] = useState('Changes update the real page preview. Nothing goes public until Publish.');

  const active = settings[world];
  const worldInfo = worlds.find((item) => item.key === world) ?? worlds[0];
  const frameWidth = viewport === 'desktop' ? '100%' : viewport === 'tablet' ? '820px' : '390px';
  const previewUrl = useMemo(() => `${worldInfo.route}?studioPreview=${previewVersion}`, [worldInfo.route, previewVersion]);

  function generateProposal(presetId: string) {
    const preset = presets.find((item) => item.id === presetId) ?? presets[0];
    const next: WorldCustomization = {
      ...active,
      ...preset.patch,
      labels: { ...active.labels, ...preset.patch.labels },
      media: active.media.map((asset) => ({ ...asset })),
    };
    setProposal({ id: `${preset.id}-${Date.now()}`, label: preset.label, description: preset.description, settings: next });
    setPreviewing(false);
    setBaseline(null);
    setMessage(`${preset.label} generated. Preview it before accepting.`);
  }

  function previewProposal() {
    if (!proposal) return;
    if (!baseline) setBaseline(active);
    replaceWorld(world, proposal.settings);
    setPreviewing(true);
    setPreviewVersion((value) => value + 1);
    setMessage('Proposal is visible only as an unsaved preview. Accept or reject it.');
  }

  function rejectProposal() {
    if (baseline) replaceWorld(world, baseline);
    setProposal(null);
    setBaseline(null);
    setPreviewing(false);
    setPreviewVersion((value) => value + 1);
    setMessage('Proposal rejected. The previous draft was restored.');
  }

  function acceptProposal() {
    setProposal(null);
    setBaseline(null);
    setPreviewing(false);
    setMessage('Proposal accepted into the private draft. Save Draft or Publish when ready.');
  }

  function regenerate() {
    if (!proposal) return;
    generateProposal(proposal.label.toLowerCase());
  }

  async function persist(mode: 'draft' | 'publish') {
    if (!secret.trim()) { setMessage('Enter the Studio Secret before saving or publishing.'); return; }
    const ok = mode === 'draft' ? await saveDraft(world, secret) : await publishWorld(world, secret, `${worldInfo.label} visual publish`);
    setMessage(ok ? (mode === 'draft' ? 'Private draft saved.' : 'Published successfully.') : 'Save failed. Check the Studio Secret and Supabase settings.');
  }

  return <main className="min-h-screen bg-[#050308] text-white">
    <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/90 px-4 py-3 backdrop-blur-xl">
      <div><p className="text-[10px] font-black uppercase tracking-[.28em] text-purple-300/60">Harmonic OS</p><h1 className="text-2xl font-black">Creator Studio Workbench</h1></div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/10 px-3 py-2 text-xs font-black text-white/55">{cloudStatus}</span>
        <button onClick={() => void persist('draft')} className="rounded-full border border-white/15 px-4 py-2 text-xs font-black">Save Draft</button>
        <button onClick={() => void persist('publish')} className="rounded-full bg-purple-200 px-4 py-2 text-xs font-black text-black">Publish</button>
      </div>
    </header>

    <div className="grid min-h-[calc(100vh-69px)] xl:grid-cols-[250px_minmax(520px,1fr)_360px]">
      <aside className="border-r border-white/10 bg-black/35 p-4">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[.22em] text-white/35">Pages & worlds</p>
        <div className="grid gap-2">{worlds.map((item) => <button key={item.key} onClick={() => { setWorld(item.key); setProposal(null); setBaseline(null); setPreviewing(false); setPreviewVersion((value) => value + 1); }} className={`rounded-2xl border p-4 text-left ${world === item.key ? 'border-purple-300 bg-purple-300/15' : 'border-white/10 bg-white/[.025]'}`}><b>{item.label}</b><span className="mt-1 block text-xs text-white/40">Edit the complete experience</span></button>)}</div>
        <div className="mt-5 rounded-2xl border border-white/10 p-4"><label className="text-[10px] font-black uppercase tracking-[.18em] text-white/40">Studio Secret</label><input type="password" value={secret} onChange={(event) => setSecret(event.target.value)} placeholder="Required to save or publish" className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-xs" /></div>
        <a href="/studio/visual" className="mt-4 block rounded-2xl border border-purple-300/25 bg-purple-300/[.06] p-4 text-sm font-black">Open layer canvas →</a>
      </aside>

      <section className="overflow-auto bg-[#09060d] p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/70 p-3">
          <div><b>Real Page Preview</b><p className="text-[10px] text-white/40">Unsaved controls render here before publishing</p></div>
          <div className="flex gap-2">{(['desktop','tablet','mobile'] as const).map((item) => <button key={item} onClick={() => setViewport(item)} className={`rounded-full px-3 py-2 text-xs font-black ${viewport === item ? 'bg-white text-black' : 'border border-white/10'}`}>{item}</button>)}<button onClick={() => setPreviewVersion((value) => value + 1)} className="rounded-full border border-white/10 px-3 py-2 text-xs font-black">Refresh Preview</button></div>
        </div>
        {previewing && <div className="mb-3 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-3 text-sm font-bold text-amber-100">Previewing generated proposal — not saved and not published.</div>}
        <div className="mx-auto h-[calc(100vh-155px)] min-h-[720px] overflow-hidden rounded-[2rem] border border-white/10 bg-black transition-all" style={{ width: frameWidth, maxWidth: '100%' }}>
          <iframe key={previewUrl} title={`${worldInfo.label} live preview`} src={previewUrl} className="h-full w-full border-0" />
        </div>
      </section>

      <aside className="overflow-auto border-l border-white/10 bg-black/45 p-4">
        <div className="rounded-2xl border border-purple-300/20 bg-purple-300/[.06] p-4"><p className="text-[10px] font-black uppercase tracking-[.18em] text-purple-200/60">Editing</p><h2 className="mt-1 text-2xl font-black">{worldInfo.label}</h2><p className="mt-2 text-xs leading-5 text-white/45">{message}</p></div>

        <section className="mt-4 grid gap-3"><h3 className="text-sm font-black uppercase tracking-[.16em] text-white/45">Content</h3><Field label="Title" value={active.title ?? ''} onChange={(title) => { updateWorld(world, { title }); setPreviewVersion((value) => value + 1); }} /><Area label="Description" value={active.subtitle ?? ''} onChange={(subtitle) => { updateWorld(world, { subtitle }); setPreviewVersion((value) => value + 1); }} /><Field label="Eyebrow" value={active.labels.eyebrow ?? ''} onChange={(value) => { updateLabel(world, 'eyebrow', value); setPreviewVersion((current) => current + 1); }} /></section>

        <section className="mt-6 grid grid-cols-2 gap-3"><h3 className="col-span-2 text-sm font-black uppercase tracking-[.16em] text-white/45">Colors</h3>{(['primary','secondary','accent','background','surface','text','muted','border','glow'] as const).map((key) => <ColorField key={key} label={key} value={active[key]} onChange={(value) => { updateWorld(world, { [key]: value }); setPreviewVersion((current) => current + 1); }} />)}</section>

        <section className="mt-6"><h3 className="text-sm font-black uppercase tracking-[.16em] text-white/45">Generated design previews</h3><p className="mt-2 text-xs leading-5 text-white/40">Generate a private proposal. Nothing changes permanently until Accept.</p><div className="mt-3 grid grid-cols-2 gap-2">{presets.map((preset) => <button key={preset.id} onClick={() => generateProposal(preset.id)} className="rounded-2xl border border-white/10 p-3 text-left hover:border-purple-300/40"><b className="text-sm">{preset.label}</b><span className="mt-1 block text-[10px] leading-4 text-white/35">{preset.description}</span></button>)}</div></section>

        {proposal && <section className="mt-4 rounded-[1.5rem] border border-purple-300/30 bg-purple-300/[.07] p-4"><p className="text-[10px] font-black uppercase tracking-[.18em] text-purple-200/60">Generated proposal</p><h3 className="mt-1 text-xl font-black">{proposal.label}</h3><p className="mt-2 text-xs leading-5 text-white/45">{proposal.description}</p><div className="mt-3 flex gap-2">{[proposal.settings.primary,proposal.settings.secondary,proposal.settings.accent,proposal.settings.background,proposal.settings.surface].map((color) => <span key={color} className="h-8 flex-1 rounded-lg border border-white/10" style={{ background: color }} />)}</div><div className="mt-4 grid grid-cols-2 gap-2"><button onClick={previewProposal} className="rounded-xl bg-white px-3 py-3 text-xs font-black text-black">Preview</button><button onClick={regenerate} className="rounded-xl border border-white/15 px-3 py-3 text-xs font-black">Regenerate</button><button onClick={rejectProposal} className="rounded-xl border border-red-300/25 px-3 py-3 text-xs font-black text-red-200">Reject</button><button onClick={acceptProposal} disabled={!previewing} className="rounded-xl bg-purple-200 px-3 py-3 text-xs font-black text-black disabled:opacity-35">Accept</button></div><p className="mt-3 text-[10px] leading-4 text-white/35">Compare by switching Preview on, then Reject to restore the exact previous draft.</p></section>}
      </aside>
    </div>
  </main>;
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="grid gap-2 text-xs font-black uppercase tracking-[.12em] text-white/45">{label}<input value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white" /></label>; }
function Area({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="grid gap-2 text-xs font-black uppercase tracking-[.12em] text-white/45">{label}<textarea rows={3} value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white" /></label>; }
function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3 text-[10px] font-black uppercase tracking-[.1em] text-white/55">{label}<input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-8 w-10 rounded border-0 bg-transparent" /></label>; }
