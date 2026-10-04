import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import PrivacyPage from '@/components/pages/privacy-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  const title = t('hero.title');
  const description = t('hero.subtitle');
  return {
    title,
    description,
    alternates: {
      canonical: `https://ithink.uz/${locale}/privacy`,
      languages: { uz: 'https://ithink.uz/uz/privacy', ru: 'https://ithink.uz/ru/privacy', en: 'https://ithink.uz/en/privacy' },
    },
    openGraph: { title, description, url: `https://ithink.uz/${locale}/privacy` },
  };
}

export default async function Privacy({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyPage locale={locale} />;
}
