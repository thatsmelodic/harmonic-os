'use client';

import { useEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { useWorldCustomization, type WorldKey, type WorldMediaAsset } from '@/components/studio/WorldCustomizationProvider';

const worlds: Array<{ key: WorldKey; label: string; path: string }> = [
  { key: 'home', label: 'Homepage', path: '/' },
  { key: 'melodic', label: 'Melodic', path: '/worlds/melodic' },
  { key: 'two-harmonic', label: '2 Harmonic', path: '/worlds/harmonic' },
  { key: 'fried-em', label: 'Fried Em', path: '/worlds/fried-em' },
  { key: 'schmackinn', label: 'Schmackinn', path: '/worlds/schmackinn' },
  { key: 'global', label: 'Global System', path: '/' },
];

const categories = [
  { key: 'layout', label: 'Layout & AI', description: 'Arrange assets and preview layout suggestions before applying.' },
  { key: 'motion', label: 'Motion & Animation', description: 'Entrance, loop, hover, parallax, and scroll behavior.' },
  { key: 'themes', label: 'Themes & Presets', description: 'Coordinated color, atmosphere, season, and energy presets.' },
  { key: 'timeline', label: 'Draft, Publish & Versions', description: 'Private drafts, intentional publishing, scheduling, and restore points.' },
  { key: 'assets', label: 'Asset Library', description: 'Reuse logos, backgrounds, GIFs, videos, bubbles, and visual layers.' },
  { key: 'preview', label: 'Device Preview', description: 'Review phone, tablet, desktop, and ultrawide drafts.' },
] as const;

type Category = typeof categories[number]['key'];
type Version = { id: string; name: string; createdAt: number; settings: unknown };
const SECRET_KEY = 'harmonic-studio-secret-session';

export function Phase4LivingRuntimeStudio() {
  const { settings, updateWorld, updateLabel, updateMedia, addMedia, saveWorldToCloud, cloudStatus } = useWorldCustomization();
  const [world, setWorld] = useState<WorldKey>('two-harmonic');
  const [category, setCategory] = useState<Category>('layout');
  const [device, setDevice] = useState<'phone' | 'tablet' | 'desktop' | 'wide'>('phone');
  const [secret, setSecret] = useState('');
  const [versions, setVersions] = useState<Version[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const active = settings[world];
  const worldInfo = useMemo(() => worlds.find((item) => item.key === world)!, [world]);
  const versionKey = `harmonic-phase4-versions-${world}`;

  useEffect(() => setSecret(window.sessionStorage.getItem(SECRET_KEY) || ''), []);
  useEffect(() => { if (secret) window.sessionStorage.setItem(SECRET_KEY, secret); }, [secret]);
  useEffect(() => {
    try { setVersions(JSON.parse(window.localStorage.getItem(versionKey) || '[]') as Version[]); }
    catch { setVersions([]); }
  }, [versionKey]);

  const phase = (key: string, fallback = '') => active.labels[`phase4.${key}`] || fallback;
  const setPhase = (key: string, value: string) => updateLabel(world, `phase4.${key}`, value);

  function applyLayout(name: string) {
    const ordered = [...active.media].sort((a, b) => a.zIndex - b.zIndex);
    ordered.forEach((asset, index) => {
      let patch: Partial<WorldMediaAsset>;
      if (name === 'editorial') patch = { x: index % 2 ? 68 : 32, y: 20 + index * 18, width: index === 0 ? 58 : 36, rotation: 0 };
      else if (name === 'luxury') patch = { x: 50, y: 22 + index * 16, width: index === 0 ? 62 : 28, rotation: 0 };
      else if (name === 'minimal') patch = { x: 50, y: 28 + index * 20, width: index === 0 ? 48 : 24, rotation: 0 };
      else if (name === 'experimental') patch = { x: 20 + ((index * 27) % 65), y: 18 + ((index * 19) % 68), width: 22 + ((index * 9) % 32), rotation: -12 + index * 7 };
      else patch = { x: index % 2 ? 72 : 28, y: 24 + index * 14, width: index === 0 ? 72 : 30, rotation: index % 2 ? 3 : -3 };
      updateMedia(world, asset.id, patch);
    });
    setPhase('layout', name);
  }

  function applyPreset(name: string) {
    if (name === 'energy') updateWorld(world, { primary:'#ff4d00', secondary:'#ffd500', accent:'#ff2d95', background:'#050507', surface:'#171019', text:'#ffffff', muted:'#d7c8db', border:'#7a2448', glow:'#ff3cac' });
    else if (name === 'midnight') updateWorld(world, { primary:'#7c3aed', secondary:'#22d3ee', accent:'#c084fc', background:'#03040a', surface:'#0c1020', text:'#f8fafc', muted:'#9ca3af', border:'#24345f', glow:'#4f46e5' });
    else if (name === 'organic') updateWorld(world, { primary:'#84a98c', secondary:'#e9c46a', accent:'#f4a261', background:'#08110c', surface:'#132219', text:'#f4fff7', muted:'#b7c8bb', border:'#34543e', glow:'#84a98c' });
    else if (name === 'monochrome') updateWorld(world, { primary:'#ffffff', secondary:'#b4b4b4', accent:'#e5e5e5', background:'#050505', surface:'#151515', text:'#ffffff', muted:'#a3a3a3', border:'#333333', glow:'#ffffff' });
    else updateWorld(world, { primary:'#d6b36a', secondary:'#f4ead5', accent:'#fff7df', background:'#080705', surface:'#18130c', text:'#fffaf0', muted:'#b9ad98', border:'#59472b', glow:'#d6b36a' });
    setPhase('theme', name);
  }

  function saveDraft() {
    const snapshot: Version = { id: crypto.randomUUID(), name: `Draft ${new Date().toLocaleString()}`, createdAt: Date.now(), settings: active };
    const next = [snapshot, ...versions].slice(0, 20);
    setVersions(next);
    window.localStorage.setItem(versionKey, JSON.stringify(next));
    setPhase('status', 'draft');
    alert(`${worldInfo.label} draft saved privately.`);
  }

  async function publish() {
    if (!secret) return alert('Enter the Studio Secret under Draft, Publish & Versions first.');
    const ok = await saveWorldToCloud(world, secret);
    if (!ok) return alert('Publish failed. Confirm the Studio Secret.');
    const snapshot: Version = { id: crypto.randomUUID(), name: `Published ${new Date().toLocaleString()}`, createdAt: Date.now(), settings: active };
    const next = [snapshot, ...versions].slice(0, 20);
    setVersions(next);
    window.localStorage.setItem(versionKey, JSON.stringify(next));
    setPhase('status', 'live');
    alert(`${worldInfo.label} published live.`);
  }

  function restore(version: Version) {
    updateWorld(world, version.settings as typeof active);
    setPhase('status', 'draft');
    alert('Version restored as a private draft.');
  }

  function moveAsset(event: PointerEvent<HTMLDivElement>) {
    if (!dragging || !stageRef.current) return;
    const asset = active.media.find((item) => item.id === dragging);
    if (!asset) return;
    const box = stageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - box.left) / box.width) * 100));
    const y = Math.max(0, Math.min(100, ((event.clientY - box.top) / box.height) * 100));
    updateMedia(world, asset.id, { x, y });
  }

  return <div className="mx-auto max-w-7xl pb-28 text-white">
    <header className="rounded-[2.6rem] border border-white/10 bg-black/50 p-6 backdrop-blur-2xl sm:p-9">
      <p className="text-xs font-black uppercase tracking-[.34em] text-white/35">World Design & Copy · Phase 4</p>
      <h1 className="mt-3 text-5xl font-black tracking-[-.07em] sm:text-7xl">Living Runtime Engine</h1>
      <p className="mt-4 max-w-3xl leading-8 text-white/55">Draft first, preview every system choice, then publish intentionally. Every option stays grouped beneath the feature it controls.</p>
    </header>

    <div className="mt-6 grid gap-5 lg:grid-cols-[290px_1fr]">
      <aside className="h-fit rounded-[2rem] border border-white/10 bg-black/50 p-4 lg:sticky lg:top-5">
        <SmallLabel>Choose World</SmallLabel>
        <div className="mt-3 grid gap-2">{worlds.map((item) => <button key={item.key} onClick={() => setWorld(item.key)} className={`rounded-2xl border p-4 text-left ${world === item.key ? 'border-purple-200/50 bg-purple-300/15' : 'border-white/10 bg-white/[.025]'}`}><b>{item.label}</b><span className="mt-1 block text-xs text-white/35">Edit this world’s complete experience.</span></button>)}</div>
        <SmallLabel className="mt-6">Feature Categories</SmallLabel>
        <div className="mt-3 grid gap-2">{categories.map((item) => <button key={item.key} onClick={() => setCategory(item.key)} className={`rounded-2xl border p-4 text-left ${category === item.key ? 'border-white/30 bg-white text-black' : 'border-white/10 bg-white/[.025]'}`}><b>{item.label}</b><span className={`mt-1 block text-xs leading-5 ${category === item.key ? 'text-black/55' : 'text-white/35'}`}>{item.description}</span></button>)}</div>
      </aside>

      <main className="rounded-[2.5rem] border border-white/10 bg-black/50 p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><SmallLabel>Editing</SmallLabel><h2 className="mt-2 text-4xl font-black">{worldInfo.label}</h2><p className="mt-2 text-sm text-white/45">{phase('status','draft').toUpperCase()} · {cloudStatus}</p></div><div className="flex gap-2"><button onClick={saveDraft} className="rounded-full border border-white/15 px-5 py-3 text-sm font-black">Save Draft</button><button onClick={publish} className="rounded-full bg-purple-200 px-5 py-3 text-sm font-black text-black">Publish World</button></div></div>

        {category === 'layout' && <Feature title="Layout & AI Suggestions" note="Suggestions only rearrange the private draft. Nothing changes publicly until you publish.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{[
            ['cinematic','Cinematic','Large hero, dramatic offsets, story-first movement.'],['editorial','Editorial','Magazine rhythm, columns, and clean hierarchy.'],['luxury','Luxury','Centered focus, refined spacing, slower energy.'],['minimal','Minimal','Generous space and direct messaging.'],['experimental','Experimental','Asymmetry, collage behavior, and visual energy.']
          ].map(([key,label,text]) => <Option key={key} title={label} text={text} active={phase('layout') === key} onClick={() => applyLayout(key)} />)}</div>
          <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/[.025] p-5"><h3 className="text-2xl font-black">Drag & Drop Stage</h3><p className="mt-2 text-sm text-white/45">Drag visible layers. Exact sizing and layer controls remain under Media & Layers.</p><div ref={stageRef} onPointerMove={moveAsset} onPointerUp={() => setDragging(null)} className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10" style={{background:`linear-gradient(135deg,${active.surface},${active.background})`}}><MediaLayers media={active.media} onPointerDown={setDragging} /><div className="absolute bottom-5 left-5 z-50"><p className="text-xs font-black" style={{color:active.accent}}>PRIVATE DRAFT</p><h4 className="mt-1 text-3xl font-black">{active.title}</h4></div></div></div>
        </Feature>}

        {category === 'motion' && <Feature title="Motion & Animation" note="Motion settings stay beneath motion. Individual layer placement remains under Media & Layers."><FormGrid>{[
          ['Entrance','motion.entrance','fade',['none','fade','slide','scale','blur']],['Loop Motion','motion.loop','float',['none','float','pulse','rotate','breathe']],['Hover Response','motion.hover','scale',['none','scale','tilt','glow','follow']],['Scroll Reveal','motion.scroll','rise',['none','rise','reveal','stagger','parallax']],['Parallax Depth','motion.parallax','medium',['off','low','medium','high']],['Motion Speed','motion.speed','slow',['slow','medium','fast']]
        ].map(([label,key,fallback,options]) => <SelectBox key={String(key)} label={String(label)} value={phase(String(key),String(fallback))} options={options as string[]} onChange={(value) => setPhase(String(key),value)} />)}</FormGrid><div className="mt-5 grid gap-3 sm:grid-cols-3">{['calm','balanced','high-energy'].map((value)=><Option key={value} title={value.replace('-',' ')} text="Coordinated easing, distance, speed, and intensity." active={phase('motion.preset')===value} onClick={()=>setPhase('motion.preset',value)} />)}</div></Feature>}

        {category === 'themes' && <Feature title="Themes & Frequency Presets" note="Presets coordinate atmosphere while preserving your media and copy."><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{[['luxury','Luxury','Gold, black, slow elegance.'],['energy','Energy','Neon, contrast, fast impact.'],['midnight','Midnight','Deep violet and cyan atmosphere.'],['organic','Organic','Earth tones and warm community.'],['monochrome','Monochrome','Editorial black-and-white focus.']].map(([key,label,text])=><Option key={key} title={label} text={text} active={phase('theme')===key} onClick={()=>applyPreset(key)} />)}</div><FormGrid className="mt-5"><SelectBox label="Season Mode" value={phase('season','follow-global')} options={['follow-global','spring','summer','fall','winter','custom']} onChange={(v)=>setPhase('season',v)} /><SelectBox label="Atmosphere" value={phase('atmosphere','balanced')} options={['balanced','runway','concert','late-night','studio','street','restaurant','arena']} onChange={(v)=>setPhase('atmosphere',v)} /><SelectBox label="Audio Reactivity" value={phase('audio','medium')} options={['off','low','medium','high']} onChange={(v)=>setPhase('audio',v)} /></FormGrid></Feature>}

        {category === 'timeline' && <Feature title="Draft, Publish & Version Timeline" note="Drafts remain private. Publishing changes the public world. Restoring creates a draft first."><FormGrid><TextBox label="Studio Secret" value={secret} onChange={setSecret} /><SelectBox label="World Status" value={phase('status','draft')} options={['draft','private-preview','scheduled','live','archived']} onChange={(v)=>setPhase('status',v)} /><TextBox type="datetime-local" label="Schedule Date / Time" value={phase('schedule')} onChange={(v)=>setPhase('schedule',v)} /></FormGrid><div className="mt-5 flex flex-wrap gap-3"><button onClick={saveDraft} className="rounded-full border border-white/15 px-5 py-3 font-black">Save Private Draft</button><button onClick={publish} className="rounded-full bg-purple-200 px-5 py-3 font-black text-black">Approve & Publish</button><button onClick={()=>window.open(worldInfo.path,'_blank')} className="rounded-full border border-white/15 px-5 py-3 font-black">Open Current Live World ↗</button></div><div className="mt-7 grid gap-3">{versions.length === 0 ? <Empty text="No versions yet. Save a draft or publish to create the first snapshot." /> : versions.map((version)=><article key={version.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[.025] p-4"><div><b>{version.name}</b><p className="mt-1 text-xs text-white/35">{new Date(version.createdAt).toLocaleString()}</p></div><button onClick={()=>restore(version)} className="rounded-full border border-white/15 px-4 py-2 text-xs font-black">Restore as Draft</button></article>)}</div></Feature>}

        {category === 'assets' && <Feature title="Global Asset Library" note="Reuse uploaded assets here. New uploads and exact placement remain in Media & Layers."><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{active.media.length === 0 ? <Empty text="No media exists for this world yet." /> : active.media.map((asset)=><article key={asset.id} className="rounded-[2rem] border border-white/10 bg-white/[.025] p-4">{asset.kind === 'video' ? <video src={asset.url} className="aspect-video w-full rounded-2xl object-cover" muted loop autoPlay playsInline /> : <img src={asset.url} alt="" className="aspect-video w-full rounded-2xl object-cover" />}<h3 className="mt-4 font-black">{asset.name}</h3><p className="mt-1 text-xs text-white/35">{asset.kind} · {asset.placement}</p><div className="mt-3 flex gap-2"><button onClick={()=>{const { id: _id, ...copy } = asset; addMedia(world,{...copy,name:`${asset.name} Copy`});}} className="rounded-full border border-white/15 px-3 py-2 text-xs font-black">Duplicate</button><button onClick={()=>updateMedia(world,asset.id,{placement:'hero'})} className="rounded-full border border-white/15 px-3 py-2 text-xs font-black">Use as Hero</button></div></article>)}</div></Feature>}

        {category === 'preview' && <Feature title="Live Device Preview" note="This renders the private draft. The public site stays unchanged until Publish World."><div className="flex flex-wrap gap-2">{(['phone','tablet','desktop','wide'] as const).map((item)=><button key={item} onClick={()=>setDevice(item)} className={`rounded-full px-4 py-2 text-sm font-black ${device===item?'bg-white text-black':'border border-white/15'}`}>{item}</button>)}</div><DevicePreview device={device} active={active} /></Feature>}
      </main>
    </div>
  </div>;
}

function MediaLayers({media,onPointerDown}:{media:WorldMediaAsset[];onPointerDown:(id:string)=>void}){return <>{media.map((asset)=>{const style={position:'absolute' as const,left:`${asset.x}%`,top:`${asset.y}%`,width:`${asset.width}%`,opacity:asset.opacity/100,transform:`translate(-50%,-50%) rotate(${asset.rotation}deg)`,zIndex:asset.zIndex,touchAction:'none' as const};return asset.kind==='video'?<video key={asset.id} src={asset.url} style={style} muted loop autoPlay playsInline onPointerDown={()=>onPointerDown(asset.id)} className="cursor-grab select-none"/>:<img key={asset.id} src={asset.url} alt="" style={style} draggable={false} onPointerDown={()=>onPointerDown(asset.id)} className="cursor-grab select-none"/>})}</>}
function DevicePreview({device,active}:{device:string;active:any}){const widths:Record<string,string>={phone:'390px',tablet:'768px',desktop:'1100px',wide:'1400px'};return <div className="mt-5 overflow-auto rounded-[2rem] border border-white/10 bg-black/35 p-4"><div className="relative mx-auto min-h-[620px] overflow-hidden rounded-[1.8rem] border border-white/15" style={{width:widths[device],maxWidth:'100%',background:`linear-gradient(145deg,${active.surface},${active.background})`,color:active.text}}><MediaLayers media={active.media} onPointerDown={()=>{}} /><div className="relative z-50 p-8"><p className="text-xs font-black" style={{color:active.accent}}>LIVE DRAFT PREVIEW</p><h3 className="mt-4 text-5xl font-black">{active.title}</h3><p className="mt-4 max-w-xl leading-8" style={{color:active.muted}}>{active.subtitle}</p></div></div></div>}
function SmallLabel({children,className=''}:{children:ReactNode;className?:string}){return <p className={`text-xs font-black uppercase tracking-[.24em] text-white/35 ${className}`}>{children}</p>}
function Feature({title,note,children}:{title:string;note:string;children:ReactNode}){return <section className="mt-7"><h3 className="text-3xl font-black">{title}</h3><p className="mt-2 max-w-3xl text-sm leading-7 text-white/45">{note}</p><div className="mt-5">{children}</div></section>}
function FormGrid({children,className=''}:{children:ReactNode;className?:string}){return <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>{children}</div>}
function Option({title,text,active,onClick}:{title:string;text:string;active:boolean;onClick:()=>void}){return <button onClick={onClick} className={`rounded-[1.7rem] border p-4 text-left ${active?'border-purple-200 bg-purple-300/15':'border-white/10 bg-white/[.025]'}`}><b className="capitalize">{title}</b><span className="mt-2 block text-xs leading-5 text-white/40">{text}</span></button>}
function TextBox({label,value,onChange,type='text'}:{label:string;value:string;onChange:(value:string)=>void;type?:string}){return <label className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><span className="text-xs font-black uppercase tracking-[.14em] text-white/35">{label}</span><input type={type} value={value} onChange={(event)=>onChange(event.target.value)} className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white" /></label>}
function SelectBox({label,value,options,onChange}:{label:string;value:string;options:string[];onChange:(value:string)=>void}){return <label className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><span className="text-xs font-black uppercase tracking-[.14em] text-white/35">{label}</span><select value={value} onChange={(event)=>onChange(event.target.value)} className="mt-3 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white">{options.map((option)=><option key={option}>{option}</option>)}</select></label>}
function Empty({text}:{text:string}){return <div className="rounded-[2rem] border border-dashed border-white/15 p-8 text-sm text-white/40">{text}</div>}
