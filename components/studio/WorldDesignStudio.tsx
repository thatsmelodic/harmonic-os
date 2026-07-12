'use client';

import { useEffect, useMemo, useState } from 'react';
import { Phase4WorldRuntime } from '@/components/studio/Phase4WorldRuntime';
import { useWorldCustomization, type WorldKey, type WorldMediaAsset } from '@/components/studio/WorldCustomizationProvider';

const worlds: Array<{key:WorldKey;label:string;description:string;preview:string}> = [
  {key:'global',label:'Global System',description:'Fallback styling, shared media, and OS-wide behavior.',preview:'/'},
  {key:'home',label:'Homepage',description:'The Harmonic OS entrance and shared navigation language.',preview:'/'},
  {key:'melodic',label:'Melodic',description:'Music, memories, releases, and immersive album language.',preview:'/worlds/melodic'},
  {key:'fried-em',label:'Fried Em',description:'Courts, heat, seasons, episodes, rankings, and challenges.',preview:'/worlds/fried-em'},
  {key:'schmackinn',label:'Schmackinn',description:'Flavor City, restaurants, callouts, reviews, and memories.',preview:'/worlds/schmackinn'},
  {key:'two-harmonic',label:'2 Harmonic',description:'The Fashion House, Stitched Melodies, drops, and archives.',preview:'/worlds/harmonic'},
];

const sharedCopy = [['title','Main Title'],['subtitle','Main Description'],['eyebrow','Eyebrow / Section Label'],['primaryCta','Primary Button'],['secondaryCta','Secondary Button']];
const worldCopy: Partial<Record<WorldKey,string[][]>> = {
  schmackinn:[['systemsTitle','World Systems Title'],['mapTitle','Flavor City Map Title'],['mapDescription','Flavor City Map Description'],['communityTitle','Community Title'],['communityDescription','Community Description'],['archiveTitle','Food Memories Title'],['archiveDescription','Food Memories Description'],['studioTitle','Creator Automation Title']],
  melodic:[['archiveTitle','Memory Archive Title'],['studioTitle','Upload Studio Title'],['communityTitle','Listener Community Title']],
  'fried-em':[['communityTitle','Community / Heat Title'],['archiveTitle','Episode Archive Title'],['studioTitle','Fried Em CMS Title']],
  'two-harmonic':[['archiveTitle','Stitch Archive Title'],['studioTitle','Fashion House Studio Title'],['communityTitle','Community Stories Title']],
};

type Section='identity'|'palette'|'media'|'runtime'|'page-copy'|'actions'|'publishing';
const sections:Array<{key:Section;label:string;description:string}> = [
  {key:'identity',label:'Identity',description:'Main title, description, and style preview.'},
  {key:'palette',label:'Colors',description:'Semantic colors, borders, surfaces, and glow.'},
  {key:'media',label:'Media & Layers',description:'Upload and manage images, GIFs, videos, logos, bubbles, and backgrounds.'},
  {key:'runtime',label:'Living Runtime',description:'Layouts, drag-and-drop, motion, themes, AI arranging, devices, assets, and timeline.'},
  {key:'page-copy',label:'Page Copy',description:'Titles and descriptions grouped under the features they control.'},
  {key:'actions',label:'Buttons',description:'Calls-to-action and navigation language.'},
  {key:'publishing',label:'Publishing',description:'Studio access, cloud save, reset, and production controls.'},
];

const blankAsset:Omit<WorldMediaAsset,'id'>={name:'New Layer',url:'',kind:'image',placement:'floating',x:50,y:50,width:28,opacity:100,rotation:0,zIndex:1,loop:true,muted:true,fit:'contain'};
const SECRET_KEY='harmonic-studio-secret-session';

