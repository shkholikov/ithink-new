import { getTranslations } from "next-intl/server";
import { IndexCard } from "@/components/site/index-card";
import { Section, SectionHeading } from "@/components/site/section";
import { PRODUCT_GROUPS, type ProductGroup } from "@/components/products/config";
import type { ServiceSlug } from "@/lib/services";
import { cn } from "@/lib/utils";

/** The other two pages of the group, then one or two service pages. Titles and lines come from the menu copy. */
export async function RelatedSection({
	locale,
	group,
	slug,
	services,
	eyebrow,
	title
}: {
	locale: string;
	group: ProductGroup;
	slug: string;
	services: ServiceSlug[];
	eyebrow: string;
	title: string;
}) {
	const nav = await getTranslations({ locale, namespace: "nav.items" });
	const { slugs } = PRODUCT_GROUPS[group];
	const links: { href: string; title: string; description: string }[] = [
		...slugs
			.filter((s) => s !== slug)
			.map((s) => ({ href: `/${locale}/${group}/${s}`, title: nav(`${group}.${s}.title`), description: nav(`${group}.${s}.description`) })),
		...services.map((s) => ({
			href: `/${locale}/services/${s}`,
			title: nav(`services.${s}.title`),
			description: nav(`services.${s}.description`)
		}))
	];

	return (
		<Section id="related">
			<SectionHeading eyebrow={eyebrow} title={title} />
			<ul className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", links.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
				{links.map((l, i) => (
					<li key={l.href} className="reveal">
						<IndexCard href={l.href} index={i + 1} title={l.title} description={l.description} />
					</li>
				))}
			</ul>
		</Section>
	);
}
