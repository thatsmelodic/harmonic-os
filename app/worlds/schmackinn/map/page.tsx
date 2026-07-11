import Link from 'next/link';

const districts = [
  { name: 'Soul Food Street', icon: '🍗', signal: 'Comfort · Culture · Memory', spots: 18, glow: 'from-amber-300/30 to-orange-500/10' },
  { name: 'Asian Alley', icon: '🥡', signal: 'Heat · Balance · Technique', spots: 24, glow: 'from-red-400/25 to-yellow-300/10' },
  { name: 'Dessert District', icon: '🍰', signal: 'Sweetness · Creativity · Joy', spots: 15, glow: 'from-pink-400/25 to-purple-400/10' },
  { name: 'Breakfast Block', icon: '🥞', signal: 'Comfort · Value · Ritual', spots: 12, glow: 'from-yellow-200/25 to-orange-300/10' },
  { name: 'Luxury Row', icon: '🥂', signal: 'Presentation · Service · Occasion', spots: 9, glow: 'from-cyan-300/20 to-purple-400/10' },
  { name: 'Food Truck Lane', icon: '🚚', signal: 'Discovery · Hustle · Hidden Gems', spots: 21, glow: 'from-green-300/20 to-yellow-300/10' },
];

export default function SchmackinnMapPage() {
  return (
    <main className="schmackinn-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 text-white sm:px-6">
      <div className="schmackinn-aurora absolute inset-0 -z-30" /><div className="restaurant-rain absolute inset-0 -z-20 opacity-35" /><div className="steam-cloud steam-one" />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/worlds/schmackinn" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Flavor District</Link><Link href="/worlds/schmackinn/reviews" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">Review Theater</Link></nav>

        <header className="rounded-[2.8rem] border border-purple-200/15 bg-black/50 p-7 shadow-[0_0_80px_rgba(183,108,255,.18)] backdrop-blur-2xl sm:p-10"><p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Flavor City</p><h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">Explore by appetite.</h1><p className="mt-5 max-w-3xl text-base leading-8 text-white/58">The map organizes food by culture, mood, occasion, price, and craving—not just distance. Every district carries its own atmosphere and review history.</p></header>

        <section className="mt-6 rounded-[2.5rem] border border-white/10 bg-black/42 p-5 backdrop-blur-2xl sm:p-8">
          <div className="grid min-h-[520px] gap-4 sm:grid-cols-2 lg:grid-cols-3">{districts.map((district, index) => <Link href="/worlds/schmackinn/reviews" key={district.name} className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${district.glow} p-6 transition hover:-translate-y-2 hover:border-purple-200/30`}><div className="absolute right-4 top-4 font-mono text-xs text-white/25">0{index + 1}</div><span className="text-6xl transition group-hover:scale-110">{district.icon}</span><h2 className="mt-6 text-3xl font-black tracking-[-.05em]">{district.name}</h2><p className="mt-3 text-sm leading-7 text-white/50">{district.signal}</p><div className="mt-6 flex items-center justify-between"><span className="rounded-full border border-white/10 bg-black/25 px-3 py-2 text-xs font-black text-white/55">{district.spots} spots</span><span className="text-sm font-black text-purple-100">Enter District →</span></div></Link>)}</div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.05fr_.95fr]"><article className="rounded-[2rem] border border-white/10 bg-black/42 p-6 backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[.24em] text-purple-100/45">Craving Compass</p><h2 className="mt-3 text-4xl font-black tracking-[-.06em]">Tell the city what you need.</h2><div className="mt-5 flex flex-wrap gap-2">{['Comfort','Cheap Eats','Date Night','Late Night','Sweet','Spicy','Hidden Gem','Worth the Drive'].map((item) => <button key={item} className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/60">{item}</button>)}</div></article><article className="rounded-[2rem] border border-white/10 bg-black/42 p-6 backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[.24em] text-purple-100/45">City Pulse</p><div className="mt-5 grid gap-3">{[['Trending district','Food Truck Lane'],['Most Schmakinn verdicts','Soul Food Street'],['Best value signal','Breakfast Block'],['Fastest rising','Asian Alley']].map(([label,value]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-xs font-black uppercase tracking-[.16em] text-white/30">{label}</p><p className="mt-2 text-lg font-black text-white/72">{value}</p></div>)}</div></article></section>
      </div>
    </main>
  );
}
