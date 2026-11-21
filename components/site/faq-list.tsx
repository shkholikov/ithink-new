import { Plus } from "lucide-react";
import { GlassCard } from "@/components/site/glass-card";

/**
 * FAQ as a stack of glass items, GlassyUI's accordion look. Native <details> rather than the Radix
 * accordion: opens without JavaScript, the answers stay in the server HTML and the browser's find
 * reaches them.
 */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
	return (
		<div className="reveal flex flex-col gap-3">
			{items.map((item) => (
				<GlassCard key={item.q} interactive className="rounded-2xl p-0">
					<details className="group [&_summary::-webkit-details-marker]:hidden">
						<summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand">
							{item.q}
							<Plus className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
						</summary>
						<p className="-mt-1 px-6 pb-5 leading-relaxed text-muted-foreground">{item.a}</p>
					</details>
				</GlassCard>
			))}
		</div>
	);
}
