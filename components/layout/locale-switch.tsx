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
		<nav aria-label={label} className={cn("flex items-center gap-0.5 rounded-xl bg-white/5 p-1", className)}>
			{routing.locales.map((l) => (
				<Link
					key={l}
					href={`/${l}${rest}`}
					hrefLang={l}
					aria-current={l === locale ? "true" : undefined}
					className={cn(
						"rounded-lg px-2 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
						l === locale ? "bg-white/15 text-white" : "text-white/60 hover:text-white"
					)}
				>
					{l}
				</Link>
			))}
		</nav>
	);
}
