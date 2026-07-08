import type { ReactNode } from 'react';
import { HarmonicRuntime } from '@/components/HarmonicRuntime';
import './globals.css';

export const metadata = {
  title: 'Harmonic OS',
  description: 'One Frequency. Many Worlds.',
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HarmonicRuntime>{props.children}</HarmonicRuntime>
      </body>
    </html>
  );
}
