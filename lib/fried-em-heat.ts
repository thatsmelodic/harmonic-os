'use client';

export type FriedEmHeatLedger = {
  heat: number;
  activity: string[];
  unlockedRewards: number[];
  updatedAt: number;
};

const STORAGE_KEY = 'harmonic:fried-em:heat-ledger';
const EVENT_NAME = 'fried-em-heat-update';

export const defaultFriedEmHeatLedger: FriedEmHeatLedger = {
  heat: 840,
  activity: ['Watched Episode 03 · +15 Heat', 'Voted on Jay Buckets vs. Tone · +10 Heat'],
  unlockedRewards: [100, 500],
  updatedAt: Date.now(),
};

export function readFriedEmHeatLedger(): FriedEmHeatLedger {
  if (typeof window === 'undefined') return defaultFriedEmHeatLedger;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultFriedEmHeatLedger, ...JSON.parse(stored) } : defaultFriedEmHeatLedger;
  } catch {
    return defaultFriedEmHeatLedger;
  }
}

export function saveFriedEmHeatLedger(ledger: FriedEmHeatLedger) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ledger));
  window.dispatchEvent(new CustomEvent<FriedEmHeatLedger>(EVENT_NAME, { detail: ledger }));
}

export function awardFriedEmHeat(label: string, amount: number, rewardThresholds: number[] = []) {
  const current = readFriedEmHeatLedger();
  const heat = current.heat + amount;
  const ledger: FriedEmHeatLedger = {
    heat,
    activity: [`${label} · +${amount} Heat`, ...current.activity].slice(0, 12),
    unlockedRewards: rewardThresholds.filter((threshold) => heat >= threshold),
    updatedAt: Date.now(),
  };
  saveFriedEmHeatLedger(ledger);
  return ledger;
}

export function subscribeFriedEmHeat(callback: (ledger: FriedEmHeatLedger) => void) {
  if (typeof window === 'undefined') return () => undefined;
  const handler = (event: Event) => callback((event as CustomEvent<FriedEmHeatLedger>).detail);
  const storageHandler = () => callback(readFriedEmHeatLedger());
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', storageHandler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', storageHandler);
  };
}
