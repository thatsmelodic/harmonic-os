'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type WorldKey = 'global' | 'home' | 'melodic' | 'fried-em' | 'schmackinn' | 'two-harmonic';
type MediaKind = 'image' | 'video';
type MediaPlacement = 'background' | 'hero' | 'logo' | 'floating' | 'section';

type WorldMediaAsset = {
  id: string;
  name: string;
  url: string;
  kind: MediaKind;
  placement: MediaPlacement;
  section?: string;
  x: number;
  y: number;
  width: number;
  opacity: number;
  rotation: number;
  zIndex: number;
  loop: boolean;
  muted: boolean;
  fit: 'cover' | 'contain';
};

type WorldCustomization = {
  primary: string; secondary: string; accent: string; background: string; surface: string;
  text: string; muted: string; border: string; glow: string;
  title?: string; subtitle?: string; labels: Record<string, string>; media: WorldMediaAsset[];
};

type Store = Record<WorldKey, WorldCustomization>;
type CloudStatus = 'loading' | 'ready' | 'local' | 'dirty' | 'saving' | 'saved' | 'error';
type ContextValue = {
  settings: Store; activeWorld: WorldKey; cloudStatus: CloudStatus; lastSavedAt: number | null;
  updateWorld: (world: WorldKey, patch: Partial<WorldCustomization>) => void;
  updateLabel: (world: WorldKey, key: string, value: string) => void;
  addMedia: (world: WorldKey, asset: Omit<WorldMediaAsset, 'id'>) => void;
  updateMedia: (world: WorldKey, id: string, patch: Partial<WorldMediaAsset>) => void;
  removeMedia: (world: WorldKey, id: string) => void;
  saveWorldToCloud: (world: WorldKey, secret: string) => Promise<boolean>;
  copyToAll: (world: WorldKey) => void; resetWorld: (world: WorldKey) => void;
};

const base = (values: Omit<WorldCustomization, 'media'>): WorldCustomization => ({ ...values, media: [] });
const defaults: Store = {
  global: base({ primary:'#a855f7',secondary:'#22d3ee',accent:'#f59e0b',background:'#07050a',surface:'#160d20',text:'#ffffff',muted:'#a1a1aa',border:'#3f3f46',glow:'#a855f7',labels:{} }),
  home: base({ primary:'#a855f7',secondary:'#22d3ee',accent:'#f59e0b',background:'#07050a',surface:'#160d20',text:'#ffffff',muted:'#a1a1aa',border:'#3f3f46',glow:'#a855f7',title:'Harmonic OS',subtitle:'One Frequency. Many Worlds.',labels:{} }),
  melodic: base({ primary:'#a855f7',secondary:'#ec4899',accent:'#22d3ee',background:'#090410',surface:'#1a0a28',text:'#ffffff',muted:'#c4b5fd',border:'#4c1d95',glow:'#c084fc',title:'Compose the Memory.',subtitle:'Music becomes atmosphere, archive, and living experience.',labels:{} }),
  'fried-em': base({ primary:'#f97316',secondary:'#facc15',accent:'#ef4444',background:'#08090c',surface:'#15121a',text:'#ffffff',muted:'#d6d3d1',border:'#7c2d12',glow:'#fb923c',title:'Fried Em',subtitle:'They wanted smoke, so we served it hot.',labels:{} }),
  schmackinn: base({ primary:'#c084fc',secondary:'#f59e0b',accent:'#84cc16',background:'#09040c',surface:'#1d1023',text:'#ffffff',muted:'#d8b4fe',border:'#6b21a8',glow:'#d946ef',title:'What does life taste like?',subtitle:'A living food city where every review becomes a storefront, frequency, memory, and community event.',labels:{ eyebrow:'Flavor District',systemsTitle:'The complete food universe.',mapTitle:'Every bite leaves a building.',mapDescription:'Reviewed restaurants become living storefronts. Community callouts become heat until Melodic pulls up.' } }),
  'two-harmonic': base({ primary:'#36b2cb',secondary:'#f472b6',accent:'#facc15',background:'#07090b',surface:'#102027',text:'#ffffff',muted:'#bae6fd',border:'#155e75',glow:'#67e8f9',title:'Stitched Melodies.',subtitle:'Where songs become garments and garments become memory.',labels:{} }),
};

const STORAGE_KEY = 'harmonic-world-customization-v3';
const CustomizationContext = createContext<ContextValue | null>(null);

