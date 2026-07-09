import { type HarmonicRuntimeSnapshot } from '@/lib/harmonic-signal-bus';

type HarmonicRuntimePanelProps = {
  snapshot: HarmonicRuntimeSnapshot;
};

const signalLabels: Record<string, string> = {
  WORLD_BOOTED: 'Boot',
  VIBE_CONDUCTED: 'Vibe',
  EMOTION_CHANGED: 'Emotion',
  ENVIRONMENT_CHANGED: 'Environment',
  LIGHTING_CHANGED: 'Lighting',
  CAMERA_CHANGED: 'Camera',
  PHYSICS_CHANGED: 'Physics',
  AUDIO_CHANGED: 'Audio',
  OBJECTS_CHANGED: 'Objects',
  TIMELINE_CHANGED: 'Timeline',
  DNA_APPLIED: 'DNA',
  WORLD_RENDERED: 'Render',
};

export function HarmonicRuntimePanel({ snapshot }: HarmonicRuntimePanelProps) {
  return (
    <article className="rounded-[2.5rem] border border-white/10 bg-black/35 p-5 shadow-purple-glow backdrop-blur-2xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[.32em] text-white/40">Signal Bus</p>
          <h3 className="mt-2 text-3xl font-black tracking-[-.06em]">Runtime nervous system</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[.045] px-4 py-2 font-mono text-xs text-white/45">
          {snapshot.signals.length} live signals
        </span>
      </div>

      <div className="grid gap-3">
        {snapshot.signals.map((signal) => (
          <div key={signal.id} className="rounded-2xl border border-white/10 bg-white/[.045] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-purple-200/10 px-3 py-1 text-xs font-black text-purple-100/70">
                {signalLabels[signal.type] ?? signal.type}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[.18em] text-white/35">
                {signal.source} → {signal.target}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/64">{signal.message}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
