import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';

export const metadata = {
  title: 'Creator Economy + World Effects | Harmonic OS',
  description: 'Platform profit, affiliate/community promotion, creator revenue sharing, and worldly immersive effects for Creator Worlds.',
};

const revenueRules = [
  { title: 'Platform Share', formula: 'Every sale inside Harmonic OS includes a Harmonic platform fee.', example: 'A creator sells a hoodie, beat, ticket, template, membership, or module through the platform. Harmonic earns from the transaction.' },
  { title: 'Community Promotion Share', formula: 'Promoter/community earns a referral share. Creator earns seller share. Harmonic earns platform share.', example: 'A community member shares a drop link. Someone buys. The promoter gets credit, the creator gets paid, Harmonic gets platform revenue.' },
  { title: 'Cross-World Commerce', formula: 'If World A promotes World B and a sale happens, both worlds can earn while Harmonic still receives the platform cut.', example: 'Fried Em sends traffic to a 2 Harmonic drop. The collab attribution tracks both the seller and promoter.' },
  { title: 'Module Marketplace Cut', formula: 'Theme, FX, AI personality, template, and module sales include creator payout + Harmonic marketplace fee.', example: 'A creator sells a Fall World template. Another creator installs it. Harmonic gets marketplace revenue.' },
];

const moneyFlows = [
  { source: 'Memberships', seller: 'Creator', promoter: 'Optional community affiliate', harmonic: 'Platform subscription or transaction fee', unlock: 'Member rooms, vaults, private streams, early drops' },
  { source: 'Product Drops', seller: 'Creator or brand', promoter: 'Community, collab world, or affiliate', harmonic: 'Commerce platform cut', unlock: 'Showrooms, queues, limited access, world event effects' },
  { source: 'Tickets + Events', seller: 'Creator/event host', promoter: 'World partners or fans', harmonic: 'Ticketing fee', unlock: 'Live rooms, premieres, tournaments, listening parties' },
  { source: 'Licensing', seller: 'Beat/template/module owner', promoter: 'Marketplace or community', harmonic: 'License marketplace fee', unlock: 'Downloads, usage rights, creator business tools' },
  { source: 'Modules', seller: 'Module/theme creator', promoter: 'Marketplace rankings or creators', harmonic: 'Marketplace commission', unlock: 'FX packs, AI assistants, layouts, world upgrades' },
];

const attributionLayers = [
  'Referral code or tracked share link attached to every world promotion.',
  'Promoter credit attached to voice rooms, community posts, drop rooms, and collab portals.',
  'Seller, promoter, collab world, and Harmonic platform percentages stored as split rules.',
  'Creator dashboard shows gross sales, platform fees, promoter payouts, net revenue, and conversion source.',
  'Anti-fraud review for self-referral abuse, fake traffic, refund abuse, or spam promotion.',
];

const worldEffects = [
  { title: 'Commerce Storm', trigger: 'Drop sales spike', effect: 'City lights pulse, storefront unlocks, fireworks fire, crowd density rises, checkout room glows.' },
  { title: 'Referral Ripple', trigger: 'Community promotion converts', effect: 'A ripple travels from promoter room to seller world showing who brought the sale.' },
  { title: 'World Weather', trigger: 'Season, holiday, mood, or event', effect: 'Rain, leaves, snow, fog, petals, aurora, lightning, or gold dust changes the whole world atmosphere.' },
  { title: 'Crowd Intelligence', trigger: 'More users enter a room', effect: 'NPC silhouettes, sound beds, plaza movement, and room glow scale with activity.' },
  { title: 'Portal Surge', trigger: 'Collab event or cross-world sale', effect: 'Portal colors shift to both worlds, transition animation intensifies, collab badge appears.' },
  { title: 'Audio-Reactive World', trigger: 'Song, stream, or voice room energy', effect: 'Buildings pulse to bass, signs glow with vocals, camera shakes lightly on 808s.' },
];

const ownershipPrinciples = [
  'Creators own their brand and products, but Harmonic owns the platform layer and earns from platform-enabled transactions.',
  'Promoters can earn only when tracked promotion creates real sales or approved conversions.',
  'Harmonic should always receive a fee from marketplace, commerce, ticketing, subscriptions, modules, licensing, or promoted sales processed through the platform.',
  'Every revenue split should be transparent before creators activate a product, module, event, or affiliate campaign.',
];

