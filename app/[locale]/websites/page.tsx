import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import WebsitesPage from '@/components/pages/websites-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'websites' });
  const title = t('hero.title');
  const description = t('hero.subtitle');
  return {
    title,
    description,
    alternates: {
      canonical: `https://ithink.uz/${locale}/websites`,
      languages: { uz: 'https://ithink.uz/uz/websites', ru: 'https://ithink.uz/ru/websites', en: 'https://ithink.uz/en/websites' },
    },
    openGraph: { title, description, url: `https://ithink.uz/${locale}/websites` },
  };
}

export default async function Websites({ params }: Props) {
  const { locale } = await params;
  return <WebsitesPage locale={locale} />;
}
