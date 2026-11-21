"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The desktop dropdowns are CSS-only and open on focus-within. The header survives client-side
 * navigation, so the link just clicked keeps focus and its panel stays open over the next page:
 * after a route change, drop focus that is still inside the header.
 */
export function BlurOnNavigate() {
	const pathname = usePathname();
	useEffect(() => {
		const active = document.activeElement;
		if (active instanceof HTMLElement && active.closest("header")) active.blur();
	}, [pathname]);
	return null;
}
