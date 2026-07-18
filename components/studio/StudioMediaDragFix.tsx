'use client';

import { useEffect, useRef } from 'react';
import { useWorldCustomization, type WorldKey } from '@/components/studio/WorldCustomizationProvider';

const WORLD_LABELS: Array<[string, WorldKey]> = [
  ['homepage', 'home'],
  ['melodic', 'melodic'],
  ['2 harmonic', 'two-harmonic'],
  ['fried em', 'fried-em'],
  ['schmackinn', 'schmackinn'],
  ['global system', 'global'],
];

function selectedWorld(): WorldKey {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('header button'));
  const active = buttons.find((button) =>
    button.className.includes('bg-purple-200') || button.className.includes('text-black')
  );
  const label = (active?.textContent ?? '').trim().toLowerCase();
  return WORLD_LABELS.find(([text]) => label.includes(text))?.[1] ?? 'home';
}

export function StudioMediaDragFix() {
  const { settings, updateMedia } = useWorldCustomization();
  const settingsRef = useRef(settings);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const canvas = target.closest<HTMLElement>('[data-studio-canvas]');
      const media = target.closest<HTMLElement>('[data-studio-media]');
      if (!canvas || !media) return;

      const world = selectedWorld();
      const id = media.dataset.studioMedia;
      if (!id) return;
      const asset = settingsRef.current[world].media.find((item) => item.id === id);
      if (!asset || asset.locked) return;

      event.preventDefault();
      event.stopPropagation();
      stopRef.current?.();

      const rect = canvas.getBoundingClientRect();
      const startX = event.clientX;
      const startY = event.clientY;
      const originX = asset.x;
      const originY = asset.y;
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
      media.style.cursor = 'grabbing';

      const move = (moveEvent: PointerEvent) => {
        moveEvent.preventDefault();
        const dx = ((moveEvent.clientX - startX) / Math.max(rect.width, 1)) * 100;
        const dy = ((moveEvent.clientY - startY) / Math.max(rect.height, 1)) * 100;
        updateMedia(world, id, {
          x: Math.max(0, Math.min(100, originX + dx)),
          y: Math.max(0, Math.min(100, originY + dy)),
        });
      };

      const stop = () => {
        window.removeEventListener('pointermove', move, true);
        window.removeEventListener('pointerup', stop, true);
        window.removeEventListener('pointercancel', stop, true);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        media.style.cursor = asset.locked ? 'default' : 'grab';
        stopRef.current = null;
      };

      stopRef.current = stop;
      window.addEventListener('pointermove', move, { capture: true, passive: false });
      window.addEventListener('pointerup', stop, true);
      window.addEventListener('pointercancel', stop, true);
    }

    document.addEventListener('pointerdown', onPointerDown, { capture: true, passive: false });
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      stopRef.current?.();
    };
  }, [updateMedia]);

  useEffect(() => {
    const markMediaLayers = () => {
      const canvas = document.querySelector<HTMLElement>('[data-studio-canvas]');
      if (!canvas) return;
      const world = selectedWorld();
      const assets = settingsRef.current[world].media;
      const layers = Array.from(canvas.children).filter((node): node is HTMLElement => node instanceof HTMLElement);

      for (const layer of layers) {
        const visual = layer.querySelector<HTMLImageElement | HTMLVideoElement>('img,video');
        if (!visual) continue;
        const src = visual.currentSrc || visual.getAttribute('src') || '';
        const asset = assets.find((item) => item.url === src || (item.url.length > 0 && src.endsWith(item.url)));
        if (!asset) continue;
        layer.dataset.studioMedia = asset.id;
        layer.style.touchAction = 'none';
        layer.style.userSelect = 'none';
        layer.style.cursor = asset.locked ? 'default' : 'grab';
        visual.draggable = false;
        visual.style.pointerEvents = 'none';
        visual.style.userSelect = 'none';
      }
    };

    markMediaLayers();
    const timer = window.setInterval(markMediaLayers, 300);
    return () => window.clearInterval(timer);
  }, []);

  return null;
}
