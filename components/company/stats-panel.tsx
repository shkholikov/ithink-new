import { getTranslations } from "next-intl/server";
import { GlassPanel } from "@/components/glassyui/glass-panel";
import { STATS } from "@/components/home/stats-band";
import { cn } from "@/lib/utils";

type StatKey = (typeof STATS)[number]["key"];

/**
 * The site figures (STATS from the homepage band) as a glass panel for the right side of an ink hero.
 * Plain text, no ticker: the hero paints with the HTML. An odd count stretches the last cell.
 */
export async function StatsPanel({ locale, keys }: { locale: string; keys: readonly StatKey[] }) {
	const t = await getTranslations({ locale, namespace: "home.stats" });
	const stats = keys.map((k) => STATS.find((s) => s.key === k)!);
	return (
		<GlassPanel preset="prominent" className="relative mx-auto w-full max-w-[520px] rounded-3xl p-5 sm:p-6 lg:mr-0">
			<p className="text-sm font-semibold text-white">{t("eyebrow")}</p>
			<dl className="mt-5 grid grid-cols-2 gap-2.5">
				{stats.map((s, i) => (
					<div
						key={s.key}
						className={cn(
							"flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4",
							stats.length % 2 === 1 && i === stats.length - 1 && "col-span-2"
						)}
					>
						<dt className="order-2 text-xs leading-snug text-ink-muted">{t(s.key)}</dt>
						<dd className="order-1 text-3xl font-semibold tracking-tight text-white tabular-nums sm:text-4xl">
							{s.value}
							<span className="text-[#9cc0ff]">{s.suffix}</span>
						</dd>
					</div>
				))}
			</dl>
		</GlassPanel>
	);
}
