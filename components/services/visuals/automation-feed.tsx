"use client";

import { CalendarCheck, FileText, Package, PenLine, Send, UserCheck, Workflow, Zap, type LucideIcon } from "lucide-react";
import { VisualFrame, VisualHeader } from "./frame";
import { LiveFeed } from "./live-feed";

type Labels = { title: string; auto: string; example: string; events: { title: string; source: string }[] };

// Same order as `servicePages.process-automation.visual.events`.
const ICONS: LucideIcon[] = [FileText, UserCheck, PenLine, Send, Package, CalendarCheck];

/** Process automation: a feed of events the automations fire on their own (LiveFeed over AnimatedList). */
export function AutomationFeed({ labels }: { labels: Labels }) {
	return (
		<VisualFrame>
			<VisualHeader icon={Workflow} title={labels.title} tag={labels.example} live />
			<div className="relative mt-4 h-[18rem] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_78%,transparent)]">
				<LiveFeed visible={5} interval={2200}>
					{labels.events.map((e, i) => {
						const Icon = ICONS[i % ICONS.length];
						return (
							<div key={e.title} className="flex items-center gap-3 rounded-xl border border-ink-foreground/10 bg-ink-foreground/5 px-3.5 py-3">
								<Icon className="size-4 shrink-0 text-ink-muted" />
								<span className="min-w-0 flex-1">
									<span className="block truncate text-sm font-medium">{e.title}</span>
									<span className="block truncate text-xs text-ink-muted">{e.source}</span>
								</span>
								<span className="tag hidden border-accent-yellow/50 text-accent-yellow-text sm:inline-flex">
									<Zap className="size-3" />
									{labels.auto}
								</span>
							</div>
						);
					})}
				</LiveFeed>
			</div>
		</VisualFrame>
	);
}
