'use client';

import { useMemo, useState, type DragEvent } from 'react';
import { useWorldCustomization, type WorldKey } from '@/components/studio/WorldCustomizationProvider';
import { createDefaultWorldStructure, getWorldComponents } from '@/lib/world-component-registry';

type Item = { id: string; visible: boolean; order: number };

function parseStructure(raw: string | undefined, world: WorldKey): Item[] {
  const defaults = createDefaultWorldStructure(world);
  if (!raw) return defaults;
  try {
    const parsed = JSON.parse(raw) as Item[];
    const allowed = new Set(defaults.map((item) => item.id));
    const current = parsed.filter((item) => allowed.has(item.id));
    return [...current, ...defaults.filter((item) => !current.some((entry) => entry.id === item.id))]
      .map((item, order) => ({ ...item, order }));
  } catch {
    return defaults;
  }
}

export function WorldStructureStudio() {
  const { settings, updateLabel } = useWorldCustomization();
  const [world, setWorld] = useState<WorldKey>('two-harmonic');
  const [dragging, setDragging] = useState<string | null>(null);
  const definitions = useMemo(() => getWorldComponents(world), [world]);
  const structure = useMemo(() => parseStructure(settings[world].labels.sectionStructure, world), [settings, world]);

  const write = (next: Item[]) => updateLabel(world, 'sectionStructure', JSON.stringify(next.map((item, order) => ({ ...item, order }))));
  const move = (sourceId: string, targetId: string) => {
    const next = [...structure];
    const sourceIndex = next.findIndex((item) => item.id === sourceId);
    const targetIndex = next.findIndex((item) => item.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return;
    const [source] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, source);
    write(next);
  };
  const handleDrop = (event: DragEvent<HTMLDivElement>, targetId: string) => {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData('text/plain') || dragging;
    if (sourceId) move(sourceId, targetId);
    setDragging(null);
  };

  return (
    <section className="mx-auto mt-6 max-w-7xl rounded-[2.4rem] border border-white/10 bg-black/45 p-5 text-white backdrop-blur-2xl sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.3em] text-white/35">Phase 6A · Structure Engine</p>
          <h2 className="mt-2 text-4xl font-black tracking-[-.06em]">Drag the world into order.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/45">Reorder reusable sections and control visibility inside the existing draft and publish settings.</p>
        </div>
        <button onClick={() => write(createDefaultWorldStructure(world))} className="rounded-full border border-white/10 px-4 py-3 text-xs font-black">Reset Structure</button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(['home', 'melodic', 'fried-em', 'schmackinn', 'two-harmonic'] as WorldKey[]).map((key) => (
          <button key={key} onClick={() => setWorld(key)} className={`rounded-full px-4 py-3 text-xs font-black ${world === key ? 'bg-white text-black' : 'border border-white/10 text-white/55'}`}>{key}</button>
        ))}
      </div>

      <div className="mt-6 grid gap-3">
        {structure.map((item, index) => {
          const definition = definitions.find((entry) => entry.id === item.id);
          if (!definition) return null;
          return (
            <div key={item.id} draggable onDragStart={(event) => { setDragging(item.id); event.dataTransfer.setData('text/plain', item.id); }} onDragOver={(event) => event.preventDefault()} onDrop={(event) => handleDrop(event, item.id)} onDragEnd={() => setDragging(null)} className={`grid cursor-grab grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border p-4 ${dragging === item.id ? 'border-purple-200/40 bg-purple-200/10 opacity-60' : 'border-white/10 bg-white/[.025]'}`}>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10">{definition.icon}</div>
              <div><p className="text-xs font-black text-white/30">{String(index + 1).padStart(2, '0')}</p><h3 className="font-black">{definition.name}</h3><p className="mt-1 text-xs text-white/40">{definition.description}</p></div>
              <button onClick={() => write(structure.map((entry) => entry.id === item.id ? { ...entry, visible: !entry.visible } : entry))} className={`rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-[.15em] ${item.visible ? 'bg-emerald-200 text-black' : 'bg-white/10 text-white/40'}`}>{item.visible ? 'Visible' : 'Hidden'}</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
