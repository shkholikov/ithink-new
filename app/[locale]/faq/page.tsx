import type { Metadata } from 'next';
import FaqPage from '@/components/pages/faq-page';

export const metadata: Metadata = { title: 'FAQ — ITHINK' };

export default async function Faq({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <FaqPage locale={locale} />;
}
