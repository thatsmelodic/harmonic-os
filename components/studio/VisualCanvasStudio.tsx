'use client';

import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { useWorldCustomization, type WorldKey, type WorldMediaAsset } from '@/components/studio/WorldCustomizationProvider';
import { createStudioSections, moveStudioSection, parseStudioSections, readElementStyle, writeElementStyle, type StudioElementStyle, type StudioMotion } from '@/lib/creator-studio-model';

const worlds: Array<{key:WorldKey;label:string}>=[
 {key:'home',label:'Homepage'},{key:'melodic',label:'Melodic'},{key:'two-harmonic',label:'2 Harmonic'},
 {key:'fried-em',label:'Fried Em'},{key:'schmackinn',label:'Schmackinn'},{key:'global',label:'Global System'},
];
const motions:StudioMotion[]=['none','fade','slide-up','float','pulse','spin','parallax'];

type DragState={id:string;startX:number;startY:number;originX:number;originY:number;mode:'move'|'resize';originWidth:number;originHeight:number}|null;

export function VisualCanvasStudio(){
 const {settings,updateLabel,addMedia,updateMedia,removeMedia}=useWorldCustomization();
 const [world,setWorld]=useState<WorldKey>('home');
 const [selected,setSelected]=useState('hero');
 const [drag,setDrag]=useState<DragState>(null);
 const fileRef=useRef<HTMLInputElement>(null);
 const active=settings[world];
 const sections=useMemo(()=>parseStudioSections(active.labels.sectionStructure,world),[active.labels.sectionStructure,world]);
 const selectedSection=sections.find(s=>s.id===selected)??sections[0]??createStudioSections(world)[0];
 const style=readElementStyle(active.labels,selectedSection.id);

 function saveSections(next:typeof sections){updateLabel(world,'sectionStructure',JSON.stringify(next));}
 function patchStyle(patch:Partial<StudioElementStyle>){updateLabel(world,`studio.style.${selectedSection.id}`,writeElementStyle({...style,...patch}));}
 function startPointer(event:ReactPointerEvent<HTMLDivElement>,mode:'move'|'resize'){
  event.currentTarget.setPointerCapture(event.pointerId);
  setDrag({id:selectedSection.id,startX:event.clientX,startY:event.clientY,originX:style.x,originY:style.y,mode,originWidth:style.width,originHeight:style.minHeight});
 }
 function movePointer(event:ReactPointerEvent<HTMLDivElement>){
  if(!drag||drag.id!==selectedSection.id)return;
  const rect=event.currentTarget.parentElement?.getBoundingClientRect();if(!rect)return;
  const dx=(event.clientX-drag.startX)/rect.width*100;const dy=(event.clientY-drag.startY)/rect.height*100;
  if(drag.mode==='move')patchStyle({x:Math.max(0,Math.min(100,drag.originX+dx)),y:Math.max(0,Math.min(100,drag.originY+dy))});
  else patchStyle({width:Math.max(15,Math.min(100,drag.originWidth+dx)),minHeight:Math.max(70,drag.originHeight+(event.clientY-drag.startY))});
 }
 function stopPointer(){setDrag(null)}
 async function upload(files:FileList|null){if(!files?.length)return;for(const file of Array.from(files)){const url=URL.createObjectURL(file);addMedia(world,{name:file.name,url,kind:file.type.startsWith('video/')?'video':'image',placement:'floating',x:50,y:50,width:30,opacity:100,rotation:0,zIndex:10,loop:true,muted:true,fit:'contain',motion:'none',duration:6,delay:0});}}

 return <main className="min-h-screen bg-[#050308] text-white">
  <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/85 px-5 py-4 backdrop-blur-2xl">
   <div><p className="text-[10px] font-black uppercase tracking-[.28em] text-purple-300/60">Creator Studio · Phase 2</p><h1 className="text-2xl font-black">Visual Canvas</h1></div>
   <div className="flex flex-wrap gap-2">{worlds.map(item=><button key={item.key} onClick={()=>{setWorld(item.key);setSelected(createStudioSections(item.key)[0]?.id||'hero')}} className={`rounded-full px-4 py-2 text-xs font-black ${world===item.key?'bg-purple-200 text-black':'border border-white/10'}`}>{item.label}</button>)}</div>
  </header>
  <div className="grid min-h-[calc(100vh-73px)] xl:grid-cols-[280px_1fr_340px]">
   <aside className="border-r border-white/10 bg-black/35 p-4">
    <p className="mb-3 text-[10px] font-black uppercase tracking-[.24em] text-white/35">Layers</p>
    <div className="grid gap-2">{sections.sort((a,b)=>a.order-b.order).map(section=><button key={section.id} onClick={()=>setSelected(section.id)} className={`rounded-2xl border p-3 text-left ${selected===section.id?'border-purple-300 bg-purple-300/15':'border-white/10 bg-white/[.025]'}`}><div className="flex items-center justify-between"><b>{section.label}</b><span className="text-xs text-white/35">{section.visible?'On':'Off'}</span></div><p className="mt-1 text-xs text-white/35">{section.kind}</p></button>)}</div>
    <div className="mt-4 grid grid-cols-2 gap-2"><button onClick={()=>saveSections(moveStudioSection(sections,selectedSection.id,-1))} className="rounded-xl border border-white/10 p-3 text-xs font-black">Move Up</button><button onClick={()=>saveSections(moveStudioSection(sections,selectedSection.id,1))} className="rounded-xl border border-white/10 p-3 text-xs font-black">Move Down</button><button onClick={()=>saveSections(sections.map(s=>s.id===selectedSection.id?{...s,visible:!s.visible}:s))} className="col-span-2 rounded-xl border border-white/10 p-3 text-xs font-black">Toggle Visibility</button></div>
    <button onClick={()=>fileRef.current?.click()} className="mt-4 w-full rounded-2xl border border-dashed border-purple-300/40 bg-purple-300/[.06] p-5 text-sm font-black">Drop / Upload Media</button><input ref={fileRef} hidden type="file" multiple accept="image/*,video/*" onChange={e=>void upload(e.target.files)}/>
   </aside>
   <section className="relative overflow-auto bg-[#09060d] p-5">
    <div className="relative mx-auto min-h-[900px] max-w-[1400px] overflow-hidden rounded-[2rem] border border-white/10" style={{background:active.background,color:active.text,boxShadow:`0 0 60px ${active.glow}22`}}>
     <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:24px_24px]"/>
     {active.media.map(asset=><MediaLayer key={asset.id} asset={asset} selected={selected===`media:${asset.id}`} onSelect={()=>setSelected(`media:${asset.id}`)} onChange={patch=>updateMedia(world,asset.id,patch)}/>) }
     {sections.filter(s=>s.visible).map(section=>{const s=readElementStyle(active.labels,section.id);const isSelected=selected===section.id;return <div key={section.id} onClick={()=>setSelected(section.id)} onPointerDown={e=>{setSelected(section.id);startPointer(e,'move')}} onPointerMove={movePointer} onPointerUp={stopPointer} className={`absolute cursor-move select-none border transition ${isSelected?'border-purple-200 bg-purple-300/10':'border-white/10 bg-white/[.035]'}`} style={{left:`${s.x}%`,top:`${s.y}%`,width:`${s.width}%`,minHeight:s.minHeight,padding:s.padding,borderRadius:s.radius,opacity:s.opacity/100,filter:`blur(${s.blur}px)`,boxShadow:`0 0 ${s.glow}px ${active.glow}55`,transform:'translate(-50%,-50%)'}}><p className="text-[10px] font-black uppercase tracking-[.2em]" style={{color:active.secondary}}>{section.kind}</p><h2 className="mt-2 text-2xl font-black">{section.label}</h2><p className="mt-2 max-w-xl text-sm" style={{color:active.muted}}>Select and drag this section. Resize from the lower-right handle, then adjust exact values in Properties.</p>{isSelected&&<div onPointerDown={e=>{e.stopPropagation();startPointer(e,'resize')}} onPointerMove={movePointer} onPointerUp={stopPointer} className="absolute -bottom-2 -right-2 h-5 w-5 cursor-se-resize rounded-full bg-purple-200 ring-4 ring-black"/>}</div>})}
    </div>
   </section>
   <aside className="border-l border-white/10 bg-black/40 p-4">
    <p className="text-[10px] font-black uppercase tracking-[.24em] text-white/35">Properties</p><h2 className="mt-2 text-2xl font-black">{selectedSection.label}</h2>
    <div className="mt-5 grid gap-3"><Range label="X position" value={style.x} min={0} max={100} onChange={x=>patchStyle({x})}/><Range label="Y position" value={style.y} min={0} max={100} onChange={y=>patchStyle({y})}/><Range label="Width" value={style.width} min={15} max={100} onChange={width=>patchStyle({width})}/><Range label="Height" value={style.minHeight} min={70} max={700} onChange={minHeight=>patchStyle({minHeight})}/><Range label="Padding" value={style.padding} min={0} max={100} onChange={padding=>patchStyle({padding})}/><Range label="Corners" value={style.radius} min={0} max={80} onChange={radius=>patchStyle({radius})}/><Range label="Opacity" value={style.opacity} min={0} max={100} onChange={opacity=>patchStyle({opacity})}/><Range label="Blur" value={style.blur} min={0} max={20} onChange={blur=>patchStyle({blur})}/><Range label="Glow" value={style.glow} min={0} max={100} onChange={glow=>patchStyle({glow})}/><label className="grid gap-2 text-xs font-black uppercase tracking-wider text-white/45">Motion<select value={style.motion} onChange={e=>patchStyle({motion:e.target.value as StudioMotion})} className="rounded-xl border border-white/10 bg-black p-3 text-white">{motions.map(m=><option key={m}>{m}</option>)}</select></label></div>
    {active.media.length>0&&<div className="mt-6"><p className="mb-3 text-xs font-black uppercase tracking-wider text-white/35">Media Layers</p>{active.media.map(asset=><div key={asset.id} className="mb-2 flex items-center justify-between rounded-xl border border-white/10 p-3"><button onClick={()=>setSelected(`media:${asset.id}`)} className="text-left"><b className="text-sm">{asset.name}</b><p className="text-xs text-white/35">{asset.kind}</p></button><button onClick={()=>removeMedia(world,asset.id)} className="text-xs font-black text-red-200">Remove</button></div>)}</div>}
   </aside>
  </div>
 </main>
}

