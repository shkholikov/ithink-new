import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import CompanyPage from '@/components/pages/company-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'company' });
  const title = t('hero.title');
  const description = t('hero.subtitle');
  return {
    title,
    description,
    alternates: {
      canonical: `https://ithink.uz/${locale}/company`,
      languages: {
        uz: 'https://ithink.uz/uz/company',
        ru: 'https://ithink.uz/ru/company',
        en: 'https://ithink.uz/en/company',
      },
    },
    openGraph: { title, description, url: `https://ithink.uz/${locale}/company` },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <CompanyPage locale={locale} />;
}
