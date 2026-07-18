import type { WorldKey } from '@/components/studio/WorldCustomizationProvider';

export type StudioElementKind='page'|'section'|'text'|'button'|'media'|'collection';
export type StudioMotion='none'|'fade'|'slide-up'|'float'|'pulse'|'spin'|'parallax';
export type StudioPosition='absolute'|'relative'|'fixed'|'sticky';
export type StudioLayout='free'|'flex'|'grid';
export type StudioUnit='px'|'%'|'vw'|'vh'|'rem';
export type StudioAlign='start'|'center'|'end'|'stretch';
export type StudioJustify='start'|'center'|'end'|'between'|'around'|'evenly';
export type StudioTextAlign='left'|'center'|'right'|'justify';
export type StudioOverflow='visible'|'hidden'|'auto'|'scroll';
export type StudioBreakpoint='desktop'|'laptop'|'tablet'|'mobile';
export type StudioState='default'|'hover'|'pressed'|'focus';
export type StudioAction='none'|'link'|'scroll'|'toggle'|'show'|'hide';
export type StudioInteraction={action:StudioAction;target:string;newTab:boolean};
export type StudioBreakpointVisibility=Record<StudioBreakpoint,boolean>;

export type StudioSection={
  id:string;label:string;kind:StudioElementKind;visible:boolean;locked:boolean;order:number;
  parentId?:string;collapsed?:boolean;componentKey?:string;componentVariant?:string;componentLinked?:boolean;
  breakpointVisibility?:Partial<StudioBreakpointVisibility>;interaction?:StudioInteraction;
};

export type StudioElementStyle={
  x:number;y:number;zIndex:number;position:StudioPosition;width:number;widthUnit:StudioUnit;
  minWidth:number;maxWidth:number;minHeight:number;maxHeight:number;padding:number;
  marginTop:number;marginRight:number;marginBottom:number;marginLeft:number;
  paddingTop:number;paddingRight:number;paddingBottom:number;paddingLeft:number;
  layout:StudioLayout;direction:'row'|'column';wrap:boolean;align:StudioAlign;justify:StudioJustify;gap:number;columns:number;overflow:StudioOverflow;
  backgroundType:'solid'|'gradient'|'transparent';backgroundColor:string;gradientFrom:string;gradientTo:string;gradientAngle:number;
  borderWidth:number;borderColor:string;borderStyle:'solid'|'dashed'|'dotted'|'none';radius:number;opacity:number;blur:number;glow:number;
  shadowX:number;shadowY:number;shadowBlur:number;shadowSpread:number;shadowColor:string;
  fontFamily:string;fontSize:number;fontWeight:number;lineHeight:number;letterSpacing:number;textAlign:StudioTextAlign;textColor:string;
  textTransform:'none'|'uppercase'|'lowercase'|'capitalize';motion:StudioMotion;
};

const worldSections:Record<WorldKey,Array<[string,string,StudioElementKind]>>={
  global:[['navigation','Global Navigation','section'],['footer','Global Footer','section']],
  home:[['hero','Homepage Hero','section'],['overview','Overview','section'],['source','Melodic Source','section'],['worlds','World Frequencies','collection'],['community','Harmonic Community','section'],['footer','Homepage Footer','section']],
  melodic:[['hero','Hero','section'],['featured','Featured Release','section'],['collections','Music Collections','collection'],['community','Listener Community','section'],['archive','Memory Archive','collection'],['audio','Audio Layer','media']],
  'fried-em':[['hero','Hero','section'],['featured','Featured Game','section'],['collections','Episodes and Highlights','collection'],['community','Hoops Community','section'],['archive','Season Archive','collection']],
  schmackinn:[['hero','Got The Munchies Hero','section'],['featured','Featured Review','section'],['collections','Tier Archive','collection'],['community','Map and Community','section'],['archive','Food Memory Archive','collection'],['commerce','Flavor Pass','section'],['audio','Schmackinn Frequency','media']],
  'two-harmonic':[['hero','Fashion Hero','section'],['featured','Featured Drop','section'],['collections','Collections','collection'],['community','Harmonic Souls','section'],['archive','Stitch Archive','collection'],['commerce','Storefront','section']],
};

export const defaultElementStyle:StudioElementStyle={
  x:50,y:50,zIndex:1,position:'absolute',width:100,widthUnit:'%',minWidth:0,maxWidth:1400,minHeight:120,maxHeight:1200,padding:24,
  marginTop:0,marginRight:0,marginBottom:0,marginLeft:0,paddingTop:24,paddingRight:24,paddingBottom:24,paddingLeft:24,
  layout:'free',direction:'column',wrap:false,align:'start',justify:'start',gap:16,columns:3,overflow:'visible',
  backgroundType:'solid',backgroundColor:'#ffffff08',gradientFrom:'#a855f733',gradientTo:'#22d3ee22',gradientAngle:135,
  borderWidth:1,borderColor:'#ffffff1a',borderStyle:'solid',radius:20,opacity:100,blur:0,glow:30,shadowX:0,shadowY:12,shadowBlur:32,shadowSpread:0,shadowColor:'#00000066',
  fontFamily:'inherit',fontSize:16,fontWeight:400,lineHeight:1.5,letterSpacing:0,textAlign:'left',textColor:'#ffffff',textTransform:'none',motion:'fade',
};
const visibility=():StudioBreakpointVisibility=>({desktop:true,laptop:true,tablet:true,mobile:true});
const interaction=():StudioInteraction=>({action:'none',target:'',newTab:false});

