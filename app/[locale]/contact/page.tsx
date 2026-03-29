import { getTranslations } from 'next-intl/server';
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
      canonical: `https://ithink.uz/${locale}/contact`,
      languages: { uz: 'https://ithink.uz/uz/contact', ru: 'https://ithink.uz/ru/contact', en: 'https://ithink.uz/en/contact' },
    },
    openGraph: { title, description, url: `https://ithink.uz/${locale}/contact` },
  };
}

export default async function Contact({ params }: Props) {
  const { locale } = await params;
  return <ContactPage locale={locale} />;
}
