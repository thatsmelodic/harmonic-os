export function HarmonicBiblePreview() {
  return (
    <section className="harmonic-container py-24">
      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] items-stretch">
        <div className="glass-panel rounded-[2rem] p-8 flex flex-col justify-between">
          <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">The Harmonic Bible</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-black">The OS has lore.</h2>
          <a href="#" className="mt-8 inline-flex w-fit rounded-full border border-white/15 px-5 py-3 font-bold text-purple-100">Read More</a>
        </div>
        <div className="glass-panel rounded-[2rem] p-8">
          <p className="text-lg leading-8 text-purple-100/75">
            The Cup pours creative frequency. The frequency forms the Heart. The Heart opens many worlds from one source. Harmonic OS is the interface where that story becomes usable.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/5 p-4">Cup = Creation</div>
            <div className="rounded-2xl bg-white/5 p-4">Heart = Harmony</div>
            <div className="rounded-2xl bg-white/5 p-4">Purple = Frequency</div>
          </div>
        </div>
      </div>
    </section>
  );
}
