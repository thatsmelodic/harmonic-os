'use client';

import { useMemo, type CSSProperties, type ReactNode } from 'react';
import { useWorldCustomization, type WorldKey } from '@/components/studio/WorldCustomizationProvider';
import { parseStudioSections, readElementStyle } from '@/lib/creator-studio-model';

type RuntimeSection = { id: string; node: ReactNode };

const motionClass = {
  none: '',
  fade: 'animate-[fadeIn_.45s_ease-out_both]',
  'slide-up': 'animate-[fadeIn_.55s_ease-out_both]',
  float: 'animate-[float_6s_ease-in-out_infinite]',
  pulse: 'animate-pulse',
  spin: 'animate-[spin_18s_linear_infinite]',
  parallax: 'transition-transform duration-500 hover:-translate-y-1',
} as const;

export function WorldStructuredRuntime({ world, sections }: { world: WorldKey; sections: RuntimeSection[] }) {
  const { settings } = useWorldCustomization();
  const active = settings[world];
  const structure = useMemo(
    () => parseStudioSections(active?.labels.sectionStructure, world),
    [active?.labels.sectionStructure, world],
  );
  const sectionMap = useMemo(() => new Map(sections.map((section) => [section.id, section.node])), [sections]);

  return (
    <>
      {structure
        .filter((item) => item.visible && sectionMap.has(item.id))
        .sort((left, right) => left.order - right.order)
        .map((item) => {
          const style = readElementStyle(active?.labels ?? {}, item.id);
          const wrapperStyle = {
            width: `${style.width}%`,
            minHeight: style.minHeight,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: style.padding,
            borderRadius: style.radius,
            opacity: style.opacity / 100,
            filter: `blur(${style.blur}px)`,
            boxShadow: style.glow > 0 ? `0 0 ${style.glow}px ${active?.glow ?? '#a855f7'}22` : undefined,
          } as CSSProperties;
          return (
            <div
              key={item.id}
              data-world-section={item.id}
              data-studio-kind={item.kind}
              className={motionClass[style.motion]}
              style={wrapperStyle}
            >
              {sectionMap.get(item.id)}
            </div>
          );
        })}
    </>
  );
}
