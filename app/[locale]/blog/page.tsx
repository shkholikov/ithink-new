import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = { uz: 'Blog', ru: 'Блог', en: 'Blog' };
  const title = titles[locale] ?? 'Blog';
  return {
    title,
    alternates: {
      canonical: `https://ithink.uz/${locale}/blog`,
      languages: { uz: 'https://ithink.uz/uz/blog', ru: 'https://ithink.uz/ru/blog', en: 'https://ithink.uz/en/blog' },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const labels: Record<string, { title: string; subtitle: string }> = {
    uz: { title: 'Blog', subtitle: 'Tez orada...' },
    ru: { title: 'Блог', subtitle: 'Скоро...' },
    en: { title: 'Blog', subtitle: 'Coming soon...' },
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
