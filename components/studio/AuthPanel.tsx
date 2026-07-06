'use client';

import { FormEvent, useState } from 'react';
import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

export function AuthPanel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    if (!isSupabaseConfigured) {
      setMessage('Supabase is not configured yet.');
      return;
    }

    setLoading(true);
    const supabase = createSupabaseBrowserClient();

    const result = mode === 'signin'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (result.error) {
      setMessage(result.error.message);
    } else if (mode === 'signup') {
      setMessage('Account created. Check your email if confirmation is required, then sign in.');
    } else {
      setMessage('Signed in. Redirecting to Creator Studio...');
      window.location.href = '/studio';
    }

    setLoading(false);
  }

  return (
    <section className="mx-auto w-full max-w-xl glass-panel rounded-[2.5rem] p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.35em] text-purple-200/50">Creator Access</p>
      <h1 className="mt-4 text-4xl font-black md:text-6xl">Log into Harmonic OS.</h1>
      <p className="mt-4 leading-7 text-purple-100/65">Sign in to edit copy, upload assets, manage seasons, and control your creator studio.</p>

      <div className="mt-6 grid grid-cols-2 rounded-full border border-white/10 bg-white/5 p-1">
        <button onClick={() => setMode('signin')} className={`rounded-full px-4 py-3 text-sm font-black ${mode === 'signin' ? 'bg-purple-300 text-black' : 'text-purple-100/60'}`}>Sign In</button>
        <button onClick={() => setMode('signup')} className={`rounded-full px-4 py-3 text-sm font-black ${mode === 'signup' ? 'bg-purple-300 text-black' : 'text-purple-100/60'}`}>Create Account</button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-bold text-purple-100/70">
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-purple-100/70">
          Password
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required minLength={6} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
        </label>
        <button disabled={loading} className="rounded-full bg-purple-300 px-6 py-4 font-black text-black shadow-purple-glow disabled:opacity-60">
          {loading ? 'Working...' : mode === 'signin' ? 'Enter Studio' : 'Create Profile'}
        </button>
      </form>

      {message && <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-purple-100/70">{message}</div>}
    </section>
  );
}