export function WorldDesignStudio(){
  const {settings,updateWorld,updateLabel,addMedia,updateMedia,removeMedia,saveWorldToCloud,copyToAll,resetWorld,cloudStatus,lastSavedAt}=useWorldCustomization();
  const [world,setWorld]=useState<WorldKey>('schmackinn');
  const [section,setSection]=useState<Section>('identity');
  const [secret,setSecret]=useState('');
  const [draft,setDraft]=useState(blankAsset);
  const [uploading,setUploading]=useState(false);
  const [saving,setSaving]=useState(false);
  const active=settings[world];
  const worldInfo=useMemo(()=>worlds.find((item)=>item.key===world)!,[world]);
  const extraCopy=worldCopy[world]??[];

  useEffect(()=>{setSecret(window.sessionStorage.getItem(SECRET_KEY)||'');},[]);
  useEffect(()=>{if(secret)window.sessionStorage.setItem(SECRET_KEY,secret);},[secret]);

  async function save(){
    if(!secret){setSection('publishing');alert('Enter your Studio Secret, then press Save Changes again.');return;}
    setSaving(true);const ok=await saveWorldToCloud(world,secret);setSaving(false);
    alert(ok?`${worldInfo.label} saved to Supabase and published live.`:'Save failed. Confirm the Studio Secret matches STUDIO_SECRET in Vercel.');
  }
  function openPreview(){window.location.assign(`${worldInfo.preview}?worldPreview=${Date.now()}`);}
  async function upload(file:File){
    if(!secret){setSection('publishing');alert('Enter the Studio Secret first.');return;}
    setUploading(true);
    try{const form=new FormData();form.append('file',file);form.append('world',world);const response=await fetch('/api/world-design/upload',{method:'POST',headers:{'x-harmonic-studio-key':secret},body:form});const data=await response.json();if(!response.ok)throw new Error(data.error||'Upload failed');setDraft((current)=>({...current,url:data.url,kind:data.type}));}
    catch(error){alert(error instanceof Error?error.message:'Upload failed');}finally{setUploading(false);}
  }

  return <div className="mx-auto max-w-7xl pb-28 text-white">
    <header className="rounded-[2.5rem] border border-white/10 bg-black/45 p-6 backdrop-blur-2xl sm:p-9"><p className="text-xs font-black uppercase tracking-[.34em] text-white/35">Design Department · Phase 4</p><h1 className="mt-3 text-5xl font-black tracking-[-.07em] sm:text-7xl">World Design & Copy</h1><p className="mt-4 max-w-3xl text-base leading-8 text-white/55">Compose, preview, save drafts, animate, version, and publish every world without touching code.</p></header>
    <div className="mt-6 grid gap-5 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-[2rem] border border-white/10 bg-black/45 p-4 backdrop-blur-xl lg:sticky lg:top-5"><p className="px-2 text-xs font-black uppercase tracking-[.24em] text-white/35">Choose World</p><div className="mt-3 grid gap-2">{worlds.map((item)=><button key={item.key} onClick={()=>{setWorld(item.key);setSection('identity');}} className={`rounded-2xl border p-4 text-left transition ${world===item.key?'border-white/25 bg-white/12':'border-white/8 bg-white/[.025]'}`}><p className="font-black">{item.label}</p><p className="mt-1 text-xs leading-5 text-white/38">{item.description}</p></button>)}</div></aside>
      <section className="rounded-[2.4rem] border border-white/10 bg-black/45 p-5 backdrop-blur-2xl sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.24em] text-white/35">Editing</p><h2 className="mt-2 text-4xl font-black tracking-[-.06em]">{worldInfo.label}</h2><p className="mt-2 text-xs font-bold text-white/45">{cloudStatus==='dirty'?'Unsaved changes':cloudStatus==='saving'?'Saving…':cloudStatus==='saved'?'Saved live':'Ready'}</p></div><div className="flex flex-wrap gap-2"><button onClick={openPreview} className="rounded-full border border-white/10 px-4 py-3 text-xs font-black">Open Live Preview ↗</button><button onClick={save} disabled={saving} className="rounded-full bg-purple-200 px-5 py-3 text-xs font-black text-black">{saving?'Saving…':'Save Changes'}</button></div></div>
        <nav className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{sections.map((item)=><button key={item.key} onClick={()=>setSection(item.key)} className={`rounded-2xl border p-4 text-left ${section===item.key?'border-white/30 bg-white text-black':'border-white/10 bg-white/[.035]'}`}><p className="font-black">{item.label}</p><p className={`mt-1 text-xs leading-5 ${section===item.key?'text-black/55':'text-white/35'}`}>{item.description}</p></button>)}</nav>

        {section==='identity'&&<div className="mt-7 grid gap-4 sm:grid-cols-2"><Field label="World Title" value={active.title??''} onChange={(title)=>updateWorld(world,{title})}/><Field label="World Description" value={active.subtitle??''} onChange={(subtitle)=>updateWorld(world,{subtitle})} multiline/><Preview active={active} label={worldInfo.label}/></div>}
        {section==='palette'&&<div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{([['primary','Primary Actions'],['secondary','Secondary Actions'],['accent','Accent / Highlights'],['background','World Background'],['surface','Panels / Cards'],['text','Main Text'],['muted','Muted Text'],['border','Borders / Dividers'],['glow','Glow / Energy']] as const).map(([key,label])=><ColorField key={key} label={label} value={active[key]} onChange={(value)=>updateWorld(world,{[key]:value})}/>)}</div>}
        {section==='media'&&<div className="mt-7 grid gap-6"><Panel title="Add Any Visual" note="Upload from your device or paste a hosted image, GIF, SVG, MP4, or WebM URL."><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><Field label="Layer Name" value={draft.name} onChange={(name)=>setDraft({...draft,name})}/><Field label="Asset URL" value={draft.url} onChange={(url)=>setDraft({...draft,url})}/><label className="rounded-2xl border border-white/10 p-4"><span className="text-xs font-black uppercase tracking-widest text-white/35">Upload File</span><input type="file" accept="image/*,video/*" disabled={uploading} onChange={(e)=>e.target.files?.[0]&&upload(e.target.files[0])} className="mt-3 block w-full text-sm"/><span className="mt-2 block text-xs text-white/35">{uploading?'Uploading…':'Images, GIFs, SVG, MP4, WebM · max 50 MB'}</span></label><Select label="Type" value={draft.kind} options={['image','video']} onChange={(kind)=>setDraft({...draft,kind:kind as WorldMediaAsset['kind']})}/><Select label="Placement" value={draft.placement} options={['background','hero','logo','floating','section']} onChange={(placement)=>setDraft({...draft,placement:placement as WorldMediaAsset['placement']})}/><Select label="Fit" value={draft.fit} options={['contain','cover']} onChange={(fit)=>setDraft({...draft,fit:fit as WorldMediaAsset['fit']})}/></div><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"><NumberField label="X Position %" value={draft.x} onChange={(x)=>setDraft({...draft,x})}/><NumberField label="Y Position %" value={draft.y} onChange={(y)=>setDraft({...draft,y})}/><NumberField label="Width %" value={draft.width} onChange={(width)=>setDraft({...draft,width})}/><NumberField label="Opacity %" value={draft.opacity} onChange={(opacity)=>setDraft({...draft,opacity})}/><NumberField label="Layer Order" value={draft.zIndex} onChange={(zIndex)=>setDraft({...draft,zIndex})}/></div><button disabled={!draft.url} onClick={()=>{addMedia(world,draft);setDraft(blankAsset);}} className="mt-5 rounded-full bg-white px-5 py-4 text-sm font-black text-black disabled:opacity-30">Add Layer to {worldInfo.label}</button></Panel><Panel title="Active Layers" note="All layers remain editable and reusable.">{active.media.length===0?<p className="text-white/40">No custom media yet.</p>:<div className="grid gap-4">{active.media.map((asset)=><MediaEditor key={asset.id} asset={asset} onChange={(patch)=>updateMedia(world,asset.id,patch)} onRemove={()=>removeMedia(world,asset.id)}/>)}</div>}</Panel></div>}
        {section==='runtime'&&<Phase4WorldRuntime world={world} secret={secret}/>} 
        {section==='page-copy'&&<div className="mt-7"><Panel title="Main World" note="Core language used at the entrance of this world."><div className="grid gap-4 sm:grid-cols-2">{sharedCopy.slice(0,3).map(([key,label])=><Field key={key} label={label} value={key==='title'?active.title??'':key==='subtitle'?active.subtitle??'':active.labels[key]??''} onChange={(value)=>key==='title'?updateWorld(world,{title:value}):key==='subtitle'?updateWorld(world,{subtitle:value}):updateLabel(world,key,value)} multiline={key==='subtitle'}/>)}</div></Panel>{extraCopy.length>0&&<Panel title={`${worldInfo.label} Sections`} note="Copy is labeled beneath the feature it controls."><div className="grid gap-4 sm:grid-cols-2">{extraCopy.map(([key,label])=><Field key={key} label={label} value={active.labels[key]??''} onChange={(value)=>updateLabel(world,key,value)} multiline={key.toLowerCase().includes('description')}/>)}</div></Panel>}</div>}
        {section==='actions'&&<div className="mt-7"><Panel title="Calls to Action" note="Button wording and navigation labels."><div className="grid gap-4 sm:grid-cols-2">{sharedCopy.slice(3).map(([key,label])=><Field key={key} label={label} value={active.labels[key]??''} onChange={(value)=>updateLabel(world,key,value)}/>)}</div></Panel></div>}
        {section==='publishing'&&<div className="mt-7"><Panel title="Publishing Access" note="Enter the same Studio Secret stored in Vercel. Phase 4 draft, schedule, publish, archive, and version controls live under Living Runtime → World Timeline."><div className="grid gap-4 sm:grid-cols-[1fr_auto]"><Field label="Studio Secret" value={secret} onChange={setSecret}/><button onClick={save} disabled={saving} className="rounded-full bg-purple-200 px-6 py-4 text-sm font-black text-black">{saving?'Saving…':`Quick Publish ${worldInfo.label}`}</button></div><div className="mt-4 grid gap-3 sm:grid-cols-3"><Info title="Cloud Status" text={cloudStatus}/><Info title="Last Saved" text={lastSavedAt?new Date(lastSavedAt).toLocaleString():'No save this session'}/><Info title="Safety" text="Draft and version tools prevent accidental public changes."/></div><div className="mt-4 flex flex-wrap gap-3"><button onClick={()=>copyToAll(world)} className="rounded-full bg-white px-5 py-3 text-sm font-black text-black">Apply Design to All Worlds</button><button onClick={()=>resetWorld(world)} className="rounded-full border border-red-300/20 px-5 py-3 text-sm font-black text-red-200">Reset {worldInfo.label}</button></div></Panel></div>}
      </section>
    </div>
  </div>;
}

function Panel({title,note,children}:{title:string;note:string;children:React.ReactNode}){return <section className="mb-5 rounded-[2rem] border border-white/10 bg-white/[.025] p-5"><h3 className="text-2xl font-black">{title}</h3><p className="mb-5 mt-2 text-sm leading-6 text-white/40">{note}</p>{children}</section>}
function Field({label,value,onChange,multiline=false}:{label:string;value:string;onChange:(value:string)=>void;multiline?:boolean}){return <label className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><span className="text-xs font-black uppercase tracking-[.16em] text-white/35">{label}</span>{multiline?<textarea rows={4} value={value} onChange={(e)=>onChange(e.target.value)} className="mt-3 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3"/>:<input value={value} onChange={(e)=>onChange(e.target.value)} className="mt-3 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3"/>}</label>}
function NumberField({label,value,onChange}:{label:string;value:number;onChange:(value:number)=>void}){return <label className="rounded-2xl border border-white/10 p-3"><span className="text-[.65rem] font-black uppercase tracking-widest text-white/35">{label}</span><input type="number" value={value} onChange={(e)=>onChange(Number(e.target.value))} className="mt-2 w-full bg-transparent"/></label>}
function Select({label,value,options,onChange}:{label:string;value:string;options:string[];onChange:(value:string)=>void}){return <label className="rounded-2xl border border-white/10 p-4"><span className="text-xs font-black uppercase tracking-widest text-white/35">{label}</span><select value={value} onChange={(e)=>onChange(e.target.value)} className="mt-3 w-full rounded-xl border border-white/10 bg-black px-4 py-3">{options.map((option)=><option key={option}>{option}</option>)}</select></label>}
function ColorField({label,value,onChange}:{label:string;value:string;onChange:(value:string)=>void}){return <label className="rounded-2xl border border-white/10 p-4"><span className="text-xs font-black uppercase tracking-widest text-white/35">{label}</span><div className="mt-3 flex gap-3"><input type="color" value={value} onChange={(e)=>onChange(e.target.value)} className="h-12 w-14"/><input value={value} onChange={(e)=>onChange(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/35 px-3"/></div></label>}
function MediaEditor({asset,onChange,onRemove}:{asset:WorldMediaAsset;onChange:(patch:Partial<WorldMediaAsset>)=>void;onRemove:()=>void}){return <article className="rounded-2xl border border-white/10 p-4"><div className="flex justify-between gap-3"><div><p className="font-black">{asset.name}</p><p className="text-xs text-white/35">{asset.kind} · {asset.placement}</p></div><button onClick={onRemove} className="text-sm font-black text-red-200">Remove</button></div><div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-6"><NumberField label="X" value={asset.x} onChange={(x)=>onChange({x})}/><NumberField label="Y" value={asset.y} onChange={(y)=>onChange({y})}/><NumberField label="Width" value={asset.width} onChange={(width)=>onChange({width})}/><NumberField label="Opacity" value={asset.opacity} onChange={(opacity)=>onChange({opacity})}/><NumberField label="Rotation" value={asset.rotation} onChange={(rotation)=>onChange({rotation})}/><NumberField label="Layer" value={asset.zIndex} onChange={(zIndex)=>onChange({zIndex})}/></div></article>}
function Preview({active,label}:{active:ReturnType<typeof useWorldCustomization>['settings'][WorldKey];label:string}){return <div className="sm:col-span-2 rounded-[2rem] border p-6" style={{background:`linear-gradient(135deg,${active.surface},${active.background})`,borderColor:active.border,color:active.text,boxShadow:`0 0 45px ${active.glow}55`}}><p className="text-xs font-black uppercase tracking-widest" style={{color:active.accent}}>Live Style Preview</p><h3 className="mt-3 text-4xl font-black">{active.title||label}</h3><p className="mt-3" style={{color:active.muted}}>{active.subtitle}</p></div>}
function Info({title,text}:{title:string;text:string}){return <article className="rounded-2xl border border-white/10 p-4"><p className="font-black">{title}</p><p className="mt-2 text-sm text-white/40">{text}</p></article>}
