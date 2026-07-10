import type { ReactNode } from 'react';
import { SeasonProvider } from '@/components/seasons/SeasonProvider';
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
        <SeasonProvider>{props.children}</SeasonProvider>
      </body>
    </html>
  );
}
