import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, BadgeCheck, GraduationCap, LifeBuoy, Rocket, Settings2 } from "lucide-react";
import { GlassPanel } from "@/components/glassyui/glass-panel";
import { MagicCard } from "@/components/ui/magic-card";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { Cta, CtaRow } from "@/components/site/cta";
import { FeatureGrid } from "@/components/site/feature-grid";
import { CrmBeam } from "@/components/home/crm-beam";
import { PARTNER_SLUGS, type PartnerSlug } from "@/lib/site-nav";
import { PartnerMark } from "@/components/partners/partner-mark";

type Item = { title: string; description: string };

async function partnerList(locale: string) {
	const pages = await getTranslations({ locale, namespace: "partnerPages" });
	const partners = await getTranslations({ locale, namespace: "partners" });
	return PARTNER_SLUGS.map((slug, i) => ({
		slug,
		name: pages(`${slug}.name`),
		category: pages(`${slug}.category`),
		description: partners(`items.${i}.description`)
	}));
}

export async function PartnersHero({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "partnersHub.hero" });
	const nav = await getTranslations({ locale, namespace: "nav" });
	const list = await partnerList(locale);

	return (
		<PageHero
			eyebrow={t("eyebrow")}
			title={t("title")}
			subtitle={t("subtitle")}
			crumbs={[
				{ href: `/${locale}`, label: nav("home") },
				{ href: `/${locale}/partners`, label: nav("partners") }
			]}
			actions={
				<CtaRow>
					<Cta href="#lead-form" arrow>
						{t("ctaPrimary")}
					</Cta>
					<Cta href={`/${locale}/services/crm-automation`} variant="soft">
						{t("ctaSecondary")}
					</Cta>
				</CtaRow>
			}
			aside={
				<GlassPanel preset="prominent" className="mx-auto w-full max-w-lg rounded-3xl p-4 sm:p-5 lg:ml-auto lg:mr-0">
					<ul className="grid grid-cols-2 gap-2.5">
						{list.map((p) => (
							<li key={p.slug}>
								<Link
									href={`/${locale}/partners/${p.slug}`}
									className="flex h-full flex-col gap-3 rounded-2xl border border-ink-foreground/10 bg-ink-foreground/5 p-4 transition-colors hover:bg-ink-foreground/10"
								>
									<PartnerMark slug={p.slug} name="" className="size-10" />
									<span>
										<span className="block text-sm font-semibold text-ink-foreground">{p.name}</span>
										<span className="block text-xs text-ink-muted">{p.category}</span>
									</span>
								</Link>
							</li>
						))}
					</ul>
				</GlassPanel>
			}
		/>
	);
}

export async function PartnersList({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "partnersHub.list" });
	const partners = await getTranslations({ locale, namespace: "partners" });
	const list = await partnerList(locale);

	return (
		<Section>
			<SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
			<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{list.map((p) => (
					<li key={p.slug} className="reveal">
						<MagicCard className="h-full rounded-3xl" gradientColor="rgba(55,125,255,0.10)" gradientFrom="#377dff" gradientTo="#f9b934">
							<Link href={`/${locale}/partners/${p.slug}`} className="group relative flex h-full flex-col p-6 sm:p-7">
								<span className="flex items-start justify-between gap-3">
									<PartnerMark slug={p.slug} name="" className="size-12" />
									<span className="tag">
										<BadgeCheck className="size-3.5 text-brand-text" aria-hidden="true" />
										{partners("officialPartner")}
									</span>
								</span>
								<span className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-text">{p.category}</span>
								<span className="mt-2 text-lg font-semibold tracking-tight text-foreground">{p.name}</span>
								<span className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</span>
								<span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-text">
									{t("more")}
									<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
								</span>
							</Link>
						</MagicCard>
					</li>
				))}
			</ul>
		</Section>
	);
}

const HOW_ICONS = [Rocket, Settings2, GraduationCap, LifeBuoy];

export async function PartnersHow({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "partnersHub.how" });
	const items = (t.raw("items") as Item[]).map((item, i) => ({ ...item, icon: HOW_ICONS[i], meta: `0${i + 1}` }));

	return (
		<Section tone="muted">
			<SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
			<FeatureGrid items={items} columns={4} />
		</Section>
	);
}

const STORY_ROWS: { key: "messengers" | "telephony" | "crm"; slugs: PartnerSlug[] }[] = [
	{ key: "messengers", slugs: ["wazzup"] },
	{ key: "telephony", slugs: ["online-pbx", "itgrix"] },
	{ key: "crm", slugs: ["amocrm", "bitrix24"] }
];

export async function PartnersStory({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "partnersHub.story" });
	const crm = await getTranslations({ locale, namespace: "home.crm" });
	const pages = await getTranslations({ locale, namespace: "partnerPages" });

	return (
		<Section>
			<div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
				<div>
					<SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} className="mb-8 sm:mb-10" />
					<ul className="reveal space-y-3">
						{STORY_ROWS.map((row) => (
							<li key={row.key} className="rounded-2xl border border-border bg-card p-4">
								<p className="text-xs font-semibold uppercase tracking-wider text-brand-text">{t(`${row.key}.label`)}</p>
								<p className="mt-1.5 text-sm leading-relaxed text-foreground">{t(`${row.key}.text`)}</p>
								<p className="mt-3 flex flex-wrap gap-2">
									{row.slugs.map((slug) => (
										<Link
											key={slug}
											href={`/${locale}/partners/${slug}`}
											className="tag hover:border-brand/50 hover:text-brand-text"
										>
											{pages(`${slug}.name`)}
											<ArrowRight className="size-3" aria-hidden="true" />
										</Link>
									))}
								</p>
							</li>
						))}
					</ul>
				</div>
				<div className="reveal">
					<CrmBeam labels={{ website: crm("website"), phone: crm("phone"), hub: crm("hub"), team: crm("team") }} />
				</div>
			</div>
		</Section>
	);
}