function resolveWorld(path: string): WorldKey {
  if (path.includes('/worlds/melodic')) return 'melodic';
  if (path.includes('/worlds/fried-em')) return 'fried-em';
  if (path.includes('/worlds/schmackinn') || path.includes('/worlds/schmackin')) return 'schmackinn';
  if (path.includes('/worlds/harmonic') || path.includes('/worlds/2-harmonic') || path.includes('/worlds/two-harmonic') || path.includes('/shop')) return 'two-harmonic';
  if (path === '/') return 'home';
  return 'global';
}

function mergeStore(source?: Partial<Store>): Store {
  return Object.fromEntries(Object.entries(defaults).map(([key, value]) => {
    const saved = source?.[key as WorldKey];
    return [key, { ...value, ...saved, labels: { ...value.labels, ...saved?.labels }, media: saved?.media ?? value.media }];
  })) as Store;
}

export function WorldCustomizationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeWorld = resolveWorld(pathname);
  const [settings, setSettings] = useState<Store>(defaults);
  const [cloudStatus, setCloudStatus] = useState<CloudStatus>('loading');
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  useEffect(() => {
    const local = window.localStorage.getItem(STORAGE_KEY) || window.localStorage.getItem('harmonic-world-customization-v2');
    if (local) try { setSettings(mergeStore(JSON.parse(local))); } catch {}
    fetch('/api/world-design').then((response) => response.json()).then((data) => {
      if (data.designs && Object.keys(data.designs).length) setSettings((current) => mergeStore({ ...current, ...data.designs }));
      setCloudStatus('ready');
    }).catch(() => setCloudStatus('local'));
  }, []);

  useEffect(() => { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); }, [settings]);
  useEffect(() => {
    const active = settings[activeWorld] || settings.global;
    const root = document.documentElement;
    (['primary','secondary','accent','background','surface','text','muted','border','glow'] as const).forEach((key) => root.style.setProperty(`--world-${key}`, active[key]));
    root.dataset.world = activeWorld;
  }, [settings, activeWorld]);

  const mutate = (recipe: (current: Store) => Store) => {
    setSettings(recipe);
    setCloudStatus('dirty');
  };

  const value = useMemo<ContextValue>(() => ({
    settings, activeWorld, cloudStatus, lastSavedAt,
    updateWorld: (world, patch) => mutate((current) => ({ ...current, [world]: { ...current[world], ...patch } })),
    updateLabel: (world, key, label) => mutate((current) => ({ ...current, [world]: { ...current[world], labels: { ...current[world].labels, [key]: label } } })),
    addMedia: (world, asset) => mutate((current) => ({ ...current, [world]: { ...current[world], media: [...current[world].media, { ...asset, id: crypto.randomUUID() }] } })),
    updateMedia: (world, id, patch) => mutate((current) => ({ ...current, [world]: { ...current[world], media: current[world].media.map((asset) => asset.id === id ? { ...asset, ...patch } : asset) } })),
    removeMedia: (world, id) => mutate((current) => ({ ...current, [world]: { ...current[world], media: current[world].media.filter((asset) => asset.id !== id) } })),
    saveWorldToCloud: async (world, secret) => {
      setCloudStatus('saving');
      try {
        const response = await fetch('/api/world-design', { method:'PUT', headers:{ 'Content-Type':'application/json', 'x-harmonic-studio-key':secret }, body:JSON.stringify({ world, settings: settings[world] }) });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || 'Save failed');
        setLastSavedAt(Date.now());
        setCloudStatus('saved');
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        return true;
      } catch {
        setCloudStatus('error');
        return false;
      }
    },
    copyToAll: (world) => mutate((current) => Object.fromEntries(Object.keys(current).map((key) => [key, { ...current[world], labels:{...current[world].labels}, media:current[world].media.map((asset) => ({...asset,id:crypto.randomUUID()})) }])) as Store),
    resetWorld: (world) => mutate((current) => ({ ...current, [world]: defaults[world] })),
  }), [settings, activeWorld, cloudStatus, lastSavedAt]);

  return <CustomizationContext.Provider value={value}>{children}</CustomizationContext.Provider>;
}

export function useWorldCustomization() {
  const context = useContext(CustomizationContext);
  if (!context) throw new Error('useWorldCustomization must be used inside WorldCustomizationProvider');
  return context;
}

export type { WorldKey, WorldCustomization, WorldMediaAsset, MediaKind, MediaPlacement };