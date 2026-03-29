import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PricingPage from '@/components/pages/pricing-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const title = t('hero.title');
  const description = t('hero.subtitle');
  return {
    title,
    description,
    alternates: {
      canonical: `https://ithink.uz/${locale}/pricing`,
      languages: { uz: 'https://ithink.uz/uz/pricing', ru: 'https://ithink.uz/ru/pricing', en: 'https://ithink.uz/en/pricing' },
    },
    openGraph: { title, description, url: `https://ithink.uz/${locale}/pricing` },
  };
}

export default async function Pricing({ params }: Props) {
  const { locale } = await params;
  return <PricingPage locale={locale} />;
}
