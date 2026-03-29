import type { Metadata } from 'next';
import AboutPage from '@/components/pages/about-page';

export const metadata: Metadata = { title: 'About Us — ITHINK' };

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <AboutPage locale={locale} />;
}
