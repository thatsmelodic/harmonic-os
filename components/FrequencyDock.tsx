const links = [
  ['OS', '/'],
  ['Worlds', '/#worlds'],
  ['Bible', '/#bible'],
  ['Hub', '/hub'],
  ['Studio', '/studio'],
  ['Profile', '/profile'],
  ['Shop', '/shop'],
  ['Beats', '/beats'],
  ['Schmack+', '/community/schmackinn'],
  ['Investor', '/investors'],
];

export function FrequencyDock() {
  return (
    <nav className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-20px)] max-w-5xl -translate-x-1/2 rounded-full border border-white/15 bg-black/55 px-2 py-2 shadow-purple-glow backdrop-blur-2xl md:bottom-4 md:px-3 md:py-3">
      <div className="flex items-center gap-2 overflow-x-auto overscroll-x-contain px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-between">
        {links.map(([label, href]) => (
          <a key={href} href={href} className="whitespace-nowrap rounded-full px-4 py-3 text-sm font-black text-purple-100/70 transition hover:bg-purple-200 hover:text-black focus-visible:bg-purple-200 focus-visible:text-black focus-visible:outline-none">
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
