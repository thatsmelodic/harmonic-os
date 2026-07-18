'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import * as tus from 'tus-js-client';
import { useWorldCustomization, type WorldKey } from '@/components/studio/WorldCustomizationProvider';
import { studioAuthHeaders } from '@/lib/studio-auth-client';

const MAX_BYTES=5*1024*1024*1024;
const IMAGE_TARGET_BYTES=8*1024*1024;
const IMAGE_MAX_EDGE=4096;
const worlds:WorldKey[]=['global','home','melodic','fried-em','schmackinn','two-harmonic'];
type UploadItem={id:string;name:string;preview:string;status:'preview'|'uploading'|'ready'|'error';message?:string;progress?:number};

function selectedWorldFromStudio():WorldKey{const active=Array.from(document.querySelectorAll('button')).find(button=>button.className.includes('bg-purple-200')||button.className.includes('bg-white/12')||button.className.includes('bg-purple-300/15'));const label=(active?.querySelector('p')?.textContent||active?.textContent||'').trim().toLowerCase();if(label.includes('homepage'))return'home';if(label.includes('melodic'))return'melodic';if(label.includes('fried em'))return'fried-em';if(label.includes('schmackinn'))return'schmackinn';if(label.includes('2 harmonic'))return'two-harmonic';if(label.includes('global system'))return'global';return'home'}
function formatBytes(bytes:number){if(bytes<1024*1024)return`${Math.max(1,Math.round(bytes/1024))} KB`;return`${(bytes/1024/1024).toFixed(1)} MB`}
async function optimizeImage(file:File):Promise<File>{
 if(!file.type.startsWith('image/')||file.type==='image/gif'||file.type==='image/svg+xml')return file;
 const bitmap=await createImageBitmap(file);
 const scale=Math.min(1,IMAGE_MAX_EDGE/Math.max(bitmap.width,bitmap.height));
 if(file.size<=IMAGE_TARGET_BYTES&&scale===1){bitmap.close();return file}
 const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));
 const context=canvas.getContext('2d');if(!context){bitmap.close();return file}context.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
 let quality=.9;let blob:Blob|null=null;
 do{blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',quality));quality-=.08}while(blob&&blob.size>IMAGE_TARGET_BYTES&&quality>=.5);
 if(!blob||blob.size>=file.size)return file;
 const base=file.name.replace(/\.[^.]+$/,'');return new File([blob],`${base}.jpg`,{type:'image/jpeg',lastModified:file.lastModified});
}

export function StudioMediaUploadGuard({children}:{children:ReactNode}){
 const {settings,addMedia,updateMedia,removeMedia}=useWorldCustomization();const settingsRef=useRef(settings);const [items,setItems]=useState<UploadItem[]>([]);
 useEffect(()=>{settingsRef.current=settings},[settings]);useEffect(()=>{function capture(event:Event){const input=event.target as HTMLInputElement|null;if(!input||input.type!=='file'||!input.files?.length)return;for(const file of Array.from(input.files))void persist(file)}document.addEventListener('change',capture,true);return()=>document.removeEventListener('change',capture,true)},[]);
 async function findTemporary(name:string){for(let attempt=0;attempt<30;attempt++){for(const world of worlds){const asset=settingsRef.current[world].media.find(item=>item.name===name&&item.url.startsWith('blob:'));if(asset)return{world,asset}}await new Promise(resolve=>setTimeout(resolve,100))}return null}
 async function persist(original:File){
  const id=crypto.randomUUID(),preview=URL.createObjectURL(original);setItems(current=>[...current,{id,name:original.name,preview,status:'preview',progress:0}]);
  const temporary=await findTemporary(original.name);const world=temporary?.world??selectedWorldFromStudio();
  try{
   if(original.size>MAX_BYTES)throw new Error('This file is larger than the 5 GB upload limit.');
   setItems(current=>current.map(item=>item.id===id?{...item,status:'uploading',message:'Optimizing media for upload…'}:item));
   const file=await optimizeImage(original);
   if(file!==original)setItems(current=>current.map(item=>item.id===id?{...item,name:file.name,message:`Optimized ${formatBytes(original.size)} → ${formatBytes(file.size)}. Preparing upload…`}:item));
   const headers=await studioAuthHeaders();
   const response=await fetch('/api/world-design/upload',{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({world,name:file.name,size:file.size,mimeType:file.type})});
   const data=await response.json().catch(()=>({}));if(!response.ok||!data.token||!data.endpoint)throw new Error(data.error||'Upload could not be prepared.');
   await new Promise<void>((resolve,reject)=>{
    const upload=new tus.Upload(file,{endpoint:data.endpoint,retryDelays:[0,3000,5000,10000,20000],headers:{'x-signature':data.token,'x-upsert':'false'},uploadDataDuringCreation:true,removeFingerprintOnSuccess:true,chunkSize:6*1024*1024,metadata:{bucketName:'world-assets',objectName:data.path,contentType:file.type||'application/octet-stream',cacheControl:'3600'},onError:error=>reject(new Error(error.message.includes('maximum allowed size')?'This project storage plan is enforcing a lower file limit. Images are compressed automatically; large videos require a higher Supabase upload limit.':error.message)),onProgress:(uploaded,total)=>{const progress=total?Math.round(uploaded/total*100):0;setItems(current=>current.map(item=>item.id===id?{...item,progress,message:`Uploading ${progress}% · resumes automatically if interrupted`}:item))},onSuccess:()=>resolve()});
    void upload.findPreviousUploads().then(previous=>{if(previous.length)upload.resumeFromPreviousUpload(previous[0]);upload.start()}).catch(reject);
   });
   if(temporary)updateMedia(world,temporary.asset.id,{name:file.name,url:data.url,kind:data.type==='video'?'video':'image',visible:true});else addMedia(world,{name:file.name,url:data.url,kind:data.type==='video'?'video':'image',placement:'hero',section:'hero',x:50,y:50,width:100,opacity:100,rotation:0,zIndex:2,loop:true,muted:true,fit:'cover',visible:true,locked:false});
   setItems(current=>current.map(item=>item.id===id?{...item,status:'ready',progress:100,preview:data.url,message:`Uploaded to ${world} and autosaving…`}:item));setTimeout(()=>setItems(current=>current.filter(item=>item.id!==id)),5000);
  }catch(error){if(temporary)removeMedia(world,temporary.asset.id);setItems(current=>current.map(item=>item.id===id?{...item,status:'error',message:error instanceof Error?error.message:'Upload failed'}:item))}
 }
 return <><div className="fixed bottom-5 right-5 z-[250] grid w-[min(380px,calc(100vw-2rem))] gap-2">{items.map(item=><div key={item.id} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/95 p-3 text-white shadow-2xl"><div className="h-14 w-14 overflow-hidden rounded-xl bg-white/5">{item.preview&&<img src={item.preview} alt="Upload preview" className="h-full w-full object-cover"/>}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-black">{item.name}</p><p className={`mt-1 text-xs ${item.status==='error'?'text-red-200':item.status==='ready'?'text-emerald-200':'text-cyan-100/70'}`}>{item.status==='preview'?'Preparing preview…':item.message}</p>{item.status==='uploading'&&<div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-cyan-200 transition-[width]" style={{width:`${item.progress||0}%`}}/></div>}</div>{item.status==='error'&&<button onClick={()=>setItems(current=>current.filter(entry=>entry.id!==item.id))} className="text-xs text-white/50">Dismiss</button>}</div>)}</div>{children}</>;
}
