import type { Metadata } from 'next';
import PartnersPage from '@/components/pages/partners-page';

export const metadata: Metadata = { title: 'Partners — ITHINK' };

export default async function Partners({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PartnersPage locale={locale} />;
}
