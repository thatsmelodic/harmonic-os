'use client';

import { useState } from 'react';
import type { HarmonicEngineState, HarmonicWorldId } from '@/lib/harmonic-engine';
import { holidayEventProfiles, seasonalFxProfiles } from '@/lib/seasonal-fx-engine';
import type { SeasonKey } from '@/lib/seasonal-transition-engine';

const seasons: SeasonKey[] = ['spring', 'summer', 'fall', 'winter'];

export function SeasonalFxHolidayPanel({ world, onApply }: { world: HarmonicWorldId; onApply?: (patch: Partial<HarmonicEngineState>, label: string) => void }) {
  const [approvedIds, setApprovedIds] = useState<string[]>([]);

  function toggle(id: string) {
    setApprovedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <article className="rounded-[2rem] border border-purple-200/20 bg-[linear-gradient(135deg,rgba(183,108,255,.12),rgba(0,0,0,.35))] p-5 backdrop-blur-2xl">
      <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Seasonal OS Layer</p>
      <h3 className="mt-3 text-3xl font-black tracking-[-.06em]">Complete Seasons + Holiday Events</h3>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-white/58">Every season now has its own physics and particle identity. Fall stays the masterpiece, but Spring has petals, Summer has heat/fireflies, and Winter has snow/frost. Holidays and cultural moments layer on top without replacing the season.</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-4">
        {seasons.map((season) => {
          const profile = seasonalFxProfiles[season];
          const approved = approvedIds.includes(profile.season);
          return (
            <section key={profile.season} className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">{profile.season}</p>
                  <h4 className="mt-2 text-xl font-black tracking-[-.04em] text-white/82">{profile.title}</h4>
                </div>
                <button type="button" onClick={() => toggle(profile.season)} className="rounded-full border border-purple-200/20 px-3 py-1 text-xs font-black text-purple-100/70">{approved ? 'Approved' : 'Approve'}</button>
              </div>
              <p className="mt-3 text-xs leading-6 text-white/50">{profile.identity}</p>
              <div className="mt-3 grid gap-2">
                <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-purple-100/45">Particles</p>
                <p className="text-xs leading-6 text-white/45">{profile.particles.join(' • ')}</p>
                <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-purple-100/45">Physics</p>
                <p className="text-xs leading-6 text-white/45">{profile.physics.join(' • ')}</p>
                <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-purple-100/45">{world.replace('-', ' ')} behavior</p>
                <p className="text-xs leading-6 text-white/45">{profile.worldBehavior[world].join(' • ')}</p>
              </div>
              <button type="button" disabled={!approved || !onApply} onClick={() => onApply?.(profile.patch, profile.title)} className="mt-4 rounded-full bg-purple-300 px-4 py-2 text-xs font-black text-black disabled:cursor-not-allowed disabled:opacity-35">Apply Season FX</button>
            </section>
          );
        })}
      </div>

      <div className="mt-6">
        <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Holiday + Cultural Event Layer</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {holidayEventProfiles.map((event) => {
            const approved = approvedIds.includes(event.id);
            return (
              <section key={event.id} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">{event.layer} / {event.timing}</p>
                    <h4 className="mt-2 text-xl font-black tracking-[-.04em] text-white/82">{event.title}</h4>
                  </div>
                  <button type="button" onClick={() => toggle(event.id)} className="rounded-full border border-purple-200/20 px-3 py-1 text-xs font-black text-purple-100/70">{approved ? 'Approved' : 'Approve'}</button>
                </div>
                {event.respectfulNote && <p className="mt-3 rounded-xl border border-purple-200/10 bg-purple-200/[.05] p-3 text-xs leading-6 text-purple-100/58">{event.respectfulNote}</p>}
                <p className="mt-3 text-[.65rem] font-black uppercase tracking-[.16em] text-purple-100/45">Visual FX</p>
                <p className="mt-1 text-xs leading-6 text-white/45">{event.visualFx.join(' • ')}</p>
                <p className="mt-3 text-[.65rem] font-black uppercase tracking-[.16em] text-purple-100/45">{world.replace('-', ' ')} behavior</p>
                <p className="mt-1 text-xs leading-6 text-white/45">{event.worldBehavior[world].join(' • ')}</p>
                <button type="button" disabled={!approved || !onApply} onClick={() => onApply?.(event.patch, event.title)} className="mt-4 rounded-full bg-purple-300 px-4 py-2 text-xs font-black text-black disabled:cursor-not-allowed disabled:opacity-35">Apply Event Layer</button>
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}
