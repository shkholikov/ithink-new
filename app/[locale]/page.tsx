import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import PartnersGrid from '@/components/sections/partners-grid';
import ClientsGrid from '@/components/sections/clients-grid';
import WhyUs from '@/components/sections/why-us';
import ContactCta from '@/components/sections/contact-cta';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  const title = 'ITHINK — IT Solutions for Business';
  const description = t('subtitle');
  return {
    title,
    description,
    alternates: {
      canonical: `https://ithink.uz/${locale}`,
      languages: { uz: 'https://ithink.uz/uz', ru: 'https://ithink.uz/ru', en: 'https://ithink.uz/en' },
    },
    openGraph: { title, description, url: `https://ithink.uz/${locale}` },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <Hero locale={locale} />
      <Services locale={locale} />
      <PartnersGrid />
      <ClientsGrid locale={locale} />
      <WhyUs />
      <ContactCta />
    </>
  );
}
