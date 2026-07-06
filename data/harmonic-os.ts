export const worldDirectory = [
  {
    slug: 'melodic',
    name: 'Melodic',
    frequency: '528 Hz',
    theme: 'purple-cyan',
    purpose: 'Music, beats, lyrics, visuals, release planning, and the core sound identity.',
    publicFeatures: ['Beat previews', 'Song worlds', 'Visualizers', 'Release archive'],
    profileFeatures: ['Save beats', 'Comment on lyrics', 'Vote snippets', 'Build playlists'],
    creatorFeatures: ['Beat vault', 'Song projects', 'Rollout planner', 'Music analytics'],
  },
  {
    slug: '2-harmonic',
    name: '2 Harmonic',
    frequency: '741 Hz',
    theme: 'cyan-black',
    purpose: 'Fashion, drops, product storytelling, palettes, shop, and community lookbook.',
    publicFeatures: ['Shop', 'Lookbook', 'Drop archive', 'Collection stories'],
    profileFeatures: ['Wishlist drops', 'Vote colors', 'Upload fits', 'Save products'],
    creatorFeatures: ['Inventory', 'Manufacturers', 'Mood boards', 'Launch planner'],
  },
  {
    slug: 'fried-em',
    name: 'Fried Em',
    frequency: '963 Hz',
    theme: 'orange-fire',
    purpose: 'Basketball content, competition, court clips, challenges, and rankings.',
    publicFeatures: ['Episodes', 'Highlights', 'Leaderboards', 'Challenge board'],
    profileFeatures: ['Comment on games', 'Vote MVP', 'Submit challenges', 'Track records'],
    creatorFeatures: ['Edit queue', 'Matchup planner', 'Court clips', 'Stats board'],
  },
  {
    slug: 'schmackinn',
    name: 'Schmackinn',
    frequency: '396 Hz',
    theme: 'pink-restaurant',
    purpose: 'Food reviews, recommendations, Q&A, restaurant maps, ratings, and culture.',
    publicFeatures: ['Food reviews', 'Tier lists', 'Restaurant pages', 'Community scores'],
    profileFeatures: ['Leave reviews', 'Recommend spots', 'Ask questions', 'Upload food photos'],
    creatorFeatures: ['Episode planner', 'Food map', 'Sponsor leads', 'Scrapped video vault'],
  },
];

export const creatorModes = [
  {
    name: 'Melodic Mode',
    tone: 'Deep purple, cyan waveforms, studio glow',
    function: 'Turns the hub into a music command center.',
    tools: ['Beat vault', 'Song projects', 'Lyrics and ideas', 'Album rollout', 'Music analytics'],
  },
  {
    name: '2H Mode',
    tone: 'Cyan, textile texture, lookbook energy',
    function: 'Turns the hub into a fashion and commerce command center.',
    tools: ['Design board', 'Collections', 'Inventory', 'Orders', 'Manufacturers'],
  },
  {
    name: 'Fried Mode',
    tone: 'Orange fire, scoreboard UI, aggressive motion',
    function: 'Turns the hub into a basketball media and competition center.',
    tools: ['Challenges', 'Record tracker', 'Edit queue', 'Rankings', 'Community matchups'],
  },
  {
    name: 'Schmack Mode',
    tone: 'Hot pink, restaurant neon, menu-board cards',
    function: 'Turns the hub into a food review and community recommendation center.',
    tools: ['Restaurant list', 'Reviews', 'Tier lists', 'Q&A', 'Sponsor leads'],
  },
  {
    name: 'Campaign Mode',
    tone: 'Green signal, launch-room layout, rollout timeline',
    function: 'Connects every world into one marketing campaign.',
    tools: ['Post scheduler', 'Ad creatives', 'Email drops', 'Brand deals', 'Reports'],
  },
  {
    name: 'Investor Mode',
    tone: 'Clean, professional, minimal, metrics-first',
    function: 'Transforms the OS into a pitch-ready business presentation.',
    tools: ['Revenue streams', 'Growth data', 'Pitch deck', 'Roadmap', 'Contact panel'],
  },
  {
    name: 'Season Mode',
    tone: 'Seasonal UI skin that changes the entire system mood',
    function: 'Switches the site into Spring, Summer, Fall, or Winter.',
    tools: ['Season hub', 'Season palette', 'Featured drops', 'Content theme', 'Animation style'],
  },
  {
    name: 'Brain Mode',
    tone: 'Private dark room, moon glow, second-brain interface',
    function: 'Private creator-only space for raw ideas and future builds.',
    tools: ['Idea vault', 'Quotes', 'Inventions', 'Voice notes', 'AI prompts'],
  },
];

export const seasons = [
  { name: 'Spring', palette: ['#70e000', '#b7ff6a', '#f5fff0'], role: 'Growth, renewal, soft motion, new ideas, fresh launches.' },
  { name: 'Summer', palette: ['#ffd166', '#ff7a00', '#00c2ff'], role: 'Energy, outside content, bright campaigns, high-volume posting.' },
  { name: 'Fall', palette: ['#f97316', '#7c2d12', '#f5e6d3'], role: 'Hoodies, leaves, basketball season, warm drops, harvest energy.' },
  { name: 'Winter', palette: ['#8b5cf6', '#dbeafe', '#05000a'], role: 'Frosted glass, cyber nights, purple neon, premium cinematic mode.' },
];

export const palettes = [
  { name: 'Acid Wash', colors: ['#9ca3af', '#111827', '#f5f5f4'], texture: 'washed cotton, grit, static, factory light' },
  { name: 'Pink Blossom', colors: ['#ff5bc8', '#ffd1ec', '#1f0016'], texture: 'petals, smooth glow, emotional softness' },
  { name: 'Cyber Wave', colors: ['#8b5cf6', '#36b2cb', '#030006'], texture: 'glass, particles, neon, hologram grid' },
  { name: 'Nature Mode', colors: ['#70e000', '#1b4332', '#d8f3dc'], texture: 'leaves, water, wood, organic motion' },
  { name: 'Fall Drop', colors: ['#f97316', '#facc15', '#1c0f08'], texture: 'leaves, hoodie fleece, streetlight warmth' },
];

export const permissionLevels = [
  ['Guest', 'Browse worlds, watch, listen, read, explore. No posting.'],
  ['Harmonic Profile', 'Reviews, comments, Q&A, votes, saves, favorites, badges, recommendations.'],
  ['Harmonic Plus', 'Exclusive drops, private content, early access, discounts, premium community.'],
  ['Creator', 'Private hub, analytics, launch queue, uploads, inventory, AI assistant, brain mode.'],
  ['Investor', 'Password-safe pitch view, revenue, growth, roadmap, deck, contact.'],
];
