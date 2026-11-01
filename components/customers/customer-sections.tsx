import Link from "next/link";
import { cache } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Check, Quote } from "lucide-react";
import { GlassPanel } from "@/components/glassyui/glass-panel";
import { BorderBeam } from "@/components/ui/border-beam";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Section, SectionHeading } from "@/components/site/section";
import { ClientGrid } from "@/components/customers/client-grid";
import { CASES, initials, type CompactCase, type FeaturedCase, type Metric } from "@/components/customers/cases";
import { cn } from "@/lib/utils";

type Item = { name: string; industry: string; description: string; services: string[] };

/**
 * Joins `customers.items` (name, industry, description, service labels) with the drafted case copy in
 * `customersPage.cases.items`. Cached per request: the hero, the featured block and the grid all read it.
 */
const loadCases = cache(async (locale: string) => {
	const t = await getTranslations({ locale, namespace: "customers" });
	const c = await getTranslations({ locale, namespace: "customersPage.cases.items" });
	const items = t.raw("items") as Item[];
	const featured: FeaturedCase[] = [];
	const compact: CompactCase[] = [];
	for (const cfg of CASES) {
		// Pages are prerendered, so a mismatch with CASES fails the build here instead of hiding a client or misrouting a chip.
		const item = items.find((i) => i.name === cfg.name);
		if (!item) throw new Error(`customers.items has no client named "${cfg.name}" in ${locale} (components/customers/cases.ts)`);
		if (item.services.length !== cfg.services.length)
			throw new Error(`${cfg.name} (${locale}): ${item.services.length} service labels in messages, ${cfg.services.length} slugs in cases.ts`);
		const base = {
			key: cfg.key,
			name: item.name,
			industry: item.industry,
			description: item.description,
			services: item.services.map((label, i) => ({ label, href: `/${locale}/services/${cfg.services[i]}` })),
			metrics: c.raw(`${cfg.key}.metrics`) as Metric[]
		};
		if (cfg.featured) {
			featured.push({
				...base,
				challenge: c(`${cfg.key}.challenge`),
				steps: c.raw(`${cfg.key}.steps`) as string[],
				results: c.raw(`${cfg.key}.results`) as string[],
				stack: c.raw(`${cfg.key}.stack`) as string[]
			});
		} else {
			compact.push({ ...base, challenge: c(`${cfg.key}.challenge`), solution: c(`${cfg.key}.solution`), result: c(`${cfg.key}.result`) });
		}
	}
	return { featured, compact, all: [...featured, ...compact] };
});

/** Hero visual: client names as glass tiles on two marquee rows, then the client count per industry. */
export async function ClientWall({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "customersPage.hero" });
	const { all } = await loadCases(locale);
	const half = Math.ceil(all.length / 2);
	const rows = [all.slice(0, half), all.slice(half)];
	const industries = [...new Set(all.map((c) => c.industry))].map((name) => ({ name, count: all.filter((c) => c.industry === name).length }));
	industries.sort((a, b) => b.count - a.count);

	return (
		<GlassPanel preset="prominent" className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-3xl p-5 sm:p-6 lg:mr-0">
			<div aria-hidden="true" className="-mx-5 flex flex-col gap-1 [contain:inline-size] [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] sm:-mx-6">
				{rows.map((row, r) => (
					<Marquee key={r} reverse={r === 1} pauseOnHover repeat={3} className="[--duration:38s] [--gap:0.625rem]">
						{row.map((c) => (
							<span
								key={c.key}
								className="flex items-center gap-2.5 whitespace-nowrap rounded-xl border border-ink-foreground/10 bg-ink-foreground/5 py-2 pl-2 pr-4"
							>
								<span className="flex size-8 items-center justify-center rounded-lg bg-brand/15 text-xs font-semibold text-ink-accent">{initials(c.name)}</span>
								<span className="text-sm font-semibold tracking-tight text-ink-foreground">{c.name}</span>
							</span>
						))}
					</Marquee>
				))}
			</div>
			<p className="mt-5 text-sm font-semibold text-ink-foreground">{t("wall")}</p>
			<dl className="mt-3 grid grid-cols-2 gap-2">
				{industries.map((ind, i) => (
					<div
						key={ind.name}
						className={cn(
							"flex items-center justify-between gap-3 rounded-xl border border-ink-foreground/10 bg-ink-foreground/5 px-3 py-2",
							industries.length % 2 === 1 && i === industries.length - 1 && "col-span-2"
						)}
					>
						<dt className="min-w-0 truncate text-xs text-ink-muted">{ind.name}</dt>
						<dd className="text-sm font-semibold tabular-nums text-ink-foreground">{ind.count}</dd>
					</div>
				))}
			</dl>
		</GlassPanel>
	);
}

/** Small uppercase label used inside case blocks. */
function Label({ children }: { children: React.ReactNode }) {
	return <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-text">{children}</p>;
}

/** Metric tiles, rendered only when the owner has added figures to the messages. */
function Metrics({ metrics }: { metrics: Metric[] }) {
	if (metrics.length === 0) return null;
	return (
		<dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
			{metrics.map((m) => (
				<div key={m.label} className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4">
					<dt className="order-2 text-xs leading-snug text-muted-foreground">{m.label}</dt>
					<dd className="order-1 text-3xl font-semibold tracking-tight text-foreground tabular-nums">
						{m.prefix}
						<NumberTicker value={m.value} />
						<span className="text-brand-text">{m.suffix}</span>
					</dd>
				</div>
			))}
		</dl>
	);
}

