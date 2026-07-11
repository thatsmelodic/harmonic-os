'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type WorldKey = 'global' | 'home' | 'melodic' | 'fried-em' | 'schmackinn' | 'two-harmonic';

type WorldCustomization = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  title?: string;
  subtitle?: string;
  labels: Record<string, string>;
};

type Store = Record<WorldKey, WorldCustomization>;

type ContextValue = {
  settings: Store;
  updateWorld: (world: WorldKey, patch: Partial<WorldCustomization>) => void;
  updateLabel: (world: WorldKey, key: string, value: string) => void;
  copyToAll: (world: WorldKey) => void;
  resetWorld: (world: WorldKey) => void;
};

const defaults: Store = {
  global: { primary: '#a855f7', secondary: '#22d3ee', accent: '#f59e0b', background: '#07050a', surface: '#160d20', text: '#ffffff', muted: '#a1a1aa', labels: {} },
  home: { primary: '#a855f7', secondary: '#22d3ee', accent: '#f59e0b', background: '#07050a', surface: '#160d20', text: '#ffffff', muted: '#a1a1aa', labels: {} },
  melodic: { primary: '#a855f7', secondary: '#ec4899', accent: '#22d3ee', background: '#090410', surface: '#1a0a28', text: '#ffffff', muted: '#c4b5fd', labels: {} },
  'fried-em': { primary: '#f97316', secondary: '#facc15', accent: '#ef4444', background: '#08090c', surface: '#15121a', text: '#ffffff', muted: '#d6d3d1', labels: {} },
  schmackinn: { primary: '#c084fc', secondary: '#f59e0b', accent: '#84cc16', background: '#09040c', surface: '#1d1023', text: '#ffffff', muted: '#d8b4fe', labels: {} },
  'two-harmonic': { primary: '#36b2cb', secondary: '#f472b6', accent: '#facc15', background: '#07090b', surface: '#102027', text: '#ffffff', muted: '#bae6fd', labels: {} },
};

const STORAGE_KEY = 'harmonic-world-customization-v1';
const CustomizationContext = createContext<ContextValue | null>(null);

export function WorldCustomizationProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Store>(defaults);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setSettings({ ...defaults, ...JSON.parse(saved) }); } catch { /* keep defaults */ }
    }
  }, []);

  useEffect(() => { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); }, [settings]);

  useEffect(() => {
    const path = window.location.pathname;
    const world: WorldKey = path.includes('/worlds/melodic') ? 'melodic' : path.includes('/worlds/fried-em') ? 'fried-em' : path.includes('/worlds/schmackinn') ? 'schmackinn' : path.includes('/worlds/2-harmonic') || path.includes('/worlds/two-harmonic') ? 'two-harmonic' : path === '/' ? 'home' : 'global';
    const active = settings[world] || settings.global;
    const root = document.documentElement;
    root.style.setProperty('--world-primary', active.primary);
    root.style.setProperty('--world-secondary', active.secondary);
    root.style.setProperty('--world-accent', active.accent);
    root.style.setProperty('--world-background', active.background);
    root.style.setProperty('--world-surface', active.surface);
    root.style.setProperty('--world-text', active.text);
    root.style.setProperty('--world-muted', active.muted);
  }, [settings]);

  const value = useMemo<ContextValue>(() => ({
    settings,
    updateWorld: (world, patch) => setSettings((current) => ({ ...current, [world]: { ...current[world], ...patch } })),
    updateLabel: (world, key, label) => setSettings((current) => ({ ...current, [world]: { ...current[world], labels: { ...current[world].labels, [key]: label } } })),
    copyToAll: (world) => setSettings((current) => Object.fromEntries(Object.keys(current).map((key) => [key, { ...current[world], labels: { ...current[world].labels } }])) as Store),
    resetWorld: (world) => setSettings((current) => ({ ...current, [world]: defaults[world] })),
  }), [settings]);

  return <CustomizationContext.Provider value={value}>{children}</CustomizationContext.Provider>;
}

export function useWorldCustomization() {
  const context = useContext(CustomizationContext);
  if (!context) throw new Error('useWorldCustomization must be used inside WorldCustomizationProvider');
  return context;
}

export type { WorldKey, WorldCustomization };
