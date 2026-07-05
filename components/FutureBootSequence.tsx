export function FutureBootSequence() {
  return (
    <section className="harmonic-container py-24">
      <div className="glass-panel rounded-[2rem] p-6 md:p-10 overflow-hidden relative">
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-purple-500/20 blur-3xl" />
        <p className="text-sm uppercase tracking-[0.35em] text-purple-200/60">Future Boot Sequence</p>
        <h2 className="mt-4 text-3xl md:text-5xl font-black">Cup → Purple Frequency → Heart Reveal → OS</h2>
        <p className="mt-5 max-w-2xl text-purple-100/70 leading-7">
          This placeholder reserves space for the cinematic origin sequence described in the Codex. The Cup pours creative energy, the energy becomes frequencies, and the frequencies build the Harmonic Heart.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {['Cup', 'Frequency', 'Heart', 'OS'].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-purple-400/20 shadow-purple-glow" />
              <p className="font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
