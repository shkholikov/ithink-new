import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = { uz: 'Kompaniya haqida', ru: 'О компании', en: 'About Company' };
  const title = titles[locale] ?? 'About Company';
  return {
    title,
    alternates: {
      canonical: `https://ithink.uz/${locale}/company`,
      languages: { uz: 'https://ithink.uz/uz/company', ru: 'https://ithink.uz/ru/company', en: 'https://ithink.uz/en/company' },
    },
  };
}

export default async function CompanyPage({ params }: Props) {
  const { locale } = await params;
  const labels: Record<string, { title: string; subtitle: string }> = {
    uz: { title: 'Kompaniya haqida', subtitle: 'Tez orada...' },
    ru: { title: 'О компании', subtitle: 'Скоро...' },
    en: { title: 'About Company', subtitle: 'Coming soon...' },
  };
  const { title, subtitle } = labels[locale] ?? labels.en;

  return (
    <div className="pt-24 min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-muted-foreground text-lg">{subtitle}</p>
      </div>
    </div>
  );
}
