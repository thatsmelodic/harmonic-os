'use client';

import { useEffect, useMemo, useRef, useState, type DragEvent } from 'react';
import { useEditorHistory } from '@/components/studio/useEditorHistory';
import {
  useWorldCustomization,
  type MediaPlacement,
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

const PROPOSAL_KEY = 'harmonic-studio-proposal-v1';
const SECRET_KEY = 'harmonic-studio-secret-session';
type Proposal = { id: string; presetId: string; label: string; description: string; settings: WorldCustomization };
type Viewport = 'desktop' | 'tablet' | 'mobile';
type ControlTab = 'content' | 'colors' | 'assets' | 'history';

export function CreatorStudioWorkbench() {
  const { settings, replaceWorld, saveDraft, publishWorld, cloudStatus, versions, loadVersions, restoreVersion } = useWorldCustomization();
  const [world, setWorld] = useState<WorldKey>('home');
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [tab, setTab] = useState<ControlTab>('content');
  const [secret, setSecret] = useState('');
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [draftVersion, setDraftVersion] = useState(0);
  const [proposalVersion, setProposalVersion] = useState(0);
  const [directEdit, setDirectEdit] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('Edit the current draft while any AI proposal stays visible beside it.');
  const fileRef = useRef<HTMLInputElement>(null);
  const historyAction = useRef(false);

  const active = settings[world];
  const history = useEditorHistory(active, { limit: 100 });
  const worldInfo = worlds.find((item) => item.key === world) ?? worlds[0];
  const frameWidth = viewport === 'desktop' ? '100%' : viewport === 'tablet' ? '820px' : '390px';
  const currentUrl = useMemo(() => `${worldInfo.route}?studioDraft=${draftVersion}`, [worldInfo.route, draftVersion]);
  const proposalUrl = useMemo(() => `${worldInfo.route}?studioProposal=1&proposalVersion=${proposalVersion}`, [worldInfo.route, proposalVersion]);

  useEffect(() => { setSecret(window.sessionStorage.getItem(SECRET_KEY) || ''); }, []);
  useEffect(() => {
    if (!historyAction.current) return;
    historyAction.current = false;
    replaceWorld(world, history.value);
    setDraftVersion((value) => value + 1);
  }, [history.value]);
  useEffect(() => {
    function shortcuts(event: KeyboardEvent) {
      if (!(event.metaKey || event.ctrlKey)) return;
      const key = event.key.toLowerCase();
      if (key === 'z') { event.preventDefault(); event.shiftKey ? redo() : undo(); }
      if (key === 's') { event.preventDefault(); void persist('draft'); }
    }
    window.addEventListener('keydown', shortcuts);
    return () => window.removeEventListener('keydown', shortcuts);
  });

  function refreshDraft() { setDraftVersion((value) => value + 1); }
  function apply(next: WorldCustomization) { history.commit(next); replaceWorld(world, next); refreshDraft(); }
  function patch(patchValue: Partial<WorldCustomization>) { apply({ ...active, ...patchValue }); }
  function patchLabel(key: string, value: string) { apply({ ...active, labels: { ...active.labels, [key]: value } }); }
  function undo() { if (!history.canUndo) return; historyAction.current = true; history.undo(); }
  function redo() { if (!history.canRedo) return; historyAction.current = true; history.redo(); }

  function generateProposal(presetId: string) {
    const preset = presets.find((item) => item.id === presetId) ?? presets[0];
    const next: WorldCustomization = { ...active, ...preset.patch, labels: { ...active.labels, ...preset.patch.labels }, media: active.media.map((asset) => ({ ...asset })) };
    const generated = { id: `${preset.id}-${Date.now()}`, presetId: preset.id, label: preset.label, description: preset.description, settings: next };
    window.localStorage.setItem(PROPOSAL_KEY, JSON.stringify({ world, settings: next }));
    setProposal(generated); setProposalVersion((value) => value + 1);
    setMessage(`${preset.label} generated beside your current draft. Nothing has been applied.`);
  }
  function rejectProposal() { window.localStorage.removeItem(PROPOSAL_KEY); setProposal(null); setProposalVersion((value) => value + 1); setMessage('AI proposal rejected. Your current draft was never changed.'); }
  function acceptProposal() { if (!proposal) return; apply(proposal.settings); window.localStorage.removeItem(PROPOSAL_KEY); setProposal(null); setMessage('AI proposal accepted into the private draft. It is still not public until Publish.'); }
  function regenerate() { if (proposal) generateProposal(proposal.presetId); }

  async function persist(mode: 'draft' | 'publish') {
    const resolved = secret.trim() || window.sessionStorage.getItem(SECRET_KEY) || '';
    if (!resolved) { setMessage('Enter the Studio Secret before saving or publishing.'); return; }
    window.sessionStorage.setItem(SECRET_KEY, resolved);
    const ok = mode === 'draft' ? await saveDraft(world, resolved) : await publishWorld(world, resolved, `${worldInfo.label} visual publish`);
    setMessage(ok ? (mode === 'draft' ? 'Private draft saved.' : 'Published successfully.') : 'Save failed. Check the Studio Secret and Supabase settings.');
  }

  function switchWorld(next: WorldKey) {
    window.localStorage.removeItem(PROPOSAL_KEY); setWorld(next); setProposal(null); setDirectEdit(false);
    history.replace(settings[next]); setDraftVersion((value) => value + 1); setProposalVersion((value) => value + 1);
  }

  async function uploadFiles(files: FileList | File[]) {
    const accepted = Array.from(files).filter((file) => file.type.startsWith('image/') || file.type.startsWith('video/'));
    if (!accepted.length) { setMessage('Use JPG, PNG, SVG, WEBP, GIF, MP4, WEBM, or MOV media.'); return; }
    const resolved = secret.trim() || window.sessionStorage.getItem(SECRET_KEY) || '';
    if (!resolved) { setMessage('Enter the Studio Secret once before uploading media.'); return; }
    setUploading(true);
    try {
      let next = active;
      for (const file of accepted) {
        const form = new FormData(); form.append('file', file); form.append('world', world);
        const response = await fetch('/api/world-design/upload', { method: 'POST', headers: { 'x-harmonic-studio-key': resolved }, body: form });
        const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Upload failed');
        next = { ...next, media: [...next.media, { id: crypto.randomUUID(), name: file.name, url: data.url, kind: data.type, placement: 'floating' as MediaPlacement, x: 50, y: 50, width: 40, opacity: 100, rotation: 0, zIndex: 10, loop: true, muted: true, fit: 'contain', motion: 'none', duration: 6, delay: 0 }] };
      }
      apply(next); setMessage('Media uploaded into the private draft.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Upload failed.'); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ''; }
  }
  function onDrop(event: DragEvent<HTMLDivElement>) { event.preventDefault(); void uploadFiles(event.dataTransfer.files); }
  function removeAsset(id: string) { apply({ ...active, media: active.media.filter((asset) => asset.id !== id) }); }

  return <main className="min-h-screen overflow-x-auto bg-[#050308] text-white">
    <header className="sticky top-0 z-50 flex min-w-[1550px] items-center justify-between gap-3 border-b border-white/10 bg-black/90 px-4 py-3 backdrop-blur-xl">
      <div><p className="text-[10px] font-black uppercase tracking-[.28em] text-purple-300/60">Harmonic OS</p><h1 className="text-2xl font-black">Creator Studio · Phase 4</h1></div>
      <div className="flex items-center gap-2"><span className="rounded-full border border-white/10 px-3 py-2 text-xs font-black text-white/55">{cloudStatus}</span><button onClick={undo} disabled={!history.canUndo} className="rounded-full border border-white/15 px-4 py-2 text-xs font-black disabled:opacity-30">Undo</button><button onClick={redo} disabled={!history.canRedo} className="rounded-full border border-white/15 px-4 py-2 text-xs font-black disabled:opacity-30">Redo</button><button onClick={() => void persist('draft')} className="rounded-full border border-white/15 px-4 py-2 text-xs font-black">Save Draft</button><button onClick={() => void persist('publish')} className="rounded-full bg-purple-200 px-4 py-2 text-xs font-black text-black">Publish</button></div>
    </header>

    <div className="grid min-h-[calc(100vh-69px)] min-w-[1550px] grid-cols-[220px_350px_minmax(450px,1fr)_minmax(450px,1fr)]">
      <aside className="border-r border-white/10 bg-black/35 p-4"><p className="mb-3 text-[10px] font-black uppercase tracking-[.22em] text-white/35">Pages & worlds</p><div className="grid gap-2">{worlds.map((item) => <button key={item.key} onClick={() => switchWorld(item.key)} className={`rounded-2xl border p-4 text-left ${world === item.key ? 'border-purple-300 bg-purple-300/15' : 'border-white/10 bg-white/[.025]'}`}><b>{item.label}</b><span className="mt-1 block text-xs text-white/40">Complete visual control</span></button>)}</div><div className="mt-5 rounded-2xl border border-white/10 p-4"><label className="text-[10px] font-black uppercase tracking-[.18em] text-white/40">Studio Secret</label><input type="password" value={secret} onChange={(event) => setSecret(event.target.value)} placeholder="Upload, save, publish" className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-xs" /></div><button onClick={() => setDirectEdit((value) => !value)} className="mt-4 w-full rounded-2xl border border-purple-300/25 bg-purple-300/[.06] p-4 text-left text-sm font-black">{directEdit ? 'Return to real page preview' : 'Direct drag & resize mode'}</button></aside>

      <aside className="overflow-auto border-r border-white/10 bg-black/45 p-4"><div className="rounded-2xl border border-purple-300/20 bg-purple-300/[.06] p-4"><p className="text-[10px] font-black uppercase tracking-[.18em] text-purple-200/60">Editing</p><h2 className="mt-1 text-2xl font-black">{worldInfo.label}</h2><p className="mt-2 text-xs leading-5 text-white/45">{message}</p></div><div className="mt-4 grid grid-cols-4 gap-1">{(['content','colors','assets','history'] as const).map((item) => <button key={item} onClick={() => { setTab(item); if (item === 'history') void loadVersions(world); }} className={`rounded-xl px-2 py-2 text-[10px] font-black uppercase ${tab === item ? 'bg-white text-black' : 'border border-white/10'}`}>{item}</button>)}</div>
        {tab === 'content' && <section className="mt-4 grid gap-3"><Field label="Title" value={active.title ?? ''} onChange={(title) => patch({ title })} /><Area label="Description" value={active.subtitle ?? ''} onChange={(subtitle) => patch({ subtitle })} /><Field label="Eyebrow" value={active.labels.eyebrow ?? ''} onChange={(value) => patchLabel('eyebrow', value)} /></section>}
        {tab === 'colors' && <section className="mt-4 grid grid-cols-2 gap-3">{(['primary','secondary','accent','background','surface','text','muted','border','glow'] as const).map((key) => <ColorField key={key} label={key} value={active[key]} onChange={(value) => patch({ [key]: value })} />)}</section>}
        {tab === 'assets' && <section className="mt-4"><div onDragOver={(event) => event.preventDefault()} onDrop={onDrop} onClick={() => fileRef.current?.click()} className="cursor-pointer rounded-2xl border border-dashed border-purple-300/40 p-6 text-center"><b>{uploading ? 'Uploading…' : 'Drag & drop media'}</b><p className="mt-2 text-xs text-white/40">Images, GIFs, and loop videos</p><input ref={fileRef} hidden type="file" multiple accept="image/*,video/*" onChange={(event) => event.target.files && void uploadFiles(event.target.files)} /></div><div className="mt-3 grid gap-2">{active.media.map((asset) => <div key={asset.id} className="flex items-center justify-between rounded-xl border border-white/10 p-3"><div><b className="text-xs">{asset.name}</b><p className="text-[10px] text-white/35">{asset.kind} · {asset.placement}</p></div><button onClick={() => removeAsset(asset.id)} className="text-xs font-black text-red-200">Remove</button></div>)}</div></section>}
        {tab === 'history' && <section className="mt-4"><p className="mb-3 text-xs text-white/40">Local undo steps: {history.historyLength}. Published versions appear below.</p><div className="grid gap-2">{versions.length ? versions.map((version) => <button key={version.id} onClick={async () => { const ok = await restoreVersion(world, version.id, secret); if (ok) { history.replace(version.settings); refreshDraft(); setMessage(`Restored version ${version.version}.`); } }} className="rounded-xl border border-white/10 p-3 text-left"><b className="text-sm">Version {version.version}</b><p className="text-[10px] text-white/35">{version.label} · {new Date(version.created_at).toLocaleString()}</p></button>) : <p className="rounded-xl border border-dashed border-white/10 p-4 text-xs text-white/35">No saved cloud versions yet.</p>}</div></section>}
        <section className="mt-6"><h3 className="text-sm font-black uppercase tracking-[.16em] text-white/45">AI design generator</h3><p className="mt-2 text-xs leading-5 text-white/40">Every proposal stays separate until accepted.</p><div className="mt-3 grid grid-cols-2 gap-2">{presets.map((preset) => <button key={preset.id} onClick={() => generateProposal(preset.id)} className="rounded-2xl border border-white/10 p-3 text-left hover:border-purple-300/40"><b className="text-sm">{preset.label}</b><span className="mt-1 block text-[10px] leading-4 text-white/35">{preset.description}</span></button>)}</div></section>
      </aside>

      {directEdit ? <section className="overflow-auto bg-[#09060d] p-4"><PanelHeader title="Direct Edit Canvas" subtitle="Drag, resize, reorder, hide, and animate sections." /><div className="h-[calc(100vh-155px)] min-h-[700px] overflow-hidden rounded-[2rem] border border-white/10"><iframe title="Direct visual editor" src={`/studio/visual?world=${world}`} className="h-full w-full border-0" /></div></section> : <PreviewPanel title="Current Live Draft" subtitle="Text, color, and media changes update here immediately." viewport={viewport} setViewport={setViewport} frameWidth={frameWidth} url={currentUrl} status="CURRENT" />}

      <section className="overflow-auto border-l border-white/10 bg-[#07040b] p-4"><PanelHeader title="AI Proposal Preview" subtitle="Always visible beside the current draft" badge={proposal?.label} />{proposal ? <><div className="mb-3 grid grid-cols-3 gap-2"><button onClick={regenerate} className="rounded-xl border border-white/15 px-3 py-3 text-xs font-black">Regenerate</button><button onClick={rejectProposal} className="rounded-xl border border-red-300/25 px-3 py-3 text-xs font-black text-red-200">Reject</button><button onClick={acceptProposal} className="rounded-xl bg-purple-200 px-3 py-3 text-xs font-black text-black">Accept Draft</button></div><div className="mx-auto h-[calc(100vh-205px)] min-h-[650px] overflow-hidden rounded-[2rem] border border-purple-300/25 bg-black" style={{ width: frameWidth, maxWidth: '100%' }}><iframe key={proposalUrl} title={`${worldInfo.label} AI proposal`} src={proposalUrl} className="h-full w-full border-0" /></div></> : <div className="grid h-[calc(100vh-155px)] min-h-[700px] place-items-center rounded-[2rem] border border-dashed border-white/15 bg-white/[.02] p-8 text-center"><div><p className="text-5xl">✦</p><h3 className="mt-4 text-2xl font-black">No AI proposal yet</h3><p className="mt-2 max-w-sm text-sm leading-6 text-white/40">Choose a style from the controls. It will render here without replacing your draft.</p></div></div>}</section>
    </div>
  </main>;
}

function PanelHeader({ title, subtitle, badge }: { title: string; subtitle: string; badge?: string }) { return <div className="mb-3 flex min-h-[66px] items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/70 p-3"><div><b>{title}</b><p className="text-[10px] text-white/40">{subtitle}</p></div>{badge && <span className="rounded-full bg-purple-200 px-3 py-2 text-[10px] font-black text-black">{badge}</span>}</div>; }
function PreviewPanel({ title, subtitle, viewport, setViewport, frameWidth, url, status }: { title: string; subtitle: string; viewport: Viewport; setViewport: (value: Viewport) => void; frameWidth: string; url: string; status: string }) { return <section className="overflow-auto bg-[#09060d] p-4"><div className="mb-3 flex min-h-[66px] flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/70 p-3"><div><div className="flex items-center gap-2"><b>{title}</b><span className="rounded-full border border-emerald-300/30 px-2 py-1 text-[9px] font-black text-emerald-200">{status}</span></div><p className="text-[10px] text-white/40">{subtitle}</p></div><div className="flex gap-2">{(['desktop','tablet','mobile'] as const).map((item) => <button key={item} onClick={() => setViewport(item)} className={`rounded-full px-3 py-2 text-xs font-black ${viewport === item ? 'bg-white text-black' : 'border border-white/10'}`}>{item}</button>)}</div></div><div className="mx-auto h-[calc(100vh-155px)] min-h-[700px] overflow-hidden rounded-[2rem] border border-white/10 bg-black" style={{ width: frameWidth, maxWidth: '100%' }}><iframe key={url} title={title} src={url} className="h-full w-full border-0" /></div></section>; }
function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="grid gap-2 text-xs font-black uppercase tracking-[.12em] text-white/45">{label}<input value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white" /></label>; }
function Area({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="grid gap-2 text-xs font-black uppercase tracking-[.12em] text-white/45">{label}<textarea rows={3} value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white" /></label>; }
function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3 text-[10px] font-black uppercase tracking-[.1em] text-white/55">{label}<input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-8 w-10 rounded border-0 bg-transparent" /></label>; }
