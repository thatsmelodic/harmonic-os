import Link from 'next/link';
import { melodicWorldVisualDefaults, type MelodicWorldVisualState } from '@/lib/melodic-visuals';
import { MelodicLivingCover } from '@/components/worlds/MelodicLivingCover';
import { SeasonalWorldLayer } from '@/components/seasons/SeasonalWorldLayer';
import { RuntimeVisualDriver } from '@/components/runtime/RuntimeVisualDriver';
import { LivingWorldOverlay } from '@/components/runtime/LivingWorldOverlay';

const tracks = [
  { slug: 'lift-u-up', title: 'Lift U Up', type: 'R&B Frequency', bpm: '80 BPM', mood: 'Healing', color: '#67e8f9' },
  { slug: 'better-luck-nxt-time', title: 'Better Luck Nxt Time', type: 'R&B Frequency', bpm: 'Late Night', mood: 'Distance', color: '#7c3aed' },
  { slug: 'save-the-apology', title: 'Save The Apology', type: 'R&B Frequency', bpm: 'Confession', mood: 'Regret', color: '#f0abfc' },
  { slug: 'barkin-n-bitin', title: 'Barkin N Bitin', type: 'Trap Frequency', bpm: '170 BPM', mood: 'Pressure', color: '#f97316' },
  { slug: 'big-guapo', title: 'Big Guapo', type: 'Trap Frequency', bpm: 'Motion', mood: 'Hunger', color: '#22d3ee' },
];

const rooms = [
  { href: '/worlds/melodic/vault', icon: '◈', label: 'Music Vault', description: 'Enter floating song memories and open each record as its own universe.' },
  { href: '/worlds/melodic/writing-room', icon: '✍🏽', label: 'Writing Room', description: 'Turn emotion into hooks, verses, concepts, and complete records.' },
  { href: '/worlds/melodic/memory-archive', icon: '💎', label: 'Memory Archive', description: 'Trace songs, eras, performances, and philosophy through time.' },
  { href: '/studio/melodic/upload', icon: '⬆️', label: 'Upload Studio', description: 'Add songs or beats and direct the world that forms around them.' },
  { href: '/beats', icon: '🎛️', label: 'Beat Laboratory', description: 'Production, stems, licensing, and sonic experiments.' },
];

