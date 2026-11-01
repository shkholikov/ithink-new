import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PartnersHero, PartnersHow, PartnersList, PartnersStory } from "@/components/partners/partners-hub";
import { CtaSection } from "@/components/site/cta-section";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "partnersHub.meta" });
	return pageMetadata({ locale, path: "/partners", title: t("title"), description: t("description") });
}

export default async function Partners({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "partnersHub.cta" });
	return (
		<>
			<PartnersHero locale={locale} />
			<PartnersList locale={locale} />
			<PartnersHow locale={locale} />
			<PartnersStory locale={locale} />
			<CtaSection locale={locale} pageTag="partners" title={t("title")} subtitle={t("subtitle")} />
		</>
	);
}
