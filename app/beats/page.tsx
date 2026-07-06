import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';

const beats = [
  ['Late Night Frequency', 'R&B pocket · 80 BPM · smoke, neon, and reflection.'],
  ['Trap Signal', 'Fast bounce · high-energy drums · cinematic pressure.'],
  ['Melodic Universe Theme', 'OS intro score · purple boot sequence · world-select energy.'],
];

export const metadata = {
  title: 'Beat Vault | Harmonic OS',
  description: 'Melodic beat vault for previews, sound worlds, and music direction.',
};

export default function BeatsPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <div className="harmonic-container">
        <Link href="/" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-purple-100/75 glass-panel">← Back to OS</Link>

        <section className="py-16">
          <p className="w-fit rounded-full os-badge px-4 py-2 text-xs uppercase tracking-[0.35em] text-purple-100/70">Melodic · Sound System</p>
          <h1 className="mt-7 text-5xl font-black leading-[.92] tracking-tight neon-text md:text-8xl">Beat Vault</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-purple-100/75">The music wing of Harmonic OS: beat previews, sound packs, song worlds, release energy, and the audio identity behind every portal.</p>
        </section>

        <section className="grid gap-5">
          {beats.map(([title, copy], index) => (
            <article key={title} className="glass-panel grid gap-5 rounded-[2rem] p-6 md:grid-cols-[auto_1fr_auto] md:items-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-purple-300/15 text-xl font-black shadow-purple-glow">0{index + 1}</div>
              <div>
                <h2 className="text-2xl font-black">{title}</h2>
                <p className="mt-2 text-purple-100/65">{copy}</p>
              </div>
              <button className="rounded-full bg-purple-300 px-6 py-3 font-black text-black shadow-purple-glow">Preview</button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
