import { defaultWindows } from '@/lib/window-manager';

const sizeClass = {
  sm: 'md:col-span-1',
  md: 'md:col-span-2',
  lg: 'md:col-span-3',
  xl: 'md:col-span-4',
};

export function WindowManagerPreview() {
  return (
    <section className="harmonic-container py-16">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">Window Manager</p>
        <h2 className="mt-3 text-4xl font-black md:text-6xl">The OS opens tools like windows.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-purple-100/65">This prepares the desktop experience for pinned, minimized, expanded, and layered tools instead of basic page switching.</p>
      </div>

      <div className="glass-panel rounded-[2.5rem] p-5">
        <div className="mb-5 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-green-400/70" />
          <span className="ml-3 text-xs uppercase tracking-[0.25em] text-purple-100/45">Harmonic Desktop</span>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {defaultWindows.map((window) => (
            <a key={window.id} href={window.route} className={`${sizeClass[window.size]} rounded-[2rem] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:shadow-purple-glow`}>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-black">{window.title}</h3>
                <span className="rounded-full os-badge px-3 py-1 text-xs text-purple-100/55">{window.state}</span>
              </div>
              <p className="text-sm leading-6 text-purple-100/60">Route: {window.route}</p>
              <p className="mt-2 text-xs text-purple-100/40">Size {window.size} · Layer {window.z}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
