import { type HarmonicEngineState } from '@/lib/harmonic-engine';

const dnaLabels: Record<string, string> = {
  memory: 'Memory',
  emotion: 'Emotion',
  music: 'Music',
  fashion: 'Fashion',
  competition: 'Competition',
  food: 'Food',
  community: 'Community',
  business: 'Business',
  motion: 'Motion',
  spirituality: 'Spirit',
};

type HarmonicEnginePreviewProps = {
  state: HarmonicEngineState;
};

export function HarmonicEnginePreview({ state }: HarmonicEnginePreviewProps) {
  return (
    <section className="engine-preview relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl">
      <div className="engine-environment" data-world={state.world} data-lighting={state.lighting} />
      <div className="relative z-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[.32em] text-white/40">Harmonic Engine Preview</p>
            <h3 className="mt-2 text-4xl font-black capitalize tracking-[-.07em]">{state.world} · {state.emotion}</h3>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[.05] px-4 py-2 font-mono text-xs text-white/55">
            {state.creativeMode.toUpperCase()} MODE
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_.8fr]">
          <div className="relative min-h-80 overflow-hidden rounded-[2rem] border border-white/10 bg-black/35 p-5">
            <div className="engine-fog" style={{ opacity: state.fog / 100 }} />
            <div className="engine-crystal" style={{ boxShadow: `0 0 ${state.crystalHeartIntensity}px rgba(216,180,254,.45)` }}>
              <div className="engine-crystal-core" />
            </div>
            {Array.from({ length: Math.max(4, Math.round(state.particleDensity / 7)) }).map((_, index) => (
              <span
                key={index}
                className="engine-particle"
                style={{
                  left: `${8 + ((index * 19) % 84)}%`,
                  top: `${10 + ((index * 29) % 70)}%`,
                  animationDelay: `${index * 110}ms`,
                  animationDuration: `${Math.max(1.4, 6 - state.motionIntensity / 22)}s`,
                  filter: `drop-shadow(0 0 ${state.bloom / 3}px rgba(255,255,255,.55))`,
                }}
              />
            ))}
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="font-mono text-xs uppercase tracking-[.25em] text-white/40">Scene Timeline</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-4">
                {state.objects.slice(0, 4).map((object, index) => (
                  <span key={object} className="rounded-full border border-white/10 bg-white/[.05] px-3 py-2 text-xs font-bold capitalize text-white/60">
                    0{index + 1} {object.replaceAll('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-white/10 bg-white/[.045] p-5">
              <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">World Physics</p>
              <div className="mt-4 grid gap-2 text-sm text-white/65">
                <p>Environment: <span className="font-bold capitalize text-white/85">{state.environment}</span></p>
                <p>Lighting: <span className="font-bold capitalize text-white/85">{state.lighting.replaceAll('-', ' ')}</span></p>
                <p>Camera: <span className="font-bold capitalize text-white/85">{state.camera.replaceAll('-', ' ')}</span></p>
                <p>Physics: <span className="font-bold capitalize text-white/85">{state.physics.replaceAll('-', ' ')}</span></p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[.045] p-5">
              <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Frequency DNA</p>
              <div className="mt-4 grid gap-3">
                {Object.entries(state.dna).map(([key, value]) => (
                  <div key={key}>
                    <div className="mb-1 flex justify-between text-xs text-white/45">
                      <span>{dnaLabels[key]}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-purple-300" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
