export function BootLoader() {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center justify-center px-6">
      <div className="absolute inset-0 frequency-grid opacity-70" />
      <div className="absolute h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="relative z-10 glass-panel rounded-[2rem] px-8 py-10 text-center max-w-xl w-full">
        <p className="text-xs uppercase tracking-[0.45em] text-purple-200/70 mb-5">System Boot</p>
        <div className="mx-auto mb-7 h-24 w-24 rounded-full border border-purple-200/30 flex items-center justify-center shadow-purple-glow">
          <div className="h-14 w-14 rounded-full border-2 border-purple-300 animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight neon-text">HARMONIC OS</h1>
        <p className="mt-4 text-lg text-purple-100/80">One Frequency. Many Worlds.</p>
      </div>
    </section>
  );
}
