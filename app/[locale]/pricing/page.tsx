import type { Metadata } from 'next';
import PricingPage from '@/components/pages/pricing-page';

export const metadata: Metadata = { title: 'Pricing — ITHINK' };

export default async function Pricing({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PricingPage locale={locale} />;
}
