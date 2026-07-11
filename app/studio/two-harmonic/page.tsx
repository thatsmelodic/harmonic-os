'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { beigeGarments } from '@/data/two-harmonic-universe';
import {
  defaultTwoHarmonicCommerceSettings,
  loadTwoHarmonicCommerceSettings,
  saveTwoHarmonicCommerceSettings,
  type TwoHarmonicCommerceSettings,
} from '@/lib/two-harmonic-commerce';

type Section = 'release' | 'garments' | 'media' | 'access' | 'publish';
const sections: Array<{ key: Section; label: string; note: string }> = [
  { key: 'release', label: 'Drop Control', note: 'Collection status, timing, and launch language.' },
  { key: 'garments', label: 'Garments', note: 'Pricing, sizing, and inventory by piece.' },
  { key: 'media', label: 'Media', note: 'Garment imagery, campaign films, and Lift U Up audio.' },
  { key: 'access', label: 'Private Access', note: 'Reservation gates and collector-room messaging.' },
  { key: 'publish', label: 'Publish', note: 'Preview, sync status, and reset controls.' },
];

export default function TwoHarmonicStudioPage() {
  const [settings, setSettings] = useState<TwoHarmonicCommerceSettings>(defaultTwoHarmonicCommerceSettings);
  const [section, setSection] = useState<Section>('release');
  const [garmentSlug, setGarmentSlug] = useState(beigeGarments[0]?.slug ?? 'ivory-frequency-zip');
  const [saved, setSaved] = useState(false);

  useEffect(() => setSettings(loadTwoHarmonicCommerceSettings()), []);
  const garment = useMemo(() => beigeGarments.find((item) => item.slug === garmentSlug) ?? beigeGarments[0], [garmentSlug]);
  const garmentSettings = settings.garments[garmentSlug] ?? {
    price: garment?.price ?? 185,
    inventory: { S: 0, M: 0, L: 0, XL: 0 },
    imageUrl: '', campaignVideoUrl: '', audioUrl: '', releaseDate: '', privateAccessRequired: true, reservationsEnabled: true,
  };

  function patch(next: Partial<TwoHarmonicCommerceSettings>) {
    setSettings((current) => ({ ...current, ...next }));
    setSaved(false);
  }

  function patchGarment(next: Partial<typeof garmentSettings>) {
    setSettings((current) => ({
      ...current,
      garments: { ...current.garments, [garmentSlug]: { ...garmentSettings, ...next } },
    }));
    setSaved(false);
  }

  function commit() {
    saveTwoHarmonicCommerceSettings(settings);
    setSaved(true);
  }

  return (
    <main className="min-h-screen bg-[#070503] px-4 py-8 pb-28 text-[#f5efe4] sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[3rem] border border-[#8c785f]/70 bg-[linear-gradient(145deg,rgba(43,34,27,.95),rgba(10,8,6,.98))] p-7 shadow-[0_0_100px_rgba(231,207,157,.08)] sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-xs font-black uppercase tracking-[.34em] text-[#b9a78c]">Fashion House Studio</p><h1 className="mt-3 text-5xl font-black tracking-[-.07em] sm:text-7xl">Commerce & Content</h1><p className="mt-4 max-w-3xl text-base leading-8 text-[#a9967a]">Control the full Beige Frequency release from one organized room: prices, stock, media, audio, private access, and launch timing.</p></div>
            <Link href="/worlds/two-harmonic" className="rounded-full border border-[#d8c7aa]/25 bg-black/30 px-5 py-3 text-sm font-black text-[#d8c7aa]">Open Fashion House ↗</Link>
          </div>
        </header>

        <div className="mt-6 grid gap-5 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-[2.4rem] border border-[#8c785f]/55 bg-black/35 p-4 lg:sticky lg:top-5">
            <p className="px-2 text-xs font-black uppercase tracking-[.22em] text-[#806f59]">Departments</p>
            <div className="mt-3 grid gap-2">{sections.map((item) => <button key={item.key} onClick={() => setSection(item.key)} className={`rounded-2xl border p-4 text-left ${section === item.key ? 'border-[#e7cf9d] bg-[#e7cf9d] text-[#1a120a]' : 'border-[#d8c7aa]/12 bg-white/[.025] text-[#f5efe4]'}`}><p className="font-black">{item.label}</p><p className={`mt-1 text-xs leading-5 ${section === item.key ? 'text-[#1a120a]/60' : 'text-[#806f59]'}`}>{item.note}</p></button>)}</div>
          </aside>

          <section className="rounded-[2.8rem] border border-[#8c785f]/60 bg-black/35 p-5 sm:p-7">
            {section === 'release' && <div className="grid gap-4 sm:grid-cols-2"><Field label="Collection Name" value={settings.collectionName} onChange={(value) => patch({ collectionName: value })} /><Select label="Drop Status" value={settings.dropStatus} options={['private-preview','coming-soon','live','archived']} onChange={(value) => patch({ dropStatus: value as TwoHarmonicCommerceSettings['dropStatus'] })} /><Field label="Global Release Date" type="datetime-local" value={settings.releaseDate} onChange={(value) => patch({ releaseDate: value })} /><StatusCard title="Runtime Behavior" text="The active drop status and release date are available to every connected garment room and launch surface." /></div>}

            {section === 'garments' && <><GarmentTabs active={garmentSlug} onChange={setGarmentSlug} /><div className="mt-6 grid gap-4 sm:grid-cols-2"><Field label="Price" type="number" value={String(garmentSettings.price)} onChange={(value) => patchGarment({ price: Math.max(0, Number(value) || 0) })} /><Field label="Garment Release Date" type="datetime-local" value={garmentSettings.releaseDate} onChange={(value) => patchGarment({ releaseDate: value })} />{['S','M','L','XL'].map((size) => <Field key={size} label={`${size} Inventory`} type="number" value={String(garmentSettings.inventory[size] ?? 0)} onChange={(value) => patchGarment({ inventory: { ...garmentSettings.inventory, [size]: Math.max(0, Number(value) || 0) } })} />)}<Toggle label="Reservations Enabled" checked={garmentSettings.reservationsEnabled} onChange={(value) => patchGarment({ reservationsEnabled: value })} /><Toggle label="Private Access Required" checked={garmentSettings.privateAccessRequired} onChange={(value) => patchGarment({ privateAccessRequired: value })} /></div></>}

            {section === 'media' && <><GarmentTabs active={garmentSlug} onChange={setGarmentSlug} /><div className="mt-6 grid gap-4"><Field label="Garment Hero Image URL" value={garmentSettings.imageUrl} onChange={(value) => patchGarment({ imageUrl: value })} /><Field label="Garment Campaign Video URL" value={garmentSettings.campaignVideoUrl} onChange={(value) => patchGarment({ campaignVideoUrl: value })} /><Field label="Garment Audio URL" value={garmentSettings.audioUrl} onChange={(value) => patchGarment({ audioUrl: value })} /><Field label="Collection Campaign Video URL" value={settings.campaignVideoUrl} onChange={(value) => patch({ campaignVideoUrl: value })} /><Field label="Default Lift U Up Audio URL" value={settings.audioUrl} onChange={(value) => patch({ audioUrl: value })} /><StatusCard title="Media Priority" text="Garment-specific media overrides collection media. Blank garment fields automatically inherit the collection campaign and audio." /></div></>}

            {section === 'access' && <div className="grid gap-4"><Field label="Private Access Heading" value={settings.privateAccessLabel} onChange={(value) => patch({ privateAccessLabel: value })} /><Field label="Private Access Description" value={settings.privateAccessDescription} onChange={(value) => patch({ privateAccessDescription: value })} multiline /><StatusCard title="Collector Gate" text="Each garment can independently require private access or open reservations to everyone." /></div>}

            {section === 'publish' && <div><div className="grid gap-4 md:grid-cols-3"><StatusCard title="Local Draft" text="Edits remain in this Studio until you publish them." /><StatusCard title="Live Sync" text="Publishing broadcasts a browser event so open garment rooms update without a reload." /><StatusCard title="Production Ready" text="This schema is ready to move from browser storage into Supabase tables next." /></div><div className="mt-6 flex flex-wrap gap-3"><button onClick={commit} className="rounded-full bg-[#e7cf9d] px-6 py-4 text-sm font-black text-[#1a120a]">{saved ? 'Published & Synced ✓' : 'Publish Commerce Settings'}</button><button onClick={() => { setSettings(defaultTwoHarmonicCommerceSettings); setSaved(false); }} className="rounded-full border border-red-300/20 bg-red-400/10 px-6 py-4 text-sm font-black text-red-100">Reset Draft</button></div></div>}
          </section>
        </div>
      </div>
    </main>
  );
}

