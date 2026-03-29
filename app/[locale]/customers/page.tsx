import { getTranslations } from 'next-intl/server';
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
      canonical: `https://ithink.uz/${locale}/customers`,
      languages: { uz: 'https://ithink.uz/uz/customers', ru: 'https://ithink.uz/ru/customers', en: 'https://ithink.uz/en/customers' },
    },
    openGraph: { title, description, url: `https://ithink.uz/${locale}/customers` },
  };
}

export default async function Customers({ params }: Props) {
  const { locale } = await params;
  return <CustomersPage locale={locale} />;
}
