import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Step = { title: string; description: string; icon?: LucideIcon };

/**
 * Steps on one line with a track between the nodes. A light pulse runs along the track and each
 * node glows as it passes (CSS only, `process-*` rules in globals.css). Phones stack the steps on
 * a vertical track. Nodes show the icon when given, otherwise the step number.
 */
export function Stepper({ steps, className }: { steps: Step[]; className?: string }) {
	const cols = steps.length === 3 ? "md:grid-cols-3" : steps.length === 5 ? "md:grid-cols-5" : "md:grid-cols-4";
	const inset = steps.length === 3 ? "md:inset-x-[16.6%]" : steps.length === 5 ? "md:inset-x-[10%]" : "md:inset-x-[12.5%]";
	return (
		<ol className={cn("relative grid gap-10 pl-16 md:gap-6 md:pl-0", cols, className)}>
			<span
				aria-hidden="true"
				className={cn("process-track absolute bottom-6 left-7 top-7 w-0.5 rounded-full bg-border md:bottom-auto md:top-[27px] md:h-0.5 md:w-auto", inset)}
			/>
			{steps.map((s, i) => (
				<li key={s.title} className="reveal group relative md:text-center">
					<span
						className="process-node absolute -left-16 top-0 flex size-14 items-center justify-center rounded-2xl border border-border bg-linear-to-b from-card to-secondary text-brand-text shadow-sm transition-transform duration-300 group-hover:-translate-y-1 md:relative md:left-auto md:mx-auto"
						style={{ animationDelay: `${i * 1.5}s` }}
					>
						{s.icon ? <s.icon className="size-6" aria-hidden="true" /> : <span className="text-lg font-semibold tabular-nums">{i + 1}</span>}
						{s.icon && (
							<span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-[#2563eb] text-[11px] font-semibold text-white tabular-nums">
								{i + 1}
							</span>
						)}
					</span>
					<h3 className="text-lg font-semibold tracking-tight text-foreground md:mt-6">{s.title}</h3>
					<p className="mt-2 text-sm leading-relaxed text-muted-foreground md:mx-auto md:max-w-[17rem]">{s.description}</p>
				</li>
			))}
		</ol>
	);
}
