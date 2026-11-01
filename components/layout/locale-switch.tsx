"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Links to the same page in the other locales, so switching language keeps the visitor's place. */
export function LocaleSwitch({ locale, label, className }: { locale: string; label: string; className?: string }) {
	const pathname = usePathname() ?? `/${locale}`;
	const rest = pathname.replace(/^\/(uz|ru|en)(?=\/|$)/, "");
	return (
		<nav aria-label={label} className={cn("flex items-center gap-0.5 rounded-full bg-ink-foreground/5 p-1", className)}>
			{routing.locales.map((l) => (
				<Link
					key={l}
					href={`/${l}${rest}`}
					hrefLang={l}
					aria-current={l === locale ? "true" : undefined}
					className={cn(
						"rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
						l === locale ? "bg-ink-foreground/15 text-ink-foreground" : "text-ink-foreground/60 hover:text-ink-foreground"
					)}
				>
					{l}
				</Link>
			))}
		</nav>
	);
}
