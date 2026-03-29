import type { Metadata } from 'next';
import CustomersPage from '@/components/pages/customers-page';

export const metadata: Metadata = { title: 'Clients — ITHINK' };

export default async function Customers({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <CustomersPage locale={locale} />;
}
