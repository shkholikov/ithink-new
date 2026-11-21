import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/site/glass-card";

export type Feature = { title: string; description: string; icon?: LucideIcon; meta?: string };

/**
 * Glass feature cards that lead with an index numeral; the icon, when given, sits small in the corner.
 * Hover fades in the blueprint grid and turns the numeral blue. Server-rendered, no JS.
 * Put them in a `Section glow` so the glass has colour behind it.
 */
export function FeatureGrid({ items, columns = 3, className }: { items: Feature[]; columns?: 2 | 3 | 4; className?: string }) {
	return (
		<div
			className={cn(
				"grid grid-cols-1 gap-4",
				columns >= 2 && "sm:grid-cols-2",
				columns === 3 && "lg:grid-cols-3",
				columns === 4 && "lg:grid-cols-4",
				className
			)}
		>
			{items.map((f, i) => (
				<GlassCard key={f.title} interactive blueprint className="group reveal flex h-full flex-col rounded-3xl p-6 sm:p-8">
					<div className="flex items-start justify-between gap-4">
						<span className="text-5xl font-light leading-none tracking-tight text-muted-foreground/45 tabular-nums transition-colors duration-300 group-hover:text-brand-text">
							{String(i + 1).padStart(2, "0")}
						</span>
						{f.icon && <f.icon className="size-5 text-muted-foreground/70 transition-colors group-hover:text-brand-text" aria-hidden="true" />}
					</div>
					{f.meta && <span className="mt-8 text-[11px] font-semibold uppercase tracking-wider text-brand-text">{f.meta}</span>}
					<h3 className={cn("text-lg font-semibold tracking-tight text-foreground", f.meta ? "mt-2" : "mt-10")}>{f.title}</h3>
					<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
				</GlassCard>
			))}
		</div>
	);
}
