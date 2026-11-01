"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};

export function useIsDark() {
	const { theme } = useTheme();
	// false during SSR and hydration, true after, so the server render and the first client render match.
	const mounted = useSyncExternalStore(subscribe, () => true, () => false);
	return !mounted || theme === "dark";
}
