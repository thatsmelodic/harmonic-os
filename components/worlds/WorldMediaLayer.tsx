'use client';

import { useWorldCustomization } from '@/components/studio/WorldCustomizationProvider';

export function WorldMediaLayer() {
  const { settings, activeWorld } = useWorldCustomization();
  const assets = [...(settings.global.media || []), ...(settings[activeWorld]?.media || [])];

  return (
    <>
      <style>{`
        @keyframes worldFade{0%,100%{opacity:.35}50%{opacity:1}}
        @keyframes worldSlideUp{0%{transform:translate(-50%,calc(-50% + 28px))}100%{transform:translate(-50%,-50%)}}
        @keyframes worldFloat{0%,100%{transform:translate(-50%,-50%) translateY(-8px)}50%{transform:translate(-50%,-50%) translateY(8px)}}
        @keyframes worldPulse{0%,100%{transform:translate(-50%,-50%) scale(.96)}50%{transform:translate(-50%,-50%) scale(1.04)}}
        @keyframes worldSpin{to{transform:translate(-50%,-50%) rotate(360deg)}}
      `}</style>
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        {assets.map((asset) => {
          const motion = asset.motion || 'none';
          const animation = motion === 'fade' ? 'worldFade' : motion === 'slide-up' ? 'worldSlideUp' : motion === 'float' ? 'worldFloat' : motion === 'pulse' ? 'worldPulse' : motion === 'spin' ? 'worldSpin' : undefined;
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
            animation: animation ? `${animation} ${asset.duration || 6}s ease-in-out ${asset.delay || 0}s infinite alternate` : undefined,
          };
          return asset.kind === 'video' ? <video key={asset.id} src={asset.url} autoPlay playsInline loop={asset.loop} muted={asset.muted} style={style} /> : <img key={asset.id} src={asset.url} alt="" style={style} />;
        })}
      </div>
    </>
  );
}
