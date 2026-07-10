import type { HarmonicWorldSlug } from '@/data/world-engine';

export type UniverseMotionPreset = 'still' | 'slow' | 'cinematic' | 'aggressive' | 'floating';
export type UniverseWeatherPreset = 'none' | 'stars' | 'rain' | 'snow' | 'petals' | 'embers' | 'heatwave';
export type UniverseTransitionPreset = 'fade' | 'portal' | 'pour' | 'pulse' | 'slide' | 'flash';

export type WorldVisualPreset = {
  slug: HarmonicWorldSlug;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  glow: number;
  particleDensity: number;
  blur: number;
  contrast: number;
  movement: UniverseMotionPreset;
  weather: UniverseWeatherPreset;
  transition: UniverseTransitionPreset;
  transitionDurationMs: number;
  cameraDrift: number;
  cardLift: number;
  pulseEnabled: boolean;
  trailsEnabled: boolean;
  ambientAudioEnabled: boolean;
  ambientAudioVolume: number;
  lowMotionFallback: boolean;
  roomColumnsDesktop: 2 | 3 | 4;
  roomCornerRadius: number;
  roomBorderOpacity: number;
  heroScale: number;
  introCopy: string;
};

export const universePresets: Record<HarmonicWorldSlug, WorldVisualPreset> = {
  melodic: {
    slug: 'melodic',
    primary: '#b76cff',
    secondary: '#36b2cb',
    accent: '#f5d26b',
    background: '#05030a',
    surface: '#130d20',
    text: '#f7f1ff',
    glow: 82,
    particleDensity: 42,
    blur: 24,
    contrast: 108,
    movement: 'floating',
    weather: 'stars',
    transition: 'pour',
    transitionDurationMs: 1100,
    cameraDrift: 18,
    cardLift: 8,
    pulseEnabled: true,
    trailsEnabled: true,
    ambientAudioEnabled: true,
    ambientAudioVolume: 18,
    lowMotionFallback: true,
    roomColumnsDesktop: 3,
    roomCornerRadius: 30,
    roomBorderOpacity: 14,
    heroScale: 104,
    introCopy: 'Music is the memory system. Enter the studio and follow the frequency.',
  },
  'fried-em': {
    slug: 'fried-em',
    primary: '#ff6038',
    secondary: '#ffb347',
    accent: '#f8f1d8',
    background: '#090806',
    surface: '#21110c',
    text: '#fff8e9',
    glow: 68,
    particleDensity: 28,
    blur: 14,
    contrast: 118,
    movement: 'aggressive',
    weather: 'heatwave',
    transition: 'flash',
    transitionDurationMs: 620,
    cameraDrift: 8,
    cardLift: 12,
    pulseEnabled: true,
    trailsEnabled: false,
    ambientAudioEnabled: true,
    ambientAudioVolume: 22,
    lowMotionFallback: true,
    roomColumnsDesktop: 3,
    roomCornerRadius: 24,
    roomBorderOpacity: 18,
    heroScale: 108,
    introCopy: 'The park is live. Call next, check the scoreboard, and see who got cooked.',
  },
  schmackin: {
    slug: 'schmackin',
    primary: '#ff4d8d',
    secondary: '#ffd166',
    accent: '#36b2cb',
    background: '#090408',
    surface: '#25101a',
    text: '#fff3f7',
    glow: 76,
    particleDensity: 36,
    blur: 20,
    contrast: 112,
    movement: 'cinematic',
    weather: 'petals',
    transition: 'slide',
    transitionDurationMs: 820,
    cameraDrift: 12,
    cardLift: 10,
    pulseEnabled: true,
    trailsEnabled: true,
    ambientAudioEnabled: true,
    ambientAudioVolume: 16,
    lowMotionFallback: true,
    roomColumnsDesktop: 3,
    roomCornerRadius: 32,
    roomBorderOpacity: 16,
    heroScale: 102,
    introCopy: 'Pull into the district. Follow the sauce glow and find out what is really Schmackin.',
  },
  'two-harmonic': {
    slug: 'two-harmonic',
    primary: '#111111',
    secondary: '#d8c7a3',
    accent: '#d9273e',
    background: '#060606',
    surface: '#17120f',
    text: '#f7f1e5',
    glow: 48,
    particleDensity: 14,
    blur: 18,
    contrast: 122,
    movement: 'slow',
    weather: 'none',
    transition: 'fade',
    transitionDurationMs: 900,
    cameraDrift: 6,
    cardLift: 5,
    pulseEnabled: false,
    trailsEnabled: false,
    ambientAudioEnabled: true,
    ambientAudioVolume: 12,
    lowMotionFallback: true,
    roomColumnsDesktop: 3,
    roomCornerRadius: 18,
    roomBorderOpacity: 20,
    heroScale: 100,
    introCopy: 'The collection is an album. Every garment carries a melody stitched into form.',
  },
  business: {
    slug: 'business',
    primary: '#36b2cb',
    secondary: '#b76cff',
    accent: '#f5d26b',
    background: '#03070a',
    surface: '#0d161b',
    text: '#effcff',
    glow: 56,
    particleDensity: 18,
    blur: 16,
    contrast: 116,
    movement: 'slow',
    weather: 'stars',
    transition: 'pulse',
    transitionDurationMs: 760,
    cameraDrift: 5,
    cardLift: 6,
    pulseEnabled: true,
    trailsEnabled: false,
    ambientAudioEnabled: false,
    ambientAudioVolume: 0,
    lowMotionFallback: true,
    roomColumnsDesktop: 3,
    roomCornerRadius: 22,
    roomBorderOpacity: 16,
    heroScale: 98,
    introCopy: 'Enter the capital room. See the product, traction, moat, revenue model, and roadmap.',
  },
};

export const universeControlGroups = [
  {
    id: 'identity',
    label: 'World Identity',
    controls: ['primary', 'secondary', 'accent', 'background', 'surface', 'text', 'introCopy'],
  },
  {
    id: 'lighting',
    label: 'Lighting & Atmosphere',
    controls: ['glow', 'particleDensity', 'blur', 'contrast', 'weather'],
  },
  {
    id: 'motion',
    label: 'Movement & Camera',
    controls: ['movement', 'transition', 'transitionDurationMs', 'cameraDrift', 'cardLift', 'pulseEnabled', 'trailsEnabled'],
  },
  {
    id: 'layout',
    label: 'Room Layout',
    controls: ['roomColumnsDesktop', 'roomCornerRadius', 'roomBorderOpacity', 'heroScale'],
  },
  {
    id: 'sound',
    label: 'Sound & Accessibility',
    controls: ['ambientAudioEnabled', 'ambientAudioVolume', 'lowMotionFallback'],
  },
] as const;
