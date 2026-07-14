'use client';

import type { CSSProperties } from 'react';
import type { WorldMediaAsset } from '@/components/studio/WorldCustomizationProvider';

export function RuntimeMediaLayers({assets,placement}:{assets:WorldMediaAsset[];placement?:WorldMediaAsset['placement']}){
  return <>{assets.filter(asset=>!placement||asset.placement===placement).map(asset=>{
    const style:CSSProperties={
      position:asset.placement==='background'?'fixed':'absolute',
      inset:asset.placement==='background'?0:undefined,
      left:asset.placement==='background'?undefined:`${asset.x}%`,
      top:asset.placement==='background'?undefined:`${asset.y}%`,
      width:asset.placement==='background'?'100%':`${asset.width}%`,
      height:asset.placement==='background'?'100%':undefined,
      opacity:asset.opacity/100,
      transform:asset.placement==='background'?undefined:`translate(-50%,-50%) rotate(${asset.rotation}deg)`,
      zIndex:asset.zIndex,
      pointerEvents:'none',
    };
    const className=asset.placement==='background'?'h-full w-full':'w-full rounded-2xl';
    return <div key={asset.id} data-studio-media={asset.id} style={style} aria-hidden="true">
      {asset.kind==='video'?<video src={asset.url} autoPlay loop={asset.loop} muted={asset.muted} playsInline className={className} style={{objectFit:asset.fit}}/>:<img src={asset.url} alt="" className={className} style={{objectFit:asset.fit}}/>}
    </div>;
  })}</>;
}
