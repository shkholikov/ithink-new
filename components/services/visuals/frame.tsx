import type { LucideIcon } from "lucide-react";
import { GlassPanel } from "@/components/glassyui/glass-panel";
import { cn } from "@/lib/utils";

/**
 * Glass panel that holds a hero visual on the theme-aware scene (`preset="standard"`, scene text
 * tokens), with a soft brand glow behind it. Decorative only.
 */
export function VisualFrame({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div aria-hidden="true" className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto">
			<div className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(55,125,255,0.28),transparent)] blur-2xl" />
			<GlassPanel preset="standard" className={cn("relative overflow-hidden rounded-3xl p-5 text-ink-foreground sm:p-6", className)}>
				{children}
			</GlassPanel>
		</div>
	);
}

/** Square status light (globals `led`) with a CSS pulse. */
export function Led({ className }: { className?: string }) {
	return <span className={cn("led animate-pulse text-emerald-500", className)} />;
}

/** Title row of a hero visual, with the "sample" label that marks the content as illustrative. */
export function VisualHeader({ icon: Icon, title, tag, live = false }: { icon: LucideIcon; title: string; tag?: string; live?: boolean }) {
	return (
		<div className="flex items-center justify-between gap-3 border-b border-ink-foreground/10 pb-4">
			<span className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold">
				<Icon className="size-4 shrink-0 text-ink-muted" />
				<span className="truncate">{title}</span>
				{live && <Led />}
			</span>
			{tag && <span className="tag tag-scene shrink-0">{tag}</span>}
		</div>
	);
}

/**
 * Compact status table: system name, a thin signal bar (CSS) or custom `signal`, and "OK" per row,
 * hairlines between rows, the overall status as the footer row with a pulsing LED.
 */
export function StatusTable({ rows, status, className }: { rows: { name: string; signal?: React.ReactNode }[]; status: string; className?: string }) {
	return (
		<div className={cn("text-xs", className)}>
			{rows.map((r, i) => (
				<div key={r.name} className="grid grid-cols-[6.5rem_1fr_auto] items-center gap-3 border-b border-ink-foreground/10 py-2.5 sm:grid-cols-[7.5rem_1fr_auto]">
					<span className="truncate font-medium text-ink-muted">{r.name}</span>
					{r.signal ?? <SignalBar seed={i} />}
					<span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 tabular-nums dark:text-emerald-400">OK</span>
				</div>
			))}
			<div className="flex items-center gap-2 pt-2.5 font-medium">
				<Led />
				{status}
			</div>
		</div>
	);
}

function SignalBar({ seed }: { seed: number }) {
	return (
		<span className="relative h-1 overflow-hidden rounded-full bg-ink-foreground/10">
			<span className="absolute inset-y-0 left-0 rounded-full bg-emerald-500/80" style={{ width: `${[92, 86, 97][seed % 3]}%` }} />
		</span>
	);
}
