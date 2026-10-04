import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CustomersPage from '@/components/pages/customers-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'customers' });
  const title = t('hero.title');
  const description = t('hero.subtitle');
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.ithink.uz/${locale}/customers`,
      languages: { uz: 'https://www.ithink.uz/uz/customers', ru: 'https://www.ithink.uz/ru/customers', en: 'https://www.ithink.uz/en/customers' },
    },
    openGraph: { title, description, url: `https://www.ithink.uz/${locale}/customers` },
  };
}

export default async function Customers({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CustomersPage locale={locale} />;
}
