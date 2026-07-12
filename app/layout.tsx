import type { ReactNode } from 'react';
import { SeasonProvider } from '@/components/seasons/SeasonProvider';
import { HarmonicOSRuntime } from '@/components/runtime/HarmonicOSRuntime';
import { AtmosphereProvider } from '@/components/atmosphere/AtmosphereProvider';
import { GlobalAtmosphereLayer } from '@/components/atmosphere/GlobalAtmosphereLayer';
import { WorldCustomizationProvider } from '@/components/studio/WorldCustomizationProvider';
import { WorldMediaLayer } from '@/components/worlds/WorldMediaLayer';
import { IdentityProvider } from '@/components/identity/IdentityProvider';
import './globals.css';
import './runtime-personality.css';
import './universe-interactions.css';
import './world-customization.css';
import './identity-engine.css';

export const metadata = {
  title: 'Harmonic OS',
  description: 'One Frequency. Many Worlds.',
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: 'var(--world-background, #07050a)', color: 'var(--world-text, #fff)' }}>
        <WorldCustomizationProvider>
          <WorldMediaLayer />
          <IdentityProvider>
            <SeasonProvider>
              <AtmosphereProvider>
                <GlobalAtmosphereLayer />
                <div className="relative z-[2]">
                  <HarmonicOSRuntime>{props.children}</HarmonicOSRuntime>
                </div>
              </AtmosphereProvider>
            </SeasonProvider>
          </IdentityProvider>
        </WorldCustomizationProvider>
      </body>
    </html>
  );
}
