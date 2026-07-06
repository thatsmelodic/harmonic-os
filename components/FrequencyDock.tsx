const links = [
  ['OS', '/'],
  ['Hub', '/#hub'],
  ['Shop', '/shop'],
  ['Beats', '/beats'],
  ['2H', '/worlds/2-harmonic'],
  ['Fried', '/worlds/fried-em'],
  ['Schmack', '/worlds/schmackinn'],
];

export function FrequencyDock() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-24px)] max-w-4xl -translate-x-1/2 rounded-full border border-white/15 bg-black/45 px-3 py-3 shadow-purple-glow backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-2 overflow-x-auto">
        {links.map(([label, href]) => (
          <a key={href} href={href} className="whitespace-nowrap rounded-full px-4 py-3 text-sm font-black text-purple-100/70 transition hover:bg-purple-200 hover:text-black">
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
