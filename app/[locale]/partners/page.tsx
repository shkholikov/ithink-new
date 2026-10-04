import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import PartnersPage from '@/components/pages/partners-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'partners' });
  const title = t('title');
  const description = t('subtitle');
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.ithink.uz/${locale}/partners`,
      languages: { uz: 'https://www.ithink.uz/uz/partners', ru: 'https://www.ithink.uz/ru/partners', en: 'https://www.ithink.uz/en/partners' },
    },
    openGraph: { title, description, url: `https://www.ithink.uz/${locale}/partners` },
  };
}

export default async function Partners({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PartnersPage locale={locale} />;
}
