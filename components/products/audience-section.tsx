import { Section, SectionHeading } from "@/components/site/section";

/** "Who it's for": four cells on the ink band, laid out like the outcomes band on the service pages. */
export function AudienceSection({
	eyebrow,
	title,
	subtitle,
	items
}: {
	eyebrow: string;
	title: string;
	subtitle: string;
	items: { title: string; description: string }[];
}) {
	return (
		<Section tone="ink">
			<SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} onInk />
			<ul className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink-foreground/10 bg-ink-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
				{items.map((item, i) => (
					<li key={item.title} className="reveal bg-ink/80 p-8">
						<span className="text-sm font-semibold text-ink-accent">0{i + 1}</span>
						<h3 className="mt-4 text-xl font-semibold tracking-tight text-ink-foreground">{item.title}</h3>
						<p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.description}</p>
					</li>
				))}
			</ul>
		</Section>
	);
}
