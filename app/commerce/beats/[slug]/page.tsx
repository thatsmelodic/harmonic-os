import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FrequencyDock } from '@/components/FrequencyDock';
import { formatCommerceMoney, getCommerceBeat } from '@/lib/supabase/commerce-server';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { beat } = await getCommerceBeat(params.slug);
  return beat
    ? { title: `${beat.title} Licensing | Harmonic Commerce`, description: `Compare licensing options for ${beat.title} by ${beat.producer_name}.` }
    : { title: 'Beat Not Found | Harmonic Commerce' };
}

export default async function BeatLicenseDetailPage({ params }: { params: { slug: string } }) {
  const result = await getCommerceBeat(params.slug);
  if (!result.beat && !result.error) notFound();

  const beat = result.beat;

  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container grid gap-5 py-8">
        <Link href="/commerce/beats" className="w-fit rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Back to Beat Vault</Link>

        {result.error && <article className="rounded-2xl border border-red-300/20 bg-red-300/[.06] p-4 text-sm text-red-100/75">{result.error}</article>}

        {beat && (
          <>
            <article className="rounded-[3.2rem] border border-purple-200/15 bg-[radial-gradient(circle_at_18%_10%,rgba(183,108,255,.35),transparent_34%),radial-gradient(circle_at_82%_0%,rgba(54,178,203,.2),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.06),rgba(0,0,0,.52))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-8">
              <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">{beat.genre ?? 'Melodic Beat'}</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">{beat.title}</h1>
              <p className="mt-3 text-xl font-black text-cyan-100/70">Produced by {beat.producer_name}</p>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-purple-100/62 sm:text-base">{beat.mood ?? 'Mood information pending.'}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>{beat.bpm ? `${beat.bpm} BPM` : 'BPM pending'}</Badge>
                <Badge>{beat.musical_key ?? 'Key pending'}</Badge>
                {(beat.tags ?? []).map((tag) => <Badge key={tag}>{tag}</Badge>)}
              </div>
            </article>

            <section className="grid gap-4 xl:grid-cols-5">
              {(beat.commerce_license_tiers ?? []).map((tier) => {
                const usage = tier.usage_limits ?? {};
                return (
                  <article key={tier.id} className={`rounded-[2.2rem] border p-5 backdrop-blur-2xl ${tier.tier_key === 'premium-lease' ? 'border-purple-200/35 bg-purple-300/[.08]' : 'border-white/10 bg-black/30'}`}>
                    <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-white/35">{tier.tier_key}</p>
                    <h2 className="mt-3 text-2xl font-black tracking-[-.06em] text-white/88">{tier.name}</h2>
                    <p className="mt-2 text-3xl font-black text-cyan-100/80">{formatCommerceMoney(tier.price_cents, tier.currency)}</p>
                    <p className="mt-3 text-xs leading-6 text-white/48">{tier.agreement_summary}</p>

                    <div className="mt-5">
                      <p className="text-[.65rem] font-black uppercase tracking-[.14em] text-white/30">Files</p>
                      <ul className="mt-2 grid gap-2 text-xs leading-5 text-white/48">
                        {tier.files_included.map((file) => <li key={file}>• {file}</li>)}
                      </ul>
                    </div>

                    <div className="mt-5">
                      <p className="text-[.65rem] font-black uppercase tracking-[.14em] text-white/30">Rights</p>
                      <ul className="mt-2 grid gap-2 text-xs leading-5 text-white/48">
                        {tier.rights_granted.map((right) => <li key={right}>• {right}</li>)}
                      </ul>
                    </div>

                    <div className="mt-5 rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-6 text-white/45">
                      Streams: {String(usage.streams ?? 'Unlimited')}<br />
                      Videos: {String(usage.videos ?? 'Unlimited')}<br />
                      Exclusive: {usage.exclusive ? 'Yes' : 'No'}
                    </div>

                    <Link href={`/commerce/checkout?beat=${beat.slug}&license=${tier.tier_key}`} className="mt-5 block rounded-full bg-purple-300 px-4 py-3 text-center text-xs font-black text-black shadow-purple-glow">Choose License</Link>
                  </article>
                );
              })}
            </section>

            <article className="rounded-[2.4rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Agreement Protection</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-.07em] text-white/88">Your purchase will create a permanent license record.</h2>
              <p className="mt-3 max-w-4xl text-xs leading-6 text-white/48">Checkout will attach the buyer, beat, license tier, order number, rights, limits, producer credit, publishing notes, and generated agreement PDF to the order. The next sprint connects the payment processor and automatic fulfillment.</p>
            </article>
          </>
        )}
      </section>
    </main>
  );
}

function Badge({ children }: { children: string }) {
  return <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.12em] text-white/38">{children}</span>;
}
