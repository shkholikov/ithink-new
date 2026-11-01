import { MagicCard } from "@/components/ui/magic-card";
import type { TileVisual } from "./config";
import { FeatureVisual } from "./feature-visuals";
import { cn } from "@/lib/utils";

export type BentoFeature = { title: string; description: string; visual?: TileVisual };

/**
 * Six features as a bento, each led by its index numeral (no icon tiles): 4 columns on desktop, two of them wide with a CSS mini visual, so both
 * rows fill (2+1+1, 1+1+2). On tablets the wide tiles take a full row; `grid-flow-dense` backfills.
 */
export function FeatureBento({ items }: { items: BentoFeature[] }) {
	return (
		<div className="grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{items.map((f, i) => (
				<MagicCard
					key={f.title}
					className={cn("reveal group rounded-3xl", f.visual && "sm:col-span-2")}
					gradientColor="rgba(55,125,255,0.10)"
					gradientFrom="#377dff"
					gradientTo="#f9b934"
				>
					<div className={cn("relative flex h-full flex-col gap-6 p-6 sm:p-7", f.visual && "xl:grid xl:grid-cols-[1fr_1.05fr] xl:items-center")}>
						<div>
							<span className="mb-6 block text-4xl font-light leading-none tracking-tight text-muted-foreground/60 tabular-nums transition-colors group-hover:text-brand-text">
								{String(i + 1).padStart(2, "0")}
							</span>
							<h3 className="text-lg font-semibold tracking-tight text-foreground">{f.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
						</div>
						{f.visual && <FeatureVisual kind={f.visual} />}
					</div>
				</MagicCard>
			))}
		</div>
	);
}
