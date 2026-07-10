export type ClimateMode = 'off' | 'spring' | 'summer' | 'fall' | 'winter' | 'rain' | 'custom';

export type ClimateSettings = {
  mode: ClimateMode;
  customVisualUrl: string;
  particleSize: number;
  density: number;
  speed: number;
  opacity: number;
  wind: number;
  rotation: number;
  glow: number;
  transitionDays: number;
};

export type WorldClimatePreference = {
  followGlobal: boolean;
  override: ClimateSettings;
};

export const globalClimateStorageKey = 'harmonic:climate:global';
export const climateUpdateEvent = 'harmonic-climate-update';

export const defaultClimateSettings: ClimateSettings = {
  mode: 'spring',
  customVisualUrl: '',
  particleSize: 56,
  density: 28,
  speed: 12,
  opacity: 0.82,
  wind: 22,
  rotation: 360,
  glow: 12,
  transitionDays: 0,
};

export function worldClimateStorageKey(worldId: string) {
  return `harmonic:climate:${worldId}`;
}

export function readGlobalClimate(): ClimateSettings {
  if (typeof window === 'undefined') return defaultClimateSettings;
  try {
    const saved = window.localStorage.getItem(globalClimateStorageKey);
    return saved ? { ...defaultClimateSettings, ...JSON.parse(saved) } : defaultClimateSettings;
  } catch {
    return defaultClimateSettings;
  }
}

export function readWorldClimate(worldId: string): WorldClimatePreference {
  if (typeof window === 'undefined') return { followGlobal: true, override: defaultClimateSettings };
  try {
    const saved = window.localStorage.getItem(worldClimateStorageKey(worldId));
    return saved ? { followGlobal: true, override: defaultClimateSettings, ...JSON.parse(saved) } : { followGlobal: true, override: defaultClimateSettings };
  } catch {
    return { followGlobal: true, override: defaultClimateSettings };
  }
}

export function resolveWorldClimate(worldId: string): ClimateSettings {
  const preference = readWorldClimate(worldId);
  return preference.followGlobal ? readGlobalClimate() : { ...defaultClimateSettings, ...preference.override };
}

export function saveGlobalClimate(settings: ClimateSettings) {
  window.localStorage.setItem(globalClimateStorageKey, JSON.stringify(settings));
  window.dispatchEvent(new Event(climateUpdateEvent));
}

export function saveWorldClimate(worldId: string, preference: WorldClimatePreference) {
  window.localStorage.setItem(worldClimateStorageKey(worldId), JSON.stringify(preference));
  window.dispatchEvent(new Event(climateUpdateEvent));
}
