'use client';

import { useEffect, useMemo, useState } from 'react';
import { loadTwoHarmonicCommerceSettings, type TwoHarmonicCommerceSettings } from '@/lib/two-harmonic-commerce';

type Inventory = Record<string, number>;
type ReservationResult = { id?: string; status?: string; expiresAt?: string; unitPrice?: number };

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
  const [reservation, setReservation] = useState<ReservationResult | null>(null);
  const [playing, setPlaying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

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
    const access = window.localStorage.getItem(ACCESS_KEY);
    setHasAccess(Boolean(access));
    if (access) {
      try { setEmail(JSON.parse(access).email ?? ''); } catch { /* ignore malformed preview data */ }
    }
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
    window.localStorage.setItem(ACCESS_KEY, JSON.stringify({ email: email.trim().toLowerCase(), joinedAt: new Date().toISOString() }));
    setHasAccess(true);
    setAccessOpen(false);
  }

  function toggleSaved() {
    const current = JSON.parse(window.localStorage.getItem(SAVED_KEY) || '[]') as string[];
    const next = current.includes(garmentSlug) ? current.filter((item) => item !== garmentSlug) : [...current, garmentSlug];
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    setSaved(next.includes(garmentSlug));
  }

  async function reserve() {
    setError('');
    if (!reservationsEnabled || stock <= 0 || submitting) return;
    if (accessRequired && !hasAccess) {
      setAccessOpen(true);
      return;
    }
    if (!email || !email.includes('@')) {
      setAccessOpen(true);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/two-harmonic/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ garmentSlug, size: selectedSize, email }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Reservation could not be completed.');

      const nextReservation = payload.reservation as ReservationResult;
      setReservation(nextReservation);
      setInventory((current) => ({ ...current, [selectedSize]: Math.max(0, (current[selectedSize] ?? 0) - 1) }));

      const bag = JSON.parse(window.localStorage.getItem(BAG_KEY) || '[]') as Array<Record<string, unknown>>;
      bag.push({
        reservationId: nextReservation.id,
        garmentSlug,
        garmentName,
        selectedSize,
        price: nextReservation.unitPrice ?? livePrice,
        collection: studio?.collectionName ?? 'Beige Frequency',
        expiresAt: nextReservation.expiresAt,
        reservedAt: new Date().toISOString(),
      });
      window.localStorage.setItem(BAG_KEY, JSON.stringify(bag));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Reservation failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
            <p className="mt-2 text-sm font-black text-[#f5efe4]">{reservation ? 'Cloud reservation secured' : stockLabel}</p>
          </div>
          <span className="rounded-full border border-[#d8c7aa]/20 px-3 py-1 text-xs font-black text-[#d8c7aa]">{selectedSize} · ${reservation?.unitPrice ?? livePrice}</span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button onClick={reserve} disabled={stock <= 0 || !reservationsEnabled || submitting || Boolean(reservation)} className="rounded-full bg-[#f5efe4] px-5 py-4 text-sm font-black text-[#241b14] disabled:cursor-not-allowed disabled:opacity-40">
            {reservation ? 'Reserved in Private Bag ✓' : submitting ? 'Securing Your Piece…' : accessRequired && !hasAccess ? 'Unlock Private Access' : `Reserve for $${livePrice}`}
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

        {reservation?.expiresAt && <p className="mt-4 text-center text-xs font-black text-[#e7cf9d]">Held until {new Date(reservation.expiresAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}. Checkout activates next.</p>}
        {error && <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-center text-xs font-black text-red-100">{error}</p>}
        <p className="mt-4 text-center text-xs leading-5 text-[#806f59]">Reservations now use the production cloud inventory lock. Payments, taxes, shipping rates, and fulfillment activate when Stripe credentials are connected.</p>
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
