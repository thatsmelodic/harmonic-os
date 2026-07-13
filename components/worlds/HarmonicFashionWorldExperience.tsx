'use client';

import Link from 'next/link';
import { useState } from 'react';

const destinations = [
  {
    number: '01',
    title: 'Atelier',
    description: 'The creation process.',
    image: 'linear-gradient(180deg,transparent 35%,rgba(8,5,2,.82)), url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=88)',
  },
  {
    number: '02',
    title: 'Collections',
    description: 'Current and upcoming drops.',
    image: 'linear-gradient(180deg,transparent 35%,rgba(8,5,2,.88)), url(https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=88)',
  },
  {
    number: '03',
    title: 'Campaign Hall',
    description: 'Visual stories and films.',
    image: 'linear-gradient(180deg,transparent 35%,rgba(8,5,2,.88)), url(https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=88)',
  },
  {
    number: '04',
    title: 'Frequency Vault',
    description: 'The melodies behind the pieces.',
    image: 'linear-gradient(180deg,transparent 35%,rgba(8,5,2,.92)), url(https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=88)',
  },
  {
    number: '05',
    title: 'The Journal',
    description: 'Thoughts, updates, reflections.',
    image: 'linear-gradient(180deg,transparent 35%,rgba(8,5,2,.86)), url(https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=88)',
  },
];

