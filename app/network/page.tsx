'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

type WorldId = 'melodic' | 'fried-em' | 'schmackinn' | 'two-harmonic';
type Tab = 'profile' | 'community' | 'quests' | 'events' | 'harmony' | 'analytics';

const worlds: Array<{ id: WorldId; label: string; note: string }> = [
  { id: 'melodic', label: 'Melodic', note: 'Music, memory, releases, and discussion.' },
  { id: 'fried-em', label: 'Fried Em', note: 'Runs, episodes, challenges, and hoops.' },
  { id: 'schmackinn', label: 'Schmackinn', note: 'Food discoveries, reviews, and Flavor City.' },
  { id: 'two-harmonic', label: '2 Harmonic', note: 'Stitched Melodies, styling, and collection stories.' },
];

const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'profile', label: 'My Frequency' },
  { id: 'community', label: 'Community' },
  { id: 'quests', label: 'Quests' },
  { id: 'events', label: 'Events' },
  { id: 'harmony', label: 'Harmony AI' },
  { id: 'analytics', label: 'Intelligence' },
];

const moduleLabels: Record<string, string> = {
  bio: 'Bio', favorite_worlds: 'Favorite Worlds', resonance: 'Resonance', activity: 'Recent Activity',
  location: 'Location', social_links: 'Social Links', saved_items: 'Saved Items', achievements: 'Achievements',
};

