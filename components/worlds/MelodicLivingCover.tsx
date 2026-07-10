'use client';

import { useEffect, useMemo, useState } from 'react';

type LivingCoverProps = {
  title: string;
  subtitle?: string;
  colors: [string, string, string];
  imageUrl?: string;
  playing?: boolean;
  energy?: number;
  className?: string;
};

export function MelodicLivingCover({ title, subtitle, colors, imageUrl, playing = true, energy = 72, className = '' }: LivingCoverProps) {
  const [pulse, setPulse] = useState(0);
  const nodes = useMemo(() => Array.from({ length: 18 }, (_, index) => ({
    left: (index * 37.6) % 100,
    top: (index * 53.2) % 100,
    size: 3 + (index % 5) * 2,
    delay: (index % 7) * .24,
  })), []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setPulse((value) => (value + 1) % 8), 650);
    return () => window.clearInterval(timer);
  }, [playing]);

  return (
    <div className={`relative isolate overflow-hidden rounded-[2.4rem] border border-white/15 bg-black/40 shadow-[0_0_90px_rgba(183,108,255,.22)] ${className}`}>
      <div className="absolute inset-0 -z-30" style={{ background: `radial-gradient(circle at 22% 18%, ${colors[0]}66, transparent 30rem), radial-gradient(circle at 82% 26%, ${colors[1]}55, transparent 28rem), linear-gradient(145deg, ${colors[2]}, #030205)` }} />
      {imageUrl && <div className="absolute inset-0 -z-20 scale-110 bg-cover bg-center opacity-45 blur-2xl" style={{ backgroundImage: `url(${imageUrl})` }} />}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(0,0,0,.85),transparent_60%)]" />
      <div className="absolute inset-0 opacity-60 mix-blend-screen" style={{ background: `conic-gradient(from ${pulse * 12}deg at 50% 50%, transparent, ${colors[0]}44, transparent, ${colors[1]}33, transparent)` }} />

      {nodes.map((node, index) => <span key={index} className={`absolute rounded-full bg-white/75 blur-[1px] ${playing ? 'animate-pulse' : ''}`} style={{ left: `${node.left}%`, top: `${node.top}%`, width: node.size, height: node.size, animationDelay: `${node.delay}s`, boxShadow: `0 0 ${12 + node.size * 2}px ${colors[index % 2]}` }} />)}

      <div className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" style={{ transform: `translate(-50%,-50%) scale(${playing ? 1 + (pulse % 4) * .015 : 1})`, boxShadow: `0 0 ${35 + energy}px ${colors[0]}33` }} />
      <div className="absolute left-1/2 top-1/2 h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[28%] border border-white/15 bg-white/[.035] backdrop-blur-xl" style={{ boxShadow: `inset 0 0 50px ${colors[1]}22, 0 0 ${25 + energy / 2}px ${colors[1]}44` }} />

      <div className="relative grid min-h-[460px] place-items-center p-8 sm:min-h-[580px]">
        <div className="text-center">
          {imageUrl ? <img src={imageUrl} alt={`${title} cover art`} className={`mx-auto aspect-square w-56 rounded-[2rem] border border-white/20 object-cover shadow-2xl sm:w-72 ${playing ? 'animate-[pulse_2.8s_ease-in-out_infinite]' : ''}`} /> : <div className={`mx-auto grid aspect-square w-56 place-items-center rounded-[2rem] border border-white/20 bg-white/[.06] shadow-2xl backdrop-blur-2xl sm:w-72 ${playing ? 'animate-[pulse_2.8s_ease-in-out_infinite]' : ''}`}><div className="text-7xl">◈</div></div>}
          <p className="mt-7 text-xs font-black uppercase tracking-[.32em] text-white/45">Living Cover</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-.07em] sm:text-6xl">{title}</h2>
          {subtitle && <p className="mt-3 text-sm font-black text-white/55">{subtitle}</p>}
          <div className="mx-auto mt-6 flex h-12 max-w-sm items-end justify-center gap-1.5">{Array.from({ length: 28 }, (_, index) => <span key={index} className="w-1.5 rounded-full bg-white/70 transition-all duration-500" style={{ height: playing ? `${18 + ((index * 17 + pulse * 23) % 82)}%` : '16%', opacity: .35 + ((index % 5) / 8), boxShadow: `0 0 12px ${colors[index % 2]}` }} />)}</div>
        </div>
      </div>
    </div>
  );
}
