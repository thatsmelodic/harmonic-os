'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useWorldCustomization, type WorldCustomization, type WorldKey } from '@/components/studio/WorldCustomizationProvider';

const AUTH_REQUIRED_EVENT = 'harmonic:auth-required';
const AUTH_COMPLETE_EVENT = 'harmonic:auth-complete';
const AUTH_CANCELLED_EVENT = 'harmonic:auth-cancelled';

function selectedWorldFromStudio(fallback: WorldKey): WorldKey {
  const active = Array.from(document.querySelectorAll('button')).find((button) => button.className.includes('bg-purple-200') || button.className.includes('bg-white/12') || button.className.includes('bg-purple-300/15'));
  const label = (active?.querySelector('p')?.textContent || active?.textContent || '').trim().toLowerCase();
  if (label.includes('homepage')) return 'home';
  if (label.includes('melodic')) return 'melodic';
  if (label.includes('fried em')) return 'fried-em';
  if (label.includes('schmackinn')) return 'schmackinn';
  if (label.includes('2 harmonic')) return 'two-harmonic';
  if (label.includes('global system')) return 'global';
  return fallback === 'global' ? 'home' : fallback;
}

function StudioAccountControl() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountEmail, setAccountEmail] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const pendingRequest = useRef(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    void supabase.auth.getUser().then(({ data }) => setAccountEmail(data.user?.email ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setAccountEmail(session?.user.email ?? null));
    const requireAuth = () => {
      pendingRequest.current = true;
      setMode('signin');
      setMessage('Sign in here to continue. Your editor work has been kept.');
      setOpen(true);
    };
    window.addEventListener(AUTH_REQUIRED_EVENT, requireAuth);
    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener(AUTH_REQUIRED_EVENT, requireAuth);
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const supabase = createSupabaseBrowserClient();
      if (mode === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        setAccountEmail(data.user.email ?? email.trim());
        setMessage('Signed in. Continuing your original action…');
        window.dispatchEvent(new CustomEvent(AUTH_COMPLETE_EVENT));
        pendingRequest.current = false;
        window.setTimeout(() => setOpen(false), 450);
      } else {
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password });
        if (error) throw error;
        if (data.session) {
          setAccountEmail(data.user?.email ?? email.trim());
          window.dispatchEvent(new CustomEvent(AUTH_COMPLETE_EVENT));
          pendingRequest.current = false;
          setMessage('Account created. Continuing your original action…');
          window.setTimeout(() => setOpen(false), 450);
        } else {
          setMessage('Account created. Check your email to confirm it, then sign in here.');
          setMode('signin');
        }
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  function close() {
    setOpen(false);
    if (pendingRequest.current) {
      window.dispatchEvent(new CustomEvent(AUTH_CANCELLED_EVENT));
      pendingRequest.current = false;
    }
  }

  async function signOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    setAccountEmail(null);
    setMessage('Signed out. Your local editor changes remain on this device.');
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-[950] flex max-w-[220px] items-center gap-2 rounded-full border border-white/15 bg-black/80 px-4 py-3 text-left text-xs font-semibold text-white shadow-[0_0_40px_rgba(183,108,255,.28)] backdrop-blur-xl sm:right-6"
        aria-label="Open Harmonic OS account"
      >
        <span className={`h-2.5 w-2.5 rounded-full ${accountEmail ? 'bg-emerald-300' : 'bg-amber-300'}`} />
        <span className="truncate">{accountEmail || 'Sign in to Harmonic OS'}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[1200] grid place-items-center bg-black/70 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Harmonic OS account">
          <div className="w-full max-w-md rounded-[1.75rem] border border-white/12 bg-[#0b0810] p-6 text-white shadow-[0_35px_120px_rgba(0,0,0,.7)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.25em] text-purple-200/60">Harmonic OS Account</p>
                <h2 className="mt-2 text-2xl font-black">{accountEmail ? 'You are signed in' : mode === 'signin' ? 'Sign in without leaving' : 'Create your account'}</h2>
                <p className="mt-2 text-sm text-white/55">Saving, publishing, and uploads continue inside Creator Studio.</p>
              </div>
              <button type="button" onClick={close} className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/60">Close</button>
            </div>

            {accountEmail ? (
              <div className="mt-6 rounded-2xl border border-emerald-300/15 bg-emerald-300/5 p-4">
                <p className="text-xs text-white/45">Signed in as</p>
                <p className="mt-1 break-all font-bold text-emerald-100">{accountEmail}</p>
                <button type="button" onClick={() => void signOut()} className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-xs font-bold">Sign out</button>
              </div>
            ) : (
              <>
                <div className="mt-6 grid grid-cols-2 rounded-xl border border-white/10 bg-black/30 p-1">
                  <button type="button" onClick={() => setMode('signin')} className={`rounded-lg px-3 py-2 text-xs font-bold ${mode === 'signin' ? 'bg-white text-black' : 'text-white/55'}`}>Sign in</button>
                  <button type="button" onClick={() => setMode('signup')} className={`rounded-lg px-3 py-2 text-xs font-bold ${mode === 'signup' ? 'bg-white text-black' : 'text-white/55'}`}>Create account</button>
                </div>
                <form onSubmit={submit} className="mt-4 grid gap-3">
                  <label className="grid gap-1 text-xs font-bold text-white/60">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-purple-300/50" /></label>
                  <label className="grid gap-1 text-xs font-bold text-white/60">Password<input required minLength={6} type="password" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-purple-300/50" /></label>
                  <button disabled={busy} className="mt-2 rounded-xl bg-purple-200 px-4 py-3 text-sm font-black text-black disabled:opacity-50">{busy ? 'Please wait…' : mode === 'signin' ? 'Sign in and continue' : 'Create account'}</button>
                </form>
              </>
            )}
            {message && <p className="mt-4 rounded-xl border border-cyan-200/10 bg-cyan-200/5 px-4 py-3 text-xs text-cyan-100">{message}</p>}
          </div>
        </div>
      )}
    </>
  );
}

