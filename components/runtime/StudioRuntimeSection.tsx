'use client';

import type { ReactNode, CSSProperties } from 'react';
import { readElementStyle } from '@/lib/creator-studio-model';

const motionClass: Record<string,string> = {
  none:'',
  fade:'animate-[fadeIn_.45s_ease-out_both]',
  'slide-up':'animate-[studioSlideUp_.55s_ease-out_both]',
  float:'animate-[studioFloat_5s_ease-in-out_infinite]',
  pulse:'animate-pulse',
  spin:'animate-[spin_18s_linear_infinite]',
  parallax:'animate-[studioFloat_8s_ease-in-out_infinite]',
};

export function StudioRuntimeSection({id,labels,glow,children,className=''}:{id:string;labels:Record<string,string>;glow:string;children:ReactNode;className?:string}){
  const style=readElementStyle(labels,id);
  const css:CSSProperties={
    width:`${style.width}%`,
    minHeight:style.minHeight,
    padding:style.padding,
    borderRadius:style.radius,
    opacity:style.opacity/100,
    filter:`blur(${style.blur}px)`,
    boxShadow:style.glow>0?`0 0 ${style.glow}px ${glow}55`:undefined,
    marginLeft:'auto',
    marginRight:'auto',
  };
  return <div data-studio-section={id} className={`${motionClass[style.motion]||''} ${className}`} style={css}>{children}</div>;
}
