import { Odometer } from "@/components/ui/odometer";
import { cn } from "@/lib/utils";

export type StatItem = { key: string; value: number; suffix: string; label: string };

/**
 * Figures in one panel split by hairlines, adapted from @blocks-so/stats-02: label on top, the
 * number below with a digit roll. `cols` sets the desktop grid; phones always get one column per
 * pair. Uses scene tokens, so it works on the ink scene in both themes.
 */
export function StatsStrip({ items, cols = 2, className }: { items: StatItem[]; cols?: 1 | 2 | 4; className?: string }) {
	return (
		<dl
			className={cn(
				"grid overflow-hidden rounded-3xl border border-ink-foreground/10 bg-ink-foreground/10 gap-px",
				cols === 1 ? "grid-cols-1" : cols === 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2",
				className
			)}
		>
			{items.map((s, i) => (
				<div
					key={s.key}
					className={cn(
						"flex flex-col justify-between gap-6 bg-ink p-5 sm:p-6",
						cols === 2 && items.length % 2 === 1 && i === items.length - 1 && "col-span-2"
					)}
				>
					<dt className="text-sm leading-snug text-ink-muted">{s.label}</dt>
					<dd className="text-4xl font-semibold tracking-tight text-ink-foreground sm:text-5xl">
						<Odometer value={s.value} />
						<span className="text-ink-accent">{s.suffix}</span>
					</dd>
				</div>
			))}
		</dl>
	);
}
