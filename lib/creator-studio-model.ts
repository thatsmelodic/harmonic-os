import type { WorldKey } from '@/components/studio/WorldCustomizationProvider';

export type StudioElementKind = 'page' | 'section' | 'text' | 'button' | 'media' | 'collection';
export type StudioMotion = 'none' | 'fade' | 'slide-up' | 'float' | 'pulse' | 'spin' | 'parallax';
export type StudioPosition = 'absolute' | 'relative' | 'fixed' | 'sticky';
export type StudioLayout = 'free' | 'flex' | 'grid';
export type StudioUnit = 'px' | '%' | 'vw' | 'vh' | 'rem';
export type StudioAlign = 'start' | 'center' | 'end' | 'stretch';
export type StudioJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type StudioTextAlign = 'left' | 'center' | 'right' | 'justify';
export type StudioOverflow = 'visible' | 'hidden' | 'auto' | 'scroll';

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
  zIndex: number;
  position: StudioPosition;
  width: number;
  widthUnit: StudioUnit;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  padding: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  layout: StudioLayout;
  direction: 'row' | 'column';
  wrap: boolean;
  align: StudioAlign;
  justify: StudioJustify;
  gap: number;
  columns: number;
  overflow: StudioOverflow;
  backgroundType: 'solid' | 'gradient' | 'transparent';
  backgroundColor: string;
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  borderWidth: number;
  borderColor: string;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
  radius: number;
  opacity: number;
  blur: number;
  glow: number;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowColor: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  textAlign: StudioTextAlign;
  textColor: string;
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  motion: StudioMotion;
};

const worldSections: Record<WorldKey, Array<[string, string, StudioElementKind]>> = {
  global: [['navigation', 'Global Navigation', 'section'], ['footer', 'Global Footer', 'section']],
  home: [['hero', 'Homepage Hero', 'section'], ['overview', 'Overview', 'section'], ['source', 'Melodic Source', 'section'], ['worlds', 'World Frequencies', 'collection'], ['community', 'Harmonic Community', 'section'], ['footer', 'Homepage Footer', 'section']],
  melodic: [['hero', 'Hero', 'section'], ['featured', 'Featured Release', 'section'], ['collections', 'Music Collections', 'collection'], ['community', 'Listener Community', 'section'], ['archive', 'Memory Archive', 'collection'], ['audio', 'Audio Layer', 'media']],
  'fried-em': [['hero', 'Hero', 'section'], ['featured', 'Featured Game', 'section'], ['collections', 'Episodes and Highlights', 'collection'], ['community', 'Hoops Community', 'section'], ['archive', 'Season Archive', 'collection']],
  schmackinn: [['hero', 'Got The Munchies Hero', 'section'], ['featured', 'Featured Review', 'section'], ['collections', 'Tier Archive', 'collection'], ['community', 'Map and Community', 'section'], ['archive', 'Food Memory Archive', 'collection'], ['commerce', 'Flavor Pass', 'section'], ['audio', 'Schmackinn Frequency', 'media']],
  'two-harmonic': [['hero', 'Fashion Hero', 'section'], ['featured', 'Featured Drop', 'section'], ['collections', 'Collections', 'collection'], ['community', 'Harmonic Souls', 'section'], ['archive', 'Stitch Archive', 'collection'], ['commerce', 'Storefront', 'section']],
};

export const defaultElementStyle: StudioElementStyle = {
  x: 50,
  y: 50,
  zIndex: 1,
  position: 'absolute',
  width: 100,
  widthUnit: '%',
  minWidth: 0,
  maxWidth: 1400,
  minHeight: 120,
  maxHeight: 1200,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  padding: 24,
  paddingTop: 24,
  paddingRight: 24,
  paddingBottom: 24,
  paddingLeft: 24,
  layout: 'free',
  direction: 'column',
  wrap: false,
  align: 'start',
  justify: 'start',
  gap: 16,
  columns: 3,
  overflow: 'visible',
  backgroundType: 'solid',
  backgroundColor: '#ffffff08',
  gradientFrom: '#a855f733',
  gradientTo: '#22d3ee22',
  gradientAngle: 135,
  borderWidth: 1,
  borderColor: '#ffffff1a',
  borderStyle: 'solid',
  radius: 20,
  opacity: 100,
  blur: 0,
  glow: 30,
  shadowX: 0,
  shadowY: 12,
  shadowBlur: 32,
  shadowSpread: 0,
  shadowColor: '#00000066',
  fontFamily: 'inherit',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: 0,
  textAlign: 'left',
  textColor: '#ffffff',
  textTransform: 'none',
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
    const valid = parsed.filter((section) => defaultsById.has(section.id)).map((section) => ({ ...defaultsById.get(section.id)!, ...section, locked: Boolean(section.locked) }));
    const missing = defaults.filter((section) => !valid.some((item) => item.id === section.id));
    return [...valid, ...missing].sort((a, b) => a.order - b.order).map((section, order) => ({ ...section, order }));
  } catch {
    return defaults;
  }
}

export function readElementStyle(labels: Record<string, string>, elementId: string): StudioElementStyle {
  const raw = labels[`studio.style.${elementId}`];
  if (!raw) return defaultElementStyle;
  try {
    const parsed = JSON.parse(raw) as Partial<StudioElementStyle>;
    const legacyPadding = typeof parsed.padding === 'number' ? parsed.padding : undefined;
    const paddingTop = parsed.paddingTop ?? legacyPadding ?? defaultElementStyle.paddingTop;
    return {
      ...defaultElementStyle,
      ...parsed,
      padding: legacyPadding ?? paddingTop,
      paddingTop,
      paddingRight: parsed.paddingRight ?? legacyPadding ?? defaultElementStyle.paddingRight,
      paddingBottom: parsed.paddingBottom ?? legacyPadding ?? defaultElementStyle.paddingBottom,
      paddingLeft: parsed.paddingLeft ?? legacyPadding ?? defaultElementStyle.paddingLeft,
    };
  } catch {
    return defaultElementStyle;
  }
}

export function writeElementStyle(style: StudioElementStyle): string {
  return JSON.stringify({ ...style, padding: style.paddingTop });
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
