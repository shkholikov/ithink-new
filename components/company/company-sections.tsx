import { getTranslations } from "next-intl/server";
import { Compass, Eye, Handshake, MessagesSquare, Scale, ShieldCheck, Target, Users, Wrench } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { FeatureGrid } from "@/components/site/feature-grid";
import { DottedMap } from "@/components/ui/dotted-map";

/** About the company: the founding story from the old /about page, heading left and text right. */
export async function StorySection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "about.story" });
	return (
		<Section>
			<div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
				<SectionHeading eyebrow={t("badge")} title={t("title")} className="mb-0 sm:mb-0" />
				<div className="reveal space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg lg:pt-10">
					<p>{t("p1")}</p>
					<p>{t("p2")}</p>
				</div>
			</div>
		</Section>
	);
}

const MISSION_ICONS = [Target, Eye, Compass];

/** Mission, vision and approach as three statements in one divided panel. */
export async function MissionSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "company.mission" });
	return (
		<Section tone="muted">
			<SectionHeading eyebrow={t("badge")} title={t("title")} />
			<div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-3">
				{MISSION_ICONS.map((Icon, i) => (
					<div key={i} className="reveal flex flex-col gap-5 bg-card p-6 sm:p-8">
						<span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-text">
							<Icon className="size-4" aria-hidden="true" />
							{t(`cards.${i}.label`)}
						</span>
						<p className="text-xl font-medium leading-snug tracking-tight text-foreground">{t(`cards.${i}.text`)}</p>
					</div>
				))}
			</div>
		</Section>
	);
}

const VALUE_ICONS = [ShieldCheck, Scale, Handshake];

/** The three values from the old /about page. */
export async function ValuesSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "about.values" });
	const items = VALUE_ICONS.map((icon, i) => ({ icon, title: t(`items.${i}.title`), description: t(`items.${i}.description`) }));
	return (
		<Section>
			<SectionHeading eyebrow={t("badge")} title={t("title")} />
			<FeatureGrid items={items} />
		</Section>
	);
}

/**
 * 2020 to 2025 as a compact rail. The Aceternity Timeline spends a viewport per entry; six short
 * milestones read better as one list beside a sticky heading.
 */
export async function MilestonesSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "company.timeline" });
	const items = [0, 1, 2, 3, 4, 5].map((i) => ({
		year: t(`items.${i}.year`),
		title: t(`items.${i}.title`),
		description: t(`items.${i}.description`)
	}));
	return (
		<Section tone="muted">
			<div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
				<div className="lg:sticky lg:top-28 lg:self-start">
					<SectionHeading eyebrow={t("badge")} title={t("title")} className="mb-0 sm:mb-0" />
				</div>
				<ol className="relative">
					<span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-brand via-border to-accent-yellow" />
					{items.map((item) => (
						<li key={item.year} className="reveal relative pb-8 pl-10 last:pb-0">
							<span aria-hidden="true" className="absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-brand bg-background" />
							<p className="text-sm font-semibold tabular-nums text-brand-text">{item.year}</p>
							<h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl">{item.title}</h3>
							<p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{item.description}</p>
						</li>
					))}
				</ol>
			</div>
		</Section>
	);
}

const WHY_ICONS = [Users, Scale, Wrench, MessagesSquare];

/** What sets ITHINK apart, numbered 01 to 04. */
export async function WhySection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "company.why" });
	const items = WHY_ICONS.map((icon, i) => ({
		icon,
		meta: String(i + 1).padStart(2, "0"),
		title: t(`items.${i}.title`),
		description: t(`items.${i}.description`)
	}));
	return (
		<Section>
			<SectionHeading eyebrow={t("badge")} title={t("title")} />
			<FeatureGrid items={items} columns={4} />
		</Section>
	);
}

/** The markets, pinned at the city we work from in each. */
const MARKETS = [
	{ key: "uz", lat: 41.2995, lng: 69.2401 },
	{ key: "kz", lat: 43.222, lng: 76.8512 },
	{ key: "tj", lat: 38.5598, lng: 68.787 },
	{ key: "us", lat: 29.7604, lng: -95.3698 }
] as const;

/** The four markets: a list on the left, the dotted world map on the right. The map is decoration; the list carries the names. */
export async function MarketsSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "company.location" });
	const page = await getTranslations({ locale, namespace: "companyPage.location" });
	return (
		<Section tone="muted">
			<div className="grid items-center gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
				<div>
					<SectionHeading eyebrow={t("badge")} title={t("title")} subtitle={page("subtitle")} className="mb-8 sm:mb-10" />
					<ul className="reveal grid grid-cols-1 gap-2 sm:grid-cols-2">
						{MARKETS.map((m) => (
							<li key={m.key} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground">
								<span className="size-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
								{t(m.key)}
							</li>
						))}
					</ul>
				</div>
				<div className="reveal rounded-3xl border border-border bg-card p-3 sm:p-6">
					<DottedMap
						markers={MARKETS.map((m) => ({ lat: m.lat, lng: m.lng, size: 0.8 }))}
						markerColor="#377dff"
						dotRadius={0.22}
						pulse
						className="w-full text-foreground/25"
						aria-hidden="true"
					/>
				</div>
			</div>
		</Section>
	);
}
