import Link from 'next/link';

const rooms = [
  ['Home', 'The front door to the world.'],
  ['Media', 'Episodes, shorts, livestreams, and releases.'],
  ['Community', 'Announcements, events, polls, challenges, and members.'],
  ['Store', 'Physical products, downloads, memberships, tickets, and services.'],
  ['Rewards', 'Progression, milestones, badges, discounts, and access.'],
  ['Leaderboard', 'Community recognition configured by the creator.'],
  ['About', 'Philosophy, constitution, story, and social links.'],
  ['Settings', 'Theme, navigation, rules, visibility, and world controls.'],
];

export default async function CreatorWorldTemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');

  return (
    <main className="min-h-screen px-4 py-8 pb-28 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/creator-worlds" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Creator Worlds</Link><Link href="/studio/headquarters" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Creator Headquarters</Link></nav>
        <header className="rounded-[2.8rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(54,178,203,.2),transparent_28rem),radial-gradient(circle_at_bottom_right,rgba(139,92,246,.2),transparent_30rem),rgba(0,0,0,.62)] p-7 shadow-[0_0_80px_rgba(255,255,255,.06)] backdrop-blur-2xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.34em] text-white/35">Creator World Template</p>
          <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/55">This frequency was generated with the complete Harmonic creator framework. The creator can now customize the culture, content, commerce, community, rewards, and visual identity without writing code.</p>
          <div className="mt-6 flex flex-wrap gap-3"><span className="rounded-full border border-cyan-300/15 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-100">Draft World</span><span className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm font-black text-white/60">8 starter rooms</span></div>
        </header>
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{rooms.map(([name, description], index) => <article key={name} className="rounded-[1.8rem] border border-white/10 bg-black/45 p-5 backdrop-blur-xl"><div className="flex items-center justify-between"><span className="text-xs font-mono text-white/25">0{index + 1}</span><span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,.8)]" /></div><h2 className="mt-5 text-2xl font-black tracking-[-.04em]">{name}</h2><p className="mt-3 text-sm leading-6 text-white/45">{description}</p><button className="mt-5 text-sm font-black text-cyan-200">Configure →</button></article>)}</section>
        <section className="mt-6 rounded-[2rem] border border-white/10 bg-black/45 p-6"><p className="text-xs font-black uppercase tracking-[.24em] text-white/30">Framework complete</p><h2 className="mt-3 text-4xl font-black tracking-[-.06em]">The platform layer stops here.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-white/50">Future work can focus on first-party Harmonic worlds while every outside creator inherits this same reusable foundation.</p></section>
      </div>
    </main>
  );
}
