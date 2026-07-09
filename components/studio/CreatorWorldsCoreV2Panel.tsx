'use client';

import { useMemo, useState } from 'react';
import { createCreatorWorldCoreSystem } from '@/lib/creator-worlds-core-v2';
import type { CreatorWorldCategory } from '@/lib/creator-worlds-engine';

const defaultCategories: CreatorWorldCategory[] = ['music', 'fashion', 'food', 'basketball'];

export function CreatorWorldsCoreV2Panel() {
  const [categories] = useState<CreatorWorldCategory[]>(defaultCategories);
  const system = useMemo(() => createCreatorWorldCoreSystem(categories), [categories]);

  return (
    <article className="rounded-[2rem] border border-purple-200/20 bg-[linear-gradient(135deg,rgba(183,108,255,.15),rgba(54,178,203,.05),rgba(0,0,0,.38))] p-5 backdrop-blur-2xl">
      <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Creator Worlds Core v2</p>
      <h3 className="mt-3 text-4xl font-black tracking-[-.08em] sm:text-5xl">Income systems foundation</h3>
      <p className="mt-3 max-w-5xl text-sm leading-7 text-white/60">
        This layer turns Creator Worlds from a concept into a monetizable platform: dashboard health, builder blocks, personal AI guardrails, community channels, interactive media flow, collab readiness, rankings, module store expansion, and native commerce paths.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {system.metrics.map((metric) => (
          <div key={metric.id} className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{metric.label}</p>
            <p className="mt-2 text-4xl font-black tracking-[-.08em] text-purple-100">{metric.value}</p>
            <p className="mt-2 text-xs leading-6 text-white/45">{metric.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">World Builder Blocks</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {system.builderBlocks.map((block) => (
              <div key={block.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <strong className="text-sm text-white/78">{block.label}</strong>
                  <span className="rounded-full border border-purple-200/15 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] text-purple-100/50">{block.zone}</span>
                </div>
                <p className="mt-2 text-xs leading-6 text-white/45">{block.description}</p>
                <p className="mt-2 text-xs leading-6 text-purple-100/50">{block.revenueImpact}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">Personal AI Assistant Rules</p>
          <div className="mt-4 grid gap-3">
            {system.assistantRules.map((rule) => (
              <div key={rule.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                <strong className="text-sm text-white/78">{rule.rule}</strong>
                <p className="mt-2 text-xs leading-6 text-white/45">{rule.reason}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">Community Hub</p>
          <div className="mt-4 grid gap-3">
            {system.communityChannels.map((channel) => (
              <div key={channel.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                <div className="flex justify-between gap-3"><strong className="text-sm text-white/78">#{channel.name}</strong><span className="text-xs text-purple-100/45">{channel.access}</span></div>
                <p className="mt-2 text-xs leading-6 text-white/45">{channel.purpose}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">Interactive Media Pipeline</p>
          <div className="mt-4 grid gap-3">
            {system.mediaPipeline.map((step, index) => (
              <div key={step.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                <p className="font-mono text-xs text-purple-100/45">STEP {index + 1}</p>
                <strong className="mt-1 block text-sm text-white/78">{step.label}</strong>
                <p className="mt-2 text-xs leading-6 text-white/45">{step.description}</p>
                <p className="mt-2 text-xs leading-6 text-purple-100/50">{step.worldEffect}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">Native Commerce Paths</p>
          <div className="mt-4 grid gap-3">
            {system.commercePaths.map((path) => (
              <div key={path.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                <strong className="text-sm text-white/78">{path.label}</strong>
                <p className="mt-2 text-xs leading-6 text-white/45">Buyer: {path.buyerExperience}</p>
                <p className="mt-2 text-xs leading-6 text-purple-100/50">Creator: {path.creatorRevenue}</p>
                <p className="mt-2 text-xs leading-6 text-white/40">Platform: {path.platformRevenue}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
