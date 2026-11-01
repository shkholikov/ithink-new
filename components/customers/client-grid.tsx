"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type Client = { name: string; industry: string; description: string; services: string[] };

/** Two letters for the tile: the first letters of the first two words, or the first two of a single word. */
function initials(name: string) {
	const words = name.split(/\s+/).filter((w) => /^[\p{L}\p{N}]/u.test(w));
	return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
}

/** Client cards with an industry filter. Copy arrives translated from the server. */
export function ClientGrid({ clients, labels }: { clients: Client[]; labels: { all: string; filter: string; services: string } }) {
	const [industry, setIndustry] = useState<string | null>(null);
	const industries = [...new Set(clients.map((c) => c.industry))];
	const shown = industry ? clients.filter((c) => c.industry === industry) : clients;
	const options = [{ value: null, label: labels.all, count: clients.length }, ...industries.map((i) => ({ value: i, label: i, count: clients.filter((c) => c.industry === i).length }))];

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
								active ? "border-brand bg-brand text-white" : "border-border bg-card text-foreground hover:border-brand/40"
							)}
						>
							{o.label}
							<span className={cn("text-xs tabular-nums", active ? "text-white/80" : "text-muted-foreground")}>{o.count}</span>
						</button>
					);
				})}
			</div>
			<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{shown.map((c) => (
					<li key={c.name} className="flex flex-col rounded-3xl border border-border bg-card p-6 transition-colors hover:border-brand/30">
						<div className="flex items-center gap-4">
							<span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-base font-semibold text-brand-text">
								{initials(c.name)}
							</span>
							<div className="min-w-0">
								<h3 className="truncate text-lg font-semibold tracking-tight text-foreground">{c.name}</h3>
								<p className="text-sm text-muted-foreground">{c.industry}</p>
							</div>
						</div>
						<p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
						<div className="mt-6 border-t border-border pt-4">
							<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{labels.services}</p>
							<ul className="mt-3 flex flex-wrap gap-1.5">
								{c.services.map((s) => (
									<li key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
										{s}
									</li>
								))}
							</ul>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
