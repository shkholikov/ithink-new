"use client";

import { Children, useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView } from "framer-motion";
import { AnimatedListItem } from "@/components/ui/animated-list";
import { useReducedMotion } from "./use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Endless version of Magic UI's AnimatedList: every `interval` ms the next child pops in on top
 * (AnimatedListItem's spring) and the oldest leaves at the bottom. The server renders the first
 * `visible` rows so nothing shifts on hydration. Ticks only while on screen; still under reduced motion.
 */
export function LiveFeed({ children, visible = 4, interval = 2400, className }: { children: React.ReactNode; visible?: number; interval?: number; className?: string }) {
	const items = Children.toArray(children);
	const n = items.length;
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { amount: 0.3 });
	const reduce = useReducedMotion();
	const [tick, setTick] = useState(visible - 1);

	useEffect(() => {
		if (reduce || !inView) return;
		const id = setInterval(() => setTick((t) => t + 1), interval);
		return () => clearInterval(id);
	}, [reduce, inView, interval]);

	const shown = Array.from({ length: Math.min(visible, n) }, (_, k) => tick - k);

	return (
		<div ref={ref} className={cn("flex flex-col gap-2.5", className)}>
			<AnimatePresence initial={false}>
				{shown.map((seq) => (
					<AnimatedListItem key={seq}>{items[((seq % n) + n) % n]}</AnimatedListItem>
				))}
			</AnimatePresence>
		</div>
	);
}
