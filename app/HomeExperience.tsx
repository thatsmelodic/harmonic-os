'use client';

import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useWorldCustomization, type WorldKey } from '@/components/studio/WorldCustomizationProvider';
import { parseStudioSections } from '@/lib/creator-studio-model';
import { StudioRuntimeSection } from '@/components/runtime/StudioRuntimeSection';
import { RuntimeMediaLayers } from '@/components/runtime/RuntimeMediaLayers';
import styles from './homepage.module.css';

type World={id:Exclude<WorldKey,'global'|'home'>;prompt:string;name:string;frequency:string;icon:string;href:string;color:string;items:string[];summary:string};
const defaultWorlds:World[]=[
 {id:'melodic',prompt:'Hear something?',name:'Melodic',frequency:'Music Frequency',icon:'♪',href:'/worlds/melodic',color:'#a952ff',items:['Beats & Songs','Studio Sessions','Behind The Sound','Melodic Voices'],summary:'The source frequency for music, performance, studio sessions, releases, and the creative process behind Melodic.'},
 {id:'two-harmonic',prompt:'Ready to resonate?',name:'2 Harmonic',frequency:'Fashion Frequency',icon:'∞',href:'/worlds/two-harmonic',color:'#57bfff',items:['Collections','Drops','Behind The Stitch','Harmonic Souls'],summary:'The fashion world of stitched melodies, collection stories, garment design, drops, and community expression.'},
 {id:'fried-em',prompt:'Feeling competitive?',name:'Fried Em',frequency:'Hoops Frequency',icon:'◉',href:'/worlds/fried-em',color:'#ff8b2b',items:['Game Highlights','Training','Challenges','Behind The Grind'],summary:'Basketball, competition, smoke, training, highlights, challenges, and the grind behind every bucket.'},
 {id:'schmackinn',prompt:'Got the munchies?',name:'Schmackinn',frequency:'Food Frequency',icon:'◒',href:'/worlds/schmackinn',color:'#c05cff',items:['Food Reviews','Tier Lists','Restaurant Map','Community Picks'],summary:'Real food reviews, honest rankings, restaurant discoveries, community picks, and the Schmackinn tier archive.'},
];
function splitItems(value:string|undefined,fallback:string[]){const items=value?.split('\n').map(item=>item.trim()).filter(Boolean);return items?.length?items:fallback;}

