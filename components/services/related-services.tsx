import { Section, SectionHeading } from "@/components/site/section";
import { IndexCard } from "@/components/site/index-card";
import type { ServiceSlug } from "@/lib/services";

/** The five other services as shared index cards; the numeral is the service's place in the full list of six. */
export function RelatedServices({
	locale,
	eyebrow,
	title,
	items
}: {
	locale: string;
	eyebrow: string;
	title: string;
	items: { slug: ServiceSlug; index: number; title: string; description: string }[];
}) {
	return (
		<Section>
			<SectionHeading eyebrow={eyebrow} title={title} />
			<ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
				{items.map((s) => (
					<li key={s.slug} className="reveal">
						<IndexCard href={`/${locale}/services/${s.slug}`} index={s.index} title={s.title} description={s.description} />
					</li>
				))}
			</ul>
		</Section>
	);
}
