'use client';

import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { defaultFrequency, frequencies, getFrequency, type FrequencyKey } from '@/lib/frequencies';

const bootLines = ['INITIALIZING HARMONIC OS', 'CALIBRATING FREQUENCIES', 'SYNCING WORLDS', 'CHOOSE YOUR FREQUENCY'];

export function HarmonicRuntime({ children }: { children: ReactNode }) {
  const [activeKey, setActiveKey] = useState<FrequencyKey>(defaultFrequency.key);
  const [booted, setBooted] = useState(false);
  const activeFrequency = useMemo(() => getFrequency(activeKey), [activeKey]);

  useEffect(() => {
    const stored = window.localStorage.getItem('harmonic-frequency');
    const nextFrequency = getFrequency(stored);
    setActiveKey(nextFrequency.key);

    const timer = window.setTimeout(() => setBooted(true), 1900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.frequency = activeFrequency.key;
    document.documentElement.style.setProperty('--frequency-primary', activeFrequency.primary);
    document.documentElement.style.setProperty('--frequency-secondary', activeFrequency.secondary);
    document.documentElement.style.setProperty('--frequency-accent', activeFrequency.accent);
    window.localStorage.setItem('harmonic-frequency', activeFrequency.key);
  }, [activeFrequency]);

  return (
    <>
      <div className="frequency-atmosphere" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-70 mix-blend-screen">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--frequency-primary)] blur-[130px]" />
        <div className="absolute bottom-16 right-10 h-64 w-64 rounded-full bg-[var(--frequency-secondary)] blur-[140px]" />
      </div>

      <div className={`boot-overlay ${booted ? 'boot-overlay--hidden' : ''}`} aria-hidden={booted}>
        <div className="boot-core">
          <div className="boot-heart">◇</div>
          <div className="mt-7 space-y-3">
            {bootLines.map((line, index) => (
              <p key={line} style={{ animationDelay: `${index * 160}ms` }} className="boot-line">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      <aside className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 rounded-full border border-white/10 bg-black/45 p-2 shadow-purple-glow backdrop-blur-2xl lg:block">
        <div className="flex flex-col gap-2">
          {frequencies.map((frequency) => (
            <button
              key={frequency.key}
              type="button"
              onClick={() => setActiveKey(frequency.key)}
              className={`group relative h-11 w-11 rounded-full border text-[10px] font-black uppercase transition duration-300 hover:scale-105 ${
                activeFrequency.key === frequency.key ? 'border-white/60 bg-white/18 text-white' : 'border-white/10 bg-white/5 text-white/45 hover:border-white/30 hover:text-white/80'
              }`}
              aria-label={`Switch to ${frequency.world}`}
              title={frequency.world}
            >
              {frequency.label.slice(0, 2)}
              <span className="pointer-events-none absolute right-14 top-1/2 hidden min-w-44 -translate-y-1/2 rounded-2xl border border-white/10 bg-black/75 px-4 py-3 text-left text-xs normal-case tracking-normal text-white/70 backdrop-blur-xl group-hover:block">
                <strong className="block text-white">{frequency.world}</strong>
                {frequency.signal}
              </span>
            </button>
          ))}
        </div>
      </aside>

      <div className="fixed left-3 top-3 z-40 hidden max-w-xs rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/45 backdrop-blur-xl md:block">
        Active Frequency · <span className="text-white/80">{activeFrequency.world}</span>
      </div>

      {children}
    </>
  );
}
