'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Section = 'overview' | 'content' | 'community' | 'commerce' | 'analytics' | 'settings';

const sections: Array<{ id: Section; label: string; icon: string }> = [
  { id: 'overview', label: 'Overview', icon: '◉' },
  { id: 'content', label: 'Content', icon: '▶' },
  { id: 'community', label: 'Community', icon: '◎' },
  { id: 'commerce', label: 'Commerce', icon: '◆' },
  { id: 'analytics', label: 'Analytics', icon: '⌁' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
];

const metricSets: Record<Section, Array<{ label: string; value: string; note: string }>> = {
  overview: [
    { label: 'Members', value: '2,418', note: '+12.4% this month' },
    { label: 'Revenue', value: '$8,420', note: '+18.1% this month' },
    { label: 'Watch time', value: '1,284h', note: '+9.7% this month' },
    { label: 'Orders', value: '186', note: '4.8% conversion' },
  ],
  content: [
    { label: 'Published', value: '42', note: '8 this season' },
    { label: 'Drafts', value: '7', note: '3 need review' },
    { label: 'Scheduled', value: '4', note: 'Next in 2 days' },
    { label: 'Avg. completion', value: '71%', note: '+6% this month' },
  ],
  community: [
    { label: 'Active members', value: '824', note: 'Last 30 days' },
    { label: 'Events', value: '6', note: '2 upcoming' },
    { label: 'Challenges', value: '18', note: '5 awaiting review' },
    { label: 'Reports', value: '3', note: 'Low priority' },
  ],
  commerce: [
    { label: 'Gross sales', value: '$12,940', note: 'Before fees' },
    { label: 'Products', value: '24', note: '19 active' },
    { label: 'Inventory alerts', value: '3', note: 'Restock soon' },
    { label: 'Discount use', value: '31%', note: 'Reward-driven' },
  ],
  analytics: [
    { label: 'Returning visitors', value: '68%', note: '+7% this month' },
    { label: 'Avg. session', value: '18m 42s', note: '+3m this month' },
    { label: 'Member growth', value: '+284', note: 'Last 30 days' },
    { label: 'Revenue/member', value: '$3.48', note: '+11%' },
  ],
  settings: [
    { label: 'Theme', value: 'Live', note: 'Custom visual system' },
    { label: 'Navigation', value: '8 rooms', note: 'All active' },
    { label: 'Constitution', value: 'Required', note: 'Version 1' },
    { label: 'Progression', value: 'Enabled', note: 'Custom naming' },
  ],
};

export function UniversalCreatorHeadquarters() {
  const [section, setSection] = useState<Section>('overview');
  const metrics = useMemo(() => metricSets[section], [section]);

  return (
    <section className="rounded-[2.8rem] border border-white/10 bg-black/55 p-4 text-white shadow-[0_0_80px_rgba(255,255,255,.06)] backdrop-blur-2xl sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[230px_1fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/[.035] p-4">
          <p className="text-xs font-black uppercase tracking-[.28em] text-white/35">Creator Headquarters</p>
          <h1 className="mt-3 text-3xl font-black tracking-[-.05em]">Run your world.</h1>
          <div className="mt-6 grid gap-2">
            {sections.map((item) => <button key={item.id} onClick={() => setSection(item.id)} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black transition ${section === item.id ? 'bg-white text-black' : 'text-white/55 hover:bg-white/[.05] hover:text-white'}`}><span>{item.icon}</span>{item.label}</button>)}
          </div>
          <div className="mt-6 grid gap-2">
            <Link href="/studio/universe" className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-black text-white/55">Manage Worlds</Link>
            <Link href="/studio/progression" className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-black text-white/55">Rewards Studio</Link>
          </div>
        </aside>

        <div>
          <header className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.11),transparent_24rem),rgba(255,255,255,.025)] p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div><p className="text-xs font-black uppercase tracking-[.3em] text-white/35">Universal creator system</p><h2 className="mt-3 text-5xl font-black capitalize tracking-[-.07em] sm:text-7xl">{section}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">One reusable headquarters for content, community, commerce, analytics, rewards, and world settings.</p></div>
              <button className="rounded-full bg-white px-5 py-3 text-sm font-black text-black">Create New</button>
            </div>
          </header>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => <article key={metric.label} className="rounded-[1.7rem] border border-white/10 bg-white/[.035] p-5"><p className="text-xs font-black uppercase tracking-[.18em] text-white/30">{metric.label}</p><p className="mt-3 text-4xl font-black tracking-[-.06em]">{metric.value}</p><p className="mt-2 text-xs text-white/35">{metric.note}</p></article>)}</div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <article className="rounded-[2rem] border border-white/10 bg-white/[.035] p-6"><p className="text-xs font-black uppercase tracking-[.2em] text-white/30">Workspace</p><h3 className="mt-3 text-3xl font-black">Everything this world needs</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{workspaceItems[section].map((item) => <button key={item} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-left text-sm font-black text-white/65 transition hover:border-white/25 hover:text-white">{item} →</button>)}</div></article>
            <article className="rounded-[2rem] border border-white/10 bg-white/[.035] p-6"><p className="text-xs font-black uppercase tracking-[.2em] text-white/30">Recent activity</p><div className="mt-4 grid gap-3">{['Published a new episode', 'Reward unlocked by 38 members', 'Product inventory updated', 'Community event scheduled'].map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-sm font-black">{item}</p><p className="mt-1 text-xs text-white/30">{index + 1} hour{index ? 's' : ''} ago</p></div>)}</div></article>
          </div>
        </div>
      </div>
    </section>
  );
}

const workspaceItems: Record<Section, string[]> = {
  overview: ['Recent activity', 'Quick publish', 'Top products', 'Member pulse'],
  content: ['Episodes', 'Shorts', 'Seasons', 'Drafts', 'Scheduled posts', 'Media library'],
  community: ['Announcements', 'Events', 'Challenges', 'Polls', 'Member roles', 'Moderation'],
  commerce: ['Products', 'Digital downloads', 'Beat licenses', 'Memberships', 'Tickets', 'Orders'],
  analytics: ['Retention', 'Revenue', 'Watch time', 'Conversion', 'Member growth', 'Progression distribution'],
  settings: ['Theme', 'Colors', 'Typography', 'Navigation', 'Constitution', 'Community rules'],
};
