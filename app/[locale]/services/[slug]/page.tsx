import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage, { type ServiceSlug } from "@/components/pages/service-page";

const validSlugs: ServiceSlug[] = ["it-infrastructure", "managed-it", "crm-automation", "process-automation", "software-development", "it-audit"];

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
	return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	if (!validSlugs.includes(slug as ServiceSlug)) return {};
	const t = await getTranslations({ locale, namespace: "servicePages" });
	const title = t(`${slug}.hero.title`);
	const description = t(`${slug}.hero.subtitle`);
	return {
		title,
		description,
		alternates: {
			canonical: `https://ithink.uz/${locale}/services/${slug}`,
			languages: {
				uz: `https://ithink.uz/uz/services/${slug}`,
				ru: `https://ithink.uz/ru/services/${slug}`,
				en: `https://ithink.uz/en/services/${slug}`
			}
		},
		openGraph: { title, description, url: `https://ithink.uz/${locale}/services/${slug}` }
	};
}

export default async function ServiceRoute({ params }: Props) {
	const { locale, slug } = await params;
	if (!validSlugs.includes(slug as ServiceSlug)) notFound();
	return <ServicePage locale={locale} slug={slug as ServiceSlug} />;
}
