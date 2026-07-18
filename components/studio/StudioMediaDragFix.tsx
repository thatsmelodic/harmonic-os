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
  const buttons = Array.from(document.querySelectorAll('header button'));
  const active = buttons.find((button) =>
    button.className.includes('bg-purple-200') ||
    button.className.includes('text-black')
  );
  const label = (active?.textContent || '').trim().toLowerCase();
  return WORLD_LABELS.find(([text]) => label.includes(text))?.[1] || 'home';
}

export function StudioMediaDragFix() {
  const { settings, updateMedia } = useWorldCustomization();
  const settingsRef = useRef(settings);
  useEffect(() => { settingsRef.current = settings; }, [settings]);

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    function onPointerDown(event: PointerEvent) {
      if (event.button !== 0) return;
      const target = event.target as HTMLElement | null;
      const canvas = target?.closest('[data-studio-canvas]') as HTMLElement | null;
      if (!canvas) return;

      const media = target?.closest('[data-studio-media]') as HTMLElement | null;
      if (!media) return;

      const world = selectedWorld();
      const id = media.dataset.studioMedia;
      const asset = settingsRef.current[world]?.media.find((item) => item.id === id);
      if (!asset || asset.locked) return;

      event.preventDefault();
      event.stopPropagation();

      const rect = canvas.getBoundingClientRect();
      const startX = event.clientX;
      const startY = event.clientY;
      const originX = asset.x;
      const originY = asset.y;
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
      media.style.cursor = 'grabbing';

      function move(moveEvent: PointerEvent) {
        moveEvent.preventDefault();
        const dx = ((moveEvent.clientX - startX) / rect.width) * 100;
        const dy = ((moveEvent.clientY - startY) / rect.height) * 100;
        updateMedia(world, asset.id, {
          x: Math.max(0, Math.min(100, originX + dx)),
          y: Math.max(0, Math.min(100, originY + dy)),
        });
      }

      function stop() {
        window.removeEventListener('pointermove', move, true);
        window.removeEventListener('pointerup', stop, true);
        window.removeEventListener('pointercancel', stop, true);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        media.style.cursor = '';
        cleanup = null;
      }

      window.addEventListener('pointermove', move, { capture: true, passive: false });
      window.addEventListener('pointerup', stop, true);
      window.addEventListener('pointercancel', stop, true);
      cleanup = stop;
    }

    document.addEventListener('pointerdown', onPointerDown, { capture: true, passive: false });
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      cleanup?.();
    };
  }, [updateMedia]);

  useEffect(() => {
    function markMediaLayers() {
      const canvas = document.querySelector('[data-studio-canvas]');
      if (!canvas) return;
      const world = selectedWorld();
      const assets = settingsRef.current[world]?.media || [];
      const layers = Array.from(canvas.querySelectorAll(':scope > div')) as HTMLElement[];
      for (const layer of layers) {
        if (layer.hasAttribute('data-studio-media')) continue;
        const visual = layer.querySelector('img,video') as HTMLImageElement | HTMLVideoElement | null;
        if (!visual) continue;
        const src = visual.currentSrc || visual.getAttribute('src') || '';
        const asset = assets.find((item) => item.url === src || src.endsWith(item.url));
        if (!asset) continue;
        layer.dataset.studioMedia = asset.id;
        layer.style.touchAction = 'none';
        layer.style.userSelect = 'none';
        layer.style.cursor = asset.locked ? 'default' : 'grab';
        visual.draggable = false;
        visual.style.pointerEvents = 'none';
        visual.style.userSelect = 'none';
      }
    }

    markMediaLayers();
    const observer = new MutationObserver(markMediaLayers);
    observer.observe(document.body, { childList: true, subtree: true });
    const timer = window.setInterval(markMediaLayers, 500);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return null;
}
