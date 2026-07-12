'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type DockGroup = {
  label: string;
  items: Array<{ label: string; href: string; note: string }>;
};

const groups: DockGroup[] = [
  {
    label: 'OS',
    items: [
      { label: 'Home', href: '/', note: 'Main Harmonic OS entry.' },
      { label: 'Bible', href: '/bible', note: 'Lore, symbols, philosophy, and world meaning.' },
      { label: 'Hub', href: '/hub', note: 'Your connected activity and operating hub.' },
    ],
  },
  {
    label: 'Worlds',
    items: [
      { label: 'World Directory', href: '/universe', note: 'See every frequency in one place.' },
      { label: 'Melodic', href: '/worlds/melodic', note: 'Music and creator identity.' },
      { label: '2 Harmonic', href: '/worlds/2-harmonic', note: 'Fashion world and brand experience.' },
      { label: 'Fried Em', href: '/worlds/fried-em', note: 'Basketball world and episodes.' },
      { label: 'Schmackinn', href: '/worlds/schmackinn', note: 'Food, reviews, and culture.' },
      { label: 'Business', href: '/worlds/business', note: 'Founder and business frequency.' },
    ],
  },
  {
    label: 'Create',
    items: [
      { label: 'Creator Studio', href: '/studio', note: 'Build, manage, and publish.' },
      { label: 'Profile', href: '/profile', note: 'Identity, progress, and settings.' },
    ],
  },
  {
    label: 'Commerce',
    items: [
      { label: '2 Harmonic Shop', href: '/shop', note: 'Live collections, inventory, and reservations.' },
      { label: 'Beats', href: '/beats', note: 'Music catalog and licensing.' },
      { label: 'Investor', href: '/investors', note: 'Business vision and investor access.' },
    ],
  },
  {
    label: 'Community',
    items: [
      { label: 'Community Hub', href: '/community', note: 'All world communities, conversations, and activity.' },
      { label: 'Melodic Community', href: '/worlds/melodic#community', note: 'Songs, reactions, listening rooms, and creator conversation.' },
      { label: '2 Harmonic Community', href: '/worlds/2-harmonic#community', note: 'Fits, closet stories, drop discussion, and wearer interaction.' },
      { label: 'Fried Em Community', href: '/worlds/fried-em#community', note: 'Game reactions, player talk, challenges, and court conversation.' },
      { label: 'Schmackinn Community', href: '/community/schmackinn', note: 'Reviews, recommendations, comments, and Flavor Scout activity.' },
      { label: 'Business Community', href: '/worlds/business#community', note: 'Founder discussion, collaboration, strategy, and opportunity.' },
    ],
  },
];

export function FrequencyDock() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const dockRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!dockRef.current?.contains(event.target as Node)) setOpenGroup(null);
    };
    window.addEventListener('pointerdown', closeOutside);
    return () => window.removeEventListener('pointerdown', closeOutside);
  }, []);

  return (
    <nav ref={dockRef} className="fixed bottom-3 left-1/2 z-[850] w-[calc(100%-20px)] max-w-3xl -translate-x-1/2 rounded-[2rem] border border-white/15 bg-black/80 p-2 shadow-purple-glow backdrop-blur-2xl md:bottom-4">
      <div className="grid grid-cols-5 gap-1">
        {groups.map((group) => {
          const active = group.items.some((item) => item.href === '/' ? pathname === '/' : pathname.startsWith(item.href.split('#')[0]));
          const open = openGroup === group.label;

          return (
            <div key={group.label} className="relative">
              {open && (
                <div className="absolute bottom-[calc(100%+.65rem)] left-1/2 max-h-[70vh] w-[min(88vw,350px)] -translate-x-1/2 overflow-y-auto rounded-[1.6rem] border border-white/12 bg-black/95 p-2 shadow-[0_0_70px_rgba(183,108,255,.25)] backdrop-blur-2xl">
                  <p className="px-3 pb-2 pt-1 text-[.62rem] font-black uppercase tracking-[.28em] text-white/35">{group.label}</p>
                  <div className="grid gap-1">
                    {group.items.map((item) => {
                      const route = item.href.split('#')[0];
                      const itemActive = pathname === route || (route !== '/' && pathname.startsWith(route));
                      return (
                        <Link key={item.href} href={item.href} className={`rounded-[1.1rem] px-3 py-3 transition hover:bg-white/10 ${itemActive ? 'bg-purple-200 text-black' : 'text-white'}`}>
                          <span className="block text-sm font-black">{item.label}</span>
                          <span className={`mt-1 block text-[.68rem] leading-4 ${itemActive ? 'text-black/60' : 'text-white/38'}`}>{item.note}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setOpenGroup(open ? null : group.label)}
                className={`w-full rounded-full px-1 py-3 text-[.72rem] font-black transition sm:text-sm ${active || open ? 'bg-purple-200 text-black' : 'text-purple-100/70 hover:bg-white/10 hover:text-white'}`}
                aria-expanded={open}
              >
                {group.label}
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
