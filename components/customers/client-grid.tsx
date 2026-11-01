"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { initials, type CompactCase } from "@/components/customers/cases";
import { cn } from "@/lib/utils";

type Labels = { all: string; filter: string; services: string; more: string; challenge: string; solution: string; result: string };

/**
 * Client cards with an industry filter. Each card opens a native <details> with the challenge,
 * solution and result, so the copy is in the HTML and works without JavaScript. Copy arrives
 * translated from the server.
 */
export function ClientGrid({ clients, labels }: { clients: CompactCase[]; labels: Labels }) {
	const [industry, setIndustry] = useState<string | null>(null);
	const industries = [...new Set(clients.map((c) => c.industry))];
	const shown = industry ? clients.filter((c) => c.industry === industry) : clients;
	const options = [
		{ value: null, label: labels.all, count: clients.length },
		...industries.map((i) => ({ value: i, label: i, count: clients.filter((c) => c.industry === i).length }))
	];

	return (
		<>
			<div role="group" aria-label={labels.filter} className="reveal mb-8 flex flex-wrap gap-2">
				{options.map((o) => {
					const active = industry === o.value;
					return (
						<button
							key={o.label}
							type="button"
							aria-pressed={active}
							onClick={() => setIndustry(o.value)}
							className={cn(
								"inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
								active ? "border-brand-dark bg-brand-dark text-white" : "border-border bg-card text-foreground hover:border-brand/40"
							)}
						>
							{o.label}
							<span className={cn("text-xs tabular-nums", active ? "text-white/80" : "text-muted-foreground")}>{o.count}</span>
						</button>
					);
				})}
			</div>
			<ul className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{shown.map((c) => (
					<li key={c.key} id={`case-${c.key}`} className="flex scroll-mt-24 flex-col rounded-3xl border border-border bg-card p-6 transition-colors hover:border-brand/30">
						<div className="flex items-center gap-4">
							<span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-base font-semibold text-brand-text">
								{initials(c.name)}
							</span>
							<div className="min-w-0">
								<h3 className="truncate text-lg font-semibold tracking-tight text-foreground">{c.name}</h3>
								<p className="text-sm text-muted-foreground">{c.industry}</p>
							</div>
						</div>
						<p className="mt-5 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
						<div className="mt-5">
							<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{labels.services}</p>
							<ul className="mt-3 flex flex-wrap gap-1.5">
								{c.services.map((s) => (
									<li key={s.label}>
										<Link
											href={s.href}
											className="tag hover:border-brand/50 hover:text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
										>
											{s.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<details className="group mt-5 border-t border-border pt-4">
							<summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl text-sm font-semibold text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand [&::-webkit-details-marker]:hidden">
								{labels.more}
								<ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
							</summary>
							<dl className="mt-4 grid gap-4">
								{[
									[labels.challenge, c.challenge],
									[labels.solution, c.solution],
									[labels.result, c.result]
								].map(([term, text]) => (
									<div key={term}>
										<dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{term}</dt>
										<dd className="mt-1 text-sm leading-relaxed text-foreground">{text}</dd>
									</div>
								))}
								{/* Owner's figures: customersPage.cases.items.<key>.metrics. Nothing renders while the array is empty. */}
								{c.metrics.map((m) => (
									<div key={m.label}>
										<dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.label}</dt>
										<dd className="mt-1 text-2xl font-semibold tracking-tight text-foreground tabular-nums">
											{m.prefix}
											{m.value}
											<span className="text-brand-text">{m.suffix}</span>
										</dd>
									</div>
								))}
							</dl>
						</details>
					</li>
				))}
			</ul>
		</>
	);
}
