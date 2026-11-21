import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/site/glass-card";

/**
 * A linked glass card that leads with a large index numeral instead of an icon tile. On hover the
 * glass brightens, a blueprint grid fades in from the top-right corner and the arrow slides out.
 */
export function IndexCard({
	href,
	index,
	title,
	description,
	kicker,
	className
}: {
	href: string;
	index: number;
	title: string;
	description?: string;
	kicker?: string;
	className?: string;
}) {
	return (
		<GlassCard
			as={Link}
			href={href}
			interactive
			blueprint
			className={cn("group flex h-full flex-col rounded-3xl p-6 hover:-translate-y-0.5", className)}
		>
			<span className="flex items-start justify-between">
				<span className="text-4xl font-light leading-none tracking-tight text-muted-foreground/50 tabular-nums transition-colors group-hover:text-brand-text">
					{String(index).padStart(2, "0")}
				</span>
				<span className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-brand group-hover:bg-[#2563eb] group-hover:text-white">
					<ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
				</span>
			</span>
			{kicker && <span className="mt-8 text-[11px] font-semibold uppercase tracking-wider text-brand-text">{kicker}</span>}
			<span className={cn("text-base font-semibold tracking-tight text-foreground", kicker ? "mt-2" : "mt-8")}>{title}</span>
			{description && <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</span>}
		</GlassCard>
	);
}
