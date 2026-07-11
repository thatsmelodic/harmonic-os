'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  defaultAtmosphereState,
  type AtmosphereSettings,
  type AtmosphereState,
  type AtmosphereWorldId,
  type WorldAtmosphereSettings,
} from '@/lib/harmonic-atmosphere';

const STORAGE_KEY = 'harmonic-os-atmosphere-v1';

type AtmosphereContextValue = {
  state: AtmosphereState;
  updateGlobal: (patch: Partial<AtmosphereSettings>) => void;
  updateWorld: (world: AtmosphereWorldId, patch: Partial<AtmosphereSettings>) => void;
  setWorldMode: (world: AtmosphereWorldId, useGlobal: boolean) => void;
  applyGlobalToAll: () => void;
  resetAtmosphere: () => void;
};

const AtmosphereContext = createContext<AtmosphereContextValue | null>(null);

function readStoredState(): AtmosphereState {
  if (typeof window === 'undefined') return defaultAtmosphereState;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<AtmosphereState>;
    return {
      global: { ...defaultAtmosphereState.global, ...parsed.global },
      worlds: Object.fromEntries(
        Object.entries(defaultAtmosphereState.worlds).map(([world, fallback]) => {
          const stored = parsed.worlds?.[world as AtmosphereWorldId] as WorldAtmosphereSettings | undefined;
          return [world, { ...fallback, ...stored, overrides: { ...fallback.overrides, ...stored?.overrides } }];
        }),
      ) as AtmosphereState['worlds'],
    };
  } catch {
    return defaultAtmosphereState;
  }
}

export function AtmosphereProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(defaultAtmosphereState);

  useEffect(() => setState(readStoredState()), []);
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('harmonic-atmosphere-change', { detail: state }));
  }, [state]);

  const value = useMemo<AtmosphereContextValue>(() => ({
    state,
    updateGlobal: (patch) => setState((current) => ({ ...current, global: { ...current.global, ...patch } })),
    updateWorld: (world, patch) => setState((current) => ({
      ...current,
      worlds: {
        ...current.worlds,
        [world]: { ...current.worlds[world], overrides: { ...current.worlds[world].overrides, ...patch } },
      },
    })),
    setWorldMode: (world, useGlobal) => setState((current) => ({
      ...current,
      worlds: { ...current.worlds, [world]: { ...current.worlds[world], useGlobal } },
    })),
    applyGlobalToAll: () => setState((current) => ({
      ...current,
      worlds: Object.fromEntries(Object.keys(current.worlds).map((world) => [world, { useGlobal: true, overrides: {} }])) as AtmosphereState['worlds'],
    })),
    resetAtmosphere: () => setState(defaultAtmosphereState),
  }), [state]);

  return <AtmosphereContext.Provider value={value}>{children}</AtmosphereContext.Provider>;
}

export function useAtmosphere() {
  const value = useContext(AtmosphereContext);
  if (!value) throw new Error('useAtmosphere must be used inside AtmosphereProvider');
  return value;
}
