export function BootLoader() {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center justify-center px-6">
      <div className="absolute inset-0 frequency-grid opacity-80" />
      <div className="absolute h-[28rem] w-[28rem] rounded-full bg-purple-500/20 blur-3xl pulse-orb" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.35em] text-purple-200/40">Harmonic boot protocol</div>
      <div className="relative z-10 glass-panel rounded-[2.5rem] px-8 py-10 text-center max-w-2xl w-full">
        <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full os-badge px-4 py-2 text-xs uppercase tracking-[0.28em] text-purple-100/70">
          <span className="h-2 w-2 rounded-full bg-purple-300 shadow-purple-glow" /> System Boot
        </div>
        <div className="mx-auto mb-8 grid h-28 w-28 place-items-center rounded-full border border-purple-200/25 bg-white/5 shadow-purple-glow">
          <div className="grid h-20 w-20 place-items-center rounded-full border border-purple-200/30">
            <div className="h-10 w-10 rotate-45 rounded-xl border-2 border-purple-200 animate-pulse" />
          </div>
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tight neon-text">HARMONIC OS</h1>
        <p className="mt-5 text-lg md:text-xl text-purple-100/80">One Frequency. Many Worlds.</p>
        <div className="mx-auto mt-8 h-1 max-w-xs overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 rounded-full bg-purple-300 shadow-purple-glow" />
        </div>
      </div>
    </section>
  );
}
