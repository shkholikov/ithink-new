import { cn } from "@/lib/utils";

/**
 * Scroll entrance for a block: fades up as it scrolls into view.
 *
 * Pure CSS (`.reveal` in globals.css, scroll-driven animation), so it renders on
 * the server and the content is visible before any JavaScript loads — the old
 * framer-motion version shipped `opacity: 0` in the HTML and left the page
 * blank on slow phones until hydration.
 */
export function FadeIn({ children, className, y = 20 }: { children: React.ReactNode; className?: string; y?: number }) {
	return (
		<div className={cn("reveal", className)} style={y === 20 ? undefined : ({ "--reveal-y": `${y}px` } as React.CSSProperties)}>
			{children}
		</div>
	);
}
