const worlds = [
  {
    num: '01',
    name: 'Melodic',
    href: '/worlds/melodic',
    signal: 'Music / Sound / Identity',
    copy: 'Songs, beats, visuals, and the creative frequency behind the whole OS.',
  },
  {
    num: '02',
    name: '2 Harmonic',
    href: '/worlds/2-harmonic',
    signal: 'Fashion / Stitched Melodies',
    copy: 'Clothing drops, symbolism, collections, and wearable meaning.',
  },
  {
    num: '03',
    name: 'Fried Em',
    href: '/worlds/fried-em',
    signal: 'Basketball / Competition',
    copy: 'Episodes, challenges, smoke, trash talk, and court energy.',
  },
  {
    num: '04',
    name: 'Schmackinn',
    href: '/worlds/schmackinn',
    signal: 'Food / Culture / Reviews',
    copy: 'Taste tests, food reviews, reactions, and personality.',
  },
];

export function FourWorlds() {
  return (
    <section id="worlds" className="harmonic-container py-24">
      <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">World Select</p>
      <h2 className="mt-3 mb-10 text-4xl md:text-6xl font-black">Choose your frequency.</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {worlds.map((world) => (
          <a key={world.name} href={world.href} className="glass-panel group block rounded-[2.25rem] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-purple-glow md:p-8">
            <div className="mb-8 flex items-center justify-between">
              <span className="rounded-full os-badge px-3 py-1 text-xs text-purple-100/60">WORLD {world.num}</span>
              <span className="h-10 w-10 rounded-full bg-purple-300/20 shadow-purple-glow transition group-hover:scale-110" />
            </div>
            <p className="text-xs uppercase tracking-[0.28em] text-purple-200/45">{world.signal}</p>
            <h3 className="mt-3 text-3xl font-black md:text-4xl">{world.name}</h3>
            <p className="mt-5 leading-7 text-purple-100/70">{world.copy}</p>
            <div className="mt-7 text-sm font-bold text-purple-100/80">Enter World →</div>
          </a>
        ))}
      </div>
    </section>
  );
}