function GarmentTabs({ active, onChange }: { active: string; onChange: (slug: string) => void }) { return <div className="flex flex-wrap gap-2">{beigeGarments.map((item) => <button key={item.slug} onClick={() => onChange(item.slug)} className={`rounded-full border px-4 py-3 text-sm font-black ${active === item.slug ? 'border-[#e7cf9d] bg-[#e7cf9d] text-[#1a120a]' : 'border-[#d8c7aa]/18 bg-black/20 text-[#d8c7aa]'}`}>{item.name}</button>)}</div>; }
function Field({ label, value, onChange, type = 'text', multiline = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; multiline?: boolean }) { return <label className="rounded-2xl border border-[#d8c7aa]/14 bg-white/[.025] p-4"><span className="text-xs font-black uppercase tracking-[.16em] text-[#806f59]">{label}</span>{multiline ? <textarea rows={5} value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 w-full rounded-xl border border-[#d8c7aa]/15 bg-black/35 px-4 py-3 text-[#f5efe4] outline-none" /> : <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 w-full rounded-xl border border-[#d8c7aa]/15 bg-black/35 px-4 py-3 text-[#f5efe4] outline-none" />}</label>; }
function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) { return <label className="rounded-2xl border border-[#d8c7aa]/14 bg-white/[.025] p-4"><span className="text-xs font-black uppercase tracking-[.16em] text-[#806f59]">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 w-full rounded-xl border border-[#d8c7aa]/15 bg-black/70 px-4 py-3 text-[#f5efe4] outline-none">{options.map((item) => <option key={item} value={item}>{item.replaceAll('-', ' ')}</option>)}</select></label>; }
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) { return <button onClick={() => onChange(!checked)} className="flex items-center justify-between rounded-2xl border border-[#d8c7aa]/14 bg-white/[.025] p-4 text-left"><span className="text-sm font-black">{label}</span><span className={`rounded-full px-3 py-2 text-xs font-black ${checked ? 'bg-[#e7cf9d] text-[#1a120a]' : 'bg-white/10 text-[#806f59]'}`}>{checked ? 'ON' : 'OFF'}</span></button>; }
function StatusCard({ title, text }: { title: string; text: string }) { return <article className="rounded-2xl border border-[#d8c7aa]/14 bg-[#d8c7aa]/5 p-5"><h3 className="text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-[#a9967a]">{text}</p></article>; }
