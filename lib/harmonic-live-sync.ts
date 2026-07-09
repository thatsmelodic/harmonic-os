'use client';

import type { HarmonicEngineState, HarmonicWorldId } from '@/lib/harmonic-engine';
import type { HarmonicRuntimeSnapshot } from '@/lib/harmonic-signal-bus';

export const HARMONIC_LIVE_SYNC_EVENT = 'harmonic-live-runtime-sync';
const STORAGE_KEY = 'harmonic-os-live-runtime-v1';

export type HarmonicLiveSyncPayload = {
  world: HarmonicWorldId;
  state: HarmonicEngineState;
  snapshot: HarmonicRuntimeSnapshot;
  source: string;
  at: number;
};

export function publishRuntimeSync(snapshot: HarmonicRuntimeSnapshot, source = 'mission-control') {
  if (typeof window === 'undefined') return;

  const payload: HarmonicLiveSyncPayload = {
    world: snapshot.state.world,
    state: snapshot.state,
    snapshot,
    source,
    at: Date.now(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent<HarmonicLiveSyncPayload>(HARMONIC_LIVE_SYNC_EVENT, { detail: payload }));
}

export function readRuntimeSync(): HarmonicLiveSyncPayload | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as HarmonicLiveSyncPayload) : null;
  } catch {
    return null;
  }
}

export function subscribeRuntimeSync(callback: (payload: HarmonicLiveSyncPayload) => void) {
  if (typeof window === 'undefined') return () => undefined;

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<HarmonicLiveSyncPayload>;
    callback(customEvent.detail);
  };

  window.addEventListener(HARMONIC_LIVE_SYNC_EVENT, handler);
  return () => window.removeEventListener(HARMONIC_LIVE_SYNC_EVENT, handler);
}
