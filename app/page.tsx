import { BootLoader } from '@/components/BootLoader';
import { Hero } from '@/components/Hero';
import { FutureBootSequence } from '@/components/FutureBootSequence';
import { FourWorlds } from '@/components/FourWorlds';
import { CommandHub } from '@/components/CommandHub';
import { JoinDaSymphony } from '@/components/JoinDaSymphony';
import { HarmonicBiblePreview } from '@/components/HarmonicBiblePreview';
import { Footer } from '@/components/Footer';
import { FrequencyDock } from '@/components/FrequencyDock';

export default function Home() {
  return (
    <main className="pb-28">
      <FrequencyDock />
      <BootLoader />
      <Hero />
      <FutureBootSequence />
      <FourWorlds />
      <div id="hub">
        <CommandHub />
      </div>
      <JoinDaSymphony />
      <HarmonicBiblePreview />
      <Footer />
    </main>
  );
}
