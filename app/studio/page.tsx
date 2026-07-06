import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { CreatorStudioPreview } from '@/components/studio/CreatorStudioPreview';
import { StudioEditor } from '@/components/studio/StudioEditor';

export const metadata = {
  title: 'Creator Studio | Harmonic OS',
  description: 'Creator CMS control layer for Harmonic OS.',
};

export default function StudioPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <div className="harmonic-container">
        <Link href="/hub" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-purple-100/75 glass-panel">Back to Hub</Link>
      </div>
      <section className="harmonic-container py-8">
        <StudioEditor />
      </section>
      <CreatorStudioPreview />
    </main>
  );
}
