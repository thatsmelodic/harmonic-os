import { frequencies } from './frequency-engine';
import { kernel, moduleRegistry } from './harmonic-kernel';

export type HarmonicAIAction = {
  label: string;
  href: string;
  reason: string;
};

export type HarmonicAIResponse = {
  intent: string;
  answer: string;
  actions: HarmonicAIAction[];
};

const systemOverview = `${kernel.productName} is ${kernel.version}: one creator operating system connecting music, fashion, basketball, food, community, commerce, lore, and creator tools.`;

const worldKeywords: Record<string, string[]> = {
  melodic: ['music', 'song', 'songs', 'beat', 'beats', 'sound', 'listen', 'melodic'],
  '2-harmonic': ['clothing', 'clothes', 'fashion', 'shop', 'drop', 'drops', 'hoodie', 'shirt', '2 harmonic'],
  'fried-em': ['basketball', 'hoop', 'court', 'challenge', 'fried', 'fried em', 'competition'],
  schmackinn: ['food', 'eat', 'review', 'restaurant', 'taste', 'schmackinn', 'schmack'],
};

const directActions: Record<string, HarmonicAIAction> = {
  home: { label: 'Open OS Home', href: '/', reason: 'Start at the public Harmonic OS landing experience.' },
  hub: { label: 'Open Creator Hub', href: '/hub', reason: 'Use the command center for OS modules, modes, and roadmap layers.' },
  studio: { label: 'Open Creator Studio', href: '/studio', reason: 'Manage copy, assets, worlds, and Supabase-backed creator controls.' },
  profile: { label: 'Open Profile Layer', href: '/profile', reason: 'See profile permissions for reviews, comments, Q and A, favorites, and saved worlds.' },
  shop: { label: 'Open Shop Portal', href: '/shop', reason: 'Explore 2 Harmonic drops, product stories, and commerce previews.' },
  beats: { label: 'Open Beat Vault', href: '/beats', reason: 'Explore Melodic beats, sound direction, and music previews.' },
  schmack: { label: 'Open Schmackinn+', href: '/community/schmackinn', reason: 'Explore food reviews, recommendations, Q and A, and community scoring.' },
  investor: { label: 'Open Investor Mode', href: '/investors', reason: 'View the business-facing pitch layer for partners and sponsors.' },
  bible: { label: 'Open Harmonic Bible', href: '/#bible', reason: 'Read the lore layer for the Cup, Heart, purple frequency, and Four Worlds.' },
};

function normalize(input: string) {
  return input.trim().toLowerCase();
}

function uniqueActions(actions: HarmonicAIAction[]) {
  const seen = new Set<string>();
  return actions.filter((action) => {
    if (seen.has(action.href)) return false;
    seen.add(action.href);
    return true;
  });
}

function getWorldActions(query: string) {
  return frequencies
    .filter((world) => worldKeywords[world.slug]?.some((keyword) => query.includes(keyword)))
    .map((world) => ({
      label: `Enter ${world.name}`,
      href: world.route,
      reason: `${world.name} matches this request: ${world.tagline}`,
    }));
}

function getDirectActions(query: string) {
  const actions: HarmonicAIAction[] = [];

  if (query.includes('home') || query.includes('start')) actions.push(directActions.home);
  if (query.includes('hub') || query.includes('command') || query.includes('control')) actions.push(directActions.hub);
  if (query.includes('studio') || query.includes('cms') || query.includes('edit') || query.includes('upload')) actions.push(directActions.studio);
  if (query.includes('profile') || query.includes('login') || query.includes('account')) actions.push(directActions.profile);
  if (query.includes('shop') || query.includes('product') || query.includes('merch')) actions.push(directActions.shop);
  if (query.includes('beat') || query.includes('music') || query.includes('listen')) actions.push(directActions.beats);
  if (query.includes('food') || query.includes('review') || query.includes('restaurant')) actions.push(directActions.schmack);
  if (query.includes('investor') || query.includes('sponsor') || query.includes('business') || query.includes('partner')) actions.push(directActions.investor);
  if (query.includes('bible') || query.includes('lore') || query.includes('cup') || query.includes('heart') || query.includes('meaning')) actions.push(directActions.bible);

  return actions;
}

function getModuleSummary() {
  return Object.values(moduleRegistry)
    .map((module) => `${module.label}: ${module.purpose}`)
    .join(' ');
}

export function askHarmonicAI(input: string): HarmonicAIResponse {
  const query = normalize(input);

  if (!query) {
    return {
      intent: 'empty',
      answer: 'Ask me where to go in Harmonic OS. I can guide you through worlds, music, clothing, basketball, food, lore, profiles, studio tools, and investor mode.',
      actions: [directActions.home, directActions.hub, directActions.bible],
    };
  }

  const worldActions = getWorldActions(query);
  const directMatches = getDirectActions(query);
  const actions = uniqueActions([...worldActions, ...directMatches]);

  if (query.includes('what is') || query.includes('explain') || query.includes('help') || query.includes('about')) {
    return {
      intent: 'explain-os',
      answer: `${systemOverview} The Four Worlds are ${frequencies.map((world) => world.name).join(', ')}. The assistant can route visitors to the right world or module without replacing the OS experience.`,
      actions: actions.length ? actions : [directActions.bible, directActions.hub],
    };
  }

  if (query.includes('module') || query.includes('feature') || query.includes('tools')) {
    return {
      intent: 'explain-modules',
      answer: `Harmonic OS uses reusable modules instead of duplicate pages. ${getModuleSummary()}`,
      actions: actions.length ? actions : [directActions.hub, directActions.studio],
    };
  }

  if (actions.length > 0) {
    return {
      intent: 'route-user',
      answer: 'I found the best Harmonic OS path for that request. Start with the first portal, then use the related actions if you want to go deeper.',
      actions,
    };
  }

  return {
    intent: 'general-guide',
    answer: `${systemOverview} Try asking for music, clothing, basketball, food, lore, creator tools, profile features, or investor mode and I will route you through the OS.`,
    actions: [directActions.home, directActions.hub, directActions.bible],
  };
}

export const harmonicAIPrompts = [
  'Where should I go for music?',
  'Show me clothing drops',
  'Explain the Cup and Heart',
  'I want food reviews',
  'Open creator tools',
];
