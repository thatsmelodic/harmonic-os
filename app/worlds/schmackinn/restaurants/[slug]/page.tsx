import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRestaurant, restaurants, verdictStyle } from '@/data/schmackinn-universe';

export function generateStaticParams() {
  return restaurants.map((restaurant) => ({ slug: restaurant.slug }));
}

export default async function RestaurantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const restaurant = getRestaurant(slug);
  if (!restaurant) notFound();
  const mood = verdictStyle[restaurant.verdict];

  return (
    <main className="schmackinn-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 text-white sm:px-6">
      <div className="schmackinn-aurora absolute inset-0 -z-30" /><div className="restaurant-rain absolute inset-0 -z-20 opacity-30" /><div className="steam-cloud steam-one" /><div className="steam-cloud steam-two" />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/worlds/schmackinn/map" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Flavor City</Link><div className="flex gap-2"><Link href="/worlds/schmackinn/flavor-lab" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">Flavor Lab</Link><Link href="/worlds/schmackinn/memories" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/65">Food Memories</Link></div></nav>

        <section className={`overflow-hidden rounded-[3rem] border ${mood.glow}`}>
          <div className="relative grid min-h-[440px] place-items-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,.12),transparent_20rem),linear-gradient(to_bottom,#17091f,#060306)] p-6 text-center">
            <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-xs font-black">{restaurant.open ? '● OPEN NOW' : 'CLOSED · OPENS LATER'}</div>
            <div><p className="text-8xl sm:text-9xl">{restaurant.storefront}</p><p className="mt-5 text-xs font-black uppercase tracking-[.34em] text-purple-100/45">{restaurant.city} · {restaurant.district}</p><h1 className="mt-3 text-5xl font-black tracking-[-.08em] sm:text-8xl">{restaurant.name}</h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/58">{restaurant.story}</p></div>
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap justify-center gap-2"><span className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs font-black">{restaurant.category}</span><span className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs font-black">{restaurant.price}</span>{restaurant.hiddenGem && <span className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-2 text-xs font-black text-purple-100">💎 Hidden Gem</span>}</div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <article className="rounded-[2.5rem] border border-white/10 bg-black/50 p-6 backdrop-blur-2xl sm:p-8"><p className="text-xs font-black uppercase tracking-[.26em] text-purple-100/45">Featured Dish</p><h2 className="mt-3 text-4xl font-black tracking-[-.06em]">{restaurant.featuredDish}</h2><div className="mt-6 grid gap-3 sm:grid-cols-3">{Object.entries(restaurant.flavor).map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-xs font-black uppercase tracking-[.15em] text-white/30">{label}</p><p className="mt-2 text-3xl font-black">{value || '—'}</p></div>)}</div><div className="mt-6 grid gap-3 sm:grid-cols-2"><Link href={`/worlds/schmackinn/restaurants/${restaurant.slug}/first-bite`} className="rounded-full bg-purple-300 px-5 py-4 text-center text-sm font-black text-black">Start First-Bite Experience</Link><Link href="/worlds/schmackinn/reviews" className="rounded-full border border-white/10 bg-white/[.04] px-5 py-4 text-center text-sm font-black text-white/65">Watch Full Review</Link></div></article>

          <aside className="rounded-[2.5rem] border border-white/10 bg-black/50 p-6 backdrop-blur-2xl sm:p-8"><p className="text-xs font-black uppercase tracking-[.26em] text-purple-100/45">Restaurant Signal</p><div className={`mt-5 rounded-[2rem] border p-6 ${mood.glow}`}><p className="text-5xl font-black tracking-[-.07em]">{restaurant.reviewed ? restaurant.verdict : 'Unreviewed'}</p><p className="mt-2 text-sm text-white/45">{restaurant.reviewed ? mood.atmosphere : 'This storefront is being powered by community callouts.'}</p><div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs text-white/35">Melodic Score</p><p className="mt-2 text-4xl font-black">{restaurant.reviewed ? restaurant.score : '—'}</p></div><div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs text-white/35">Community</p><p className="mt-2 text-4xl font-black">{restaurant.communityScore}</p></div></div></div><div className="mt-4 rounded-[2rem] border border-white/10 bg-white/[.035] p-5"><p className="text-xs font-black uppercase tracking-[.18em] text-white/35">Community Heat</p><p className="mt-2 text-4xl font-black">🔥 {restaurant.callouts}</p><p className="mt-2 text-sm text-white/45">Profile users have called this place out for a visit or revisit.</p><Link href="/worlds/schmackinn/callouts" className="mt-4 inline-flex text-sm font-black text-purple-100">Open Callout Board →</Link></div></aside>
        </section>
      </div>
    </main>
  );
}
