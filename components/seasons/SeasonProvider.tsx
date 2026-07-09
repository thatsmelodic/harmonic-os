'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { seasonDefaults, type SeasonKey, type SeasonState } from '@/lib/harmonic-seasons';

const STORAGE_KEY = 'harmonic-os-season-state-v1';

type SeasonContextValue = {
  season: SeasonState;
  setSeasonKey: (season: SeasonKey) => void;
  updateSeason: (patch: Partial<SeasonState>) => void;
};

const SeasonContext = createContext<SeasonContextValue | null>(null);

function readStoredSeason(): SeasonState {
  if (typeof window === 'undefined') return seasonDefaults.autumn;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return seasonDefaults.autumn;
    const parsed = JSON.parse(stored) as SeasonState;
    return { ...seasonDefaults[parsed.season ?? 'autumn'], ...parsed };
  } catch {
    return seasonDefaults.autumn;
  }
}

export function SeasonProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeason] = useState<SeasonState>(seasonDefaults.autumn);

  useEffect(() => {
    setSeason(readStoredSeason());
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(season));
    window.dispatchEvent(new CustomEvent('harmonic-season-change', { detail: season }));
  }, [season]);

  const value = useMemo<SeasonContextValue>(() => ({
    season,
    setSeasonKey: (nextSeason) => setSeason(seasonDefaults[nextSeason]),
    updateSeason: (patch) => setSeason((current) => ({ ...current, ...patch })),
  }), [season]);

  return <SeasonContext.Provider value={value}>{children}</SeasonContext.Provider>;
}

export function useSeason() {
  const value = useContext(SeasonContext);
  if (!value) throw new Error('useSeason must be used inside SeasonProvider');
  return value;
}
