import {
  mergeEngineState,
  type HarmonicEngineState,
  type HarmonicWorldId,
  type LightingMode,
  type EnvironmentMode,
  type EmotionKey,
  type PhysicsMode,
} from '@/lib/harmonic-engine';
import { type SeasonState } from '@/lib/harmonic-seasons';

type SeasonEnginePatch = Partial<HarmonicEngineState>;

const seasonLighting: Record<SeasonState['season'], LightingMode> = {
  spring: 'golden-hour',
  summer: 'spotlight',
  autumn: 'candlelight',
  winter: 'moonlight',
};

const seasonEmotion: Record<SeasonState['season'], EmotionKey> = {
  spring: 'hope',
  summer: 'freedom',
  autumn: 'reflection',
  winter: 'peace',
};

const weatherPhysics: Partial<Record<SeasonState['weather'], PhysicsMode>> = {
  wind: 'soft-float',
  'leaf-storm': 'fabric-drift',
  mist: 'steam-rise',
  drizzle: 'steam-rise',
  rain: 'steam-rise',
  snow: 'soft-float',
};

function environmentForWorld(world: HarmonicWorldId): EnvironmentMode {
  if (world === 'fried-em') return 'arena';
  if (world === 'schmackin') return 'restaurant';
  if (world === 'harmonic') return 'runway';
  return 'nebula';
}

export function getSeasonEnginePatch(season: SeasonState, world: HarmonicWorldId): SeasonEnginePatch {
  const weatherFogBoost = ['mist', 'drizzle', 'rain', 'first-frost', 'snow'].includes(season.weather) ? 18 : 0;
  const stormMotionBoost = season.weather === 'leaf-storm' || season.weather === 'wind' ? 18 : 0;
  const holidayBloomBoost = season.holiday !== 'none' ? 10 : 0;

  const patch: SeasonEnginePatch = {
    emotion: seasonEmotion[season.season],
    environment: environmentForWorld(world),
    lighting: seasonLighting[season.season],
    physics: weatherPhysics[season.weather] ?? undefined,
    fog: Math.min(100, Math.round(season.scentIntensity * 0.28 + season.arrivalProgress * 0.22 + weatherFogBoost)),
    bloom: Math.min(100, Math.round(season.harmonicTreeGlow * 0.45 + holidayBloomBoost + 28)),
    aura: Math.min(100, Math.round(season.harmonicTreeGlow * 0.55 + season.temperatureMood * 0.25)),
    particleDensity: Math.min(100, Math.round(season.leafDensity * 0.62 + season.wildlifeDensity * 0.18)),
    motionIntensity: Math.min(100, Math.round(season.windIntensity * 0.72 + stormMotionBoost)),
    grain: season.season === 'autumn' ? 28 : season.season === 'winter' ? 20 : 10,
    crystalHeartIntensity: Math.min(100, Math.round(season.harmonicTreeGlow * 0.82)),
  };

  return Object.fromEntries(Object.entries(patch).filter(([, value]) => value !== undefined)) as SeasonEnginePatch;
}

export function mergeSeasonIntoEngine(world: HarmonicWorldId, season: SeasonState, current?: Partial<HarmonicEngineState>) {
  return mergeEngineState(world, {
    ...current,
    ...getSeasonEnginePatch(season, world),
  });
}
