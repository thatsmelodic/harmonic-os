import Link from 'next/link';

const badges = ['Founding Member', 'Season One', 'Early Supporter', 'Community Voice'];
const worlds = ['Fried Em', 'Melodic Universe', 'Schmackinn', '2 Harmonic'];

export const metadata = {
  title: 'Harmonic Identity | Harmonic OS',
  description: 'A clean member profile that expands into a creator headquarters after claiming a frequency.',
};

export default function HarmonicIdentityPage() {
  return (
    <main className="min-h-screen px-4 py-8 pb-28 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex justify-between gap-3"><Link href="/" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Harmonic OS</Link><Link href="/studio/universe" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Claim Your Frequency</Link></nav>
        <section className="overflow-hidden rounded-[2.8rem] border border-white/10 bg-black/55 shadow-[0_0_80px_rgba(255,255,255,.06)] backdrop-blur-2xl">
          <div className="h-52 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,.45),transparent_30rem),radial-gradient(circle_at_bottom_right,rgba(54,178,203,.35),transparent_28rem),#090909]" />
          <div className="px-6 pb-8 sm:px-10">
            <div className="-mt-16 flex flex-wrap items-end justify-between gap-5"><div className="flex items-end gap-5"><div className="grid h-32 w-32 place-items-center rounded-full border-4 border-black bg-white/10 text-5xl">JM</div><div className="pb-2"><p className="text-xs font-black uppercase tracking-[.25em] text-white/35">Member Profile</p><h1 className="mt-2 text-5xl font-black tracking-[-.07em]">Jaelyn</h1><p className="mt-2 text-white/45">@thatsmelodic</p></div></div><button className="rounded-full bg-white px-5 py-3 text-sm font-black text-black">Edit Profile</button></div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/55">Music, fashion, basketball, food, and business—all moving on one frequency.</p>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              <article className="rounded-[2rem] border border-white/10 bg-white/[.035] p-6"><p className="text-xs font-black uppercase tracking-[.2em] text-white/30">Badges</p><div className="mt-4 flex flex-wrap gap-3">{badges.map((badge) => <span key={badge} className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-black text-white/65">{badge}</span>)}</div></article>
              <article className="rounded-[2rem] border border-white/10 bg-white/[.035] p-6"><p className="text-xs font-black uppercase tracking-[.2em] text-white/30">Joined Worlds</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{worlds.map((world) => <div key={world} className="rounded-2xl border border-white/10 bg-black/30 p-4 font-black text-white/65">{world}</div>)}</div></article>
            </div>
            <article className="mt-5 rounded-[2rem] border border-violet-300/15 bg-violet-400/[.06] p-6"><p className="text-xs font-black uppercase tracking-[.2em] text-violet-200/45">Creator Identity Locked</p><h2 className="mt-3 text-3xl font-black tracking-[-.05em]">Found a world and your profile unfolds.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-white/50">Creators unlock banners, philosophy, world links, content, store, community, rewards, analytics, and Creator Headquarters. Members keep a clean personal identity with progress visible privately to them.</p><Link href="/studio/universe" className="mt-5 inline-flex rounded-full bg-violet-400 px-5 py-3 text-sm font-black text-black">Claim Your Frequency</Link></article>
          </div>
        </section>
      </div>
    </main>
  );
}
