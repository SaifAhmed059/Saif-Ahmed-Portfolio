import type { Metadata } from 'next';
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import { profile } from '@/lib/data';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--display', display: 'swap' });
const body = Instrument_Sans({ subsets: ['latin'], variable: '--body', display: 'swap' });

export const metadata: Metadata = {
  title: `${profile.name} – ${profile.role}`,
  description: profile.intro,
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: `${profile.name} – ${profile.role}`,
    description: profile.intro,
    images: [{ url: '/saifpic.jpg', width: 800, height: 1067, alt: profile.name }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} – ${profile.role}`,
    description: profile.intro,
    images: ['/saifpic.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
