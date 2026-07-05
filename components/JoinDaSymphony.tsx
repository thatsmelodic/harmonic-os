const groups = [
  ['Melodic', 'Instagram · TikTok · YouTube · Twitch · Patreon'],
  ['2 Harmonic', 'Instagram · Shop · Website'],
  ['Fried Em', 'YouTube · TikTok · Instagram'],
  ['Schmackinn', 'YouTube · TikTok · Instagram'],
  ['Support', 'Cash App · Patreon'],
];

export function JoinDaSymphony() {
  return (
    <section id="symphony" className="harmonic-container py-24">
      <div className="glass-panel relative overflow-hidden rounded-[2.5rem] p-6 md:p-10">
        <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl" />
        <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">Follow the worlds</p>
        <h2 className="mt-3 text-4xl md:text-6xl font-black">Join da Symphony.</h2>
        <p className="mt-4 max-w-2xl text-purple-100/70">The built-in social hub. Every platform organized by world so people can follow the exact frequency they want.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {groups.map(([title, links]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-black/20 p-5 transition hover:bg-white/10">
              <h3 className="font-black">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-purple-100/70">{links}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
