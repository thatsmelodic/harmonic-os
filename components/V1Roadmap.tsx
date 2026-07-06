const phases = [
  {
    phase: '01',
    title: 'Architecture First',
    status: 'Now',
    points: ['Central data model', 'Reusable mode cards', 'World routes', 'Profile gates', 'Consistent dock'],
  },
  {
    phase: '02',
    title: 'Public Experience',
    status: 'Next',
    points: ['Polished home', 'World pages', 'Shop preview', 'Beat vault', 'Schmackinn community preview'],
  },
  {
    phase: '03',
    title: 'Profile System',
    status: 'Build',
    points: ['Sign in', 'Profiles', 'Reviews', 'Comments', 'Recommendations', 'Favorites'],
  },
  {
    phase: '04',
    title: 'Creator Console',
    status: 'Build',
    points: ['Launch queue', 'Upload bay', 'Calendar', 'Analytics', 'Brain mode', 'AI assistant'],
  },
  {
    phase: '05',
    title: 'Business Layer',
    status: 'Scale',
    points: ['Shop checkout', 'Inventory', 'Investor mode', 'Pitch deck', 'Revenue dashboard'],
  },
];

export function V1Roadmap() {
  return (
    <section className="harmonic-container py-16">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">Build Strategy</p>
        <h2 className="mt-3 text-4xl font-black md:text-6xl">Version 1.0 Roadmap</h2>
        <p className="mt-4 max-w-3xl leading-7 text-purple-100/65">We build the operating system in layers so it stays clean, expandable, and real instead of becoming a messy pile of pages.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-5">
        {phases.map((phase) => (
          <article key={phase.phase} className="glass-panel rounded-[2rem] p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-3xl font-black text-purple-200/80">{phase.phase}</span>
              <span className="rounded-full os-badge px-3 py-1 text-xs uppercase tracking-[0.2em] text-purple-100/55">{phase.status}</span>
            </div>
            <h3 className="text-xl font-black">{phase.title}</h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-purple-100/60">
              {phase.points.map((point) => <li key={point}>• {point}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
