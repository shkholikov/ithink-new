import { cn } from "@/lib/utils";

type Tone = "default" | "muted" | "ink";

/**
 * A page section. `default` and `muted` alternate on the light body; `ink` is the deep navy
 * backdrop used for heroes, the stats band and call-to-action panels, dark in both themes.
 */
export function Section({
	id,
	tone = "default",
	className,
	containerClassName,
	children
}: {
	id?: string;
	tone?: Tone;
	className?: string;
	containerClassName?: string;
	children: React.ReactNode;
}) {
	return (
		<section
			id={id}
			data-lg-theme={tone === "ink" ? "dark" : undefined}
			className={cn(
				"relative scroll-mt-24 py-20 sm:py-28",
				tone === "muted" && "bg-secondary",
				tone === "ink" && "ink-scene overflow-hidden text-white",
				className
			)}
		>
			{tone === "ink" && <div aria-hidden="true" className="ink-grid pointer-events-none absolute inset-0" />}
			<div className={cn("relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", containerClassName)}>{children}</div>
		</section>
	);
}

/** Small uppercase label above a heading. */
export function Eyebrow({ children, className, onInk = false }: { children: React.ReactNode; className?: string; onInk?: boolean }) {
	return (
		<p
			className={cn(
				"mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]",
				onInk ? "text-[#9cc0ff]" : "text-brand-text",
				className
			)}
		>
			<span aria-hidden="true" className={cn("h-px w-6", onInk ? "bg-[#9cc0ff]/60" : "bg-brand/60")} />
			{children}
		</p>
	);
}

/** Section heading: eyebrow, h2 and an optional lead paragraph. */
export function SectionHeading({
	eyebrow,
	title,
	subtitle,
	align = "left",
	onInk = false,
	className,
	children
}: {
	eyebrow?: string;
	title: string;
	subtitle?: string;
	align?: "left" | "center";
	onInk?: boolean;
	className?: string;
	children?: React.ReactNode;
}) {
	return (
		<div className={cn("reveal mb-12 sm:mb-16", align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
			{eyebrow && <Eyebrow onInk={onInk}>{eyebrow}</Eyebrow>}
			<h2 className={cn("text-3xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.05]", onInk ? "text-white" : "text-foreground")}>{title}</h2>
			{subtitle && (
				<p className={cn("mt-5 text-base leading-relaxed sm:text-lg", onInk ? "text-ink-muted" : "text-muted-foreground", align === "center" && "mx-auto max-w-2xl")}>
					{subtitle}
				</p>
			)}
			{children}
		</div>
	);
}
