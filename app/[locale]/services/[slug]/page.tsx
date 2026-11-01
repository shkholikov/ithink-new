import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/services/service-page";
import { SERVICE_SLUGS, type ServiceSlug } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

const isService = (slug: string): slug is ServiceSlug => (SERVICE_SLUGS as readonly string[]).includes(slug);

export function generateStaticParams() {
	return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	if (!isService(slug)) return {};
	const t = await getTranslations({ locale, namespace: `servicePages.${slug}.hero` });
	return pageMetadata({ locale, path: `/services/${slug}`, title: t("title"), description: t("subtitle") });
}

export default async function ServiceRoute({ params }: Props) {
	const { locale, slug } = await params;
	if (!isService(slug)) notFound();
	setRequestLocale(locale);
	return <ServicePage locale={locale} slug={slug} />;
}
