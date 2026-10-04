import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ContactPage from '@/components/pages/contact-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const title = t('hero.title');
  const description = t('hero.subtitle');
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.ithink.uz/${locale}/contact`,
      languages: { uz: 'https://www.ithink.uz/uz/contact', ru: 'https://www.ithink.uz/ru/contact', en: 'https://www.ithink.uz/en/contact' },
    },
    openGraph: { title, description, url: `https://www.ithink.uz/${locale}/contact` },
  };
}

export default async function Contact({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactPage locale={locale} />;
}
