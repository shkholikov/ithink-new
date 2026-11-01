import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { SITE_URL } from '@/lib/seo';
import { CONTACT } from '@/lib/contact';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import MotionProvider from '@/components/motion-provider';
import AttributionCapture from '@/components/attribution-capture';
import '@/components/glassyui/styles/liquid.css';
import '@/components/glassyui/styles/dark-scope.css';
import '../globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
});

/** Site-wide defaults. Every page sets its own title, description, canonical and hreflang via lib/seo.ts. */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  return {
    title: { default: t('title'), template: '%s | ITHINK' },
    description: t('description'),
    applicationName: 'ITHINK',
    authors: [{ name: 'ITHINK', url: SITE_URL }],
    creator: 'ITHINK',
    publisher: 'ITHINK',
    metadataBase: new URL(SITE_URL),
    openGraph: { type: 'website', siteName: 'ITHINK' },
    twitter: { card: 'summary_large_image' },
    icons: { icon: '/favicon.ico', shortcut: '/favicon.ico' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  };
}

/** Organization + LocalBusiness structured data, one graph per page. */
function organizationJsonLd(description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${SITE_URL}/#organization`,
        name: 'ITHINK',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description,
        foundingDate: '2020',
        email: CONTACT.email,
        telephone: CONTACT.phoneHref.replace('tel:', ''),
        address: { '@type': 'PostalAddress', addressLocality: 'Tashkent', addressCountry: 'UZ' },
        areaServed: ['UZ', 'KZ', 'TJ', 'US'],
        sameAs: [CONTACT.telegramHref, CONTACT.instagramHref],
      },
    ],
  };
}


/**
 * Only the namespaces still read by a client component. The provider used to
 * serialise the entire catalogue into every page's RSC payload — including all
 * 16 KB of servicePages on the homepage, and pricing/faq/websites, which no
 * component reads at all.
 */
const CLIENT_NAMESPACES = [
  // error.tsx is a client component, so its copy must reach the browser.
  'error',
  // LeadForm is the only other client component that reads messages; every
  // other client island receives its strings as props from a server component.
  'leadForm',
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
  const meta = await getTranslations({ locale, namespace: 'home.meta' });
  // Escape "<" so no string in the data can close the script element.
  const jsonLd = JSON.stringify(organizationJsonLd(meta('description'))).replace(/</g, '\\u003c');

  // This is the root layout, so <html lang> follows the URL locale instead of
  // being hard-coded — screen readers and search engines read it.
  return (
    <html lang={locale} className={`${inter.variable} h-full`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        {/* data-lg-theme drives the GlassyUI glass tokens; it follows the site theme. Light is the default. */}
        <ThemeProvider attribute={['class', 'data-lg-theme']} defaultTheme="light" enableSystem={false} scriptProps={{ id: 'next-themes-init' }}>
          <MotionProvider>
            <NextIntlClientProvider locale={locale} messages={pick(messages, CLIENT_NAMESPACES)}>
              <Navbar locale={locale} />
              <main id="main" className="flex-1">{children}</main>
              <Footer locale={locale} />
              <AttributionCapture />
            </NextIntlClientProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
