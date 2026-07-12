'use client';

import { useMemo, type ReactNode } from 'react';
import { useWorldCustomization, type WorldKey } from '@/components/studio/WorldCustomizationProvider';
import { createDefaultWorldStructure } from '@/lib/world-component-registry';

type RuntimeSection = { id: string; node: ReactNode };
type StructureItem = { id: string; visible: boolean; order: number };

function parseStructure(raw: string | undefined, world: WorldKey): StructureItem[] {
  const defaults = createDefaultWorldStructure(world);
  if (!raw) return defaults;
  try {
    const parsed = JSON.parse(raw) as StructureItem[];
    const allowed = new Set(defaults.map((item) => item.id));
    const current = parsed.filter((item) => allowed.has(item.id));
    return [...current, ...defaults.filter((item) => !current.some((entry) => entry.id === item.id))]
      .map((item, order) => ({ ...item, order }));
  } catch {
    return defaults;
  }
}

export function WorldStructuredRuntime({ world, sections }: { world: WorldKey; sections: RuntimeSection[] }) {
  const { settings } = useWorldCustomization();
  const structure = useMemo(
    () => parseStructure(settings[world]?.labels.sectionStructure, world),
    [settings, world],
  );
  const sectionMap = useMemo(() => new Map(sections.map((section) => [section.id, section.node])), [sections]);

  return (
    <>
      {structure
        .filter((item) => item.visible && sectionMap.has(item.id))
        .sort((left, right) => left.order - right.order)
        .map((item) => (
          <div key={item.id} data-world-section={item.id} className="animate-[fadeIn_.45s_ease-out_both]">
            {sectionMap.get(item.id)}
          </div>
        ))}
    </>
  );
}
