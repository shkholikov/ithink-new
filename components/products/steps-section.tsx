import { Section, SectionHeading } from "@/components/site/section";

/** "How it works": four numbered step cards, the same block the service pages use. */
export function StepsSection({ eyebrow, title, steps }: { eyebrow: string; title: string; steps: { title: string; description: string }[] }) {
	return (
		<Section tone="muted">
			<SectionHeading eyebrow={eyebrow} title={title} />
			<div className="relative">
				<div aria-hidden="true" className="absolute left-0 right-0 top-[2.15rem] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
				<ol className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{steps.map((s, i) => (
						<li key={s.title} className="reveal relative rounded-3xl border border-border bg-card p-6">
							<span className="relative flex size-11 items-center justify-center rounded-full border border-brand/30 bg-background text-sm font-semibold text-brand-text">
								{String(i + 1).padStart(2, "0")}
							</span>
							<h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
						</li>
					))}
				</ol>
			</div>
		</Section>
	);
}
