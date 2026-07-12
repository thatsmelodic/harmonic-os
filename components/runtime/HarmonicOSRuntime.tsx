'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { LivingWorldEnvironment } from '@/components/runtime/LivingWorldEnvironment';

type WorldId = 'os' | 'melodic' | 'fried-em' | 'schmackinn' | 'harmonic' | 'business';

type RuntimeState = {
  activeWorld: WorldId;
  previousWorld: WorldId | null;
  musicContinues: boolean;
  transitionStyle: 'dissolve' | 'pour' | 'pulse';
  lastVisitedAt: number;
};

type RuntimeContextValue = RuntimeState & {
  setMusicContinues: (enabled: boolean) => void;
  setTransitionStyle: (style: RuntimeState['transitionStyle']) => void;
  enterWorld: (world: WorldId, href: string) => void;
};

const STORAGE_KEY = 'harmonic:os:runtime';
const RuntimeContext = createContext<RuntimeContextValue | null>(null);

const worlds: Record<WorldId, { label: string; mark: string; href: string; accent: string; atmosphere: string }> = {
  os: { label: 'Harmonic OS', mark: '∞', href: '/', accent: '#b76cff', atmosphere: 'Celestial Frequency' },
  melodic: { label: 'Melodic', mark: 'M', href: '/worlds/melodic', accent: '#b892ff', atmosphere: 'Night Studio' },
  'fried-em': { label: 'Fried Em', mark: 'FE', href: '/worlds/fried-em', accent: '#ef7b2d', atmosphere: 'Dawn Blacktop' },
  schmackinn: { label: 'Schmackinn', mark: 'S', href: '/worlds/schmackinn', accent: '#a55cff', atmosphere: 'Rain District' },
  harmonic: { label: '2 Harmonic', mark: '2H', href: '/worlds/two-harmonic/collections', accent: '#d8bd91', atmosphere: 'Desert Fashion House' },
  business: { label: 'Business', mark: 'B', href: '/worlds/business', accent: '#7da4c7', atmosphere: 'Glass Skyline' },
};

function inferWorld(pathname: string): WorldId {
  if (pathname.startsWith('/worlds/melodic') || pathname.startsWith('/studio/melodic')) return 'melodic';
  if (pathname.startsWith('/worlds/fried-em') || pathname.startsWith('/studio/fried-em')) return 'fried-em';
  if (pathname.startsWith('/worlds/schmackinn') || pathname.startsWith('/studio/schmackinn')) return 'schmackinn';
  if (pathname.startsWith('/worlds/2-harmonic') || pathname.startsWith('/worlds/two-harmonic') || pathname.startsWith('/worlds/harmonic') || pathname.startsWith('/shop')) return 'harmonic';
  if (pathname.startsWith('/worlds/business') || pathname.startsWith('/investor')) return 'business';
  return 'os';
}

