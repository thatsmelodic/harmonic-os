import type { HarmonicEngineState, HarmonicWorldId } from '@/lib/harmonic-engine';
import type { SeasonKey } from '@/lib/seasonal-transition-engine';

export type SeasonalFxProfile = {
  season: SeasonKey;
  title: string;
  identity: string;
  particles: string[];
  physics: string[];
  ambience: string[];
  worldBehavior: Record<HarmonicWorldId, string[]>;
  patch: Partial<HarmonicEngineState>;
};

export type HolidayEventProfile = {
  id: string;
  title: string;
  timing: string;
  layer: 'holiday' | 'culture' | 'creator';
  respectfulNote?: string;
  visualFx: string[];
  worldBehavior: Record<HarmonicWorldId, string[]>;
  patch: Partial<HarmonicEngineState>;
};

export const seasonalFxProfiles: Record<SeasonKey, SeasonalFxProfile> = {
  spring: {
    season: 'spring',
    title: 'Spring Rebirth',
    identity: 'Healing, growth, soft rain, petals, birds, butterflies, and new beginnings.',
    particles: ['falling petals', 'pollen shimmer', 'butterflies', 'soft rain', 'fresh light motes'],
    physics: ['petals drift with wind', 'flowers bloom over time', 'puddles fade after rain', 'grass brightens gradually'],
    ambience: ['birds', 'soft rain', 'light wind', 'morning water'],
    worldBehavior: {
      melodic: ['new song chapters', 'healing visuals', 'brighter memory nodes'],
      harmonic: ['lighter fabrics', 'fresh palettes', 'launch-season styling'],
      'fried-em': ['park courts return', 'training arcs start', 'outdoor movement increases'],
      schmackin: ['brunch energy', 'fresh fruit', 'garden restaurants', 'smoothie routes'],
    },
    patch: { emotion: 'healing', lighting: 'golden-hour', fog: 24, bloom: 72, particleDensity: 72, motionIntensity: 42 },
  },
  summer: {
    season: 'summer',
    title: 'Summer Energy',
    identity: 'Heat, festivals, food trucks, outdoor courts, night glow, and public energy.',
    particles: ['heat shimmer', 'fireflies', 'sun sparks', 'festival confetti', 'storm flashes'],
    physics: ['heat distortion', 'pool ripples', 'long sunsets', 'nightlife glow', 'fast crowd motion'],
    ambience: ['cicadas', 'food trucks', 'outdoor basketball', 'waves', 'summer crowd'],
    worldBehavior: {
      melodic: ['release-ready energy', 'night-drive music', 'festival visualizers'],
      harmonic: ['tee drops', 'pop-up booths', 'bright campaigns'],
      'fried-em': ['outdoor runs', 'open gym rivalries', 'park tournaments'],
      schmackin: ['street food', 'food trucks', 'group reviews', 'late-night lines'],
    },
    patch: { emotion: 'freedom', lighting: 'spotlight', fog: 18, bloom: 82, particleDensity: 78, motionIntensity: 74 },
  },
  fall: {
    season: 'fall',
    title: 'Fall Masterpiece',
    identity: 'Nostalgia, hoodies, rain, leaves, comfort food, cinematic sunsets, and reflective warmth.',
    particles: ['falling leaves', 'wet leaves', 'gold dust', 'cold rain', 'fog curls'],
    physics: ['leaves pile up', 'leaves stick after rain', 'leaves crunch under footsteps', 'wind swirls leaves around movement'],
    ambience: ['rain on windows', 'soft wind', 'distant traffic', 'warm keys', 'leaf crunch'],
    worldBehavior: {
      melodic: ['nostalgic songs', 'late-night memories', 'warm crystal glow'],
      harmonic: ['hoodies forward', 'heavier fabrics', 'earth tones', 'lookbook energy'],
      'fried-em': ['sunset courts', 'cool gym air', 'pressure runs'],
      schmackin: ['comfort food', 'coffee', 'soup', 'warm booths', 'purple rain'],
    },
    patch: { emotion: 'reflection', lighting: 'golden-hour', fog: 62, bloom: 86, particleDensity: 88, motionIntensity: 38 },
  },
  winter: {
    season: 'winter',
    title: 'Winter Silence',
    identity: 'Snow, luxury, quiet, frost, fireplaces, crystal nights, and warm interiors.',
    particles: ['falling snow', 'ice crystals', 'breath vapor', 'frost shimmer', 'fireplace sparks'],
    physics: ['snow accumulates', 'footprints appear', 'icicles grow', 'frozen reflections', 'snow drifts across surfaces'],
    ambience: ['quiet wind', 'fireplace', 'snow crunch', 'muffled city', 'window taps'],
    worldBehavior: {
      melodic: ['intimate vault', 'quiet piano', 'crystal clarity'],
      harmonic: ['layered garments', 'premium winter textures', 'icy highlights'],
      'fried-em': ['enclosed arena energy', 'sharper lights', 'indoor pressure'],
      schmackin: ['hot meals', 'coffee steam', 'soup routes', 'warm restaurant contrast'],
    },
    patch: { emotion: 'peace', lighting: 'moonlight', fog: 70, bloom: 64, particleDensity: 70, motionIntensity: 22 },
  },
};

