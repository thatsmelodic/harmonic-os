import { plugins } from '@/lib/plugin-engine';

export function PluginMatrix() {
  return (
    <section className="harmonic-container py-16">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">Plugin Engine</p>
        <h2 className="mt-3 text-4xl font-black md:text-6xl">Every feature becomes reusable.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-purple-100/65">Reviews, comments, shop, videos, analytics, and Q and A are registered as plugins so every world can use the same clean system.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {plugins.map((plugin) => (
          <article key={plugin.key} className="glass-panel rounded-[2rem] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-purple-200/45">{plugin.kind}</p>
            <h3 className="mt-3 text-xl font-black">{plugin.label}</h3>
            <p className="mt-3 text-sm leading-6 text-purple-100/60">{plugin.purpose}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-black text-purple-100/50">
              <span className="rounded-full border border-white/10 px-3 py-1">{plugin.required}</span>
              <span className="rounded-full border border-white/10 px-3 py-1">AI-ready</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
