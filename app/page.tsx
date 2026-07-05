import { BootLoader } from '@/components/BootLoader';
import { Hero } from '@/components/Hero';
import { FutureBootSequence } from '@/components/FutureBootSequence';
import { FourWorlds } from '@/components/FourWorlds';
import { JoinDaSymphony } from '@/components/JoinDaSymphony';
import { HarmonicBiblePreview } from '@/components/HarmonicBiblePreview';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <BootLoader />
      <Hero />
      <FutureBootSequence />
      <FourWorlds />
      <JoinDaSymphony />
      <HarmonicBiblePreview />
      <Footer />
    </main>
  );
}
