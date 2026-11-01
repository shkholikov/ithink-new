import { getTranslations } from "next-intl/server";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Section, SectionHeading } from "@/components/site/section";

/** The figures used everywhere on the site. Change them here and in the copy that quotes them. */
export const STATS = [
	{ key: "clients", value: 50, suffix: "+" },
	{ key: "projects", value: 72, suffix: "+" },
	{ key: "team", value: 15, suffix: "+" },
	{ key: "markets", value: 4, suffix: "" },
	{ key: "since", value: 2020, suffix: "", start: 2000 }
] as const;

export async function StatsBand({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home.stats" });
	return (
		<Section tone="ink">
			<SectionHeading eyebrow={t("eyebrow")} title={t("title")} onInk align="center" />
			<dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-5">
				{STATS.map((s) => (
					<div key={s.key} className="reveal flex flex-col justify-between gap-6 bg-ink/80 p-6 last:col-span-2 sm:p-8 lg:last:col-span-1">
						<dt className="order-2 text-sm leading-snug text-ink-muted">{t(s.key)}</dt>
						<dd className="order-1 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
							<NumberTicker value={s.value} startValue={"start" in s ? s.start : 0} className="tracking-tight text-white dark:text-white" />
							<span className="text-[#9cc0ff]">{s.suffix}</span>
						</dd>
					</div>
				))}
			</dl>
		</Section>
	);
}