const buildQueue = [
  'Create split-rule model: creator share, promoter share, collab share, Harmonic platform share.',
  'Add affiliate/referral tracking for world links, community posts, rooms, and portals.',
  'Connect commerce events to immersive effects: drops, referrals, auctions, tickets, and memberships.',
  'Create dashboard cards for platform revenue, creator revenue, promoter payouts, and conversion source.',
  'Add fraud/safety review for promotion abuse and creator payout disputes.',
];

export default function EconomyEffectsPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container grid gap-5 py-8">
        <article className="rounded-[2.8rem] border border-purple-200/15 bg-[linear-gradient(135deg,rgba(183,108,255,.18),rgba(54,178,203,.08),rgba(0,0,0,.42))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Creator Economy + World Effects</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">The capital layer and the world layer.</h1>
              <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">When creators, communities, and promoters make money through Harmonic OS, the platform earns too. When activity happens, the world reacts visually so commerce feels alive.</p>
            </div>
            <Link href="/creator-worlds" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Back to Creator Worlds</Link>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4"><Stat label="Platform Fee" value="Always" /><Stat label="Referral Splits" value="Tracked" /><Stat label="World FX" value="Live" /><Stat label="Commerce" value="Native" /></div>
        </article>

        <article className="rounded-[2rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Profit Rules</p>
          <div className="mt-5 grid gap-4 xl:grid-cols-4">{revenueRules.map((rule) => <section key={rule.title} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h2 className="text-lg font-black text-white/82">{rule.title}</h2><p className="mt-2 text-xs leading-6 text-purple-100/52">{rule.formula}</p><p className="mt-3 text-xs leading-6 text-white/48">{rule.example}</p></section>)}</div>
        </article>

        <article className="rounded-[2rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Money Flows</p>
          <div className="mt-5 grid gap-4 xl:grid-cols-5">{moneyFlows.map((flow) => <section key={flow.source} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h2 className="text-lg font-black text-white/82">{flow.source}</h2><p className="mt-2 text-xs leading-6 text-white/48"><strong>Seller:</strong> {flow.seller}</p><p className="mt-2 text-xs leading-6 text-white/48"><strong>Promoter:</strong> {flow.promoter}</p><p className="mt-2 text-xs leading-6 text-purple-100/52"><strong>Harmonic:</strong> {flow.harmonic}</p><p className="mt-2 text-xs leading-6 text-cyan-100/52"><strong>Unlock:</strong> {flow.unlock}</p></section>)}</div>
        </article>

        <div className="grid gap-5 xl:grid-cols-2">
          <article className="rounded-[2rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Attribution + Splits</p><div className="mt-4 grid gap-3">{attributionLayers.map((item) => <p key={item} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-6 text-white/50">{item}</p>)}</div></article>
          <article className="rounded-[2rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Ownership Principles</p><div className="mt-4 grid gap-3">{ownershipPrinciples.map((item) => <p key={item} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-6 text-white/50">{item}</p>)}</div></article>
        </div>

        <article className="rounded-[2rem] border border-cyan-200/15 bg-[linear-gradient(135deg,rgba(54,178,203,.13),rgba(183,108,255,.08),rgba(0,0,0,.4))] p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Worldly Effects</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-.08em] sm:text-5xl">Commerce should change the world.</h2>
          <div className="mt-6 grid gap-4 xl:grid-cols-3">{worldEffects.map((fx) => <section key={fx.title} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="text-lg font-black text-white/82">{fx.title}</h3><p className="mt-2 text-xs font-black uppercase tracking-[.14em] text-cyan-100/45">Trigger: {fx.trigger}</p><p className="mt-3 text-xs leading-6 text-white/48">{fx.effect}</p></section>)}</div>
        </article>

        <article className="rounded-[2rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Build Queue</p><div className="mt-4 grid gap-3 md:grid-cols-5">{buildQueue.map((item) => <p key={item} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-6 text-white/50">{item}</p>)}</div></article>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.06em] text-purple-100">{value}</p></div>;
}
