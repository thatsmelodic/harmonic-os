'use client';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export type WorldKey = 'global' | 'home' | 'melodic' | 'fried-em' | 'schmackinn' | 'two-harmonic';
export type MediaKind = 'image' | 'video';
export type MediaPlacement = 'background' | 'hero' | 'logo' | 'floating' | 'section';
export type MotionPreset = 'none' | 'fade' | 'slide-up' | 'float' | 'pulse' | 'spin' | 'parallax';
export type WorldMediaAsset = { id:string; name:string; url:string; kind:MediaKind; placement:MediaPlacement; section?:string; x:number; y:number; width:number; opacity:number; rotation:number; zIndex:number; loop:boolean; muted:boolean; fit:'cover'|'contain'; motion?:MotionPreset; duration?:number; delay?:number; };
export type WorldCustomization = { primary:string; secondary:string; accent:string; background:string; surface:string; text:string; muted:string; border:string; glow:string; title?:string; subtitle?:string; labels:Record<string,string>; media:WorldMediaAsset[]; layoutPreset?:string; themePreset?:string; };
export type WorldVersion = { id:number; world:string; version:number; label:string; settings:WorldCustomization; created_at:string; };
export type WorldCustomizationStore = Record<WorldKey,WorldCustomization>;
type Store = WorldCustomizationStore;
type CloudStatus = 'loading'|'ready'|'local'|'dirty'|'saving'|'draft-saved'|'published'|'error';
type ContextValue = { settings:Store; activeWorld:WorldKey; cloudStatus:CloudStatus; lastSavedAt:number|null; versions:WorldVersion[]; updateWorld:(world:WorldKey,patch:Partial<WorldCustomization>)=>void; updateLabel:(world:WorldKey,key:string,value:string)=>void; addMedia:(world:WorldKey,asset:Omit<WorldMediaAsset,'id'>)=>void; updateMedia:(world:WorldKey,id:string,patch:Partial<WorldMediaAsset>)=>void; removeMedia:(world:WorldKey,id:string)=>void; duplicateMedia:(world:WorldKey,id:string)=>void; replaceSettings:(settings:Store)=>void; replaceWorld:(world:WorldKey,settings:WorldCustomization)=>void; saveDraft:(world:WorldKey,secret:string)=>Promise<boolean>; saveWorldToCloud:(world:WorldKey,secret:string)=>Promise<boolean>; publishWorld:(world:WorldKey,secret:string,label?:string)=>Promise<boolean>; loadVersions:(world:WorldKey)=>Promise<void>; restoreVersion:(world:WorldKey,versionId:number,secret:string)=>Promise<boolean>; copyToAll:(world:WorldKey)=>void; resetWorld:(world:WorldKey)=>void; };

const base=(v:Omit<WorldCustomization,'media'>):WorldCustomization=>({...v,media:[]});
const defaults:Store={
 global:base({primary:'#a855f7',secondary:'#22d3ee',accent:'#f59e0b',background:'#07050a',surface:'#160d20',text:'#ffffff',muted:'#a1a1aa',border:'#3f3f46',glow:'#a855f7',labels:{}}),
 home:base({primary:'#a855f7',secondary:'#22d3ee',accent:'#f59e0b',background:'#07050a',surface:'#160d20',text:'#ffffff',muted:'#a1a1aa',border:'#3f3f46',glow:'#a855f7',title:'Harmonic OS',subtitle:'One Frequency. Many Worlds.',labels:{}}),
 melodic:base({primary:'#a855f7',secondary:'#ec4899',accent:'#22d3ee',background:'#090410',surface:'#1a0a28',text:'#ffffff',muted:'#c4b5fd',border:'#4c1d95',glow:'#c084fc',title:'Compose the Memory.',subtitle:'Music becomes atmosphere, archive, and living experience.',labels:{}}),
 'fried-em':base({primary:'#f97316',secondary:'#facc15',accent:'#ef4444',background:'#08090c',surface:'#15121a',text:'#ffffff',muted:'#d6d3d1',border:'#7c2d12',glow:'#fb923c',title:'Fried Em',subtitle:'They wanted smoke, so we served it hot.',labels:{}}),
 schmackinn:base({primary:'#c084fc',secondary:'#f59e0b',accent:'#84cc16',background:'#09040c',surface:'#1d1023',text:'#ffffff',muted:'#d8b4fe',border:'#6b21a8',glow:'#d946ef',title:'What does life taste like?',subtitle:'A living food city where every review becomes a storefront, frequency, memory, and community event.',labels:{eyebrow:'Flavor District'}}),
 'two-harmonic':base({primary:'#36b2cb',secondary:'#f472b6',accent:'#facc15',background:'#07090b',surface:'#102027',text:'#ffffff',muted:'#bae6fd',border:'#155e75',glow:'#67e8f9',title:'Stitched Melodies.',subtitle:'Where songs become garments and garments become memory.',labels:{}})
};
const STORAGE_KEY='harmonic-world-customization-v4';
const Ctx=createContext<ContextValue|null>(null);
function resolveWorld(path:string):WorldKey { if(path.includes('/worlds/melodic'))return'melodic'; if(path.includes('/worlds/fried-em'))return'fried-em'; if(path.includes('/worlds/schmack'))return'schmackinn'; if(path.includes('/worlds/harmonic')||path.includes('/worlds/2-harmonic')||path.includes('/worlds/two-harmonic')||path.includes('/shop'))return'two-harmonic'; if(path==='/')return'home'; return'global'; }
function mergeStore(source?:Partial<Store>):Store { return Object.fromEntries(Object.entries(defaults).map(([key,value])=>{const saved=source?.[key as WorldKey];return[key,{...value,...saved,labels:{...value.labels,...saved?.labels},media:saved?.media??value.media}]})) as Store; }

