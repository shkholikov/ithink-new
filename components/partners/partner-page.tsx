import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Check, GraduationCap, Plug, Plus, Search, Settings2 } from "lucide-react";
import { GlassPanel } from "@/components/glassyui/glass-panel";
import { NumberTicker } from "@/components/ui/number-ticker";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { Cta, CtaRow } from "@/components/site/cta";
import { FeatureGrid } from "@/components/site/feature-grid";
import { CtaSection } from "@/components/site/cta-section";
import { PARTNER_SLUGS, type PartnerSlug } from "@/lib/site-nav";
import { PARTNER_ICONS, PARTNER_LEAD_SERVICE, PARTNER_LINKS, PARTNER_LOGOS } from "@/components/partners/partner-meta";

type Item = { title: string; description: string };
type Faq = { q: string; a: string };
type Stat = { value: string; label: string };
type Group = { title: string; items: string[] };

const WORK_ICONS = [Search, Settings2, Plug, GraduationCap];

/**
 * One template for every partner page, driven by `partnerPages.<slug>`. Optional blocks (stats,
 * integrations, faq, linkLabel) render only when the namespace has them. Light sections alternate
 * default and muted in the order they appear.
 */
export async function PartnerPage({ locale, slug }: { locale: string; slug: PartnerSlug }) {
	const t = await getTranslations({ locale, namespace: `partnerPages.${slug}` });
	const common = await getTranslations({ locale, namespace: "partnerPages.common" });
	const nav = await getTranslations({ locale, namespace: "nav" });
	const partners = await getTranslations({ locale, namespace: "partners" });

	const name = t("name");
	const Icon = PARTNER_ICONS[slug];
	const logo = PARTNER_LOGOS[slug];
	const external = PARTNER_LINKS[slug];
	const tags = t.raw("tags") as string[];
	const stats = t.has("stats") ? (t.raw("stats") as Stat[]) : [];
	const work = (t.raw("work.items") as Item[]).map((item, i) => ({ ...item, icon: WORK_ICONS[i % WORK_ICONS.length], meta: `0${i + 1}` }));
	const features = t.raw("features.items") as string[];
	const forWhom = t.raw("forWhom.items") as Item[];
	const groups = t.has("integrations") ? (t.raw("integrations.groups") as Group[]) : [];
	const faq = t.has("faq") ? (t.raw("faq.items") as Faq[]) : [];
	const others = PARTNER_SLUGS.filter((s) => s !== slug).map((s) => ({
		slug: s,
		name: nav(`items.partners.${s}.title`),
		description: nav(`items.partners.${s}.description`),
		icon: PARTNER_ICONS[s]
	}));

	// Light sections after the hero, in order; tones alternate starting from default.
	const sections: { key: string; node: (tone: "default" | "muted") => React.ReactNode }[] = [
		{
			key: "about",
			node: (tone) => (
				<Section tone={tone}>
					<div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
						<div>
							<SectionHeading eyebrow={common("about")} title={t("about.title")} className="mb-8 sm:mb-8" />
							<p className="reveal max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t("about.text")}</p>
						</div>
						<div className="reveal">
							<h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-text">{t("forWhom.title")}</h3>
							<ul className="space-y-3">
								{forWhom.map((item) => (
									<li key={item.title} className="rounded-3xl border border-border bg-card p-6">
										<p className="font-semibold text-foreground">{item.title}</p>
										<p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
									</li>
								))}
							</ul>
						</div>
					</div>
				</Section>
			)
		},
		{
			key: "work",
			node: (tone) => (
				<Section tone={tone}>
					<SectionHeading eyebrow={common("work")} title={t("work.title")} />
					<FeatureGrid items={work} columns={4} />
				</Section>
			)
		},
		{
			key: "features",
			node: (tone) => (
				<Section tone={tone}>
					<SectionHeading eyebrow={common("features")} title={t("features.title")} />
					<CheckList items={features} className="sm:grid-cols-2" />
				</Section>
			)
		}
	];

	if (groups.length > 0) {
		sections.push({
			key: "integrations",
			node: (tone) => (
				<Section tone={tone}>
					<SectionHeading eyebrow={common("integrations")} title={t("integrations.title")} />
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
						{groups.map((group) => (
							<div key={group.title} className="reveal rounded-3xl border border-border bg-card p-6 sm:p-8">
								<h3 className="mb-5 text-lg font-semibold tracking-tight text-foreground">{group.title}</h3>
								<CheckList items={group.items} plain />
							</div>
						))}
					</div>
				</Section>
			)
		});
	}

	if (faq.length > 0) {
		sections.push({
			key: "faq",
			node: (tone) => (
				<Section tone={tone}>
					<div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
						<SectionHeading eyebrow={name} title={common("faq")} className="lg:sticky lg:top-28 lg:self-start" />
						<div className="reveal divide-y divide-border rounded-3xl border border-border bg-card">
							{faq.map((item) => (
								<details key={item.q} className="group px-6 [&_summary::-webkit-details-marker]:hidden">
									<summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-medium text-foreground">
										{item.q}
										<Plus className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
									</summary>
									<p className="-mt-1 pb-5 leading-relaxed text-muted-foreground">{item.a}</p>
								</details>
							))}
						</div>
					</div>
				</Section>
			)
		});
	}

	sections.push({
		key: "others",
		node: (tone) => (
			<Section tone={tone}>
				<SectionHeading eyebrow={common("others")} title={common("othersTitle")} />
				<ul className="reveal grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
					{others.map((p) => (
						<li key={p.slug}>
							<Link
								href={`/${locale}/partners/${p.slug}`}
								className="group flex h-full flex-col rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand/40"
							>
								<span className="flex items-center justify-between gap-2 text-sm font-semibold text-foreground">
									<span className="inline-flex items-center gap-2">
										<p.icon className="size-4 text-brand-text" aria-hidden="true" />
										{p.name}
									</span>
									<ArrowUpRight
										className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-text"
										aria-hidden="true"
									/>
								</span>
								<span className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.description}</span>
							</Link>
						</li>
					))}
				</ul>
				<div className="reveal mt-8">
					<Cta href={`/${locale}/partners`} variant="ghost" size="md" arrow>
						{common("ctaAll")}
					</Cta>
				</div>
			</Section>
		)
	});

	return (
		<>
			<PageHero
				eyebrow={partners("officialPartner")}
				title={t("hero.title")}
				subtitle={t("hero.subtitle")}
				crumbs={[
					{ href: `/${locale}`, label: nav("home") },
					{ href: `/${locale}/partners`, label: nav("partners") },
					{ href: `/${locale}/partners/${slug}`, label: name }
				]}
				actions={
					<CtaRow>
						<Cta href="#lead-form" arrow>
							{common("ctaPrimary")}
						</Cta>
						{external && t.has("linkLabel") ? (
							<Cta href={external} variant="soft">
								{t("linkLabel")}
								<ArrowUpRight className="size-4" aria-hidden="true" />
							</Cta>
						) : PARTNER_LEAD_SERVICE[slug] ? (
							<Cta href={`/${locale}/services/crm-automation`} variant="soft">
								{common("ctaCrm")}
							</Cta>
						) : (
							<Cta href={`/${locale}/partners`} variant="soft">
								{common("ctaAll")}
							</Cta>
						)}
					</CtaRow>
				}
				aside={
					<GlassPanel preset="prominent" className="mx-auto w-full max-w-md rounded-3xl p-6 sm:p-8 lg:ml-auto lg:mr-0">
						{logo ? (
							<div className="flex h-24 items-center justify-center rounded-2xl bg-white px-6">
								<Image src={logo.src} alt={name} width={logo.width} height={logo.height} sizes="240px" className="h-16 w-auto" priority />
							</div>
						) : (
							<div className="flex items-center gap-4">
								<span className="flex size-14 items-center justify-center rounded-2xl bg-[#377dff]/25">
									<Icon className="size-6 text-[#9cc0ff]" aria-hidden="true" />
								</span>
								<div>
									<p className="text-2xl font-semibold tracking-tight text-white">{name}</p>
									<p className="text-sm text-ink-muted">{t("category")}</p>
								</div>
							</div>
						)}
						{logo && <p className="mt-4 text-sm text-ink-muted">{t("category")}</p>}
						{stats.length > 0 && (
							<dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
								{stats.map((s) => {
									const [, num, suffix] = /^(\d+)(.*)$/.exec(s.value) ?? [];
									const value = Number(num);
									return (
										<div key={s.label} className="flex flex-col gap-1 bg-ink/80 p-3 sm:p-4">
											<dt className="order-2 text-xs leading-snug text-ink-muted">{s.label}</dt>
											<dd className="order-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
												{num ? (
													<NumberTicker value={value} startValue={value > 1900 ? 2000 : 0} className="tracking-tight text-white dark:text-white" />
												) : (
													s.value
												)}
												<span className="text-[#9cc0ff]">{suffix}</span>
											</dd>
										</div>
									);
								})}
							</dl>
						)}
						<ul className="mt-6 flex flex-wrap gap-2">
							{tags.map((tag) => (
								<li key={tag} className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85">
									{tag}
								</li>
							))}
						</ul>
					</GlassPanel>
				}
			/>
			{sections.map((s, i) => (
				<div key={s.key}>{s.node(i % 2 === 0 ? "default" : "muted")}</div>
			))}
			<CtaSection
				locale={locale}
				pageTag={`partner_${slug.replace(/-/g, "_")}`}
				service={PARTNER_LEAD_SERVICE[slug]}
				title={t("cta.title")}
				subtitle={t("cta.subtitle")}
			/>
		</>
	);
}

function CheckList({ items, className, plain = false }: { items: string[]; className?: string; plain?: boolean }) {
	return (
		<ul className={plain ? "space-y-3" : `grid grid-cols-1 gap-3 ${className ?? ""}`}>
			{items.map((item) => (
				<li
					key={item}
					className={plain ? "flex items-start gap-3 text-sm leading-relaxed text-foreground" : "reveal flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-foreground"}
				>
					<span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10">
						<Check className="size-3.5 text-brand-text" aria-hidden="true" />
					</span>
					{item}
				</li>
			))}
		</ul>
	);
}
