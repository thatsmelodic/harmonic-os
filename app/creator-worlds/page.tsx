import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { createCreatorWorldDashboard } from '@/lib/creator-world-dashboard';

export const metadata = {
  title: 'Creator Worlds Platform | Harmonic OS',
  description: 'Creator Worlds platform page for dashboards, world building, personal AI, communities, media, collabs, rankings, modules, native commerce, intelligence, and creator economy systems.',
};

const phases = [
  { title: 'Phase 1 — Creator Platform', subtitle: 'The main product surface: creators build worlds instead of profiles.', features: [['🌍', 'Creator Worlds V3', 'Ownable living worlds with identity, categories, modules, activity, and monetization paths.', 'World subscriptions, category add-ons, plans, and future transaction fees.'], ['📊', 'World Dashboard', 'Creator command center for health, revenue readiness, approvals, activity, and next steps.', 'Premium analytics and dashboard upgrades.'], ['🏗️', 'World Builder', 'Customize layout, atmosphere, portals, rooms, themes, and seasonal overlays.', 'Template packs, premium layouts, FX packs, and builder subscriptions.'], ['🤖', 'Personal AI Assistant', 'World-specific assistant with creator rules, explain-why logic, and approval-first editing.', 'Premium AI personalities, category assistants, and advanced automation plans.'], ['💬', 'Community Hub', 'Discord-style channels, roles, announcements, premium rooms, member quests, and moderation.', 'Paid channels, subscriptions, member tiers, and community upgrades.'], ['🎥', 'Interactive Media', 'Uploads create world events through mood, category, engagement, and approved reactions.', 'Paywalled media, vault access, release events, and premium content.'], ['🤝', 'Collaboration Portals', 'Connect worlds for crossovers, shared rooms, collab drops, and split-ready commerce.', 'Collab fees, revenue splits, joint drops, and creator bundles.'], ['💰', 'Native Commerce', 'Storefronts feel like rooms in the world instead of generic checkout.', 'Transaction fees, creator storefronts, subscriptions, tickets, and licensing.'], ['🧩', 'Module Store', 'Creators install optional systems so every world does not feel identical.', 'Marketplace sales, monthly modules, premium templates, and rev-share modules.']] },
  { title: 'Phase 2 — Intelligence', subtitle: 'The brain layer that makes Harmonic OS feel alive and trustworthy.', features: [['🧠', 'Creator Memory Engine', 'Remembers creator preferences, style rules, brand context, approval history, and rejected changes.', 'Premium memory tiers and advanced assistant plans.'], ['⚡', 'Harmonic Event Engine', 'Turns uploads, drops, seasons, holidays, collabs, and milestones into world events.', 'Paid events, event rooms, ticketing, and seasonal activations.'], ['💡', 'Intelligence Completion Engine', 'Explains suggestions, risks, and changes before creator approval.', 'Premium AI workflow, creative direction, and platform retention.'], ['🌀', 'Universal Runtime', 'One runtime for all worlds so future worlds scale without rebuilding the engine.', 'Scalable platform infrastructure for paid modules and many creators.'], ['🌐', 'World Interaction Engine', 'Worlds influence each other through ripples, portals, and approved collab triggers.', 'Cross-world bundles, collab monetization, and marketplace discovery.']] },
  { title: 'Phase 3 — Creator Economy', subtitle: 'The money layer: passport, marketplace, licensing, analytics, rankings, and revenue sharing.', features: [['🎫', 'Creator Passport', 'Identity layer for visitors moving through worlds, memberships, purchases, and achievements.', 'Loyalty, memberships, paid access, and unlock systems.'], ['🛍️', 'Frequency Marketplace', 'Marketplace for themes, FX, AI personalities, templates, modules, music packs, and creator assets.', 'Marketplace commissions, subscriptions, paid listings, and rev-share modules.'], ['📜', 'Licensing Engine', 'Usage-rights layer for beats, templates, themes, modules, clips, and creator IP.', 'License fees, renewals, marketplace commissions, and creator business tools.'], ['🤲', 'Revenue Sharing', 'Tracks splits for collabs, modules, marketplaces, events, and platform fees.', 'Scalable commerce and partnership transactions.'], ['📈', 'Analytics + Rankings', 'Ranks worlds by activity, growth, engagement, category strength, revenue readiness, and community health.', 'Premium analytics, featured discovery, and growth tools.']] },
];

const metrics = [
  { label: 'Creator Type', value: 'World Owner' },
  { label: 'Revenue Paths', value: '20+' },
  { label: 'AI Control', value: 'Approval' },
  { label: 'Platform Phases', value: '3' },
];

