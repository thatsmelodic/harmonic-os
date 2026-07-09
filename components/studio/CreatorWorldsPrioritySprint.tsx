import { creatorWorldModuleStore, creatorWorldPlatformSystems, creatorWorldRankings, getPlatformSystemCompletion } from '@/lib/creator-worlds-platform-systems';

export function CreatorWorldsPrioritySprint() {
  return (
    <article className="rounded-[2rem] border border-purple-200/20 bg-[linear-gradient(135deg,rgba(183,108,255,.14),rgba(54,178,203,.06),rgba(0,0,0,.36))] p-5 backdrop-blur-2xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Creator Worlds Priority Sprint</p>
          <h3 className="mt-3 text-4xl font-black tracking-[-.08em] sm:text-5xl">Platform systems roadmap</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-white/60">This is the in-depth Creator Worlds layer: dashboard, builder, personal AI, community, interactive media, collaboration portals, rankings, module store, and native commerce readiness.</p>
        </div>
        <div className="rounded-2xl border border-purple-200/20 bg-black/30 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[.2em] text-white/35">Foundation</p>
          <p className="mt-2 text-4xl font-black tracking-[-.08em] text-purple-100">{getPlatformSystemCompletion()}%</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {creatorWorldPlatformSystems.map((system) => (
          <section key={system.id} className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{system.emoji}</span>
              <div>
                <h4 className="text-xl font-black tracking-[-.04em] text-white/82">{system.title}</h4>
                <p className="mt-2 text-xs leading-6 text-white/50">{system.purpose}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-2">
              {system.features.slice(0, 4).map((feature) => <p key={feature} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-5 text-white/50 capitalize">{feature}</p>)}
            </div>
            <div className="mt-4 rounded-xl border border-purple-200/10 bg-purple-200/[.045] p-3">
              <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-purple-100/45">Creator Value</p>
              <p className="mt-2 text-xs leading-6 text-white/56">{system.creatorValue}</p>
            </div>
            <div className="mt-3 rounded-xl border border-white/10 bg-black/25 p-3">
              <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-white/35">Revenue Path</p>
              <p className="mt-2 text-xs leading-6 text-white/48">{system.revenuePath}</p>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">World Rankings</p>
          <div className="mt-4 grid gap-3">
            {creatorWorldRankings.map((ranking) => (
              <div key={ranking.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                <div className="flex flex-wrap items-center justify-between gap-3"><strong className="text-sm text-white/78">{ranking.label}</strong><span className="rounded-full border border-purple-200/15 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] text-purple-100/50">{ranking.category}</span></div>
                <p className="mt-2 text-xs leading-6 text-white/45">Score: {ranking.scoreFormula.join(' + ')}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">Module Store Preview</p>
          <div className="mt-4 grid gap-3">
            {creatorWorldModuleStore.map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                <div className="flex flex-wrap items-center justify-between gap-3"><strong className="text-sm text-white/78">{item.title}</strong><span className="rounded-full border border-purple-200/15 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] text-purple-100/50">{item.priceModel}</span></div>
                <p className="mt-2 text-xs leading-6 text-white/45">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
