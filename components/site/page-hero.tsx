import Link from "next/link";
import { cn } from "@/lib/utils";

/** A crumb without `href` renders as plain text (a group with no index page). */
type Crumb = { href?: string; label: string };

/**
 * The hero of every inner page: ink backdrop, breadcrumbs, eyebrow, h1, lead and actions on the
 * left, an optional visual on the right. The heading block uses the CSS `appear` entrance so the
 * LCP text paints with the HTML.
 */
export function PageHero({
	eyebrow,
	title,
	subtitle,
	crumbs,
	actions,
	aside,
	children,
	className
}: {
	eyebrow?: string;
	title: string;
	subtitle?: string;
	crumbs?: Crumb[];
	actions?: React.ReactNode;
	aside?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<section className={cn("ink-scene relative overflow-hidden text-ink-foreground", className)}>
			<div aria-hidden="true" className="ink-grid pointer-events-none absolute inset-0" />
			<div
				className={cn(
					"relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:px-8",
					aside && "lg:grid-cols-[1.15fr_1fr]"
				)}
			>
				<div>
					{crumbs && crumbs.length > 0 && (
						<nav aria-label="Breadcrumb" className="appear mb-5">
							<ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium text-ink-muted">
								{crumbs.map((c, i) => {
									const last = i === crumbs.length - 1;
									return (
										<li key={c.label} className="inline-flex items-center gap-2">
											{i > 0 && (
												<span aria-hidden="true" className="text-ink-foreground/25">
													/
												</span>
											)}
											{!last && c.href ? (
												<Link href={c.href} className="transition-colors hover:text-ink-foreground">
													{c.label}
												</Link>
											) : (
												<span
													aria-current={last ? "page" : undefined}
													className={last ? "text-ink-foreground underline decoration-brand decoration-2 underline-offset-[6px]" : undefined}
												>
													{c.label}
												</span>
											)}
										</li>
									);
								})}
							</ol>
						</nav>
					)}
					{eyebrow && (
						<p className="appear mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-accent">
							<span aria-hidden="true" className="h-px w-6 bg-ink-accent/60" />
							{eyebrow}
						</p>
					)}
					<h1 className="appear appear-1 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl">{title}</h1>
					{subtitle && <p className="appear appear-2 mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">{subtitle}</p>}
					{actions && <div className="appear appear-3 mt-10">{actions}</div>}
					{children}
				</div>
				{aside && <div className="appear appear-2">{aside}</div>}
			</div>
		</section>
	);
}
