import Link from 'next/link';
import { WorldDesignStudio } from '@/components/studio/WorldDesignStudio';
import { Phase6AStudioShell } from '@/components/studio/Phase6AStudioShell';

export const metadata = {
  title: 'World Design & Copy Studio | Harmonic OS',
  description: 'Organized visual identity, media, copy, layout, motion, preview, and publishing controls for every Harmonic OS world.',
};

export default function WorldDesignPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto mb-5 flex max-w-7xl flex-wrap gap-3">
        <Link href="/studio" className="inline-flex rounded-full border border-white/10 bg-black/45 px-4 py-3 text-sm font-black text-white/65">← Creator Studio</Link>
        <Link href="/studio/design/phase-4" className="inline-flex rounded-full bg-purple-200 px-5 py-3 text-sm font-black text-black">Open Phase 4 Living Runtime →</Link>
      </div>
      <section className="mx-auto mb-6 max-w-7xl rounded-[2rem] border border-purple-200/20 bg-purple-300/10 p-5 text-white">
        <p className="text-xs font-black uppercase tracking-[.25em] text-purple-100/55">World Design & Copy · Phase 6A Foundation</p>
        <h2 className="mt-2 text-3xl font-black">Live editing now includes command history.</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-white/55">Undo and redo, keyboard save, explicit draft/publish actions, asset reuse, version history, and device previews now live inside one shared editing workspace.</p>
      </section>
      <Phase6AStudioShell>
        <WorldDesignStudio />
      </Phase6AStudioShell>
    </main>
  );
}
