import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

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

  return (
    <NextIntlClientProvider locale={locale} messages={pick(messages, CLIENT_NAMESPACES)}>
      <Navbar locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
