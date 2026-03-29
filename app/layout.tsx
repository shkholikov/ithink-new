import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: {
    default: 'ITHINK — IT Solutions for Business',
    template: '%s | ITHINK',
  },
  description: 'ITHINK is a Tashkent-based IT company providing network infrastructure, software development, CRM integration, VoIP, and managed IT services for businesses.',
  keywords: ['IT solutions', 'IT company Uzbekistan', 'CRM integration', 'network infrastructure', 'software development', 'managed IT services', 'VoIP', 'Tashkent', 'ITHINK'],
  authors: [{ name: 'ITHINK', url: 'https://ithink.uz' }],
  creator: 'ITHINK',
  publisher: 'ITHINK',
  metadataBase: new URL('https://ithink.uz'),
  alternates: {
    canonical: 'https://ithink.uz',
    languages: {
      'uz': 'https://ithink.uz/uz',
      'ru': 'https://ithink.uz/ru',
      'en': 'https://ithink.uz/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    alternateLocale: ['ru_RU', 'en_US'],
    url: 'https://ithink.uz',
    siteName: 'ITHINK',
    title: 'ITHINK — IT Solutions for Business',
    description: 'ITHINK is a Tashkent-based IT company providing network infrastructure, software development, CRM integration, VoIP, and managed IT services for businesses.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ITHINK — IT Solutions for Business' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ITHINK — IT Solutions for Business',
    description: 'ITHINK is a Tashkent-based IT company providing network infrastructure, software development, CRM integration, VoIP, and managed IT services for businesses.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
