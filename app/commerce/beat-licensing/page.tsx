import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { beatLicenseTiers, beatProducts, formatMoney, getLicenseTier, licenseAgreementSections } from '@/data/harmonic-commerce';

export const metadata = {
  title: 'Beat Licensing | Harmonic Commerce',
  description: 'Beat licensing, license agreements, checkout readiness, and producer commerce for Harmonic OS.',
};

export default function BeatLicensingPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container grid gap-5 py-8">
        <article className="rounded-[3.2rem] border border-purple-200/15 bg-[radial-gradient(circle_at_18%_10%,rgba(183,108,255,.32),transparent_34%),radial-gradient(circle_at_82%_0%,rgba(54,178,203,.2),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.06),rgba(0,0,0,.52))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Harmonic Commerce</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">Beat Licensing</h1>
              <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">Melodic needs more than a beat store. It needs license tiers, automatic agreements, searchable orders, buyer rights, producer ownership, and checkout-ready commerce that can scale across every world.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/worlds/melodic" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">Melodic World</Link>
              <Link href="/creator-studio-v3" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Studio v3</Link>
            </div>
          </div>
        </article>

        <section className="rounded-[2.5rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">License Tiers</p>
          <div className="mt-5 grid gap-4 xl:grid-cols-5">
            {beatLicenseTiers.map((tier) => (
              <article key={tier.id} className={`rounded-[2rem] border p-4 ${tier.highlighted ? 'border-purple-200/30 bg-purple-300/[.08]' : 'border-white/10 bg-white/[.035]'}`}>
                <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-white/35">{tier.id}</p>
                <h2 className="mt-3 text-xl font-black tracking-[-.05em] text-white/88">{tier.name}</h2>
                <p className="mt-2 text-3xl font-black text-cyan-100/80">{formatMoney(tier.priceCents)}</p>
                <p className="mt-3 text-xs leading-6 text-white/48">{tier.agreementSummary}</p>
                <div className="mt-4 grid gap-2">
                  {tier.files.slice(0, 3).map((file) => <Badge key={file}>{file}</Badge>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Beat Products</p>
          <div className="mt-5 grid gap-4 xl:grid-cols-3">
            {beatProducts.map((beat) => (
              <article key={beat.id} className="rounded-[2rem] border border-white/10 bg-white/[.035] p-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_30%_10%,rgba(183,108,255,.25),transparent_42%),linear-gradient(135deg,rgba(255,255,255,.06),rgba(0,0,0,.4))] p-5">
                  <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-white/35">{beat.genre}</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-.07em] text-white/90">{beat.title}</h2>
                  <p className="mt-2 text-sm font-black text-purple-100/65">{beat.producer} • {beat.bpm} BPM • {beat.key}</p>
                  <p className="mt-3 text-xs leading-6 text-white/48">{beat.mood}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">{beat.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
                <div className="mt-5 grid gap-2">
                  {beat.licenses.map((licenseId) => {
                    const tier = getLicenseTier(licenseId);
                    if (!tier) return null;
                    return <div key={licenseId} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/30 p-3"><span className="text-xs font-black text-white/65">{tier.name}</span><span className="text-xs font-black text-cyan-100/75">{formatMoney(tier.priceCents)}</span></div>;
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
          <article className="rounded-[2.5rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Agreement Generator</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.07em] text-white/88">Every purchase creates a license record.</h2>
            <p className="mt-3 text-xs leading-6 text-white/48">The system should generate a PDF agreement, store it in buyer and producer accounts, attach it to the order, and preserve license terms permanently.</p>
          </article>
          <article className="rounded-[2.5rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Agreement Sections</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {licenseAgreementSections.map((section, index) => <div key={section} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-6 text-white/50"><strong className="text-purple-100/70">{index + 1}.</strong> {section}</div>)}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}

function Badge({ children }: { children: string }) {
  return <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.12em] text-white/38">{children}</span>;
}
