import { getTranslations, setRequestLocale } from 'next-intl/server';
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
      canonical: `https://www.ithink.uz/${locale}/hire-us`,
      languages: { uz: 'https://www.ithink.uz/uz/hire-us', ru: 'https://www.ithink.uz/ru/hire-us', en: 'https://www.ithink.uz/en/hire-us' },
    },
    openGraph: { title, description, url: `https://www.ithink.uz/${locale}/hire-us` },
  };
}

export default async function HireUs({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HireUsPage locale={locale} />;
}
