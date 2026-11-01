import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/products/product-page";
import { isProductSlug } from "@/components/products/config";
import { TRAINING_SLUGS } from "@/lib/site-nav";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

// Only the slugs the navigation links to exist. Other slugs call notFound(), which renders
// app/[locale]/not-found.tsx; dynamicParams = false would serve the Russian-only global 404 instead.
export function generateStaticParams() {
	return TRAINING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	if (!isProductSlug("training", slug)) return {};
	const t = await getTranslations({ locale, namespace: `productPages.training.${slug}.meta` });
	return pageMetadata({ locale, path: `/training/${slug}`, title: t("title"), description: t("description") });
}

export default async function TrainingRoute({ params }: Props) {
	const { locale, slug } = await params;
	if (!isProductSlug("training", slug)) notFound();
	setRequestLocale(locale);
	return <ProductPage locale={locale} group="training" slug={slug} />;
}
