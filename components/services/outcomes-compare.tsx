import { ArrowRight, CheckCircle2, CircleAlert } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";

// Visible on phones, where the column headers are hidden; read by screen readers at every width.
const LABEL = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] md:sr-only";

type Row = { before: string; title: string; description: string };

/** The page's one ink band: each outcome paired with the problem it replaces, "before" left and "after" right. */
export function OutcomesCompare({ badge, title, labels, rows }: { badge: string; title: string; labels: { before: string; after: string }; rows: Row[] }) {
	return (
		<Section tone="ink">
			<SectionHeading eyebrow={badge} title={title} onInk />
			<div className="mb-4 hidden grid-cols-[1fr_3rem_1.25fr] text-xs font-semibold uppercase tracking-[0.16em] md:grid">
				<span className="px-6 text-ink-muted">{labels.before}</span>
				<span />
				<span className="px-6 text-ink-accent">{labels.after}</span>
			</div>
			<ul className="space-y-4">
				{rows.map((r) => (
					<li key={r.title} className="reveal grid items-stretch gap-2 md:grid-cols-[1fr_3rem_1.25fr] md:gap-0">
						<div className="flex gap-3 rounded-3xl border border-ink-foreground/10 bg-ink-foreground/[0.03] p-5 sm:p-6">
							<CircleAlert className="mt-0.5 size-5 shrink-0 text-ink-muted" aria-hidden="true" />
							<p className="text-sm leading-relaxed text-ink-muted sm:text-base">
								<span className={LABEL}>{labels.before}</span>
								{r.before}
							</p>
						</div>
						<span aria-hidden="true" className="flex items-center justify-center">
							<span className="flex size-8 items-center justify-center rounded-full border border-ink-foreground/10 bg-ink-foreground/5 text-ink-accent">
								<ArrowRight className="size-4 rotate-90 md:rotate-0" />
							</span>
						</span>
						<div className="flex gap-3 rounded-3xl border border-brand/30 bg-brand/10 p-5 sm:p-6">
							<CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ink-accent" aria-hidden="true" />
							<div>
								<span className={`${LABEL} text-ink-accent`}>{labels.after}</span>
								<h3 className="text-lg font-semibold tracking-tight text-ink-foreground">{r.title}</h3>
								<p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{r.description}</p>
							</div>
						</div>
					</li>
				))}
			</ul>
		</Section>
	);
}
