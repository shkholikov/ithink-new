import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string; slug: string }> };

// The slugs the navigation actually links to, so these pages are built once
// instead of invoking a function per request. dynamicParams stays at its
// default of true, so any other slug still renders on demand exactly as before.
export function generateStaticParams() {
  return [{ slug: "courses" }, { slug: "certification" }, { slug: "corporate" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  return {
    title: slug,
    alternates: {
      canonical: `https://ithink.uz/${locale}/training/${slug}`,
    },
  };
}

export default async function TrainingPage({ params }: Props) {
  const { locale, slug } = await params;
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
