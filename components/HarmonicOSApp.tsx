'use client';

import Link from 'next/link';
import { useMemo, useState, type CSSProperties } from 'react';
import { frequencies, type FrequencyId } from '@/lib/frequencies';

const bootLines = [
  'INITIALIZING HARMONIC KERNEL',
  'SCANNING WORLDS: MELODIC / HARMONIC / FRIED EM / SCHMACKIN',
  'CALIBRATING RESONANCE ENGINE',
  'CHOOSE YOUR FREQUENCY',
];

export function HarmonicOSApp() {
  const [activeId, setActiveId] = useState<FrequencyId>('melodic');
  const active = useMemo(
    () => frequencies.find((frequency) => frequency.id === activeId) ?? frequencies[0],
    [activeId]
  );

  return (
    <section
      id="worlds"
      className="relative isolate min-h-screen overflow-hidden px-4 py-8 sm:py-12"
      style={
        {
          '--frequency-primary': active.palette.primary,
          '--frequency-secondary': active.palette.secondary,
          '--frequency-aura': active.palette.aura,
          '--frequency-text': active.palette.text,
        } as CSSProperties
      }
    >
      <div className="frequency-grid absolute inset-0 -z-20 opacity-70" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_18%,var(--frequency-aura),transparent_32rem)] transition-all duration-700" />
      <div className="frequency-scan" />

      <div className="harmonic-container grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div className="space-y-6 pt-8 lg:pt-16">
          <div className="glass-panel rounded-[2rem] p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[.36em] text-purple-100/50">Harmonic OS</p>
                <h1 className="mt-2 text-4xl font-black leading-none tracking-[-.08em] sm:text-6xl lg:text-7xl">
                  Boot the Universe.
                </h1>
              </div>
              <div className="hidden rounded-full border border-white/15 px-4 py-2 text-xs font-black text-white/60 sm:block">
                v0.2 Worlds
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/45 p-4 font-mono text-xs text-white/70 shadow-inner">
              {bootLines.map((line, index) => (
                <p key={line} className="boot-line" style={{ animationDelay: `${index * 180}ms` }}>
                  <span className="text-[var(--frequency-primary)]">&gt;</span> {line}
                </p>
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Harmonic OS is the living hub for Melodic: music, fashion, basketball, food, business, community, and creator control inside one cinematic universe. Every world is a different instrument in the same composition — choose your frequency.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {frequencies.map((frequency) => {
              const selected = frequency.id === active.id;
              return (
                <button
                  key={frequency.id}
                  type="button"
                  onClick={() => setActiveId(frequency.id)}
                  className="group rounded-3xl border p-4 text-left transition duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: selected ? frequency.palette.primary : 'rgba(255,255,255,.12)',
                    background: selected
                      ? `linear-gradient(135deg, ${frequency.palette.aura}, rgba(255,255,255,.06))`
                      : 'rgba(255,255,255,.045)',
                    boxShadow: selected ? `0 0 38px ${frequency.palette.aura}` : 'none',
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-lg font-black">{frequency.label}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-black text-white/55">
                      {frequency.signal}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/60">{frequency.tagline}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl py-8 lg:py-16">
          <div className="crystal-heart mx-auto mb-8 grid h-64 w-64 place-items-center rounded-[4rem] border border-white/15 bg-black/45 shadow-purple-glow sm:h-80 sm:w-80">
            <div className="absolute h-48 w-48 rounded-full bg-[var(--frequency-aura)] blur-3xl" />
            <div className="relative text-center">
              <p className="text-xs font-black uppercase tracking-[.38em] text-white/45">Now Tuning</p>
              <h2 className="mt-3 text-5xl font-black tracking-[-.08em]" style={{ color: active.palette.text }}>
                {active.label}
              </h2>
              <p className="mt-3 font-mono text-sm text-white/45">{active.signal}</p>
            </div>
          </div>

          <article className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-[var(--frequency-primary)] shadow-[0_0_22px_var(--frequency-primary)]" />
              <p className="text-xs font-black uppercase tracking-[.32em] text-white/45">Frequency Profile</p>
            </div>
            <h3 className="text-3xl font-black tracking-[-.05em] sm:text-4xl">{active.tagline}</h3>
            <p className="mt-4 text-sm leading-7 text-white/68 sm:text-base">{active.philosophy}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                <p className="text-xs font-black uppercase tracking-[.22em] text-white/40">Motion</p>
                <p className="mt-2 text-sm text-white/70">{active.motion}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                <p className="text-xs font-black uppercase tracking-[.22em] text-white/40">Sound</p>
                <p className="mt-2 text-sm text-white/70">{active.sound}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {active.modules.map((module) => (
                <span key={module} className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-black text-white/65">
                  {module}
                </span>
              ))}
            </div>

            <Link href={active.path} className="mt-7 block rounded-full bg-[var(--frequency-primary)] px-5 py-4 text-center text-sm font-black text-black shadow-[0_0_34px_var(--frequency-aura)] transition hover:scale-[1.02]">
              Enter {active.label}
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
