'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useWorldCustomization, type WorldKey } from '@/components/studio/WorldCustomizationProvider';

const SECRET_KEY='harmonic-studio-secret-session';
const worlds:WorldKey[]=['global','home','melodic','fried-em','schmackinn','two-harmonic'];
type UploadItem={id:string;name:string;preview:string;status:'preview'|'uploading'|'ready'|'error';message?:string};

export function StudioMediaUploadGuard({children}:{children:ReactNode}){
 const {settings,updateMedia,removeMedia}=useWorldCustomization();
 const settingsRef=useRef(settings);const [items,setItems]=useState<UploadItem[]>([]);
 useEffect(()=>{settingsRef.current=settings},[settings]);
 useEffect(()=>{
  function capture(event:Event){const input=event.target as HTMLInputElement|null;if(!input||input.type!=='file'||!input.files?.length)return;for(const file of Array.from(input.files))void persist(file);}
  document.addEventListener('change',capture,true);return()=>document.removeEventListener('change',capture,true);
 },[]);
 async function findTemporary(name:string){for(let attempt=0;attempt<30;attempt++){for(const world of worlds){const asset=settingsRef.current[world].media.find(item=>item.name===name&&item.url.startsWith('blob:'));if(asset)return{world,asset};}await new Promise(resolve=>setTimeout(resolve,100));}return null;}
 async function persist(file:File){const id=crypto.randomUUID(),preview=URL.createObjectURL(file);setItems(current=>[...current,{id,name:file.name,preview,status:'preview'}]);await new Promise(resolve=>setTimeout(resolve,0));setItems(current=>current.map(item=>item.id===id?{...item,status:'uploading'}:item));const temporary=await findTemporary(file.name);const world=temporary?.world??'global';
  try{const secret=window.sessionStorage.getItem(SECRET_KEY)||'';if(!secret)throw new Error('Enter the Studio Secret in the top toolbar, then upload again.');const form=new FormData();form.append('file',file);form.append('world',world);const response=await fetch('/api/world-design/upload',{method:'POST',headers:{'x-harmonic-studio-key':secret},body:form});const data=await response.json().catch(()=>({}));if(!response.ok||!data.url)throw new Error(data.error||'Upload failed.');if(temporary)updateMedia(world,temporary.asset.id,{url:data.url,kind:data.type==='video'?'video':'image',visible:true});setItems(current=>current.map(item=>item.id===id?{...item,status:'ready',preview:data.url,message:'Uploaded and placed on canvas'}:item));setTimeout(()=>setItems(current=>current.filter(item=>item.id!==id)),4500);
  }catch(error){if(temporary)removeMedia(world,temporary.asset.id);setItems(current=>current.map(item=>item.id===id?{...item,status:'error',message:error instanceof Error?error.message:'Upload failed'}:item));}
 }
 return <><div className="fixed bottom-5 right-5 z-[250] grid w-[min(360px,calc(100vw-2rem))] gap-2">{items.map(item=><div key={item.id} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/95 p-3 text-white shadow-2xl"><div className="h-14 w-14 overflow-hidden rounded-xl bg-white/5">{item.preview&&<img src={item.preview} alt="Upload preview" className="h-full w-full object-cover"/>}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-black">{item.name}</p><p className={`mt-1 text-xs ${item.status==='error'?'text-red-200':item.status==='ready'?'text-emerald-200':'text-cyan-100/70'}`}>{item.status==='preview'?'Preparing preview…':item.status==='uploading'?'Uploading to permanent storage…':item.message}</p>{item.status==='uploading'&&<div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full w-2/3 animate-pulse bg-cyan-200"/></div>}</div>{item.status==='error'&&<button onClick={()=>setItems(current=>current.filter(entry=>entry.id!==item.id))} className="text-xs text-white/50">Dismiss</button>}</div>)}</div>{children}</>;
}
