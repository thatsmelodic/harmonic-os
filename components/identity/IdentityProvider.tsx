'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { collectionIdentityOverrides, identityRegistry, mergeIdentity, type IdentityOverride, type IdentityWorld, type WorldIdentity } from '@/lib/harmonic-identity';

type IdentityStore = Record<IdentityWorld, IdentityOverride>;
type IdentityContextValue = {
  activeWorld: IdentityWorld;
  activeCollection?: string;
  identity: WorldIdentity;
  overrides: IdentityStore;
  setWorldOverride: (world: IdentityWorld, patch: IdentityOverride) => void;
  setActiveCollection: (slug?: string) => void;
  resetWorldIdentity: (world: IdentityWorld) => void;
};

const STORAGE_KEY = 'harmonic-identity-engine-v1';
const emptyOverrides: IdentityStore = { home: {}, melodic: {}, 'fried-em': {}, schmackinn: {}, 'two-harmonic': {} };
const IdentityContext = createContext<IdentityContextValue | null>(null);

function detectWorld(pathname: string): IdentityWorld {
  if (pathname.includes('/worlds/melodic')) return 'melodic';
  if (pathname.includes('/worlds/fried-em')) return 'fried-em';
  if (pathname.includes('/worlds/schmackinn')) return 'schmackinn';
  if (pathname.includes('/worlds/two-harmonic') || pathname.includes('/worlds/2-harmonic')) return 'two-harmonic';
  return 'home';
}

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [activeWorld, setActiveWorld] = useState<IdentityWorld>('home');
  const [activeCollection, setActiveCollection] = useState<string | undefined>();
  const [overrides, setOverrides] = useState<IdentityStore>(emptyOverrides);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { overrides?: IdentityStore; activeCollection?: string };
        if (parsed.overrides) setOverrides({ ...emptyOverrides, ...parsed.overrides });
        if (parsed.activeCollection) setActiveCollection(parsed.activeCollection);
      } catch { /* keep defaults */ }
    }
    const syncPath = () => setActiveWorld(detectWorld(window.location.pathname));
    syncPath();
    window.addEventListener('popstate', syncPath);
    const observer = new MutationObserver(syncPath);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener('popstate', syncPath); observer.disconnect(); };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ overrides, activeCollection }));
  }, [overrides, activeCollection]);

  const identity = useMemo(() => {
    const base = mergeIdentity(identityRegistry[activeWorld], overrides[activeWorld]);
    if (activeWorld === 'two-harmonic' && activeCollection) return mergeIdentity(base, collectionIdentityOverrides[activeCollection]);
    return base;
  }, [activeWorld, activeCollection, overrides]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--identity-primary', identity.primary);
    root.style.setProperty('--identity-secondary', identity.secondary);
    root.style.setProperty('--identity-accent', identity.accent);
    root.style.setProperty('--identity-ambient', identity.ambient);
    root.style.setProperty('--identity-mark-glow', identity.mark.glow);
    root.dataset.identityWorld = identity.world;
    root.dataset.identityTypography = identity.typography;
  }, [identity]);

  const value = useMemo<IdentityContextValue>(() => ({
    activeWorld,
    activeCollection,
    identity,
    overrides,
    setActiveCollection,
    setWorldOverride: (world, patch) => setOverrides((current) => ({ ...current, [world]: { ...current[world], ...patch, mark: { ...(current[world].mark ?? {}), ...(patch.mark ?? {}) } } })),
    resetWorldIdentity: (world) => setOverrides((current) => ({ ...current, [world]: {} })),
  }), [activeWorld, activeCollection, identity, overrides]);

  return <IdentityContext.Provider value={value}>{children}</IdentityContext.Provider>;
}

export function useIdentity() {
  const context = useContext(IdentityContext);
  if (!context) throw new Error('useIdentity must be used inside IdentityProvider');
  return context;
}