export function WorldCustomizationProvider({children}:{children:ReactNode}) {
 const pathname=usePathname(); const searchParams=useSearchParams(); const activeWorld=resolveWorld(pathname);
 const previewMode=searchParams.get('studioPreview')==='1'; const studioMode=pathname.startsWith('/studio')||previewMode;
 const [settings,setSettings]=useState<Store>(defaults); const [cloudStatus,setCloudStatus]=useState<CloudStatus>('loading'); const [lastSavedAt,setLastSavedAt]=useState<number|null>(null); const [versions,setVersions]=useState<WorldVersion[]>([]);
 useEffect(()=>{const local=window.localStorage.getItem(STORAGE_KEY)||window.localStorage.getItem('harmonic-world-customization-v3'); if(local)try{setSettings(mergeStore(JSON.parse(local)))}catch{}; if(previewMode){setCloudStatus('local');return;} fetch(`/api/world-design?mode=${studioMode?'draft':'live'}`).then(r=>r.json()).then(data=>{if(data.designs&&Object.keys(data.designs).length)setSettings(current=>mergeStore({...current,...data.designs}));setCloudStatus('ready')}).catch(()=>setCloudStatus('local'));},[studioMode,previewMode]);
 useEffect(()=>{window.localStorage.setItem(STORAGE_KEY,JSON.stringify(settings))},[settings]);
 useEffect(()=>{const active=settings[activeWorld]||settings.global;const root=document.documentElement;(['primary','secondary','accent','background','surface','text','muted','border','glow'] as const).forEach(k=>root.style.setProperty(`--world-${k}`,active[k]));root.dataset.world=activeWorld},[settings,activeWorld]);
 const mutate=(fn:(current:Store)=>Store)=>{setSettings(fn);setCloudStatus('dirty')};
 async function request(world:WorldKey,secret:string,payload:Record<string,unknown>){setCloudStatus('saving');try{const r=await fetch('/api/world-design',{method:'PUT',headers:{'Content-Type':'application/json','x-harmonic-studio-key':secret},body:JSON.stringify({world,...payload})});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.error||'Request failed');setLastSavedAt(Date.now());return data}catch{setCloudStatus('error');return null}}
 const saveDraftAction=async(world:WorldKey,secret:string)=>{const data=await request(world,secret,{action:'save-draft',settings:settings[world]});if(data){setCloudStatus('draft-saved');return true}return false};
 const value=useMemo<ContextValue>(()=>({settings,activeWorld,cloudStatus,lastSavedAt,versions,
  updateWorld:(world,patch)=>mutate(c=>({...c,[world]:{...c[world],...patch}})),
  updateLabel:(world,key,label)=>mutate(c=>({...c,[world]:{...c[world],labels:{...c[world].labels,[key]:label}}})),
  addMedia:(world,asset)=>mutate(c=>({...c,[world]:{...c[world],media:[...c[world].media,{...asset,id:crypto.randomUUID(),motion:asset.motion||'none',duration:asset.duration||6,delay:asset.delay||0}]}})),
  updateMedia:(world,id,patch)=>mutate(c=>({...c,[world]:{...c[world],media:c[world].media.map(a=>a.id===id?{...a,...patch}:a)}})),
  removeMedia:(world,id)=>mutate(c=>({...c,[world]:{...c[world],media:c[world].media.filter(a=>a.id!==id)}})),
  duplicateMedia:(world,id)=>mutate(c=>({...c,[world]:{...c[world],media:[...c[world].media,...c[world].media.filter(a=>a.id===id).map(a=>({...a,id:crypto.randomUUID(),name:`${a.name} Copy`,x:Math.min(100,a.x+4),y:Math.min(100,a.y+4)}))]}})),
  replaceSettings:(next)=>mutate(()=>next), replaceWorld:(world,next)=>mutate(c=>({...c,[world]:next})), saveDraft:saveDraftAction, saveWorldToCloud:saveDraftAction,
  publishWorld:async(world,secret,label)=>{const data=await request(world,secret,{action:'publish',settings:settings[world],label});if(data){setCloudStatus('published');return true}return false},
  loadVersions:async(world)=>{const data=await fetch(`/api/world-design?mode=draft&world=${encodeURIComponent(world)}`).then(r=>r.json());setVersions(data.versions||[])},
  restoreVersion:async(world,versionId,secret)=>{const data=await request(world,secret,{action:'restore',versionId});if(data?.settings){setSettings(c=>({...c,[world]:data.settings}));setCloudStatus('published');return true}return false},
  copyToAll:(world)=>mutate(c=>Object.fromEntries(Object.keys(c).map(k=>[k,{...c[world],labels:{...c[world].labels},media:c[world].media.map(a=>({...a,id:crypto.randomUUID()}))}])) as Store), resetWorld:(world)=>mutate(c=>({...c,[world]:defaults[world]}))
 }),[settings,activeWorld,cloudStatus,lastSavedAt,versions]);
 return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useWorldCustomization(){const c=useContext(Ctx);if(!c)throw new Error('useWorldCustomization must be used inside WorldCustomizationProvider');return c;}