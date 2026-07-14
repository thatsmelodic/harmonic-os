'use client';

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';

const SECRET_KEY = 'harmonic-studio-secret-session';

type GateState = 'checking' | 'locked' | 'unlocked';

export function OwnerStudioGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GateState>('checking');
  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState('Owner verification is required.');
  const [busy, setBusy] = useState(false);

  async function verify(value: string) {
    const response = await fetch('/api/studio/verify', {
      method: 'POST',
      headers: { 'x-harmonic-studio-key': value },
    });
    return response.ok;
  }

  useEffect(() => {
    const saved = window.sessionStorage.getItem(SECRET_KEY) || '';
    if (!saved) {
      setState('locked');
      return;
    }
    void verify(saved).then((ok) => {
      if (ok) {
        setSecret(saved);
        setState('unlocked');
      } else {
        window.sessionStorage.removeItem(SECRET_KEY);
        setState('locked');
      }
    });
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const candidate = secret.trim();
    if (!candidate) return;
    setBusy(true);
    setMessage('Verifying owner access…');
    try {
      const ok = await verify(candidate);
      if (!ok) {
        setMessage('That Studio Secret is not authorized.');
        return;
      }
      window.sessionStorage.setItem(SECRET_KEY, candidate);
      setState('unlocked');
    } catch {
      setMessage('Creator Studio verification is unavailable right now.');
    } finally {
      setBusy(false);
    }
  }

  if (state === 'checking') {
    return <main className="grid min-h-screen place-items-center bg-[#050308] text-white">Checking Creator Studio access…</main>;
  }

  if (state === 'locked') {
    return (
      <main className="grid min-h-screen place-items-center bg-[#050308] px-6 text-white">
        <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-purple-300/20 bg-white/[.04] p-8 shadow-2xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-purple-300/70">Private owner tools</p>
          <h1 className="mt-3 text-3xl font-black">Creator Studio Locked</h1>
          <p className="mt-3 text-sm leading-6 text-white/55">AI design, publishing, world customization, and administrative uploads are reserved for the Harmonic OS owner. Community uploads use separate submission forms.</p>
          <label className="mt-6 block text-xs font-black uppercase tracking-[.18em] text-white/45">Studio Secret</label>
          <input autoFocus type="password" value={secret} onChange={(event) => setSecret(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-4 outline-none focus:border-purple-300/60" />
          <button disabled={busy} className="mt-4 w-full rounded-2xl bg-purple-200 px-4 py-4 font-black text-black disabled:opacity-50">{busy ? 'Verifying…' : 'Unlock Creator Studio'}</button>
          <p className="mt-4 text-center text-xs text-white/40">{message}</p>
        </form>
      </main>
    );
  }

  return <>{children}</>;
}
