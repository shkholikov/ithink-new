import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import FaqPage from '@/components/pages/faq-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  const title = t('hero.title');
  const description = t('hero.subtitle');
  return {
    title,
    description,
    alternates: {
      canonical: `https://ithink.uz/${locale}/faq`,
      languages: { uz: 'https://ithink.uz/uz/faq', ru: 'https://ithink.uz/ru/faq', en: 'https://ithink.uz/en/faq' },
    },
    openGraph: { title, description, url: `https://ithink.uz/${locale}/faq` },
  };
}

export default async function Faq({ params }: Props) {
  const { locale } = await params;
  return <FaqPage locale={locale} />;
}
