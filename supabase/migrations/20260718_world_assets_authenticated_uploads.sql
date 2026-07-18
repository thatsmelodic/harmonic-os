-- Allow signed-in Harmonic OS creators to manage files in the world-assets bucket.
-- Public read access remains controlled by the existing select policy.

insert into storage.buckets (id, name, public)
values ('world-assets', 'world-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "Authenticated creators can upload world assets" on storage.objects;
create policy "Authenticated creators can upload world assets"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'world-assets');

drop policy if exists "Authenticated creators can update world assets" on storage.objects;
create policy "Authenticated creators can update world assets"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'world-assets')
  with check (bucket_id = 'world-assets');

drop policy if exists "Authenticated creators can delete world assets" on storage.objects;
create policy "Authenticated creators can delete world assets"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'world-assets');
