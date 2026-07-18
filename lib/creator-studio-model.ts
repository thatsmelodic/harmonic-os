import type { WorldKey } from '@/components/studio/WorldCustomizationProvider';

export type StudioElementKind = 'page' | 'section' | 'text' | 'button' | 'media' | 'collection';
export type StudioMotion = 'none' | 'fade' | 'slide-up' | 'float' | 'pulse' | 'spin' | 'parallax';

export type StudioSection = {
  id: string;
  label: string;
  kind: StudioElementKind;
  visible: boolean;
  locked: boolean;
  order: number;
};

export type StudioElementStyle = {
  x: number;
  y: number;
  width: number;
  minHeight: number;
  padding: number;
  radius: number;
  opacity: number;
  blur: number;
  glow: number;
  motion: StudioMotion;
};

const worldSections: Record<WorldKey, Array<[string, string, StudioElementKind]>> = {
  global: [
    ['navigation', 'Global Navigation', 'section'],
    ['footer', 'Global Footer', 'section'],
  ],
  home: [
    ['hero', 'Homepage Hero', 'section'],
    ['overview', 'Overview', 'section'],
    ['source', 'Melodic Source', 'section'],
    ['worlds', 'World Frequencies', 'collection'],
    ['community', 'Harmonic Community', 'section'],
    ['footer', 'Homepage Footer', 'section'],
  ],
  melodic: [
    ['hero', 'Hero', 'section'],
    ['featured', 'Featured Release', 'section'],
    ['collections', 'Music Collections', 'collection'],
    ['community', 'Listener Community', 'section'],
    ['archive', 'Memory Archive', 'collection'],
    ['audio', 'Audio Layer', 'media'],
  ],
  'fried-em': [
    ['hero', 'Hero', 'section'],
    ['featured', 'Featured Game', 'section'],
    ['collections', 'Episodes and Highlights', 'collection'],
    ['community', 'Hoops Community', 'section'],
    ['archive', 'Season Archive', 'collection'],
  ],
  schmackinn: [
    ['hero', 'Got The Munchies Hero', 'section'],
    ['featured', 'Featured Review', 'section'],
    ['collections', 'Tier Archive', 'collection'],
    ['community', 'Map and Community', 'section'],
    ['archive', 'Food Memory Archive', 'collection'],
    ['commerce', 'Flavor Pass', 'section'],
    ['audio', 'Schmackinn Frequency', 'media'],
  ],
  'two-harmonic': [
    ['hero', 'Fashion Hero', 'section'],
    ['featured', 'Featured Drop', 'section'],
    ['collections', 'Collections', 'collection'],
    ['community', 'Harmonic Souls', 'section'],
    ['archive', 'Stitch Archive', 'collection'],
    ['commerce', 'Storefront', 'section'],
  ],
};

export const defaultElementStyle: StudioElementStyle = {
  x: 50,
  y: 50,
  width: 100,
  minHeight: 120,
  padding: 24,
  radius: 20,
  opacity: 100,
  blur: 0,
  glow: 30,
  motion: 'fade',
};

export function createStudioSections(world: WorldKey): StudioSection[] {
  return worldSections[world].map(([id, label, kind], order) => ({ id, label, kind, visible: true, locked: false, order }));
}

export function parseStudioSections(raw: string | undefined, world: WorldKey): StudioSection[] {
  const defaults = createStudioSections(world);
  if (!raw) return defaults;
  try {
    const parsed = JSON.parse(raw) as Array<Partial<StudioSection> & Pick<StudioSection, 'id'>>;
    const defaultsById = new Map(defaults.map((section) => [section.id, section]));
    const valid = parsed
      .filter((section) => defaultsById.has(section.id))
      .map((section) => ({ ...defaultsById.get(section.id)!, ...section, locked: Boolean(section.locked) }));
    const missing = defaults.filter((section) => !valid.some((item) => item.id === section.id));
    return [...valid, ...missing]
      .sort((a, b) => a.order - b.order)
      .map((section, order) => ({ ...section, order }));
  } catch {
    return defaults;
  }
}

export function readElementStyle(labels: Record<string, string>, elementId: string): StudioElementStyle {
  const raw = labels[`studio.style.${elementId}`];
  if (!raw) return defaultElementStyle;
  try {
    return { ...defaultElementStyle, ...(JSON.parse(raw) as Partial<StudioElementStyle>) };
  } catch {
    return defaultElementStyle;
  }
}

export function writeElementStyle(style: StudioElementStyle): string {
  return JSON.stringify(style);
}

export function moveStudioSection(sections: StudioSection[], id: string, direction: -1 | 1): StudioSection[] {
  const ordered = [...sections].sort((a, b) => a.order - b.order);
  const index = ordered.findIndex((section) => section.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= ordered.length) return ordered;
  [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
  return ordered.map((section, order) => ({ ...section, order }));
}

export function reorderStudioSection(sections: StudioSection[], draggedId: string, targetId: string): StudioSection[] {
  if (draggedId === targetId) return [...sections].sort((a, b) => a.order - b.order);
  const ordered = [...sections].sort((a, b) => a.order - b.order);
  const from = ordered.findIndex((section) => section.id === draggedId);
  const to = ordered.findIndex((section) => section.id === targetId);
  if (from < 0 || to < 0) return ordered;
  const [moved] = ordered.splice(from, 1);
  ordered.splice(to, 0, moved);
  return ordered.map((section, order) => ({ ...section, order }));
}
