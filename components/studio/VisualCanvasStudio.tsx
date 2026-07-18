'use client';

import { useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { useWorldCustomization, type WorldKey, type WorldMediaAsset } from '@/components/studio/WorldCustomizationProvider';
import {
  createStudioSections,
  moveStudioSection,
  parseStudioSections,
  readElementStyle,
  reorderStudioSection,
  writeElementStyle,
  type StudioAlign,
  type StudioElementStyle,
  type StudioJustify,
  type StudioLayout,
  type StudioMotion,
  type StudioOverflow,
  type StudioPosition,
  type StudioSection,
  type StudioTextAlign,
  type StudioUnit,
} from '@/lib/creator-studio-model';

const worlds: Array<{ key: WorldKey; label: string }> = [
  { key: 'home', label: 'Homepage' }, { key: 'melodic', label: 'Melodic' }, { key: 'two-harmonic', label: '2 Harmonic' },
  { key: 'fried-em', label: 'Fried Em' }, { key: 'schmackinn', label: 'Schmackinn' }, { key: 'global', label: 'Global System' },
];
const motions: StudioMotion[] = ['none', 'fade', 'slide-up', 'float', 'pulse', 'spin', 'parallax'];
const fonts = ['inherit', 'Arial', 'Georgia', 'Impact', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Courier New'];

type SectionDragState = { id:string; startX:number; startY:number; originX:number; originY:number; originWidth:number; originHeight:number; mode:'move'|'resize' } | null;

export function VisualCanvasStudio() {
  const { settings, updateLabel, addMedia, updateMedia, removeMedia } = useWorldCustomization();
  const [world, setWorld] = useState<WorldKey>('home');
  const [selected, setSelected] = useState<string | null>('hero');
  const [sectionDrag, setSectionDrag] = useState<SectionDragState>(null);
  const [draggedLayer, setDraggedLayer] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const active = settings[world];
  const sections = useMemo(() => parseStudioSections(active.labels.sectionStructure, world), [active.labels.sectionStructure, world]);
  const orderedSections = useMemo(() => [...sections].sort((a,b) => a.order-b.order), [sections]);
  const selectedSection = selected && !selected.startsWith('media:') ? sections.find(section => section.id === selected) : undefined;
  const selectedMedia = selected?.startsWith('media:') ? active.media.find(asset => `media:${asset.id}` === selected) : undefined;
  const selectedStyle = selectedSection ? readElementStyle(active.labels, selectedSection.id) : undefined;

  function saveSections(next: StudioSection[]) { updateLabel(world, 'sectionStructure', JSON.stringify(next)); }
  function patchSection(sectionId:string, patch:Partial<StudioSection>) { saveSections(sections.map(section => section.id === sectionId ? {...section,...patch} : section)); }
  function patchStyle(sectionId:string, patch:Partial<StudioElementStyle>) {
    const current = readElementStyle(active.labels, sectionId);
    updateLabel(world, `studio.style.${sectionId}`, writeElementStyle({...current,...patch}));
  }
  function startSectionPointer(event:ReactPointerEvent<HTMLDivElement>, section:StudioSection, style:StudioElementStyle, mode:'move'|'resize') {
    event.stopPropagation(); setSelected(section.id); if (section.locked || style.position !== 'absolute') return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setSectionDrag({id:section.id,startX:event.clientX,startY:event.clientY,originX:style.x,originY:style.y,originWidth:style.width,originHeight:style.minHeight,mode});
  }
  function moveSectionPointer(event:ReactPointerEvent<HTMLDivElement>) {
    if (!sectionDrag) return;
    const canvas = event.currentTarget.closest('[data-studio-canvas]') as HTMLElement | null;
    const rect = canvas?.getBoundingClientRect(); if (!rect) return;
    const dx = ((event.clientX-sectionDrag.startX)/rect.width)*100;
    const dy = ((event.clientY-sectionDrag.startY)/rect.height)*100;
    if (sectionDrag.mode === 'move') patchStyle(sectionDrag.id,{x:clamp(sectionDrag.originX+dx,0,100),y:clamp(sectionDrag.originY+dy,0,100)});
    else patchStyle(sectionDrag.id,{width:clamp(sectionDrag.originWidth+dx,5,100),minHeight:clamp(sectionDrag.originHeight+(event.clientY-sectionDrag.startY),24,1200)});
  }
  function stopSectionPointer(event:ReactPointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setSectionDrag(null);
  }
  async function upload(files:FileList|null) {
    if (!files?.length) return;
    for (const file of Array.from(files)) addMedia(world,{name:file.name,url:URL.createObjectURL(file),kind:file.type.startsWith('video/')?'video':'image',placement:'floating',x:50,y:50,width:30,opacity:100,rotation:0,zIndex:10,loop:true,muted:true,fit:'contain',motion:'none',duration:6,delay:0});
  }

  return <main className="min-h-screen bg-[#050308] text-white">
    <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/85 px-5 py-4 backdrop-blur-2xl">
      <div><p className="text-[10px] font-black uppercase tracking-[.28em] text-purple-300/60">Creator Studio · Editable Controls 3–5</p><h1 className="text-2xl font-black">Visual Canvas</h1></div>
      <div className="flex flex-wrap gap-2">{worlds.map(item => <button key={item.key} onClick={()=>{setWorld(item.key);setSelected(createStudioSections(item.key)[0]?.id||null)}} className={`rounded-full px-4 py-2 text-xs font-black ${world===item.key?'bg-purple-200 text-black':'border border-white/10'}`}>{item.label}</button>)}</div>
    </header>

    <div className="grid min-h-[calc(100vh-73px)] xl:grid-cols-[310px_1fr_390px]">
      <aside className="border-r border-white/10 bg-black/35 p-4">
        <div className="mb-3 flex items-center justify-between"><p className="text-[10px] font-black uppercase tracking-[.24em] text-white/35">Layers</p><span className="text-[10px] text-white/30">Drag to reorder</span></div>
        <div className="rounded-2xl border border-white/10 bg-white/[.025] p-2">
          <button onClick={()=>setSelected(null)} className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left font-black"><span className="text-purple-200">▾</span><span>{worlds.find(item=>item.key===world)?.label}</span><span className="ml-auto text-[10px] uppercase text-white/30">Page</span></button>
          <div className="ml-3 border-l border-white/10 pl-2">
            {orderedSections.map(section => <LayerRow key={section.id} section={section} selected={selected===section.id} onSelect={()=>setSelected(section.id)} onToggleVisible={()=>patchSection(section.id,{visible:!section.visible})} onToggleLocked={()=>patchSection(section.id,{locked:!section.locked})} onDragStart={()=>setDraggedLayer(section.id)} onDrop={()=>{if(draggedLayer)saveSections(reorderStudioSection(sections,draggedLayer,section.id));setDraggedLayer(null)}} />)}
            <div className="mt-2 rounded-xl border border-white/10 bg-black/25 p-1">
              <button className="flex w-full items-center gap-2 px-2 py-2 text-left text-xs font-black" onClick={()=>setSelected(active.media[0]?`media:${active.media[0].id}`:null)}><span className="text-cyan-200">▾</span><span>Media</span><span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px]">{active.media.length}</span></button>
              {active.media.map(asset => <button key={asset.id} onClick={()=>setSelected(`media:${asset.id}`)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs ${selected===`media:${asset.id}`?'bg-purple-300/15 text-purple-100':'text-white/55 hover:bg-white/5'}`}><span>{asset.kind==='video'?'▶':'▧'}</span><span className="truncate">{asset.name}</span></button>)}
            </div>
          </div>
        </div>
        {selectedSection && <div className="mt-4 grid grid-cols-2 gap-2"><button onClick={()=>saveSections(moveStudioSection(sections,selectedSection.id,-1))} className="rounded-xl border border-white/10 p-3 text-xs font-black">Move Up</button><button onClick={()=>saveSections(moveStudioSection(sections,selectedSection.id,1))} className="rounded-xl border border-white/10 p-3 text-xs font-black">Move Down</button></div>}
        <button onClick={()=>fileRef.current?.click()} className="mt-4 w-full rounded-2xl border border-dashed border-purple-300/40 bg-purple-300/[.06] p-5 text-sm font-black">Drop / Upload Media</button>
        <input ref={fileRef} hidden type="file" multiple accept="image/*,video/*" onChange={event=>void upload(event.target.files)}/>
      </aside>

      <section className="relative overflow-auto bg-[#09060d] p-5">
        <div data-studio-canvas onPointerDown={()=>setSelected(null)} className="relative mx-auto min-h-[900px] max-w-[1400px] overflow-hidden rounded-[2rem] border border-white/10" style={{background:active.background,color:active.text,boxShadow:`0 0 60px ${active.glow}22`}}>
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:24px_24px]"/>
          {active.media.map(asset => <MediaLayer key={asset.id} asset={asset} selected={selected===`media:${asset.id}`} onSelect={()=>setSelected(`media:${asset.id}`)} onChange={patch=>updateMedia(world,asset.id,patch)}/>)}
          {orderedSections.filter(section=>section.visible).map(section=>{
            const style=readElementStyle(active.labels,section.id); const isSelected=selected===section.id;
            return <div key={section.id} onPointerDown={event=>startSectionPointer(event,section,style,'move')} onPointerMove={moveSectionPointer} onPointerUp={stopSectionPointer} onPointerCancel={stopSectionPointer} className={`${style.position==='absolute'?'absolute':'relative'} select-none transition ${section.locked||style.position!=='absolute'?'cursor-default':'cursor-move'} ${isSelected?'ring-2 ring-purple-200/70':''}`} style={canvasStyle(style)}>
              <p className="text-[10px] font-black uppercase tracking-[.2em]" style={{color:active.secondary}}>{section.kind}</p>
              <h2 className="mt-2 text-[1.65em] font-black">{section.label}</h2>
              <p className="mt-2 max-w-xl opacity-70">Select this section and use the full property controls.</p>
              {section.locked&&<span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[10px]">Locked</span>}
              {isSelected&&!section.locked&&style.position==='absolute'&&<div onPointerDown={event=>startSectionPointer(event,section,style,'resize')} onPointerMove={moveSectionPointer} onPointerUp={stopSectionPointer} onPointerCancel={stopSectionPointer} className="absolute -bottom-2 -right-2 h-5 w-5 cursor-se-resize rounded-full bg-purple-200 ring-4 ring-black"/>}
            </div>
          })}
        </div>
      </section>

      <aside className="max-h-[calc(100vh-73px)] overflow-y-auto border-l border-white/10 bg-black/40 p-4">
        <p className="text-[10px] font-black uppercase tracking-[.24em] text-white/35">Properties</p>
        {!selectedSection&&!selectedMedia&&<p className="mt-4 text-sm text-white/45">Select a section or media layer.</p>}
        {selectedSection&&selectedStyle&&<SectionProperties section={selectedSection} style={selectedStyle} patchSection={patch=>patchSection(selectedSection.id,patch)} patchStyle={patch=>patchStyle(selectedSection.id,patch)}/>} 
        {selectedMedia&&<MediaProperties media={selectedMedia} onChange={patch=>updateMedia(world,selectedMedia.id,patch)} onRemove={()=>{removeMedia(world,selectedMedia.id);setSelected(null)}}/>}
      </aside>
    </div>
  </main>;
}

function SectionProperties({section,style,patchSection,patchStyle}:{section:StudioSection;style:StudioElementStyle;patchSection:(patch:Partial<StudioSection>)=>void;patchStyle:(patch:Partial<StudioElementStyle>)=>void}) {
  return <>
    <input value={section.label} onChange={event=>patchSection({label:event.target.value})} className="mt-2 w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xl font-black outline-none focus:border-purple-300" aria-label="Layer name"/>
    <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={()=>patchSection({visible:!section.visible})} className="rounded-xl border border-white/10 p-3 text-xs font-black">{section.visible?'Hide':'Show'}</button><button onClick={()=>patchSection({locked:!section.locked})} className="rounded-xl border border-white/10 p-3 text-xs font-black">{section.locked?'Unlock':'Lock'}</button></div>

    <Panel title="Position & Size" open>
      <Select label="Position" value={style.position} options={['absolute','relative','fixed','sticky']} onChange={value=>patchStyle({position:value as StudioPosition})}/>
      <div className="grid grid-cols-2 gap-2"><NumberField label="X" value={style.x} onChange={x=>patchStyle({x})}/><NumberField label="Y" value={style.y} onChange={y=>patchStyle({y})}/></div>
      <div className="grid grid-cols-[1fr_95px] gap-2"><NumberField label="Width" value={style.width} onChange={width=>patchStyle({width})}/><Select label="Unit" value={style.widthUnit} options={['%','px','vw','vh','rem']} onChange={value=>patchStyle({widthUnit:value as StudioUnit})}/></div>
      <div className="grid grid-cols-2 gap-2"><NumberField label="Min width" value={style.minWidth} onChange={minWidth=>patchStyle({minWidth})}/><NumberField label="Max width" value={style.maxWidth} onChange={maxWidth=>patchStyle({maxWidth})}/><NumberField label="Min height" value={style.minHeight} onChange={minHeight=>patchStyle({minHeight})}/><NumberField label="Max height" value={style.maxHeight} onChange={maxHeight=>patchStyle({maxHeight})}/></div>
      <NumberField label="Layer order" value={style.zIndex} onChange={zIndex=>patchStyle({zIndex})}/>
    </Panel>

    <Panel title="Spacing">
      <p className="mb-2 text-[10px] font-black uppercase tracking-wider text-white/30">Margin</p>
      <FourSides values={[style.marginTop,style.marginRight,style.marginBottom,style.marginLeft]} onChange={([marginTop,marginRight,marginBottom,marginLeft])=>patchStyle({marginTop,marginRight,marginBottom,marginLeft})}/>
      <p className="mb-2 mt-4 text-[10px] font-black uppercase tracking-wider text-white/30">Padding</p>
      <FourSides values={[style.paddingTop,style.paddingRight,style.paddingBottom,style.paddingLeft]} onChange={([paddingTop,paddingRight,paddingBottom,paddingLeft])=>patchStyle({paddingTop,paddingRight,paddingBottom,paddingLeft})}/>
    </Panel>

    <Panel title="Layout">
      <Select label="Layout mode" value={style.layout} options={['free','flex','grid']} onChange={value=>patchStyle({layout:value as StudioLayout})}/>
      {style.layout==='flex'&&<><Select label="Direction" value={style.direction} options={['row','column']} onChange={value=>patchStyle({direction:value as 'row'|'column'})}/><Toggle label="Wrap children" checked={style.wrap} onChange={wrap=>patchStyle({wrap})}/></>}
      {style.layout==='grid'&&<NumberField label="Columns" value={style.columns} min={1} max={12} onChange={columns=>patchStyle({columns})}/>} 
      {style.layout!=='free'&&<><Select label="Align" value={style.align} options={['start','center','end','stretch']} onChange={value=>patchStyle({align:value as StudioAlign})}/><Select label="Justify" value={style.justify} options={['start','center','end','between','around','evenly']} onChange={value=>patchStyle({justify:value as StudioJustify})}/><NumberField label="Gap" value={style.gap} onChange={gap=>patchStyle({gap})}/></>}
      <Select label="Overflow" value={style.overflow} options={['visible','hidden','auto','scroll']} onChange={value=>patchStyle({overflow:value as StudioOverflow})}/>
    </Panel>

    <Panel title="Typography">
      <Select label="Font" value={style.fontFamily} options={fonts} onChange={fontFamily=>patchStyle({fontFamily})}/>
      <div className="grid grid-cols-2 gap-2"><NumberField label="Size" value={style.fontSize} min={8} max={160} onChange={fontSize=>patchStyle({fontSize})}/><NumberField label="Weight" value={style.fontWeight} min={100} max={900} step={100} onChange={fontWeight=>patchStyle({fontWeight})}/><NumberField label="Line height" value={style.lineHeight} min={0.5} max={3} step={0.1} onChange={lineHeight=>patchStyle({lineHeight})}/><NumberField label="Letter spacing" value={style.letterSpacing} min={-5} max={30} step={0.1} onChange={letterSpacing=>patchStyle({letterSpacing})}/></div>
      <Select label="Text align" value={style.textAlign} options={['left','center','right','justify']} onChange={value=>patchStyle({textAlign:value as StudioTextAlign})}/>
      <Select label="Transform" value={style.textTransform} options={['none','uppercase','lowercase','capitalize']} onChange={value=>patchStyle({textTransform:value as StudioElementStyle['textTransform']})}/>
      <ColorField label="Text color" value={style.textColor} onChange={textColor=>patchStyle({textColor})}/>
    </Panel>

    <Panel title="Background & Border">
      <Select label="Background" value={style.backgroundType} options={['solid','gradient','transparent']} onChange={value=>patchStyle({backgroundType:value as StudioElementStyle['backgroundType']})}/>
      {style.backgroundType==='solid'&&<ColorField label="Color" value={style.backgroundColor} onChange={backgroundColor=>patchStyle({backgroundColor})}/>} 
      {style.backgroundType==='gradient'&&<><div className="grid grid-cols-2 gap-2"><ColorField label="From" value={style.gradientFrom} onChange={gradientFrom=>patchStyle({gradientFrom})}/><ColorField label="To" value={style.gradientTo} onChange={gradientTo=>patchStyle({gradientTo})}/></div><Range label="Angle" value={style.gradientAngle} min={0} max={360} onChange={gradientAngle=>patchStyle({gradientAngle})}/></>}
      <div className="grid grid-cols-2 gap-2"><NumberField label="Border width" value={style.borderWidth} min={0} max={30} onChange={borderWidth=>patchStyle({borderWidth})}/><NumberField label="Corners" value={style.radius} min={0} max={200} onChange={radius=>patchStyle({radius})}/></div>
      <Select label="Border style" value={style.borderStyle} options={['solid','dashed','dotted','none']} onChange={value=>patchStyle({borderStyle:value as StudioElementStyle['borderStyle']})}/>
      <ColorField label="Border color" value={style.borderColor} onChange={borderColor=>patchStyle({borderColor})}/>
    </Panel>

    <Panel title="Effects">
      <Range label="Opacity" value={style.opacity} min={0} max={100} onChange={opacity=>patchStyle({opacity})}/><Range label="Blur" value={style.blur} min={0} max={30} onChange={blur=>patchStyle({blur})}/><Range label="Glow" value={style.glow} min={0} max={120} onChange={glow=>patchStyle({glow})}/>
      <div className="grid grid-cols-2 gap-2"><NumberField label="Shadow X" value={style.shadowX} onChange={shadowX=>patchStyle({shadowX})}/><NumberField label="Shadow Y" value={style.shadowY} onChange={shadowY=>patchStyle({shadowY})}/><NumberField label="Shadow blur" value={style.shadowBlur} min={0} onChange={shadowBlur=>patchStyle({shadowBlur})}/><NumberField label="Shadow spread" value={style.shadowSpread} onChange={shadowSpread=>patchStyle({shadowSpread})}/></div>
      <ColorField label="Shadow color" value={style.shadowColor} onChange={shadowColor=>patchStyle({shadowColor})}/>
      <Select label="Motion" value={style.motion} options={motions} onChange={value=>patchStyle({motion:value as StudioMotion})}/>
    </Panel>
  </>;
}

function MediaProperties({media,onChange,onRemove}:{media:WorldMediaAsset;onChange:(patch:Partial<WorldMediaAsset>)=>void;onRemove:()=>void}) {
  return <><input value={media.name} onChange={event=>onChange({name:event.target.value})} className="mt-2 w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xl font-black outline-none focus:border-purple-300" aria-label="Media layer name"/><Panel title="Media" open><Range label="X position" value={media.x} min={0} max={100} onChange={x=>onChange({x})}/><Range label="Y position" value={media.y} min={0} max={100} onChange={y=>onChange({y})}/><Range label="Width" value={media.width} min={5} max={100} onChange={width=>onChange({width})}/><Range label="Rotation" value={media.rotation} min={-180} max={180} onChange={rotation=>onChange({rotation})}/><Range label="Opacity" value={media.opacity} min={0} max={100} onChange={opacity=>onChange({opacity})}/><Range label="Layer order" value={media.zIndex} min={0} max={100} onChange={zIndex=>onChange({zIndex})}/><Select label="Fit" value={media.fit} options={['cover','contain']} onChange={value=>onChange({fit:value as 'cover'|'contain'})}/></Panel><button onClick={onRemove} className="mt-5 w-full rounded-xl border border-red-300/20 bg-red-300/10 p-3 text-xs font-black text-red-100">Remove Media</button></>;
}

function canvasStyle(style:StudioElementStyle):CSSProperties {
  const justifyMap:Record<StudioJustify,CSSProperties['justifyContent']>={start:'flex-start',center:'center',end:'flex-end',between:'space-between',around:'space-around',evenly:'space-evenly'};
  const alignMap:Record<StudioAlign,CSSProperties['alignItems']>={start:'flex-start',center:'center',end:'flex-end',stretch:'stretch'};
  const background=style.backgroundType==='transparent'?'transparent':style.backgroundType==='gradient'?`linear-gradient(${style.gradientAngle}deg, ${style.gradientFrom}, ${style.gradientTo})`:style.backgroundColor;
  return {
    left:style.position==='absolute'?`${style.x}%`:undefined, top:style.position==='absolute'?`${style.y}%`:undefined,
    transform:style.position==='absolute'?'translate(-50%,-50%)':undefined, zIndex:style.zIndex,
    width:`${style.width}${style.widthUnit}`, minWidth:style.minWidth||undefined, maxWidth:style.maxWidth||undefined,
    minHeight:style.minHeight, maxHeight:style.maxHeight||undefined,
    margin:`${style.marginTop}px ${style.marginRight}px ${style.marginBottom}px ${style.marginLeft}px`,
    padding:`${style.paddingTop}px ${style.paddingRight}px ${style.paddingBottom}px ${style.paddingLeft}px`,
    display:style.layout==='free'?'block':style.layout, flexDirection:style.layout==='flex'?style.direction:undefined, flexWrap:style.layout==='flex'&&style.wrap?'wrap':undefined,
    gridTemplateColumns:style.layout==='grid'?`repeat(${style.columns}, minmax(0, 1fr))`:undefined, alignItems:style.layout==='free'?undefined:alignMap[style.align], justifyContent:style.layout==='free'?undefined:justifyMap[style.justify], gap:style.layout==='free'?undefined:style.gap,
    overflow:style.overflow, background, borderWidth:style.borderWidth, borderColor:style.borderColor, borderStyle:style.borderStyle, borderRadius:style.radius,
    opacity:style.opacity/100, filter:`blur(${style.blur}px)`, boxShadow:`${style.shadowX}px ${style.shadowY}px ${style.shadowBlur}px ${style.shadowSpread}px ${style.shadowColor}, 0 0 ${style.glow}px ${style.borderColor}`,
    fontFamily:style.fontFamily, fontSize:style.fontSize, fontWeight:style.fontWeight, lineHeight:style.lineHeight, letterSpacing:style.letterSpacing, textAlign:style.textAlign, color:style.textColor, textTransform:style.textTransform,
  };
}

function LayerRow({section,selected,onSelect,onToggleVisible,onToggleLocked,onDragStart,onDrop}:{section:StudioSection;selected:boolean;onSelect:()=>void;onToggleVisible:()=>void;onToggleLocked:()=>void;onDragStart:()=>void;onDrop:()=>void}) {
  return <div draggable onDragStart={onDragStart} onDragOver={event=>event.preventDefault()} onDrop={event=>{event.preventDefault();onDrop()}} className={`group mb-1 flex items-center rounded-xl border ${selected?'border-purple-300 bg-purple-300/15':'border-transparent hover:border-white/10 hover:bg-white/[.035]'}`}><button onClick={onSelect} className="flex min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left"><span className="cursor-grab text-white/25">⋮⋮</span><span className="truncate text-sm font-bold">{section.label}</span><span className="ml-auto text-[9px] uppercase text-white/25">{section.kind}</span></button><button onClick={onToggleLocked} className="px-2 py-2 text-xs text-white/40 hover:text-white">{section.locked?'🔒':'🔓'}</button><button onClick={onToggleVisible} className="px-2 py-2 text-xs text-white/40 hover:text-white">{section.visible?'◉':'○'}</button></div>;
}

function Panel({title,children,open=false}:{title:string;children:ReactNode;open?:boolean}) { return <details open={open} className="mt-4 rounded-2xl border border-white/10 bg-white/[.025]"><summary className="cursor-pointer select-none px-4 py-3 text-xs font-black uppercase tracking-[.16em] text-white/65">{title}</summary><div className="grid gap-3 border-t border-white/10 p-4">{children}</div></details>; }
function Range({label,value,min,max,onChange}:{label:string;value:number;min:number;max:number;onChange:(value:number)=>void}) { return <label className="grid gap-2 text-xs font-black uppercase tracking-wider text-white/45"><span className="flex justify-between"><span>{label}</span><output>{Math.round(value*10)/10}</output></span><input type="range" value={value} min={min} max={max} step="0.1" onChange={event=>onChange(Number(event.target.value))}/></label>; }
function NumberField({label,value,onChange,min,max,step=1}:{label:string;value:number;onChange:(value:number)=>void;min?:number;max?:number;step?:number}) { return <label className="grid gap-1 text-[10px] font-black uppercase tracking-wider text-white/35">{label}<input type="number" value={value} min={min} max={max} step={step} onChange={event=>onChange(Number(event.target.value))} className="w-full rounded-xl border border-white/10 bg-black p-2.5 text-sm text-white"/></label>; }
function Select({label,value,options,onChange}:{label:string;value:string;options:readonly string[];onChange:(value:string)=>void}) { return <label className="grid gap-1 text-[10px] font-black uppercase tracking-wider text-white/35">{label}<select value={value} onChange={event=>onChange(event.target.value)} className="rounded-xl border border-white/10 bg-black p-2.5 text-sm text-white">{options.map(option=><option key={option} value={option}>{option}</option>)}</select></label>; }
function ColorField({label,value,onChange}:{label:string;value:string;onChange:(value:string)=>void}) { return <label className="grid gap-1 text-[10px] font-black uppercase tracking-wider text-white/35">{label}<span className="flex gap-2"><input type="color" value={normalizeColor(value)} onChange={event=>onChange(event.target.value)} className="h-10 w-12 rounded border border-white/10 bg-black"/><input value={value} onChange={event=>onChange(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black px-2 text-sm text-white"/></span></label>; }
function Toggle({label,checked,onChange}:{label:string;checked:boolean;onChange:(checked:boolean)=>void}) { return <label className="flex items-center justify-between rounded-xl border border-white/10 p-3 text-xs font-black text-white/55"><span>{label}</span><input type="checkbox" checked={checked} onChange={event=>onChange(event.target.checked)}/></label>; }
function FourSides({values,onChange}:{values:[number,number,number,number];onChange:(values:[number,number,number,number])=>void}) { const labels=['Top','Right','Bottom','Left']; return <div className="grid grid-cols-2 gap-2">{values.map((value,index)=><NumberField key={labels[index]} label={labels[index]} value={value} onChange={next=>{const copy=[...values] as [number,number,number,number];copy[index]=next;onChange(copy)}}/>)}</div>; }

function MediaLayer({asset,selected,onSelect,onChange}:{asset:WorldMediaAsset;selected:boolean;onSelect:()=>void;onChange:(patch:Partial<WorldMediaAsset>)=>void}) {
  const [drag,setDrag]=useState<{startX:number;startY:number;originX:number;originY:number}|null>(null);
  function start(event:ReactPointerEvent<HTMLDivElement>){event.stopPropagation();onSelect();event.currentTarget.setPointerCapture(event.pointerId);setDrag({startX:event.clientX,startY:event.clientY,originX:asset.x,originY:asset.y})}
  function move(event:ReactPointerEvent<HTMLDivElement>){if(!drag)return;const canvas=event.currentTarget.closest('[data-studio-canvas]') as HTMLElement|null;const rect=canvas?.getBoundingClientRect();if(!rect)return;onChange({x:clamp(drag.originX+((event.clientX-drag.startX)/rect.width)*100,0,100),y:clamp(drag.originY+((event.clientY-drag.startY)/rect.height)*100,0,100)})}
  function stop(event:ReactPointerEvent<HTMLDivElement>){if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);setDrag(null)}
  return <div onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} className={`absolute cursor-move touch-none ${selected?'ring-2 ring-purple-200':'ring-0'}`} style={{left:`${asset.x}%`,top:`${asset.y}%`,width:`${asset.width}%`,opacity:asset.opacity/100,transform:`translate(-50%,-50%) rotate(${asset.rotation}deg)`,zIndex:asset.zIndex}}>{asset.kind==='video'?<video src={asset.url} autoPlay loop={asset.loop} muted={asset.muted} className="pointer-events-none w-full rounded-xl" style={{objectFit:asset.fit}}/>:<img src={asset.url} alt={asset.name} className="pointer-events-none w-full rounded-xl" style={{objectFit:asset.fit}}/>}</div>;
}

function normalizeColor(value:string){return /^#[0-9a-f]{6}$/i.test(value)?value:'#000000'}
function clamp(value:number,min:number,max:number){return Math.max(min,Math.min(max,value))}
