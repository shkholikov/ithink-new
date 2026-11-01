import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ locale: string; slug: string }> };

// Only the slugs the navigation links to exist. Other slugs call notFound(), which renders
// app/[locale]/not-found.tsx; dynamicParams = false would serve the Russian-only global 404 instead.
const SLUGS = ["courses", "certification", "corporate"];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  return {
    title: slug,
    alternates: {
      canonical: `https://www.ithink.uz/${locale}/training/${slug}`,
    },
  };
}

export default async function TrainingPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!SLUGS.includes(slug)) notFound();
  setRequestLocale(locale);
  const subtitle: Record<string, string> = { uz: 'Tez orada...', ru: 'Скоро...', en: 'Coming soon...' };

  return (
    <div className="pt-24 min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">Training</p>
        <h1 className="text-4xl font-bold text-foreground mb-4 capitalize">{slug.replace(/-/g, ' ')}</h1>
        <p className="text-muted-foreground text-lg">{subtitle[locale] ?? subtitle.en}</p>
      </div>
    </div>
  );
}
