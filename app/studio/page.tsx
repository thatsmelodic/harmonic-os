import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { CreatorMissionControl } from '@/components/studio/CreatorMissionControl';
import { AiDirectorV2Studio } from '@/components/studio/AiDirectorV2Studio';

export const metadata = {
  title: 'Creator Studio | Harmonic OS',
  description: 'A coordinated operating system for worlds, content, commerce, community, environment, AI, analytics, and administration.',
};

const workspaces = [
  {
    eyebrow: '01 · Build',
    title: 'Worlds & Content',
    description: 'Create, publish, and organize each universe without mixing world-specific tools together.',
    accent: 'violet',
    groups: [
      {
        label: 'World Design',
        tools: [
          { href: '/studio/design', label: 'World Design & Copy', note: 'Colors, typography, labels, titles, calls-to-action, and world identity.' },
          { href: '/studio/universe', label: 'Creator Worlds', note: 'World ownership, capacity, modules, portals, permissions, and expansion.' },
        ],
      },
      {
        label: 'World Content',
        tools: [
          { href: '/studio/fried-em', label: 'Fried Em CMS', note: 'Episodes, players, challenges, seasons, courts, and basketball content.' },
          { href: '/studio/schmackinn/geography', label: 'Schmackinn Geography', note: 'Cities, districts, neighborhoods, campuses, and event zones.' },
          { href: '/studio/schmackinn/creator', label: 'Schmackinn Creator Automation', note: 'Upload one review and generate its connected restaurant ecosystem.' },
        ],
      },
    ],
  },
  {
    eyebrow: '02 · Experience',
    title: 'Environment',
    description: 'One home for seasons, weather, particles, lighting, atmosphere, and scope-based overrides.',
    accent: 'cyan',
    groups: [
      {
        label: 'Atmosphere & Seasons',
        tools: [
          { href: '/studio/atmosphere', label: 'Environment Control', note: 'Global season, world overrides, scene overrides, weather, fog, particles, lighting, and custom visuals.' },
        ],
      },
    ],
  },
  {
    eyebrow: '03 · Grow',
    title: 'Community & Progression',
    description: 'Audience systems, rewards, reputation, recommendations, memberships, and cultural behavior.',
    accent: 'amber',
    groups: [
      {
        label: 'Community Systems',
        tools: [
          { href: '/studio/progression', label: 'Progression & Rewards', note: 'XP naming, level titles, rewards, constitutions, and community advancement.' },
          { href: '/worlds/schmackinn/callouts', label: 'Schmackinn Callouts', note: 'Recommendations, heat, Flavor Scout discoveries, and community review signals.' },
        ],
      },
    ],
  },
  {
    eyebrow: '04 · Operate',
    title: 'Commerce & Administration',
    description: 'Founder controls, approvals, expansion, products, inventory, drops, and sensitive operations.',
    accent: 'rose',
    groups: [
      {
        label: 'Commerce',
        tools: [
          { href: '/shop', label: '2 Harmonic Storefront', note: 'Review the live public commerce experience.' },
          { href: '/studio/two-harmonic', label: '2 Harmonic Commerce Studio', note: 'Collections, garments, inventory, release status, private access, and reservations.' },
        ],
      },
      {
        label: 'Founder Control',
        tools: [
          { href: '/studio/admin/expansion', label: 'Expansion Applications', note: 'Approve creators requesting additional worlds and platform capacity.' },
        ],
      },
    ],
  },
];

const accentClasses: Record<string, string> = {
  violet: 'border-violet-300/15 bg-violet-400/[.055] shadow-[0_0_45px_rgba(139,92,246,.1)]',
  cyan: 'border-cyan-300/15 bg-cyan-400/[.055] shadow-[0_0_45px_rgba(54,178,203,.1)]',
  amber: 'border-amber-300/15 bg-amber-400/[.055] shadow-[0_0_45px_rgba(245,158,11,.1)]',
  rose: 'border-rose-300/15 bg-rose-400/[.055] shadow-[0_0_45px_rgba(244,63,94,.1)]',
};