export function HarmonicFashionWorldExperience() {
  const [soundOn, setSoundOn] = useState(true);
  const [active, setActive] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#100b06] text-[#f5eee2] selection:bg-[#caa56b]/40">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(90deg,rgba(7,4,2,.82) 0%,rgba(7,4,2,.35) 31%,rgba(7,4,2,.08) 58%,rgba(7,4,2,.42) 100%), linear-gradient(180deg,rgba(5,3,1,.56) 0%,transparent 28%,transparent 64%,rgba(6,4,2,.9) 100%), url(https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2400&q=94)',
        }}
      />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(255,220,160,.26),transparent_26%),radial-gradient(circle_at_70%_58%,rgba(202,165,107,.12),transparent_32%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[.12] [background-image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_160_160%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%22.85%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22_opacity=%22.35%22/%3E%3C/svg%3E')]" />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0a0704]/45 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1600px] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-4">
            <BrandMark />
            <div>
              <p className="text-[9px] uppercase tracking-[.28em] text-white/65">Frequency 02</p>
              <p className="font-serif text-[17px] tracking-[.05em]">2 HARMONIC</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-10 text-[11px] uppercase tracking-[.08em] text-white/75 lg:flex">
            {['Atelier', 'Collections', 'Campaign Hall', 'Frequency Vault', 'The Journal'].map((item, index) => (
              <button key={item} onClick={() => setActive(index)} className="transition hover:text-[#e7c68e]">
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[.1em]">
            <button className="hidden items-center gap-2 border-r border-white/15 pr-5 sm:flex">
              <BagIcon /> Closet
            </button>
            <span>02</span>
            <button aria-label="Open menu" className="space-y-1.5">
              <span className="block h-px w-5 bg-white/75" />
              <span className="block h-px w-3.5 bg-white/75" />
            </button>
          </div>
        </div>
      </header>

      <section className="relative z-10 flex min-h-[690px] items-center px-6 pb-44 pt-32 sm:px-12 lg:min-h-[760px] lg:px-[5.5vw]">
        <div className="max-w-xl [text-shadow:0_3px_24px_rgba(0,0,0,.65)]">
          <p className="mb-5 text-[10px] uppercase tracking-[.34em] text-[#ddc39a]">A living fashion estate</p>
          <h1 className="font-serif text-5xl font-light leading-[.95] tracking-[-.035em] sm:text-7xl lg:text-[5.4rem]">
            2 HARMONIC
            <span className="mt-3 block text-[.62em] tracking-[-.015em]">FASHION HOUSE</span>
          </h1>
          <p className="mt-8 max-w-md font-serif text-base text-white/80 sm:text-lg">Every stitch remembers a melody.</p>
          <button className="group mt-9 flex items-center gap-12 border-b border-white/55 pb-3 text-[11px] uppercase tracking-[.12em] transition hover:border-[#ddb97d] hover:text-[#f1d39e]">
            Enter the house
            <span className="text-xl transition group-hover:translate-x-2">→</span>
          </button>
        </div>

        <div className="absolute right-[4.2vw] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
          {destinations.map((item, index) => (
            <button
              key={item.title}
              aria-label={`View ${item.title}`}
              onClick={() => setActive(index)}
              className={`rounded-full border transition ${active === index ? 'h-2 w-2 border-white bg-white' : 'h-1.5 w-1.5 border-white/45'}`}
            />
          ))}
        </div>

        <div className="absolute bottom-36 right-[4.2vw] hidden w-[218px] rounded-sm border border-white/15 bg-[#17100b]/70 p-4 shadow-2xl backdrop-blur-xl md:block">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[8px] uppercase tracking-[.18em] text-white/45">Now playing</p>
              <p className="mt-2 font-serif text-sm">Desert Hymn</p>
              <p className="mt-1 text-[9px] text-white/50">2 Harmonic</p>
            </div>
            <button onClick={() => setSoundOn(!soundOn)} className="grid h-9 w-9 place-items-center rounded-full border border-white/35 text-[10px]">
              {soundOn ? 'Ⅱ' : '▶'}
            </button>
          </div>
          <div className="mt-4 flex h-5 items-end gap-[2px]">
            {[3, 7, 12, 5, 16, 8, 11, 4, 14, 7, 10, 5, 12, 6, 9, 4, 7, 3].map((height, index) => (
              <span key={index} className="w-px bg-[#e7d2ad]/75" style={{ height: soundOn ? height : 2 }} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-32 px-4 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-[1600px] gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {destinations.map((destination, index) => (
            <article
              key={destination.title}
              onMouseEnter={() => setActive(index)}
              className={`group relative min-h-[286px] cursor-pointer overflow-hidden rounded-[3px] border transition duration-500 ${active === index ? 'border-[#ddbd86]/70 -translate-y-2' : 'border-white/15 hover:-translate-y-2 hover:border-white/35'}`}
              style={{ backgroundImage: destination.image, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0906] via-transparent to-black/10 transition duration-500 group-hover:bg-black/5" />
              <span className="absolute right-4 top-4 text-[9px] tracking-[.2em] text-white/50">{destination.number}</span>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h2 className="font-serif text-xl uppercase tracking-[.015em]">{destination.title}</h2>
                <div className="mt-3 flex items-center justify-between text-[11px] text-white/65">
                  <p>{destination.description}</p>
                  <span className="text-lg transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0a0704]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-[62px] max-w-[1600px] items-center justify-between px-5 text-[10px] uppercase tracking-[.14em] text-white/70 sm:px-8">
          <Link href="/" className="flex items-center gap-3"><CompassIcon /> World map</Link>
          <span className="hidden items-center gap-3 sm:flex">↕ <span>Scroll to explore</span></span>
          <button onClick={() => setSoundOn(!soundOn)} className="flex items-center gap-3">Sound <WaveIcon /> {soundOn ? 'On' : 'Off'}</button>
        </div>
      </footer>
    </main>
  );
}

function BrandMark() {
  return (
    <svg viewBox="0 0 64 64" className="h-11 w-11" fill="none" aria-hidden="true">
      <path d="M32 52 10 31C-2 18 15 3 27 15l5 5 5-5C49 3 66 18 54 31L32 52Z" stroke="currentColor" strokeWidth="3" />
      <path d="M18 53h29M23 46h18" stroke="currentColor" strokeWidth="2" />
      <text x="26" y="59" fill="currentColor" fontSize="18" fontFamily="serif">2</text>
    </svg>
  );
}

function BagIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>;
}

function CompassIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></svg>;
}

function WaveIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor"><path d="M3 12h2m2-4v8m3-12v16m3-12v8m3-6v4m3-2h2"/></svg>;
}
