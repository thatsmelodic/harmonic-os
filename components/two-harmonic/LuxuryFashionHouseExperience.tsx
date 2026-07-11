'use client';

import { useEffect, useMemo, useState } from 'react';

const particles = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: `${(index % 8) * .55}s`,
  duration: `${7 + (index % 6)}s`,
  size: 2 + (index % 4),
}));

export function LuxuryFashionHouseExperience() {
  const [entered, setEntered] = useState(true);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const seen = window.sessionStorage.getItem('two-harmonic-arrival-seen');
    setEntered(Boolean(seen));
  }, []);

  const enter = () => {
    setOpening(true);
    window.sessionStorage.setItem('two-harmonic-arrival-seen', '1');
    window.setTimeout(() => setEntered(true), 1150);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden="true">
        {particles.map((particle) => (
          <i
            key={particle.id}
            className="twoh-thread-particle absolute rounded-full"
            style={{
              left: particle.left,
              bottom: '-3%',
              width: particle.size,
              height: particle.size * 2.4,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              background: particle.id % 3 === 0 ? 'var(--identity-accent)' : 'var(--identity-secondary)',
              opacity: .1 + (particle.id % 5) * .025,
            }}
          />
        ))}
      </div>

      {!entered && (
        <div className={`fixed inset-0 z-[120] grid place-items-center overflow-hidden bg-[#050403] transition-opacity duration-700 ${opening ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(231,207,157,.16),transparent_34rem)]" />
          <div className={`twoh-door twoh-door-left absolute inset-y-0 left-0 w-1/2 border-r border-[#e7cf9d]/25 bg-[linear-gradient(90deg,#070503,#171007)] ${opening ? 'twoh-door-open-left' : ''}`} />
          <div className={`twoh-door twoh-door-right absolute inset-y-0 right-0 w-1/2 border-l border-[#e7cf9d]/25 bg-[linear-gradient(270deg,#070503,#171007)] ${opening ? 'twoh-door-open-right' : ''}`} />

          <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 text-center">
            <p className="twoh-arrival-copy text-[10px] font-black uppercase tracking-[.55em] text-[#c8ad77]">Welcome to Frequency No. 2</p>
            <img src="/identity/two-harmonic-mark-gold.svg" alt="2 Harmonic Beige Frequency mark" className="twoh-arrival-mark mt-8 h-64 w-52 object-contain sm:h-80 sm:w-64" />
            <p className="mt-7 max-w-md text-sm leading-7 text-[#b8a78e]">A quiet room where melody becomes material and every stitch carries memory.</p>
            <button onClick={enter} className="mt-8 rounded-full border border-[#e7cf9d]/55 bg-[#e7cf9d] px-8 py-4 text-xs font-black uppercase tracking-[.24em] text-[#1c140b] shadow-[0_0_50px_rgba(231,207,157,.24)] transition hover:scale-105">
              Enter the Fashion House
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes twohThreadRise { 0% { transform: translate3d(0,0,0) rotate(0deg); opacity: 0; } 12% { opacity: .22; } 100% { transform: translate3d(20px,-110vh,0) rotate(180deg); opacity: 0; } }
        @keyframes twohMarkForm { 0% { opacity: 0; filter: blur(22px); transform: scale(.72); } 55% { opacity: 1; filter: blur(2px); } 100% { opacity: 1; filter: blur(0); transform: scale(1); } }
        @keyframes twohCopyReveal { from { opacity: 0; letter-spacing: .85em; } to { opacity: 1; letter-spacing: .55em; } }
        @keyframes twohStitchReveal { 0% { clip-path: inset(0 100% 0 0); filter: blur(8px); transform: scale(.93); } 70% { filter: blur(0); } 100% { clip-path: inset(0 0 0 0); transform: scale(1); } }
        @keyframes twohRoomBreath { 0%,100% { transform: scale(1); opacity: .34; } 50% { transform: scale(1.08); opacity: .58; } }
        .twoh-thread-particle { animation: twohThreadRise linear infinite; }
        .twoh-arrival-mark { animation: twohMarkForm 1.8s cubic-bezier(.16,1,.3,1) both; filter: drop-shadow(0 0 28px rgba(231,207,157,.32)); }
        .twoh-arrival-copy { animation: twohCopyReveal 1.3s ease-out both; }
        .twoh-door { transition: transform 1.2s cubic-bezier(.76,0,.24,1); }
        .twoh-door-open-left { transform: translateX(-102%); }
        .twoh-door-open-right { transform: translateX(102%); }
        .twoh-stitch-reveal { animation: twohStitchReveal 1.15s cubic-bezier(.16,1,.3,1) both; }
        .twoh-room-breath { animation: twohRoomBreath 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .twoh-thread-particle,.twoh-arrival-mark,.twoh-arrival-copy,.twoh-stitch-reveal,.twoh-room-breath { animation: none !important; }
          .twoh-door { transition: none !important; }
        }
      `}</style>
    </>
  );
}

export function GarmentReveal({ symbol, name, mark = false }: { symbol: string; name: string; mark?: boolean }) {
  const seams = useMemo(() => Array.from({ length: 7 }, (_, index) => index), []);
  return (
    <div className="twoh-stitch-reveal relative mx-auto grid h-72 w-72 place-items-center overflow-hidden rounded-[4rem] border border-[#d8c7aa]/25 bg-[#d8c7aa]/8 shadow-[0_0_80px_rgba(245,239,228,.08)]">
      <div className="twoh-room-breath absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(231,207,157,.24),transparent_68%)]" />
      {seams.map((seam) => <i key={seam} className="absolute h-px w-[72%] bg-gradient-to-r from-transparent via-[#e7cf9d]/25 to-transparent" style={{ top: `${18 + seam * 10}%`, transform: `rotate(${seam % 2 ? -18 : 18}deg)` }} />)}
      {mark ? <img src="/identity/two-harmonic-mark-gold.svg" alt={`${name} frequency mark`} className="relative z-10 h-56 w-44 object-contain drop-shadow-[0_0_24px_rgba(231,207,157,.28)]" /> : <span className="relative z-10 text-[10rem] text-[#f5efe4]">{symbol}</span>}
    </div>
  );
}
