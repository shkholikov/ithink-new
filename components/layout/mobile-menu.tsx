"use client";

import { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { GlassCard } from "@/components/site/glass-card";

/**
 * A <details> disclosure, so the menu opens without JavaScript. The script closes it when a link in it
 * is followed (the layout survives client-side route changes, and a link to the current page does not
 * change the path), on Escape, and on a tap outside.
 */
export function MobileMenu({ openLabel, closeLabel, children }: { openLabel: string; closeLabel: string; children: React.ReactNode }) {
	const ref = useRef<HTMLDetailsElement>(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key !== "Escape" || !el.open) return;
			el.open = false;
			el.querySelector("summary")?.focus();
		};
		const onPointerDown = (e: PointerEvent) => {
			if (el.open && !el.contains(e.target as Node)) el.open = false;
		};
		document.addEventListener("keydown", onKey);
		document.addEventListener("pointerdown", onPointerDown);
		return () => {
			document.removeEventListener("keydown", onKey);
			document.removeEventListener("pointerdown", onPointerDown);
		};
	}, []);

	const closeOnLink = (e: React.MouseEvent) => {
		if (ref.current && (e.target as Element).closest("a")) ref.current.open = false;
	};

	return (
		<details ref={ref} className="group lg:hidden">
			<summary
				className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full text-ink-foreground/80 hover:bg-ink-foreground/10 [&::-webkit-details-marker]:hidden"
				aria-label={openLabel}
			>
				<Menu className="size-5 group-open:hidden" aria-hidden="true" />
				<X className="hidden size-5 group-open:block" aria-hidden="true" />
				<span className="sr-only group-open:hidden">{openLabel}</span>
				<span className="sr-only hidden group-open:inline">{closeLabel}</span>
			</summary>
			{/* The glass stays put and an inner div scrolls: a scrolling glass surface would carry its frost layer away. */}
			<GlassCard preset="prominent" className="glass-dense absolute inset-x-0 top-full mt-2 rounded-2xl p-0">
				{/* Clicks bubble from the links inside; the div is not itself interactive. */}
				<div onClick={closeOnLink} className="max-h-[calc(100dvh-6rem)] overflow-y-auto p-4">
					{children}
				</div>
			</GlassCard>
		</details>
	);
}
