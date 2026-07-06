import { creatorControls, defaultCopy } from '@/lib/cms-schema';
import { databaseTables, platformStack, storageBuckets } from '@/lib/storage-plan';

export function CreatorStudioPreview() {
  return (
    <section className="harmonic-container py-16">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">Creator Studio</p>
        <h2 className="mt-3 text-4xl font-black md:text-6xl">This is where you control the OS.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-purple-100/65">The next layer turns the Hub into your CMS: edit words, upload assets, activate seasons, manage worlds, schedule content, and control community.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-[1fr_.9fr]">
        <div className="glass-panel rounded-[2.5rem] p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Control Panels</p>
              <h3 className="mt-2 text-3xl font-black">Creator tools coming online.</h3>
            </div>
            <span className="rounded-full bg-purple-300 px-4 py-2 text-sm font-black text-black shadow-purple-glow">Phase 2</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {creatorControls.map((control) => (
              <a key={control.id} href={control.route} className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h4 className="text-xl font-black">{control.title}</h4>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-purple-100/45">{control.status}</span>
                </div>
                <p className="text-sm leading-6 text-purple-100/60">{control.description}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="glass-panel rounded-[2.5rem] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Editable Copy Example</p>
            {defaultCopy.map((copy) => (
              <article key={copy.id} className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-purple-100/45">{copy.label}</p>
                <h4 className="mt-3 text-3xl font-black">{copy.headline}</h4>
                <p className="mt-3 text-sm leading-6 text-purple-100/60">{copy.subheadline}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-black text-purple-100/50">
                  <span>{copy.primaryCta}</span>
                  {copy.secondaryCta && <span>{copy.secondaryCta}</span>}
                </div>
              </article>
            ))}
          </div>

          <div className="glass-panel rounded-[2.5rem] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Platform Stack</p>
            <div className="mt-4 grid gap-3">
              {platformStack.map(([name, role]) => (
                <div key={name} className="rounded-2xl bg-white/5 p-4">
                  <h4 className="font-black">{name}</h4>
                  <p className="mt-1 text-sm text-purple-100/60">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="glass-panel rounded-[2.5rem] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Database Tables</p>
          <div className="mt-5 grid gap-3">
            {databaseTables.map(([name, role]) => (
              <div key={name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h4 className="font-black">{name}</h4>
                <p className="mt-1 text-sm text-purple-100/60">{role}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel rounded-[2.5rem] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Storage Buckets</p>
          <div className="mt-5 grid gap-3">
            {storageBuckets.map(([name, role]) => (
              <div key={name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h4 className="font-black">{name}</h4>
                <p className="mt-1 text-sm text-purple-100/60">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
