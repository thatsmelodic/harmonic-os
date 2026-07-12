import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { ProfileGate } from '@/components/ProfileGate';
import { WorldCommunity } from '@/components/community/WorldCommunity';

const reviews = [
  ['MelodicEats', '4.8', 'The mac was crazy. Greens had soul. Cornbread needed more honey but I would spin back.', '214 helpful'],
  ['BaltimoreBites', '4.5', 'Best late-night plate I had this month. Service was fast and the sauce carried.', '98 helpful'],
  ['SymphMember', '4.9', 'This spot belongs in the top tier. Get the wings and the peach drink.', '141 helpful'],
];

const questions = [
  ['Is it worth going for lunch or dinner?', 'Dinner. The menu feels fuller and the energy is better.'],
  ['What should Mel try first?', 'Wings, mac, greens, and whatever dessert they got that day.'],
  ['Is it Schmackinn or just hype?', 'Community score says Schmackinn. Needs a full episode.'],
];

const recommendationFlow = ['Submit spot', 'Community votes', 'Mel reviews', 'Score updates', 'Bucket list saves'];

export const metadata = {
  title: 'Schmackinn Community | Harmonic OS',
  description: 'Profile-gated reviews, recommendations, comments, and Q&A for Schmackinn.',
};

export default function SchmackinnCommunityPage() {
  return (
    <>
      <main className="min-h-screen px-6 py-8 pb-16">
        <FrequencyDock />
        <div className="harmonic-container">
          <Link href="/worlds/schmackinn" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-purple-100/75 glass-panel">← Back to Schmackinn</Link>

          <section className="py-16">
            <p className="w-fit rounded-full os-badge px-4 py-2 text-xs uppercase tracking-[0.35em] text-purple-100/70">Schmackinn · Community Layer</p>
            <h1 className="mt-7 text-5xl font-black leading-[.92] tracking-tight neon-text md:text-8xl">Reviews. Recs. Q&A.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-purple-100/75">Guests can read. Harmonic profiles unlock posting reviews, recommendations, comments, food photos, likes, saves, and questions.</p>
          </section>

          <section className="mb-8 grid gap-5 md:grid-cols-5">
            {recommendationFlow.map((step, index) => (
              <article key={step} className="glass-panel rounded-[2rem] p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-purple-200/45">Step 0{index + 1}</p>
                <h2 className="mt-3 text-xl font-black">{step}</h2>
              </article>
            ))}
          </section>

          <section className="grid gap-5 md:grid-cols-[1fr_.8fr]">
            <div className="glass-panel rounded-[2.25rem] p-6">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-3xl font-black">Community Reviews</h2>
                <span className="rounded-full bg-purple-300 px-4 py-2 text-sm font-black text-black">Profile Required to Post</span>
              </div>
              <div className="grid gap-4">
                {reviews.map(([user, rating, copy, helpful]) => (
                  <article key={user} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black">@{user}</h3>
                      <span className="font-black text-purple-200">{rating}/5</span>
                    </div>
                    <p className="mt-3 leading-7 text-purple-100/70">{copy}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-purple-100/50">
                      <span>{helpful}</span><span>Comment</span><span>Save</span><span>Ask reviewer</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <ProfileGate title="Recommendation Box" description="Users with profiles can recommend where Mel should eat next and the community can vote spots up before they become episodes." lockedAction="recommend a restaurant" />

              <div className="glass-panel rounded-[2.25rem] p-6">
                <h2 className="text-3xl font-black">Q&A</h2>
                <p className="mt-3 text-purple-100/60">Questions are public to read. Asking and answering requires a profile so the community stays accountable.</p>
                <div className="mt-5 grid gap-4">
                  {questions.map(([q, a]) => (
                    <article key={q} className="rounded-3xl bg-white/5 p-4">
                      <h3 className="font-black">{q}</h3>
                      <p className="mt-2 text-sm leading-6 text-purple-100/65">{a}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <WorldCommunity world="schmackinn" />
    </>
  );
}