export function MelodicWorldExperience({ visualState = melodicWorldVisualDefaults }: { visualState?: MelodicWorldVisualState }) {
  return (
    <main className="melodic-world relative isolate min-h-screen overflow-hidden pb-28 text-white">
      <SeasonalWorldLayer world="melodic" />
      <RuntimeVisualDriver world="melodic" />
      <LivingWorldOverlay world="melodic" />
      <div className="melodic-aurora absolute inset-0 -z-30" />
      <div className="frequency-grid absolute inset-0 -z-20 opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-24 -z-10 overflow-hidden opacity-20">
        {Array.from({ length: 7 }, (_, index) => <div key={index} className="my-8 h-px bg-gradient-to-r from-transparent via-purple-100 to-transparent" />)}
      </div>

      <section className="harmonic-container min-h-screen py-8 sm:py-12">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="rounded-full border border-white/15 bg-black/25 px-4 py-3 text-sm font-black text-white/70 backdrop-blur-xl">← Harmonic OS</Link>
          <div className="flex flex-wrap gap-2"><Link href="/studio/melodic/upload" className="rounded-full bg-purple-300 px-4 py-3 text-sm font-black text-black">Upload Music</Link><Link href="/worlds/melodic/vault" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">Enter Vault</Link><Link href="/worlds/melodic/writing-room" className="rounded-full border border-white/10 bg-black/25 px-4 py-3 text-sm font-black text-white/65">Writing Room</Link></div>
        </nav>

        <div className="grid gap-7 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <div className="relative z-10 py-8 lg:py-16">
            <p className="text-xs font-black uppercase tracking-[.48em] text-purple-100/50">Melodic Frequency · Emotional Engine</p>
            <h1 className="mt-6 text-6xl font-black leading-[.82] tracking-[-.1em] text-[#fbf4ff] sm:text-8xl lg:text-[8.5rem]">Walk inside the song.</h1>
            <p className="mt-8 max-w-2xl text-xl font-black leading-tight tracking-[-.04em] text-white/85 sm:text-3xl">Music is not background here. It changes the light, motion, memory, and atmosphere of the entire universe.</p>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/55">Every record becomes a living cover, a visual frequency, and a memory you can enter instead of another file inside a list.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/worlds/melodic/vault" className="rounded-full bg-white px-6 py-4 text-sm font-black text-black">Enter the Music Vault</Link><Link href="/worlds/melodic/songs/lift-u-up" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-6 py-4 text-sm font-black text-purple-100">Open Lift U Up</Link></div>
            <div className="mt-10 flex items-end gap-1.5">{Array.from({ length: 40 }, (_, index) => <span key={index} className="w-1 rounded-full bg-purple-200/60" style={{ height: `${10 + ((index * 19) % 54)}px`, opacity: .25 + ((index % 7) / 10) }} />)}</div>
          </div>

          <MelodicLivingCover title="Lift U Up" subtitle={`Healing Frequency · ${visualState.tempo} BPM`} colors={['#67e8f9','#c084fc','#09030f']} playing energy={82} />
        </div>
      </section>

      <section className="harmonic-container py-12">
        <div className="mb-7 max-w-3xl"><p className="text-xs font-black uppercase tracking-[.36em] text-purple-100/45">Memory Crystals</p><h2 className="mt-4 text-4xl font-black tracking-[-.07em] sm:text-6xl">Every song carries its own gravity.</h2><p className="mt-4 text-base leading-8 text-white/52">Move through the archive by emotion. Each crystal opens a song universe with living art, story, Frequency DNA, lyrics, production details, and community memories.</p></div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">{tracks.map((track, index) => <Link href={`/worlds/melodic/songs/${track.slug}`} key={track.slug} className="group relative min-h-[360px] overflow-hidden rounded-[2.3rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-purple-200/35"><div className="absolute inset-0 opacity-35 transition duration-500 group-hover:opacity-60" style={{ background: `radial-gradient(circle at 50% 38%, ${track.color}88, transparent 38%), linear-gradient(to top,#030205,transparent)` }} /><div className="relative flex h-full flex-col"><div className="flex items-center justify-between"><span className="font-mono text-xs text-white/35">0{index + 1}</span><span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.16em] text-white/50">{track.mood}</span></div><div className="my-auto grid place-items-center py-8"><div className="relative grid h-32 w-32 rotate-45 place-items-center rounded-[32%] border border-white/20 bg-white/[.05] shadow-[0_0_70px_rgba(183,108,255,.25)] transition duration-500 group-hover:rotate-[70deg] group-hover:scale-110"><span className="-rotate-45 text-4xl transition group-hover:-rotate-[70deg]">◈</span></div></div><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{track.type}</p><h3 className="mt-3 text-3xl font-black leading-none tracking-[-.06em]">{track.title}</h3><p className="mt-3 text-sm font-black text-purple-100/60">{track.bpm}</p><p className="mt-5 text-sm font-black text-purple-100">Enter Memory →</p></div></Link>)}</div>
      </section>

      <section className="harmonic-container py-12">
        <div className="mb-7"><p className="text-xs font-black uppercase tracking-[.36em] text-white/40">World Rooms</p><h2 className="mt-4 text-4xl font-black tracking-[-.07em] sm:text-6xl">Create, release, remember.</h2></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{rooms.map((room) => <Link key={room.href} href={room.href} className="group rounded-[2rem] border border-white/10 bg-white/[.04] p-5 backdrop-blur-xl transition hover:-translate-y-2 hover:border-purple-200/30 hover:bg-purple-300/[.07]"><span className="text-4xl">{room.icon}</span><h3 className="mt-5 text-2xl font-black tracking-[-.05em]">{room.label}</h3><p className="mt-3 text-sm leading-6 text-white/48">{room.description}</p><p className="mt-5 text-sm font-black text-purple-100">Enter Room →</p></Link>)}</div>
      </section>

      <section className="harmonic-container py-12"><div className="rounded-[2.8rem] border border-purple-200/15 bg-[radial-gradient(circle_at_top_right,rgba(183,108,255,.18),transparent_30rem),rgba(0,0,0,.42)] p-7 backdrop-blur-2xl sm:p-10"><p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Melodic Philosophy</p><h2 className="mt-4 max-w-5xl text-4xl font-black leading-tight tracking-[-.07em] sm:text-7xl">Pain becomes melody. Melody becomes memory. Memory becomes motion.</h2><p className="mt-6 max-w-3xl text-base leading-8 text-white/52">Melodic is the emotional thread connecting every Harmonic world. Eventually the song playing here can follow you into Fried Em, Schmackinn, 2 Harmonic, and every creator universe built on the operating system.</p></div></section>
    </main>
  );
}
