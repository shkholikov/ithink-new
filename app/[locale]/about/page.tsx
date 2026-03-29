import { getTranslations } from 'next-intl/server';
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
      canonical: `https://ithink.uz/${locale}/about`,
      languages: { uz: 'https://ithink.uz/uz/about', ru: 'https://ithink.uz/ru/about', en: 'https://ithink.uz/en/about' },
    },
    openGraph: { title, description, url: `https://ithink.uz/${locale}/about` },
  };
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  return <AboutPage locale={locale} />;
}
