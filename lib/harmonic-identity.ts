export type IdentityWorld = 'home' | 'melodic' | 'fried-em' | 'schmackinn' | 'two-harmonic';
export type MarkMotion = 'float' | 'pulse' | 'orbit' | 'drift' | 'still';
export type MetallicFinish = 'none' | 'gold' | 'silver' | 'pearl' | 'chrome';

export type FrequencyMark = {
  label: string;
  symbol: string;
  imageUrl?: string;
  glow: string;
  motion: MarkMotion;
  metallic: MetallicFinish;
  scale: number;
};

export type WorldIdentity = {
  world: IdentityWorld;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  ambient: string;
  particleFamily: string[];
  typography: 'cinematic' | 'luxury' | 'athletic' | 'editorial';
  mark: FrequencyMark;
};

export type IdentityOverride = Partial<Omit<WorldIdentity, 'world' | 'mark'>> & {
  mark?: Partial<FrequencyMark>;
};

export const identityRegistry: Record<IdentityWorld, WorldIdentity> = {
  home: {
    world: 'home', name: 'Harmonic OS', primary: '#8b5cf6', secondary: '#36b2cb', accent: '#f5d76e', ambient: '#0a0712',
    particleFamily: ['stars', 'frequency dust'], typography: 'cinematic',
    mark: { label: 'Harmonic Frequency Mark', symbol: '∞', glow: '#a855f7', motion: 'pulse', metallic: 'pearl', scale: 1 },
  },
  melodic: {
    world: 'melodic', name: 'Melodic', primary: '#a855f7', secondary: '#ec4899', accent: '#67e8f9', ambient: '#090410',
    particleFamily: ['music notes', 'wave fragments'], typography: 'cinematic',
    mark: { label: 'Melodic Frequency Mark', symbol: '♫', glow: '#c084fc', motion: 'float', metallic: 'pearl', scale: 1 },
  },
  'fried-em': {
    world: 'fried-em', name: 'Fried Em', primary: '#f97316', secondary: '#facc15', accent: '#ef4444', ambient: '#08090c',
    particleFamily: ['embers', 'court dust'], typography: 'athletic',
    mark: { label: 'Fried Em Frequency Mark', symbol: '🏀', glow: '#fb923c', motion: 'orbit', metallic: 'none', scale: 1 },
  },
  schmackinn: {
    world: 'schmackinn', name: 'Schmackinn', primary: '#c084fc', secondary: '#84cc16', accent: '#f5e6c8', ambient: '#09040c',
    particleFamily: ['steam', 'herbs', 'sesame'], typography: 'editorial',
    mark: { label: 'Schmackinn Frequency Mark', symbol: '🍽️', glow: '#d8b4fe', motion: 'drift', metallic: 'none', scale: 1 },
  },
  'two-harmonic': {
    world: 'two-harmonic', name: '2 Harmonic', primary: '#36b2cb', secondary: '#f3fbff', accent: '#9ee9f5', ambient: '#050b0d',
    particleFamily: ['thread', 'fabric fibers', 'music notes', 'frequency dust'], typography: 'luxury',
    mark: { label: '2 Harmonic Frequency Mark', symbol: '∞', imageUrl: '/identity/two-harmonic-mark-blue.svg', glow: '#36b2cb', motion: 'float', metallic: 'pearl', scale: 1.12 },
  },
};

export const collectionIdentityOverrides: Record<string, IdentityOverride> = {
  'beige-frequency': {
    primary: '#d7c3a3', secondary: '#f5ead8', accent: '#ad8a56', ambient: '#100c08',
    particleFamily: ['thread', 'linen fibers', 'music notes', 'champagne dust'], typography: 'luxury',
    mark: { label: 'Beige Frequency Collection Mark', symbol: '∞', imageUrl: '/identity/two-harmonic-mark-gold.svg', glow: '#e7cf9d', metallic: 'gold', motion: 'float', scale: 1.2 },
  },
};

export function mergeIdentity(base: WorldIdentity, override?: IdentityOverride): WorldIdentity {
  if (!override) return base;
  return { ...base, ...override, world: base.world, mark: { ...base.mark, ...(override.mark ?? {}) } };
}
