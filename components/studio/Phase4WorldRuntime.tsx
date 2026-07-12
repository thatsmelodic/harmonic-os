'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useWorldCustomization, type WorldKey, type WorldMediaAsset } from '@/components/studio/WorldCustomizationProvider';

type Category = 'layout' | 'motion' | 'themes' | 'timeline' | 'devices' | 'assets' | 'ai';
type Version = { id:number; version_number:number; status:string; note:string; created_at:string };
type LibraryAsset = { id:number; name:string; url:string; media_type:'image'|'video'|'audio'; category:string; source_world?:string };

const categoryCards: Array<{key:Category;label:string;description:string}> = [
  {key:'layout',label:'Layout Canvas',description:'Drag, position, resize, rotate, layer, duplicate, and remove world media.'},
  {key:'motion',label:'Animation Builder',description:'Fade, slide, scale, parallax, float, pulse, rotate, hover, and scroll behavior.'},
  {key:'themes',label:'Frequency Presets',description:'One-click atmosphere systems for luxury, energy, midnight, runway, and seasonal moods.'},
  {key:'ai',label:'AI Layout Assistant',description:'Generate organized cinematic, editorial, luxury, minimal, or experimental compositions.'},
  {key:'timeline',label:'World Timeline',description:'Save drafts, preview privately, schedule, publish, archive, and restore versions.'},
  {key:'devices',label:'Device Preview',description:'Preview desktop, tablet, phone, and ultrawide layouts before publishing.'},
  {key:'assets',label:'Global Asset Library',description:'Reuse logos, images, GIFs, videos, and audio across every world.'},
];

const themes = {
  Luxury:{primary:'#d6b46b',secondary:'#f5ead6',accent:'#fff4ce',background:'#090704',surface:'#18120a',text:'#fffaf0',muted:'#c9bca4',border:'#5f4d2d',glow:'#d6b46b'},
  Energy:{primary:'#f43f5e',secondary:'#22d3ee',accent:'#facc15',background:'#06050a',surface:'#1c0b20',text:'#ffffff',muted:'#d8b4fe',border:'#7e22ce',glow:'#ec4899'},
  Midnight:{primary:'#6366f1',secondary:'#38bdf8',accent:'#c084fc',background:'#02030a',surface:'#0d1024',text:'#f8fafc',muted:'#94a3b8',border:'#312e81',glow:'#6366f1'},
  Runway:{primary:'#f5f5f4',secondary:'#a8a29e',accent:'#e7e5e4',background:'#0a0a0a',surface:'#171717',text:'#fafafa',muted:'#a3a3a3',border:'#404040',glow:'#ffffff'},
  Autumn:{primary:'#d97706',secondary:'#b45309',accent:'#fbbf24',background:'#120b06',surface:'#291609',text:'#fff7ed',muted:'#fdba74',border:'#7c2d12',glow:'#f97316'},
  Winter:{primary:'#7dd3fc',secondary:'#c4b5fd',accent:'#f8fafc',background:'#040812',surface:'#0f1b2f',text:'#f8fafc',muted:'#bae6fd',border:'#1e3a8a',glow:'#38bdf8'},
} as const;

const layouts = {
  Cinematic:[[50,24,72],[24,64,28],[76,66,28]],
  Editorial:[[28,28,42],[72,28,42],[50,72,70]],
  Luxury:[[50,34,54],[50,72,30],[82,18,18]],
  Minimal:[[50,42,52],[50,78,24],[82,18,14]],
  Experimental:[[22,26,36],[76,40,46],[44,76,32]],
} as const;

