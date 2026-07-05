export function Hero() {
  return (
    <section className="harmonic-container py-24 md:py-32 text-center">
      <p className="text-sm uppercase tracking-[0.45em] text-purple-200/70">Welcome to the universe</p>
      <h2 className="mt-6 text-5xl md:text-8xl font-black tracking-tight neon-text">One Frequency.<br />Many Worlds.</h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-purple-100/75 leading-8">
        Harmonic OS connects Melodic, 2 Harmonic, Fried Em, and Schmackinn into one premium creative operating system.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#worlds" className="rounded-full bg-purple-300 px-7 py-4 font-bold text-black shadow-purple-glow">Choose a World</a>
        <a href="#symphony" className="rounded-full border border-white/15 px-7 py-4 font-bold text-purple-100 glass-panel">Join da Symphony</a>
      </div>
    </section>
  );
}
