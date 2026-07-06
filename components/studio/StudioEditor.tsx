'use client';

import { FormEvent, useEffect, useState } from 'react';
import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

type CopyRow = {
  id: string;
  route: string;
  label: string;
  headline: string;
  subheadline: string;
  primary_cta: string;
  secondary_cta: string | null;
};

type AssetRow = {
  id: string;
  title: string;
  asset_type: 'image' | 'video' | 'audio' | 'document';
  world: string | null;
  bucket: string;
  path: string;
  public_url: string | null;
  created_at: string;
};

const bucketLabels: Record<string, string> = {
  'brand-assets': 'Brand Assets',
  'world-media': 'World Media',
  'shop-assets': 'Shop Assets',
  beats: 'Beats',
  'community-uploads': 'Community Uploads',
};

export function StudioEditor() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [copy, setCopy] = useState<CopyRow | null>(null);
  const [message, setMessage] = useState('');
  const [assetMessage, setAssetMessage] = useState('');
  const [assetTitle, setAssetTitle] = useState('');
  const [assetType, setAssetType] = useState<'image' | 'video' | 'audio' | 'document'>('image');
  const [bucket, setBucket] = useState('brand-assets');
  const [assets, setAssets] = useState<AssetRow[]>([]);
  const [assetsLoading, setAssetsLoading] = useState(false);

  async function loadAssets() {
    if (!isSupabaseConfigured) return;
    setAssetsLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase
      .from('assets')
      .select('id,title,asset_type,world,bucket,path,public_url,created_at')
      .order('created_at', { ascending: false })
      .limit(24);

    if (!error && data) setAssets(data as AssetRow[]);
    setAssetsLoading(false);
  }

  useEffect(() => {
    async function loadStudio() {
      if (!isSupabaseConfigured) return;
      const supabase = createSupabaseBrowserClient();
      const { data: authData } = await supabase.auth.getUser();
      setUserEmail(authData.user?.email ?? null);

      const { data } = await supabase.from('cms_copy').select('*').eq('id', 'home-hero').single();
      if (data) setCopy(data as CopyRow);
      await loadAssets();
    }

    loadStudio();
  }, []);

  async function saveCopy(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!copy) return;
    setMessage('');
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from('cms_copy')
      .update({
        headline: copy.headline,
        subheadline: copy.subheadline,
        primary_cta: copy.primary_cta,
        secondary_cta: copy.secondary_cta,
        updated_at: new Date().toISOString(),
      })
      .eq('id', copy.id);

    setMessage(error ? error.message : 'Homepage copy saved to Supabase.');
  }

  async function uploadAsset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAssetMessage('');
    const input = document.getElementById('asset-file') as HTMLInputElement | null;
    const file = input?.files?.[0];

    if (!file) {
      setAssetMessage('Choose a file first.');
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const { data: authData } = await supabase.auth.getUser();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const path = `${Date.now()}-${safeName}`;
    const upload = await supabase.storage.from(bucket).upload(path, file, { upsert: false });

    if (upload.error) {
      setAssetMessage(upload.error.message);
      return;
    }

    const publicUrl = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
    const insert = await supabase.from('assets').insert({
      title: assetTitle || file.name,
      asset_type: assetType,
      world: 'system',
      bucket,
      path,
      public_url: publicUrl,
      created_by: authData.user?.id,
    });

    if (insert.error) {
      setAssetMessage(insert.error.message);
      return;
    }

    setAssetMessage('Asset uploaded and saved.');
    setAssetTitle('');
    if (input) input.value = '';
    await loadAssets();
  }

  async function copyAssetUrl(publicUrl: string | null) {
    if (!publicUrl) return;
    await navigator.clipboard.writeText(publicUrl);
    setAssetMessage('Asset URL copied.');
  }

  if (!isSupabaseConfigured) {
    return <div className="glass-panel rounded-[2rem] p-6 text-purple-100/70">Supabase variables are not configured yet.</div>;
  }

  if (!userEmail) {
    return (
      <div className="glass-panel rounded-[2rem] p-6">
        <h2 className="text-3xl font-black">Creator login required.</h2>
        <p className="mt-3 text-purple-100/65">Log in to edit copy and upload assets.</p>
        <a href="/login" className="mt-5 inline-flex rounded-full bg-purple-300 px-6 py-3 font-black text-black shadow-purple-glow">Log In</a>
      </div>
    );
  }

  return (
    <>
      <section className="grid gap-5 md:grid-cols-2">
        <form onSubmit={saveCopy} className="glass-panel rounded-[2.5rem] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Signed in as {userEmail}</p>
          <h2 className="mt-3 text-3xl font-black">Edit Homepage Copy</h2>
          {copy ? (
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-sm font-bold text-purple-100/70">Headline
                <input value={copy.headline} onChange={(event) => setCopy({ ...copy, headline: event.target.value })} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-purple-100/70">Subheadline
                <textarea value={copy.subheadline} onChange={(event) => setCopy({ ...copy, subheadline: event.target.value })} rows={5} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-purple-100/70">Primary Button
                <input value={copy.primary_cta} onChange={(event) => setCopy({ ...copy, primary_cta: event.target.value })} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
              </label>
              <button className="rounded-full bg-purple-300 px-6 py-4 font-black text-black shadow-purple-glow">Save Copy</button>
              {message && <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-purple-100/70">{message}</div>}
            </div>
          ) : (
            <p className="mt-5 text-purple-100/65">Run the Supabase schema first, then reload this page.</p>
          )}
        </form>

        <form onSubmit={uploadAsset} className="glass-panel rounded-[2.5rem] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Asset Library</p>
          <h2 className="mt-3 text-3xl font-black">Upload Logos, Cup, Beats, Videos</h2>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-bold text-purple-100/70">Asset Title
              <input value={assetTitle} onChange={(event) => setAssetTitle(event.target.value)} placeholder="Purple cup, heart logo, Fried Em intro..." className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-purple-100/70">Type
              <select value={assetType} onChange={(event) => setAssetType(event.target.value as any)} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="document">Document</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-purple-100/70">Storage Bucket
              <select value={bucket} onChange={(event) => setBucket(event.target.value)} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">
                <option value="brand-assets">Brand Assets</option>
                <option value="world-media">World Media</option>
                <option value="shop-assets">Shop Assets</option>
                <option value="beats">Beats</option>
                <option value="community-uploads">Community Uploads</option>
              </select>
            </label>
            <input id="asset-file" type="file" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-purple-100/70" />
            <button className="rounded-full bg-purple-300 px-6 py-4 font-black text-black shadow-purple-glow">Upload Asset</button>
            {assetMessage && <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-purple-100/70">{assetMessage}</div>}
          </div>
        </form>
      </section>

      <section className="glass-panel mt-5 rounded-[2.5rem] p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Uploaded Assets</p>
            <h2 className="mt-3 text-3xl font-black">Live Asset Library</h2>
            <p className="mt-2 text-sm text-purple-100/60">Preview uploads, open files, and copy public URLs.</p>
          </div>
          <button type="button" onClick={loadAssets} className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/80 hover:border-purple-300/70">
            {assetsLoading ? 'Refreshing...' : 'Refresh Library'}
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {assets.map((asset) => (
            <article key={asset.id} className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/25">
              <div className="flex aspect-video items-center justify-center overflow-hidden bg-white/5">
                {asset.asset_type === 'image' && asset.public_url ? (
                  <img src={asset.public_url} alt={asset.title} className="h-full w-full object-contain p-4" />
                ) : asset.asset_type === 'video' && asset.public_url ? (
                  <video src={asset.public_url} controls className="h-full w-full" />
                ) : asset.asset_type === 'audio' && asset.public_url ? (
                  <audio src={asset.public_url} controls className="w-11/12" />
                ) : (
                  <div className="px-6 text-center text-sm font-bold uppercase tracking-[0.25em] text-purple-100/45">{asset.asset_type}</div>
                )}
              </div>
              <div className="grid gap-3 p-4">
                <div>
                  <h3 className="text-lg font-black text-purple-50">{asset.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-purple-100/45">{bucketLabels[asset.bucket] ?? asset.bucket} • {asset.asset_type}</p>
                </div>
                <p className="break-all rounded-2xl bg-white/5 p-3 text-xs text-purple-100/50">{asset.path}</p>
                <div className="grid grid-cols-2 gap-2">
                  {asset.public_url && (
                    <a href={asset.public_url} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-3 text-center text-sm font-black text-purple-100/80 hover:border-purple-300/70">Open</a>
                  )}
                  <button type="button" onClick={() => copyAssetUrl(asset.public_url)} className="rounded-full bg-purple-300 px-4 py-3 text-sm font-black text-black shadow-purple-glow">Copy URL</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!assetsLoading && assets.length === 0 && (
          <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-purple-100/60">No assets uploaded yet. Upload your first logo, cup, beat, or video above.</div>
        )}
      </section>
    </>
  );
}