export const holidayEventProfiles: HolidayEventProfile[] = [
  {
    id: 'black-history-month',
    title: 'Black History Month',
    timing: 'February',
    layer: 'culture',
    respectfulNote: 'Culture-first celebration focused on education, storytelling, creators, history, and community spotlighting.',
    visualFx: ['gold/red/green accent light', 'story archive cards', 'creator spotlight banners', 'timeline portals'],
    worldBehavior: {
      melodic: ['Black music history features', 'storytelling timelines', 'influence playlists'],
      harmonic: ['Black designers spotlight', 'historic fashion references', 'community showcases'],
      'fried-em': ['basketball pioneer stories', 'iconic court moments', 'community tournament energy'],
      schmackin: ['Black-owned restaurant spotlight', 'regional food history', 'creator food tours'],
    },
    patch: { emotion: 'reflection', lighting: 'spotlight', bloom: 78, aura: 86, particleDensity: 56 },
  },
  {
    id: 'juneteenth',
    title: 'Juneteenth',
    timing: 'June 19',
    layer: 'culture',
    respectfulNote: 'Freedom-centered celebration that highlights community, creativity, education, and Black-owned creator ecosystems.',
    visualFx: ['red/black/green accents', 'freedom banners', 'community stage lights', 'warm celebration particles'],
    worldBehavior: {
      melodic: ['freedom playlists', 'community performance stage', 'story-led releases'],
      harmonic: ['limited cultural collections', 'creator showcases', 'heritage-inspired palette prompts'],
      'fried-em': ['community runs', 'outdoor tournament energy', 'respect-centered highlights'],
      schmackin: ['cookout energy', 'Black-owned food routes', 'community table events'],
    },
    patch: { emotion: 'freedom', lighting: 'golden-hour', bloom: 86, aura: 92, particleDensity: 76, motionIntensity: 58 },
  },
  {
    id: 'halloween',
    title: 'Halloween Week',
    timing: 'Late October',
    layer: 'holiday',
    visualFx: ['pumpkins', 'purple fog', 'bats', 'candy hunt glows', 'haunted neon'],
    worldBehavior: {
      melodic: ['dark visualizers', 'spooky sample packs', 'minor-key memory rooms'],
      harmonic: ['costume capsules', 'orange/purple styling', 'night lookbook'],
      'fried-em': ['haunted court cosmetics', 'night run challenges', 'glowing scoreboard'],
      schmackin: ['candy specials', 'spooky menus', 'foggy restaurant nights'],
    },
    patch: { emotion: 'chaos', lighting: 'purple-neon', fog: 88, bloom: 82, particleDensity: 84, grain: 34 },
  },
  {
    id: 'thanksgiving',
    title: 'Thanksgiving / Harvest Week',
    timing: 'Late November',
    layer: 'holiday',
    visualFx: ['harvest leaves', 'warm tables', 'gold light', 'family ambience'],
    worldBehavior: {
      melodic: ['gratitude playlists', 'family memory rooms', 'reflective releases'],
      harmonic: ['cozy fits', 'fall capsule push', 'warm textile focus'],
      'fried-em': ['family tournament modes', 'friendly rivalries', 'community runs'],
      schmackin: ['soul food routes', 'family table reviews', 'comfort food emphasis'],
    },
    patch: { emotion: 'reflection', lighting: 'restaurant-warmth', fog: 52, bloom: 78, aura: 72 },
  },
  {
    id: 'christmas',
    title: 'Christmas / Gift Season',
    timing: 'December',
    layer: 'holiday',
    visualFx: ['snow lights', 'trees', 'gift glows', 'window frost', 'warm interiors'],
    worldBehavior: {
      melodic: ['gift playlists', 'winter acoustic moods', 'memory recap rooms'],
      harmonic: ['holiday showroom', 'gift bundles', 'premium winter looks'],
      'fried-em': ['holiday classic games', 'indoor tournament lights', 'gift challenge modes'],
      schmackin: ['hot chocolate routes', 'holiday menus', 'warm booth glow'],
    },
    patch: { emotion: 'peace', lighting: 'moonlight', fog: 72, bloom: 76, particleDensity: 78, crystalHeartIntensity: 88 },
  },
  {
    id: 'new-years',
    title: 'New Year Frequency Reset',
    timing: 'December 31 / January 1',
    layer: 'holiday',
    visualFx: ['fireworks', 'countdown glow', 'annual recap cards', 'frequency reset rings'],
    worldBehavior: {
      melodic: ['year recap playlists', 'new release intentions', 'memory rewind'],
      harmonic: ['new campaign board', 'drop roadmap highlights', 'fresh palette reset'],
      'fried-em': ['best highlights recap', 'new rival board', 'season reset'],
      schmackin: ['best plates recap', 'new restaurant map', 'community awards'],
    },
    patch: { emotion: 'hope', lighting: 'spotlight', bloom: 92, aura: 92, particleDensity: 94, motionIntensity: 70 },
  },
  {
    id: 'valentines',
    title: 'Valentine Frequency',
    timing: 'February 14',
    layer: 'holiday',
    visualFx: ['rose petals', 'soft heart glows', 'romantic haze', 'pink/purple bloom'],
    worldBehavior: {
      melodic: ['R&B rooms', 'love playlists', 'duet prompts'],
      harmonic: ['date-night fits', 'pink/red capsule direction', 'soft fabrics'],
      'fried-em': ['duo challenges', 'couples court theme', 'friendly wager energy'],
      schmackin: ['date-night restaurants', 'dessert routes', 'romantic booths'],
    },
    patch: { emotion: 'luxury', lighting: 'candlelight', fog: 42, bloom: 86, aura: 84, particleDensity: 60 },
  },
];
