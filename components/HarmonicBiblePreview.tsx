const loreEntries = [
  {
    label: 'Origin Object',
    title: 'The Cup',
    copy: 'Creation starts as energy held in the Cup before it pours into music, fashion, food, basketball, community, and business.',
  },
  {
    label: 'Core Symbol',
    title: 'The Heart',
    copy: 'The Harmonic Heart is the soul of the system: harmony, duality, emotion, and the thread connecting every world.',
  },
  {
    label: 'Living Signal',
    title: 'Purple Frequency',
    copy: 'Purple is the creative electricity of Harmonic OS. It glows, travels, pulses, and turns feeling into interface.',
  },
];

const worldLore = [
  ['Melodic', 'Sound, identity, beats, songs, and the source creative frequency.'],
  ['2 Harmonic', 'Fashion, stitched melodies, drops, symbolism, and wearable meaning.'],
  ['Fried Em', 'Basketball, competition, episodes, performance, and court energy.'],
  ['Schmackinn', 'Food reviews, taste, culture, humor, and real reactions.'],
];

export function HarmonicBiblePreview() {
  return (
    <section id="bible" className="harmonic-container py-24">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">The Harmonic Bible</p>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">The OS has lore.</h2>
        </div>
        <p className="max-w-xl leading-7 text-purple-100/62">
          The public lore layer explains why the Cup, Heart, purple frequency, and Four Worlds exist inside one creator operating system.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] items-stretch">
        <div className="glass-panel rounded-[2rem] p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-purple-200/45">Origin Sequence</p>
            <p className="mt-5 text-lg leading-8 text-purple-100/75">
              The Cup pours creative frequency. The frequency forms the Heart. The Heart opens many worlds from one source. Harmonic OS is the interface where that story becomes usable.
            </p>
          </div>
          <a href="#bible-worlds" className="mt-8 inline-flex w-fit rounded-full border border-white/15 px-5 py-3 font-bold text-purple-100 transition hover:border-purple-200/60 hover:bg-white/10">
            Read the World Lore
          </a>
        </div>

        <div className="grid gap-4">
          {loreEntries.map((entry) => (
            <article key={entry.title} className="glass-panel rounded-[2rem] p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">{entry.label}</p>
              <h3 className="mt-3 text-2xl font-black text-purple-50">{entry.title}</h3>
              <p className="mt-3 leading-7 text-purple-100/65">{entry.copy}</p>
            </article>
          ))}
        </div>
      </div>

      <div id="bible-worlds" className="mt-6 glass-panel rounded-[2.5rem] p-6 md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-purple-200/45">Four Worlds</p>
            <h3 className="mt-3 text-3xl font-black md:text-5xl">One source. Four expressions.</h3>
          </div>
          <a href="#worlds" className="rounded-full bg-purple-200 px-5 py-3 text-sm font-black text-black shadow-purple-glow">
            Open Portals
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {worldLore.map(([name, copy]) => (
            <div key={name} className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <h4 className="text-xl font-black text-purple-50">{name}</h4>
              <p className="mt-3 text-sm leading-6 text-purple-100/60">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
