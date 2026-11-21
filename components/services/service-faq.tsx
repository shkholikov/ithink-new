import { Section, SectionHeading } from "@/components/site/section";
import { FaqList } from "@/components/site/faq-list";

/** The home FAQ list, filtered to the questions that fit one service. */
export function ServiceFaq({ heading, items }: { heading: { eyebrow: string; title: string; subtitle: string }; items: { q: string; a: string }[] }) {
	return (
		<Section tone="muted">
			<div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
				<SectionHeading eyebrow={heading.eyebrow} title={heading.title} subtitle={heading.subtitle} className="lg:sticky lg:top-28 lg:self-start" />
				<FaqList items={items} />
			</div>
		</Section>
	);
}