function Range({label,value,min,max,onChange}:{label:string;value:number;min:number;max:number;onChange:(value:number)=>void}){return <label className="grid gap-2 text-xs font-black uppercase tracking-wider text-white/45"><span className="flex justify-between"><span>{label}</span><output>{Math.round(value)}</output></span><input type="range" value={value} min={min} max={max} onChange={e=>onChange(Number(e.target.value))}/></label>}
function MediaLayer({asset,selected,onSelect,onChange}:{asset:WorldMediaAsset;selected:boolean;onSelect:()=>void;onChange:(patch:Partial<WorldMediaAsset>)=>void}){return <div onClick={e=>{e.stopPropagation();onSelect()}} className={`absolute z-20 ${selected?'ring-2 ring-purple-200':'ring-0'}`} style={{left:`${asset.x}%`,top:`${asset.y}%`,width:`${asset.width}%`,opacity:asset.opacity/100,transform:`translate(-50%,-50%) rotate(${asset.rotation}deg)`,zIndex:asset.zIndex}}>{asset.kind==='video'?<video src={asset.url} autoPlay loop={asset.loop} muted={asset.muted} className="w-full rounded-xl"/>:<img src={asset.url} alt={asset.name} className="w-full rounded-xl"/>}<input aria-label="Media width" type="range" min="5" max="100" value={asset.width} onChange={e=>onChange({width:Number(e.target.value)})} className="absolute -bottom-5 left-0 w-full"/></div>}
