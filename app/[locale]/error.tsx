"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { GlassButton } from "@/components/glassyui/glass-button";

/**
 * Render-error boundary for the locale segment.
 *
 * Keeps the navbar and footer when a page throws during render, and offers a retry.
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
		<section data-lg-theme="dark" className="ink-scene relative flex min-h-[70vh] items-center overflow-hidden text-white">
			<div aria-hidden="true" className="ink-grid pointer-events-none absolute inset-0" />
			<div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-36 sm:px-6 lg:px-8">
				<p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80">
					<AlertTriangle className="size-3.5 text-accent-yellow" aria-hidden="true" />
					{t("badge")}
				</p>
				<h1 className="max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl">{t("title")}</h1>
				<p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">{t("subtitle")}</p>
				{error.digest && <p className="mt-4 font-mono text-xs text-ink-muted">{error.digest}</p>}
				<div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
					<GlassButton variant="prominent" size="lg" onClick={reset} className="gap-2 font-semibold">
						<RotateCcw className="size-4" aria-hidden="true" />
						{t("retry")}
					</GlassButton>
					<GlassButton asChild variant="soft" size="lg" className="font-semibold">
						<Link href={`/${locale}`}>{t("home")}</Link>
					</GlassButton>
				</div>
			</div>
		</section>
	);
}
