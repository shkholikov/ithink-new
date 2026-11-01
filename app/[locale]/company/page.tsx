import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Cta, CtaRow } from "@/components/site/cta";
import { CtaSection } from "@/components/site/cta-section";
import { StatsPanel } from "@/components/company/stats-panel";
import { MarketsSection, MilestonesSection, MissionSection, StorySection, ValuesSection, WhySection } from "@/components/company/company-sections";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "companyPage.meta" });
	return pageMetadata({ locale, path: "/company", title: t("title"), description: t("description") });
}

export default async function CompanyPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "companyPage.hero" });
	const nav = await getTranslations({ locale, namespace: "nav" });
	const cta = await getTranslations({ locale, namespace: "company.cta" });

	return (
		<>
			<PageHero
				eyebrow={t("eyebrow")}
				title={t("title")}
				subtitle={t("subtitle")}
				crumbs={[
					{ href: `/${locale}`, label: nav("home") },
					{ href: `/${locale}/company`, label: nav("company") }
				]}
				actions={
					<CtaRow>
						<Cta href={`/${locale}/contact`} arrow>
							{nav("freeCta")}
						</Cta>
						<Cta href={`/${locale}/customers`} variant="soft">
							{t("ctaSecondary")}
						</Cta>
					</CtaRow>
				}
				aside={<StatsPanel locale={locale} keys={["clients", "projects", "team", "markets", "since"]} />}
			/>
			<StorySection locale={locale} />
			<MissionSection locale={locale} />
			<ValuesSection locale={locale} />
			<MilestonesSection locale={locale} />
			<WhySection locale={locale} />
			<MarketsSection locale={locale} />
			<CtaSection locale={locale} pageTag="company" title={cta("title")} />
		</>
	);
}
