export const platformStack = [
  ['Vercel', 'Hosts the website and deploys every GitHub update.'],
  ['GitHub', 'Stores the code and version history.'],
  ['Supabase Auth', 'Handles profiles, sign in, roles, and creator access.'],
  ['Supabase Database', 'Stores copy, seasons, reviews, recommendations, products, beats, and schedules.'],
  ['Supabase Storage', 'Stores logos, cup graphics, images, videos, beats, thumbnails, and documents.'],
];

export const databaseTables = [
  ['profiles', 'User accounts, creator role, badges, reputation, favorite frequency.'],
  ['cms_copy', 'Editable words for hero, world pages, buttons, descriptions, and announcements.'],
  ['assets', 'Uploaded images, videos, beats, logos, thumbnails, and product photos.'],
  ['seasons', 'Active season, palette, motion style, featured world, and campaign mode.'],
  ['worlds', 'World settings, routes, visibility, modules, and theme data.'],
  ['reviews', 'Schmackinn and future review data.'],
  ['comments', 'Reusable comments for every world.'],
  ['recommendations', 'Restaurant, beat, product, and content suggestions.'],
  ['products', '2 Harmonic shop products, inventory, drops, and pricing.'],
  ['content_schedule', 'Video drops, beat drops, campaigns, launches, and reminders.'],
];

export const storageBuckets = [
  ['brand-assets', 'Heart logo, cup graphic, backgrounds, icon systems, motion references.'],
  ['world-media', 'World-specific videos, photos, covers, episode thumbnails.'],
  ['shop-assets', 'Product photos, lookbooks, size charts, collection images.'],
  ['beats', 'Beat previews, stems later, covers, audio snippets.'],
  ['community-uploads', 'Food photos, outfit pics, court clips, profile avatars.'],
];
