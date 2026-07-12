'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type WorldKey = 'melodic' | 'harmonic' | 'fried-em' | 'schmackinn' | 'business';
type Post = { id: string; world: WorldKey; author: string; body: string; createdAt: number; reactions: number; replies: number };

const STORAGE_KEY = 'harmonic:community:posts:v1';

const worldConfig: Record<WorldKey, { name: string; eyebrow: string; prompt: string; accent: string; topics: string[] }> = {
  melodic: { name: 'Melodic Community', eyebrow: 'Sound · Identity · Creation', prompt: 'Share a song thought, lyric, beat idea, release reaction, or creative question.', accent: '#c084fc', topics: ['Song reactions', 'Lyrics & meaning', 'Beat feedback', 'Release talk'] },
  harmonic: { name: '2 Harmonic Community', eyebrow: 'Fashion · Meaning · Wearable identity', prompt: 'Share a fit, collection reaction, design idea, stitched melody, or styling question.', accent: '#22d3ee', topics: ['Fit checks', 'Drop reactions', 'Design feedback', 'Stitched melodies'] },
  'fried-em': { name: 'Fried Em Community', eyebrow: 'Basketball · Competition · Culture', prompt: 'Talk matchups, episodes, players, challenges, highlights, or call your shot.', accent: '#ff7a1a', topics: ['Game talk', 'Player reactions', 'Challenges', 'Episode debates'] },
  schmackinn: { name: 'Schmackinn Community', eyebrow: 'Food · Reviews · Flavor culture', prompt: 'Drop a recommendation, verdict, restaurant story, tier debate, or Flavor Scout discovery.', accent: '#ff4d8d', topics: ['Recommendations', 'Tier debates', 'Restaurant talk', 'Flavor Scouts'] },
  business: { name: 'Business Community', eyebrow: 'Building · Collaboration · Ownership', prompt: 'Share a founder update, opportunity, collaboration idea, lesson, or business question.', accent: '#60a5fa', topics: ['Founder updates', 'Collaborations', 'Opportunities', 'Lessons learned'] },
};

const seeds: Post[] = [
  { id: 'seed-melodic', world: 'melodic', author: 'Harmonic OS', body: 'What song, beat, or lyric has your frequency right now?', createdAt: 1, reactions: 12, replies: 4 },
  { id: 'seed-harmonic', world: 'harmonic', author: '2 Harmonic', body: 'Which piece should become the next stitched melody?', createdAt: 2, reactions: 18, replies: 7 },
  { id: 'seed-fried', world: 'fried-em', author: 'Fried Em', body: 'Who needs to step on the court next episode?', createdAt: 3, reactions: 21, replies: 9 },
  { id: 'seed-schmackinn', world: 'schmackinn', author: 'Schmackinn', body: 'Name one spot the Flavor Scouts cannot ignore.', createdAt: 4, reactions: 27, replies: 11 },
  { id: 'seed-business', world: 'business', author: 'Founder Frequency', body: 'What are you building, and what kind of collaborator do you need?', createdAt: 5, reactions: 10, replies: 3 },
];

function readPosts(): Post[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : seeds;
  } catch {
    return seeds;
  }
}

function writePosts(posts: Post[]) {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts)); } catch {}
}

export function WorldCommunity({ world, hub = false }: { world?: WorldKey; hub?: boolean }) {
  const [posts, setPosts] = useState<Post[]>(seeds);
  const [body, setBody] = useState('');
  const activeWorld = world ?? 'melodic';
  const config = worldConfig[activeWorld];

  useEffect(() => { setPosts(readPosts()); }, []);

  const visible = useMemo(() => {
    const list = hub ? posts : posts.filter((post) => post.world === activeWorld);
    return [...list].sort((a, b) => b.createdAt - a.createdAt);
  }, [posts, hub, activeWorld]);

  const publish = () => {
    const trimmed = body.trim();
    if (!trimmed) return;
    const next = [{ id: `${Date.now()}`, world: activeWorld, author: 'You', body: trimmed, createdAt: Date.now(), reactions: 0, replies: 0 }, ...posts];
    setPosts(next);
    writePosts(next);
    setBody('');
  };

  const react = (id: string) => {
    const next = posts.map((post) => post.id === id ? { ...post, reactions: post.reactions + 1 } : post);
    setPosts(next);
    writePosts(next);
  };

  return (
    <main className="min-h-screen px-4 py-10 pb-32 text-white sm:px-6">
      <section className="mx-auto max-w-6xl rounded-[2.8rem] border border-white/10 bg-black/45 p-7 backdrop-blur-2xl sm:p-10" style={{ boxShadow: `0 0 90px ${hub ? '#b76cff' : config.accent}22` }}>
        <p className="text-xs font-black uppercase tracking-[.34em] text-white/40">{hub ? 'All Frequencies · One Community System' : config.eyebrow}</p>
        <h1 className="mt-4 text-5xl font-black tracking-[-.07em] sm:text-7xl">{hub ? 'Community Hub' : config.name}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/55">{hub ? 'Every world keeps its own culture, while the hub lets the entire Harmonic community move together.' : config.prompt}</p>
        <div className="mt-7 flex flex-wrap gap-2">
          {(hub ? Object.entries(worldConfig).map(([key, value]) => ({ key, label: value.name })) : config.topics.map((label) => ({ key: label, label }))).map((item) => hub ? (
            <Link key={item.key} href={`/community/${item.key}`} className="rounded-full border border-white/12 bg-white/[.04] px-4 py-2 text-xs font-black text-white/70 transition hover:bg-white/10">{item.label}</Link>
          ) : <span key={item.key} className="rounded-full border border-white/12 bg-white/[.04] px-4 py-2 text-xs font-black text-white/60">{item.label}</span>)}
        </div>
      </section>

      {!hub && (
        <section className="mx-auto mt-6 max-w-6xl rounded-[2.2rem] border border-white/10 bg-black/35 p-5 sm:p-7">
          <label className="text-xs font-black uppercase tracking-[.28em] text-white/35">Add to the conversation</label>
          <textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder={config.prompt} className="mt-3 min-h-28 w-full rounded-[1.5rem] border border-white/10 bg-black/45 p-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/25" />
          <div className="mt-3 flex justify-end"><button onClick={publish} className="rounded-full px-5 py-3 text-sm font-black text-black" style={{ background: config.accent }}>Publish</button></div>
        </section>
      )}

      <section className="mx-auto mt-6 grid max-w-6xl gap-4">
        {visible.map((post) => {
          const postConfig = worldConfig[post.world];
          return (
            <article key={post.id} className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-xs font-black uppercase tracking-[.22em]" style={{ color: postConfig.accent }}>{postConfig.name}</p><h2 className="mt-2 text-lg font-black">{post.author}</h2></div>
                {hub && <Link href={`/community/${post.world}`} className="rounded-full border border-white/10 px-3 py-2 text-[.68rem] font-black text-white/55">Open world</Link>}
              </div>
              <p className="mt-4 text-base leading-7 text-white/75">{post.body}</p>
              <div className="mt-5 flex gap-3 text-xs font-black text-white/50">
                <button onClick={() => react(post.id)} className="rounded-full border border-white/10 px-3 py-2 transition hover:bg-white/10">Frequency + {post.reactions}</button>
                <span className="rounded-full border border-white/10 px-3 py-2">Replies {post.replies}</span>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
