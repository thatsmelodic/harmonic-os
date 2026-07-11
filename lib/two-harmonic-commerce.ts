export const TWO_HARMONIC_COMMERCE_KEY = 'two-harmonic-commerce-settings-v1';

export type GarmentCommerceSettings = {
  price: number;
  inventory: Record<string, number>;
  imageUrl: string;
  campaignVideoUrl: string;
  audioUrl: string;
  releaseDate: string;
  privateAccessRequired: boolean;
  reservationsEnabled: boolean;
};

export type TwoHarmonicCommerceSettings = {
  collectionName: string;
  dropStatus: 'private-preview' | 'coming-soon' | 'live' | 'archived';
  releaseDate: string;
  privateAccessLabel: string;
  privateAccessDescription: string;
  campaignVideoUrl: string;
  audioUrl: string;
  garments: Record<string, GarmentCommerceSettings>;
};

export const defaultTwoHarmonicCommerceSettings: TwoHarmonicCommerceSettings = {
  collectionName: 'Beige Frequency',
  dropStatus: 'private-preview',
  releaseDate: '',
  privateAccessLabel: 'Enter the private release room.',
  privateAccessDescription: 'Private access unlocks reservations, early collection chapters, owner-only films, and first notice when Beige Frequency becomes available.',
  campaignVideoUrl: '',
  audioUrl: '',
  garments: {
    'ivory-frequency-zip': {
      price: 185,
      inventory: { S: 8, M: 12, L: 10, XL: 5 },
      imageUrl: '',
      campaignVideoUrl: '',
      audioUrl: '',
      releaseDate: '',
      privateAccessRequired: true,
      reservationsEnabled: true,
    },
    'lavender-frequency-zip': {
      price: 195,
      inventory: { S: 8, M: 12, L: 10, XL: 5 },
      imageUrl: '',
      campaignVideoUrl: '',
      audioUrl: '',
      releaseDate: '',
      privateAccessRequired: true,
      reservationsEnabled: true,
    },
  },
};

export function loadTwoHarmonicCommerceSettings(): TwoHarmonicCommerceSettings {
  if (typeof window === 'undefined') return defaultTwoHarmonicCommerceSettings;
  const raw = window.localStorage.getItem(TWO_HARMONIC_COMMERCE_KEY);
  if (!raw) return defaultTwoHarmonicCommerceSettings;
  try {
    const parsed = JSON.parse(raw) as Partial<TwoHarmonicCommerceSettings>;
    return {
      ...defaultTwoHarmonicCommerceSettings,
      ...parsed,
      garments: {
        ...defaultTwoHarmonicCommerceSettings.garments,
        ...(parsed.garments ?? {}),
      },
    };
  } catch {
    return defaultTwoHarmonicCommerceSettings;
  }
}

export function saveTwoHarmonicCommerceSettings(settings: TwoHarmonicCommerceSettings) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(TWO_HARMONIC_COMMERCE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent('two-harmonic-commerce-updated', { detail: settings }));
}
