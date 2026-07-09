import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';

export const metadata = {
  title: 'Launch Lab | Harmonic OS',
  description: 'End-of-day testing hub for Harmonic OS launch readiness, Creator Worlds, economy, effects, media, community, and platform systems.',
};

const testRoutes = [
  { title: 'Creator Worlds', href: '/creator-worlds', status: 'Live Foundation', note: 'Dashboard, builder, AI, community, and platform phases live here.' },
  { title: 'Interactive Media', href: '/creator-worlds/interactive-media', status: 'Media Layer', note: 'Voice notes, messages, video, reactions, rooms, vault, and AI summaries.' },
  { title: 'Economy + Effects', href: '/creator-worlds/economy-effects', status: 'Capital Layer', note: 'Platform fees, referrals, splits, commerce effects, and world reactions.' },
  { title: 'Studio', href: '/studio', status: 'Creator Control', note: 'Creator studio and current control surfaces.' },
  { title: 'Worlds', href: '/worlds', status: 'Explore', note: 'World browsing and public entry points.' },
];

const launchSystems = [
  { system: 'Commerce Engine', ready: 'Backend-ready', detail: 'Products, memberships, tickets, licenses, modules, platform fee math, and checkout readiness are modeled.' },
  { system: 'Economy Engine', ready: 'Backend-ready', detail: 'Referral attribution, promoter share, collaborator share, creator net, and Harmonic platform share are modeled.' },
  { system: 'World Engine', ready: 'Backend-ready', detail: 'Rooms, portals, storefronts, premium vaults, and economy-triggered effects are modeled.' },
  { system: 'AI Approval Engine', ready: 'Backend-ready', detail: 'Suggestions, previews, explain-why, risk notes, approval guardrails, and affected systems are modeled.' },
  { system: 'Community Hub', ready: 'Visible', detail: 'Channels, roles, quests, moderation, accessibility, monetization hooks, and immersive effects are visible.' },
  { system: 'Interactive Media', ready: 'Visible', detail: 'Communication and media experiences are visible through a dedicated route.' },
];

const testChecklist = [
  'Open /creator-worlds and confirm the page loads on mobile and desktop.',
  'Scroll through Dashboard, World Builder, Personal AI, Community Hub, and Platform Phases.',
  'Open /creator-worlds/interactive-media and test the media system route.',
  'Open /creator-worlds/economy-effects and test the capital + world effects route.',
  'Check that the FrequencyDock does not cover important content on mobile.',
  'Confirm buttons route correctly: Studio, Worlds, Back to Creator Worlds.',
  'Capture screenshots of anything visually broken, cramped, or missing.',
  'Do not add new features until the latest Vercel deployment is green.',
];

const nextProductionWiring = [
  'Stripe Checkout + Stripe Connect for creator payouts.',
  'Supabase tables for worlds, rooms, products, orders, memberships, referrals, and AI approvals.',
  'Auth roles for creator, fan, member, premium supporter, moderator, and admin.',
  'Real approval queue actions: approve, edit, reject, preview, publish.',
  'Analytics dashboard: traffic, conversion, revenue, affiliate source, community pulse.',
];

export default function LaunchLabPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container grid gap-5 py-8">
        <article className="rounded-[2.8rem] border border-purple-200/15 bg-[linear-gradient(135deg,rgba(183,108,255,.18),rgba(54,178,203,.08),rgba(0,0,0,.42))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-7">
          <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">End-of-Day Launch Testing</p>
          <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">Harmonic OS Launch Lab</h1>
          <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">One place to test the live prototype, verify the creator platform surfaces, and keep the next production wiring focused on payments, database, roles, approvals, and analytics.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <Stat label="Launch Focus" value="Testing" />
            <Stat label="Creator Core" value="Live" />
            <Stat label="Money Layer" value="Modeled" />
            <Stat label="Next Wiring" value="Stripe" />
          </div>
        </article>

        <article className="rounded-[2rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Test Routes</p>
          <div className="mt-5 grid gap-4 xl:grid-cols-5">
            {testRoutes.map((route) => (
              <Link key={route.href} href={route.href} className="rounded-2xl border border-white/10 bg-white/[.035] p-4 transition hover:bg-white/[.07]">
                <h2 className="text-lg font-black text-white/82">{route.title}</h2>
                <p className="mt-2 text-xs font-black uppercase tracking-[.14em] text-purple-100/45">{route.status}</p>
                <p className="mt-3 text-xs leading-6 text-white/48">{route.note}</p>
              </Link>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">System Status</p>
          <div className="mt-5 grid gap-4 xl:grid-cols-3">
            {launchSystems.map((item) => (
              <section key={item.system} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                <h2 className="text-lg font-black text-white/82">{item.system}</h2>
                <p className="mt-2 text-xs font-black uppercase tracking-[.14em] text-cyan-100/45">{item.ready}</p>
                <p className="mt-3 text-xs leading-6 text-white/48">{item.detail}</p>
              </section>
            ))}
          </div>
        </article>

        <div className="grid gap-5 xl:grid-cols-2">
          <article className="rounded-[2rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Testing Checklist</p>
            <div className="mt-4 grid gap-3">{testChecklist.map((item) => <p key={item} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-6 text-white/50">{item}</p>)}</div>
          </article>
          <article className="rounded-[2rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Next Production Wiring</p>
            <div className="mt-4 grid gap-3">{nextProductionWiring.map((item) => <p key={item} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-6 text-white/50">{item}</p>)}</div>
          </article>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.06em] text-purple-100">{value}</p></div>;
}
