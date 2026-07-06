import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';

const products = [
  ['Base Tee', 'Acid wash foundation piece with the front logo and back-world energy.', 'Coming soon'],
  ['Zip-Up Hoodie', 'The next 2 Harmonic uniform with custom details and collection story.', 'In development'],
  ['Melody Drop', 'Limited pieces built around quotes, symbols, and personal meaning.', 'Queued'],
];

export const metadata = {
  title: 'Shop Portal | Harmonic OS',
  description: '2 Harmonic shop portal for drops, lookbooks, and product storytelling.',
};

export default function ShopPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <div className="harmonic-container">
        <Link href="/" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-purple-100/75 glass-panel">← Back to OS</Link>

        <section className="py-16">
          <p className="w-fit rounded-full os-badge px-4 py-2 text-xs uppercase tracking-[0.35em] text-purple-100/70">2 Harmonic · Shop System</p>
          <h1 className="mt-7 text-5xl font-black leading-[.92] tracking-tight neon-text md:text-8xl">Shop Portal</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-purple-100/75">This is the commerce wing of Harmonic OS: drops, product stories, lookbooks, launch countdowns, and eventual checkout flow.</p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {products.map(([name, copy, status]) => (
            <article key={name} className="glass-panel rounded-[2rem] p-7">
              <div className="mb-6 aspect-square rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-purple-300/20 to-white/5 shadow-purple-glow" />
              <p className="rounded-full os-badge px-3 py-1 text-xs uppercase tracking-[0.25em] text-purple-100/55">{status}</p>
              <h2 className="mt-5 text-3xl font-black">{name}</h2>
              <p className="mt-4 leading-7 text-purple-100/70">{copy}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
