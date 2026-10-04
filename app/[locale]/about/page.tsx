import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import AboutPage from '@/components/pages/about-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const title = t('hero.title');
  const description = t('hero.subtitle');
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.ithink.uz/${locale}/about`,
      languages: { uz: 'https://www.ithink.uz/uz/about', ru: 'https://www.ithink.uz/ru/about', en: 'https://www.ithink.uz/en/about' },
    },
    openGraph: { title, description, url: `https://www.ithink.uz/${locale}/about` },
  };
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPage locale={locale} />;
}
