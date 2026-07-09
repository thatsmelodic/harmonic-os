import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';

export const metadata = {
  title: 'Creator Worlds Platform | Harmonic OS',
  description: 'Creator Worlds platform page for dashboards, world building, personal AI, communities, media, collabs, rankings, modules, native commerce, intelligence, and creator economy systems.',
};

const dashboard = {
  worldName: 'Melodic Universe',
  ownerHandle: '@thatsmelodic',
  healthScore: 88,
  metrics: [
    { id: 'visits', label: 'World Visits', value: '12.8K', trend: '+18%', note: 'Projected from world activity, content drops, and community return behavior.' },
    { id: 'members', label: 'Active Members', value: '1.4K', trend: '+11%', note: 'Members interacting with rooms, media, comments, and creator updates.' },
    { id: 'revenue', label: 'Revenue Potential', value: '$2.4K+', trend: '+24%', note: 'Estimated from memberships, drops, modules, events, and licensing readiness.' },
    { id: 'approvals', label: 'Approval Queue', value: '7', trend: 'Ready', note: 'AI suggestions, event patches, builder updates, and commerce prompts awaiting approval.' },
  ],
  alerts: [
    { id: 'ai-drop', title: 'AI suggests a drop room', priority: 'high', message: 'Your fashion and music lanes are both warm. A limited drop room could connect the next release to merchandise.', action: 'Preview suggestion' },
    { id: 'community-spike', title: 'Community activity is rising', priority: 'medium', message: 'Members are reacting to food and music rooms. Open a premium lounge before the next upload.', action: 'Create member room' },
    { id: 'commerce-ready', title: 'Commerce path almost ready', priority: 'high', message: 'Memberships, event tickets, and limited drops are prepared conceptually. Checkout and licensing wiring are the next build steps.', action: 'Prepare commerce engine' },
  ],
  modules: [
    { id: 'builder', title: 'World Builder', status: 'ready', description: 'Layout, portals, atmosphere, seasonal overrides, and room blocks.' },
    { id: 'ai', title: 'Personal AI', status: 'active', description: 'Approval-first assistant with explain-why logic and creator rules.' },
    { id: 'community', title: 'Community Hub', status: 'draft', description: 'Channels, roles, premium rooms, announcements, and moderation.' },
    { id: 'media', title: 'Interactive Media', status: 'ready', description: 'Uploads become world events with mood and category reactions.' },
    { id: 'commerce', title: 'Native Commerce', status: 'draft', description: 'Drop rooms, memberships, tickets, digital products, and licensing hooks.' },
    { id: 'marketplace', title: 'Module Store', status: 'locked', description: 'Marketplace for themes, FX, AI personalities, and world modules.' },
  ],
  nextActions: ['Connect World Builder controls to real creator settings.', 'Create approval queue for AI, events, commerce, and builder changes.', 'Wire community rooms and premium access logic.', 'Prepare native commerce engine with memberships, drops, tickets, and licensing.'],
};

const builder = {
  controls: [
    { id: 'lighting', label: 'Lighting', value: 'Purple Neon / Golden Fall', impact: 'Controls glow, contrast, mood, and seasonal tone.' },
    { id: 'atmosphere', label: 'Atmosphere', value: 'Fog, particles, rain, petals, snow', impact: 'Makes each world feel alive instead of flat.' },
    { id: 'layout', label: 'Layout', value: 'Hero + portals + rooms', impact: 'Defines how visitors travel through the world.' },
    { id: 'sound', label: 'Ambient Sound', value: 'Optional world ambience', impact: 'Prepares the future audio/fx layer without forcing sound on users.' },
  ],
  rooms: [
    { id: 'vault', title: 'Media Vault', zone: 'media', purpose: 'Exclusive videos, songs, unreleased content, and private drops.', revenue: 'Memberships and paywalled content.' },
    { id: 'showroom', title: 'Drop Showroom', zone: 'commerce', purpose: 'World-native clothing, merch, digital products, and limited releases.', revenue: 'Native commerce and product drops.' },
    { id: 'plaza', title: 'Community Plaza', zone: 'community', purpose: 'Announcements, member rooms, roles, quests, and creator updates.', revenue: 'Paid community rooms and subscriptions.' },
    { id: 'portal', title: 'Collab Portal', zone: 'collab', purpose: 'Cross-world events, guest creators, shared drops, and media swaps.', revenue: 'Collab fees and revenue splits.' },
    { id: 'stage', title: 'Event Stage', zone: 'events', purpose: 'Premieres, tournaments, listening rooms, pop-ups, and seasonal events.', revenue: 'Tickets, event upgrades, and sponsored moments.' },
    { id: 'studio', title: 'AI Studio', zone: 'ai', purpose: 'Approval-first suggestions, previews, explain-why notes, and creator rules.', revenue: 'Premium AI assistants and advanced automation.' },
  ],
  presets: ['Fall Masterpiece — leaves, rain, warm light, hoodie energy', 'Neon Night — city glow, fog, chrome UI, purple aura', 'Luxury Vault — black crystal, spotlight, soft motion', 'Community Festival — brighter energy, banners, live event feel'],
};

