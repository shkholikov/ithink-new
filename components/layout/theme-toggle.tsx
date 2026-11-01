"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsDark } from "@/hooks/use-is-dark";

/** Both icons render on the server; CSS picks one, so there is no hydration flash. */
export function ThemeToggle({ labelDark, labelLight }: { labelDark: string; labelLight: string }) {
	const { setTheme } = useTheme();
	const isDark = useIsDark();
	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label={isDark ? labelLight : labelDark}
			className="inline-flex size-10 items-center justify-center rounded-full text-ink-foreground/75 transition-colors hover:bg-ink-foreground/10 hover:text-ink-foreground"
		>
			<Sun className="hidden size-[18px] dark:block" aria-hidden="true" />
			<Moon className="size-[18px] dark:hidden" aria-hidden="true" />
		</button>
	);
}
