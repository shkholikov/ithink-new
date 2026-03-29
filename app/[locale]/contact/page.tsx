import type { Metadata } from 'next';
import ContactPage from '@/components/pages/contact-page';

export const metadata: Metadata = { title: 'Contact — ITHINK' };

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ContactPage locale={locale} />;
}
