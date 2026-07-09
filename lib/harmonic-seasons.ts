import { type HarmonicWorldId } from '@/lib/harmonic-engine';

export type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type SeasonalWeather = 'clear' | 'mist' | 'drizzle' | 'rain' | 'wind' | 'leaf-storm' | 'first-frost' | 'snow';
export type SeasonalHoliday = 'none' | 'halloween' | 'thanksgiving' | 'black-friday' | 'autumn-festival' | 'winter-solstice' | 'spring-bloom' | 'summer-block-party';

export type SeasonState = {
  season: SeasonKey;
  name: string;
  philosophy: string;
  timeOfDay: TimeOfDay;
  weather: SeasonalWeather;
  holiday: SeasonalHoliday;
  arrivalProgress: number;
  leafDensity: number;
  windIntensity: number;
  wildlifeDensity: number;
  scentIntensity: number;
  harmonicTreeGlow: number;
  temperatureMood: number;
  aiInstincts: string[];
  worldInterpretations: Record<HarmonicWorldId, string>;
  palette: {
    sky: string;
    glow: string;
    accent: string;
    shadow: string;
  };
};

export const seasonDefaults: Record<SeasonKey, SeasonState> = {
  spring: {
    season: 'spring',
    name: 'Spring Becoming',
    philosophy: 'Becoming, renewal, growth, first color after silence.',
    timeOfDay: 'morning',
    weather: 'clear',
    holiday: 'spring-bloom',
    arrivalProgress: 52,
    leafDensity: 34,
    windIntensity: 28,
    wildlifeDensity: 70,
    scentIntensity: 62,
    harmonicTreeGlow: 74,
    temperatureMood: 58,
    aiInstincts: ['Recommend fresh palettes', 'Increase bloom', 'Use gentle motion', 'Favor new beginnings'],
    palette: { sky: '#bde7ff', glow: '#b8ffcf', accent: '#ff9fd6', shadow: '#07130d' },
    worldInterpretations: {
      melodic: 'Soft melodies, new hooks, morning vocals, light visualizer particles.',
      harmonic: 'Light layers, floral accents, fresh campaign energy.',
      'fried-em': 'Outdoor runs return, brighter courts, training arcs.',
      schmackin: 'Fresh menus, brunch energy, farmers market atmosphere.',
    },
  },
  summer: {
    season: 'summer',
    name: 'Summer Living',
    philosophy: 'Living out loud, heat, motion, daylight, crowds, outside energy.',
    timeOfDay: 'afternoon',
    weather: 'clear',
    holiday: 'summer-block-party',
    arrivalProgress: 76,
    leafDensity: 44,
    windIntensity: 36,
    wildlifeDensity: 62,
    scentIntensity: 68,
    harmonicTreeGlow: 82,
    temperatureMood: 88,
    aiInstincts: ['Increase saturation', 'Raise tempo', 'Favor crowd energy', 'Use faster pacing'],
    palette: { sky: '#58c7ff', glow: '#ffd166', accent: '#ff4fd8', shadow: '#061224' },
    worldInterpretations: {
      melodic: 'Bright visuals, energetic hooks, festival lights.',
      harmonic: 'Pop-up drops, short sets, bright runway lighting.',
      'fried-em': 'Blacktop tournaments, loud crowds, sun glare, sweat.',
      schmackin: 'Food trucks, cold drinks, outdoor seating, block-party reviews.',
    },
  },
  autumn: {
    season: 'autumn',
    name: 'Autumn Reflection',
    philosophy: 'Transition, memory, harvest, warmth, endings becoming wisdom.',
    timeOfDay: 'evening',
    weather: 'leaf-storm',
    holiday: 'autumn-festival',
    arrivalProgress: 100,
    leafDensity: 96,
    windIntensity: 72,
    wildlifeDensity: 58,
    scentIntensity: 95,
    harmonicTreeGlow: 100,
    temperatureMood: 64,
    aiInstincts: ['Recommend warmer lighting', 'Slow the camera', 'Favor reflection', 'Add golden hour', 'Increase leaf motion', 'Suggest seasonal drops'],
    palette: { sky: '#3b174f', glow: '#ff9f1c', accent: '#b76cff', shadow: '#080301' },
    worldInterpretations: {
      melodic: 'Vinyl crackle, orange-purple skies, emotional hooks, leaves moving to tempo.',
      harmonic: 'Layered garments, scarves, runway leaves, fall collection energy.',
      'fried-em': 'Hoodie runs, outdoor courts, cold breath, leaves across asphalt.',
      schmackin: 'Fogged windows, heavier steam, seasonal menus, cider, firewood, comfort food.',
    },
  },
  winter: {
    season: 'winter',
    name: 'Winter Enduring',
    philosophy: 'Stillness, survival, clarity, cold light, inner fire.',
    timeOfDay: 'night',
    weather: 'snow',
    holiday: 'winter-solstice',
    arrivalProgress: 64,
    leafDensity: 5,
    windIntensity: 48,
    wildlifeDensity: 24,
    scentIntensity: 42,
    harmonicTreeGlow: 68,
    temperatureMood: 22,
    aiInstincts: ['Lower saturation', 'Use crisp lighting', 'Favor quiet drama', 'Increase contrast'],
    palette: { sky: '#09111f', glow: '#d7f4ff', accent: '#b76cff', shadow: '#02040a' },
    worldInterpretations: {
      melodic: 'Cold pads, moonlight, quiet memory, glassy particles.',
      harmonic: 'Heavy fabrics, coats, premium textures, icy runway glow.',
      'fried-em': 'Indoor gym energy, breath, squeaking floors, dramatic lights.',
      schmackin: 'Hot bowls, cocoa, soups, smoke, cozy booths, warm windows.',
    },
  },
};

export function applySeasonEmotion(state: SeasonState, emotion: string): SeasonState {
  const lower = emotion.toLowerCase();
  if (lower.includes('chaos') || lower.includes('pressure')) {
    return { ...state, windIntensity: Math.min(100, state.windIntensity + 22), weather: state.season === 'autumn' ? 'leaf-storm' : state.weather };
  }
  if (lower.includes('peace') || lower.includes('luxury')) {
    return { ...state, windIntensity: Math.max(0, state.windIntensity - 20), weather: state.season === 'autumn' ? 'mist' : state.weather };
  }
  if (lower.includes('hope') || lower.includes('healing')) {
    return { ...state, harmonicTreeGlow: Math.min(100, state.harmonicTreeGlow + 12), scentIntensity: Math.min(100, state.scentIntensity + 10) };
  }
  return state;
}

export function getSeasonWorldSignal(season: SeasonState, world: HarmonicWorldId) {
  return season.worldInterpretations[world];
}
