const hubCards = [
  {
    title: 'Shop Portal',
    href: '/shop',
    label: '2 Harmonic',
    copy: 'Drops, lookbooks, product storytelling, and the first commerce wing for wearable melodies.',
    status: 'Commerce wing',
  },
  {
    title: 'Beat Vault',
    href: '/beats',
    label: 'Melodic',
    copy: 'Beat previews, song-world energy, sound packs, and the audio identity behind every portal.',
    status: 'Sound wing',
  },
  {
    title: 'World Router',
    href: '/#worlds',
    label: 'OS Core',
    copy: 'The main switchboard connecting Melodic, 2 Harmonic, Fried Em, and Schmackinn.',
    status: 'Portal layer',
  },
];

export function CommandHub() {
  return (
    <section className="harmonic-container py-20 md:py-24">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">Command Hub</p>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">Everything routes through here.</h2>
        </div>
        <p className="max-w-xl leading-7 text-purple-100/65">The hub turns Harmonic OS into the control center for content, commerce, music, and every brand world.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {hubCards.map((card) => (
          <a key={card.title} href={card.href} className="portal-sheen glass-panel group block rounded-[2.25rem] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-purple-glow">
            <div className="mb-8 flex items-center justify-between gap-4">
              <span className="rounded-full os-badge px-3 py-1 text-xs uppercase tracking-[0.25em] text-purple-100/60">{card.label}</span>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-purple-300/15 text-xl shadow-purple-glow transition group-hover:scale-110">↗</span>
            </div>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-purple-200/40">{card.status}</p>
            <h3 className="text-3xl font-black">{card.title}</h3>
            <p className="mt-5 leading-7 text-purple-100/70">{card.copy}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
