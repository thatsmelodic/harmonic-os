import type { WorldKey } from '@/components/studio/WorldCustomizationProvider';

export type StudioElementKind = 'page' | 'section' | 'text' | 'button' | 'media' | 'collection';
export type StudioMotion = 'none' | 'fade' | 'slide-up' | 'float' | 'pulse' | 'spin' | 'parallax';
export type StudioPosition = 'absolute' | 'relative' | 'fixed' | 'sticky';
export type StudioLayout = 'free' | 'flex' | 'grid';
export type StudioUnit = 'px' | '%' | 'vw' | 'vh' | 'rem';
export type StudioAlign = 'start' | 'center' | 'end' | 'stretch';
export type StudioJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type StudioTextAlign = 'left' | 'center' | 'right' | 'justify';
export type StudioOverflow = 'visible' | 'hidden' | 'auto' | 'scroll';
export type StudioBreakpoint = 'desktop' | 'tablet' | 'mobile';
export type StudioState = 'default' | 'hover' | 'pressed' | 'focus';
export type StudioAction = 'none' | 'link' | 'scroll' | 'toggle' | 'show' | 'hide';

export type StudioInteraction = { action: StudioAction; target: string; newTab: boolean };
export type StudioSection = {
  id: string; label: string; kind: StudioElementKind; visible: boolean; locked: boolean; order: number;
  componentKey?: string; interaction?: StudioInteraction;
};

export type StudioElementStyle = {
  x:number; y:number; zIndex:number; position:StudioPosition; width:number; widthUnit:StudioUnit;
  minWidth:number; maxWidth:number; minHeight:number; maxHeight:number;
  padding:number; marginTop:number; marginRight:number; marginBottom:number; marginLeft:number;
  paddingTop:number; paddingRight:number; paddingBottom:number; paddingLeft:number;
  layout:StudioLayout; direction:'row'|'column'; wrap:boolean; align:StudioAlign; justify:StudioJustify; gap:number; columns:number; overflow:StudioOverflow;
  backgroundType:'solid'|'gradient'|'transparent'; backgroundColor:string; gradientFrom:string; gradientTo:string; gradientAngle:number;
  borderWidth:number; borderColor:string; borderStyle:'solid'|'dashed'|'dotted'|'none'; radius:number; opacity:number; blur:number; glow:number;
  shadowX:number; shadowY:number; shadowBlur:number; shadowSpread:number; shadowColor:string;
  fontFamily:string; fontSize:number; fontWeight:number; lineHeight:number; letterSpacing:number; textAlign:StudioTextAlign; textColor:string;
  textTransform:'none'|'uppercase'|'lowercase'|'capitalize'; motion:StudioMotion;
};

const worldSections: Record<WorldKey, Array<[string,string,StudioElementKind]>> = {
  global:[['navigation','Global Navigation','section'],['footer','Global Footer','section']],
  home:[['hero','Homepage Hero','section'],['overview','Overview','section'],['source','Melodic Source','section'],['worlds','World Frequencies','collection'],['community','Harmonic Community','section'],['footer','Homepage Footer','section']],
  melodic:[['hero','Hero','section'],['featured','Featured Release','section'],['collections','Music Collections','collection'],['community','Listener Community','section'],['archive','Memory Archive','collection'],['audio','Audio Layer','media']],
  'fried-em':[['hero','Hero','section'],['featured','Featured Game','section'],['collections','Episodes and Highlights','collection'],['community','Hoops Community','section'],['archive','Season Archive','collection']],
  schmackinn:[['hero','Got The Munchies Hero','section'],['featured','Featured Review','section'],['collections','Tier Archive','collection'],['community','Map and Community','section'],['archive','Food Memory Archive','collection'],['commerce','Flavor Pass','section'],['audio','Schmackinn Frequency','media']],
  'two-harmonic':[['hero','Fashion Hero','section'],['featured','Featured Drop','section'],['collections','Collections','collection'],['community','Harmonic Souls','section'],['archive','Stitch Archive','collection'],['commerce','Storefront','section']],
};

export const defaultElementStyle:StudioElementStyle={
  x:50,y:50,zIndex:1,position:'absolute',width:100,widthUnit:'%',minWidth:0,maxWidth:1400,minHeight:120,maxHeight:1200,
  padding:24,marginTop:0,marginRight:0,marginBottom:0,marginLeft:0,paddingTop:24,paddingRight:24,paddingBottom:24,paddingLeft:24,
  layout:'free',direction:'column',wrap:false,align:'start',justify:'start',gap:16,columns:3,overflow:'visible',
  backgroundType:'solid',backgroundColor:'#ffffff08',gradientFrom:'#a855f733',gradientTo:'#22d3ee22',gradientAngle:135,
  borderWidth:1,borderColor:'#ffffff1a',borderStyle:'solid',radius:20,opacity:100,blur:0,glow:30,
  shadowX:0,shadowY:12,shadowBlur:32,shadowSpread:0,shadowColor:'#00000066',fontFamily:'inherit',fontSize:16,fontWeight:400,
  lineHeight:1.5,letterSpacing:0,textAlign:'left',textColor:'#ffffff',textTransform:'none',motion:'fade',
};

