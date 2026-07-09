import { getCreatorWorldsFeatureCount, harmonicPlatformPhases } from '@/lib/harmonic-platform-phases';

export function HarmonicPlatformPhasesPanel() {
  return (
    <article className="rounded-[2rem] border border-purple-200/20 bg-[linear-gradient(135deg,rgba(183,108,255,.16),rgba(54,178,203,.05),rgba(0,0,0,.38))] p-5 backdrop-blur-2xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Full Platform Programming</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-.08em] sm:text-5xl">All phases. One creator economy.</h2>
          <p className="mt-3 max-w-5xl text-sm leading-7 text-white/60">Creator Worlds is the centerpiece, but the income system needs all three phases connected: platform, intelligence, and economy.</p>
        </div>
        <div className="rounded-2xl border border-purple-200/20 bg-black/30 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[.2em] text-white/35">Programmed Features</p>
          <p className="mt-2 text-4xl font-black tracking-[-.08em] text-purple-100">{getCreatorWorldsFeatureCount()}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {harmonicPlatformPhases.map((phase) => (
          <section key={phase.id} className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">Priority {phase.priority}</p>
                <h3 className="mt-2 text-3xl font-black tracking-[-.06em] text-white/86">{phase.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/52">{phase.subtitle}</p>
              </div>
              <span className="rounded-full border border-purple-200/15 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-purple-100/55">{phase.features.length} systems</span>
            </div>

            <div className="mt-5 grid gap-3 xl:grid-cols-3">
              {phase.features.map((feature) => (
                <div key={feature.id} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{feature.emoji}</span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-lg font-black tracking-[-.04em] text-white/82">{feature.title}</h4>
                        <span className="rounded-full border border-white/10 px-2 py-1 text-[.6rem] font-black uppercase tracking-[.12em] text-purple-100/45">{feature.status}</span>
                      </div>
                      <p className="mt-2 text-xs leading-6 text-white/48">{feature.purpose}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2">
                    {feature.capabilities.slice(0, 5).map((capability) => <p key={capability} className="rounded-xl border border-white/10 bg-black/25 p-2 text-xs leading-5 text-white/45 capitalize">{capability}</p>)}
                  </div>
                  <div className="mt-3 rounded-xl border border-purple-200/10 bg-purple-200/[.045] p-3">
                    <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-purple-100/45">Creator World Impact</p>
                    <p className="mt-2 text-xs leading-6 text-white/52">{feature.creatorWorldImpact}</p>
                  </div>
                  <div className="mt-3 rounded-xl border border-white/10 bg-black/25 p-3">
                    <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-white/35">Revenue Impact</p>
                    <p className="mt-2 text-xs leading-6 text-white/45">{feature.revenueImpact}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
