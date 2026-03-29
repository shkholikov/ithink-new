import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = { uz: 'Karyera', ru: 'Карьера', en: 'Career' };
  const title = titles[locale] ?? 'Career';
  return {
    title,
    alternates: {
      canonical: `https://ithink.uz/${locale}/career`,
      languages: { uz: 'https://ithink.uz/uz/career', ru: 'https://ithink.uz/ru/career', en: 'https://ithink.uz/en/career' },
    },
  };
}

export default async function CareerPage({ params }: Props) {
  const { locale } = await params;
  const labels: Record<string, { title: string; subtitle: string }> = {
    uz: { title: 'Karyera', subtitle: 'Tez orada...' },
    ru: { title: 'Карьера', subtitle: 'Скоро...' },
    en: { title: 'Career', subtitle: 'Coming soon...' },
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
