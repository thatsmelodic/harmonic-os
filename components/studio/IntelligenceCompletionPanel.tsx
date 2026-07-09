'use client';

import { useState } from 'react';
import type { HarmonicEngineState, HarmonicWorldId } from '@/lib/harmonic-engine';
import { getCreatorPreferencesForWorld, createMemorySignals } from '@/lib/creator-memory-engine';
import { createExplainWhySet } from '@/lib/explain-why-engine';
import { getEventsForWorld } from '@/lib/harmonic-event-engine';
import { getRipplesFromWorld } from '@/lib/world-interaction-engine';
import { seasonalTransitions } from '@/lib/seasonal-transition-engine';

export function IntelligenceCompletionPanel({ world, onApplyEvent }: { world: HarmonicWorldId; onApplyEvent?: (patch: Partial<HarmonicEngineState>, label: string) => void }) {
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const preferences = getCreatorPreferencesForWorld(world);
  const signals = createMemorySignals(world);
  const explanations = createExplainWhySet(world);
  const events = getEventsForWorld(world);
  const ripples = getRipplesFromWorld(world);

  function toggle(id: string) {
    setApprovedIds((current) => current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]);
  }

  return (
    <article className="rounded-[2rem] border border-purple-200/20 bg-[linear-gradient(135deg,rgba(183,108,255,.10),rgba(0,0,0,.35))] p-5 backdrop-blur-2xl">
      <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Priority Systems</p>
      <h3 className="mt-3 text-3xl font-black tracking-[-.06em]">Memory, Events, Ripples, and Seasons</h3>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-white/58">These systems complete the intelligence layer without Director Mode: creator memory, explain-why trust logic, approval-based event triggers, world-to-world ripples, and seasonal transitions.</p>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">Creator Memory</p>
          <div className="mt-4 grid gap-3">
            {preferences.map((preference) => (
              <div key={preference.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                <div className="flex justify-between gap-3"><strong className="text-sm text-white/75">{preference.label}</strong><span className="font-mono text-xs text-purple-100/55">{preference.strength}%</span></div>
                <p className="mt-2 text-xs leading-6 text-white/45">{preference.evidence}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            {signals.map((signal) => <p key={signal.id} className="mt-2 text-xs leading-6 text-white/45">{signal.action}: {signal.learnedPreference}</p>)}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">Explain Why</p>
          <div className="mt-4 grid gap-3">
            {explanations.map((note) => (
              <div key={note.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                <strong className="text-sm text-white/75">{note.title}</strong>
                <p className="mt-2 text-xs leading-6 text-white/45">{note.explanation}</p>
                <p className="mt-2 text-[.65rem] font-black uppercase tracking-[.16em] text-purple-100/45">{note.trustRule}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">Event Engine</p>
          <div className="mt-4 grid gap-3">
            {events.map((event) => {
              const approved = approvedIds.includes(event.id);
              return (
                <div key={event.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                  <div className="flex flex-wrap items-start justify-between gap-3"><strong className="text-sm text-white/75">{event.label}</strong><button type="button" onClick={() => toggle(event.id)} className="rounded-full border border-purple-200/20 px-3 py-1 text-xs font-black text-purple-100/70">{approved ? 'Approved' : 'Approve'}</button></div>
                  <p className="mt-2 text-xs leading-6 text-white/45">IF {event.condition}</p>
                  <ul className="mt-2 grid gap-1 text-xs leading-6 text-white/45">{event.then.map((step) => <li key={step}>THEN {step}</li>)}</ul>
                  <button type="button" disabled={!approved || !onApplyEvent} onClick={() => onApplyEvent?.(event.patch, event.label)} className="mt-3 rounded-full bg-purple-300 px-4 py-2 text-xs font-black text-black disabled:cursor-not-allowed disabled:opacity-35">Apply Approved Event</button>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">World Interaction Engine</p>
          <div className="mt-4 grid gap-3">
            {ripples.map((ripple) => {
              const approved = approvedIds.includes(ripple.id);
              return (
                <div key={ripple.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                  <div className="flex flex-wrap items-start justify-between gap-3"><strong className="text-sm capitalize text-white/75">{ripple.sourceWorld.replace('-', ' ')} → {ripple.targetWorld.replace('-', ' ')}</strong><button type="button" onClick={() => toggle(ripple.id)} className="rounded-full border border-purple-200/20 px-3 py-1 text-xs font-black text-purple-100/70">{approved ? 'Approved' : 'Approve'}</button></div>
                  <p className="mt-2 text-xs leading-6 text-white/45">WHEN {ripple.trigger}</p>
                  <p className="mt-2 text-xs leading-6 text-white/55">THEN {ripple.result}</p>
                  <button type="button" disabled={!approved || !onApplyEvent} onClick={() => onApplyEvent?.(ripple.patch, ripple.result)} className="mt-3 rounded-full bg-purple-300 px-4 py-2 text-xs font-black text-black disabled:cursor-not-allowed disabled:opacity-35">Apply Ripple Patch</button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">Seasonal Transition Engine</p>
          <div className="mt-4 grid gap-3">
            {seasonalTransitions.map((transition) => {
              const approved = approvedIds.includes(transition.id);
              return (
                <div key={transition.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                  <div className="flex flex-wrap items-start justify-between gap-3"><strong className="text-sm text-white/75">{transition.label}</strong><button type="button" onClick={() => toggle(transition.id)} className="rounded-full border border-purple-200/20 px-3 py-1 text-xs font-black text-purple-100/70">{approved ? 'Approved' : 'Approve'}</button></div>
                  <p className="mt-2 text-xs leading-6 text-white/45">{transition.worldNotes[world]}</p>
                  <ul className="mt-2 grid gap-1 text-xs leading-6 text-white/45">{transition.visualSteps.slice(0, 3).map((step) => <li key={step}>VISUAL {step}</li>)}</ul>
                  <button type="button" disabled={!approved || !onApplyEvent} onClick={() => onApplyEvent?.(transition.patch, transition.label)} className="mt-3 rounded-full bg-purple-300 px-4 py-2 text-xs font-black text-black disabled:cursor-not-allowed disabled:opacity-35">Apply Season Transition</button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
}
