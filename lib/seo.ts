import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://www.ithink.uz";

const OG_LOCALE: Record<string, string> = { ru: "ru_RU", en: "en_US", uz: "uz_UZ" };

/**
 * Canonical, hreflang alternates and Open Graph for one page. `path` is the part after the
 * locale, e.g. "/company" or "" for the homepage.
 */
export function pageMetadata({
	locale,
	path,
	title,
	description,
	absoluteTitle = false
}: {
	locale: string;
	path: string;
	title: string;
	description: string;
	absoluteTitle?: boolean;
}): Metadata {
	const url = `${SITE_URL}/${locale}${path}`;
	const languages = Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]));
	return {
		title: absoluteTitle ? { absolute: title } : title,
		description,
		alternates: { canonical: url, languages: { ...languages, "x-default": `${SITE_URL}/ru${path}` } },
		openGraph: {
			title,
			description,
			url,
			locale: OG_LOCALE[locale] ?? "ru_RU",
			alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
			// A page-level openGraph replaces the parent's, including the file-based image, so name it here.
			images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: "ITHINK" }]
		}
	};
}