/** The three detailed case studies: a typographic logo tile beside challenge, steps, result and services. */
export async function FeaturedCases({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "customersPage.cases" });
	const { featured } = await loadCases(locale);

	return (
		<Section id="cases">
			<SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
			<div className="flex flex-col gap-6 sm:gap-8">
				{featured.map((c, i) => {
					const flip = i % 2 === 1;
					return (
						<article
							key={c.key}
							id={`case-${c.key}`}
							aria-labelledby={`case-${c.key}-title`}
							className={cn(
								"reveal relative grid scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-card",
								flip ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
							)}
						>
							<div className={cn("ink-scene relative flex min-h-[260px] flex-col justify-between gap-10 overflow-hidden p-6 sm:p-8", flip && "lg:order-last")}>
								<div aria-hidden="true" className="ink-grid pointer-events-none absolute inset-0" />
								<div className="relative flex flex-wrap items-center justify-between gap-3">
									<span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-accent">
										{t("labels.case")} {String(i + 1).padStart(2, "0")}
									</span>
									<span className="tag tag-scene">
										{c.industry}
									</span>
								</div>
								<div className="relative">
									<h3 id={`case-${c.key}-title`} className="break-words text-5xl font-semibold leading-none tracking-[-0.04em] text-ink-foreground sm:text-6xl">
										{c.name}
									</h3>
									<p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">{c.description}</p>
								</div>
							</div>

							<div className="flex flex-col gap-8 p-6 sm:p-8 lg:p-10">
								<div>
									<Label>{t("labels.challenge")}</Label>
									<p className="mt-3 text-lg leading-relaxed text-foreground sm:text-xl">{c.challenge}</p>
								</div>
								<div>
									<Label>{t("labels.solution")}</Label>
									<ol className="mt-4 grid gap-3">
										{c.steps.map((step, n) => (
											<li key={step} className="flex items-start gap-3">
												<span
													aria-hidden="true"
													className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-xs font-semibold tabular-nums text-brand-text"
												>
													{String(n + 1).padStart(2, "0")}
												</span>
												<span className="pt-1 text-base leading-relaxed text-foreground">{step}</span>
											</li>
										))}
									</ol>
								</div>
								<div className="rounded-2xl border border-border bg-secondary p-5 sm:p-6">
									<Label>{t("labels.result")}</Label>
									<ul className="mt-4 grid gap-2.5">
										{c.results.map((r) => (
											<li key={r} className="flex items-start gap-2.5 text-base leading-relaxed text-foreground">
												<Check className="mt-1 size-4 shrink-0 text-brand-text" aria-hidden="true" />
												{r}
											</li>
										))}
									</ul>
									<Metrics metrics={c.metrics} />
								</div>
								<div className="flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:gap-10">
									<div>
										<Label>{t("labels.services")}</Label>
										<ServiceChips services={c.services} className="mt-3" />
									</div>
									{c.stack.length > 0 && (
										<div>
											<Label>{t("labels.stack")}</Label>
											<ul className="mt-3 flex flex-wrap gap-1.5">
												{c.stack.map((s) => (
													<li key={s} className="tag">
														{s}
													</li>
												))}
											</ul>
										</div>
									)}
								</div>
							</div>
							<BorderBeam size={120} duration={12} delay={i * 3} colorFrom="#377dff" colorTo="#f9b934" />
						</article>
					);
				})}
			</div>
		</Section>
	);
}

/** Service labels as links to the matching `/services/<slug>` page. */
function ServiceChips({ services, className }: { services: { label: string; href: string }[]; className?: string }) {
	return (
		<ul className={cn("flex flex-wrap gap-2", className)}>
			{services.map((s) => (
				<li key={s.label}>
					<Link
						href={s.href}
						className="tag group hover:border-brand/50 hover:text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
					>
						{s.label}
						<ArrowUpRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-brand-text" aria-hidden="true" />
					</Link>
				</li>
			))}
		</ul>
	);
}

/** The remaining clients as compact cards with the industry filter; each opens to challenge, solution, result. */
export async function ClientsSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "customers" });
	const page = await getTranslations({ locale, namespace: "customersPage" });
	const clientsNs = await getTranslations({ locale, namespace: "clients" });
	const { compact } = await loadCases(locale);
	return (
		<Section tone="muted" id="clients">
			<SectionHeading eyebrow={page("list.eyebrow")} title={page("list.title")} subtitle={page("list.subtitle")} className="mb-8 sm:mb-10" />
			<ClientGrid
				clients={compact}
				labels={{
					all: clientsNs("all"),
					filter: page("list.filter"),
					services: t("services"),
					more: page("list.more"),
					challenge: page("cases.labels.challenge"),
					solution: page("cases.labels.solution"),
					result: page("cases.labels.result")
				}}
			/>
		</Section>
	);
}

/** The three client testimonials as a static quote band. */
export async function QuotesSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home.testimonials" });
	const items = await getTranslations({ locale, namespace: "testimonials" });
	const quotes = [0, 1, 2].map((i) => ({
		quote: items(`items.${i}.quote`),
		name: items(`items.${i}.name`),
		role: items(`items.${i}.role`),
		company: items(`items.${i}.company`)
	}));
	return (
		<Section>
			<SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				{quotes.map((q) => (
					<figure key={q.name} className="reveal flex flex-col rounded-3xl border border-border bg-card p-6 sm:p-8">
						<Quote className="size-5 text-brand-text" aria-hidden="true" />
						<blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground sm:text-lg">{q.quote}</blockquote>
						<figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-5">
							<span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand-text">
								{initials(q.name)}
							</span>
							<span className="min-w-0">
								<span className="block text-sm font-semibold text-foreground">{q.name}</span>
								<span className="block text-sm text-muted-foreground">
									{q.role}, {q.company}
								</span>
							</span>
						</figcaption>
					</figure>
				))}
			</div>
		</Section>
	);
}
