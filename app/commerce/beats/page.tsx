import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { formatCommerceMoney, getCommerceCatalog } from '@/lib/supabase/commerce-server';

export const metadata = {
  title: 'Beat Vault | Harmonic Commerce',
  description: 'Browse Melodic beats, compare licenses, and enter the Harmonic Commerce licensing flow.',
};

export default async function BeatVaultPage() {
  const catalog = await getCommerceCatalog();

  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container grid gap-5 py-8">
        <article className="rounded-[3.2rem] border border-purple-200/15 bg-[radial-gradient(circle_at_18%_10%,rgba(183,108,255,.34),transparent_34%),radial-gradient(circle_at_82%_0%,rgba(54,178,203,.2),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.06),rgba(0,0,0,.52))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Melodic Commerce</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">Beat Vault</h1>
              <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">Choose a beat, compare rights, and lock the license that matches your release. The catalog below reads from the live Harmonic Commerce database.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/commerce/beat-licensing" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">License Guide</Link>
              <Link href="/commerce/creator-vault" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">Creator Vault</Link>
            </div>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <Status label="Database" value={catalog.configured ? 'Connected' : 'Missing Env'} />
            <Status label="Live Beats" value={String(catalog.beats.length)} />
            <Status label="Catalog State" value={catalog.error ? 'Needs Review' : 'Ready'} />
          </div>
        </article>

        {catalog.error && (
          <article className="rounded-2xl border border-red-300/20 bg-red-300/[.06] p-4 text-sm text-red-100/75">
            {catalog.error}
          </article>
        )}

        <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {catalog.beats.map((beat) => {
            const paidTiers = (beat.commerce_license_tiers ?? []).filter((tier) => tier.price_cents > 0);
            const startingTier = paidTiers[0] ?? beat.commerce_license_tiers?.[0];
            return (
              <article key={beat.id} className="rounded-[2.4rem] border border-white/10 bg-black/30 p-4 backdrop-blur-2xl">
                <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_28%_12%,rgba(183,108,255,.28),transparent_38%),radial-gradient(circle_at_78%_90%,rgba(54,178,203,.16),transparent_36%),linear-gradient(135deg,rgba(255,255,255,.05),rgba(0,0,0,.52))] p-5">
                  <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-white/35">{beat.genre ?? 'Uncategorized'}</p>
                  <h2 className="mt-3 text-3xl font-black tracking-[-.07em] text-white/90">{beat.title}</h2>
                  <p className="mt-2 text-sm font-black text-purple-100/65">{beat.producer_name}</p>
                  <p className="mt-4 text-xs leading-6 text-white/48">{beat.mood ?? 'Mood pending'}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Badge>{beat.bpm ? `${beat.bpm} BPM` : 'BPM pending'}</Badge>
                    <Badge>{beat.musical_key ?? 'Key pending'}</Badge>
                    <Badge>{beat.is_exclusive_available ? 'Exclusive available' : 'Exclusive sold'}</Badge>
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  {(beat.commerce_license_tiers ?? []).slice(0, 5).map((tier) => (
                    <div key={tier.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[.035] p-3">
                      <span className="text-xs font-black text-white/60">{tier.name}</span>
                      <span className="text-xs font-black text-cyan-100/75">{formatCommerceMoney(tier.price_cents, tier.currency)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[.65rem] font-black uppercase tracking-[.14em] text-white/30">Starting at</p>
                    <p className="mt-1 text-2xl font-black text-cyan-100/80">{startingTier ? formatCommerceMoney(startingTier.price_cents, startingTier.currency) : 'Unavailable'}</p>
                  </div>
                  <Link href={`/commerce/beats/${beat.slug}`} className="rounded-full bg-purple-300 px-5 py-3 text-xs font-black text-black shadow-purple-glow">View Licenses</Link>
                </div>
              </article>
            );
          })}
        </section>

        {!catalog.beats.length && !catalog.error && (
          <article className="rounded-[2.4rem] border border-white/10 bg-black/30 p-8 text-center">
            <h2 className="text-2xl font-black text-white/85">No active beats found.</h2>
            <p className="mt-3 text-sm leading-7 text-white/48">Confirm the seed migration ran against the same Supabase project connected to Vercel.</p>
          </article>
        )}
      </section>
    </main>
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-[.65rem] font-black uppercase tracking-[.16em] text-white/30">{label}</p><p className="mt-2 text-2xl font-black tracking-[-.06em] text-purple-100">{value}</p></div>;
}

function Badge({ children }: { children: string }) {
  return <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.12em] text-white/38">{children}</span>;
}
