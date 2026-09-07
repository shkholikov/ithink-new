"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";

/**
 * Render-error boundary for the locale segment.
 *
 * Every page component here is a client component, so before this existed a
 * single throw during render took the whole page to a blank white screen with
 * nothing to catch it. This keeps the navbar and footer and offers a way out.
 */
export default function LocaleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	const locale = useLocale();
	const t = useTranslations("error");

	useEffect(() => {
		// Until error monitoring is wired up, this is the only trace a failure
		// leaves anywhere.
		console.error("[render error]", error);
	}, [error]);

	return (
		<div className="pt-24 bg-background">
			<section className="py-16 lg:py-20 relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#377dff]/8 rounded-full blur-[120px]" />
				</div>
				<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<SectionBadge icon={AlertTriangle} label={t("badge")} variant="yellow" className="mb-6" />
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">{t("title")}</h1>
					<p className="text-base text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
					{error.digest && <p className="mt-4 text-xs text-muted-foreground/70 font-mono">{error.digest}</p>}
				</div>
			</section>

			<section className="pb-24">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
					<button
						type="button"
						onClick={reset}
						className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#377dff] hover:bg-[#2563eb] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-[#377dff]/30 hover:shadow-lg hover:shadow-[#377dff]/40 hover:scale-[1.02]"
					>
						<RotateCcw className="w-4 h-4" />
						{t("retry")}
					</button>
					<Link
						href={`/${locale}`}
						className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-card border border-border hover:border-[#377dff]/40 hover:bg-accent text-foreground text-sm font-medium rounded-xl transition-all duration-200"
					>
						{t("home")}
					</Link>
				</div>
			</section>
		</div>
	);
}
