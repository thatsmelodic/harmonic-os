export type AtmosphereWorldId = 'home' | 'melodic' | 'fried-em' | 'schmackinn' | 'two-harmonic';
export type AtmosphereSeason = 'spring' | 'summer' | 'autumn' | 'winter';
export type AtmosphereTime = 'dawn' | 'day' | 'sunset' | 'night';
export type AtmosphereWeather = 'clear' | 'rain' | 'snow' | 'mist' | 'wind';
export type ParticlePreset = 'adaptive' | 'notes' | 'leaves' | 'snow' | 'sparks' | 'lettuce' | 'thread' | 'petals' | 'custom';

export type AtmosphereSettings = {
  season: AtmosphereSeason;
  time: AtmosphereTime;
  weather: AtmosphereWeather;
  particlePreset: ParticlePreset;
  particleSize: number;
  particleAmount: number;
  particleSpeed: number;
  glow: number;
  blur: number;
  audioReactive: boolean;
  backgroundUrl: string;
  customParticleUrl: string;
};

export type WorldAtmosphereSettings = {
  useGlobal: boolean;
  overrides: Partial<AtmosphereSettings>;
};

export type AtmosphereState = {
  global: AtmosphereSettings;
  worlds: Record<AtmosphereWorldId, WorldAtmosphereSettings>;
};

export const defaultAtmosphere: AtmosphereSettings = {
  season: 'autumn',
  time: 'night',
  weather: 'clear',
  particlePreset: 'adaptive',
  particleSize: 38,
  particleAmount: 44,
  particleSpeed: 42,
  glow: 55,
  blur: 12,
  audioReactive: true,
  backgroundUrl: '',
  customParticleUrl: '',
};

export const defaultAtmosphereState: AtmosphereState = {
  global: defaultAtmosphere,
  worlds: {
    home: { useGlobal: true, overrides: {} },
    melodic: { useGlobal: true, overrides: {} },
    'fried-em': { useGlobal: true, overrides: {} },
    schmackinn: { useGlobal: true, overrides: {} },
    'two-harmonic': { useGlobal: true, overrides: {} },
  },
};

const adaptivePresets: Record<AtmosphereWorldId, Record<AtmosphereSeason, ParticlePreset>> = {
  home: { spring: 'petals', summer: 'sparks', autumn: 'leaves', winter: 'snow' },
  melodic: { spring: 'notes', summer: 'notes', autumn: 'notes', winter: 'snow' },
  'fried-em': { spring: 'sparks', summer: 'sparks', autumn: 'leaves', winter: 'snow' },
  schmackinn: { spring: 'lettuce', summer: 'sparks', autumn: 'lettuce', winter: 'snow' },
  'two-harmonic': { spring: 'thread', summer: 'thread', autumn: 'thread', winter: 'snow' },
};

export function resolveAtmosphere(state: AtmosphereState, world: AtmosphereWorldId): AtmosphereSettings {
  const entry = state.worlds[world];
  const resolved = entry.useGlobal ? state.global : { ...state.global, ...entry.overrides };
  return {
    ...resolved,
    particlePreset: resolved.particlePreset === 'adaptive' ? adaptivePresets[world][resolved.season] : resolved.particlePreset,
  };
}

export function worldFromPathname(pathname: string): AtmosphereWorldId {
  if (pathname.includes('/worlds/melodic')) return 'melodic';
  if (pathname.includes('/worlds/fried-em')) return 'fried-em';
  if (pathname.includes('/worlds/schmackinn')) return 'schmackinn';
  if (pathname.includes('/worlds/harmonic') || pathname.includes('/worlds/2-harmonic')) return 'two-harmonic';
  return 'home';
}
