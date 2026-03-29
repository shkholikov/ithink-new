import type { Metadata } from 'next';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import PartnersGrid from '@/components/sections/partners-grid';
import ClientsGrid from '@/components/sections/clients-grid';
import WhyUs from '@/components/sections/why-us';
import ContactCta from '@/components/sections/contact-cta';

export const metadata: Metadata = {
  title: 'ITHINK — IT Solutions for Business',
  description: 'Comprehensive IT solutions: network infrastructure, managed IT, VoIP, software development, CRM integration.',
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
