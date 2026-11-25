import './globals.css';
import type { Metadata } from 'next';
import { Red_Hat_Text, Instrument_Sans, Spline_Sans_Mono } from 'next/font/google';

const redHat = Red_Hat_Text({
  subsets: ['latin'],
  variable: '--font-red-hat',
  display: 'swap',
});

const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const splineMono = Spline_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-spline-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ServeFlow — Restaurant Operations SaaS',
  description: 'India-First Multi-Tenant Restaurant Operations & Point of Sale Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${redHat.variable} ${instrument.variable} ${splineMono.variable}`}
    >
      <body className="font-body bg-light-background text-light-on-background antialiased">
        {children}
      </body>
    </html>
  );
}
