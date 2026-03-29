import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  return {
    title: slug,
    alternates: {
      canonical: `https://ithink.uz/${locale}/solutions/${slug}`,
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { locale, slug } = await params;
  const subtitle: Record<string, string> = { uz: 'Tez orada...', ru: 'Скоро...', en: 'Coming soon...' };

  return (
    <div className="pt-24 min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">Solutions</p>
        <h1 className="text-4xl font-bold text-foreground mb-4 capitalize">{slug.replace(/-/g, ' ')}</h1>
        <p className="text-muted-foreground text-lg">{subtitle[locale] ?? subtitle.en}</p>
      </div>
    </div>
  );
}
