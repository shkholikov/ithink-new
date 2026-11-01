import { getTranslations } from "next-intl/server";
import { GlassPanel } from "@/components/glassyui/glass-panel";
import { PageHero } from "@/components/site/page-hero";
import { Cta, CtaRow } from "@/components/site/cta";
import { CtaSection } from "@/components/site/cta-section";
import { IncludedSection } from "@/components/products/included-section";
import { StepsSection } from "@/components/products/steps-section";
import { AudienceSection } from "@/components/products/audience-section";
import { RelatedSection } from "@/components/products/related-section";
import { PRODUCT_CONFIG, PRODUCT_GROUPS, type ProductGroup } from "@/components/products/config";

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/** One template for the nine licence, training and solution pages; copy lives in `productPages.<group>.<slug>`. */
export async function ProductPage({ locale, group, slug }: { locale: string; group: ProductGroup; slug: string }) {
	const t = await getTranslations({ locale, namespace: `productPages.${group}.${slug}` });
	const common = await getTranslations({ locale, namespace: "productPages.common" });
	const nav = await getTranslations({ locale, namespace: "nav" });
	const config = PRODUCT_CONFIG[group][slug];
	const Icon = PRODUCT_GROUPS[group].icons[slug];

	const included = config.included.map((icon, i) => ({
		title: t(`included.items.${i}.title`),
		description: t(`included.items.${i}.description`),
		icon,
		href: config.includedHref ? `/${locale}${config.includedHref[i]}` : undefined
	}));
	const steps = range(4).map((i) => ({ title: t(`steps.items.${i}.title`), description: t(`steps.items.${i}.description`) }));
	const audience = range(4).map((i) => ({ title: t(`audience.items.${i}.title`), description: t(`audience.items.${i}.description`) }));

	return (
		<>
			<PageHero
				eyebrow={nav(group)}
				title={t("hero.title")}
				subtitle={t("hero.subtitle")}
				crumbs={[
					{ href: `/${locale}`, label: nav("home") },
					// No index page exists for the group; the crumb jumps to this page's list of the group's pages.
					{ label: nav(group) },
					{ href: `/${locale}/${group}/${slug}`, label: nav(`items.${group}.${slug}.title`) }
				]}
				actions={
					<CtaRow>
						<Cta href="#lead-form" arrow>
							{common("ctaPrimary")}
						</Cta>
						<Cta href={`/${locale}/contact`} variant="soft">
							{common("ctaSecondary")}
						</Cta>
					</CtaRow>
				}
				aside={
					<GlassPanel aria-hidden="true" preset="standard" className="relative mx-auto w-full max-w-md rounded-3xl p-6 text-ink-foreground sm:p-7 lg:ml-auto lg:mr-0">
						<div className="flex items-center justify-between">
							<span className="tag tag-scene">{common("includedEyebrow")}</span>
							<Icon className="size-5 text-ink-accent" />
						</div>
						{/* Checklist rows: index, item, a square status light. */}
						<ul className="mt-5 divide-y divide-ink-foreground/10 border-y border-ink-foreground/10">
							{included.slice(0, 4).map((item, i) => (
								<li key={item.title} className="flex items-center gap-4 py-3.5">
									<span className="w-6 text-sm font-light tabular-nums text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
									<span className="flex-1 text-sm font-semibold">{item.title}</span>
									<span className="led text-emerald-500" />
								</li>
							))}
						</ul>
					</GlassPanel>
				}
			/>

			<IncludedSection eyebrow={common("includedEyebrow")} title={t("included.title")} subtitle={t("included.subtitle")} items={included} more={common("more")} />
			<StepsSection eyebrow={common("stepsEyebrow")} title={t("steps.title")} steps={steps} />
			<AudienceSection eyebrow={common("audienceEyebrow")} title={t("audience.title")} subtitle={t("audience.subtitle")} items={audience} />
			<RelatedSection locale={locale} group={group} slug={slug} services={config.relatedServices} eyebrow={common("relatedEyebrow")} title={common("relatedTitle")} />

			<CtaSection locale={locale} pageTag={`${group}_${slug}`} service={PRODUCT_GROUPS[group].lead} title={t("cta.title")} subtitle={t("cta.subtitle")} />
		</>
	);
}
