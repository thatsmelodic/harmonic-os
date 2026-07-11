'use client';

const bars = [32, 58, 78, 46, 88, 64, 96, 52, 74, 40, 82, 60];

export function MelodyVisualizer({ playing, intensity, label }: { playing: boolean; intensity: number; label: string }) {
  return (
    <div className="relative mx-auto grid h-72 w-72 place-items-center overflow-hidden rounded-[4rem] border border-[#d8c7aa]/25 bg-[#d8c7aa]/8 transition-all duration-700" style={{ boxShadow: `0 0 ${40 + intensity}px rgba(245,239,228,${.06 + intensity / 900})` }}>
      <div className={`absolute inset-[8%] rounded-full border border-[#e7cf9d]/10 ${playing ? 'animate-ping' : ''}`} style={{ animationDuration: '3.2s' }} />
      <img src="/identity/two-harmonic-mark-gold.svg" alt={`${label} frequency mark`} className={`relative z-10 h-48 w-40 object-contain transition duration-700 ${playing ? 'scale-105 drop-shadow-[0_0_28px_rgba(231,207,157,.4)]' : 'opacity-80'}`} />
      <div className="absolute bottom-7 left-1/2 flex h-16 -translate-x-1/2 items-end gap-1.5">
        {bars.map((height, index) => <i key={index} className="w-1.5 rounded-full bg-[#e7cf9d]/70" style={{ height: playing ? `${Math.max(18, height * (.55 + intensity / 160))}%` : '12%', animation: playing ? `twohEqualize ${.65 + (index % 5) * .11}s ease-in-out ${index * .06}s infinite alternate` : 'none' }} />)}
      </div>
      <style jsx global>{`
        @keyframes twohEqualize { from { transform: scaleY(.35); opacity: .35; } to { transform: scaleY(1); opacity: .95; } }
        @media (prefers-reduced-motion: reduce) { .twoh-equalizer { animation: none !important; } }
      `}</style>
    </div>
  );
}
