-- Admin write access for scalable Schmackinn geography and content.

create or replace function public.is_harmonic_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create policy "admins manage schmackinn cities"
on public.schmackinn_cities
for all
using (public.is_harmonic_admin())
with check (public.is_harmonic_admin());

create policy "admins manage schmackinn districts"
on public.schmackinn_districts
for all
using (public.is_harmonic_admin())
with check (public.is_harmonic_admin());

create policy "admins manage schmackinn restaurants"
on public.schmackinn_restaurants
for all
using (public.is_harmonic_admin())
with check (public.is_harmonic_admin());

create policy "admins manage schmackinn reviews"
on public.schmackinn_reviews
for all
using (public.is_harmonic_admin())
with check (public.is_harmonic_admin());

create policy "admins manage schmackinn callouts"
on public.schmackinn_callouts
for all
using (public.is_harmonic_admin())
with check (public.is_harmonic_admin());

create policy "admins manage schmackinn scout profiles"
on public.schmackinn_scout_profiles
for all
using (public.is_harmonic_admin())
with check (public.is_harmonic_admin());
