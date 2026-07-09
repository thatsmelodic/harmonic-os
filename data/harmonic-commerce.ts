export type LicenseTierId = 'free-tagged' | 'basic-lease' | 'premium-lease' | 'unlimited-lease' | 'exclusive-rights';

export type BeatLicenseTier = {
  id: LicenseTierId;
  name: string;
  priceCents: number;
  files: string[];
  rights: string[];
  limits: string[];
  agreementSummary: string;
  highlighted?: boolean;
};

export type BeatProduct = {
  id: string;
  title: string;
  producer: string;
  bpm: number;
  key: string;
  genre: string;
  mood: string;
  tags: string[];
  previewUrl?: string;
  cover: string;
  licenses: LicenseTierId[];
};

export const beatLicenseTiers: BeatLicenseTier[] = [
  {
    id: 'free-tagged',
    name: 'Free Tagged Preview',
    priceCents: 0,
    files: ['Tagged MP3 preview'],
    rights: ['Non-commercial writing and demo use only'],
    limits: ['No distribution', 'No monetization', 'Producer tag remains', 'Credit required'],
    agreementSummary: 'For writing, recording demos, and testing ideas only. Cannot be monetized or released publicly without upgrading.',
  },
  {
    id: 'basic-lease',
    name: 'Basic Lease',
    priceCents: 3500,
    files: ['Untagged MP3', 'License PDF'],
    rights: ['Commercial streaming', 'Monetized social use', 'Credit required'],
    limits: ['Up to 50,000 streams', 'One music video', 'No radio/TV sync', 'Beat remains available to others'],
    agreementSummary: 'Affordable commercial lease for early releases while the producer keeps ownership and can continue licensing the beat.',
  },
  {
    id: 'premium-lease',
    name: 'Premium Lease',
    priceCents: 7500,
    files: ['Untagged WAV', 'Untagged MP3', 'License PDF'],
    rights: ['Commercial streaming', 'Music video use', 'Paid performance use', 'Credit required'],
    limits: ['Up to 250,000 streams', 'Two music videos', 'No exclusive ownership', 'No sync licensing without approval'],
    agreementSummary: 'Higher quality lease for serious releases needing WAV delivery, stronger usage limits, and better release flexibility.',
    highlighted: true,
  },
  {
    id: 'unlimited-lease',
    name: 'Unlimited Lease',
    priceCents: 15000,
    files: ['Untagged WAV', 'Untagged MP3', 'Trackout stems when available', 'License PDF'],
    rights: ['Unlimited commercial streaming', 'Unlimited music videos', 'Paid performance use', 'Credit required'],
    limits: ['Beat remains non-exclusive unless upgraded', 'No resale of instrumental', 'No sync licensing without approval'],
    agreementSummary: 'Best non-exclusive license for artists expecting growth while keeping the beat available for other buyers.',
  },
  {
    id: 'exclusive-rights',
    name: 'Exclusive Rights',
    priceCents: 50000,
    files: ['Untagged WAV', 'Untagged MP3', 'Trackout stems', 'Exclusive agreement PDF'],
    rights: ['Exclusive commercial use', 'Unlimited streams', 'Unlimited videos', 'Beat removed from public sale'],
    limits: ['Producer keeps authorship/credit unless otherwise negotiated', 'Publishing/split terms must be reviewed', 'No false ownership claims'],
    agreementSummary: 'Exclusive buyer receives sole commercial use of the beat after purchase, while agreement terms preserve producer credit and negotiated publishing rules.',
  },
];

export const beatProducts: BeatProduct[] = [
  {
    id: 'late-night-frequency',
    title: 'Late Night Frequency',
    producer: 'Melodic',
    bpm: 80,
    key: 'E minor',
    genre: 'R&B / Hip-Hop',
    mood: 'toxic, cinematic, floating',
    tags: ['rnb', 'late-night', 'melodic', 'toxic-love'],
    cover: 'Purple glass studio cover',
    licenses: ['free-tagged', 'basic-lease', 'premium-lease', 'unlimited-lease', 'exclusive-rights'],
  },
  {
    id: 'guapo-motion',
    title: 'Guapo Motion',
    producer: 'Melodic',
    bpm: 170,
    key: 'F minor',
    genre: 'Trap',
    mood: 'fast, flex, villain energy',
    tags: ['trap', '170bpm', 'dark', 'bounce'],
    cover: 'Chrome purple trap cover',
    licenses: ['basic-lease', 'premium-lease', 'unlimited-lease', 'exclusive-rights'],
  },
  {
    id: 'lift-u-up',
    title: 'Lift U Up',
    producer: 'Melodic',
    bpm: 92,
    key: 'A minor',
    genre: 'R&B',
    mood: 'warm, emotional, hopeful',
    tags: ['rnb', 'soul', 'uplift', 'melodic'],
    cover: 'Gold and cyan soul cover',
    licenses: ['free-tagged', 'basic-lease', 'premium-lease', 'unlimited-lease'],
  },
];

export const licenseAgreementSections = [
  'Buyer and producer identities',
  'Beat title, license tier, purchase date, and order number',
  'Files delivered and permitted usage rights',
  'Streaming, video, performance, and monetization limits',
  'Producer credit requirements',
  'Non-exclusive or exclusive ownership language',
  'Publishing, royalty, and split notes when applicable',
  'Restrictions on resale, redistribution, false ownership, and unauthorized sync',
  'Agreement storage in buyer and creator accounts',
  'Refund, upgrade, and dispute notes',
];

export function getLicenseTier(id: LicenseTierId) {
  return beatLicenseTiers.find((tier) => tier.id === id);
}

export function formatMoney(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}
