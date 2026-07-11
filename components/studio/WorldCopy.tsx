'use client';

import { useWorldCustomization, type WorldKey } from '@/components/studio/WorldCustomizationProvider';

export function WorldCopy({ world, field, fallback }: { world: WorldKey; field: 'title' | 'subtitle' | string; fallback: string }) {
  const { settings } = useWorldCustomization();
  const active = settings[world];
  const value = field === 'title' ? active.title : field === 'subtitle' ? active.subtitle : active.labels[field];
  return <>{value?.trim() || fallback}</>;
}
