import { notFound } from 'next/navigation';
import { WorldEngineShell } from '@/components/WorldEngineShell';
import { getWorldBySlug, harmonicWorlds } from '@/data/world-engine';

export function generateStaticParams() {
  return harmonicWorlds.map((world) => ({ slug: world.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const world = getWorldBySlug(params.slug);
  if (!world) return { title: 'World Not Found | Harmonic OS' };
  return {
    title: `${world.name} | Harmonic OS`,
    description: world.tagline,
  };
}

export default function DynamicWorldPage({ params }: { params: { slug: string } }) {
  const world = getWorldBySlug(params.slug);
  if (!world) notFound();
  return <WorldEngineShell world={world} />;
}
