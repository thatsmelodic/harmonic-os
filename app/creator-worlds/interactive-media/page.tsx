import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';

export const metadata = {
  title: 'Interactive Media System | Creator Worlds',
  description: 'Interactive media layer for voice notes, video messages, timestamp reactions, watch rooms, listening rooms, world unlocks, and AI feedback summaries.',
};

const mediaModes = [
  { emoji: '🎙️', title: 'Voice Notes', access: 'Community + Premium', purpose: 'Fans leave audio reactions inside rooms, on songs, on videos, or on creator announcements.', effect: 'Voice notes appear as glowing sound orbs that pulse when played.', revenue: 'Premium voice walls, paid feedback rooms, and member-only audio replies.' },
  { emoji: '💬', title: 'Text Messages', access: 'Public + Members', purpose: 'Threaded comments, room chat, timestamps, reactions, polls, and creator replies.', effect: 'Messages float as cards, notes, speech bubbles, or room-specific effects.', revenue: 'Member rooms, paid Q&A threads, and premium community spaces.' },
  { emoji: '🎥', title: 'Video Messages', access: 'Members + Creator', purpose: 'Short video replies, creator check-ins, fan testimonials, and world updates.', effect: 'Video cards appear as hologram screens inside the world.', revenue: 'Premium video replies, private updates, and paid creator access.' },
  { emoji: '⏱️', title: 'Timestamp Reactions', access: 'All viewers', purpose: 'Fans react to exact moments in songs, videos, highlights, food reviews, or drops.', effect: 'World lighting spikes at high-reaction moments.', revenue: 'Higher retention, deeper analytics, and paid creator insight tools.' },
  { emoji: '📡', title: 'Live Watch Rooms', access: 'Public + Ticketed', purpose: 'Premieres, watch parties, listening rooms, tournaments, reviews, and creator events.', effect: 'Room aura changes live based on chat energy and reactions.', revenue: 'Tickets, subscriptions, sponsorships, paid premieres, and event passes.' },
  { emoji: '🗃️', title: 'Media Vault', access: 'Premium', purpose: 'Exclusive files, unreleased songs, behind-the-scenes videos, private links, and early drops.', effect: 'Locked vault shimmer with unlock animations.', revenue: 'Subscriptions, one-time unlocks, bundles, and drop access.' },
];

const worldPipelines = [
  { step: '01', title: 'Upload', description: 'Creator uploads a song, video, food review, basketball clip, clothing drop, or voice update.', output: 'Draft media object is created.' },
  { step: '02', title: 'Analyze', description: 'System identifies category, mood, audience intent, world room, revenue path, and suggested effects.', output: 'AI preview and explain-why card.' },
  { step: '03', title: 'Place', description: 'Creator chooses where the media lives: studio, court, restaurant district, showroom, vault, or plaza.', output: 'Media becomes part of the world map.' },
  { step: '04', title: 'Interact', description: 'Fans react with text, voice, video, polls, timestamp reactions, saves, shares, and quests.', output: 'Community signal and engagement score.' },
  { step: '05', title: 'Unlock', description: 'High engagement can unlock drops, rooms, bonus clips, lyric notes, badges, or portal events.', output: 'World progression moment.' },
  { step: '06', title: 'Summarize', description: 'AI summarizes feedback, strongest reactions, criticism, revenue signals, and next content ideas.', output: 'Creator insight report.' },
];

const worldExamples = [
  { world: 'Melodic', scene: 'Studio listening room', interaction: 'Fans leave voice notes on the wall while lyrics glow and comments appear as floating musical notes.', unlock: 'Merch or beat license unlocks after enough listens and saves.' },
  { world: 'Fried Em', scene: 'Basketball highlight theater', interaction: 'Fans react to exact plays, call next, vote for rematches, and drop voice reactions after buckets.', unlock: 'Scoreboard badges, challenge rooms, and tournament tickets.' },
  { world: 'Schmackinn', scene: 'Restaurant district', interaction: 'Food reviews become restaurant buildings with ratings, voice reviews, photos, and next-stop voting.', unlock: 'Top restaurants become featured routes and paid food crawl events.' },
  { world: '2 Harmonic', scene: 'Fashion showroom', interaction: 'Fans vote on colorways, leave fit reactions, preview drops, and unlock member-only lookbooks.', unlock: 'Limited drop rooms, early access, and private preorder links.' },
];

