import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { CreatorMissionControl } from '@/components/studio/CreatorMissionControl';
import { AiDirectorV2Studio } from '@/components/studio/AiDirectorV2Studio';

export const metadata = {
  title: 'Creator Studio | Harmonic OS',
  description: 'A categorized control center for world design, content, community, atmosphere, commerce, and administration.',
};

const departments = [
  {
    eyebrow: '01 · Look & Language',
    title: 'Design System',
    description: 'Colors, titles, labels, calls-to-action, backgrounds, particles, seasons, and atmosphere.',
    accent: 'violet',
    tools: [
      { href: '/studio/design', label: 'World Design & Copy', note: 'Change colors, wording, titles, and buttons for every world.' },
      { href: '/studio/atmosphere', label: 'Atmosphere Studio', note: 'Backgrounds, weather, particles, seasons, and global/world overrides.' },
    ],
  },
  {
    eyebrow: '02 · World Content',
    title: 'Universe Management',
    description: 'Everything used to create, publish, and organize the actual content inside each universe.',
    accent: 'cyan',
    tools: [
      { href: '/studio/fried-em', label: 'Fried Em CMS', note: 'Episodes, players, challenges, seasons, and court content.' },
      { href: '/studio/schmackinn/geography', label: 'Schmackinn Geography', note: 'Cities, districts, neighborhoods, campuses, and event zones.' },
      { href: '/studio/schmackinn/creator', label: 'Schmackinn Creator Automation', note: 'Upload one review and generate the connected restaurant ecosystem.' },
      { href: '/studio/universe', label: 'Creator Worlds', note: 'Claim frequencies, manage world capacity, and expand your universe.' },
    ],
  },
  {
    eyebrow: '03 · Audience & Culture',
    title: 'Community Systems',
    description: 'Progression, rewards, callouts, reputation, memberships, and community behavior.',
    accent: 'amber',
    tools: [
      { href: '/studio/progression', label: 'Progression & Rewards', note: 'Rename XP, define level titles, rewards, and community constitutions.' },
      { href: '/worlds/schmackinn/callouts', label: 'Schmackinn Callouts', note: 'Review community recommendations, heat, and Flavor Scout discoveries.' },
    ],
  },
  {
    eyebrow: '04 · Founder Control',
    title: 'Administration',
    description: 'Sensitive controls reserved for platform operations, approvals, and universe governance.',
    accent: 'rose',
    tools: [
      { href: '/studio/admin/expansion', label: 'Expansion Applications', note: 'Approve creators requesting more than three worlds.' },
    ],
  },
];

const accentClasses: Record<string, string> = {
  violet: 'border-violet-300/15 bg-violet-400/[.055] shadow-[0_0_45px_rgba(139,92,246,.1)]',
  cyan: 'border-cyan-300/15 bg-cyan-400/[.055] shadow-[0_0_45px_rgba(54,178,203,.1)]',
  amber: 'border-amber-300/15 bg-amber-400/[.055] shadow-[0_0_45px_rgba(245,158,11,.1)]',
  rose: 'border-rose-300/15 bg-rose-400/[.055] shadow-[0_0_45px_rgba(244,63,94,.1)]',
};

export default function StudioPage() {
  return (
    <main className="min-h-screen px-4 py-8 pb-28 text-white sm:px-6">
      <FrequencyDock />
      <header className="mx-auto max-w-7xl rounded-[2.8rem] border border-white/10 bg-black/45 p-7 backdrop-blur-2xl sm:p-10">
        <p className="text-xs font-black uppercase tracking-[.34em] text-white/35">Creator Headquarters</p>
        <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">One studio. Clear departments.</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/55">Controls are grouped by purpose, so design tools stay with design, Schmackinn tools stay with Schmackinn, and founder systems stay out of everyday creation.</p>
      </header>

      <section className="mx-auto mt-6 grid max-w-7xl gap-5 lg:grid-cols-2">
        {departments.map((department) => (
          <article key={department.title} className={`rounded-[2.4rem] border p-6 backdrop-blur-xl sm:p-8 ${accentClasses[department.accent]}`}>
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/35">{department.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-.06em]">{department.title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/45">{department.description}</p>
            <div className="mt-6 grid gap-3">
              {department.tools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="group rounded-[1.6rem] border border-white/10 bg-black/25 p-5 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[.07]">
                  <div className="flex items-center justify-between gap-4"><h3 className="text-xl font-black">{tool.label}</h3><span className="text-white/30 transition group-hover:translate-x-1">→</span></div>
                  <p className="mt-2 text-sm leading-6 text-white/40">{tool.note}</p>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-8 max-w-7xl rounded-[2.5rem] border border-white/10 bg-black/35 p-5 sm:p-7">
        <p className="text-xs font-black uppercase tracking-[.28em] text-white/30">Live Operations</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-.05em]">Mission Control & AI Direction</h2>
        <p className="mt-2 text-sm text-white/40">Advanced operational panels remain together below the categorized tool directory instead of interrupting everyday navigation.</p>
      </section>
      <CreatorMissionControl />
      <AiDirectorV2Studio />
    </main>
  );
}
