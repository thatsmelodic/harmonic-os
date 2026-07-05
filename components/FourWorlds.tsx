export function FourWorlds() {
  return (
    <section id="worlds" className="harmonic-container py-24">
      <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">World Select</p>
      <h2 className="mt-3 mb-10 text-4xl md:text-6xl font-black">Choose your frequency.</h2>
      <div className="grid gap-5 md:grid-cols-2">
        <article className="glass-panel rounded-[2rem] p-8"><h3 className="text-3xl font-black">Melodic</h3><p className="mt-4 text-purple-100/70">Music, sound, beats, videos, and identity.</p></article>
        <article className="glass-panel rounded-[2rem] p-8"><h3 className="text-3xl font-black">2 Harmonic</h3><p className="mt-4 text-purple-100/70">Fashion, drops, symbolism, and wearable meaning.</p></article>
        <article className="glass-panel rounded-[2rem] p-8"><h3 className="text-3xl font-black">Fried Em</h3><p className="mt-4 text-purple-100/70">Basketball content, challenges, and episodes.</p></article>
        <article className="glass-panel rounded-[2rem] p-8"><h3 className="text-3xl font-black">Schmackinn</h3><p className="mt-4 text-purple-100/70">Food reviews, taste, culture, and reactions.</p></article>
      </div>
    </section>
  );
}
