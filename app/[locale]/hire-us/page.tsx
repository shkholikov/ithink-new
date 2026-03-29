import type { Metadata } from 'next';
import HireUsPage from '@/components/pages/hire-us-page';

export const metadata: Metadata = { title: 'Hire Us — ITHINK' };

export default async function HireUs({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <HireUsPage locale={locale} />;
}
