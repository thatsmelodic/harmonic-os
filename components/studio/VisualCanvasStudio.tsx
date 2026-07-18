'use client';

import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { useWorldCustomization, type WorldKey, type WorldMediaAsset } from '@/components/studio/WorldCustomizationProvider';
import {
  createStudioSections,
  moveStudioSection,
  parseStudioSections,
  readElementStyle,
  reorderStudioSection,
  writeElementStyle,
  type StudioElementStyle,
  type StudioMotion,
  type StudioSection,
} from '@/lib/creator-studio-model';

const worlds: Array<{ key: WorldKey; label: string }> = [
  { key: 'home', label: 'Homepage' },
  { key: 'melodic', label: 'Melodic' },
  { key: 'two-harmonic', label: '2 Harmonic' },
  { key: 'fried-em', label: 'Fried Em' },
  { key: 'schmackinn', label: 'Schmackinn' },
  { key: 'global', label: 'Global System' },
];
const motions: StudioMotion[] = ['none', 'fade', 'slide-up', 'float', 'pulse', 'spin', 'parallax'];

type SectionDragState = {
  id: string;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  originWidth: number;
  originHeight: number;
  mode: 'move' | 'resize';
} | null;

export function VisualCanvasStudio() {
  const { settings, updateLabel, addMedia, updateMedia, removeMedia } = useWorldCustomization();
  const [world, setWorld] = useState<WorldKey>('home');
  const [selected, setSelected] = useState<string | null>('hero');
  const [sectionDrag, setSectionDrag] = useState<SectionDragState>(null);
  const [draggedLayer, setDraggedLayer] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const active = settings[world];
  const sections = useMemo(
    () => parseStudioSections(active.labels.sectionStructure, world),
    [active.labels.sectionStructure, world],
  );
  const orderedSections = useMemo(() => [...sections].sort((a, b) => a.order - b.order), [sections]);
  const selectedSection = selected && !selected.startsWith('media:') ? sections.find((section) => section.id === selected) : undefined;
  const selectedMedia = selected?.startsWith('media:') ? active.media.find((asset) => `media:${asset.id}` === selected) : undefined;
  const selectedStyle = selectedSection ? readElementStyle(active.labels, selectedSection.id) : undefined;

  function saveSections(next: StudioSection[]) {
    updateLabel(world, 'sectionStructure', JSON.stringify(next));
  }

  function patchSection(sectionId: string, patch: Partial<StudioSection>) {
    saveSections(sections.map((section) => (section.id === sectionId ? { ...section, ...patch } : section)));
  }

  function patchStyle(sectionId: string, patch: Partial<StudioElementStyle>) {
    const current = readElementStyle(active.labels, sectionId);
    updateLabel(world, `studio.style.${sectionId}`, writeElementStyle({ ...current, ...patch }));
  }

  function startSectionPointer(
    event: ReactPointerEvent<HTMLDivElement>,
    section: StudioSection,
    style: StudioElementStyle,
    mode: 'move' | 'resize',
  ) {
    event.stopPropagation();
    setSelected(section.id);
    if (section.locked) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setSectionDrag({
      id: section.id,
      startX: event.clientX,
      startY: event.clientY,
      originX: style.x,
      originY: style.y,
      originWidth: style.width,
      originHeight: style.minHeight,
      mode,
    });
  }

  function moveSectionPointer(event: ReactPointerEvent<HTMLDivElement>) {
    if (!sectionDrag) return;
    const canvas = event.currentTarget.closest('[data-studio-canvas]') as HTMLElement | null;
    const rect = canvas?.getBoundingClientRect();
    if (!rect) return;
    const dxPercent = ((event.clientX - sectionDrag.startX) / rect.width) * 100;
    const dyPercent = ((event.clientY - sectionDrag.startY) / rect.height) * 100;
    if (sectionDrag.mode === 'move') {
      patchStyle(sectionDrag.id, {
        x: clamp(sectionDrag.originX + dxPercent, 0, 100),
        y: clamp(sectionDrag.originY + dyPercent, 0, 100),
      });
      return;
    }
    patchStyle(sectionDrag.id, {
      width: clamp(sectionDrag.originWidth + dxPercent, 10, 100),
      minHeight: clamp(sectionDrag.originHeight + (event.clientY - sectionDrag.startY), 48, 900),
    });
  }

  function stopSectionPointer(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setSectionDrag(null);
  }

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    for (const file of Array.from(files)) {
      const url = URL.createObjectURL(file);
      addMedia(world, {
        name: file.name,
        url,
        kind: file.type.startsWith('video/') ? 'video' : 'image',
        placement: 'floating',
        x: 50,
        y: 50,
        width: 30,
        opacity: 100,
        rotation: 0,
        zIndex: 10,
        loop: true,
        muted: true,
        fit: 'contain',
        motion: 'none',
        duration: 6,
        delay: 0,
      });
    }
  }

  return (
    <main className="min-h-screen bg-[#050308] text-white">
      <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/85 px-5 py-4 backdrop-blur-2xl">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.28em] text-purple-300/60">Creator Studio · Editable Foundation</p>
          <h1 className="text-2xl font-black">Visual Canvas</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {worlds.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setWorld(item.key);
                setSelected(createStudioSections(item.key)[0]?.id || null);
              }}
              className={`rounded-full px-4 py-2 text-xs font-black ${world === item.key ? 'bg-purple-200 text-black' : 'border border-white/10'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-73px)] xl:grid-cols-[310px_1fr_360px]">
        <aside className="border-r border-white/10 bg-black/35 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[.24em] text-white/35">Layers</p>
            <span className="text-[10px] text-white/30">Drag to reorder</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[.025] p-2">
            <button onClick={() => setSelected(null)} className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left font-black">
              <span className="text-purple-200">▾</span>
              <span>{worlds.find((item) => item.key === world)?.label}</span>
              <span className="ml-auto text-[10px] uppercase text-white/30">Page</span>
            </button>

            <div className="ml-3 border-l border-white/10 pl-2">
              {orderedSections.map((section) => (
                <LayerRow
                  key={section.id}
                  section={section}
                  selected={selected === section.id}
                  onSelect={() => setSelected(section.id)}
                  onToggleVisible={() => patchSection(section.id, { visible: !section.visible })}
                  onToggleLocked={() => patchSection(section.id, { locked: !section.locked })}
                  onDragStart={() => setDraggedLayer(section.id)}
                  onDrop={() => {
                    if (draggedLayer) saveSections(reorderStudioSection(sections, draggedLayer, section.id));
                    setDraggedLayer(null);
                  }}
                />
              ))}

              <div className="mt-2 rounded-xl border border-white/10 bg-black/25 p-1">
                <button className="flex w-full items-center gap-2 px-2 py-2 text-left text-xs font-black" onClick={() => setSelected(active.media[0] ? `media:${active.media[0].id}` : null)}>
                  <span className="text-cyan-200">▾</span>
                  <span>Media</span>
                  <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px]">{active.media.length}</span>
                </button>
                {active.media.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => setSelected(`media:${asset.id}`)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs ${selected === `media:${asset.id}` ? 'bg-purple-300/15 text-purple-100' : 'text-white/55 hover:bg-white/5'}`}
                  >
                    <span>{asset.kind === 'video' ? '▶' : '▧'}</span>
                    <span className="truncate">{asset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedSection && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button onClick={() => saveSections(moveStudioSection(sections, selectedSection.id, -1))} className="rounded-xl border border-white/10 p-3 text-xs font-black">Move Up</button>
              <button onClick={() => saveSections(moveStudioSection(sections, selectedSection.id, 1))} className="rounded-xl border border-white/10 p-3 text-xs font-black">Move Down</button>
            </div>
          )}

          <button onClick={() => fileRef.current?.click()} className="mt-4 w-full rounded-2xl border border-dashed border-purple-300/40 bg-purple-300/[.06] p-5 text-sm font-black">Drop / Upload Media</button>
          <input ref={fileRef} hidden type="file" multiple accept="image/*,video/*" onChange={(event) => void upload(event.target.files)} />
        </aside>

        <section className="relative overflow-auto bg-[#09060d] p-5">
          <div
            data-studio-canvas
            onPointerDown={() => setSelected(null)}
            className="relative mx-auto min-h-[900px] max-w-[1400px] overflow-hidden rounded-[2rem] border border-white/10"
            style={{ background: active.background, color: active.text, boxShadow: `0 0 60px ${active.glow}22` }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:24px_24px]" />

            {active.media.map((asset) => (
              <MediaLayer
                key={asset.id}
                asset={asset}
                selected={selected === `media:${asset.id}`}
                onSelect={() => setSelected(`media:${asset.id}`)}
                onChange={(patch) => updateMedia(world, asset.id, patch)}
              />
            ))}

            {orderedSections.filter((section) => section.visible).map((section) => {
              const style = readElementStyle(active.labels, section.id);
              const isSelected = selected === section.id;
              return (
                <div
                  key={section.id}
                  onPointerDown={(event) => startSectionPointer(event, section, style, 'move')}
                  onPointerMove={moveSectionPointer}
                  onPointerUp={stopSectionPointer}
                  onPointerCancel={stopSectionPointer}
                  className={`absolute select-none border transition ${section.locked ? 'cursor-not-allowed' : 'cursor-move'} ${isSelected ? 'border-purple-200 bg-purple-300/10 ring-1 ring-purple-200/50' : 'border-white/10 bg-white/[.035]'}`}
                  style={{
                    left: `${style.x}%`,
                    top: `${style.y}%`,
                    width: `${style.width}%`,
                    minHeight: style.minHeight,
                    padding: style.padding,
                    borderRadius: style.radius,
                    opacity: style.opacity / 100,
                    filter: `blur(${style.blur}px)`,
                    boxShadow: `0 0 ${style.glow}px ${active.glow}55`,
                    transform: 'translate(-50%,-50%)',
                  }}
                >
                  <p className="text-[10px] font-black uppercase tracking-[.2em]" style={{ color: active.secondary }}>{section.kind}</p>
                  <h2 className="mt-2 text-2xl font-black">{section.label}</h2>
                  <p className="mt-2 max-w-xl text-sm" style={{ color: active.muted }}>Select and drag this section. Use the lower-right handle to resize it.</p>
                  {section.locked && <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[10px]">Locked</span>}
                  {isSelected && !section.locked && (
                    <div
                      onPointerDown={(event) => startSectionPointer(event, section, style, 'resize')}
                      onPointerMove={moveSectionPointer}
                      onPointerUp={stopSectionPointer}
                      onPointerCancel={stopSectionPointer}
                      className="absolute -bottom-2 -right-2 h-5 w-5 cursor-se-resize rounded-full bg-purple-200 ring-4 ring-black"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <aside className="border-l border-white/10 bg-black/40 p-4">
          <p className="text-[10px] font-black uppercase tracking-[.24em] text-white/35">Properties</p>
          {!selectedSection && !selectedMedia && <p className="mt-4 text-sm text-white/45">Select a section or media layer on the canvas or in Layers.</p>}

          {selectedSection && selectedStyle && (
            <>
              <input
                value={selectedSection.label}
                onChange={(event) => patchSection(selectedSection.id, { label: event.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xl font-black outline-none focus:border-purple-300"
                aria-label="Layer name"
              />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button onClick={() => patchSection(selectedSection.id, { visible: !selectedSection.visible })} className="rounded-xl border border-white/10 p-3 text-xs font-black">{selectedSection.visible ? 'Hide' : 'Show'}</button>
                <button onClick={() => patchSection(selectedSection.id, { locked: !selectedSection.locked })} className="rounded-xl border border-white/10 p-3 text-xs font-black">{selectedSection.locked ? 'Unlock' : 'Lock'}</button>
              </div>
              <div className="mt-5 grid gap-3">
                <Range label="X position" value={selectedStyle.x} min={0} max={100} onChange={(x) => patchStyle(selectedSection.id, { x })} />
                <Range label="Y position" value={selectedStyle.y} min={0} max={100} onChange={(y) => patchStyle(selectedSection.id, { y })} />
                <Range label="Width" value={selectedStyle.width} min={10} max={100} onChange={(width) => patchStyle(selectedSection.id, { width })} />
                <Range label="Height" value={selectedStyle.minHeight} min={48} max={900} onChange={(minHeight) => patchStyle(selectedSection.id, { minHeight })} />
                <Range label="Padding" value={selectedStyle.padding} min={0} max={100} onChange={(padding) => patchStyle(selectedSection.id, { padding })} />
                <Range label="Corners" value={selectedStyle.radius} min={0} max={80} onChange={(radius) => patchStyle(selectedSection.id, { radius })} />
                <Range label="Opacity" value={selectedStyle.opacity} min={0} max={100} onChange={(opacity) => patchStyle(selectedSection.id, { opacity })} />
                <Range label="Blur" value={selectedStyle.blur} min={0} max={20} onChange={(blur) => patchStyle(selectedSection.id, { blur })} />
                <Range label="Glow" value={selectedStyle.glow} min={0} max={100} onChange={(glow) => patchStyle(selectedSection.id, { glow })} />
                <label className="grid gap-2 text-xs font-black uppercase tracking-wider text-white/45">
                  Motion
                  <select value={selectedStyle.motion} onChange={(event) => patchStyle(selectedSection.id, { motion: event.target.value as StudioMotion })} className="rounded-xl border border-white/10 bg-black p-3 text-white">
                    {motions.map((motion) => <option key={motion}>{motion}</option>)}
                  </select>
                </label>
              </div>
            </>
          )}

          {selectedMedia && (
            <>
              <input value={selectedMedia.name} onChange={(event) => updateMedia(world, selectedMedia.id, { name: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xl font-black outline-none focus:border-purple-300" aria-label="Media layer name" />
              <div className="mt-5 grid gap-3">
                <Range label="X position" value={selectedMedia.x} min={0} max={100} onChange={(x) => updateMedia(world, selectedMedia.id, { x })} />
                <Range label="Y position" value={selectedMedia.y} min={0} max={100} onChange={(y) => updateMedia(world, selectedMedia.id, { y })} />
                <Range label="Width" value={selectedMedia.width} min={5} max={100} onChange={(width) => updateMedia(world, selectedMedia.id, { width })} />
                <Range label="Rotation" value={selectedMedia.rotation} min={-180} max={180} onChange={(rotation) => updateMedia(world, selectedMedia.id, { rotation })} />
                <Range label="Opacity" value={selectedMedia.opacity} min={0} max={100} onChange={(opacity) => updateMedia(world, selectedMedia.id, { opacity })} />
                <Range label="Layer order" value={selectedMedia.zIndex} min={0} max={100} onChange={(zIndex) => updateMedia(world, selectedMedia.id, { zIndex })} />
              </div>
              <button onClick={() => { removeMedia(world, selectedMedia.id); setSelected(null); }} className="mt-5 w-full rounded-xl border border-red-300/20 bg-red-300/10 p-3 text-xs font-black text-red-100">Remove Media</button>
            </>
          )}
        </aside>
      </div>
    </main>
  );
}

function LayerRow({ section, selected, onSelect, onToggleVisible, onToggleLocked, onDragStart, onDrop }: {
  section: StudioSection;
  selected: boolean;
  onSelect: () => void;
  onToggleVisible: () => void;
  onToggleLocked: () => void;
  onDragStart: () => void;
  onDrop: () => void;
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => { event.preventDefault(); onDrop(); }}
      className={`group mb-1 flex items-center rounded-xl border ${selected ? 'border-purple-300 bg-purple-300/15' : 'border-transparent hover:border-white/10 hover:bg-white/[.035]'}`}
    >
      <button onClick={onSelect} className="flex min-w-0 flex-1 items-center gap-2 px-2 py-2 text-left">
        <span className="cursor-grab text-white/25">⋮⋮</span>
        <span className="truncate text-sm font-bold">{section.label}</span>
        <span className="ml-auto text-[9px] uppercase text-white/25">{section.kind}</span>
      </button>
      <button onClick={onToggleLocked} className="px-2 py-2 text-xs text-white/40 hover:text-white" aria-label={section.locked ? 'Unlock layer' : 'Lock layer'}>{section.locked ? '🔒' : '🔓'}</button>
      <button onClick={onToggleVisible} className="px-2 py-2 text-xs text-white/40 hover:text-white" aria-label={section.visible ? 'Hide layer' : 'Show layer'}>{section.visible ? '◉' : '○'}</button>
    </div>
  );
}

function Range({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <label className="grid gap-2 text-xs font-black uppercase tracking-wider text-white/45">
      <span className="flex justify-between"><span>{label}</span><output>{Math.round(value)}</output></span>
      <input type="range" value={value} min={min} max={max} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function MediaLayer({ asset, selected, onSelect, onChange }: { asset: WorldMediaAsset; selected: boolean; onSelect: () => void; onChange: (patch: Partial<WorldMediaAsset>) => void }) {
  const [drag, setDrag] = useState<{ startX: number; startY: number; originX: number; originY: number } | null>(null);

  function start(event: ReactPointerEvent<HTMLDivElement>) {
    event.stopPropagation();
    onSelect();
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({ startX: event.clientX, startY: event.clientY, originX: asset.x, originY: asset.y });
  }

  function move(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag) return;
    const canvas = event.currentTarget.closest('[data-studio-canvas]') as HTMLElement | null;
    const rect = canvas?.getBoundingClientRect();
    if (!rect) return;
    onChange({
      x: clamp(drag.originX + ((event.clientX - drag.startX) / rect.width) * 100, 0, 100),
      y: clamp(drag.originY + ((event.clientY - drag.startY) / rect.height) * 100, 0, 100),
    });
  }

  function stop(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setDrag(null);
  }

  return (
    <div
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={stop}
      onPointerCancel={stop}
      className={`absolute cursor-move touch-none ${selected ? 'ring-2 ring-purple-200' : 'ring-0'}`}
      style={{ left: `${asset.x}%`, top: `${asset.y}%`, width: `${asset.width}%`, opacity: asset.opacity / 100, transform: `translate(-50%,-50%) rotate(${asset.rotation}deg)`, zIndex: asset.zIndex }}
    >
      {asset.kind === 'video'
        ? <video src={asset.url} autoPlay loop={asset.loop} muted={asset.muted} className="pointer-events-none w-full rounded-xl" />
        : <img src={asset.url} alt={asset.name} className="pointer-events-none w-full rounded-xl" />}
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
