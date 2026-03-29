import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import HireUsPage from '@/components/pages/hire-us-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hireUs' });
  const title = t('hero.title');
  const description = t('hero.subtitle');
  return {
    title,
    description,
    alternates: {
      canonical: `https://ithink.uz/${locale}/hire-us`,
      languages: { uz: 'https://ithink.uz/uz/hire-us', ru: 'https://ithink.uz/ru/hire-us', en: 'https://ithink.uz/en/hire-us' },
    },
    openGraph: { title, description, url: `https://ithink.uz/${locale}/hire-us` },
  };
}

export default async function HireUs({ params }: Props) {
  const { locale } = await params;
  return <HireUsPage locale={locale} />;
}
