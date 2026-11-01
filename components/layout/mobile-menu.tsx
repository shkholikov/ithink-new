"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

/**
 * A <details> disclosure, so the menu opens without JavaScript. The script only closes it after
 * navigation, because the layout (and this element) survives client-side route changes.
 */
export function MobileMenu({ openLabel, closeLabel, children }: { openLabel: string; closeLabel: string; children: React.ReactNode }) {
	const ref = useRef<HTMLDetailsElement>(null);
	const pathname = usePathname();
	useEffect(() => {
		if (ref.current) ref.current.open = false;
	}, [pathname]);

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
			<div className="absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-ink-line bg-ink p-4 shadow-2xl">
				{children}
			</div>
		</details>
	);
}
