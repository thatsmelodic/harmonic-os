'use client';

import { useWorldCustomization } from '@/components/studio/WorldCustomizationProvider';

export function WorldMediaLayer() {
  const { settings, activeWorld } = useWorldCustomization();
  const assets = [...(settings.global.media || []), ...(settings[activeWorld]?.media || [])];

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {assets.map((asset) => {
        const style = {
          position: 'absolute' as const,
          left: `${asset.x}%`,
          top: `${asset.y}%`,
          width: `${asset.width}%`,
          opacity: asset.opacity / 100,
          transform: `translate(-50%, -50%) rotate(${asset.rotation}deg)`,
          zIndex: asset.zIndex,
          objectFit: asset.fit,
          maxHeight: asset.placement === 'background' ? '100vh' : undefined,
          height: asset.placement === 'background' ? '100vh' : 'auto',
        };

        return asset.kind === 'video' ? (
          <video key={asset.id} src={asset.url} autoPlay playsInline loop={asset.loop} muted={asset.muted} style={style} />
        ) : (
          <img key={asset.id} src={asset.url} alt="" style={style} />
        );
      })}
    </div>
  );
}
