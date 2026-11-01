import { Plus } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";

/** Same native <details> list as the home FAQ, filtered to the questions that fit one service. */
export function ServiceFaq({ heading, items }: { heading: { eyebrow: string; title: string; subtitle: string }; items: { q: string; a: string }[] }) {
	return (
		<Section tone="muted">
			<div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
				<SectionHeading eyebrow={heading.eyebrow} title={heading.title} subtitle={heading.subtitle} className="lg:sticky lg:top-28 lg:self-start" />
				<div className="reveal divide-y divide-border rounded-3xl border border-border bg-card">
					{items.map((item) => (
						<details key={item.q} className="group px-6 [&_summary::-webkit-details-marker]:hidden">
							<summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-medium text-foreground">
								{item.q}
								<Plus className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
							</summary>
							<p className="-mt-1 pb-5 leading-relaxed text-muted-foreground">{item.a}</p>
						</details>
					))}
				</div>
			</div>
		</Section>
	);
}