export function Phase4WorldRuntime({ world, secret }: { world:WorldKey; secret:string }) {
  const { settings, updateWorld, updateLabel, updateMedia, addMedia, removeMedia } = useWorldCustomization();
  const active = settings[world];
  const [category,setCategory] = useState<Category>('layout');
  const [versions,setVersions] = useState<Version[]>([]);
  const [assets,setAssets] = useState<LibraryAsset[]>([]);
  const [status,setStatus] = useState('draft');
  const [note,setNote] = useState('');
  const [scheduledAt,setScheduledAt] = useState('');
  const [busy,setBusy] = useState(false);
  const [device,setDevice] = useState<'desktop'|'tablet'|'phone'|'ultrawide'>('phone');
  const [selectedId,setSelectedId] = useState(active.media[0]?.id ?? '');
  const canvasRef = useRef<HTMLDivElement>(null);
  const selected = active.media.find((asset)=>asset.id===selectedId);
  const phase4 = useMemo(()=>{ try { return JSON.parse(active.labels.phase4 || '{}') as Record<string,unknown>; } catch { return {}; } },[active.labels.phase4]);

  useEffect(()=>{ load(); },[world]);
  async function load(){
    try { const r=await fetch(`/api/world-design/phase4?world=${encodeURIComponent(world)}`); const d=await r.json(); if(r.ok){setVersions(d.versions||[]);setAssets(d.assets||[]);setStatus(d.design?.status||'draft');} } catch {}
  }
  function setPhase4(patch:Record<string,unknown>){ updateLabel(world,'phase4',JSON.stringify({...phase4,...patch})); }
  function requireSecret(){ if(!secret){alert('Enter your Studio Secret in Publishing first.');return false;} return true; }
  async function action(name:'save-draft'|'publish'|'schedule'|'archive'|'restore', versionId?:number){
    if(!requireSecret()) return; setBusy(true);
    try { const r=await fetch('/api/world-design/phase4',{method:'POST',headers:{'Content-Type':'application/json','x-harmonic-studio-key':secret},body:JSON.stringify({action:name,world,settings:active,scheduledAt:scheduledAt||null,versionId,note})}); const d=await r.json(); if(!r.ok) throw new Error(d.error||'Action failed'); if(d.settings) updateWorld(world,d.settings); await load(); alert(name==='publish'?'World published live.':name==='save-draft'?'Draft saved.':'World timeline updated.'); } catch(e){alert(e instanceof Error?e.message:'Action failed');} finally{setBusy(false);}
  }
  function applyTheme(name:keyof typeof themes){ updateWorld(world,themes[name]); setPhase4({theme:name}); }
  function applyLayout(name:keyof typeof layouts){ const slots=layouts[name]; active.media.forEach((asset,index)=>{const slot=slots[index%slots.length];updateMedia(world,asset.id,{x:slot[0],y:slot[1],width:slot[2],zIndex:index+1});}); setPhase4({layout:name}); }
  function duplicate(asset:WorldMediaAsset){ const {id,...copy}=asset; addMedia(world,{...copy,name:`${asset.name} Copy`,x:Math.min(95,asset.x+5),y:Math.min(95,asset.y+5),zIndex:asset.zIndex+1}); }
  function drag(event:React.PointerEvent, asset:WorldMediaAsset){ const canvas=canvasRef.current;if(!canvas)return; event.currentTarget.setPointerCapture(event.pointerId); const move=(e:PointerEvent)=>{const r=canvas.getBoundingClientRect();updateMedia(world,asset.id,{x:Math.max(0,Math.min(100,((e.clientX-r.left)/r.width)*100)),y:Math.max(0,Math.min(100,((e.clientY-r.top)/r.height)*100))});}; const up=()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);};window.addEventListener('pointermove',move);window.addEventListener('pointerup',up); }
  async function addToLibrary(asset:WorldMediaAsset){ if(!requireSecret())return; const r=await fetch('/api/world-design/phase4',{method:'POST',headers:{'Content-Type':'application/json','x-harmonic-studio-key':secret},body:JSON.stringify({action:'add-asset',world,asset:{name:asset.name,url:asset.url,mediaType:asset.kind,category:asset.placement,metadata:{fit:asset.fit}}})}); if(r.ok){await load();alert('Added to Global Asset Library.');} }
  function reuse(asset:LibraryAsset){ addMedia(world,{name:asset.name,url:asset.url,kind:asset.media_type==='video'?'video':'image',placement:'floating',x:50,y:50,width:28,opacity:100,rotation:0,zIndex:active.media.length+1,loop:true,muted:true,fit:'contain'}); }

  return <div className="mt-7 grid gap-5">
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{categoryCards.map((item)=><button key={item.key} onClick={()=>setCategory(item.key)} className={`rounded-[1.6rem] border p-5 text-left ${category===item.key?'border-white/30 bg-white text-black':'border-white/10 bg-white/[.03]'}`}><p className="text-lg font-black">{item.label}</p><p className={`mt-2 text-sm leading-6 ${category===item.key?'text-black/55':'text-white/40'}`}>{item.description}</p></button>)}</div>

    {category==='layout'&&<Panel title="True Drag & Drop Editor" note="Drag visual layers directly. Select one to resize, rotate, reorder, duplicate, or remove."><div ref={canvasRef} className="relative aspect-[9/16] max-h-[680px] overflow-hidden rounded-[2rem] border border-white/15 bg-black/60 sm:aspect-video" style={{background:`linear-gradient(135deg,${active.surface},${active.background})`}}>{active.media.map((asset)=><button key={asset.id} onPointerDown={(e)=>drag(e,asset)} onClick={()=>setSelectedId(asset.id)} className={`absolute touch-none ${selectedId===asset.id?'ring-2 ring-white':''}`} style={{left:`${asset.x}%`,top:`${asset.y}%`,width:`${asset.width}%`,opacity:asset.opacity/100,transform:`translate(-50%,-50%) rotate(${asset.rotation}deg)`,zIndex:asset.zIndex}}>{asset.kind==='video'?<video src={asset.url} autoPlay loop muted playsInline className="w-full rounded-xl"/>:<img src={asset.url} alt={asset.name} className="w-full rounded-xl"/>}</button>)}</div>{selected&&<div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6"><Num label="Width %" value={selected.width} onChange={(width)=>updateMedia(world,selected.id,{width})}/><Num label="Rotation" value={selected.rotation} onChange={(rotation)=>updateMedia(world,selected.id,{rotation})}/><Num label="Opacity" value={selected.opacity} onChange={(opacity)=>updateMedia(world,selected.id,{opacity})}/><Num label="Layer" value={selected.zIndex} onChange={(zIndex)=>updateMedia(world,selected.id,{zIndex})}/><button onClick={()=>duplicate(selected)} className="rounded-2xl border border-white/10 p-4 font-black">Duplicate</button><button onClick={()=>removeMedia(world,selected.id)} className="rounded-2xl border border-red-300/20 p-4 font-black text-red-200">Delete</button></div>}</Panel>}

    {category==='motion'&&<Panel title="Animation Builder" note="Motion remains a draft until you publish the world."><ChoiceGrid label="Entrance Animation" value={String(phase4.entrance||'fade')} options={['fade','slide','scale','reveal','none']} onChange={(entrance)=>setPhase4({entrance})}/><ChoiceGrid label="Ambient Motion" value={String(phase4.motion||'float')} options={['float','pulse','rotate','parallax','mouse-follow','none']} onChange={(motion)=>setPhase4({motion})}/><ChoiceGrid label="Interaction" value={String(phase4.interaction||'hover-lift')} options={['hover-lift','hover-glow','scroll-reveal','audio-reactive','none']} onChange={(interaction)=>setPhase4({interaction})}/><div className="grid gap-3 sm:grid-cols-3"><Num label="Motion Speed" value={Number(phase4.motionSpeed||50)} onChange={(motionSpeed)=>setPhase4({motionSpeed})}/><Num label="Motion Strength" value={Number(phase4.motionStrength||50)} onChange={(motionStrength)=>setPhase4({motionStrength})}/><Num label="Parallax Depth" value={Number(phase4.parallaxDepth||24)} onChange={(parallaxDepth)=>setPhase4({parallaxDepth})}/></div></Panel>}

    {category==='themes'&&<Panel title="Dynamic Theme Engine" note="Each preset changes the entire atmosphere together instead of editing disconnected colors."><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{Object.keys(themes).map((name)=><button key={name} onClick={()=>applyTheme(name as keyof typeof themes)} className="rounded-2xl border border-white/10 p-5 text-left"><p className="font-black">{name}</p><p className="mt-2 text-sm text-white/40">Colors · glow · surfaces · contrast</p></button>)}</div></Panel>}

    {category==='ai'&&<Panel title="AI Layout Assistant" note="Choose a direction, preview the composition, then adjust manually before publishing."><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{Object.keys(layouts).map((name)=><button key={name} onClick={()=>applyLayout(name as keyof typeof layouts)} className="rounded-2xl border border-white/10 p-5 text-left"><p className="font-black">Layout {name}</p><p className="mt-2 text-sm text-white/40">Rearranges current assets only. Nothing goes live automatically.</p></button>)}</div></Panel>}

    {category==='timeline'&&<Panel title="World Timeline & Publishing" note="Draft first. Preview. Publish only when approved. Every action creates a restorable version."><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><button disabled={busy} onClick={()=>action('save-draft')} className="rounded-2xl bg-white p-4 font-black text-black">Save Draft</button><button disabled={busy} onClick={()=>action('publish')} className="rounded-2xl bg-purple-200 p-4 font-black text-black">Publish World</button><button disabled={busy} onClick={()=>action('archive')} className="rounded-2xl border border-white/10 p-4 font-black">Archive</button><div className="rounded-2xl border border-white/10 p-4"><p className="text-xs uppercase tracking-widest text-white/35">Current Status</p><p className="mt-2 font-black">{status}</p></div></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><label className="rounded-2xl border border-white/10 p-4"><span className="text-xs font-black uppercase tracking-widest text-white/35">Schedule Publish</span><input type="datetime-local" value={scheduledAt} onChange={(e)=>setScheduledAt(e.target.value)} className="mt-3 w-full bg-transparent"/><button onClick={()=>action('schedule')} className="mt-3 rounded-full border border-white/15 px-4 py-2 text-sm font-black">Schedule</button></label><label className="rounded-2xl border border-white/10 p-4"><span className="text-xs font-black uppercase tracking-widest text-white/35">Version Note</span><textarea value={note} onChange={(e)=>setNote(e.target.value)} className="mt-3 min-h-24 w-full bg-transparent" placeholder="Fall drop hero revision"/></label></div><div className="mt-5 grid gap-3">{versions.map((v)=><div key={v.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 p-4"><div><p className="font-black">Version {v.version_number} · {v.status}</p><p className="mt-1 text-sm text-white/40">{new Date(v.created_at).toLocaleString()} {v.note&&`· ${v.note}`}</p></div><button onClick={()=>action('restore',v.id)} className="rounded-full border border-white/15 px-4 py-2 text-sm font-black">Restore to Draft</button></div>)}</div></Panel>}

    {category==='devices'&&<Panel title="Live Device Preview" note="Preview the public route at common device sizes without leaving Creator Studio."><div className="mb-4 flex flex-wrap gap-2">{(['phone','tablet','desktop','ultrawide'] as const).map((d)=><button key={d} onClick={()=>setDevice(d)} className={`rounded-full px-4 py-2 text-sm font-black ${device===d?'bg-white text-black':'border border-white/10'}`}>{d}</button>)}</div><div className="mx-auto overflow-hidden rounded-[2rem] border border-white/15 bg-black" style={{width:device==='phone'?390:device==='tablet'?768:device==='desktop'?1024:'100%',maxWidth:'100%',height:device==='phone'?700:650}}><iframe title={`${world} ${device} preview`} src={`${previewRoute(world)}?draftPreview=1`} className="h-full w-full"/></div></Panel>}

    {category==='assets'&&<Panel title="Global Asset Library" note="Save a current layer for reuse, or insert an existing asset into this world."><div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{active.media.map((asset)=><button key={asset.id} onClick={()=>addToLibrary(asset)} className="rounded-2xl border border-white/10 p-4 text-left"><p className="font-black">Add {asset.name}</p><p className="mt-1 text-sm text-white/40">{asset.kind} · {asset.placement}</p></button>)}</div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{assets.map((asset)=><button key={asset.id} onClick={()=>reuse(asset)} className="rounded-2xl border border-white/10 p-4 text-left"><p className="font-black">{asset.name}</p><p className="mt-1 text-sm text-white/40">{asset.category} · reuse in {world}</p></button>)}</div></Panel>}
  </div>;
}

function previewRoute(world:WorldKey){ return world==='melodic'?'/worlds/melodic':world==='fried-em'?'/worlds/fried-em':world==='schmackinn'?'/worlds/schmackinn':world==='two-harmonic'?'/worlds/harmonic':'/'; }
function Panel({title,note,children}:{title:string;note:string;children:React.ReactNode}){return <section className="rounded-[2rem] border border-white/10 bg-white/[.025] p-5"><h3 className="text-2xl font-black">{title}</h3><p className="mt-2 mb-5 text-sm leading-6 text-white/40">{note}</p>{children}</section>}
function Num({label,value,onChange}:{label:string;value:number;onChange:(value:number)=>void}){return <label className="rounded-2xl border border-white/10 p-3"><span className="text-[.65rem] font-black uppercase tracking-widest text-white/35">{label}</span><input type="number" value={value} onChange={(e)=>onChange(Number(e.target.value))} className="mt-2 w-full bg-transparent"/></label>}
function ChoiceGrid({label,value,options,onChange}:{label:string;value:string;options:string[];onChange:(value:string)=>void}){return <div className="mb-5"><p className="mb-2 text-xs font-black uppercase tracking-widest text-white/35">{label}</p><div className="flex flex-wrap gap-2">{options.map((option)=><button key={option} onClick={()=>onChange(option)} className={`rounded-full px-4 py-2 text-sm font-black ${value===option?'bg-white text-black':'border border-white/10'}`}>{option}</button>)}</div></div>}