export function StudioSafetyShell({ children }: { children: ReactNode }) {
  const { settings, activeWorld, cloudStatus, lastSavedAt, versions, saveDraft, publishWorld, loadVersions, restoreVersion, replaceWorld, resetWorld } = useWorldCustomization();
  const [message, setMessage] = useState('Creator Studio uses your signed-in Harmonic OS account.');
  const [versionLabel, setVersionLabel] = useState('Manual publish');
  const [showVersions, setShowVersions] = useState(false);
  const [historyState, setHistoryState] = useState({ undo: 0, redo: 0 });
  const undoStack = useRef<WorldCustomization[]>([]);
  const redoStack = useRef<WorldCustomization[]>([]);
  const previous = useRef<WorldCustomization | null>(null);
  const applyingHistory = useRef(false);

  useEffect(() => {
    const current = settings[activeWorld];
    if (applyingHistory.current) { applyingHistory.current = false; previous.current = current; return; }
    if (previous.current && JSON.stringify(previous.current) !== JSON.stringify(current)) {
      undoStack.current = [...undoStack.current.slice(-49), previous.current];
      redoStack.current = [];
      setHistoryState({ undo: undoStack.current.length, redo: 0 });
    }
    previous.current = current;
  }, [settings, activeWorld]);

  function currentWorld() { return selectedWorldFromStudio(activeWorld); }
  function undo() { const snapshot = undoStack.current.pop(); if (!snapshot) return; const world = currentWorld(); redoStack.current.push(settings[world]); applyingHistory.current = true; replaceWorld(world, snapshot); setHistoryState({ undo: undoStack.current.length, redo: redoStack.current.length }); }
  function redo() { const snapshot = redoStack.current.pop(); if (!snapshot) return; const world = currentWorld(); undoStack.current.push(settings[world]); applyingHistory.current = true; replaceWorld(world, snapshot); setHistoryState({ undo: undoStack.current.length, redo: redoStack.current.length }); }

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const modifier = event.metaKey || event.ctrlKey;
      if (!modifier) return;
      if (event.key.toLowerCase() === 'z') { event.preventDefault(); event.shiftKey ? redo() : undo(); }
      if (event.key.toLowerCase() === 's') { event.preventDefault(); void manualSave(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (cloudStatus === 'dirty' || cloudStatus === 'saving') { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [cloudStatus]);

  async function manualSave() { const world = currentWorld(); setMessage((await saveDraft(world)) ? `${world} draft saved.` : 'Draft save was not completed. Your editor work is still kept locally.'); }
  async function publish() { if (!window.confirm('Publish this world to the live site?')) return; const world = currentWorld(); setMessage((await publishWorld(world, undefined, versionLabel || 'Manual publish')) ? `${world} published successfully.` : 'Publish was not completed. Your editor work is still kept locally.'); await loadVersions(world); }
  async function openVersions() { const world = currentWorld(); await loadVersions(world); setShowVersions((value) => !value); }
  async function restore(versionId: number) { if (!window.confirm('Restore this version? Current unsaved changes will be replaced.')) return; const world = currentWorld(); setMessage((await restoreVersion(world, versionId)) ? 'Version restored.' : 'Restore was not completed.'); }
  function preview() { window.open(`${window.location.origin}?studioProposal=1`, '_blank', 'noopener,noreferrer'); }
  function reset() { const world = currentWorld(); if (window.confirm('Reset this world to its original defaults? This cannot be undone after publishing.')) resetWorld(world); }

  return <div><div className="sticky top-0 z-[100] flex flex-wrap items-center gap-2 border-b border-white/10 bg-[#07050a]/95 px-4 py-2 text-white backdrop-blur-xl"><span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider">{cloudStatus.replace('-', ' ')}</span>{lastSavedAt && <span className="text-[10px] text-white/45">Saved {new Date(lastSavedAt).toLocaleTimeString()}</span>}<button type="button" onClick={() => window.dispatchEvent(new CustomEvent(AUTH_REQUIRED_EVENT))} className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs text-emerald-100">Account</button><button className="btn disabled:opacity-30" disabled={!historyState.undo} onClick={undo}>Undo</button><button className="btn disabled:opacity-30" disabled={!historyState.redo} onClick={redo}>Redo</button><button className="btn" onClick={() => void manualSave()}>Save Draft</button><button className="btn" onClick={preview}>Preview</button><input value={versionLabel} onChange={(event) => setVersionLabel(event.target.value)} className="min-w-[150px] rounded-lg border border-white/10 bg-black px-3 py-2 text-xs" aria-label="Publish version label"/><button className="btn bg-purple-200 text-black" onClick={() => void publish()}>Publish</button><button className="btn" onClick={() => void openVersions()}>History</button><button className="btn text-red-200" onClick={reset}>Reset</button>{message && <span className="ml-auto text-xs text-cyan-100">{message}</span>}</div>{showVersions && <div className="border-b border-white/10 bg-black/95 px-4 py-3 text-white"><p className="mb-2 text-xs font-black uppercase tracking-wider text-white/50">Published versions</p><div className="flex flex-wrap gap-2">{versions.length === 0 ? <span className="text-xs text-white/40">No versions found.</span> : versions.map((version) => <button key={version.id} className="rounded-xl border border-white/10 px-3 py-2 text-left text-xs" onClick={() => void restore(version.id)}><strong>v{version.version}</strong> · {version.label}<br/><span className="text-white/40">{new Date(version.created_at).toLocaleString()}</span></button>)}</div></div>}<StudioAccountControl />{children}</div>;
}
