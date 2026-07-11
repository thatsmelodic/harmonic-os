'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type WorldKey = 'global' | 'home' | 'melodic' | 'fried-em' | 'schmackinn' | 'two-harmonic';

type WorldCustomization = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  glow: string;
  title?: string;
  subtitle?: string;
  labels: Record<string, string>;
};

type Store = Record<WorldKey, WorldCustomization>;

type ContextValue = {
  settings: Store;
  activeWorld: WorldKey;
  updateWorld: (world: WorldKey, patch: Partial<WorldCustomization>) => void;
  updateLabel: (world: WorldKey, key: string, value: string) => void;
  copyToAll: (world: WorldKey) => void;
  resetWorld: (world: WorldKey) => void;
};

const defaults: Store = {
  global: { primary: '#a855f7', secondary: '#22d3ee', accent: '#f59e0b', background: '#07050a', surface: '#160d20', text: '#ffffff', muted: '#a1a1aa', border: '#3f3f46', glow: '#a855f7', labels: {} },
  home: { primary: '#a855f7', secondary: '#22d3ee', accent: '#f59e0b', background: '#07050a', surface: '#160d20', text: '#ffffff', muted: '#a1a1aa', border: '#3f3f46', glow: '#a855f7', title: 'Harmonic OS', subtitle: 'One Frequency. Many Worlds.', labels: {} },
  melodic: { primary: '#a855f7', secondary: '#ec4899', accent: '#22d3ee', background: '#090410', surface: '#1a0a28', text: '#ffffff', muted: '#c4b5fd', border: '#4c1d95', glow: '#c084fc', title: 'Compose the Memory.', subtitle: 'Music becomes atmosphere, archive, and living experience.', labels: {} },
  'fried-em': { primary: '#f97316', secondary: '#facc15', accent: '#ef4444', background: '#08090c', surface: '#15121a', text: '#ffffff', muted: '#d6d3d1', border: '#7c2d12', glow: '#fb923c', title: 'Fried Em', subtitle: 'They wanted smoke, so we served it hot.', labels: {} },
  schmackinn: { primary: '#c084fc', secondary: '#f59e0b', accent: '#84cc16', background: '#09040c', surface: '#1d1023', text: '#ffffff', muted: '#d8b4fe', border: '#6b21a8', glow: '#d946ef', title: 'What does life taste like?', subtitle: 'A living food city where every review becomes a storefront, frequency, memory, and community event.', labels: { eyebrow: 'Flavor District', systemsTitle: 'The complete food universe.', mapTitle: 'Every bite leaves a building.', mapDescription: 'Reviewed restaurants become living storefronts. Community callouts become heat until Melodic pulls up.' } },
  'two-harmonic': { primary: '#36b2cb', secondary: '#f472b6', accent: '#facc15', background: '#07090b', surface: '#102027', text: '#ffffff', muted: '#bae6fd', border: '#155e75', glow: '#67e8f9', title: 'Stitched Melodies.', subtitle: 'Where songs become garments and garments become memory.', labels: {} },
};

const STORAGE_KEY = 'harmonic-world-customization-v2';
const CustomizationContext = createContext<ContextValue | null>(null);

function resolveWorld(path: string): WorldKey {
  if (path.includes('/worlds/melodic')) return 'melodic';
  if (path.includes('/worlds/fried-em')) return 'fried-em';
  if (path.includes('/worlds/schmackinn') || path.includes('/worlds/schmackin')) return 'schmackinn';
  if (path.includes('/worlds/2-harmonic') || path.includes('/worlds/two-harmonic')) return 'two-harmonic';
  if (path === '/') return 'home';
  return 'global';
}

export function WorldCustomizationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeWorld = resolveWorld(pathname);
  const [settings, setSettings] = useState<Store>(defaults);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) || window.localStorage.getItem('harmonic-world-customization-v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<Store>;
        const merged = Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key, { ...value, ...(parsed as Store)[key as WorldKey], labels: { ...value.labels, ...(parsed as Store)[key as WorldKey]?.labels } }])) as Store;
        setSettings(merged);
      } catch {
        // Keep safe defaults when older saved data is invalid.
      }
    }
  }, []);

  useEffect(() => { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); }, [settings]);

  useEffect(() => {
    const active = settings[activeWorld] || settings.global;
    const root = document.documentElement;
    (['primary','secondary','accent','background','surface','text','muted','border','glow'] as const).forEach((key) => root.style.setProperty(`--world-${key}`, active[key]));
    root.dataset.world = activeWorld;
  }, [settings, activeWorld]);

  const value = useMemo<ContextValue>(() => ({
    settings,
    activeWorld,
    updateWorld: (world, patch) => setSettings((current) => ({ ...current, [world]: { ...current[world], ...patch } })),
    updateLabel: (world, key, label) => setSettings((current) => ({ ...current, [world]: { ...current[world], labels: { ...current[world].labels, [key]: label } } })),
    copyToAll: (world) => setSettings((current) => Object.fromEntries(Object.keys(current).map((key) => [key, { ...current[world], labels: { ...current[world].labels } }])) as Store),
    resetWorld: (world) => setSettings((current) => ({ ...current, [world]: defaults[world] })),
  }), [settings, activeWorld]);

  return <CustomizationContext.Provider value={value}>{children}</CustomizationContext.Provider>;
}

export function useWorldCustomization() {
  const context = useContext(CustomizationContext);
  if (!context) throw new Error('useWorldCustomization must be used inside WorldCustomizationProvider');
  return context;
}

export type { WorldKey, WorldCustomization };
