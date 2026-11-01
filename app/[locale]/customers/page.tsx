import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Cta, CtaRow } from "@/components/site/cta";
import { CtaSection } from "@/components/site/cta-section";
import { ClientWall, ClientsSection, FeaturedCases, QuotesSection } from "@/components/customers/customer-sections";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "customersPage.meta" });
	return pageMetadata({ locale, path: "/customers", title: t("title"), description: t("description") });
}

export default async function CustomersPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "customersPage.hero" });
	const nav = await getTranslations({ locale, namespace: "nav" });

	return (
		<>
			<PageHero
				eyebrow={t("eyebrow")}
				title={t("title")}
				subtitle={t("subtitle")}
				crumbs={[
					{ href: `/${locale}`, label: nav("home") },
					{ href: `/${locale}/customers`, label: nav("clients") }
				]}
				actions={
					<CtaRow>
						<Cta href={`/${locale}/contact`} arrow>
							{nav("freeCta")}
						</Cta>
						<Cta href={`/${locale}/customers#cases`} variant="soft">
							{t("casesCta")}
						</Cta>
					</CtaRow>
				}
				aside={<ClientWall locale={locale} />}
			/>
			<FeaturedCases locale={locale} />
			<ClientsSection locale={locale} />
			<QuotesSection locale={locale} />
			<CtaSection locale={locale} pageTag="customers" />
		</>
	);
}
