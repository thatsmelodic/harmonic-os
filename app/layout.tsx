import type { ReactNode } from 'react';
import { SeasonProvider } from '@/components/seasons/SeasonProvider';
import { HarmonicOSRuntime } from '@/components/runtime/HarmonicOSRuntime';
import './globals.css';
import './runtime-personality.css';
import './universe-interactions.css';

export const metadata = {
  title: 'Harmonic OS',
  description: 'One Frequency. Many Worlds.',
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SeasonProvider>
          <HarmonicOSRuntime>{props.children}</HarmonicOSRuntime>
        </SeasonProvider>
      </body>
    </html>
  );
}
