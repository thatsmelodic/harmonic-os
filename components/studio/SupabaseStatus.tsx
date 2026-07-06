import { isSupabaseConfigured } from '@/lib/supabase/client';

export function SupabaseStatus() {
  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Backend Connection</p>
      <h3 className="mt-3 text-3xl font-black">Supabase {isSupabaseConfigured ? 'Ready' : 'Not Connected'}</h3>
      <p className="mt-4 leading-7 text-purple-100/65">
        {isSupabaseConfigured
          ? 'Harmonic OS has the public Supabase variables and is ready for database, profiles, storage, seasons, and editable creator controls.'
          : 'Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel to activate the backend connection.'}
      </p>
      <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-5 text-sm text-purple-100/55">
        Next unlock: creator login, editable homepage copy, asset uploads, season manager, and real community data.
      </div>
    </div>
  );
}
