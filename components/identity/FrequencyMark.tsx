'use client';

import { useIdentity } from '@/components/identity/IdentityProvider';

const motionClass = {
  float: 'animate-[identityFloat_5s_ease-in-out_infinite]',
  pulse: 'animate-pulse',
  orbit: 'animate-[identityOrbit_8s_linear_infinite]',
  drift: 'animate-[identityDrift_7s_ease-in-out_infinite]',
  still: '',
} as const;

export function FrequencyMark({ className = '', showLabel = false }: { className?: string; showLabel?: boolean }) {
  const { identity } = useIdentity();
  const mark = identity.mark;
  const metallic = mark.metallic === 'gold'
    ? 'linear-gradient(135deg,#fff1bf,#c89b47,#f8e4a5)'
    : mark.metallic === 'silver'
      ? 'linear-gradient(135deg,#ffffff,#9ca3af,#f3f4f6)'
      : mark.metallic === 'pearl'
        ? `linear-gradient(135deg,${identity.secondary},#ffffff,${identity.primary})`
        : identity.primary;

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div
        className={`relative grid aspect-square place-items-center overflow-hidden rounded-[32%] border ${motionClass[mark.motion]}`}
        style={{
          width: `${112 * mark.scale}px`,
          borderColor: `color-mix(in srgb, ${mark.glow} 50%, transparent)`,
          background: `radial-gradient(circle, color-mix(in srgb, ${mark.glow} 24%, transparent), transparent 66%)`,
          boxShadow: `0 0 48px color-mix(in srgb, ${mark.glow} 40%, transparent)`,
        }}
      >
        {mark.imageUrl ? <img src={mark.imageUrl} alt={mark.label} className="h-full w-full object-contain p-3" /> : <span className="text-6xl font-black" style={{ background: metallic, WebkitBackgroundClip: 'text', color: 'transparent' }}>{mark.symbol}</span>}
      </div>
      {showLabel && <p className="mt-3 text-center text-xs font-black uppercase tracking-[.2em]" style={{ color: identity.accent }}>{mark.label}</p>}
    </div>
  );
}
