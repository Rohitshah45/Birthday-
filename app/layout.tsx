import './globals.css';
import type { Metadata } from 'next';
import { Caveat, Fredoka, Nunito } from 'next/font/google';

const hand = Caveat({ subsets: ['latin'], variable: '--hand' });
const disp = Fredoka({ subsets: ['latin'], variable: '--disp' });
const body = Nunito({ subsets: ['latin'], variable: '--body' });

export const metadata: Metadata = { title: 'A little world', robots: { index: false, follow: false } };

export default function L({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${hand.variable} ${disp.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
