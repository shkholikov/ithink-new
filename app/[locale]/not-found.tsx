import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { FileQuestion } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";

/**
 * 404 inside the locale chrome.
 *
 * Without this, a missing page fell through to Next's built-in error screen,
 * which renders outside this layout: no navbar, no footer, English only, and
 * no way back into the site. This catches every `notFound()` thrown under
 * `[locale]` — an unknown locale, an invalid service slug, or a mistyped URL.
 */
export default async function LocaleNotFound() {
	const locale = await getLocale();
	const t = await getTranslations({ locale, namespace: "notFound" });

	return (
		<div className="pt-24 bg-background">
			<PageHero icon={FileQuestion} badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

			<section className="pb-24">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
					<Link
						href={`/${locale}`}
						className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#377dff] hover:bg-[#2563eb] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-[#377dff]/30 hover:shadow-lg hover:shadow-[#377dff]/40 hover:scale-[1.02]"
					>
						{t("home")}
					</Link>
					<Link
						href={`/${locale}/contact`}
						className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-card border border-border hover:border-[#377dff]/40 hover:bg-accent text-foreground text-sm font-medium rounded-xl transition-all duration-200"
					>
						{t("contact")}
					</Link>
				</div>
			</section>
		</div>
	);
}
