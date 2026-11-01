import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PartnerPage } from "@/components/partners/partner-page";
import { isPartnerSlug } from "@/components/partners/partner-meta";
import { PARTNER_SLUGS } from "@/lib/site-nav";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
	return PARTNER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	if (!isPartnerSlug(slug)) return {};
	const t = await getTranslations({ locale, namespace: `partnerPages.${slug}.meta` });
	return pageMetadata({ locale, path: `/partners/${slug}`, title: t("title"), description: t("description") });
}

export default async function PartnerRoute({ params }: Props) {
	const { locale, slug } = await params;
	// Unknown slugs get the localized app/[locale]/not-found.tsx.
	if (!isPartnerSlug(slug)) notFound();
	setRequestLocale(locale);
	return <PartnerPage locale={locale} slug={slug} />;
}
