'use client';

import { useState, type ReactNode, type CSSProperties, type MouseEvent } from 'react';
import { parseStudioSections, readElementStyle, type StudioElementStyle, type StudioState } from '@/lib/creator-studio-model';

const motionClass:Record<string,string>={none:'',fade:'animate-[fadeIn_.45s_ease-out_both]','slide-up':'animate-[studioSlideUp_.55s_ease-out_both]',float:'animate-[studioFloat_5s_ease-in-out_infinite]',pulse:'animate-pulse',spin:'animate-[spin_18s_linear_infinite]',parallax:'animate-[studioFloat_8s_ease-in-out_infinite]'};

function toCss(style:StudioElementStyle,glow:string):CSSProperties{
  const background=style.backgroundType==='transparent'?'transparent':style.backgroundType==='gradient'?`linear-gradient(${style.gradientAngle}deg,${style.gradientFrom},${style.gradientTo})`:style.backgroundColor;
  return {
    width:`${style.width}${style.widthUnit}`,minWidth:style.minWidth||undefined,maxWidth:style.maxWidth||undefined,minHeight:style.minHeight,maxHeight:style.maxHeight||undefined,
    padding:`${style.paddingTop}px ${style.paddingRight}px ${style.paddingBottom}px ${style.paddingLeft}px`,
    margin:`${style.marginTop}px auto ${style.marginBottom}px auto`,borderRadius:style.radius,opacity:style.opacity/100,
    border:`${style.borderWidth}px ${style.borderStyle} ${style.borderColor}`,background,color:style.textColor,
    filter:`blur(${style.blur}px)`,boxShadow:`${style.shadowX}px ${style.shadowY}px ${style.shadowBlur}px ${style.shadowSpread}px ${style.shadowColor},0 0 ${style.glow}px ${glow}55`,
    fontFamily:style.fontFamily,fontSize:style.fontSize,fontWeight:style.fontWeight,lineHeight:style.lineHeight,letterSpacing:style.letterSpacing,textAlign:style.textAlign,textTransform:style.textTransform,
    transition:'all 180ms ease',
  };
}

export function StudioRuntimeSection({id,labels,glow,children,className=''}:{id:string;labels:Record<string,string>;glow:string;children:ReactNode;className?:string}){
  const [visualState,setVisualState]=useState<StudioState>('default');
  const style=readElementStyle(labels,id,'desktop',visualState);
  const section=parseStudioSections(labels.sectionStructure,'home').find(item=>item.id===id);
  const interaction=section?.interaction;

  function act(event:MouseEvent<HTMLDivElement>){
    if(!interaction||interaction.action==='none'||!interaction.target)return;
    if(interaction.action==='link'){if(interaction.newTab)window.open(interaction.target,'_blank','noopener,noreferrer');else window.location.href=interaction.target;return;}
    const target=document.getElementById(interaction.target)||document.querySelector(`[data-studio-section="${interaction.target}"]`) as HTMLElement|null;
    if(!target)return;
    if(interaction.action==='scroll')target.scrollIntoView({behavior:'smooth',block:'start'});
    if(interaction.action==='toggle')target.hidden=!target.hidden;
    if(interaction.action==='show')target.hidden=false;
    if(interaction.action==='hide'){target.hidden=true;event.stopPropagation();}
  }

  return <div
    id={`studio-${id}`}
    data-studio-section={id}
    tabIndex={0}
    onMouseEnter={()=>setVisualState('hover')}
    onMouseLeave={()=>setVisualState('default')}
    onMouseDown={()=>setVisualState('pressed')}
    onMouseUp={()=>setVisualState('hover')}
    onFocus={()=>setVisualState('focus')}
    onBlur={()=>setVisualState('default')}
    onClick={act}
    className={`${motionClass[style.motion]||''} ${interaction?.action&&interaction.action!=='none'?'cursor-pointer':''} ${className}`}
    style={toCss(style,glow)}
  >{children}</div>;
}
