import { getTranslations } from "next-intl/server";
import {
	Building2,
	Users,
	CheckCircle2,
	ArrowRight,
	MessageSquare,
	Milestone,
	Sparkles,
	Navigation,
	Target,
	Eye,
	Handshake,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionBadge } from "@/components/ui/section-badge";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { DottedMap } from "@/components/ui/dotted-map";

const WHY_ICONS = [Users, CheckCircle2, ArrowRight, MessageSquare];

/** The markets, pinned at the city we actually operate from in each. */
const MARKETS = [
	{ key: "uz", lat: 41.2995, lng: 69.2401 },
	{ key: "tj", lat: 38.5598, lng: 68.787 },
	{ key: "kz", lat: 43.222, lng: 76.8512 },
	{ key: "us", lat: 29.7604, lng: -95.3698 }
] as const;

export default async function CompanyPage({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "company" });

	const stats = [
		{ value: t("hero.stat1"), label: t("hero.stat1Label") },
		{ value: t("hero.stat2"), label: t("hero.stat2Label") },
		{ value: t("hero.stat3"), label: t("hero.stat3Label") },
		{ value: t("hero.stat4"), label: t("hero.stat4Label") },
	];

	const timelineItems = [0, 1, 2, 3, 4, 5].map((i) => ({
		year: t(`timeline.items.${i}.year`),
		title: t(`timeline.items.${i}.title`),
		description: t(`timeline.items.${i}.description`),
	}));

	const whyItems = [0, 1, 2, 3].map((i, idx) => ({
		title: t(`why.items.${i}.title`),
		description: t(`why.items.${i}.description`),
		Icon: WHY_ICONS[idx],
	}));

	return (
		<div className="pt-24 bg-background">
			{/* Hero */}
			<PageHero
				icon={Building2}
				badge={t("hero.badge")}
				title={t("hero.title")}
				subtitle={t("hero.subtitle")}
				className="py-20 lg:py-28"
			>
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12">
					{stats.map((s, i) => (
						<div key={i} className="text-center">
							<div className="text-3xl sm:text-4xl font-bold gradient-text-blue">{s.value}</div>
							<div className="text-xs text-muted-foreground mt-1">{s.label}</div>
						</div>
					))}
				</div>
			</PageHero>

			{/* Mission & Vision */}
			<section className="py-20 border-t border-border bg-secondary/20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<FadeIn className="text-center mb-12">
						<SectionBadge icon={Target} label={t("mission.badge")} variant="yellow" />
						<h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t("mission.title")}</h2>
					</FadeIn>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
						{([Target, Eye, Handshake] as const).map((Icon, i) => (
							<FadeIn key={i} delay={i * 0.08} duration={0.4} className="bg-card border border-border rounded-2xl p-6 hover:border-[#377dff]/30 transition-colors">
								<div className="w-10 h-10 rounded-xl bg-[#377dff]/10 flex items-center justify-center mb-4">
									<Icon className="w-5 h-5 text-[#377dff]" />
								</div>
								<h3 className="text-sm font-semibold text-foreground mb-2">
									{t(`mission.cards.${i}.label`)}
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									{t(`mission.cards.${i}.text`)}
								</p>
							</FadeIn>
						))}
					</div>
				</div>
			</section>

			{/* Timeline */}
			<section className="py-20 border-t border-border bg-background">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<FadeIn className="text-center mb-16">
						<SectionBadge icon={Milestone} label={t("timeline.badge")} variant="blue" />
						<h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t("timeline.title")}</h2>
					</FadeIn>

					<div className="relative">
						{/* vertical line */}
						<div className="absolute left-[7px] sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-border" />

						<div className="space-y-10">
							{timelineItems.map((item, i) => {
								const isRight = i % 2 === 0;
								return (
									<FadeIn key={i} delay={i * 0.05} duration={0.4} x={isRight ? -20 : 20} y={0} className={`relative flex items-start gap-6 sm:gap-0 ${isRight ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
										{/* dot */}
										<div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 mt-1.5 w-3.5 h-3.5 rounded-full bg-[#377dff] border-2 border-background ring-2 ring-[#377dff]/30 shrink-0" />

										{/* content */}
										<div
											className={`ml-8 sm:ml-0 sm:w-[calc(50%-28px)] ${isRight ? "sm:mr-14 sm:text-right" : "sm:ml-14 sm:text-left"}`}
										>
											<span className="text-xs font-bold text-[#377dff] tracking-widest uppercase">
												{item.year}
											</span>
											<h3 className="text-sm font-semibold text-foreground mt-1 mb-1">{item.title}</h3>
											<p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
										</div>
									</FadeIn>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{/* Why ITHINK */}
			<section className="py-20 border-t border-border bg-secondary/20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<FadeIn className="text-center mb-12">
						<SectionBadge icon={Sparkles} label={t("why.badge")} variant="blue" />
						<h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t("why.title")}</h2>
					</FadeIn>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
						{whyItems.map(({ title, description, Icon }, i) => (
							<FadeIn key={i} delay={i * 0.08} duration={0.4} className="bg-card border border-border rounded-2xl p-6 hover:border-[#377dff]/30 transition-colors">
								<div className="w-10 h-10 rounded-xl bg-[#377dff]/10 flex items-center justify-center mb-4">
									<Icon className="w-5 h-5 text-[#377dff]" />
								</div>
								<h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
							</FadeIn>
						))}
					</div>
				</div>
			</section>

			{/* Location */}
			<section className="py-20 border-t border-border bg-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<FadeIn className="text-center mb-12">
						<SectionBadge icon={Navigation} label={t("location.badge")} variant="yellow" />
						<h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t("location.title")}</h2>
					</FadeIn>

					{/* The four markets as a map rather than flag emoji: Windows renders
					    regional-indicator pairs as grey letterboxes, and a map shows the
					    spread — Central Asia plus the US — at a glance. */}
					<FadeIn duration={0.4} className="max-w-5xl mx-auto">
						<div className="rounded-2xl border border-border bg-card p-3 sm:p-6 lg:p-8">
							<DottedMap
								markers={MARKETS.map((m) => ({ lat: m.lat, lng: m.lng, size: 0.8 }))}
								markerColor="#377dff"
								dotRadius={0.22}
								pulse
								className="w-full text-foreground/25 dark:text-foreground/30"
								aria-hidden="true"
							/>
						</div>

						<ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
							{MARKETS.map((market) => (
								<li key={market.key} className="flex items-center gap-2 text-sm text-foreground">
									<span className="w-2 h-2 rounded-full bg-[#377dff] shrink-0" aria-hidden="true" />
									{t(`location.${market.key}`)}
								</li>
							))}
						</ul>
					</FadeIn>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 border-t border-border bg-secondary/20">
				<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<FadeIn >
						<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t("cta.title")}</h2>
						<p className="text-muted-foreground mb-8">{t("cta.subtitle")}</p>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
							<Link
								href={`/${locale}/contact`}
								className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#377dff] hover:bg-[#2563eb] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-[#377dff]/30 hover:shadow-lg hover:shadow-[#377dff]/40 hover:scale-[1.02]"
							>
								{t("cta.primary")}
								<ArrowRight className="w-4 h-4" />
							</Link>
							<Link
								href={`/${locale}/customers`}
								className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-card border border-border hover:border-[#377dff]/40 hover:bg-accent text-foreground text-sm font-medium rounded-xl transition-all duration-200"
							>
								{t("cta.secondary")}
							</Link>
						</div>
					</FadeIn>
				</div>
			</section>
		</div>
	);
}
