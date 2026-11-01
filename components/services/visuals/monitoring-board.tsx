"use client";

import { Activity, CheckCircle2 } from "lucide-react";
import { StatusTable, VisualFrame, VisualHeader } from "./frame";
import { LiveFeed } from "./live-feed";
import { cn } from "@/lib/utils";

type Labels = { title: string; status: string; systems: string[]; tickets: string; resolved: string; items: string[]; example: string };

const BARS = 28;
// One amber bar per row at a fixed spot, so the board reads as a real history, not all green.
const INCIDENT = [17, 9, 22];

/** Managed IT: a status table with uptime history per system (CSS bars) over a feed of resolved staff requests (LiveFeed). */
export function MonitoringBoard({ labels }: { labels: Labels }) {
	return (
		<VisualFrame>
			<VisualHeader icon={Activity} title={labels.title} tag={labels.example} live />
			<StatusTable
				className="mt-1"
				status={labels.status}
				rows={labels.systems.map((name, row) => ({
					name,
					signal: (
						<span className="flex h-3.5 min-w-0 items-end gap-[2px]">
							{Array.from({ length: BARS }, (_, i) => (
								<span
									key={i}
									className={cn(
										"h-full min-w-0 flex-1 rounded-[1px]",
										i === INCIDENT[row] ? "h-3/5 bg-accent-yellow" : "bg-emerald-500/75",
										i === BARS - 1 && "animate-pulse"
									)}
								/>
							))}
						</span>
					)
				}))}
			/>
			<p className="mb-3 mt-5 text-xs font-semibold uppercase tracking-wider text-ink-muted">{labels.tickets}</p>
			<div className="relative h-[13.25rem] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_75%,transparent)]">
				<LiveFeed visible={4} interval={2600}>
					{labels.items.map((item) => (
						<div key={item} className="flex items-center gap-3 rounded-xl border border-ink-foreground/10 bg-ink-foreground/5 px-3 py-2.5">
							<CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
							<span className="min-w-0 flex-1 truncate text-sm">{item}</span>
							<span className="tag shrink-0 border-emerald-500/40 text-emerald-700 dark:text-emerald-400">{labels.resolved}</span>
						</div>
					))}
				</LiveFeed>
			</div>
		</VisualFrame>
	);
}
