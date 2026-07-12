'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type WorldId = 'os' | 'melodic' | 'fried-em' | 'schmackinn' | 'harmonic' | 'business';

type RuntimeState = {
  activeWorld: WorldId;
  previousWorld: WorldId | null;
  musicContinues: boolean;
  transitionStyle: 'dissolve' | 'portal' | 'pulse';
  lastVisitedAt: number;
};

type RuntimeContextValue = RuntimeState & {
  setMusicContinues: (enabled: boolean) => void;
  setTransitionStyle: (style: RuntimeState['transitionStyle']) => void;
  enterWorld: (world: WorldId, href: string) => void;
};

const STORAGE_KEY = 'harmonic:os:runtime';
const RuntimeContext = createContext<RuntimeContextValue | null>(null);

const worlds: Record<WorldId, { label: string; icon: string; href: string; accent: string }> = {
  os: { label: 'OS', icon: '∞', href: '/', accent: '#b76cff' },
  melodic: { label: 'Melodic', icon: '♪', href: '/worlds/melodic', accent: '#c084fc' },
  'fried-em': { label: 'Fried Em', icon: '🏀', href: '/worlds/fried-em', accent: '#ff7a1a' },
  schmackinn: { label: 'Schmackinn', icon: '🍔', href: '/worlds/schmackinn', accent: '#ff4d8d' },
  harmonic: { label: '2 Harmonic', icon: '👕', href: '/shop', accent: '#22d3ee' },
  business: { label: 'Business', icon: '📈', href: '/worlds/business', accent: '#60a5fa' },
};

function inferWorld(pathname: string): WorldId {
  if (pathname.startsWith('/worlds/melodic') || pathname.startsWith('/studio/melodic')) return 'melodic';
  if (pathname.startsWith('/worlds/fried-em') || pathname.startsWith('/studio/fried-em')) return 'fried-em';
  if (pathname.startsWith('/worlds/schmackinn') || pathname.startsWith('/studio/schmackinn')) return 'schmackinn';
  if (pathname.startsWith('/worlds/harmonic') || pathname.startsWith('/shop')) return 'harmonic';
  if (pathname.startsWith('/worlds/business') || pathname.startsWith('/investor')) return 'business';
  return 'os';
}

export function HarmonicOSRuntime({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [state, setState] = useState<RuntimeState>({ activeWorld: 'os', previousWorld: null, musicContinues: true, transitionStyle: 'portal', lastVisitedAt: Date.now() });
  const [transitioningTo, setTransitioningTo] = useState<WorldId | null>(null);
  const [dockOpen, setDockOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setState((current) => ({ ...current, ...JSON.parse(stored) }));
    } catch {}
  }, []);

  useEffect(() => {
    const activeWorld = inferWorld(pathname);
    setState((current) => {
      const next = { ...current, previousWorld: current.activeWorld === activeWorld ? current.previousWorld : current.activeWorld, activeWorld, lastVisitedAt: Date.now() };
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      document.documentElement.dataset.harmonicWorld = activeWorld;
      document.documentElement.style.setProperty('--harmonic-runtime-accent', worlds[activeWorld].accent);
      return next;
    });
  }, [pathname]);

  const persist = (patch: Partial<RuntimeState>) => setState((current) => {
    const next = { ...current, ...patch };
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
    return next;
  });

  const enterWorld = (world: WorldId, href: string) => {
    if (world === state.activeWorld) return router.push(href);
    setTransitioningTo(world);
    window.setTimeout(() => {
      router.push(href);
      window.setTimeout(() => setTransitioningTo(null), 500);
    }, 520);
  };

  const value = useMemo<RuntimeContextValue>(() => ({
    ...state,
    setMusicContinues: (musicContinues) => persist({ musicContinues }),
    setTransitionStyle: (transitionStyle) => persist({ transitionStyle }),
    enterWorld,
  }), [state]);

  return (
    <RuntimeContext.Provider value={value}>
      {children}

      {transitioningTo && (
        <div className="pointer-events-none fixed inset-0 z-[9999] grid place-items-center overflow-hidden bg-black/92 backdrop-blur-2xl">
          <div className={`absolute h-[44rem] w-[44rem] rounded-full border border-white/10 ${state.transitionStyle === 'pulse' ? 'animate-ping' : 'animate-spin'}`} style={{ boxShadow: `0 0 180px ${worlds[transitioningTo].accent}66`, animationDuration: state.transitionStyle === 'dissolve' ? '1.8s' : '3s' }} />
          <div className="relative text-center"><p className="text-7xl">{worlds[transitioningTo].icon}</p><p className="mt-5 text-xs font-black uppercase tracking-[.4em] text-white/35">Retuning Frequency</p><h2 className="mt-3 text-5xl font-black tracking-[-.07em] text-white">Entering {worlds[transitioningTo].label}</h2>{state.musicContinues && <p className="mt-4 text-sm text-white/40">Current music remains active across the transition.</p>}</div>
        </div>
      )}

      <aside className="fixed bottom-5 right-4 z-[900] sm:right-6">
        {dockOpen && (
          <div className="mb-3 w-[min(92vw,360px)] rounded-[2rem] border border-white/10 bg-black/85 p-4 text-white shadow-[0_0_80px_rgba(183,108,255,.22)] backdrop-blur-2xl">
            <div className="flex items-center justify-between"><div><p className="text-[.65rem] font-black uppercase tracking-[.25em] text-white/35">Harmonic Runtime</p><p className="mt-1 text-lg font-black">{worlds[state.activeWorld].label} Frequency</p></div><button onClick={() => setDockOpen(false)} className="rounded-full border border-white/10 px-3 py-2 text-xs">Close</button></div>
            <div className="mt-4 grid grid-cols-3 gap-2">{Object.entries(worlds).map(([id, world]) => <button key={id} onClick={() => enterWorld(id as WorldId, world.href)} className={`rounded-2xl border p-3 text-center transition ${state.activeWorld === id ? 'border-white/25 bg-white/10' : 'border-white/10 bg-white/[.035] hover:bg-white/[.08]'}`}><span className="text-2xl">{world.icon}</span><span className="mt-2 block text-[.7rem] font-black">{world.label}</span></button>)}</div>
            <div className="mt-4 grid gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-4">
              <label className="flex items-center justify-between gap-4 text-xs font-black"><span>Keep music across worlds</span><input type="checkbox" checked={state.musicContinues} onChange={(event) => persist({ musicContinues: event.target.checked })} /></label>
              <label className="grid gap-2 text-xs font-black">Transition<select value={state.transitionStyle} onChange={(event) => persist({ transitionStyle: event.target.value as RuntimeState['transitionStyle'] })} className="rounded-xl border border-white/10 bg-black/50 px-3 py-2"><option value="portal">Portal</option><option value="dissolve">Dissolve</option><option value="pulse">Pulse</option></select></label>
            </div>
            <Link href="/studio" className="mt-4 block rounded-full bg-purple-300 px-4 py-3 text-center text-xs font-black text-black">Open Creator Studio</Link>
          </div>
        )}
        <button onClick={() => setDockOpen((value) => !value)} className="grid h-14 min-w-14 place-items-center rounded-full border border-white/15 bg-black/80 px-4 text-xl font-black text-white shadow-[0_0_40px_var(--harmonic-runtime-accent,#b76cff)] backdrop-blur-xl" aria-label="Open Harmonic Runtime">∞</button>
      </aside>
    </RuntimeContext.Provider>
  );
}

export function useHarmonicRuntime() {
  const context = useContext(RuntimeContext);
  if (!context) throw new Error('useHarmonicRuntime must be used inside HarmonicOSRuntime');
  return context;
}
