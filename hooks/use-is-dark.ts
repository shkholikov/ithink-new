"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};

export function useIsDark() {
	const { resolvedTheme } = useTheme();
	// false during SSR and hydration, true after, so the server render and the first client render match.
	// The site defaults to light, so "not mounted yet" reads as light.
	const mounted = useSyncExternalStore(subscribe, () => true, () => false);
	return mounted && resolvedTheme === "dark";
}
