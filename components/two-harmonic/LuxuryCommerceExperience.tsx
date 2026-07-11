'use client';

import { useEffect, useMemo, useState } from 'react';
import { loadTwoHarmonicCommerceSettings, type TwoHarmonicCommerceSettings } from '@/lib/two-harmonic-commerce';

type Inventory = Record<string, number>;

type Props = {
  garmentSlug: string;
  garmentName: string;
  price: number;
  selectedSize: string;
  sizes: string[];
  audioUrl?: string;
};

const DEFAULT_INVENTORY: Inventory = { S: 8, M: 12, L: 10, XL: 5 };
const ACCESS_KEY = 'two-harmonic-private-access-v1';
const BAG_KEY = 'two-harmonic-reservation-bag-v1';
const SAVED_KEY = 'two-harmonic-saved-pieces-v1';

export function LuxuryCommerceExperience({ garmentSlug, garmentName, price, selectedSize, sizes, audioUrl = '' }: Props) {
  const [studio, setStudio] = useState<TwoHarmonicCommerceSettings | null>(null);
  const [inventory, setInventory] = useState<Inventory>(DEFAULT_INVENTORY);
  const [email, setEmail] = useState('');
  const [accessOpen, setAccessOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const sync = () => {
      const next = loadTwoHarmonicCommerceSettings();
      setStudio(next);
      setInventory(next.garments[garmentSlug]?.inventory ?? DEFAULT_INVENTORY);
    };
    sync();
    window.addEventListener('two-harmonic-commerce-updated', sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('two-harmonic-commerce-updated', sync); window.removeEventListener('storage', sync); };
  }, [garmentSlug]);

  useEffect(() => {
    setHasAccess(Boolean(window.localStorage.getItem(ACCESS_KEY)));
    const savedPieces = JSON.parse(window.localStorage.getItem(SAVED_KEY) || '[]') as string[];
    setSaved(savedPieces.includes(garmentSlug));
  }, [garmentSlug]);

  const garmentSettings = studio?.garments[garmentSlug];
  const livePrice = garmentSettings?.price ?? price;
  const liveAudioUrl = garmentSettings?.audioUrl || studio?.audioUrl || audioUrl;
  const reservationsEnabled = garmentSettings?.reservationsEnabled ?? true;
  const accessRequired = garmentSettings?.privateAccessRequired ?? true;
  const stock = inventory[selectedSize] ?? 0;
  const stockLabel = useMemo(() => !reservationsEnabled ? 'Reservations currently paused' : stock <= 0 ? 'Sold out' : stock <= 3 ? `Only ${stock} left` : 'Available for private reservation', [reservationsEnabled, stock]);

  function joinAccess() {
    if (!email.trim() || !email.includes('@')) return;
    window.localStorage.setItem(ACCESS_KEY, JSON.stringify({ email: email.trim(), joinedAt: new Date().toISOString() }));
    setHasAccess(true);
    setAccessOpen(false);
  }

  function toggleSaved() {
    const current = JSON.parse(window.localStorage.getItem(SAVED_KEY) || '[]') as string[];
    const next = current.includes(garmentSlug) ? current.filter((item) => item !== garmentSlug) : [...current, garmentSlug];
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    setSaved(next.includes(garmentSlug));
  }

  function reserve() {
    if (!reservationsEnabled) return;
    if (accessRequired && !hasAccess) {
      setAccessOpen(true);
      return;
    }
    if (stock <= 0) return;
    const bag = JSON.parse(window.localStorage.getItem(BAG_KEY) || '[]') as Array<Record<string, unknown>>;
    bag.push({ garmentSlug, garmentName, selectedSize, price: livePrice, collection: studio?.collectionName ?? 'Beige Frequency', reservedAt: new Date().toISOString() });
    window.localStorage.setItem(BAG_KEY, JSON.stringify(bag));
    setInventory((current) => ({ ...current, [selectedSize]: Math.max(0, stock - 1) }));
    setReserved(true);
  }

  function toggleAudio() {
    const audio = document.getElementById(`two-harmonic-audio-${garmentSlug}`) as HTMLAudioElement | null;
    if (!audio) return;
    if (audio.paused) {
      void audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      {liveAudioUrl && <audio id={`two-harmonic-audio-${garmentSlug}`} src={liveAudioUrl} onEnded={() => setPlaying(false)} preload="metadata" />}

      <div className="mt-5 rounded-[1.8rem] border border-[#d8c7aa]/16 bg-black/20 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#a9967a]">{studio?.dropStatus?.replaceAll('-', ' ') ?? 'Private Commerce'}</p>
            <p className="mt-2 text-sm font-black text-[#f5efe4]">{stockLabel}</p>
          </div>
          <span className="rounded-full border border-[#d8c7aa]/20 px-3 py-1 text-xs font-black text-[#d8c7aa]">{selectedSize} · ${livePrice}</span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button onClick={reserve} disabled={stock <= 0 || !reservationsEnabled} className="rounded-full bg-[#f5efe4] px-5 py-4 text-sm font-black text-[#241b14] disabled:cursor-not-allowed disabled:opacity-40">
            {reserved ? 'Reserved in Private Bag ✓' : accessRequired && !hasAccess ? 'Unlock Private Access' : `Reserve for $${livePrice}`}
          </button>
          <button onClick={toggleSaved} className="rounded-full border border-[#d8c7aa]/25 bg-[#d8c7aa]/8 px-5 py-4 text-sm font-black text-[#f5efe4]">
            {saved ? 'Saved to Archive ✓' : 'Save This Piece'}
          </button>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <button onClick={() => setAccessOpen(true)} className="rounded-full border border-[#d8c7aa]/16 bg-black/20 px-5 py-3 text-xs font-black uppercase tracking-[.14em] text-[#d8c7aa]">
            {hasAccess ? 'Private Access Active' : 'Join Private Access'}
          </button>
          <button onClick={toggleAudio} disabled={!liveAudioUrl} className="rounded-full border border-[#d8c7aa]/16 bg-black/20 px-5 py-3 text-xs font-black uppercase tracking-[.14em] text-[#d8c7aa] disabled:opacity-35">
            {liveAudioUrl ? (playing ? 'Pause Lift U Up' : 'Play Lift U Up') : 'Audio Awaiting Upload'}
          </button>
        </div>

        <p className="mt-4 text-center text-xs leading-5 text-[#806f59]">Studio controls now determine pricing, stock, audio, reservation access, and release state. Live payments, taxes, shipping rates, and fulfillment remain disabled until the production provider is connected.</p>
      </div>

      {accessOpen && (
        <div className="fixed inset-0 z-[140] grid place-items-center bg-black/80 p-5 backdrop-blur-xl">
          <div className="w-full max-w-lg rounded-[2.4rem] border border-[#d8c7aa]/35 bg-[#17110d] p-7 shadow-[0_0_100px_rgba(231,207,157,.2)]">
            <p className="text-xs font-black uppercase tracking-[.28em] text-[#b9a78c]">Frequency No. 2</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-.06em] text-[#f5efe4]">{studio?.privateAccessLabel ?? 'Enter the private release room.'}</h2>
            <p className="mt-4 text-sm leading-7 text-[#a9967a]">{studio?.privateAccessDescription ?? 'Private access unlocks reservations, early collection chapters, owner-only films, and first notice when Beige Frequency becomes available.'}</p>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email address" className="mt-6 w-full rounded-2xl border border-[#d8c7aa]/25 bg-black/30 px-5 py-4 text-[#f5efe4] outline-none placeholder:text-[#806f59] focus:border-[#e7cf9d]" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button onClick={joinAccess} className="rounded-full bg-[#e7cf9d] px-5 py-4 text-sm font-black text-[#1a120a]">Activate Access</button>
              <button onClick={() => setAccessOpen(false)} className="rounded-full border border-[#d8c7aa]/25 px-5 py-4 text-sm font-black text-[#d8c7aa]">Not Yet</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
