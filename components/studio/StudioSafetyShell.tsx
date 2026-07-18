'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useWorldCustomization, type WorldCustomization } from '@/components/studio/WorldCustomizationProvider';

const SECRET_KEY='harmonic-studio-secret-session';

export function StudioSafetyShell({children}:{children:ReactNode}){
  const {settings,activeWorld,cloudStatus,lastSavedAt,versions,saveDraft,publishWorld,loadVersions,restoreVersion,replaceWorld,resetWorld}=useWorldCustomization();
  const [message,setMessage]=useState('Editor unlocked. Enter the Studio Secret only when saving or publishing.');
  const [studioKey,setStudioKey]=useState('');
  const [versionLabel,setVersionLabel]=useState('Manual publish');
  const [showVersions,setShowVersions]=useState(false);
  const [historyState,setHistoryState]=useState({undo:0,redo:0});
  const undoStack=useRef<WorldCustomization[]>([]);
  const redoStack=useRef<WorldCustomization[]>([]);
  const previous=useRef<WorldCustomization|null>(null);
  const applyingHistory=useRef(false);

  useEffect(()=>{setStudioKey(window.sessionStorage.getItem(SECRET_KEY)||'');},[]);

  useEffect(()=>{
    const current=settings[activeWorld];
    if(applyingHistory.current){applyingHistory.current=false;previous.current=current;return;}
    if(previous.current&&JSON.stringify(previous.current)!==JSON.stringify(current)){
      undoStack.current=[...undoStack.current.slice(-49),previous.current];
      redoStack.current=[];
      setHistoryState({undo:undoStack.current.length,redo:0});
    }
    previous.current=current;
  },[settings,activeWorld]);

  function undo(){
    const snapshot=undoStack.current.pop();
    if(!snapshot)return;
    redoStack.current.push(settings[activeWorld]);
    applyingHistory.current=true;
    replaceWorld(activeWorld,snapshot);
    setHistoryState({undo:undoStack.current.length,redo:redoStack.current.length});
  }
  function redo(){
    const snapshot=redoStack.current.pop();
    if(!snapshot)return;
    undoStack.current.push(settings[activeWorld]);
    applyingHistory.current=true;
    replaceWorld(activeWorld,snapshot);
    setHistoryState({undo:undoStack.current.length,redo:redoStack.current.length});
  }

  useEffect(()=>{
    const handler=(event:KeyboardEvent)=>{
      const modifier=event.metaKey||event.ctrlKey;
      if(!modifier)return;
      if(event.key.toLowerCase()==='z'){
        event.preventDefault();
        if(event.shiftKey)redo();else undo();
      }
      if(event.key.toLowerCase()==='s'){
        event.preventDefault();
        void manualSave();
      }
    };
    window.addEventListener('keydown',handler);
    return()=>window.removeEventListener('keydown',handler);
  });

  useEffect(()=>{
    const warn=(event:BeforeUnloadEvent)=>{
      if(cloudStatus==='dirty'||cloudStatus==='saving'){
        event.preventDefault();
        event.returnValue='';
      }
    };
    window.addEventListener('beforeunload',warn);
    return()=>window.removeEventListener('beforeunload',warn);
  },[cloudStatus]);

  function secret(){
    const key=studioKey.trim()||window.sessionStorage.getItem(SECRET_KEY)||'';
    if(key)window.sessionStorage.setItem(SECRET_KEY,key);
    return key;
  }
  async function manualSave(){
    const key=secret();
    if(!key){setMessage('Enter the Studio Secret in the top toolbar before cloud save.');return;}
    setMessage((await saveDraft(activeWorld,key))?'Draft saved.':'Draft save failed. The Studio Secret does not match Vercel.');
  }
  async function publish(){
    if(!window.confirm('Publish this world to the live site?'))return;
    const key=secret();
    if(!key){setMessage('Enter the Studio Secret in the top toolbar before publishing.');return;}
    setMessage((await publishWorld(activeWorld,key,versionLabel||'Manual publish'))?'Published successfully.':'Publish failed. The Studio Secret does not match Vercel.');
    await loadVersions(activeWorld);
  }
  async function openVersions(){await loadVersions(activeWorld);setShowVersions(value=>!value);}
  async function restore(versionId:number){
    if(!window.confirm('Restore this version? Current unsaved changes will be replaced.'))return;
    const key=secret();
    if(!key){setMessage('Enter the Studio Secret in the top toolbar before restoring.');return;}
    setMessage((await restoreVersion(activeWorld,versionId,key))?'Version restored.':'Restore failed. The Studio Secret does not match Vercel.');
  }
  function preview(){window.open(`${window.location.origin}?studioProposal=1`,'_blank','noopener,noreferrer');}
  function reset(){if(window.confirm('Reset this world to its original defaults? This cannot be undone after publishing.'))resetWorld(activeWorld);}

  return <div>
    <div className="sticky top-0 z-[100] flex flex-wrap items-center gap-2 border-b border-white/10 bg-[#07050a]/95 px-4 py-2 text-white backdrop-blur-xl">
      <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider">{cloudStatus.replace('-',' ')}</span>
      {lastSavedAt&&<span className="text-[10px] text-white/45">Saved {new Date(lastSavedAt).toLocaleTimeString()}</span>}
      <input type="password" value={studioKey} onChange={event=>setStudioKey(event.target.value)} placeholder="Studio Secret for save/publish" className="min-w-[220px] rounded-lg border border-white/10 bg-black px-3 py-2 text-xs" aria-label="Studio Secret"/>
      <button className="btn disabled:opacity-30" disabled={!historyState.undo} onClick={undo}>Undo</button>
      <button className="btn disabled:opacity-30" disabled={!historyState.redo} onClick={redo}>Redo</button>
      <button className="btn" onClick={()=>void manualSave()}>Save Draft</button>
      <button className="btn" onClick={preview}>Preview</button>
      <input value={versionLabel} onChange={event=>setVersionLabel(event.target.value)} className="min-w-[150px] rounded-lg border border-white/10 bg-black px-3 py-2 text-xs" aria-label="Publish version label"/>
      <button className="btn bg-purple-200 text-black" onClick={()=>void publish()}>Publish</button>
      <button className="btn" onClick={()=>void openVersions()}>History</button>
      <button className="btn text-red-200" onClick={reset}>Reset</button>
      {message&&<span className="ml-auto text-xs text-cyan-100">{message}</span>}
    </div>
    {showVersions&&<div className="border-b border-white/10 bg-black/95 px-4 py-3 text-white"><p className="mb-2 text-xs font-black uppercase tracking-wider text-white/50">Published versions</p><div className="flex flex-wrap gap-2">{versions.length===0?<span className="text-xs text-white/40">No versions found.</span>:versions.map(version=><button key={version.id} className="rounded-xl border border-white/10 px-3 py-2 text-left text-xs" onClick={()=>void restore(version.id)}><strong>v{version.version}</strong> · {version.label}<br/><span className="text-white/40">{new Date(version.created_at).toLocaleString()}</span></button>)}</div></div>}
    {children}
  </div>;
}