export function HarmonicOSRuntime({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [state, setState] = useState<RuntimeState>({ activeWorld: 'os', previousWorld: null, musicContinues: true, transitionStyle: 'pour', lastVisitedAt: Date.now() });
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
      window.setTimeout(() => setTransitioningTo(null), 760);
    }, 780);
  };

  const value = useMemo<RuntimeContextValue>(() => ({
    ...state,
    setMusicContinues: (musicContinues) => persist({ musicContinues }),
    setTransitionStyle: (transitionStyle) => persist({ transitionStyle }),
    enterWorld,
  }), [state]);

  return (
    <RuntimeContext.Provider value={value}>
      <LivingWorldEnvironment />
      {children}

      {transitioningTo && (
        <div className={`harmonic-cinematic-transition transition-${state.transitionStyle}`} style={{ '--transition-accent': worlds[transitioningTo].accent } as React.CSSProperties}>
          <div className="transition-liquid" />
          <div className="transition-horizon" />
          <div className="transition-mark" aria-hidden="true">{worlds[transitioningTo].mark}</div>
          <div className="transition-copy">
            <p>{worlds[transitioningTo].atmosphere}</p>
            <h2>Entering {worlds[transitioningTo].label}</h2>
            {state.musicContinues && <span>Sound continues across the frequency.</span>}
          </div>
        </div>
      )}

      <aside className="fixed bottom-5 right-4 z-[900] sm:right-6">
        {dockOpen && (
          <div className="mb-3 w-[min(92vw,390px)] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[rgba(10,11,13,.84)] p-5 text-white shadow-[0_30px_100px_rgba(0,0,0,.55)] backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-5">
              <div><p className="text-[.62rem] font-semibold uppercase tracking-[.3em] text-white/35">Harmonic Runtime</p><p className="mt-2 text-xl font-semibold tracking-[-.04em]">{worlds[state.activeWorld].label}</p><p className="mt-1 text-xs text-white/40">{worlds[state.activeWorld].atmosphere}</p></div>
              <button onClick={() => setDockOpen(false)} className="rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[.16em] text-white/55">Close</button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">{Object.entries(worlds).map(([id, world]) => <button key={id} onClick={() => enterWorld(id as WorldId, world.href)} className={`group rounded-xl border p-3 text-left transition ${state.activeWorld === id ? 'border-white/25 bg-white/10' : 'border-white/8 bg-white/[.025] hover:border-white/18 hover:bg-white/[.06]'}`}><span className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/30">{world.mark}</span><span className="mt-2 block text-sm font-semibold">{world.label}</span><span className="mt-1 block text-[10px] text-white/35">{world.atmosphere}</span></button>)}</div>
            <div className="mt-4 grid gap-3 rounded-xl border border-white/8 bg-white/[.025] p-4">
              <label className="flex items-center justify-between gap-4 text-xs font-semibold"><span>Continuous audio</span><input type="checkbox" checked={state.musicContinues} onChange={(event) => persist({ musicContinues: event.target.checked })} /></label>
              <label className="grid gap-2 text-xs font-semibold">Transition<select value={state.transitionStyle} onChange={(event) => persist({ transitionStyle: event.target.value as RuntimeState['transitionStyle'] })} className="rounded-lg border border-white/10 bg-black/50 px-3 py-2"><option value="pour">Liquid pour</option><option value="dissolve">Dissolve</option><option value="pulse">Pulse</option></select></label>
            </div>
            <Link href="/studio" className="mt-4 block rounded-full border border-white/12 bg-white px-4 py-3 text-center text-xs font-semibold text-black">Open Creator Studio</Link>
          </div>
        )}
        <button onClick={() => setDockOpen((value) => !value)} className="harmonic-runtime-trigger grid h-14 min-w-14 place-items-center rounded-full border border-white/15 bg-black/65 px-4 text-xl font-semibold text-white backdrop-blur-xl" aria-label="Open Harmonic Runtime">∞</button>
      </aside>

      <style jsx global>{`
        .harmonic-cinematic-transition{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;overflow:hidden;background:#07080a;color:white;pointer-events:none}.transition-liquid{position:absolute;inset:-30%;background:radial-gradient(circle at 50% 20%,color-mix(in srgb,var(--transition-accent) 52%,white),var(--transition-accent) 38%,#050506 76%);filter:blur(18px);animation:transition-pour 1.55s cubic-bezier(.2,.72,.2,1) both}.transition-horizon{position:absolute;inset:auto -10% -18% -10%;height:52%;border-radius:50% 50% 0 0;background:linear-gradient(180deg,color-mix(in srgb,var(--transition-accent) 38%,transparent),rgba(0,0,0,.95));filter:blur(8px);animation:transition-rise 1.4s ease both}.transition-mark{position:relative;z-index:2;display:grid;height:10rem;width:10rem;place-items:center;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(0,0,0,.24);font-size:2rem;font-weight:700;letter-spacing:-.06em;box-shadow:0 0 100px color-mix(in srgb,var(--transition-accent) 48%,transparent);backdrop-filter:blur(18px);animation:mark-breathe 1.6s ease-in-out infinite alternate}.transition-copy{position:absolute;z-index:3;bottom:11%;text-align:center}.transition-copy p{font-size:.65rem;font-weight:700;letter-spacing:.32em;text-transform:uppercase;color:rgba(255,255,255,.48)}.transition-copy h2{margin-top:.8rem;font-size:clamp(2rem,6vw,4.8rem);font-weight:650;letter-spacing:-.07em}.transition-copy span{display:block;margin-top:1rem;font-size:.78rem;color:rgba(255,255,255,.42)}.transition-dissolve .transition-liquid{animation-name:transition-dissolve}.transition-pulse .transition-liquid{animation-name:transition-pulse}.harmonic-runtime-trigger{box-shadow:0 0 40px color-mix(in srgb,var(--harmonic-runtime-accent,#b76cff) 42%,transparent);animation:runtime-pulse 3.4s ease-in-out infinite}@keyframes transition-pour{0%{transform:translateY(-70%) scale(.75);opacity:0}38%{opacity:1}100%{transform:translateY(35%) scale(1.4);opacity:.92}}@keyframes transition-rise{from{transform:translateY(80%);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes transition-dissolve{from{transform:scale(1.4);opacity:0}to{transform:scale(1);opacity:1}}@keyframes transition-pulse{0%{transform:scale(.3);opacity:0}65%{opacity:1}100%{transform:scale(1.6);opacity:.7}}@keyframes mark-breathe{from{transform:scale(.96);box-shadow:0 0 60px color-mix(in srgb,var(--transition-accent) 35%,transparent)}to{transform:scale(1.035);box-shadow:0 0 130px color-mix(in srgb,var(--transition-accent) 62%,transparent)}}@keyframes runtime-pulse{0%,100%{transform:scale(1);opacity:.88}50%{transform:scale(1.04);opacity:1}}@media (prefers-reduced-motion:reduce){.harmonic-cinematic-transition *,.harmonic-runtime-trigger{animation:none!important}}
      `}</style>
    </RuntimeContext.Provider>
  );
}

export function useHarmonicRuntime() {
  const context = useContext(RuntimeContext);
  if (!context) throw new Error('useHarmonicRuntime must be used inside HarmonicOSRuntime');
  return context;
}
