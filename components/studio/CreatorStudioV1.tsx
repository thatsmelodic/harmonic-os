'use client';

import { useMemo, useRef, useState, type DragEvent, type CSSProperties } from 'react';
import Link from 'next/link';
import {
  createStudioSections,
  moveStudioSection,
  parseStudioSections,
  readElementStyle,
  writeElementStyle,
  type StudioElementStyle,
  type StudioMotion,
} from '@/lib/creator-studio-model';
import {
  useWorldCustomization,
  type MediaPlacement,
  type WorldKey,
  type WorldMediaAsset,
} from '@/components/studio/WorldCustomizationProvider';

const worlds: Array<{ key: WorldKey; label: string; route: string }> = [
  { key: 'home', label: 'Homepage', route: '/' },
  { key: 'schmackinn', label: 'Schmackinn', route: '/worlds/schmackinn' },
  { key: 'fried-em', label: 'Fried Em', route: '/worlds/fried-em' },
  { key: 'melodic', label: 'Melodic', route: '/worlds/melodic' },
  { key: 'two-harmonic', label: '2 Harmonic', route: '/worlds/two-harmonic' },
  { key: 'global', label: 'Global System', route: '/' },
];

const mediaPlacements: MediaPlacement[] = ['background', 'hero', 'logo', 'floating', 'section'];
const motionOptions: StudioMotion[] = ['none', 'fade', 'slide-up', 'float', 'pulse', 'spin', 'parallax'];
const studioSecretKey = 'harmonic-studio-secret-session';

