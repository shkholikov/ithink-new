import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
	Activity,
	AlertTriangle,
	ArrowUpRight,
	BarChart2,
	Bot,
	CheckCircle2,
	Cloud,
	Cpu,
	GitBranch,
	Globe,
	HardDrive,
	Headphones,
	Layers,
	LayoutGrid,
	Link2,
	ListChecks,
	Lock,
	Map,
	MessageCircle,
	Monitor,
	Package,
	Phone,
	Send,
	Server,
	Shield,
	ShieldAlert,
	ShoppingCart,
	TrendingUp,
	Users2,
	Workflow,
	Wrench,
	Zap,
	type LucideIcon
} from "lucide-react";
import { GlassPanel } from "@/components/glassyui/glass-panel";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { Cta, CtaRow } from "@/components/site/cta";
import { FeatureGrid } from "@/components/site/feature-grid";
import { CtaSection } from "@/components/site/cta-section";
import { CrmBeam } from "@/components/home/crm-beam";
import { PAGE_TO_LEAD_SERVICE } from "@/lib/lead";
import { SERVICE_SLUGS, type ServiceSlug } from "@/lib/services";
import { SERVICE_ICONS } from "@/lib/icons";
import { SITE_URL } from "@/lib/seo";

const FEATURE_ICONS: Record<ServiceSlug, LucideIcon[]> = {
	"it-infrastructure": [HardDrive, Server, Monitor, Cloud, Lock, Shield],
	"managed-it": [Activity, Headphones, Wrench, Shield, Package, BarChart2],
	"crm-automation": [TrendingUp, GitBranch, Phone, MessageCircle, Zap, Users2],
	"process-automation": [Map, Bot, Link2, Cpu, LayoutGrid, BarChart2],
	"software-development": [Globe, Layers, Send, LayoutGrid, Link2, ShoppingCart],
	"it-audit": [Server, ShieldAlert, Workflow, Package, AlertTriangle, ListChecks]
};

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/** One template for the six service pages; copy lives in `servicePages.<slug>`. */
export async function ServicePage({ locale, slug }: { locale: string; slug: ServiceSlug }) {
	const t = await getTranslations({ locale, namespace: `servicePages.${slug}` });
	const common = await getTranslations({ locale, namespace: "servicePages.common" });
	const nav = await getTranslations({ locale, namespace: "nav" });
	const crm = await getTranslations({ locale, namespace: "home.crm" });
	const Icon = SERVICE_ICONS[slug];

	const features = range(6).map((i) => ({
		title: t(`features.items.${i}.title`),
		description: t(`features.items.${i}.description`),
		icon: FEATURE_ICONS[slug][i]
	}));
	const steps = range(4).map((i) => ({
		step: t(`process.items.${i}.step`),
		title: t(`process.items.${i}.title`),
		description: t(`process.items.${i}.description`)
	}));
	const outcomes = range(3).map((i) => ({ title: t(`outcomes.items.${i}.title`), description: t(`outcomes.items.${i}.description`) }));
	const others = SERVICE_SLUGS.filter((s) => s !== slug);

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
				aside={
					<GlassPanel aria-hidden="true" preset="prominent" className="relative mx-auto max-w-md rounded-3xl p-6 text-white sm:p-8 lg:ml-auto lg:mr-0">
						<div className="flex items-center gap-3">
							<span className="flex size-12 items-center justify-center rounded-2xl bg-[#2563eb]">
								<Icon className="size-6 text-white" />
							</span>
							<span className="text-sm font-semibold">{common("outcomesCard")}</span>
						</div>
						<ul className="mt-6 space-y-4">
							{outcomes.map((o) => (
								<li key={o.title} className="flex gap-3">
									<CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-300" />
									<span>
										<span className="block text-sm font-semibold">{o.title}</span>
										<span className="mt-0.5 block text-xs leading-relaxed text-white/65">{o.description}</span>
									</span>
								</li>
							))}
						</ul>
					</GlassPanel>
				}
			/>

			<Section>
				<SectionHeading eyebrow={t("features.badge")} title={t("features.title")} />
				<FeatureGrid items={features} />
			</Section>

			{slug === "crm-automation" && (
				<Section tone="muted">
					<SectionHeading eyebrow={common("beamEyebrow")} title={common("beamTitle")} subtitle={crm("subtitle")} align="center" />
					<div className="reveal mx-auto max-w-4xl">
						<CrmBeam labels={{ website: crm("website"), phone: crm("phone"), hub: crm("hub"), team: crm("team") }} />
					</div>
				</Section>
			)}

			<Section tone={slug === "crm-automation" ? "default" : "muted"}>
				<SectionHeading eyebrow={t("process.badge")} title={t("process.title")} />
				<ol className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<div aria-hidden="true" className="absolute left-0 right-0 top-[2.15rem] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
					{steps.map((s) => (
						<li key={s.step} className="reveal relative rounded-3xl border border-border bg-card p-6">
							<span className="relative flex size-11 items-center justify-center rounded-full border border-brand/30 bg-background text-sm font-semibold text-brand-text">
								{s.step}
							</span>
							<h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
						</li>
					))}
				</ol>
			</Section>

			<Section tone="ink">
				<SectionHeading eyebrow={t("outcomes.badge")} title={t("outcomes.title")} onInk />
				<div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
					{outcomes.map((o, i) => (
						<div key={o.title} className="reveal bg-ink/80 p-8">
							<span className="text-sm font-semibold text-[#9cc0ff]">0{i + 1}</span>
							<h3 className="mt-4 text-xl font-semibold tracking-tight text-white">{o.title}</h3>
							<p className="mt-3 text-sm leading-relaxed text-ink-muted">{o.description}</p>
						</div>
					))}
				</div>
			</Section>

			<Section>
				<SectionHeading eyebrow={common("otherEyebrow")} title={common("otherTitle")} />
				<ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
					{others.map((s) => {
						const OtherIcon = SERVICE_ICONS[s];
						return (
							<li key={s} className="reveal">
								<Link
									href={`/${locale}/services/${s}`}
									className="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
								>
									<span className="flex items-center justify-between">
										<span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand-text">
											<OtherIcon className="size-5" aria-hidden="true" />
										</span>
										<ArrowUpRight
											className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-text"
											aria-hidden="true"
										/>
									</span>
									<span className="text-sm font-semibold text-foreground">{nav(`items.services.${s}.title`)}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</Section>

			<CtaSection locale={locale} pageTag={slug.replace(/-/g, "_")} service={PAGE_TO_LEAD_SERVICE[slug]} title={t("cta.title")} subtitle={t("cta.subtitle")} />
		</>
	);
}
