import type { ReactNode } from 'react';
import { SeasonProvider } from '@/components/seasons/SeasonProvider';
import { UniverseExperienceHotfix } from '@/components/universe/UniverseExperienceHotfix';
import './globals.css';
import './runtime-personality.css';

export const metadata = {
  title: 'Harmonic OS',
  description: 'One Frequency. Many Worlds.',
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UniverseExperienceHotfix />
        <SeasonProvider>{props.children}</SeasonProvider>
      </body>
    </html>
  );
}