export default function HomeExperience(){
 const router=useRouter();
 const {settings}=useWorldCustomization();
 const [openWorld,setOpenWorld]=useState<string|null>(null);
 const home=settings.home;
 const structure=useMemo(()=>parseStudioSections(home.labels.sectionStructure,'home'),[home.labels.sectionStructure]);
 const worlds=useMemo(()=>defaultWorlds.map(fallback=>{const managed=settings[fallback.id];return {...fallback,prompt:managed.labels.homePrompt||fallback.prompt,name:managed.labels.homeName||fallback.name,frequency:managed.labels.homeFrequency||fallback.frequency,icon:managed.labels.homeIcon||fallback.icon,color:managed.primary||fallback.color,items:splitItems(managed.labels.homeItems,fallback.items),summary:managed.labels.homeSummary||managed.subtitle||fallback.summary};}),[settings]);
 const active=worlds.find(world=>world.id===openWorld)??null;
 const pageStyle={'--studio-primary':home.primary,'--studio-secondary':home.secondary,'--studio-accent':home.accent,'--studio-background':home.background,'--studio-surface':home.surface,'--studio-text':home.text,'--studio-muted':home.muted,'--studio-border':home.border,'--studio-glow':home.glow,background:home.background,color:home.text} as CSSProperties;

 const nodes:Record<string,ReactNode>={
  hero:<section className={styles.hero}><div><p className={styles.eyebrow}>{home.labels.eyebrow||'The connected multimedia ecosystem'}</p><h1>{home.title||'Harmonic OS'}</h1><p className={styles.tagline}>{home.subtitle||'One Frequency. Many Worlds.'}</p></div><div className={styles.heroLogo} aria-hidden="true">{home.labels.heroIcon||'∞'}</div></section>,
  overview:<section className={styles.overview} id="overview"><span>{home.labels['overview.title']||'Overview'}</span><p>{home.labels['overview.description']||'Harmonic OS is a multimedia ecosystem under the Melodic brand. Each world represents a different frequency of expression — all connected by the same purpose: Inspire. Entertain. Elevate.'}</p></section>,
  source:<section className={styles.sourceFlow}><button className={styles.sourceCard} type="button" onClick={()=>setOpenWorld(null)}><span className={styles.crown}>{home.labels.sourceIcon||'♛'}</span><strong>{home.labels.sourceTitle||'Melodic'}</strong><small>{home.labels.sourceLabel||'The Source'}</small><p>{home.labels.sourceDescription||'Vision. Purpose. Creation.'}</p></button><span className={styles.flowLine} aria-hidden="true"/></section>,
  worlds:<section className={styles.worldSection} id="worlds"><div className={styles.worldGrid}>{worlds.map(world=>{const isOpen=openWorld===world.id;return <button key={world.id} type="button" className={`${styles.worldCard} ${isOpen?styles.worldCardOpen:''}`} style={{'--world-color':world.color} as CSSProperties} aria-expanded={isOpen} onClick={()=>setOpenWorld(isOpen?null:world.id)}><span className={styles.worldPrompt}>{world.prompt}</span><span className={styles.worldIcon}>{world.icon}</span><span className={styles.worldName}>{world.name}</span><span className={styles.worldFrequency}>{world.frequency}</span><span className={styles.expandLabel}>{isOpen?'Close frequency':'Open frequency'}</span></button>})}</div><div className={`${styles.dropdown} ${active?styles.dropdownOpen:''}`} aria-live="polite">{active&&<div className={styles.dropdownInner} style={{'--world-color':active.color} as CSSProperties}><div className={styles.dropdownLead}><span className={styles.dropdownIcon}>{active.icon}</span><div><small>{active.frequency}</small><h2>{active.name}</h2></div></div><p>{active.summary}</p><ul>{active.items.map(item=><li key={item}>{item}</li>)}</ul><button type="button" onClick={()=>router.push(active.href)}>Enter {active.name}</button></div>}</div></section>,
  community:<section className={styles.community} id="community"><span className={styles.communityIcon}>{home.labels.communityIcon||'♙♙♙'}</span><div><h2>{home.labels['community.title']||'Harmonic Community'}</h2><p>{home.labels['community.description']||'One community. Different frequencies.'}</p></div><div className={styles.communityLinks}><span>Engage</span><i/><span>Support</span><i/><span>Create</span><i/><span>Elevate</span></div></section>,
  footer:<footer className={styles.footer}><span>{home.labels.footerLeft||'Stay in tune.'}</span><div className={styles.wave}>{home.labels.footerWave||'⌁⌁⌁⌁⌁'}</div><span>{home.labels.footerRight||'Stay in harmony.'}</span></footer>,
 };

 return <main className={styles.page} style={pageStyle}>
  <RuntimeMediaLayers assets={home.media} placement="background"/>
  <div className={styles.noise} aria-hidden="true"/>
  <header className={styles.topbar}><button className={styles.brand} type="button" onClick={()=>setOpenWorld(null)}><span className={styles.brandMark}>{home.labels.brandIcon||'∞'}</span><span>{home.labels.brandName||home.title||'Harmonic OS'}</span></button><nav className={styles.nav} aria-label="Primary navigation"><button type="button" onClick={()=>setOpenWorld(null)}>Home</button><a href="#worlds">Worlds</a><a href="#overview">About</a><a href="#community">Community</a><a href="/worlds/two-harmonic">Shop</a><a href="/studio/visual">Creator Studio</a></nav><span className={styles.navLogo}>{home.labels.brandIcon||'∞'}</span></header>
  {structure.filter(item=>item.visible&&nodes[item.id]).sort((a,b)=>a.order-b.order).map(item=><StudioRuntimeSection key={item.id} id={item.id} labels={home.labels} glow={home.glow}>{nodes[item.id]}</StudioRuntimeSection>)}
  <RuntimeMediaLayers assets={home.media.filter(asset=>asset.placement!=='background')}/>
 </main>;
}