export default function HarmonicNetworkPage() {
  const [tab, setTab] = useState<Tab>('profile');
  const [world, setWorld] = useState<WorldId>('melodic');
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [quests, setQuests] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [resonance, setResonance] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [status, setStatus] = useState('Loading Harmonic Network…');
  const [busy, setBusy] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [aiTask, setAiTask] = useState('post_draft');
  const [aiPrompt, setAiPrompt] = useState('');
  const supabase = useMemo(() => isSupabaseConfigured ? createSupabaseBrowserClient() : null, []);

  useEffect(() => {
    if (!supabase) { setStatus('Supabase is not configured.'); return; }
    void boot();
  }, [supabase]);

  useEffect(() => { if (supabase) void loadWorldData(world); }, [world, supabase]);

  async function boot() {
    const { data } = await supabase!.auth.getUser();
    const activeUser = data.user;
    setUser(activeUser ?? null);
    if (activeUser) {
      const [{ data: profileData }, { data: resonanceData }] = await Promise.all([
        supabase!.from('profiles').select('*').eq('id', activeUser.id).maybeSingle(),
        supabase!.from('user_resonance').select('*').eq('user_id', activeUser.id).maybeSingle(),
      ]);
      setProfile(profileData ?? {
        id: activeUser.id, email: activeUser.email, username: activeUser.email?.split('@')[0] ?? 'listener',
        display_name: '', bio: '', location_text: '', favorite_worlds: [], social_links: {}, profile_is_public: true,
        profile_modules: { bio:true, favorite_worlds:true, resonance:true, activity:false, location:false, social_links:true, saved_items:false, achievements:true },
      });
      setResonance(resonanceData ?? { creativity:0, community:0, loyalty:0, exploration:0, archive:0 });
      await track('network_open', world, 'page', 'network');
    }
    await Promise.all([loadWorldData(world), loadAnalytics()]);
    setStatus(activeUser ? 'Network connected.' : 'Browse freely. Sign in to post, RSVP, complete quests, and use Harmony.');
  }

  async function loadWorldData(selectedWorld: WorldId) {
    if (!supabase) return;
    const now = new Date().toISOString();
    const [postResult, questResult, eventResult] = await Promise.all([
      supabase.from('community_posts').select('id,author_id,world_id,category,title,body,media,is_pinned,created_at').eq('world_id', selectedWorld).eq('status','published').order('is_pinned',{ascending:false}).order('created_at',{ascending:false}).limit(30),
      supabase.from('harmonic_quests').select('id,world_id,title,description,quest_type,minimum_objectives,badge_name,starts_at,ends_at,harmonic_quest_objectives(id,title,description,verification_type,target_count,resonance_category,resonance_points,alternative_group,sort_order)').eq('active',true).or(`world_id.eq.${selectedWorld},world_id.is.null`).or(`ends_at.is.null,ends_at.gte.${now}`).order('created_at',{ascending:false}),
      supabase.from('harmonic_events').select('id,world_id,host_id,title,description,event_type,format,starts_at,ends_at,timezone,location_name,online_url,capacity,cover_url,status,accessibility_notes,alternative_participation').eq('world_id',selectedWorld).in('status',['scheduled','live']).order('starts_at',{ascending:true}).limit(20),
    ]);
    setPosts(postResult.data ?? []);
    setQuests(questResult.data ?? []);
    setEvents(eventResult.data ?? []);
  }

  async function loadAnalytics() {
    if (!supabase) return;
    const { data } = await supabase.from('analytics_daily_worlds').select('*').order('day',{ascending:false}).limit(28);
    setAnalytics(data ?? []);
  }

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    if (!user || !profile) return setStatus('Sign in before saving your profile.');
    setBusy(true);
    const payload = {
      id: user.id, email: user.email, username: profile.username || user.email?.split('@')[0], display_name: profile.display_name || null,
      bio: profile.bio || '', avatar_url: profile.avatar_url || null, location_text: profile.location_text || null,
      favorite_worlds: profile.favorite_worlds || [], social_links: profile.social_links || {}, profile_modules: profile.profile_modules,
      profile_is_public: profile.profile_is_public, updated_at: new Date().toISOString(),
    };
    const { error } = await supabase!.from('profiles').upsert(payload, { onConflict: 'id' });
    setStatus(error ? error.message : 'Your Frequency profile is saved.');
    setBusy(false);
  }

  async function createPost(event: FormEvent) {
    event.preventDefault();
    if (!user) return setStatus('Sign in before posting.');
    if (!postBody.trim()) return;
    setBusy(true);
    const { error } = await supabase!.from('community_posts').insert({ author_id:user.id, world_id:world, category:'general', title:postTitle.trim() || null, body:postBody.trim(), status:'published' });
    if (!error) { setPostTitle(''); setPostBody(''); await loadWorldData(world); await track('community_post_created',world,'post','new'); }
    setStatus(error ? error.message : 'Your post is live in the community.');
    setBusy(false);
  }

  async function react(postId: string, reaction: string) {
    if (!user) return setStatus('Sign in to resonate with posts.');
    const { error } = await supabase!.from('community_reactions').upsert({ user_id:user.id,target_type:'post',target_id:postId,reaction }, { onConflict:'user_id,target_type,target_id,reaction' });
    setStatus(error ? error.message : 'Your reaction resonated.');
    if (!error) await track('community_reaction',world,'post',postId,{reaction});
  }

  async function completeObjective(questId: string, objective: any) {
    if (!user) return setStatus('Sign in to progress through quests.');
    const verification = objective.verification_type === 'self_attested' ? 'verified' : 'pending';
    const { error } = await supabase!.from('user_quest_progress').upsert({ user_id:user.id,quest_id:questId,objective_id:objective.id,progress:objective.target_count,completed_at:new Date().toISOString(),verification_status:verification,evidence:{source:'network-ui'} }, { onConflict:'user_id,objective_id' });
    setStatus(error ? error.message : verification === 'verified' ? 'Objective complete. Your path counts.' : 'Objective submitted for verification.');
    if (!error) await track('quest_objective_submitted',world,'quest',questId,{objective_id:objective.id});
  }

  async function rsvp(eventId: string, rsvpStatus: 'going'|'interested') {
    if (!user) return setStatus('Sign in to RSVP.');
    const { error } = await supabase!.from('event_rsvps').upsert({ event_id:eventId,user_id:user.id,status:rsvpStatus,guests:0 }, { onConflict:'event_id,user_id' });
    setStatus(error ? error.message : rsvpStatus === 'going' ? 'You are going.' : 'Event saved as interested.');
    if (!error) await track('event_rsvp',world,'event',eventId,{status:rsvpStatus});
  }

  async function requestHarmony(event: FormEvent) {
    event.preventDefault();
    if (!user) return setStatus('Sign in to work with Harmony.');
    if (!aiPrompt.trim()) return;
    setBusy(true);
    const { data: permissions } = await supabase!.from('user_ai_permissions').select('*').eq('user_id',user.id).maybeSingle();
    const allowed = permissions ?? { allow_saved_items:false,allow_activity_history:false,allow_profile_preferences:true,allow_location:false };
    const { error } = await supabase!.from('harmony_ai_requests').insert({ user_id:user.id,world_id:world,task_type:aiTask,input:{prompt:aiPrompt.trim()},allowed_context:allowed,status:'queued' });
    setStatus(error ? error.message : 'Harmony request queued. The execution route is the next integration step.');
    if (!error) { setAiPrompt(''); await track('harmony_request_created',world,'ai_request','new',{task_type:aiTask}); }
    setBusy(false);
  }

  async function updateAiPermission(key: string, value: boolean) {
    if (!user) return;
    const payload:any = { user_id:user.id, [key]:value, updated_at:new Date().toISOString() };
    const { error } = await supabase!.from('user_ai_permissions').upsert(payload,{onConflict:'user_id'});
    setStatus(error ? error.message : 'Harmony privacy preference updated.');
  }

  async function track(eventName:string, selectedWorld:WorldId, objectType?:string, objectId?:string, properties:Record<string,unknown>={}) {
    if (!supabase) return;
    const anonymousId = typeof window !== 'undefined' ? (localStorage.getItem('harmonic-anonymous-id') || crypto.randomUUID()) : 'server';
    if (typeof window !== 'undefined') localStorage.setItem('harmonic-anonymous-id',anonymousId);
    await supabase.from('analytics_events').insert({ user_id:user?.id ?? null,anonymous_id:user ? null : anonymousId,session_id:anonymousId,event_name:eventName,world_id:selectedWorld,object_type:objectType,object_id:objectId,properties });
  }

  const totalAnalytics = analytics.reduce((sum,row)=>({ views:sum.views+Number(row.views||0), visitors:sum.visitors+Number(row.unique_visitors||0), saves:sum.saves+Number(row.saves||0), comments:sum.comments+Number(row.comments||0), rsvps:sum.rsvps+Number(row.rsvps||0) }),{views:0,visitors:0,saves:0,comments:0,rsvps:0});

  return <main className="min-h-screen bg-[#07050a] px-4 py-8 text-white sm:px-8">
    <div className="mx-auto max-w-7xl">
      <header className="rounded-[2.5rem] border border-white/10 bg-white/[.045] p-6 backdrop-blur-2xl sm:p-10">
        <p className="text-xs font-black uppercase tracking-[.35em] text-purple-200/45">Phase 5 · First Owner Checkpoint</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6"><div><h1 className="text-5xl font-black tracking-[-.07em] sm:text-7xl">Harmonic Network</h1><p className="mt-4 max-w-3xl text-base leading-8 text-white/55">Identity, communities, fair quests, events, Harmony AI requests, and first-party intelligence—built for you to verify before creator access expands.</p></div><a href="/studio" className="rounded-full border border-white/15 px-5 py-3 text-sm font-black">Back to Studio</a></div>
        <div className="mt-6 rounded-2xl border border-purple-300/15 bg-purple-300/[.06] px-4 py-3 text-sm text-purple-100/70">{status}</div>
      </header>

      <section className="mt-6 grid gap-4 lg:grid-cols-[250px_1fr]">
        <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[.035] p-4 lg:sticky lg:top-5">
          <p className="px-2 text-xs font-black uppercase tracking-[.25em] text-white/35">Choose Frequency</p>
          <div className="mt-3 grid gap-2">{worlds.map(item=><button key={item.id} onClick={()=>setWorld(item.id)} className={`rounded-2xl border p-4 text-left ${world===item.id?'border-purple-300/40 bg-purple-300/10':'border-white/8 bg-black/20'}`}><p className="font-black">{item.label}</p><p className="mt-1 text-xs leading-5 text-white/35">{item.note}</p></button>)}</div>
          <div className="mt-5 rounded-2xl border border-white/8 bg-black/25 p-4"><p className="text-xs font-black uppercase tracking-widest text-white/35">Access</p><p className="mt-2 text-sm font-bold">{user ? profile?.display_name || profile?.username || user.email : 'Guest frequency'}</p><p className="mt-1 text-xs text-white/35">{user ? 'Authenticated through Supabase' : 'Public browsing only'}</p></div>
        </aside>

        <div className="rounded-[2.3rem] border border-white/10 bg-white/[.035] p-4 sm:p-7">
          <nav className="grid gap-2 sm:grid-cols-3 xl:grid-cols-6">{tabs.map(item=><button key={item.id} onClick={()=>setTab(item.id)} className={`rounded-2xl px-3 py-4 text-sm font-black ${tab===item.id?'bg-white text-black':'border border-white/10 bg-black/20 text-white/55'}`}>{item.label}</button>)}</nav>

          {tab==='profile' && <section className="mt-7 grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
            <form onSubmit={saveProfile} className="rounded-[2rem] border border-white/10 bg-black/25 p-5"><h2 className="text-3xl font-black">Compose Your Profile</h2><p className="mt-2 text-sm text-white/40">You decide which parts of your identity appear publicly.</p>
              {!user ? <AuthCallout/> : <div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="Display Name" value={profile?.display_name||''} onChange={value=>setProfile({...profile,display_name:value})}/><Field label="Username" value={profile?.username||''} onChange={value=>setProfile({...profile,username:value})}/><Field label="Bio" value={profile?.bio||''} onChange={value=>setProfile({...profile,bio:value})} multiline/><Field label="Location (optional)" value={profile?.location_text||''} onChange={value=>setProfile({...profile,location_text:value})}/><div className="sm:col-span-2"><p className="mb-3 text-xs font-black uppercase tracking-widest text-white/35">Visible Profile Modules</p><div className="grid gap-2 sm:grid-cols-2">{Object.entries(moduleLabels).map(([key,label])=><Toggle key={key} label={label} checked={Boolean(profile?.profile_modules?.[key])} onChange={checked=>setProfile({...profile,profile_modules:{...profile.profile_modules,[key]:checked}})}/>)}</div></div><Toggle label="Public Profile" checked={Boolean(profile?.profile_is_public)} onChange={checked=>setProfile({...profile,profile_is_public:checked})}/><button disabled={busy} className="rounded-2xl bg-purple-200 px-5 py-4 font-black text-black disabled:opacity-50">Save My Frequency</button></div>}
            </form>
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-purple-500/15 to-cyan-400/5 p-5"><p className="text-xs font-black uppercase tracking-[.25em] text-white/35">Public Preview</p><h3 className="mt-4 text-4xl font-black">{profile?.display_name||profile?.username||'Your Frequency'}</h3>{profile?.profile_modules?.bio&&<p className="mt-3 leading-7 text-white/55">{profile?.bio||'Your story will live here.'}</p>} {profile?.profile_modules?.location&&profile?.location_text&&<p className="mt-3 text-sm text-white/40">📍 {profile.location_text}</p>} {profile?.profile_modules?.resonance&&<div className="mt-6 grid grid-cols-2 gap-3">{['creativity','community','loyalty','exploration','archive'].map(key=><Metric key={key} label={key} value={resonance?.[key]??0}/>)}</div>}<p className="mt-6 text-xs leading-5 text-white/30">Frequency is never purchased. It is composed through creativity, community, loyalty, exploration, and archive.</p></div>
          </section>}

          {tab==='community' && <section className="mt-7 grid gap-5 xl:grid-cols-[.75fr_1.25fr]"><form onSubmit={createPost} className="h-fit rounded-[2rem] border border-white/10 bg-black/25 p-5"><h2 className="text-3xl font-black">Post to {worlds.find(item=>item.id===world)?.label}</h2><p className="mt-2 text-sm text-white/40">Build conversation, not hierarchy.</p>{!user?<AuthCallout/>:<div className="mt-5 grid gap-4"><Field label="Title (optional)" value={postTitle} onChange={setPostTitle}/><Field label="What do you want to share?" value={postBody} onChange={setPostBody} multiline/><button disabled={busy||!postBody.trim()} className="rounded-2xl bg-white px-5 py-4 font-black text-black disabled:opacity-30">Publish Post</button></div>}</form><div className="grid gap-4">{posts.length===0?<Empty text="No posts are live in this frequency yet."/>:posts.map(post=><article key={post.id} className="rounded-[2rem] border border-white/10 bg-black/25 p-5"><div className="flex items-center justify-between gap-3"><p className="text-xs font-black uppercase tracking-widest text-purple-200/45">{post.category}{post.is_pinned?' · Pinned':''}</p><time className="text-xs text-white/25">{new Date(post.created_at).toLocaleDateString()}</time></div>{post.title&&<h3 className="mt-3 text-2xl font-black">{post.title}</h3>}<p className="mt-3 whitespace-pre-wrap leading-7 text-white/60">{post.body}</p><div className="mt-5 flex flex-wrap gap-2">{[['resonate','〰 Resonate'],['fire','🔥 Fire'],['love','♥ Love'],['insightful','💡 Insightful'],['funny','😂 Funny']].map(([id,label])=><button key={id} onClick={()=>react(post.id,id)} className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold text-white/55">{label}</button>)}</div></article>)}</div></section>}

          {tab==='quests' && <section className="mt-7"><div className="mb-5"><h2 className="text-4xl font-black">Harmonic Quests</h2><p className="mt-2 max-w-3xl text-white/45">Every quest offers contribution paths. Purchases, paid access, and spending never count toward status.</p></div><div className="grid gap-5 lg:grid-cols-2">{quests.length===0?<Empty text="No active quests are published for this frequency."/>:quests.map(quest=><article key={quest.id} className="rounded-[2rem] border border-white/10 bg-black/25 p-5"><p className="text-xs font-black uppercase tracking-widest text-purple-200/45">{quest.quest_type} · Complete {quest.minimum_objectives}</p><h3 className="mt-3 text-3xl font-black">{quest.title}</h3><p className="mt-2 leading-7 text-white/50">{quest.description}</p>{quest.badge_name&&<div className="mt-4 rounded-2xl border border-yellow-300/15 bg-yellow-300/[.05] p-3 text-sm font-bold text-yellow-100/70">Memory badge: {quest.badge_name}</div>}<div className="mt-5 grid gap-3">{(quest.harmonic_quest_objectives||[]).sort((a:any,b:any)=>a.sort_order-b.sort_order).map((objective:any)=><div key={objective.id} className="rounded-2xl border border-white/8 bg-white/[.025] p-4"><div className="flex justify-between gap-3"><div><p className="font-black">{objective.title}</p><p className="mt-1 text-xs leading-5 text-white/40">{objective.description}</p><p className="mt-2 text-xs font-bold text-purple-200/55">{objective.resonance_points} {objective.resonance_category||'resonance'} · {objective.verification_type.replace('_',' ')}</p></div><button onClick={()=>completeObjective(quest.id,objective)} className="h-fit rounded-full border border-white/15 px-3 py-2 text-xs font-black">Mark Path</button></div></div>)}</div></article>)}</div></section>}

          {tab==='events' && <section className="mt-7"><h2 className="text-4xl font-black">Events Across the Frequency</h2><p className="mt-2 text-white/45">Physical, online, and hybrid experiences—with alternative participation when travel is not possible.</p><div className="mt-5 grid gap-5 lg:grid-cols-2">{events.length===0?<Empty text="No upcoming events are published for this frequency."/>:events.map(item=><article key={item.id} className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/25">{item.cover_url&&<img src={item.cover_url} alt="" className="h-48 w-full object-cover"/>}<div className="p-5"><p className="text-xs font-black uppercase tracking-widest text-purple-200/45">{item.event_type.replaceAll('_',' ')} · {item.format.replace('_',' ')}</p><h3 className="mt-3 text-3xl font-black">{item.title}</h3><p className="mt-2 leading-7 text-white/50">{item.description}</p><div className="mt-4 grid gap-2 text-sm text-white/55"><p>🗓 {new Date(item.starts_at).toLocaleString()}</p>{item.location_name&&<p>📍 {item.location_name}</p>}{item.alternative_participation&&<p>〰 Alternative path: {item.alternative_participation}</p>}</div><div className="mt-5 flex gap-2"><button onClick={()=>rsvp(item.id,'going')} className="rounded-full bg-white px-4 py-3 text-xs font-black text-black">I’m Going</button><button onClick={()=>rsvp(item.id,'interested')} className="rounded-full border border-white/15 px-4 py-3 text-xs font-black">Interested</button></div></div></article>)}</div></section>}

          {tab==='harmony' && <section className="mt-7 grid gap-5 xl:grid-cols-[1fr_.8fr]"><form onSubmit={requestHarmony} className="rounded-[2rem] border border-white/10 bg-black/25 p-5"><p className="text-xs font-black uppercase tracking-[.25em] text-cyan-200/45">Permissioned AI</p><h2 className="mt-3 text-4xl font-black">Ask Harmony</h2><p className="mt-2 leading-7 text-white/45">This checkpoint queues auditable AI jobs. The model execution route comes next.</p>{!user?<AuthCallout/>:<div className="mt-5 grid gap-4"><label className="grid gap-2 text-sm font-bold text-white/60">Task<select value={aiTask} onChange={event=>setAiTask(event.target.value)} className="rounded-2xl border border-white/10 bg-[#120d17] px-4 py-4"><option value="post_draft">Draft a post</option><option value="tag_suggestion">Suggest tags</option><option value="description_draft">Draft a description</option><option value="community_summary">Summarize community</option><option value="related_content">Connect content</option><option value="business_insight">Business insight</option><option value="custom">Custom request</option></select></label><Field label="Tell Harmony what you need" value={aiPrompt} onChange={setAiPrompt} multiline/><button disabled={busy||!aiPrompt.trim()} className="rounded-2xl bg-cyan-200 px-5 py-4 font-black text-black disabled:opacity-30">Queue Harmony Request</button></div>}</form><div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 p-5"><h3 className="text-2xl font-black">Harmony Privacy</h3><p className="mt-2 text-sm leading-6 text-white/40">Context is opt-in. Hidden profile fields are never automatically shared.</p><div className="mt-5 grid gap-3"><Toggle label="Use profile preferences" checked={true} onChange={value=>updateAiPermission('allow_profile_preferences',value)}/><Toggle label="Use saved items" checked={false} onChange={value=>updateAiPermission('allow_saved_items',value)}/><Toggle label="Use activity history" checked={false} onChange={value=>updateAiPermission('allow_activity_history',value)}/><Toggle label="Use location" checked={false} onChange={value=>updateAiPermission('allow_location',value)}/></div><div className="mt-6 rounded-2xl border border-white/8 bg-black/25 p-4 text-xs leading-6 text-white/35">Every request stores its task, allowed context, status, output, and errors for auditing.</div></div></section>}

          {tab==='analytics' && <section className="mt-7"><p className="text-xs font-black uppercase tracking-[.25em] text-green-200/45">Owner-only validation layer</p><h2 className="mt-3 text-4xl font-black">Harmonic Intelligence</h2><p className="mt-2 max-w-3xl leading-7 text-white/45">First-party activity across worlds. This begins as clean measurement before AI turns it into recommendations.</p><div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5"><Metric label="Views" value={totalAnalytics.views}/><Metric label="Visitors" value={totalAnalytics.visitors}/><Metric label="Saves" value={totalAnalytics.saves}/><Metric label="Comments" value={totalAnalytics.comments}/><Metric label="RSVPs" value={totalAnalytics.rsvps}/></div><div className="mt-6 overflow-hidden rounded-[2rem] border border-white/10"><div className="grid grid-cols-6 bg-white/[.06] px-4 py-3 text-xs font-black uppercase tracking-widest text-white/35"><span>Date</span><span>World</span><span>Views</span><span>Visitors</span><span>Comments</span><span>RSVPs</span></div>{analytics.length===0?<div className="p-6 text-white/40">Daily rollups will appear after analytics aggregation begins.</div>:analytics.map((row,index)=><div key={`${row.day}-${row.world_id}-${index}`} className="grid grid-cols-6 border-t border-white/8 px-4 py-4 text-sm text-white/55"><span>{row.day}</span><span>{row.world_id}</span><span>{row.views}</span><span>{row.unique_visitors}</span><span>{row.comments}</span><span>{row.rsvps}</span></div>)}</div></section>}
        </div>
      </section>
    </div>
  </main>;
}

function Field({label,value,onChange,multiline=false}:{label:string;value:string;onChange:(value:string)=>void;multiline?:boolean}) { return <label className={`grid gap-2 text-sm font-bold text-white/60 ${multiline?'sm:col-span-2':''}`}>{label}{multiline?<textarea value={value} onChange={event=>onChange(event.target.value)} rows={5} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none focus:border-purple-300"/>:<input value={value} onChange={event=>onChange(event.target.value)} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none focus:border-purple-300"/>}</label>; }
function Toggle({label,checked,onChange}:{label:string;checked:boolean;onChange:(value:boolean)=>void}) { return <label className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[.025] p-4 text-sm font-bold text-white/60"><span>{label}</span><input type="checkbox" checked={checked} onChange={event=>onChange(event.target.checked)} className="h-5 w-5 accent-purple-300"/></label>; }
function Metric({label,value}:{label:string;value:number}) { return <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-xs font-black uppercase tracking-widest text-white/35">{label}</p><p className="mt-2 text-3xl font-black">{Number(value).toLocaleString()}</p></div>; }
function Empty({text}:{text:string}) { return <div className="rounded-[2rem] border border-dashed border-white/15 bg-black/20 p-8 text-center text-white/40">{text}</div>; }
function AuthCallout() { return <div className="mt-5 rounded-2xl border border-purple-300/15 bg-purple-300/[.06] p-4 text-sm leading-6 text-purple-100/65">Sign in through <a href="/login" className="font-black underline">Harmonic access</a> to use this feature.</div>; }
