import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { StatsPanel } from "@/components/company/stats-panel";
import { ApplyActions, ApplyBand, ApplySection, DirectionsSection, PrinciplesSection, TeamSection } from "@/components/career/career-sections";
import { CONTACT } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "careerPage.meta" });
	return pageMetadata({ locale, path: "/career", title: t("title"), description: t("description", { email: CONTACT.email }) });
}

export default async function CareerPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "careerPage.hero" });
	const nav = await getTranslations({ locale, namespace: "nav" });

	return (
		<>
			<PageHero
				eyebrow={t("eyebrow")}
				title={t("title")}
				subtitle={t("subtitle")}
				crumbs={[
					{ href: `/${locale}`, label: nav("home") },
					{ href: `/${locale}/career`, label: nav("career") }
				]}
				actions={<ApplyActions locale={locale} />}
				aside={<StatsPanel locale={locale} keys={["team", "since", "clients", "markets"]} />}
			/>
			<TeamSection locale={locale} />
			<DirectionsSection locale={locale} />
			<PrinciplesSection locale={locale} />
			<ApplySection locale={locale} />
			<ApplyBand locale={locale} />
		</>
	);
}
