'use client';

import { useState } from 'react';
import type { HarmonicEngineState, HarmonicWorldId } from '@/lib/harmonic-engine';
import { brainPersonalities, createHarmonicBrainPlan, type HarmonicBrainPlan } from '@/lib/harmonic-brain-v3';

export function HarmonicBrainV3Panel({ world, baseState, prompt }: { world: HarmonicWorldId; baseState: HarmonicEngineState; prompt: string }) {
  const [plan, setPlan] = useState<HarmonicBrainPlan | null>(null);
  const personality = brainPersonalities[world];

  return (
    <article className="rounded-[2rem] border border-purple-200/20 bg-black/35 p-5 backdrop-blur-2xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Harmonic Brain V3</p>
          <h3 className="mt-3 text-3xl font-black tracking-[-.06em]">{personality.name}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-white/58">{personality.mantra}</p>
        </div>
        <button type="button" onClick={() => setPlan(createHarmonicBrainPlan(world, baseState, prompt))} className="rounded-full bg-purple-300 px-6 py-4 font-black text-black shadow-purple-glow">Read Intent</button>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <BrainCard title="Voice" items={[personality.voice]} />
        <BrainCard title="Priorities" items={personality.priorities} />
        <BrainCard title="Signature Moves" items={personality.signatureMoves} />
      </div>

      {plan && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-purple-200/[.06] p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-purple-100/45">Brain Read</p>
          <h4 className="mt-3 text-2xl font-black tracking-[-.05em] capitalize">Emotion: {plan.emotionalRead}</h4>
          <p className="mt-3 text-sm leading-7 text-white/62">{plan.interpretedIntent}</p>
          <div className="mt-4 grid gap-2">
            {plan.directorNotes.map((note) => <p key={note} className="rounded-xl border border-white/10 bg-black/25 p-3 text-xs leading-6 text-white/52">{note}</p>)}
          </div>
          <p className="mt-4 text-xs font-black uppercase tracking-[.18em] text-purple-100/55">{plan.approvalRule}</p>
        </div>
      )}
    </article>
  );
}

function BrainCard({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{title}</p><div className="mt-3 grid gap-2">{items.map((item) => <p key={item} className="text-sm leading-6 text-white/62">{item}</p>)}</div></div>;
}
