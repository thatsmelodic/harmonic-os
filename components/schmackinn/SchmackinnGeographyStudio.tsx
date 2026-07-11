'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

type City = { id: string; slug: string; name: string; state_region: string | null; country: string | null; description: string | null; is_active: boolean; sort_order: number };
type District = { id: string; city_id: string; slug: string; name: string; description: string | null; district_type: string; icon: string; accent: string | null; is_active: boolean; sort_order: number };

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function SchmackinnGeographyStudio() {
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [cityName, setCityName] = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [districtCityId, setDistrictCityId] = useState('');
  const [districtType, setDistrictType] = useState('neighborhood');
  const [icon, setIcon] = useState('📍');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const districtsByCity = useMemo(() => {
    return cities.map((city) => ({ city, districts: districts.filter((district) => district.city_id === city.id) }));
  }, [cities, districts]);

  const load = async () => {
    if (!isSupabaseConfigured) {
      setStatus('Supabase environment variables are not configured.');
      setLoading(false);
      return;
    }
    const supabase = createSupabaseBrowserClient();
    const [{ data: cityData, error: cityError }, { data: districtData, error: districtError }] = await Promise.all([
      supabase.from('schmackinn_cities').select('*').order('sort_order').order('name'),
      supabase.from('schmackinn_districts').select('*').order('sort_order').order('name'),
    ]);
    if (cityError || districtError) setStatus(cityError?.message ?? districtError?.message ?? 'Unable to load geography.');
    setCities((cityData ?? []) as City[]);
    setDistricts((districtData ?? []) as District[]);
    if (!districtCityId && cityData?.[0]?.id) setDistrictCityId(cityData[0].id);
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  const addCity = async (event: FormEvent) => {
    event.preventDefault();
    if (!cityName.trim()) return;
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from('schmackinn_cities').insert({
      name: cityName.trim(), slug: slugify(cityName), state_region: stateRegion.trim() || null, country: 'US', sort_order: cities.length + 1,
    });
    setStatus(error ? error.message : `${cityName.trim()} added to Flavor City.`);
    if (!error) { setCityName(''); setStateRegion(''); await load(); }
  };

  const addDistrict = async (event: FormEvent) => {
    event.preventDefault();
    if (!districtName.trim() || !districtCityId) return;
    const supabase = createSupabaseBrowserClient();
    const cityDistricts = districts.filter((district) => district.city_id === districtCityId);
    const { error } = await supabase.from('schmackinn_districts').insert({
      city_id: districtCityId, name: districtName.trim(), slug: slugify(districtName), district_type: districtType, icon, sort_order: cityDistricts.length + 1,
    });
    setStatus(error ? error.message : `${districtName.trim()} added.`);
    if (!error) { setDistrictName(''); await load(); }
  };

  const toggleCity = async (city: City) => {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from('schmackinn_cities').update({ is_active: !city.is_active }).eq('id', city.id);
    setStatus(error ? error.message : `${city.name} ${city.is_active ? 'archived' : 'restored'}.`);
    if (!error) await load();
  };

  const toggleDistrict = async (district: District) => {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from('schmackinn_districts').update({ is_active: !district.is_active }).eq('id', district.id);
    setStatus(error ? error.message : `${district.name} ${district.is_active ? 'archived' : 'restored'}.`);
    if (!error) await load();
  };

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2.5rem] border border-purple-300/15 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,.2),transparent_28rem),rgba(10,10,10,.9)] p-7 shadow-[0_0_80px_rgba(168,85,247,.15)] sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.34em] text-purple-200/50">Schmackinn Creator Control</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-.07em] sm:text-7xl">Build the food atlas.</h1>
          <p className="mt-5 max-w-3xl leading-8 text-white/55">Add unlimited cities, districts, neighborhoods, campus zones, pop-up corridors, and creator-made food regions without touching code.</p>
        </header>

        {status && <div className="mt-5 rounded-2xl border border-purple-300/20 bg-purple-400/10 p-4 text-sm text-purple-100">{status}</div>}

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <form onSubmit={addCity} className="rounded-[2rem] border border-white/10 bg-white/[.035] p-6">
            <p className="text-xs font-black uppercase tracking-[.24em] text-purple-200/45">Add City</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder="City name" className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3 outline-none" />
              <input value={stateRegion} onChange={(e) => setStateRegion(e.target.value)} placeholder="State / region" className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3 outline-none" />
            </div>
            <button className="mt-4 rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black">Add City</button>
          </form>

          <form onSubmit={addDistrict} className="rounded-[2rem] border border-white/10 bg-white/[.035] p-6">
            <p className="text-xs font-black uppercase tracking-[.24em] text-purple-200/45">Add District</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <select value={districtCityId} onChange={(e) => setDistrictCityId(e.target.value)} className="rounded-2xl border border-white/10 bg-black/80 px-4 py-3">
                <option value="">Choose city</option>{cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}
              </select>
              <input value={districtName} onChange={(e) => setDistrictName(e.target.value)} placeholder="District name" className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3 outline-none" />
              <select value={districtType} onChange={(e) => setDistrictType(e.target.value)} className="rounded-2xl border border-white/10 bg-black/80 px-4 py-3"><option value="neighborhood">Neighborhood</option><option value="campus">Campus</option><option value="late-night">Late Night</option><option value="event">Event / Pop-up</option><option value="creator">Creator District</option></select>
              <input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Icon" className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3 outline-none" />
            </div>
            <button className="mt-4 rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black">Add District</button>
          </form>
        </section>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[.025] p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[.24em] text-purple-200/45">Geography Library</p><h2 className="mt-2 text-3xl font-black">Every city and district</h2></div><span className="rounded-full border border-white/10 px-4 py-2 text-xs font-black text-white/45">{cities.length} cities · {districts.length} districts</span></div>
          {loading ? <p className="mt-6 text-white/45">Loading geography…</p> : <div className="mt-6 grid gap-4 lg:grid-cols-2">{districtsByCity.map(({ city, districts: cityDistricts }) => <article key={city.id} className="rounded-[1.7rem] border border-white/10 bg-black/35 p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="text-2xl font-black">{city.name}</h3><p className="mt-1 text-sm text-white/40">{city.state_region ?? city.country ?? 'Region not set'}</p></div><button onClick={() => void toggleCity(city)} className="rounded-full border border-white/10 px-3 py-2 text-xs font-black text-white/55">{city.is_active ? 'Archive' : 'Restore'}</button></div><div className="mt-5 grid gap-2">{cityDistricts.length ? cityDistricts.map((district) => <div key={district.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.035] p-3"><div><p className="font-black">{district.icon} {district.name}</p><p className="mt-1 text-xs uppercase tracking-[.16em] text-white/30">{district.district_type}</p></div><button onClick={() => void toggleDistrict(district)} className="text-xs font-black text-purple-200/60">{district.is_active ? 'Archive' : 'Restore'}</button></div>) : <p className="text-sm text-white/35">No districts yet.</p>}</div></article>)}</div>}
        </section>
      </div>
    </main>
  );
}
