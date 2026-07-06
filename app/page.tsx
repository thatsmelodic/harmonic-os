import { IdentityHero } from '@/components/brand/IdentityHero';
import { CommandHub } from '@/components/CommandHub';
import { JoinDaSymphony } from '@/components/JoinDaSymphony';
import { HarmonicBiblePreview } from '@/components/HarmonicBiblePreview';
import { Footer } from '@/components/Footer';
import { FrequencyDock } from '@/components/FrequencyDock';

export default function Home() {
  return (
    <main className="pb-28">
      <FrequencyDock />
      <IdentityHero />
      <div id="hub">
        <CommandHub />
      </div>
      <JoinDaSymphony />
      <HarmonicBiblePreview />
      <Footer />
    </main>
  );
}
