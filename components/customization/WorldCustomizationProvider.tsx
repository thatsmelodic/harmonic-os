'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { defaultWorldCustomizations, WORLD_CUSTOMIZATION_STORAGE_KEY, type WorldCustomization, type WorldId } from '@/lib/world-customization';

type CustomizationState = Record<WorldId, WorldCustomization>;

type WorldCustomizationContextValue = {
  customizations: CustomizationState;
  activeWorld: WorldId;
  updatePalette: (world: WorldId, key: keyof WorldCustomization['palette'], value: string) => void;
  updateCopy: (world: WorldId, key: string, value: string) => void;
  resetWorld: (world: WorldId) => void;
};

const WorldCustomizationContext = createContext<WorldCustomizationContextValue | null>(null);

function resolveWorld(pathname: string): WorldId {
  if (pathname.includes('/worlds/melodic')) return 'melodic';
  if (pathname.includes('/worlds/fried-em')) return 'fried-em';
  if (pathname.includes('/worlds/schmackinn') || pathname.includes('/worlds/schmackin')) return 'schmackinn';
  if (pathname.includes('/worlds/two-harmonic') || pathname.includes('/worlds/2-harmonic')) return 'two-harmonic';
  return 'os';
}

export function WorldCustomizationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeWorld = resolveWorld(pathname);
  const [customizations, setCustomizations] = useState<CustomizationState>(defaultWorldCustomizations);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(WORLD_CUSTOMIZATION_STORAGE_KEY);
      if (stored) setCustomizations((current) => ({ ...current, ...JSON.parse(stored) }));
    } catch {
      // Keep safe defaults when saved studio data is invalid.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(WORLD_CUSTOMIZATION_STORAGE_KEY, JSON.stringify(customizations));
  }, [customizations]);

  useEffect(() => {
    const palette = customizations[activeWorld].palette;
    const root = document.documentElement;
    Object.entries(palette).forEach(([key, value]) => root.style.setProperty(`--world-${key}`, value));
    root.dataset.world = activeWorld;
  }, [activeWorld, customizations]);

  const updatePalette = useCallback((world: WorldId, key: keyof WorldCustomization['palette'], value: string) => {
    setCustomizations((current) => ({ ...current, [world]: { ...current[world], palette: { ...current[world].palette, [key]: value } } }));
  }, []);

  const updateCopy = useCallback((world: WorldId, key: string, value: string) => {
    setCustomizations((current) => ({ ...current, [world]: { ...current[world], copy: { ...current[world].copy, [key]: value } } }));
  }, []);

  const resetWorld = useCallback((world: WorldId) => {
    setCustomizations((current) => ({ ...current, [world]: defaultWorldCustomizations[world] }));
  }, []);

  const value = useMemo(() => ({ customizations, activeWorld, updatePalette, updateCopy, resetWorld }), [customizations, activeWorld, updatePalette, updateCopy, resetWorld]);

  return <WorldCustomizationContext.Provider value={value}>{children}</WorldCustomizationContext.Provider>;
}

export function useWorldCustomization() {
  const context = useContext(WorldCustomizationContext);
  if (!context) throw new Error('useWorldCustomization must be used inside WorldCustomizationProvider');
  return context;
}
