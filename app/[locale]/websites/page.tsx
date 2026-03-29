import type { Metadata } from 'next';
import WebsitesPage from '@/components/pages/websites-page';

export const metadata: Metadata = { title: 'Websites — ITHINK' };

export default async function Websites({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <WebsitesPage locale={locale} />;
}
