const worlds = [
  ['01', 'Melodic', 'Music / Sound / Identity', 'Songs, beats, visuals, and the creative frequency behind the whole OS.'],
  ['02', '2 Harmonic', 'Fashion / Stitched Melodies', 'Clothing drops, symbolism, collections, and wearable meaning.'],
  ['03', 'Fried Em', 'Basketball / Competition', 'Episodes, challenges, smoke, trash talk, and court energy.'],
  ['04', 'Schmackinn', 'Food / Culture / Reviews', 'Taste tests, food reviews, reactions, and personality.'],
];

export function FourWorlds() {
  return (
    <section id="worlds" className="harmonic-container py-24">
      <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">World Select</p>
      <h2 className="mt-3 mb-10 text-4xl md:text-6xl font-black">Choose your frequency.</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {worlds.map(([num, name, signal, copy]) => (
          <article key={name} className="glass-panel group rounded-[2.25rem] p-7 md:p-8 transition duration-300 hover:-translate-y-1 hover:shadow-purple-glow">
            <div className="mb-8 flex items-center justify-between">
              <span className="rounded-full os-badge px-3 py-1 text-xs text-purple-100/60">WORLD {num}</span>
              <span className="h-10 w-10 rounded-full bg-purple-300/20 shadow-purple-glow transition group-hover:scale-110" />
            </div>
            <p className="text-xs uppercase tracking-[0.28em] text-purple-200/45">{signal}</p>
            <h3 className="mt-3 text-3xl md:text-4xl font-black">{name}</h3>
            <p className="mt-5 text-purple-100/70 leading-7">{copy}</p>
            <div className="mt-7 text-sm font-bold text-purple-100/80">Enter World →</div>
          </article>
        ))}
      </div>
    </section>
  );
}
