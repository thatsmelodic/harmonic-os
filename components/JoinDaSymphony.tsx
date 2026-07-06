const groups = [
  {
    title: 'Melodic',
    signal: 'Music frequency',
    links: ['Instagram', 'TikTok', 'YouTube', 'Twitch', 'Patreon'],
  },
  {
    title: '2 Harmonic',
    signal: 'Fashion frequency',
    links: ['Instagram', 'Shop', 'Website'],
  },
  {
    title: 'Fried Em',
    signal: 'Basketball frequency',
    links: ['YouTube', 'TikTok', 'Instagram'],
  },
  {
    title: 'Schmackinn',
    signal: 'Food frequency',
    links: ['YouTube', 'TikTok', 'Instagram'],
  },
  {
    title: 'Support',
    signal: 'Community signal',
    links: ['Cash App', 'Patreon'],
  },
];

export function JoinDaSymphony() {
  return (
    <section id="symphony" className="harmonic-container py-20 md:py-24">
      <div className="glass-panel relative overflow-hidden rounded-[2.5rem] p-6 md:p-10">
        <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl" />
        <div className="absolute -bottom-32 left-10 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative">
          <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">Follow the worlds</p>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">Join da Symphony.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-purple-100/70">The built-in social hub. Every platform is organized by world so people can follow the exact frequency they want.</p>
        </div>

        <div className="relative mt-8 grid gap-4 md:grid-cols-5">
          {groups.map((group) => (
            <div key={group.title} className="portal-sheen rounded-3xl border border-white/10 bg-black/20 p-5 transition hover:-translate-y-1 hover:bg-white/10 hover:shadow-purple-glow">
              <p className="text-xs uppercase tracking-[0.22em] text-purple-200/40">{group.signal}</p>
              <h3 className="mt-3 text-xl font-black">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.links.map((link) => (
                  <span key={link} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-purple-100/62">{link}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
