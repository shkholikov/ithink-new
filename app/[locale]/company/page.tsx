import { getTranslations, setRequestLocale } from 'next-intl/server';
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
      canonical: `https://www.ithink.uz/${locale}/company`,
      languages: {
        uz: 'https://www.ithink.uz/uz/company',
        ru: 'https://www.ithink.uz/ru/company',
        en: 'https://www.ithink.uz/en/company',
      },
    },
    openGraph: { title, description, url: `https://www.ithink.uz/${locale}/company` },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CompanyPage locale={locale} />;
}
