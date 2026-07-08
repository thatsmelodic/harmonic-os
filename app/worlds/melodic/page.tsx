import { createClient } from '@supabase/supabase-js';
import { MelodicWorldExperience } from '@/components/worlds/MelodicWorldExperience';
import { melodicWorldVisualDefaults, normalizeMelodicWorldVisualState } from '@/lib/melodic-visuals';

export const metadata = {
  title: 'Melodic | Harmonic OS',
  description: 'A frequency world where music becomes memory, archive, and motion.',
};

async function loadMelodicVisualState() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return melodicWorldVisualDefaults;

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from('world_visual_settings')
    .select('vibe_name,vibe_prompt,vibe_description,ambience,cursor_effect,transition_style,tempo,ambient_audio,visual_settings')
    .eq('id', 'melodic-main')
    .maybeSingle();

  if (error || !data) return melodicWorldVisualDefaults;
  return normalizeMelodicWorldVisualState(data);
}

export default async function MelodicWorldPage() {
  const visualState = await loadMelodicVisualState();
  return <MelodicWorldExperience visualState={visualState} />;
}
