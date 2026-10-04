import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import MotionProvider from '@/components/motion-provider';
import '../globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: {
    default: 'ITHINK — IT Solutions for Business',
    template: '%s | ITHINK'
  },
  description:
    'ITHINK is a Tashkent-based IT company providing network infrastructure, software development, CRM integration, VoIP, and managed IT services for businesses.',
  keywords: [
    'IT solutions',
    'IT company Uzbekistan',
    'CRM integration',
    'network infrastructure',
    'software development',
    'managed IT services',
    'VoIP',
    'Tashkent',
    'ITHINK'
  ],
  authors: [{ name: 'ITHINK', url: 'https://ithink.uz' }],
  creator: 'ITHINK',
  publisher: 'ITHINK',
  metadataBase: new URL('https://ithink.uz'),
  alternates: {
    canonical: 'https://ithink.uz',
    languages: {
      'uz': 'https://ithink.uz/uz',
      'ru': 'https://ithink.uz/ru',
      'en': 'https://ithink.uz/en'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    alternateLocale: ['ru_RU', 'en_US'],
    url: 'https://ithink.uz',
    siteName: 'ITHINK',
    title: 'ITHINK — IT Solutions for Business',
    description:
      'ITHINK is a Tashkent-based IT company providing network infrastructure, software development, CRM integration, VoIP, and managed IT services for businesses.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ITHINK — IT Solutions for Business' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ITHINK — IT Solutions for Business',
    description:
      'ITHINK is a Tashkent-based IT company providing network infrastructure, software development, CRM integration, VoIP, and managed IT services for businesses.',
    images: ['/og-image.png']
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
  },
  verification: {
    google: ''
  }
};


/**
 * Only the namespaces still read by a client component. The provider used to
 * serialise the entire catalogue into every page's RSC payload — including all
 * 16 KB of servicePages on the homepage, and pricing/faq/websites, which no
 * component reads at all.
 */
const CLIENT_NAMESPACES = [
  'nav',
  // error.tsx is a client component, so its copy must reach the browser —
  // without this it renders the key paths instead of the text.
  'error',
  'clients',
  'contact',
  'customers',
  'partners',
  'hireUs',
] as const;

function pick(messages: Record<string, unknown>, namespaces: readonly string[]) {
  return Object.fromEntries(namespaces.filter((ns) => ns in messages).map((ns) => [ns, messages[ns]]));
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Populates next-intl's request cache. Without this — and without passing the
  // locale to getMessages below — next-intl falls back to reading headers(),
  // which opts this whole subtree out of static rendering, so every page runs a
  // serverless function per request and answers Cache-Control: no-store.
  setRequestLocale(locale);

  const messages = (await getMessages({ locale })) as Record<string, unknown>;

  // This is the root layout, so <html lang> follows the URL locale instead of
  // being hard-coded — screen readers and search engines read it.
  return (
    <html lang={locale} className={`${inter.variable} h-full`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} scriptProps={{ id: 'next-themes-init' }}>
          <MotionProvider>
            <NextIntlClientProvider locale={locale} messages={pick(messages, CLIENT_NAMESPACES)}>
              <Navbar locale={locale} />
              <main className="flex-1">{children}</main>
              <Footer locale={locale} />
            </NextIntlClientProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
