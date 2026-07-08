'use client';

import { useMemo, useState } from 'react';
import { createEngineGraph, type EngineNode, type EngineNodeId } from '@/lib/harmonic-nodes';
import { type HarmonicEngineState } from '@/lib/harmonic-engine';

type HarmonicNodeGraphProps = {
  state: HarmonicEngineState;
};

export function HarmonicNodeGraph({ state }: HarmonicNodeGraphProps) {
  const graph = useMemo(() => createEngineGraph(state), [state]);
  const [activeNodeId, setActiveNodeId] = useState<EngineNodeId>('ai-director');
  const activeNode = graph.nodes.find((node) => node.id === activeNodeId) ?? graph.nodes[0];

  function getNode(id: EngineNodeId) {
    return graph.nodes.find((node) => node.id === id) as EngineNode;
  }

  return (
    <article className="rounded-[2.5rem] border border-white/10 bg-black/35 p-5 shadow-purple-glow backdrop-blur-2xl">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[.32em] text-white/40">Engine Node Graph</p>
          <h3 className="mt-2 text-3xl font-black tracking-[-.06em]">The mind behind the world</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[.045] px-4 py-2 font-mono text-xs uppercase text-white/45">
          {state.world} signal map
        </span>
      </div>

      <div className="relative min-h-[36rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_10%,rgba(183,108,255,.22),rgba(0,0,0,.26)_44%,rgba(0,0,0,.66)_100%)]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {graph.edges.map((edge) => {
            const from = getNode(edge.from);
            const to = getNode(edge.to);
            const active = edge.from === activeNodeId || edge.to === activeNodeId;
            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={active ? 'rgba(216,180,254,.82)' : 'rgba(255,255,255,.14)'}
                strokeWidth={active ? 0.42 : 0.22}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {graph.nodes.map((node) => {
          const active = node.id === activeNodeId;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveNodeId(node.id)}
              className="absolute w-36 -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-3 text-left transition hover:scale-105 sm:w-44"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                borderColor: active ? 'rgba(216,180,254,.8)' : 'rgba(255,255,255,.14)',
                background: active ? 'rgba(183,108,255,.24)' : 'rgba(0,0,0,.48)',
                boxShadow: active ? '0 0 34px rgba(183,108,255,.35)' : 'none',
              }}
            >
              <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full rounded-full bg-purple-300" style={{ width: `${node.strength}%` }} />
              </div>
              <p className="text-sm font-black leading-tight text-white/85">{node.label}</p>
              <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-[.16em] text-purple-100/45">{node.signal}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[.75fr_1.25fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[.045] p-5">
          <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Selected Node</p>
          <h4 className="mt-3 text-3xl font-black tracking-[-.06em]">{activeNode.label}</h4>
          <p className="mt-3 text-sm leading-7 text-white/60">{activeNode.role}</p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[.045] p-5">
          <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Connected Signals</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {graph.edges
              .filter((edge) => edge.from === activeNode.id || edge.to === activeNode.id)
              .map((edge) => {
                const other = edge.from === activeNode.id ? getNode(edge.to) : getNode(edge.from);
                return (
                  <button
                    key={`${edge.from}-${edge.to}`}
                    type="button"
                    onClick={() => setActiveNodeId(other.id)}
                    className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-bold text-white/60 transition hover:border-purple-200/45"
                  >
                    {edge.label} → {other.label}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </article>
  );
}
