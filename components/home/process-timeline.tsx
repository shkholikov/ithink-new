"use client";

import { Timeline } from "@/components/ui/timeline";

type Step = { step: string; title: string; description: string };

/** Aceternity timeline: the progress line fills as the visitor scrolls through the four steps. */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
	return (
		<Timeline
			data={steps.map((s) => ({
				title: s.step,
				content: (
					<div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
						<h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{s.title}</h3>
						<p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{s.description}</p>
					</div>
				)
			}))}
		/>
	);
}