const aiSummaries = [
  'Top reaction moment: 00:42 hook transition caused the biggest comment spike.',
  'Audience wants more behind-the-scenes before the next drop.',
  'Voice notes are mostly positive, but three users asked for clearer pricing.',
  'Best revenue suggestion: connect this upload to a limited merch or ticketed event room.',
  'Suggested next move: open a poll before publishing the next media event.',
];

const safetyAndAccess = [
  'Creator approval before featuring fan media publicly.',
  'Moderation queue for voice notes, video replies, and reported messages.',
  'Captions/transcripts planned for accessibility.',
  'Low-motion mode for intense visual reactions.',
  'Private, members-only, and public visibility modes.',
  'Clear room rules before users submit media.',
];

export default function InteractiveMediaPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container grid gap-5 py-8">
        <article className="rounded-[2.8rem] border border-purple-200/15 bg-[linear-gradient(135deg,rgba(183,108,255,.18),rgba(54,178,203,.08),rgba(0,0,0,.42))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Creator Worlds Layer</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">Interactive Media System</h1>
              <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">Media is not just uploaded. It enters the world, triggers reactions, creates rooms, unlocks progression, and teaches the creator what the audience actually felt.</p>
            </div>
            <Link href="/creator-worlds" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Back to Creator Worlds</Link>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <Stat label="Media Modes" value="6" />
            <Stat label="Pipeline Steps" value="6" />
            <Stat label="Approval" value="Creator" />
            <Stat label="Revenue Hooks" value="Live" />
          </div>
        </article>

        <article className="rounded-[2rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Communication + Content</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-.08em] sm:text-5xl">Voice, text, video, reactions, and rooms.</h2>
          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {mediaModes.map((mode) => (
              <section key={mode.title} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                <div className="flex items-start gap-3"><span className="text-2xl">{mode.emoji}</span><div><h3 className="text-lg font-black tracking-[-.04em] text-white/82">{mode.title}</h3><p className="mt-1 text-xs font-black uppercase tracking-[.14em] text-cyan-100/45">{mode.access}</p></div></div>
                <p className="mt-3 text-xs leading-6 text-white/48">{mode.purpose}</p>
                <p className="mt-3 text-xs leading-6 text-cyan-100/52">Effect: {mode.effect}</p>
                <p className="mt-3 text-xs leading-6 text-purple-100/50">Revenue: {mode.revenue}</p>
              </section>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-purple-200/15 bg-[linear-gradient(135deg,rgba(183,108,255,.12),rgba(0,0,0,.38))] p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Upload-to-World Pipeline</p>
          <div className="mt-5 grid gap-3 md:grid-cols-6">
            {worldPipelines.map((step) => (
              <section key={step.step} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="font-mono text-xs text-purple-100/45">STEP {step.step}</p>
                <h3 className="mt-2 text-lg font-black text-white/82">{step.title}</h3>
                <p className="mt-2 text-xs leading-6 text-white/45">{step.description}</p>
                <p className="mt-3 text-xs leading-6 text-purple-100/50">{step.output}</p>
              </section>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-black/25 p-5 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-white/35">World Examples</p>
          <div className="mt-5 grid gap-4 xl:grid-cols-4">
            {worldExamples.map((example) => (
              <section key={example.world} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                <h3 className="text-xl font-black tracking-[-.04em] text-white/82">{example.world}</h3>
                <p className="mt-2 text-xs font-black uppercase tracking-[.14em] text-purple-100/45">{example.scene}</p>
                <p className="mt-3 text-xs leading-6 text-white/48">{example.interaction}</p>
                <p className="mt-3 text-xs leading-6 text-cyan-100/52">Unlock: {example.unlock}</p>
              </section>
            ))}
          </div>
        </article>

        <div className="grid gap-5 xl:grid-cols-2">
          <article className="rounded-[2rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">AI Feedback Summary</p>
            <div className="mt-4 grid gap-3">{aiSummaries.map((summary) => <p key={summary} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-6 text-white/50">{summary}</p>)}</div>
          </article>
          <article className="rounded-[2rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Safety + Access</p>
            <div className="mt-4 grid gap-3">{safetyAndAccess.map((item) => <p key={item} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-6 text-white/50">{item}</p>)}</div>
          </article>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.06em] text-purple-100">{value}</p></div>;
}
