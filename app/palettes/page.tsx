import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { palettes } from '@/data/harmonic-os';

export const metadata = {
  title: 'Palette Engine | Harmonic OS',
  description: 'Collection and season palette engine for Harmonic OS.',
};

export default function PalettesPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <div className="harmonic-container">
        <Link href="/hub" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-purple-100/75 glass-panel">← Back to Hub</Link>

        <section className="py-16">
          <p className="w-fit rounded-full os-badge px-4 py-2 text-xs uppercase tracking-[0.35em] text-purple-100/70">Palette Engine</p>
          <h1 className="mt-7 text-5xl font-black leading-[.92] tracking-tight neon-text md:text-8xl">Collections change the interface.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-purple-100/75">Each palette controls more than color. It defines texture, lighting, animation, product mood, and the visual language of the active world.</p>
        </section>

        <section className="grid gap-5 md:grid-cols-5">
          {palettes.map((palette) => (
            <article key={palette.name} className="glass-panel rounded-[2rem] p-5">
              <div className="mb-6 grid grid-cols-3 gap-2">
                {palette.colors.map((color) => <span key={color} className="h-20 rounded-2xl border border-white/10" style={{ backgroundColor: color }} />)}
              </div>
              <h2 className="text-2xl font-black">{palette.name}</h2>
              <p className="mt-4 text-sm leading-6 text-purple-100/65">{palette.texture}</p>
              <button className="mt-6 rounded-full border border-white/15 px-5 py-3 text-sm font-black text-purple-100/75">Apply Theme</button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
