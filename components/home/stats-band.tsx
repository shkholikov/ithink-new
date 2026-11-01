import { getTranslations } from "next-intl/server";
import { StatsStrip } from "@/components/site/stats-strip";
import { Section, SectionHeading } from "@/components/site/section";
import { MarketsGlobe } from "@/components/site/markets-globe";

/** The figures used everywhere on the site. Change them here and in the copy that quotes them. */
export const STATS = [
	{ key: "clients", value: 50, suffix: "+" },
	{ key: "projects", value: 72, suffix: "+" },
	{ key: "team", value: 15, suffix: "+" },
	{ key: "markets", value: 4, suffix: "" },
	{ key: "since", value: 2020, suffix: "" }
] as const;

/** Four figures on the left, the markets globe on the right. */
export async function StatsBand({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home.stats" });
	const p = await getTranslations({ locale, namespace: "home.partners" });
	const figures = STATS.filter((s) => s.key !== "markets");
	const markets = [p("market1"), p("market2"), p("market3"), p("market4")];

	return (
		<Section tone="ink">
			<div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
				<div>
					<SectionHeading eyebrow={t("eyebrow")} title={t("title")} onInk />
					<StatsStrip items={figures.map((s) => ({ key: s.key, value: s.value, suffix: s.suffix, label: t(s.key) }))} />
				</div>
				<div>
					<MarketsGlobe labels={{ uz: markets[0], kz: markets[1], tj: markets[2], us: markets[3] }} />
					<p className="mt-4 text-center text-sm font-semibold text-ink-foreground">{p("marketsTitle")}</p>
					<div className="mt-3 flex flex-wrap items-center justify-center gap-2">
						{markets.map((m, i) => (
							<span
								key={m}
								className="tag tag-scene"
							>
								<span aria-hidden="true" className={i === 0 ? "led text-accent-yellow" : "led text-ink-accent"} />
								{m}
							</span>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}
