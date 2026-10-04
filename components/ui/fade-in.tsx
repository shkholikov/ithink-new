"use client";

import { m } from "framer-motion";

/**
 * The scroll-entry animation, extracted as a client leaf.
 *
 * Several page components were client components purely because they combined
 * `useTranslations` with framer's `m.*`. Wrapping only the animated element
 * lets the page around it render on the server, so its copy never ships to the
 * browser and there is far less to hydrate.
 *
 * The defaults are exactly the values used across the site — see CLAUDE.md —
 * so output is visually identical to the inline `m.div` it replaces.
 */
export function FadeIn({
	children,
	className,
	delay = 0,
	duration = 0.5,
	y = 20,
	x = 0
}: {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	duration?: number;
	y?: number;
	x?: number;
}) {
	return (
		<m.div
			initial={{ opacity: 0, y, x }}
			whileInView={{ opacity: 1, y: 0, x: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration, delay }}
			className={className}
		>
			{children}
		</m.div>
	);
}
