"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { AlertTriangle, ScanSearch } from "lucide-react";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { VisualFrame, VisualHeader } from "./frame";
import { cn } from "@/lib/utils";

type Labels = { title: string; example: string; areas: string[]; findings: { text: string; risk: string }[] };

// Illustrative scores for a sample report, labelled as such in the header. Not client data.
const SCORES = [82, 54, 38, 71];
const COLORS = ["#377dff", "#f9b934", "var(--destructive)", "#377dff"];
const RISK = ["border-destructive/40 text-destructive", "border-accent-yellow/50 text-accent-yellow-text"];

/** IT audit: Magic UI progress rings per area fill once the card is on screen, then two sample findings. */
export function AuditScorecard({ labels }: { labels: Labels }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.4 });

	return (
		<VisualFrame>
			<VisualHeader icon={ScanSearch} title={labels.title} tag={labels.example} />
			<div ref={ref} className="mt-6 grid grid-cols-4 gap-2">
				{labels.areas.map((area, i) => (
					<div key={area} className="flex flex-col items-center gap-2 text-center">
						<AnimatedCircularProgressBar
							value={inView ? SCORES[i] : 0}
							gaugePrimaryColor={COLORS[i]}
							gaugeSecondaryColor="var(--ink-line)"
							className="size-16 text-base tabular-nums sm:size-20 sm:text-lg"
						/>
						<span className="text-[11px] font-medium leading-tight text-ink-muted sm:text-xs">{area}</span>
					</div>
				))}
			</div>
			<ul className="mt-6 space-y-2.5">
				{labels.findings.map((f, i) => (
					<li key={f.text} className="flex items-center gap-3 rounded-xl border border-ink-foreground/10 bg-ink-foreground/5 px-3 py-2.5">
						<AlertTriangle className={cn("size-4 shrink-0", i === 0 ? "text-destructive" : "text-accent-yellow-text")} />
						<span className="min-w-0 flex-1 text-sm leading-snug">{f.text}</span>
						<span className={cn("tag shrink-0", RISK[i % RISK.length])}>{f.risk}</span>
					</li>
				))}
			</ul>
		</VisualFrame>
	);
}
