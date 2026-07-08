import { IdentityHero } from '@/components/brand/IdentityHero';
import { CommandHub } from '@/components/CommandHub';
import { JoinDaSymphony } from '@/components/JoinDaSymphony';
import { HarmonicBiblePreview } from '@/components/HarmonicBiblePreview';
import { Footer } from '@/components/Footer';
import { FrequencyDock } from '@/components/FrequencyDock';
import { HarmonicOSApp } from '@/components/HarmonicOSApp';

export default function Home() {
  return (
    <main className="relative overflow-hidden pb-28">
      <FrequencyDock />
      <HarmonicOSApp />
      <IdentityHero />
      <div id="hub" className="cinematic-section">
        <CommandHub />
      </div>
      <div className="cinematic-section">
        <JoinDaSymphony />
      </div>
      <div className="cinematic-section">
        <HarmonicBiblePreview />
      </div>
      <Footer />
    </main>
  );
}