export function CreatorStudioV1() {
  const {
    settings,
    updateWorld,
    updateLabel,
    addMedia,
    updateMedia,
    removeMedia,
    saveDraft,
    publishWorld,
    cloudStatus,
  } = useWorldCustomization();
  const [world, setWorld] = useState<WorldKey>('home');
  const [selectedId, setSelectedId] = useState('hero');
  const [tab, setTab] = useState<'content' | 'appearance' | 'layout' | 'motion' | 'media' | 'structure'>('content');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState('Select anything in the canvas to edit it without code.');
  const [uploading, setUploading] = useState(false);
  const [mediaPlacement, setMediaPlacement] = useState<MediaPlacement>('section');
  const inputRef = useRef<HTMLInputElement>(null);

  const active = settings[world];
  const sections = useMemo(
    () => parseStudioSections(active.labels.sectionStructure, world),
    [active.labels.sectionStructure, world],
  );
  const selectedSection = sections.find((section) => section.id === selectedId) ?? sections[0];
  const selectedStyle = readElementStyle(active.labels, selectedSection?.id ?? 'hero');
  const worldInfo = worlds.find((item) => item.key === world) ?? worlds[0];

  function patchStyle(patch: Partial<StudioElementStyle>) {
    if (!selectedSection) return;
    updateLabel(world, `studio.style.${selectedSection.id}`, writeElementStyle({ ...selectedStyle, ...patch }));
  }

  function saveSections(next: typeof sections) {
    updateLabel(world, 'sectionStructure', JSON.stringify(next));
  }

  function toggleSection(id: string) {
    saveSections(sections.map((section) => section.id === id ? { ...section, visible: !section.visible } : section));
  }

  async function uploadFiles(files: FileList | File[]) {
    const accepted = Array.from(files).filter((file) => file.type.startsWith('image/') || file.type.startsWith('video/'));
    if (!accepted.length) {
      setMessage('Use JPG, PNG, SVG, WEBP, GIF, MP4, WEBM, or MOV media.');
      return;
    }
    const resolvedSecret = secret || window.sessionStorage.getItem(studioSecretKey) || '';
    if (!resolvedSecret) {
      setMessage('Enter the Studio Secret once before uploading. Local text, colors, layout, and motion still work without it.');
      setTab('media');
      return;
    }
    setUploading(true);
    try {
      for (const file of accepted) {
        const form = new FormData();
        form.append('file', file);
        form.append('world', world);
        const response = await fetch('/api/world-design/upload', {
          method: 'POST',
          headers: { 'x-harmonic-studio-key': resolvedSecret },
          body: form,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Upload failed');
        addMedia(world, {
          name: file.name,
          url: data.url,
          kind: data.type,
          placement: mediaPlacement,
          section: selectedSection?.id,
          x: 50,
          y: 50,
          width: mediaPlacement === 'background' ? 100 : 42,
          opacity: 100,
          rotation: 0,
          zIndex: mediaPlacement === 'background' ? 0 : 10,
          loop: true,
          muted: true,
          fit: mediaPlacement === 'background' ? 'cover' : 'contain',
          motion: 'none',
          duration: 6,
          delay: 0,
        });
      }
      window.sessionStorage.setItem(studioSecretKey, resolvedSecret);
      setMessage('Media uploaded and attached to the selected canvas section.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Upload failed.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    void uploadFiles(event.dataTransfer.files);
  }

  async function persist(mode: 'draft' | 'publish') {
    const resolvedSecret = secret || window.sessionStorage.getItem(studioSecretKey) || '';
    if (!resolvedSecret) {
      setMessage('Enter the Studio Secret before saving or publishing.');
      return;
    }
    window.sessionStorage.setItem(studioSecretKey, resolvedSecret);
    setMessage(mode === 'draft' ? 'Saving draft…' : 'Publishing world…');
    const ok = mode === 'draft'
      ? await saveDraft(world, resolvedSecret)
      : await publishWorld(world, resolvedSecret, `${worldInfo.label} Creator Studio publish`);
    setMessage(ok ? (mode === 'draft' ? 'Draft saved.' : 'Published successfully.') : 'Save failed. Check the secret and Supabase configuration.');
  }

  const canvasWidth = viewport === 'desktop' ? '100%' : viewport === 'tablet' ? '768px' : '390px';

  return (
    <main className="min-h-screen bg-[#050308] text-white">
      <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/90 px-4 py-3 backdrop-blur-xl">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.28em] text-purple-300/60">Harmonic OS</p>
          <h1 className="text-2xl font-black">Creator Studio v1</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/10 px-3 py-2 text-xs font-black text-white/60">{cloudStatus}</span>
          <button onClick={() => void persist('draft')} className="rounded-full border border-white/15 px-4 py-2 text-xs font-black">Save Draft</button>
          <button onClick={() => void persist('publish')} className="rounded-full bg-purple-200 px-4 py-2 text-xs font-black text-black">Publish</button>
          <Link href={worldInfo.route} className="rounded-full border border-white/15 px-4 py-2 text-xs font-black">View Page ↗</Link>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-69px)] xl:grid-cols-[220px_390px_1fr]">
        <aside className="border-r border-white/10 bg-black/35 p-4">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[.22em] text-white/35">Pages and worlds</p>
          <div className="grid gap-2">
            {worlds.map((item) => (
              <button key={item.key} onClick={() => { setWorld(item.key); setSelectedId(createStudioSections(item.key)[0]?.id ?? 'hero'); }} className={`rounded-2xl border p-4 text-left ${world === item.key ? 'border-purple-300 bg-purple-300/15' : 'border-white/10 bg-white/[.025]'}`}>
                <b>{item.label}</b>
                <span className="mt-1 block text-xs text-white/40">Full visual configuration</span>
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 p-4">
            <label className="text-[10px] font-black uppercase tracking-[.18em] text-white/40">Studio Secret</label>
            <input type="password" value={secret} onChange={(event) => setSecret(event.target.value)} placeholder="Required only to upload/save/publish" className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-xs" />
          </div>
        </aside>

        <section className="border-r border-white/10 bg-[#09060d] p-4">
          <div className="mb-4 flex gap-2 overflow-x-auto">
            {(['content', 'appearance', 'layout', 'motion', 'media', 'structure'] as const).map((item) => (
              <button key={item} onClick={() => setTab(item)} className={`rounded-full px-4 py-2 text-xs font-black capitalize ${tab === item ? 'bg-white text-black' : 'border border-white/10'}`}>{item}</button>
            ))}
          </div>

          <div className="mb-4 rounded-2xl border border-purple-300/20 bg-purple-300/[.06] p-4">
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-purple-200/60">Selected</p>
            <h2 className="mt-1 text-xl font-black">{selectedSection?.label ?? worldInfo.label}</h2>
            <p className="mt-2 text-xs leading-5 text-white/45">{message}</p>
          </div>

          {tab === 'content' && <div className="grid gap-3">
            <Field label="Page / World Title" value={active.title ?? ''} onChange={(title) => updateWorld(world, { title })} />
            <Area label="Description" value={active.subtitle ?? ''} onChange={(subtitle) => updateWorld(world, { subtitle })} />
            <Field label="Eyebrow" value={active.labels.eyebrow ?? ''} onChange={(value) => updateLabel(world, 'eyebrow', value)} />
            <Field label="Primary Button" value={active.labels.primaryCta ?? ''} onChange={(value) => updateLabel(world, 'primaryCta', value)} />
            <Field label="Selected Section Heading" value={active.labels[`${selectedSection?.id}.title`] ?? selectedSection?.label ?? ''} onChange={(value) => selectedSection && updateLabel(world, `${selectedSection.id}.title`, value)} />
            <Area label="Selected Section Copy" value={active.labels[`${selectedSection?.id}.description`] ?? ''} onChange={(value) => selectedSection && updateLabel(world, `${selectedSection.id}.description`, value)} />
          </div>}

          {tab === 'appearance' && <div className="grid gap-3 sm:grid-cols-2">
            {(['primary', 'secondary', 'accent', 'background', 'surface', 'text', 'muted', 'border', 'glow'] as const).map((key) => <ColorField key={key} label={key} value={active[key]} onChange={(value) => updateWorld(world, { [key]: value })} />)}
            <Range label="Opacity" value={selectedStyle.opacity} min={0} max={100} onChange={(opacity) => patchStyle({ opacity })} />
            <Range label="Blur" value={selectedStyle.blur} min={0} max={30} onChange={(blur) => patchStyle({ blur })} />
            <Range label="Glow" value={selectedStyle.glow} min={0} max={100} onChange={(glow) => patchStyle({ glow })} />
          </div>}

          {tab === 'layout' && <div className="grid gap-3 sm:grid-cols-2">
            <Range label="Width %" value={selectedStyle.width} min={20} max={100} onChange={(width) => patchStyle({ width })} />
            <Range label="Minimum height" value={selectedStyle.minHeight} min={60} max={700} onChange={(minHeight) => patchStyle({ minHeight })} />
            <Range label="Padding" value={selectedStyle.padding} min={0} max={100} onChange={(padding) => patchStyle({ padding })} />
            <Range label="Corner radius" value={selectedStyle.radius} min={0} max={80} onChange={(radius) => patchStyle({ radius })} />
            <Range label="Horizontal position" value={selectedStyle.x} min={0} max={100} onChange={(x) => patchStyle({ x })} />
            <Range label="Vertical position" value={selectedStyle.y} min={0} max={100} onChange={(y) => patchStyle({ y })} />
          </div>}

          {tab === 'motion' && <div className="grid gap-3">
            <Select label="Section motion" value={selectedStyle.motion} options={motionOptions} onChange={(motion) => patchStyle({ motion: motion as StudioMotion })} />
            <Select label="Page entrance" value={active.labels.entryMotion ?? 'fade'} options={motionOptions} onChange={(value) => updateLabel(world, 'entryMotion', value)} />
            <Select label="Hover behavior" value={active.labels.hoverMotion ?? 'glow'} options={['none', 'lift', 'glow', 'scale', 'tilt']} onChange={(value) => updateLabel(world, 'hoverMotion', value)} />
          </div>}

          {tab === 'media' && <div className="grid gap-4">
            <Select label="Attach upload as" value={mediaPlacement} options={mediaPlacements} onChange={(value) => setMediaPlacement(value as MediaPlacement)} />
            <div onDragOver={(event) => event.preventDefault()} onDrop={onDrop} onClick={() => inputRef.current?.click()} className="cursor-pointer rounded-[2rem] border border-dashed border-purple-300/40 bg-purple-300/[.06] p-8 text-center">
              <b>{uploading ? 'Uploading…' : 'Drag and drop media'}</b>
              <p className="mt-2 text-xs text-white/45">JPG, PNG, SVG, WEBP, GIF, MP4, WEBM, MOV</p>
              <input ref={inputRef} hidden type="file" multiple accept="image/*,video/*" onChange={(event) => event.target.files && void uploadFiles(event.target.files)} />
            </div>
            <div className="grid gap-2">
              {active.media.map((asset) => <MediaRow key={asset.id} asset={asset} onChange={(patch) => updateMedia(world, asset.id, patch)} onRemove={() => removeMedia(world, asset.id)} />)}
            </div>
          </div>}

          {tab === 'structure' && <div className="grid gap-2">
            {sections.map((section, index) => (
              <div key={section.id} className={`grid grid-cols-[1fr_auto] gap-3 rounded-2xl border p-3 ${selectedId === section.id ? 'border-purple-300 bg-purple-300/10' : 'border-white/10'}`}>
                <button onClick={() => setSelectedId(section.id)} className="text-left"><b>{section.label}</b><span className="block text-xs text-white/35">{section.kind}</span></button>
                <div className="flex gap-1">
                  <button onClick={() => saveSections(moveStudioSection(sections, section.id, -1))} disabled={index === 0} className="rounded-lg border border-white/10 px-2 disabled:opacity-30">↑</button>
                  <button onClick={() => saveSections(moveStudioSection(sections, section.id, 1))} disabled={index === sections.length - 1} className="rounded-lg border border-white/10 px-2 disabled:opacity-30">↓</button>
                  <button onClick={() => toggleSection(section.id)} className="rounded-lg border border-white/10 px-2">{section.visible ? 'Hide' : 'Show'}</button>
                </div>
              </div>
            ))}
          </div>}
        </section>

        <section className="relative overflow-auto bg-[#020104] p-4">
          <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/70 p-3">
            <div><b>Live Draft Canvas</b><p className="text-[10px] text-white/40">Click a section to edit it</p></div>
            <div className="flex gap-2">{(['desktop', 'tablet', 'mobile'] as const).map((item) => <button key={item} onClick={() => setViewport(item)} className={`rounded-full px-3 py-2 text-xs font-black ${viewport === item ? 'bg-white text-black' : 'border border-white/10'}`}>{item}</button>)}</div>
          </div>
          <div className="mx-auto min-h-[760px] overflow-hidden rounded-[2rem] border transition-all" style={{ width: canvasWidth, maxWidth: '100%', background: active.background, borderColor: active.border, color: active.text, boxShadow: `0 0 70px ${active.glow}33` }}>
            <CanvasHeader title={active.title ?? worldInfo.label} subtitle={active.subtitle ?? ''} accent={active.primary} />
            <div className="relative p-4 sm:p-6">
              {active.media.filter((asset) => asset.placement === 'background').map((asset) => <CanvasMedia key={asset.id} asset={asset} />)}
              <div className="relative z-10 grid gap-4">
                {sections.filter((section) => section.visible).sort((a, b) => a.order - b.order).map((section) => {
                  const style = readElementStyle(active.labels, section.id);
                  const selected = selectedId === section.id;
                  const css = {
                    width: `${style.width}%`,
                    minHeight: style.minHeight,
                    padding: style.padding,
                    borderRadius: style.radius,
                    opacity: style.opacity / 100,
                    filter: `blur(${style.blur}px)`,
                    borderColor: selected ? active.primary : active.border,
                    background: active.surface,
                    boxShadow: selected ? `0 0 ${Math.max(18, style.glow)}px ${active.glow}66` : `0 0 ${style.glow}px ${active.glow}22`,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  } as CSSProperties;
                  return <button key={section.id} onClick={() => setSelectedId(section.id)} data-studio-section={section.id} className="relative overflow-hidden border text-left transition hover:-translate-y-0.5" style={css}>
                    <p className="text-[10px] font-black uppercase tracking-[.2em]" style={{ color: active.secondary }}>{section.kind}</p>
                    <h3 className="mt-2 text-2xl font-black">{active.labels[`${section.id}.title`] || section.label}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6" style={{ color: active.muted }}>{active.labels[`${section.id}.description`] || `Edit the ${section.label} content, appearance, layout, media, and motion from the controls.`}</p>
                    {active.media.filter((asset) => asset.section === section.id && asset.placement !== 'background').map((asset) => <CanvasMedia key={asset.id} asset={asset} />)}
                    {selected && <span className="absolute right-3 top-3 rounded-full px-2 py-1 text-[9px] font-black uppercase" style={{ background: active.primary, color: active.background }}>Editing</span>}
                  </button>;
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function CanvasHeader({ title, subtitle, accent }: { title: string; subtitle: string; accent: string }) {
  return <header className="border-b border-white/10 p-6"><p className="text-[10px] font-black uppercase tracking-[.25em]" style={{ color: accent }}>Harmonic OS · Live draft</p><h2 className="mt-3 text-4xl font-black">{title}</h2><p className="mt-2 max-w-2xl text-sm text-white/55">{subtitle}</p></header>;
}

function CanvasMedia({ asset }: { asset: WorldMediaAsset }) {
  const style = { width: `${asset.width}%`, opacity: asset.opacity / 100, transform: `rotate(${asset.rotation}deg)`, zIndex: asset.zIndex } as CSSProperties;
  return <div className="relative mt-4" style={style}>{asset.kind === 'video' ? <video src={asset.url} autoPlay loop={asset.loop} muted={asset.muted} className={`w-full rounded-xl object-${asset.fit}`} /> : <img src={asset.url} alt={asset.name} className={`w-full rounded-xl object-${asset.fit}`} />}</div>;
}

function MediaRow({ asset, onChange, onRemove }: { asset: WorldMediaAsset; onChange: (patch: Partial<WorldMediaAsset>) => void; onRemove: () => void }) {
  return <div className="rounded-2xl border border-white/10 p-3"><div className="flex items-center justify-between gap-3"><div><b className="text-sm">{asset.name}</b><p className="text-xs text-white/35">{asset.kind} · {asset.placement}{asset.section ? ` · ${asset.section}` : ''}</p></div><button onClick={onRemove} className="rounded-full border border-red-300/20 px-3 py-2 text-xs font-black text-red-200">Remove</button></div><div className="mt-3 grid gap-2 sm:grid-cols-3"><Range label="Width" value={asset.width} min={10} max={100} onChange={(width) => onChange({ width })} /><Range label="Opacity" value={asset.opacity} min={0} max={100} onChange={(opacity) => onChange({ opacity })} /><Select label="Fit" value={asset.fit} options={['cover', 'contain']} onChange={(fit) => onChange({ fit: fit as WorldMediaAsset['fit'] })} /></div></div>;
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="grid gap-2 text-xs font-black uppercase tracking-[.12em] text-white/45">{label}<input value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white" /></label>;
}
function Area({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="grid gap-2 text-xs font-black uppercase tracking-[.12em] text-white/45">{label}<textarea rows={4} value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white" /></label>;
}
function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3 text-xs font-black uppercase tracking-[.12em] text-white/55">{label}<input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-9 w-14 rounded border-0 bg-transparent" /></label>;
}
function Range({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return <label className="grid gap-2 text-xs font-black uppercase tracking-[.12em] text-white/45"><span className="flex justify-between"><span>{label}</span><output>{value}</output></span><input type="range" value={value} min={min} max={max} onChange={(event) => onChange(Number(event.target.value))} /></label>;
}
function Select({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label className="grid gap-2 text-xs font-black uppercase tracking-[.12em] text-white/45">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-white/10 bg-black px-4 py-3 text-sm normal-case tracking-normal text-white">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}
