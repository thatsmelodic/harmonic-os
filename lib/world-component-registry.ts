import type { WorldKey } from '@/components/studio/WorldCustomizationProvider';

export type WorldComponentType = 'hero' | 'collection-grid' | 'media-stage' | 'community' | 'archive' | 'commerce' | 'audio' | 'custom';

export type WorldComponentDefinition = {
  id: string;
  type: WorldComponentType;
  name: string;
  description: string;
  icon: string;
  defaultVisible: boolean;
  allowedWorlds: WorldKey[] | 'all';
};

export const worldComponentRegistry: WorldComponentDefinition[] = [
  { id: 'hero', type: 'hero', name: 'Hero', description: 'Primary world entrance with title, description, and calls to action.', icon: '✦', defaultVisible: true, allowedWorlds: 'all' },
  { id: 'featured', type: 'media-stage', name: 'Featured Experience', description: 'Large visual, campaign, episode, song, or collection spotlight.', icon: '◉', defaultVisible: true, allowedWorlds: 'all' },
  { id: 'collections', type: 'collection-grid', name: 'Collections / Episodes', description: 'Reusable grid for drops, episodes, restaurants, releases, or projects.', icon: '▦', defaultVisible: true, allowedWorlds: 'all' },
  { id: 'community', type: 'community', name: 'Community', description: 'Stories, submissions, reactions, challenges, and audience participation.', icon: '◎', defaultVisible: true, allowedWorlds: 'all' },
  { id: 'archive', type: 'archive', name: 'Archive', description: 'Past eras, memories, campaigns, episodes, releases, or unreleased concepts.', icon: '▤', defaultVisible: true, allowedWorlds: 'all' },
  { id: 'commerce', type: 'commerce', name: 'Commerce', description: 'Products, reservations, pricing, inventory, and checkout entry points.', icon: '◇', defaultVisible: false, allowedWorlds: ['two-harmonic', 'schmackinn', 'fried-em', 'melodic'] },
  { id: 'audio', type: 'audio', name: 'Audio Layer', description: 'World soundtrack, song preview, ambient audio, or episode sound.', icon: '♫', defaultVisible: false, allowedWorlds: ['two-harmonic', 'melodic', 'fried-em', 'schmackinn'] },
];

export function getWorldComponents(world: WorldKey) {
  return worldComponentRegistry.filter((component) => component.allowedWorlds === 'all' || component.allowedWorlds.includes(world));
}

export function createDefaultWorldStructure(world: WorldKey) {
  return getWorldComponents(world).map((component, index) => ({
    id: component.id,
    visible: component.defaultVisible,
    order: index,
  }));
}
