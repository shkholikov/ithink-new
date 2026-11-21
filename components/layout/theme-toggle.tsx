"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsDark } from "@/hooks/use-is-dark";
import { GlassButton } from "@/components/glassyui/glass-button";

/** Both icons render on the server; CSS picks one, so there is no hydration flash. */
export function ThemeToggle({ labelDark, labelLight }: { labelDark: string; labelLight: string }) {
	const { setTheme } = useTheme();
	const isDark = useIsDark();
	return (
		<GlassButton
			type="button"
			variant="ghost"
			size="sm"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label={isDark ? labelLight : labelDark}
			className="size-10 rounded-full p-0 text-ink-foreground/75 hover:text-ink-foreground"
		>
			<Sun className="hidden size-[18px] dark:block" aria-hidden="true" />
			<Moon className="size-[18px] dark:hidden" aria-hidden="true" />
		</GlassButton>
	);
}
