import { getTranslations } from "next-intl/server";
import { STATS } from "@/components/home/stats-band";
import { StatsStrip } from "@/components/site/stats-strip";

type StatKey = (typeof STATS)[number]["key"];

/** The site figures (STATS from the homepage band) as the hero aside on /company and /career. */
export async function StatsPanel({ locale, keys }: { locale: string; keys: readonly StatKey[] }) {
	const t = await getTranslations({ locale, namespace: "home.stats" });
	const items = keys.map((k) => STATS.find((s) => s.key === k)!).map((s) => ({ key: s.key, value: s.value, suffix: s.suffix, label: t(s.key) }));
	return <StatsStrip items={items} className="mx-auto w-full max-w-[520px] shadow-[0_24px_60px_-30px_rgba(10,16,36,0.35)] lg:mr-0" />;
}