export function createStudioSections(world:WorldKey):StudioSection[]{return worldSections[world].map(([id,label,kind],order)=>({id,label,kind,visible:true,locked:false,order,breakpointVisibility:visibility(),interaction:interaction()}));}
export function parseStudioSections(raw:string|undefined,world:WorldKey):StudioSection[]{
  const defaults=createStudioSections(world);if(!raw)return defaults;
  try{const parsed=JSON.parse(raw) as StudioSection[];const merged=parsed.map((s,index)=>({...s,order:index,locked:Boolean(s.locked),visible:s.visible!==false,breakpointVisibility:{...visibility(),...s.breakpointVisibility},interaction:s.interaction??interaction()}));const missing=defaults.filter(d=>!merged.some(s=>s.id===d.id));return [...merged,...missing].map((s,order)=>({...s,order}));}catch{return defaults;}
}
function styleKey(id:string,bp:StudioBreakpoint,state:StudioState){if(bp==='desktop'&&state==='default')return`studio.style.${id}`;if(state==='default')return`studio.style.${id}.${bp}`;return`studio.state.${id}.${bp}.${state}`;}
export function readElementStyle(labels:Record<string,string>,id:string,bp:StudioBreakpoint='desktop',state:StudioState='default'):StudioElementStyle{
  let desktop:Partial<StudioElementStyle>&{padding?:number}={};try{desktop=JSON.parse(labels[styleKey(id,'desktop','default')]||'{}')}catch{}
  let responsive:Partial<StudioElementStyle>={};if(bp!=='desktop')try{responsive=JSON.parse(labels[styleKey(id,bp,'default')]||'{}')}catch{}
  let statePatch:Partial<StudioElementStyle>={};if(state!=='default')try{statePatch=JSON.parse(labels[styleKey(id,bp,state)]||'{}')}catch{}
  const legacy=typeof desktop.padding==='number'?desktop.padding:defaultElementStyle.padding;
  return {...defaultElementStyle,...desktop,paddingTop:desktop.paddingTop??legacy,paddingRight:desktop.paddingRight??legacy,paddingBottom:desktop.paddingBottom??legacy,paddingLeft:desktop.paddingLeft??legacy,...responsive,...statePatch};
}
export const writeElementStyle=(style:StudioElementStyle)=>JSON.stringify(style);
export const writeStylePatch=(patch:Partial<StudioElementStyle>)=>JSON.stringify(patch);
export const getStyleStorageKey=(id:string,bp:StudioBreakpoint='desktop',state:StudioState='default')=>styleKey(id,bp,state);
export const isSectionVisibleAt=(section:StudioSection,bp:StudioBreakpoint)=>section.visible!==false&&(section.breakpointVisibility?.[bp]??true);

export function moveStudioSection(sections:StudioSection[],id:string,direction:-1|1){const ordered=[...sections].sort((a,b)=>a.order-b.order);const i=ordered.findIndex(s=>s.id===id),t=i+direction;if(i<0||t<0||t>=ordered.length)return ordered;[ordered[i],ordered[t]]=[ordered[t],ordered[i]];return ordered.map((s,order)=>({...s,order}));}
export function reorderStudioSection(sections:StudioSection[],draggedId:string,targetId:string){const ordered=[...sections].sort((a,b)=>a.order-b.order);if(draggedId===targetId)return ordered;const from=ordered.findIndex(s=>s.id===draggedId),to=ordered.findIndex(s=>s.id===targetId);if(from<0||to<0)return ordered;const[moved]=ordered.splice(from,1);ordered.splice(to,0,moved);return ordered.map((s,order)=>({...s,order}));}
export function addStudioSection(sections:StudioSection[],kind:StudioElementKind='section',parentId?:string){const id=`section-${Date.now().toString(36)}`;return[...sections,{id,label:'New Section',kind,visible:true,locked:false,order:sections.length,parentId,breakpointVisibility:visibility(),interaction:interaction()}];}
export function duplicateStudioSection(sections:StudioSection[],id:string){const source=sections.find(s=>s.id===id);if(!source)return sections;const copy={...source,id:`${source.id}-copy-${Date.now().toString(36)}`,label:`${source.label} Copy`,order:source.order+1,componentLinked:false};const ordered=[...sections];ordered.splice(source.order+1,0,copy);return ordered.map((s,order)=>({...s,order}));}
export function removeStudioSection(sections:StudioSection[],id:string){const children=new Set([id]);let changed=true;while(changed){changed=false;for(const s of sections)if(s.parentId&&children.has(s.parentId)&&!children.has(s.id)){children.add(s.id);changed=true;}}return sections.filter(s=>!children.has(s.id)).map((s,order)=>({...s,order}));}
export function nestStudioSection(sections:StudioSection[],id:string,parentId?:string){if(id===parentId)return sections;const descendants=new Set<string>();const visit=(current:string)=>{for(const s of sections)if(s.parentId===current){descendants.add(s.id);visit(s.id);}};visit(id);if(parentId&&descendants.has(parentId))return sections;return sections.map(s=>s.id===id?{...s,parentId}:s);}
export function getStudioTree(sections:StudioSection[]){const ordered=[...sections].sort((a,b)=>a.order-b.order);const result:Array<{section:StudioSection;depth:number}>=[];const walk=(parentId:string|undefined,depth:number)=>{for(const s of ordered.filter(item=>item.parentId===parentId)){result.push({section:s,depth});if(!s.collapsed)walk(s.id,depth+1);}};walk(undefined,0);for(const s of ordered)if(!result.some(item=>item.section.id===s.id))result.push({section:s,depth:0});return result;}
