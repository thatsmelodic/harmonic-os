export type WorldId = 'os' | 'melodic' | 'fried-em' | 'schmackinn' | 'two-harmonic';

export type WorldPalette = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  glow: string;
};

export type WorldCopy = Record<string, string>;

export type WorldCustomization = {
  world: WorldId;
  palette: WorldPalette;
  copy: WorldCopy;
};

export const worldLabels: Record<WorldId, string> = {
  os: 'Harmonic OS',
  melodic: 'Melodic',
  'fried-em': 'Fried Em',
  schmackinn: 'Schmackinn',
  'two-harmonic': '2 Harmonic',
};

export const defaultWorldCustomizations: Record<WorldId, WorldCustomization> = {
  os: {
    world: 'os',
    palette: { primary: '#8b5cf6', secondary: '#36b2cb', accent: '#f5d76e', background: '#07070b', surface: '#11111a', text: '#ffffff', muted: '#a8a8b3', border: '#343442', glow: '#a855f7' },
    copy: { eyebrow: 'One Frequency. Many Worlds.', title: 'Harmonic OS', description: 'A living creative operating system.' },
  },
  melodic: {
    world: 'melodic',
    palette: { primary: '#a855f7', secondary: '#ec4899', accent: '#67e8f9', background: '#08040f', surface: '#160b22', text: '#ffffff', muted: '#c4b5d0', border: '#4b2a63', glow: '#c084fc' },
    copy: { eyebrow: 'Melodic Frequency', title: 'Compose the Memory.', description: 'Music becomes atmosphere, archive, and living experience.' },
  },
  'fried-em': {
    world: 'fried-em',
    palette: { primary: '#ff7a1a', secondary: '#facc15', accent: '#ef4444', background: '#08090b', surface: '#17120e', text: '#ffffff', muted: '#c6b9ad', border: '#5b371c', glow: '#fb923c' },
    copy: { eyebrow: 'Basketball Frequency', title: 'Fried Em', description: 'They wanted smoke, so we served it hot.' },
  },
  schmackinn: {
    world: 'schmackinn',
    palette: { primary: '#c084fc', secondary: '#f59e0b', accent: '#a3e635', background: '#09050d', surface: '#1a0d20', text: '#ffffff', muted: '#c9b9ce', border: '#583469', glow: '#d946ef' },
    copy: {
      eyebrow: 'Flavor District',
      title: 'What does life taste like?',
      description: 'Schmackinn is a living food city where every review becomes a storefront, a frequency, a memory, and a community event.',
      subdescription: 'Explore real districts, enter living restaurants, experience the first bite, call out the next spot, and preserve every meal that meant something.',
      systemsEyebrow: 'World Systems',
      systemsTitle: 'The complete food universe.',
      frequenciesEyebrow: 'Flavor Frequencies',
      frequenciesTitle: 'Your tier list is the law',
      mapEyebrow: 'Flavor City Map',
      mapTitle: 'Every bite leaves a building.',
      mapDescription: 'Reviewed restaurants become living storefronts. Community callouts appear as hot requests until Melodic pulls up.',
    },
  },
  'two-harmonic': {
    world: 'two-harmonic',
    palette: { primary: '#36b2cb', secondary: '#f472b6', accent: '#f5e6c8', background: '#080a0c', surface: '#10191c', text: '#ffffff', muted: '#b7c6c9', border: '#275761', glow: '#67e8f9' },
    copy: { eyebrow: 'The Fashion House', title: 'Stitched Melodies.', description: 'Where songs become garments and garments become memory.' },
  },
};

export const WORLD_CUSTOMIZATION_STORAGE_KEY = 'harmonic-world-customizations-v1';
