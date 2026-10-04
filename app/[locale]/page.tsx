import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import HowItWorks from '@/components/sections/how-it-works';
import TrustedBy from '@/components/sections/trusted-by';
import WhyUs from '@/components/sections/why-us';
import Testimonials from '@/components/sections/testimonials';
import ContactCta from '@/components/sections/contact-cta';

type Props = { params: Promise<{ locale: string }> };

// Only the three locales are valid here. A path the proxy skips (anything with
// a dot, e.g. `/foo.txt`) would otherwise reach the locale layout, which is the
// root layout and has no not-found page above it. Returning 404 at routing time
// sends it to app/global-not-found.tsx instead.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  const title = 'ITHINK — IT Solutions for Business';
  const description = t('subtitle');
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.ithink.uz/${locale}`,
      languages: { uz: 'https://www.ithink.uz/uz', ru: 'https://www.ithink.uz/ru', en: 'https://www.ithink.uz/en' },
    },
    openGraph: { title, description, url: `https://www.ithink.uz/${locale}` },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero locale={locale} />
      <Services locale={locale} />
      <HowItWorks locale={locale} />
      <TrustedBy locale={locale} />
      <WhyUs locale={locale} />
      <Testimonials locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