function ToolLink({ href, label, note }: { href: string; label: string; note: string }) {
  return (
    <Link href={href} className="group block rounded-[1.4rem] border border-white/10 bg-black/25 p-5 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[.07]">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-black">{label}</h3>
        <span className="text-white/30 transition group-hover:translate-x-1">→</span>
      </div>
      <p className="mt-2 text-sm leading-6 text-white/40">{note}</p>
    </Link>
  );
}

export default function StudioPage() {
  return (
    <main className="min-h-screen px-4 py-8 pb-28 text-white sm:px-6">
      <FrequencyDock />

      <header className="mx-auto max-w-7xl rounded-[2.8rem] border border-white/10 bg-black/45 p-7 backdrop-blur-2xl sm:p-10">
        <p className="text-xs font-black uppercase tracking-[.34em] text-white/35">Creator Headquarters</p>
        <h1 className="mt-4 text-5xl font-black tracking-[-.07em] sm:text-7xl">One OS. Every function in its proper place.</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/55">
          No features were removed. Tools are now coordinated into workspaces, then nested inside focused dropdowns so the system can scale without becoming a wall of controls.
        </p>
      </header>

      <section className="mx-auto mt-6 grid max-w-7xl gap-4">
        {workspaces.map((workspace, workspaceIndex) => (
          <details
            key={workspace.title}
            open={workspaceIndex === 0}
            className={`group rounded-[2.2rem] border backdrop-blur-xl ${accentClasses[workspace.accent]}`}
          >
            <summary className="cursor-pointer list-none p-6 sm:p-8 [&::-webkit-details-marker]:hidden">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.28em] text-white/35">{workspace.eyebrow}</p>
                  <h2 className="mt-3 text-3xl font-black tracking-[-.05em] sm:text-4xl">{workspace.title}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-white/45">{workspace.description}</p>
                </div>
                <span className="mt-2 text-2xl text-white/35 transition group-open:rotate-45">＋</span>
              </div>
            </summary>

            <div className="grid gap-4 border-t border-white/10 px-6 pb-6 pt-5 sm:px-8 sm:pb-8 lg:grid-cols-2">
              {workspace.groups.map((group) => (
                <details key={group.label} className="rounded-[1.7rem] border border-white/10 bg-black/20" open>
                  <summary className="cursor-pointer list-none px-5 py-4 text-sm font-black uppercase tracking-[.2em] text-white/55 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-3">
                      {group.label}
                      <span className="text-white/30">⌄</span>
                    </span>
                  </summary>
                  <div className="grid gap-3 border-t border-white/10 p-4">
                    {group.tools.map((tool) => <ToolLink key={tool.href} {...tool} />)}
                  </div>
                </details>
              ))}
            </div>
          </details>
        ))}
      </section>

      <section className="mx-auto mt-6 max-w-7xl">
        <details className="group rounded-[2.3rem] border border-fuchsia-300/15 bg-fuchsia-400/[.045] shadow-[0_0_55px_rgba(217,70,239,.1)]">
          <summary className="cursor-pointer list-none p-6 sm:p-8 [&::-webkit-details-marker]:hidden">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[.28em] text-white/35">05 · Intelligence</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-.05em] sm:text-4xl">AI</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/45">Assistant, Director, Brain, memory, explain-why, previews, timelines, runtime, and experimental systems live together here.</p>
              </div>
              <span className="mt-2 text-2xl text-white/35 transition group-open:rotate-45">＋</span>
            </div>
          </summary>

          <div className="border-t border-white/10 p-4 sm:p-6">
            <details className="rounded-[1.8rem] border border-white/10 bg-black/25">
              <summary className="cursor-pointer list-none px-5 py-5 text-lg font-black [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between">Mission Control & AI Director V1 <span className="text-white/30">⌄</span></span>
              </summary>
              <div className="border-t border-white/10"><CreatorMissionControl /></div>
            </details>

            <details className="mt-4 rounded-[1.8rem] border border-white/10 bg-black/25">
              <summary className="cursor-pointer list-none px-5 py-5 text-lg font-black [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between">AI Director V2 & Brain V3 <span className="text-white/30">⌄</span></span>
              </summary>
              <div className="border-t border-white/10"><AiDirectorV2Studio /></div>
            </details>
          </div>
        </details>
      </section>
    </main>
  );
}
