import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
		<section data-lg-theme="dark" className={cn("ink-scene relative overflow-hidden text-white", className)}>
			<div aria-hidden="true" className="ink-grid pointer-events-none absolute inset-0" />
			<div
				className={cn(
					"relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:px-8",
					aside && "lg:grid-cols-[1.15fr_1fr]"
				)}
			>
				<div>
					{crumbs && crumbs.length > 0 && (
						<nav aria-label="Breadcrumb" className="appear mb-6">
							<ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
								{crumbs.map((c, i) => (
									<li key={c.label} className="inline-flex items-center gap-1.5">
										{i > 0 && <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />}
										{i < crumbs.length - 1 && c.href ? (
											<Link href={c.href} className="transition-colors hover:text-white">
												{c.label}
											</Link>
										) : (
											<span aria-current={i === crumbs.length - 1 ? "page" : undefined} className={i === crumbs.length - 1 ? "text-white/85" : undefined}>
												{c.label}
											</span>
										)}
									</li>
								))}
							</ol>
						</nav>
					)}
					{eyebrow && (
						<p className="appear mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80">
							<span className="size-1.5 rounded-full bg-accent-yellow" aria-hidden="true" />
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
