import { createSupabaseServerClient } from '@/lib/supabase/server';

export type SchmackinnCityRecord = {
  id: string;
  slug: string;
  name: string;
  state_region: string | null;
  country: string | null;
  description: string | null;
  is_active: boolean;
  sort_order: number;
};

export type SchmackinnDistrictRecord = {
  id: string;
  city_id: string;
  slug: string;
  name: string;
  description: string | null;
  district_type: string;
  icon: string;
  accent: string | null;
  is_active: boolean;
  sort_order: number;
};

export async function getSchmackinnGeography() {
  const supabase = await createSupabaseServerClient();
  const [{ data: cities, error: cityError }, { data: districts, error: districtError }] = await Promise.all([
    supabase.from('schmackinn_cities').select('*').eq('is_active', true).order('sort_order').order('name'),
    supabase.from('schmackinn_districts').select('*').eq('is_active', true).order('sort_order').order('name'),
  ]);

  if (cityError) throw cityError;
  if (districtError) throw districtError;

  return {
    cities: (cities ?? []) as SchmackinnCityRecord[],
    districts: (districts ?? []) as SchmackinnDistrictRecord[],
  };
}

export async function getSchmackinnRestaurants() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('schmackinn_restaurants')
    .select('*, schmackinn_districts(id, slug, name, schmackinn_cities(id, slug, name))')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getSchmackinnMapData() {
  const [{ cities, districts }, restaurants] = await Promise.all([
    getSchmackinnGeography(),
    getSchmackinnRestaurants(),
  ]);
  return { cities, districts, restaurants };
}