import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { Cta, CtaRow } from "@/components/site/cta";
import { CtaSection } from "@/components/site/cta-section";
import { PAGE_TO_LEAD_SERVICE } from "@/lib/lead";
import { SERVICE_SLUGS, type ServiceSlug } from "@/lib/services";
import { SITE_URL } from "@/lib/seo";
import { SERVICE_CONFIG, range } from "./config";
import { ServiceHeroVisual } from "./visuals/hero-visual";
import { FeatureBento } from "./feature-bento";
import { Stepper } from "@/components/site/stepper";
import { OutcomesCompare } from "./outcomes-compare";
import { ServiceFaq } from "./service-faq";
import { RelatedServices } from "./related-services";

/**
 * One template for the six service pages; copy lives in `servicePages.<slug>`, per-service icons,
 * bento visuals and FAQ picks in `config.ts`. Order: hero with a live visual, feature bento, shared
 * Stepper process, before/after ink band, FAQ, related services, lead form.
 */
export async function ServicePage({ locale, slug }: { locale: string; slug: ServiceSlug }) {
	const t = await getTranslations({ locale, namespace: `servicePages.${slug}` });
	const common = await getTranslations({ locale, namespace: "servicePages.common" });
	const nav = await getTranslations({ locale, namespace: "nav" });
	const faq = await getTranslations({ locale, namespace: "faq" });
	const faqHeading = await getTranslations({ locale, namespace: "home.faq" });
	const config = SERVICE_CONFIG[slug];

	const features = range(6).map((i) => ({
		title: t(`features.items.${i}.title`),
		description: t(`features.items.${i}.description`),
		visual: config.wide.find((w) => w.index === i)?.visual
	}));
	const steps = range(4).map((i) => ({
		title: t(`process.items.${i}.title`),
		description: t(`process.items.${i}.description`)
	}));
	const outcomes = range(3).map((i) => ({
		before: t(`before.${i}`),
		title: t(`outcomes.items.${i}.title`),
		description: t(`outcomes.items.${i}.description`)
	}));
	const related = SERVICE_SLUGS.map((s, i) => ({ s, i })).filter(({ s }) => s !== slug).map(({ s, i }) => ({
		slug: s,
		index: i + 1,
		title: nav(`items.services.${s}.title`),
		description: nav(`items.services.${s}.description`)
	}));

	const jsonLd = JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Service",
		name: nav(`items.services.${slug}.title`),
		description: t("hero.subtitle"),
		url: `${SITE_URL}/${locale}/services/${slug}`,
		provider: { "@id": `${SITE_URL}/#organization` },
		areaServed: ["UZ", "KZ", "TJ", "US"]
	}).replace(/</g, "\\u003c");

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
			<PageHero
				eyebrow={t("hero.badge")}
				title={t("hero.title")}
				subtitle={t("hero.subtitle")}
				crumbs={[
					{ href: `/${locale}`, label: nav("home") },
					{ href: `/${locale}#services`, label: nav("services") },
					{ href: `/${locale}/services/${slug}`, label: nav(`items.services.${slug}.title`) }
				]}
				actions={
					<CtaRow>
						<Cta href="#lead-form" arrow>
							{common("ctaPrimary")}
						</Cta>
						<Cta href={`/${locale}#services`} variant="soft">
							{common("ctaSecondary")}
						</Cta>
					</CtaRow>
				}
				aside={<ServiceHeroVisual locale={locale} slug={slug} />}
			/>

			<Section>
				<SectionHeading eyebrow={t("features.badge")} title={t("features.title")} />
				<FeatureBento items={features} />
			</Section>

			<Section tone="muted">
				<SectionHeading eyebrow={t("process.badge")} title={t("process.title")} />
				<Stepper steps={steps} />
			</Section>

			<OutcomesCompare badge={t("outcomes.badge")} title={t("outcomes.title")} labels={{ before: common("before"), after: common("after") }} rows={outcomes} />

			<ServiceFaq
				heading={{ eyebrow: faqHeading("eyebrow"), title: faqHeading("title"), subtitle: faqHeading("subtitle") }}
				items={config.faq.map((i) => ({ q: faq(`items.${i}.q`), a: faq(`items.${i}.a`) }))}
			/>

			<RelatedServices locale={locale} eyebrow={common("otherEyebrow")} title={common("otherTitle")} items={related} />

			<CtaSection locale={locale} pageTag={slug.replace(/-/g, "_")} service={PAGE_TO_LEAD_SERVICE[slug]} title={t("cta.title")} subtitle={t("cta.subtitle")} />
		</>
	);
}
