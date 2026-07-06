import { kernel } from '@/lib/harmonic-kernel';
import { frequencies } from '@/lib/frequency-engine';
import { ModuleCard } from './ModuleCard';

const consolePanels = [
  ['Launch Queue', 'Drops, videos, songs, and campaigns waiting for release.'],
  ['Community Activity', 'Reviews, questions, votes, comments, and recommendations.'],
  ['Creator Tasks', 'Inventory, edits, uploads, beat progress, and shoot planning.'],
  ['AI Prepared', 'Harmonic AI is intentionally disabled until the OS has live data.'],
];

export function OSDesktop() {
  return (
    <section className="harmonic-container py-16">
      <div className="glass-panel overflow-hidden rounded-[2.75rem] border border-white/15">
        <div className="flex flex-col gap-4 border-b border-white/10 bg-black/25 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-purple-200/45">{kernel.productName} · {kernel.version}</p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">Creator Desktop</h2>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-black">
            <span className="rounded-full os-badge px-4 py-2 text-purple-100/70">Season: {kernel.activeSeason}</span>
            <span className="rounded-full os-badge px-4 py-2 text-purple-100/70">Palette: {kernel.activePalette}</span>
            <span className="rounded-full border border-white/15 px-4 py-2 text-purple-100/45">AI: {kernel.ai.enabled ? 'Online' : 'Prepared'}</span>
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-[.72fr_1.28fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Frequency Dock</p>
            <div className="mt-5 grid gap-3">
              {frequencies.map((world) => (
                <a key={world.slug} href={world.route} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black">{world.name}</h3>
                    <span className="text-xs text-purple-100/45">{world.frequency}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-purple-100/60">{world.tagline}</p>
                </a>
              ))}
            </div>
          </aside>

          <div className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              {consolePanels.map(([title, copy]) => (
                <article key={title} className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                  <h3 className="text-2xl font-black">{title}</h3>
                  <p className="mt-3 leading-7 text-purple-100/65">{copy}</p>
                </article>
              ))}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/20 p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Shared Module System</p>
                  <h3 className="mt-2 text-2xl font-black">Reusable features, not duplicate pages.</h3>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <ModuleCard module="reviews" userLevel="profile" compact />
                <ModuleCard module="recommendations" userLevel="profile" compact />
                <ModuleCard module="products" userLevel="guest" compact />
                <ModuleCard module="calendar" userLevel="creator" compact />
                <ModuleCard module="analytics" userLevel="creator" compact />
                <ModuleCard module="qa" userLevel="profile" compact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