const personalAi = {
  mode: 'Optional + Approval First',
  rules: [
    { title: 'Never publish automatically', detail: 'AI can suggest, preview, and explain. The creator approves before anything changes.' },
    { title: 'Preview before apply', detail: 'Every change needs a before/after summary so the creator can see what the world will become.' },
    { title: 'Editable suggestions', detail: 'The creator can accept part of a suggestion, reject parts, or rewrite the direction.' },
    { title: 'World-aware tone', detail: 'The assistant follows the creator world identity, category lanes, colors, audience, and revenue goals.' },
  ],
  suggestions: [
    { id: 'drop-room', title: 'Build a limited drop room', type: 'commerce', preview: 'Add a neon showroom portal tied to music and fashion lanes.', reason: 'Your highest revenue path is connecting content releases with merch drops.' },
    { id: 'premium-lounge', title: 'Open a premium lounge', type: 'community', preview: 'Add members-only room for behind-the-scenes, unreleased media, and early links.', reason: 'Community activity is high enough to test paid access without forcing checkout.' },
    { id: 'fall-overlay', title: 'Activate Fall Masterpiece overlay', type: 'season', preview: 'Leaves, rain, fog, warm hoodie lighting, and gold-purple contrast.', reason: 'Fall is the flagship season and should feel most immersive.' },
    { id: 'collab-portal', title: 'Prepare collab portal', type: 'collab', preview: 'Create a locked portal for a future creator crossover event.', reason: 'Cross-world movement becomes a monetizable experience, not just a link.' },
  ],
  memoryHooks: ['Brand tone', 'Approved colors', 'Rejected edits', 'Upload cadence', 'Audience reactions', 'Best revenue lanes'],
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
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container py-8">
        <div className="rounded-[2.8rem] border border-purple-200/15 bg-[linear-gradient(135deg,rgba(183,108,255,.18),rgba(54,178,203,.07),rgba(0,0,0,.42))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Platform Layer</p><h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">Creator Worlds</h1><p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">The monetizable creator universe system for Harmonic OS. Creators do not just get pages; they get living worlds powered by platform tools, intelligence, and creator economy systems.</p></div><div className="flex flex-wrap gap-3"><Link href="/studio" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">Open Studio</Link><Link href="/worlds" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Explore Worlds</Link></div></div>
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

        <article className="rounded-[2rem] border border-purple-200/20 bg-black/35 p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">World Builder</p><h2 className="mt-3 text-4xl font-black tracking-[-.08em] sm:text-5xl">Build the world, not a page.</h2><p className="mt-3 max-w-5xl text-sm leading-7 text-white/60">Creator Worlds need layout, atmosphere, portals, rooms, themes, seasons, and revenue zones. This is the builder foundation before drag-and-drop is connected.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-4">{builder.controls.map((control) => <div key={control.id} className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{control.label}</p><p className="mt-2 text-lg font-black text-purple-100">{control.value}</p><p className="mt-2 text-xs leading-6 text-white/45">{control.impact}</p></div>)}</div>
          <div className="mt-6 grid gap-4 xl:grid-cols-3">{builder.rooms.map((room) => <section key={room.id} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><div className="flex items-center justify-between gap-3"><h3 className="text-lg font-black tracking-[-.04em] text-white/82">{room.title}</h3><span className="rounded-full border border-purple-200/15 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] text-purple-100/50">{room.zone}</span></div><p className="mt-2 text-xs leading-6 text-white/48">{room.purpose}</p><p className="mt-3 text-xs leading-6 text-purple-100/50">{room.revenue}</p></section>)}</div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">{builder.presets.map((preset) => <p key={preset} className="rounded-2xl border border-purple-200/10 bg-purple-200/[.045] p-4 text-xs leading-6 text-white/52">{preset}</p>)}</div>
        </article>

        <article className="rounded-[2rem] border border-purple-200/20 bg-[linear-gradient(135deg,rgba(183,108,255,.14),rgba(54,178,203,.05),rgba(0,0,0,.38))] p-5 backdrop-blur-2xl">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Personal AI Assistant</p><h2 className="mt-3 text-4xl font-black tracking-[-.08em] sm:text-5xl">AI that assists, previews, and waits.</h2><p className="mt-3 max-w-5xl text-sm leading-7 text-white/60">Mode: {personalAi.mode}. The AI can recommend world changes, but it cannot publish without creator approval.</p></div><span className="rounded-full border border-purple-200/20 bg-black/30 px-5 py-3 text-sm font-black text-purple-100/65">Approval Required</span></div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">{personalAi.rules.map((rule) => <div key={rule.title} className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-sm font-black text-white/80">{rule.title}</p><p className="mt-2 text-xs leading-6 text-white/45">{rule.detail}</p></div>)}</div>
          <div className="mt-6 grid gap-4 xl:grid-cols-2">{personalAi.suggestions.map((item) => <section key={item.id} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-lg font-black tracking-[-.04em] text-white/82">{item.title}</h3><span className="rounded-full border border-purple-200/15 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] text-purple-100/50">{item.type}</span></div><p className="mt-3 text-xs font-black uppercase tracking-[.16em] text-purple-100/45">Preview</p><p className="mt-2 text-xs leading-6 text-white/50">{item.preview}</p><p className="mt-3 text-xs font-black uppercase tracking-[.16em] text-purple-100/45">Explain Why</p><p className="mt-2 text-xs leading-6 text-white/45">{item.reason}</p><div className="mt-4 flex flex-wrap gap-2"><span className="rounded-full border border-white/10 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.12em] text-white/45">Approve</span><span className="rounded-full border border-white/10 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.12em] text-white/45">Edit</span><span className="rounded-full border border-white/10 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.12em] text-white/45">Reject</span></div></section>)}</div>
          <div className="mt-6 grid gap-3 md:grid-cols-6">{personalAi.memoryHooks.map((hook) => <p key={hook} className="rounded-2xl border border-purple-200/10 bg-purple-200/[.045] p-4 text-xs leading-6 text-white/52">{hook}</p>)}</div>
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
