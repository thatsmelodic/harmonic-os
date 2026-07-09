import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { HarmonicPlatformPhasesPanel } from '@/components/creator-worlds/HarmonicPlatformPhasesPanel';

export const metadata = {
  title: 'Creator Worlds Platform | Harmonic OS',
  description: 'Dedicated Creator Worlds platform page for dashboards, world building, personal AI, communities, media, collabs, rankings, modules, native commerce, intelligence, and creator economy systems.',
};

const systems = [
  { emoji: '🌍', title: 'World Dashboard', purpose: 'The home base for every creator world.', features: ['world health score', 'activity feed', 'module status', 'approval queue', 'revenue readiness'], revenue: 'Premium analytics, creator plans, and dashboard upgrades.' },
  { emoji: '🏗️', title: 'World Builder', purpose: 'Customize layout, atmosphere, portals, themes, and seasonal overlays.', features: ['living hero scene', 'category portals', 'theme presets', 'atmosphere controls', 'drop zones'], revenue: 'Theme packs, premium layouts, templates, and builder subscriptions.' },
  { emoji: '🤖', title: 'Personal AI Assistant', purpose: 'A unique approval-first AI for each creator world.', features: ['creator rules', 'world tone', 'suggestion previews', 'explain-why notes', 'content planning'], revenue: 'Premium AI personalities, category assistants, and advanced automation plans.' },
  { emoji: '💬', title: 'Community Hub', purpose: 'Discord-style channels, roles, announcements, and member rooms.', features: ['channels', 'roles', 'premium rooms', 'mod queue', 'member quests'], revenue: 'Paid channels, subscriptions, private rooms, and fan memberships.' },
  { emoji: '🎥', title: 'Interactive Media System', purpose: 'Uploads influence the world instead of sitting as static posts.', features: ['video impact score', 'mood tags', 'world reactions', 'exclusive vault', 'viewer triggers'], revenue: 'Paywalled media, vault access, exclusive clips, and drop-linked content.' },
  { emoji: '🤝', title: 'Collaboration Portals', purpose: 'Connect worlds for crossovers, events, drops, and shared experiences.', features: ['guest portals', 'shared events', 'collab drops', 'media swaps', 'split-ready hooks'], revenue: 'Collab fees, revenue splits, joint events, and creator bundles.' },
  { emoji: '📈', title: 'World Rankings', purpose: 'Discovery by activity, growth, category, and engagement.', features: ['overall ranks', 'category ranks', 'fastest growing', 'most active', 'featured worlds'], revenue: 'Analytics upgrades and curated discovery without pay-to-win ranking.' },
  { emoji: '🧩', title: 'Module Store', purpose: 'Creators install optional systems instead of everyone getting the same site.', features: ['FX packs', 'AI packs', 'themes', 'commerce modules', 'community tools'], revenue: 'Marketplace sales, subscriptions, rev-share modules, and premium templates.' },
  { emoji: '💰', title: 'Native Commerce', purpose: 'Storefronts that feel like part of the world, not generic checkout.', features: ['drop rooms', 'digital products', 'tickets', 'subscriptions', 'licensing hooks'], revenue: 'Platform take rate, creator storefronts, marketplace sales, and licensing.' },
];

const metrics = [
  { label: 'Creator Type', value: 'World Owner' },
  { label: 'Revenue Paths', value: '20+' },
  { label: 'AI Control', value: 'Approval' },
  { label: 'Platform Phases', value: '3' },
];

const commercePaths = [
  'World memberships for exclusive rooms and private media.',
  'Limited drops through immersive product rooms.',
  'Paid events for tournaments, listening rooms, pop-ups, and streams.',
  'Licensing for beats, templates, themes, FX, and creator modules.',
  'Marketplace sales for packs, layouts, AI personalities, and world upgrades.',
];

export default function CreatorWorldsPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container py-8">
        <div className="rounded-[2.8rem] border border-purple-200/15 bg-[linear-gradient(135deg,rgba(183,108,255,.18),rgba(54,178,203,.07),rgba(0,0,0,.42))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Platform Layer</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">Creator Worlds</h1>
              <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">
                The monetizable creator universe system for Harmonic OS. Creators do not just get pages; they get living worlds powered by platform tools, intelligence, and creator economy systems.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/studio" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">Open Studio</Link>
              <Link href="/worlds" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Explore Worlds</Link>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {metrics.map((metric) => <HeroStat key={metric.label} label={metric.label} value={metric.value} />)}
          </div>
        </div>
      </section>

      <section className="harmonic-container grid gap-5">
        <HarmonicPlatformPhasesPanel />

        <article className="rounded-[2rem] border border-purple-200/20 bg-black/35 p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Creator Worlds Product Surface</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-.08em] sm:text-5xl">The income layer</h2>
          <p className="mt-3 max-w-5xl text-sm leading-7 text-white/60">
            This page is the public-facing foundation for the Creator Worlds platform. The Studio version controls the operating system. This standalone page explains the product, business model, creator value, and revenue paths in a stable build-safe way.
          </p>
        </article>

        <div className="grid gap-4 xl:grid-cols-3">
          {systems.map((system) => (
            <article key={system.title} className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{system.emoji}</span>
                <div>
                  <h3 className="text-xl font-black tracking-[-.04em] text-white/82">{system.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-white/50">{system.purpose}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                {system.features.map((feature) => <p key={feature} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-5 text-white/50 capitalize">{feature}</p>)}
              </div>
              <div className="mt-4 rounded-xl border border-purple-200/10 bg-purple-200/[.045] p-3">
                <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-purple-100/45">Revenue Path</p>
                <p className="mt-2 text-xs leading-6 text-white/56">{system.revenue}</p>
              </div>
            </article>
          ))}
        </div>

        <article className="rounded-[2rem] border border-purple-200/20 bg-[linear-gradient(135deg,rgba(183,108,255,.12),rgba(0,0,0,.36))] p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Native Commerce Readiness</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-.06em]">Commerce should feel like walking into the world.</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {commercePaths.map((path) => <p key={path} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-xs leading-6 text-white/52">{path}</p>)}
          </div>
        </article>
      </section>
    </main>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.06em] text-purple-100">{value}</p></div>;
}
