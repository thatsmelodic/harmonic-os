'use client';

import { useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { useWorldCustomization, type WorldKey, type WorldMediaAsset } from '@/components/studio/WorldCustomizationProvider';
import {
  addStudioSection, createStudioSections, duplicateStudioSection, getStyleStorageKey, moveStudioSection, parseStudioSections,
  readElementStyle, removeStudioSection, reorderStudioSection, writeElementStyle, writeStylePatch,
  type StudioBreakpoint, type StudioElementStyle, type StudioSection, type StudioState,
} from '@/lib/creator-studio-model';

const worlds:Array<{key:WorldKey;label:string}>=[
  {key:'home',label:'Homepage'},{key:'melodic',label:'Melodic'},{key:'two-harmonic',label:'2 Harmonic'},
  {key:'fried-em',label:'Fried Em'},{key:'schmackinn',label:'Schmackinn'},{key:'global',label:'Global System'},
];
const breakpoints:Array<{key:StudioBreakpoint;label:string;width:number}>=[{key:'desktop',label:'Desktop',width:1400},{key:'tablet',label:'Tablet',width:820},{key:'mobile',label:'Mobile',width:390}];
const states:StudioState[]=['default','hover','pressed','focus'];
type DragState={id:string;startX:number;startY:number;originX:number;originY:number;originWidth:number;originHeight:number;mode:'move'|'resize'}|null;

export function VisualCanvasStudio(){
  const {settings,updateLabel,addMedia,updateMedia,removeMedia,duplicateMedia}=useWorldCustomization();
  const [world,setWorld]=useState<WorldKey>('home');
  const [selected,setSelected]=useState<string|null>('hero');
  const [breakpoint,setBreakpoint]=useState<StudioBreakpoint>('desktop');
  const [state,setState]=useState<StudioState>('default');
  const [drag,setDrag]=useState<DragState>(null);
  const [draggedLayer,setDraggedLayer]=useState<string|null>(null);
  const fileRef=useRef<HTMLInputElement>(null);
  const active=settings[world];
  const sections=useMemo(()=>parseStudioSections(active.labels.sectionStructure,world),[active.labels.sectionStructure,world]);
  const ordered=useMemo(()=>[...sections].sort((a,b)=>a.order-b.order),[sections]);
  const selectedSection=selected&&!selected.startsWith('media:')?sections.find(s=>s.id===selected):undefined;
  const selectedMedia=selected?.startsWith('media:')?active.media.find(a=>`media:${a.id}`===selected):undefined;
  const selectedStyle=selectedSection?readElementStyle(active.labels,selectedSection.id,breakpoint,state):undefined;
  const pageTitle=active.labels['studio.pageTitle']||worlds.find(item=>item.key===world)?.label||world;
  const pageSlug=active.labels['studio.pageSlug']||world;
  const navVisible=active.labels['studio.navVisible']!=='false';

  function saveSections(next:StudioSection[]){updateLabel(world,'sectionStructure',JSON.stringify(next));}
  function patchSection(id:string,patch:Partial<StudioSection>){saveSections(sections.map(s=>s.id===id?{...s,...patch}:s));}
  function patchStyle(id:string,patch:Partial<StudioElementStyle>){
    const key=getStyleStorageKey(id,breakpoint,state);
    if(breakpoint==='desktop'&&state==='default'){
      const current=readElementStyle(active.labels,id); updateLabel(world,key,writeElementStyle({...current,...patch}));
    }else{
      let current:Partial<StudioElementStyle>={}; try{current=JSON.parse(active.labels[key]||'{}')}catch{}
      updateLabel(world,key,writeStylePatch({...current,...patch}));
    }
  }
  function startPointer(event:ReactPointerEvent<HTMLDivElement>,section:StudioSection,style:StudioElementStyle,mode:'move'|'resize'){
    event.stopPropagation();setSelected(section.id);if(section.locked||style.position!=='absolute'||state!=='default')return;
    event.currentTarget.setPointerCapture(event.pointerId);setDrag({id:section.id,startX:event.clientX,startY:event.clientY,originX:style.x,originY:style.y,originWidth:style.width,originHeight:style.minHeight,mode});
  }
  function movePointer(event:ReactPointerEvent<HTMLDivElement>){
    if(!drag)return;const canvas=event.currentTarget.closest('[data-studio-canvas]') as HTMLElement|null;const rect=canvas?.getBoundingClientRect();if(!rect)return;
    const dx=((event.clientX-drag.startX)/rect.width)*100,dy=((event.clientY-drag.startY)/rect.height)*100;
    if(drag.mode==='move')patchStyle(drag.id,{x:clamp(drag.originX+dx,0,100),y:clamp(drag.originY+dy,0,100)});
    else patchStyle(drag.id,{width:clamp(drag.originWidth+dx,5,100),minHeight:clamp(drag.originHeight+(event.clientY-drag.startY),24,1200)});
  }
  function stopPointer(event:ReactPointerEvent<HTMLDivElement>){if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);setDrag(null);}
  function addSection(){const next=addStudioSection(sections);saveSections(next);setSelected(next[next.length-1].id);}
  function duplicateSection(){if(!selectedSection)return;const next=duplicateStudioSection(sections,selectedSection.id);const copy=next.find(s=>s.id.startsWith(`${selectedSection.id}-copy-`));saveSections(next);if(copy){for(const bp of ['desktop','tablet','mobile'] as StudioBreakpoint[]){const style=readElementStyle(active.labels,selectedSection.id,bp);updateLabel(world,getStyleStorageKey(copy.id,bp),writeElementStyle(style));}setSelected(copy.id);}}
  function deleteSection(){if(!selectedSection)return;saveSections(removeStudioSection(sections,selectedSection.id));setSelected(null);}
  async function upload(files:FileList|null){if(!files?.length)return;for(const file of Array.from(files))addMedia(world,{name:file.name,url:URL.createObjectURL(file),kind:file.type.startsWith('video/')?'video':'image',placement:'floating',x:50,y:50,width:30,height:30,opacity:100,rotation:0,zIndex:10,loop:true,muted:true,fit:'contain',motion:'none',duration:6,delay:0,radius:12,focalX:50,focalY:50,brightness:100,contrast:100,saturation:100,flipX:false,flipY:false,alt:file.name,link:'',visible:true,locked:false});}

  return <main className="min-h-screen bg-[#050308] text-white">
    <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/90 px-5 py-3 backdrop-blur-2xl">
      <div><p className="text-[10px] font-black uppercase tracking-[.28em] text-purple-300/60">Creator Studio · Editable Controls 6–9</p><h1 className="text-2xl font-black">Visual Canvas</h1></div>
      <div className="flex flex-wrap gap-2">{worlds.map(item=><button key={item.key} onClick={()=>{setWorld(item.key);setSelected(createStudioSections(item.key)[0]?.id||null)}} className={`rounded-full px-3 py-2 text-xs font-black ${world===item.key?'bg-purple-200 text-black':'border border-white/10'}`}>{active.labels['studio.pageTitle']&&world===item.key?active.labels['studio.pageTitle']:item.label}</button>)}</div>
    </header>
    <div className="grid min-h-[calc(100vh-68px)] xl:grid-cols-[320px_1fr_410px]">
      <aside className="max-h-[calc(100vh-68px)] overflow-y-auto border-r border-white/10 bg-black/35 p-4">
        <Panel title="Page & Navigation" open>
          <TextField label="Page name" value={pageTitle} onChange={value=>updateLabel(world,'studio.pageTitle',value)}/>
          <TextField label="URL slug" value={pageSlug} onChange={value=>updateLabel(world,'studio.pageSlug',value.replace(/\s+/g,'-').toLowerCase())}/>
          <Toggle label="Show in navigation" value={navVisible} onChange={value=>updateLabel(world,'studio.navVisible',String(value))}/>
        </Panel>
        <div className="mb-3 flex items-center justify-between"><p className="text-[10px] font-black uppercase tracking-[.24em] text-white/35">Layers</p><button onClick={addSection} className="rounded-lg border border-white/10 px-2 py-1 text-xs font-black">+ Section</button></div>
        <div className="rounded-2xl border border-white/10 bg-white/[.025] p-2">
          <button onClick={()=>setSelected(null)} className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left font-black"><span>▾</span><span>{pageTitle}</span><span className="ml-auto text-[10px] text-white/30">PAGE</span></button>
          <div className="ml-3 border-l border-white/10 pl-2">{ordered.map(section=><LayerRow key={section.id} section={section} selected={selected===section.id} onSelect={()=>setSelected(section.id)} onVisible={()=>patchSection(section.id,{visible:!section.visible})} onLock={()=>patchSection(section.id,{locked:!section.locked})} onDragStart={()=>setDraggedLayer(section.id)} onDrop={()=>{if(draggedLayer)saveSections(reorderStudioSection(sections,draggedLayer,section.id));setDraggedLayer(null)}}/>)}
            <div className="mt-2 border-t border-white/10 pt-2">{active.media.map(asset=><button key={asset.id} onClick={()=>setSelected(`media:${asset.id}`)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs ${selected===`media:${asset.id}`?'bg-purple-300/15':'text-white/55'}`}><span>{asset.kind==='video'?'▶':'▧'}</span><span className="truncate">{asset.name}</span>{asset.visible===false&&<span className="ml-auto">○</span>}</button>)}</div>
          </div>
        </div>
        {selectedSection&&<div className="mt-3 grid grid-cols-2 gap-2"><button onClick={()=>saveSections(moveStudioSection(sections,selectedSection.id,-1))} className="btn">Move Up</button><button onClick={()=>saveSections(moveStudioSection(sections,selectedSection.id,1))} className="btn">Move Down</button><button onClick={duplicateSection} className="btn">Duplicate</button><button onClick={deleteSection} className="btn text-red-200">Delete</button></div>}
        <button onClick={()=>fileRef.current?.click()} className="mt-4 w-full rounded-2xl border border-dashed border-purple-300/40 bg-purple-300/[.06] p-4 text-sm font-black">Upload Image / Video</button><input ref={fileRef} hidden type="file" multiple accept="image/*,video/*" onChange={event=>void upload(event.target.files)}/>
      </aside>

      <section className="relative overflow-auto bg-[#09060d] p-5">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">{breakpoints.map(item=><button key={item.key} onClick={()=>setBreakpoint(item.key)} className={`rounded-full px-4 py-2 text-xs font-black ${breakpoint===item.key?'bg-cyan-200 text-black':'border border-white/10'}`}>{item.label}</button>)}<span className="mx-2 h-5 w-px bg-white/10"/>{states.map(item=><button key={item} onClick={()=>setState(item)} className={`rounded-full px-3 py-2 text-xs font-black capitalize ${state===item?'bg-pink-200 text-black':'border border-white/10'}`}>{item}</button>)}</div>
        <div data-studio-canvas onPointerDown={()=>setSelected(null)} className="relative mx-auto min-h-[900px] overflow-hidden rounded-[2rem] border border-white/10 transition-[width]" style={{width:'100%',maxWidth:breakpoints.find(item=>item.key===breakpoint)?.width,background:active.background,color:active.text,boxShadow:`0 0 60px ${active.glow}22`}}>
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:24px_24px]"/>
          {active.media.filter(asset=>asset.visible!==false).map(asset=><MediaLayer key={asset.id} asset={asset} selected={selected===`media:${asset.id}`} onSelect={()=>setSelected(`media:${asset.id}`)} onChange={patch=>updateMedia(world,asset.id,patch)}/>)}
          {ordered.filter(section=>section.visible).map(section=>{const style=readElementStyle(active.labels,section.id,breakpoint,state);const isSelected=selected===section.id;return <div id={`studio-${section.id}`} key={section.id} onPointerDown={event=>startPointer(event,section,style,'move')} onPointerMove={movePointer} onPointerUp={stopPointer} onPointerCancel={stopPointer} className={`${style.position==='absolute'?'absolute':'relative'} select-none ${section.locked||state!=='default'?'cursor-default':'cursor-move'} ${isSelected?'ring-2 ring-purple-200/70':''}`} style={canvasStyle(style)}>
            <p className="text-[10px] font-black uppercase tracking-[.2em]" style={{color:active.secondary}}>{section.kind}{section.componentKey?` · component:${section.componentKey}`:''}</p><h2 className="mt-2 text-[1.65em] font-black">{section.label}</h2><p className="mt-2 opacity-70">Edit every breakpoint and interaction state visually.</p>
            {isSelected&&!section.locked&&style.position==='absolute'&&state==='default'&&<div onPointerDown={event=>startPointer(event,section,style,'resize')} onPointerMove={movePointer} onPointerUp={stopPointer} onPointerCancel={stopPointer} className="absolute -bottom-2 -right-2 h-5 w-5 cursor-se-resize rounded-full bg-purple-200 ring-4 ring-black"/>}
          </div>})}
        </div>
      </section>

      <aside className="max-h-[calc(100vh-68px)] overflow-y-auto border-l border-white/10 bg-black/40 p-4"><p className="text-[10px] font-black uppercase tracking-[.24em] text-white/35">Properties · {breakpoint} · {state}</p>
        {!selectedSection&&!selectedMedia&&<p className="mt-4 text-sm text-white/45">Select a section or media layer.</p>}
        {selectedSection&&selectedStyle&&<SectionProperties section={selectedSection} style={selectedStyle} patchSection={patch=>patchSection(selectedSection.id,patch)} patchStyle={patch=>patchStyle(selectedSection.id,patch)}/>} 
        {selectedMedia&&<MediaProperties media={selectedMedia} onChange={patch=>updateMedia(world,selectedMedia.id,patch)} onDuplicate={()=>duplicateMedia(world,selectedMedia.id)} onRemove={()=>{removeMedia(world,selectedMedia.id);setSelected(null)}}/>}
      </aside>
    </div>
  </main>;
}

function SectionProperties({section,style,patchSection,patchStyle}:{section:StudioSection;style:StudioElementStyle;patchSection:(p:Partial<StudioSection>)=>void;patchStyle:(p:Partial<StudioElementStyle>)=>void}){
  const interaction=section.interaction??{action:'none' as const,target:'',newTab:false};
  return <><TextField label="Layer name" value={section.label} onChange={label=>patchSection({label})}/><div className="mt-2 grid grid-cols-2 gap-2"><button className="btn" onClick={()=>patchSection({visible:!section.visible})}>{section.visible?'Hide':'Show'}</button><button className="btn" onClick={()=>patchSection({locked:!section.locked})}>{section.locked?'Unlock':'Lock'}</button></div>
    <Panel title="Position & Size" open><Select label="Position" value={style.position} options={['absolute','relative','fixed','sticky']} onChange={position=>patchStyle({position:position as StudioElementStyle['position']})}/><Grid><NumberField label="X" value={style.x} onChange={x=>patchStyle({x})}/><NumberField label="Y" value={style.y} onChange={y=>patchStyle({y})}/><NumberField label="Width" value={style.width} onChange={width=>patchStyle({width})}/><NumberField label="Height" value={style.minHeight} onChange={minHeight=>patchStyle({minHeight})}/><NumberField label="Z index" value={style.zIndex} onChange={zIndex=>patchStyle({zIndex})}/><NumberField label="Radius" value={style.radius} onChange={radius=>patchStyle({radius})}/></Grid></Panel>
    <Panel title="Spacing & Layout"><Grid><NumberField label="Pad top" value={style.paddingTop} onChange={paddingTop=>patchStyle({paddingTop})}/><NumberField label="Pad right" value={style.paddingRight} onChange={paddingRight=>patchStyle({paddingRight})}/><NumberField label="Pad bottom" value={style.paddingBottom} onChange={paddingBottom=>patchStyle({paddingBottom})}/><NumberField label="Pad left" value={style.paddingLeft} onChange={paddingLeft=>patchStyle({paddingLeft})}/></Grid><Select label="Layout" value={style.layout} options={['free','flex','grid']} onChange={layout=>patchStyle({layout:layout as StudioElementStyle['layout']})}/><Grid><NumberField label="Gap" value={style.gap} onChange={gap=>patchStyle({gap})}/><NumberField label="Columns" value={style.columns} onChange={columns=>patchStyle({columns})}/></Grid></Panel>
    <Panel title="Typography & Appearance"><Grid><NumberField label="Font size" value={style.fontSize} onChange={fontSize=>patchStyle({fontSize})}/><NumberField label="Weight" value={style.fontWeight} onChange={fontWeight=>patchStyle({fontWeight})}/><NumberField label="Opacity" value={style.opacity} onChange={opacity=>patchStyle({opacity})}/><NumberField label="Glow" value={style.glow} onChange={glow=>patchStyle({glow})}/></Grid><ColorField label="Text" value={style.textColor} onChange={textColor=>patchStyle({textColor})}/><ColorField label="Background" value={style.backgroundColor} onChange={backgroundColor=>patchStyle({backgroundColor,backgroundType:'solid'})}/></Panel>
    <Panel title="Component"><TextField label="Component name" value={section.componentKey||''} onChange={componentKey=>patchSection({componentKey:componentKey||undefined})}/><p className="text-xs text-white/40">Give a layer a component name to mark it reusable. Clear the name to detach it.</p></Panel>
    <Panel title="Interaction"><Select label="On click" value={interaction.action} options={['none','link','scroll','toggle','show','hide']} onChange={action=>patchSection({interaction:{...interaction,action:action as typeof interaction.action}})}/><TextField label="Target URL or layer ID" value={interaction.target} onChange={target=>patchSection({interaction:{...interaction,target}})}/><Toggle label="Open link in new tab" value={interaction.newTab} onChange={newTab=>patchSection({interaction:{...interaction,newTab}})}/></Panel>
  </>;
}

function MediaProperties({media,onChange,onDuplicate,onRemove}:{media:WorldMediaAsset;onChange:(p:Partial<WorldMediaAsset>)=>void;onDuplicate:()=>void;onRemove:()=>void}){
  return <><TextField label="Media name" value={media.name} onChange={name=>onChange({name})}/><div className="mt-2 grid grid-cols-2 gap-2"><button className="btn" onClick={()=>onChange({visible:media.visible===false})}>{media.visible===false?'Show':'Hide'}</button><button className="btn" onClick={()=>onChange({locked:!media.locked})}>{media.locked?'Unlock':'Lock'}</button></div>
    <Panel title="Media Transform" open><Grid><NumberField label="X" value={media.x} onChange={x=>onChange({x})}/><NumberField label="Y" value={media.y} onChange={y=>onChange({y})}/><NumberField label="Width" value={media.width} onChange={width=>onChange({width})}/><NumberField label="Height" value={media.height??30} onChange={height=>onChange({height})}/><NumberField label="Rotation" value={media.rotation} onChange={rotation=>onChange({rotation})}/><NumberField label="Z index" value={media.zIndex} onChange={zIndex=>onChange({zIndex})}/></Grid><Select label="Fit" value={media.fit} options={['contain','cover']} onChange={fit=>onChange({fit:fit as 'contain'|'cover'})}/><Select label="Placement" value={media.placement} options={['background','hero','logo','floating','section']} onChange={placement=>onChange({placement:placement as WorldMediaAsset['placement']})}/></Panel>
    <Panel title="Crop, Mask & Filters"><Grid><NumberField label="Focal X" value={media.focalX??50} onChange={focalX=>onChange({focalX})}/><NumberField label="Focal Y" value={media.focalY??50} onChange={focalY=>onChange({focalY})}/><NumberField label="Corners" value={media.radius??12} onChange={radius=>onChange({radius})}/><NumberField label="Opacity" value={media.opacity} onChange={opacity=>onChange({opacity})}/><NumberField label="Brightness" value={media.brightness??100} onChange={brightness=>onChange({brightness})}/><NumberField label="Contrast" value={media.contrast??100} onChange={contrast=>onChange({contrast})}/><NumberField label="Saturation" value={media.saturation??100} onChange={saturation=>onChange({saturation})}/></Grid><Toggle label="Flip horizontal" value={Boolean(media.flipX)} onChange={flipX=>onChange({flipX})}/><Toggle label="Flip vertical" value={Boolean(media.flipY)} onChange={flipY=>onChange({flipY})}/></Panel>
    <Panel title="Accessibility & Link"><TextField label="Alt text" value={media.alt||''} onChange={alt=>onChange({alt})}/><TextField label="Link" value={media.link||''} onChange={link=>onChange({link})}/></Panel>
    <div className="grid grid-cols-2 gap-2"><button className="btn" onClick={onDuplicate}>Duplicate</button><button className="btn text-red-200" onClick={onRemove}>Remove</button></div>
  </>;
}

function MediaLayer({asset,selected,onSelect,onChange}:{asset:WorldMediaAsset;selected:boolean;onSelect:()=>void;onChange:(p:Partial<WorldMediaAsset>)=>void}){
  const [drag,setDrag]=useState<{x:number;y:number;clientX:number;clientY:number}|null>(null);
  function start(event:ReactPointerEvent<HTMLDivElement>){event.stopPropagation();onSelect();if(asset.locked)return;event.currentTarget.setPointerCapture(event.pointerId);setDrag({x:asset.x,y:asset.y,clientX:event.clientX,clientY:event.clientY});}
  function move(event:ReactPointerEvent<HTMLDivElement>){if(!drag)return;const canvas=event.currentTarget.closest('[data-studio-canvas]') as HTMLElement|null;const rect=canvas?.getBoundingClientRect();if(!rect)return;onChange({x:clamp(drag.x+((event.clientX-drag.clientX)/rect.width)*100,0,100),y:clamp(drag.y+((event.clientY-drag.clientY)/rect.height)*100,0,100)});}
  function stop(event:ReactPointerEvent<HTMLDivElement>){if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);setDrag(null);}
  const mediaStyle:CSSProperties={width:'100%',height:'100%',objectFit:asset.fit,objectPosition:`${asset.focalX??50}% ${asset.focalY??50}%`,borderRadius:asset.radius??12,filter:`brightness(${asset.brightness??100}%) contrast(${asset.contrast??100}%) saturate(${asset.saturation??100}%)`};
  return <div onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} className={`absolute ${asset.locked?'cursor-default':'cursor-move'} ${selected?'ring-2 ring-purple-200':''}`} style={{left:`${asset.x}%`,top:`${asset.y}%`,width:`${asset.width}%`,height:asset.height?`${asset.height}%`:'auto',opacity:asset.opacity/100,zIndex:asset.zIndex,transform:`translate(-50%,-50%) rotate(${asset.rotation}deg) scaleX(${asset.flipX?-1:1}) scaleY(${asset.flipY?-1:1})`}}>{asset.kind==='video'?<video src={asset.url} autoPlay loop={asset.loop} muted={asset.muted} style={mediaStyle}/>:<img src={asset.url} alt={asset.alt||asset.name} style={mediaStyle}/>}</div>;
}

function canvasStyle(style:StudioElementStyle):CSSProperties{
  const justifyMap={start:'flex-start',center:'center',end:'flex-end',between:'space-between',around:'space-around',evenly:'space-evenly'} as const;
  const alignMap={start:'flex-start',center:'center',end:'flex-end',stretch:'stretch'} as const;
  const background=style.backgroundType==='transparent'?'transparent':style.backgroundType==='gradient'?`linear-gradient(${style.gradientAngle}deg,${style.gradientFrom},${style.gradientTo})`:style.backgroundColor;
  return {left:style.position==='absolute'?`${style.x}%`:undefined,top:style.position==='absolute'?`${style.y}%`:undefined,transform:style.position==='absolute'?'translate(-50%,-50%)':undefined,zIndex:style.zIndex,width:`${style.width}${style.widthUnit}`,minWidth:style.minWidth||undefined,maxWidth:style.maxWidth||undefined,minHeight:style.minHeight,maxHeight:style.maxHeight||undefined,margin:`${style.marginTop}px ${style.marginRight}px ${style.marginBottom}px ${style.marginLeft}px`,padding:`${style.paddingTop}px ${style.paddingRight}px ${style.paddingBottom}px ${style.paddingLeft}px`,display:style.layout==='free'?'block':style.layout,flexDirection:style.direction,flexWrap:style.wrap?'wrap':'nowrap',alignItems:alignMap[style.align],justifyContent:justifyMap[style.justify],gap:style.gap,gridTemplateColumns:style.layout==='grid'?`repeat(${Math.max(1,style.columns)},minmax(0,1fr))`:undefined,overflow:style.overflow,background,border:`${style.borderWidth}px ${style.borderStyle} ${style.borderColor}`,borderRadius:style.radius,opacity:style.opacity/100,filter:`blur(${style.blur}px)`,boxShadow:`${style.shadowX}px ${style.shadowY}px ${style.shadowBlur}px ${style.shadowSpread}px ${style.shadowColor},0 0 ${style.glow}px ${style.borderColor}`,fontFamily:style.fontFamily,fontSize:style.fontSize,fontWeight:style.fontWeight,lineHeight:style.lineHeight,letterSpacing:style.letterSpacing,textAlign:style.textAlign,color:style.textColor,textTransform:style.textTransform};
}

function LayerRow({section,selected,onSelect,onVisible,onLock,onDragStart,onDrop}:{section:StudioSection;selected:boolean;onSelect:()=>void;onVisible:()=>void;onLock:()=>void;onDragStart:()=>void;onDrop:()=>void}){return <div draggable onDragStart={onDragStart} onDragOver={event=>event.preventDefault()} onDrop={event=>{event.preventDefault();onDrop()}} className={`mb-1 flex items-center rounded-xl ${selected?'bg-purple-300/15':'hover:bg-white/5'}`}><button onClick={onSelect} className="flex min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left"><span className="text-white/25">⋮⋮</span><span className="truncate text-sm font-bold">{section.label}</span>{section.componentKey&&<span className="text-[9px] text-cyan-200">◆</span>}</button><button onClick={onLock} className="p-2 text-xs">{section.locked?'🔒':'🔓'}</button><button onClick={onVisible} className="p-2 text-xs">{section.visible?'◉':'○'}</button></div>}
function Panel({title,children,open=false}:{title:string;children:ReactNode;open?:boolean}){return <details open={open} className="my-4 rounded-2xl border border-white/10 bg-white/[.025] p-3"><summary className="cursor-pointer text-xs font-black uppercase tracking-wider text-white/55">{title}</summary><div className="mt-3 grid gap-3">{children}</div></details>}
function Grid({children}:{children:ReactNode}){return <div className="grid grid-cols-2 gap-2">{children}</div>}
function NumberField({label,value,onChange}:{label:string;value:number;onChange:(v:number)=>void}){return <label className="grid gap-1 text-[10px] font-black uppercase tracking-wider text-white/40">{label}<input type="number" value={Number.isFinite(value)?value:0} onChange={event=>onChange(Number(event.target.value))} className="rounded-lg border border-white/10 bg-black p-2 text-sm text-white"/></label>}
function TextField({label,value,onChange}:{label:string;value:string;onChange:(v:string)=>void}){return <label className="grid gap-1 text-[10px] font-black uppercase tracking-wider text-white/40">{label}<input value={value} onChange={event=>onChange(event.target.value)} className="rounded-lg border border-white/10 bg-black p-2 text-sm text-white"/></label>}
function ColorField({label,value,onChange}:{label:string;value:string;onChange:(v:string)=>void}){return <label className="flex items-center justify-between text-xs font-black uppercase text-white/40"><span>{label}</span><input type="color" value={normalizeColor(value)} onChange={event=>onChange(event.target.value)} className="h-9 w-14 rounded border-0 bg-transparent"/></label>}
function Select({label,value,options,onChange}:{label:string;value:string;options:string[];onChange:(v:string)=>void}){return <label className="grid gap-1 text-[10px] font-black uppercase tracking-wider text-white/40">{label}<select value={value} onChange={event=>onChange(event.target.value)} className="rounded-lg border border-white/10 bg-black p-2 text-sm text-white">{options.map(option=><option key={option}>{option}</option>)}</select></label>}
function Toggle({label,value,onChange}:{label:string;value:boolean;onChange:(v:boolean)=>void}){return <label className="flex items-center justify-between text-xs font-black text-white/55"><span>{label}</span><input type="checkbox" checked={value} onChange={event=>onChange(event.target.checked)}/></label>}
function clamp(value:number,min:number,max:number){return Math.max(min,Math.min(max,value));}
function normalizeColor(value:string){return /^#[0-9a-fA-F]{6}$/.test(value)?value:'#ffffff';}
