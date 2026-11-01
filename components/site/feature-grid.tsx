import type { LucideIcon } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "@/lib/utils";

export type Feature = { title: string; description: string; icon?: LucideIcon; meta?: string };

/** Magic UI cards whose border glow follows the cursor. 1, 2 or 3 columns with a single-column fallback. */
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
			{items.map((f) => (
				<MagicCard key={f.title} className="reveal rounded-3xl" gradientColor="rgba(55,125,255,0.10)" gradientFrom="#377dff" gradientTo="#f9b934">
					<div className="relative flex h-full flex-col p-6 sm:p-7">
						{f.icon && (
							<span className="mb-5 flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand-text">
								<f.icon className="size-5" aria-hidden="true" />
							</span>
						)}
						{f.meta && <span className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-text">{f.meta}</span>}
						<h3 className="text-lg font-semibold tracking-tight text-foreground">{f.title}</h3>
						<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
					</div>
				</MagicCard>
			))}
		</div>
	);
}