export function createStudioSections(world:WorldKey):StudioSection[]{
  return worldSections[world].map(([id,label,kind],order)=>({id,label,kind,visible:true,locked:false,order,interaction:{action:'none',target:'',newTab:false}}));
}

export function parseStudioSections(raw:string|undefined,world:WorldKey):StudioSection[]{
  const defaults=createStudioSections(world); if(!raw)return defaults;
  try{
    const parsed=JSON.parse(raw) as StudioSection[];
    const merged=parsed.map((section,index)=>({...section,order:index,locked:Boolean(section.locked),visible:section.visible!==false,interaction:section.interaction??{action:'none',target:'',newTab:false}}));
    const missing=defaults.filter(item=>!merged.some(section=>section.id===item.id));
    return [...merged,...missing].map((section,order)=>({...section,order}));
  }catch{return defaults;}
}

function styleKey(elementId:string,breakpoint:StudioBreakpoint,state:StudioState){
  if(breakpoint==='desktop'&&state==='default')return `studio.style.${elementId}`;
  if(state==='default')return `studio.style.${elementId}.${breakpoint}`;
  return `studio.state.${elementId}.${breakpoint}.${state}`;
}

export function readElementStyle(labels:Record<string,string>,elementId:string,breakpoint:StudioBreakpoint='desktop',state:StudioState='default'):StudioElementStyle{
  const desktopRaw=labels[styleKey(elementId,'desktop','default')];
  let desktop:Partial<StudioElementStyle>&{padding?:number}={};
  try{desktop=desktopRaw?JSON.parse(desktopRaw):{};}catch{}
  let responsive:Partial<StudioElementStyle>={};
  if(breakpoint!=='desktop')try{responsive=JSON.parse(labels[styleKey(elementId,breakpoint,'default')]||'{}');}catch{}
  let statePatch:Partial<StudioElementStyle>={};
  if(state!=='default')try{statePatch=JSON.parse(labels[styleKey(elementId,breakpoint,state)]||'{}');}catch{}
  const legacy=typeof desktop.padding==='number'?desktop.padding:defaultElementStyle.padding;
  return {...defaultElementStyle,...desktop,paddingTop:desktop.paddingTop??legacy,paddingRight:desktop.paddingRight??legacy,paddingBottom:desktop.paddingBottom??legacy,paddingLeft:desktop.paddingLeft??legacy,...responsive,...statePatch};
}

export function writeElementStyle(style:StudioElementStyle):string{return JSON.stringify(style);}
export function writeStylePatch(patch:Partial<StudioElementStyle>):string{return JSON.stringify(patch);}
export function getStyleStorageKey(elementId:string,breakpoint:StudioBreakpoint='desktop',state:StudioState='default'){return styleKey(elementId,breakpoint,state);}

export function moveStudioSection(sections:StudioSection[],id:string,direction:-1|1):StudioSection[]{
  const ordered=[...sections].sort((a,b)=>a.order-b.order); const index=ordered.findIndex(s=>s.id===id); const target=index+direction;
  if(index<0||target<0||target>=ordered.length)return ordered; [ordered[index],ordered[target]]=[ordered[target],ordered[index]]; return ordered.map((s,order)=>({...s,order}));
}
export function reorderStudioSection(sections:StudioSection[],draggedId:string,targetId:string):StudioSection[]{
  const ordered=[...sections].sort((a,b)=>a.order-b.order); if(draggedId===targetId)return ordered;
  const from=ordered.findIndex(s=>s.id===draggedId),to=ordered.findIndex(s=>s.id===targetId); if(from<0||to<0)return ordered;
  const [moved]=ordered.splice(from,1); ordered.splice(to,0,moved); return ordered.map((s,order)=>({...s,order}));
}
export function addStudioSection(sections:StudioSection[],kind:StudioElementKind='section'):StudioSection[]{
  const id=`section-${Date.now().toString(36)}`; return [...sections,{id,label:'New Section',kind,visible:true,locked:false,order:sections.length,interaction:{action:'none',target:'',newTab:false}}];
}
export function duplicateStudioSection(sections:StudioSection[],id:string):StudioSection[]{
  const source=sections.find(s=>s.id===id); if(!source)return sections; const copy={...source,id:`${source.id}-copy-${Date.now().toString(36)}`,label:`${source.label} Copy`,order:source.order+1};
  const ordered=[...sections]; ordered.splice(source.order+1,0,copy); return ordered.map((s,order)=>({...s,order}));
}
export function removeStudioSection(sections:StudioSection[],id:string):StudioSection[]{return sections.filter(s=>s.id!==id).map((s,order)=>({...s,order}));}
