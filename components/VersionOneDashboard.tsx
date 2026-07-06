const worlds = [
  ['Melodic', '528 Hz', 'Music, beats, lyrics, visuals, rollout energy'],
  ['2 Harmonic', '741 Hz', 'Designs, drops, palettes, shop, inventory'],
  ['Fried Em', '963 Hz', 'Challenges, records, clips, rankings, episodes'],
  ['Schmackinn', '396 Hz', 'Reviews, restaurants, recommendations, Q&A'],
];

const creatorModes = [
  ['Melodic Mode', 'Beat vault, song projects, lyrics, album rollout, visualizers, analytics.'],
  ['2H Mode', 'Design board, collections, manufacturers, inventory, orders, mood boards.'],
  ['Fried Mode', 'Hoop challenges, win/loss record, edit queue, court clips, rankings.'],
  ['Schmack Mode', 'Restaurant list, food reviews, tier lists, Q&A, sponsor leads.'],
  ['Campaign Mode', 'Cross-platform rollouts, ad creatives, email drops, brand reports.'],
  ['Investor Mode', 'Clean pitch view, revenue, growth, deck, roadmap, partnership data.'],
  ['Season Mode', 'Spring, Summer, Fall, Winter skins that change the entire OS feel.'],
  ['Brain Mode', 'Private ideas, quotes, inventions, concepts, notes, and future builds.'],
];

const palettes = [
  ['Acid Wash', '#9ca3af', 'Gray static, grit, fabric texture'],
  ['Pink Blossom', '#ff5bc8', 'Soft petals, warm glow, feminine drop energy'],
  ['Cyber Wave', '#8b5cf6', 'Purple neon, glass, particles, boot sequence'],
  ['Nature Mode', '#70e000', 'Growth, forest, water, organic motion'],
  ['Fall Drop', '#f97316', 'Leaves, hoodies, basketball season, harvest warmth'],
];

const seasons = [
  ['Spring', 'Growth mode: flowers, green glow, renewal, new drops.'],
  ['Summer', 'High-energy mode: gold light, outside content, bright campaigns.'],
  ['Fall', 'Collection mode: hoodies, orange glow, leaves, basketball energy.'],
  ['Winter', 'Cyber city mode: frost, glass, purple neon, cinematic nights.'],
];

export function VersionOneDashboard() {
  return (
    <section className="harmonic-container py-16">
      <div className="glass-panel overflow-hidden rounded-[2.75rem] p-5 md:p-8">
        <div className="mb-8 grid gap-5 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">Harmonic OS 1.0 Blueprint</p>
            <h1 className="mt-4 text-5xl font-black leading-[.92] neon-text md:text-7xl">Welcome back, Melodic.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-purple-100/70">This is the full control hub: worlds, creator modes, seasons, palette engine, investor view, profiles, reviews, recommendations, comments, Q&A, shop, beats, and private brain mode.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-black/25 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">System Status</p>
            <div className="mt-5 grid gap-3">
              {['Public world access', 'Profile-gated community actions', 'Creator-only controls', 'Investor-safe presentation'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 text-sm text-purple-100/75">
                  <span className="h-2 w-2 rounded-full bg-purple-300 shadow-purple-glow" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {worlds.map(([name, hz, copy]) => (
            <article key={name} className="rounded-[2rem] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:shadow-purple-glow">
              <p className="text-xs uppercase tracking-[0.25em] text-purple-200/45">{hz}</p>
              <h2 className="mt-3 text-2xl font-black">{name}</h2>
              <p className="mt-4 text-sm leading-6 text-purple-100/65">{copy}</p>
            </article>
          ))}
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-[1fr_.75fr]">
          <div className="rounded-[2rem] border border-white/10 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Creator Modes</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {creatorModes.map(([title, copy]) => (
                <div key={title} className="rounded-2xl bg-white/5 p-4">
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-purple-100/60">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] border border-white/10 bg-black/20 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Season Engine</p>
              <div className="mt-4 grid gap-3">
                {seasons.map(([name, copy]) => (
                  <div key={name} className="rounded-2xl bg-white/5 p-4">
                    <h3 className="font-black">{name}</h3>
                    <p className="text-sm text-purple-100/60">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/20 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Palette Engine</p>
              <div className="mt-4 grid gap-3">
                {palettes.map(([name, color, copy]) => (
                  <div key={name} className="flex gap-3 rounded-2xl bg-white/5 p-3">
                    <span className="h-10 w-10 rounded-xl border border-white/10" style={{ backgroundColor: color }} />
                    <div>
                      <h3 className="font-black">{name}</h3>
                      <p className="text-sm text-purple-100/60">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <h2 className="text-2xl font-black">Profile Gate</h2>
            <p className="mt-3 leading-7 text-purple-100/65">Guests can browse. Profiles unlock reviews, comments, recommendations, Q&A, favorites, votes, badges, and saved worlds.</p>
          </article>
          <article className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <h2 className="text-2xl font-black">Schmackinn Community</h2>
            <p className="mt-3 leading-7 text-purple-100/65">Logged-in users can review restaurants, recommend spots, ask questions, comment, upload food photos, and build bucket lists.</p>
          </article>
          <article className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <h2 className="text-2xl font-black">Investor Mode</h2>
            <p className="mt-3 leading-7 text-purple-100/65">A professional view for valuation, revenue streams, audience growth, deck, roadmap, contact info, and brand ecosystem proof.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
