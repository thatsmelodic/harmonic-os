import type { ReactNode } from 'react';
import { SeasonProvider } from '@/components/seasons/SeasonProvider';
import { HarmonicOSRuntime } from '@/components/runtime/HarmonicOSRuntime';
import { AtmosphereProvider } from '@/components/atmosphere/AtmosphereProvider';
import { GlobalAtmosphereLayer } from '@/components/atmosphere/GlobalAtmosphereLayer';
import { WorldCustomizationProvider } from '@/components/studio/WorldCustomizationProvider';
import './globals.css';
import './runtime-personality.css';
import './universe-interactions.css';
import './world-customization.css';

export const metadata = {
  title: 'Harmonic OS',
  description: 'One Frequency. Many Worlds.',
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: 'var(--world-background, #07050a)', color: 'var(--world-text, #fff)' }}>
        <WorldCustomizationProvider>
          <SeasonProvider>
            <AtmosphereProvider>
              <GlobalAtmosphereLayer />
              <HarmonicOSRuntime>{props.children}</HarmonicOSRuntime>
            </AtmosphereProvider>
          </SeasonProvider>
        </WorldCustomizationProvider>
      </body>
    </html>
  );
}