export default function CreatorWorldsPage() {
  const dashboard = createCreatorWorldDashboard();

  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container py-8">
        <div className="rounded-[2.8rem] border border-purple-200/15 bg-[linear-gradient(135deg,rgba(183,108,255,.18),rgba(54,178,203,.07),rgba(0,0,0,.42))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Platform Layer</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">Creator Worlds</h1>
              <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">The monetizable creator universe system for Harmonic OS. Creators do not just get pages; they get living worlds powered by platform tools, intelligence, and creator economy systems.</p>
            </div>
            <div className="flex flex-wrap gap-3"><Link href="/studio" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">Open Studio</Link><Link href="/worlds" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Explore Worlds</Link></div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">{metrics.map((metric) => <HeroStat key={metric.label} label={metric.label} value={metric.value} />)}</div>
        </div>
      </section>

      <section className="harmonic-container grid gap-5">
        <article className="rounded-[2rem] border border-purple-200/20 bg-[linear-gradient(135deg,rgba(183,108,255,.16),rgba(54,178,203,.05),rgba(0,0,0,.38))] p-5 backdrop-blur-2xl">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">World Dashboard</p><h2 className="mt-3 text-4xl font-black tracking-[-.08em] sm:text-5xl">{dashboard.worldName}</h2><p className="mt-3 text-sm leading-7 text-white/60">Creator command center for {dashboard.ownerHandle}: health, revenue, AI approvals, community, modules, and next actions.</p></div><div className="rounded-2xl border border-purple-200/20 bg-black/30 p-4 text-center"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">Health</p><p className="mt-2 text-5xl font-black tracking-[-.08em] text-purple-100">{dashboard.healthScore}%</p></div></div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">{dashboard.metrics.map((metric) => <div key={metric.id} className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{metric.label}</p><p className="mt-2 text-3xl font-black tracking-[-.06em] text-purple-100">{metric.value}</p><p className="mt-1 text-xs font-black text-emerald-200/70">{metric.trend}</p><p className="mt-2 text-xs leading-6 text-white/45">{metric.note}</p></div>)}</div>
          <div className="mt-6 grid gap-5 xl:grid-cols-3"><section className="rounded-2xl border border-white/10 bg-black/25 p-4 xl:col-span-2"><p className="text-xs font-black uppercase tracking-[.22em] text-white/35">Approval Queue</p><div className="mt-4 grid gap-3">{dashboard.alerts.map((alert) => <div key={alert.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3"><div className="flex flex-wrap items-center justify-between gap-2"><strong className="text-sm text-white/80">{alert.title}</strong><span className="rounded-full border border-purple-200/15 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] text-purple-100/50">{alert.priority}</span></div><p className="mt-2 text-xs leading-6 text-white/48">{alert.message}</p><p className="mt-2 text-xs font-black uppercase tracking-[.16em] text-purple-100/50">{alert.action}</p></div>)}</div></section><section className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-xs font-black uppercase tracking-[.22em] text-white/35">Next Actions</p><div className="mt-4 grid gap-3">{dashboard.nextActions.map((action) => <p key={action} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-6 text-white/50">{action}</p>)}</div></section></div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">{dashboard.modules.map((module) => <div key={module.id} className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="flex items-center justify-between gap-3"><strong className="text-sm text-white/80">{module.title}</strong><span className="text-xs uppercase tracking-[.14em] text-purple-100/45">{module.status}</span></div><p className="mt-2 text-xs leading-6 text-white/45">{module.description}</p></div>)}</div>
        </article>

        <article className="rounded-[2rem] border border-purple-200/20 bg-[linear-gradient(135deg,rgba(183,108,255,.16),rgba(54,178,203,.05),rgba(0,0,0,.38))] p-5 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Full Platform Programming</p><h2 className="mt-3 text-4xl font-black tracking-[-.08em] sm:text-5xl">All phases. One creator economy.</h2><p className="mt-3 max-w-5xl text-sm leading-7 text-white/60">Creator Worlds is the centerpiece, but the income system needs all three phases connected: platform, intelligence, and economy.</p></article>
        {phases.map((phase) => (<article key={phase.title} className="rounded-[2rem] border border-white/10 bg-black/25 p-5 backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[.22em] text-white/35">Priority Phase</p><h2 className="mt-2 text-3xl font-black tracking-[-.06em] text-white/86">{phase.title}</h2><p className="mt-2 text-sm leading-7 text-white/52">{phase.subtitle}</p><div className="mt-5 grid gap-4 xl:grid-cols-3">{phase.features.map(([emoji, title, purpose, revenue]) => (<section key={title} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><div className="flex items-start gap-3"><span className="text-2xl">{emoji}</span><div><h3 className="text-lg font-black tracking-[-.04em] text-white/82">{title}</h3><p className="mt-2 text-xs leading-6 text-white/48">{purpose}</p></div></div><div className="mt-4 rounded-xl border border-purple-200/10 bg-purple-200/[.045] p-3"><p className="text-[.65rem] font-black uppercase tracking-[.16em] text-purple-100/45">Revenue Impact</p><p className="mt-2 text-xs leading-6 text-white/52">{revenue}</p></div></section>))}</div></article>))}
      </section>
    </main>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.06em] text-purple-100">{value}</p></div>;
}
