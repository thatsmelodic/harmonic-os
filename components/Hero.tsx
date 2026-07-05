export function Hero() {
  return (
    <section className="harmonic-container py-24 md:py-32">
      <div className="grid items-center gap-8 md:grid-cols-[1.08fr_.92fr]">
        <div>
          <p className="w-fit rounded-full os-badge px-4 py-2 text-xs uppercase tracking-[0.32em] text-purple-100/70">Welcome to the universe</p>
          <h2 className="mt-7 text-5xl md:text-8xl font-black leading-[.92] tracking-tight neon-text">One Frequency.<br />Many Worlds.</h2>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-purple-100/75 leading-8">Harmonic OS connects music, fashion, basketball, food, and business into one cinematic operating system for Melodic.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href="#worlds" className="rounded-full bg-purple-300 px-7 py-4 text-center font-black text-black shadow-purple-glow">Choose a World</a>
            <a href="#symphony" className="rounded-full border border-white/15 px-7 py-4 text-center font-black text-purple-100 glass-panel">Join da Symphony</a>
          </div>
        </div>
        <div className="glass-panel rounded-[2.5rem] p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-purple-100/50">
            <span>Creator OS</span><span>v0.1</span>
          </div>
          <div className="space-y-3">
            {['Melodic signal online', '2 Harmonic world linked', 'Fried Em channel armed', 'Schmackinn taste portal ready'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="h-3 w-3 rounded-full bg-purple-300 shadow-purple-glow" />
                <span className="text-purple-100/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
