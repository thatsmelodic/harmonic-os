'use client';

import { useState, useEffect } from 'react';
import { BootLoader } from '@/components/BootLoader';
import { Hero } from '@/components/Hero';
import { FutureBootSequence } from '@/components/FutureBootSequence';
import { FourWorlds } from '@/components/FourWorlds';
import { JoinDaSymphony } from '@/components/JoinDaSymphony';
import { HarmonicBiblePreview } from '@/components/HarmonicBiblePreview';
import { Footer } from '@/components/Footer';
import { worlds, socialLinks, biblePreview } from '@/lib/content';

export default function Home() {
  const [showBootLoader, setShowBootLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBootLoader(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (showBootLoader) {
    return <BootLoader onComplete={() => setShowBootLoader(false)} />;
  }

  return (
    <main className="w-full bg-harmonic-black">
      {/* Hero Section */}
      <Hero />

      {/* Future Boot Sequence */}
      <FutureBootSequence isVisible={true} />

      {/* Four Worlds */}
      <FourWorlds worlds={worlds} />

      {/* Join da Symphony */}
      <JoinDaSymphony socialLinks={socialLinks} />

      {/* Harmonic Bible Preview */}
      <HarmonicBiblePreview entries={biblePreview} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
