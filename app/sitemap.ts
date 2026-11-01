import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { allPaths } from "@/lib/site-nav";
import { SITE_URL } from "@/lib/seo";

/** Every routed page in every locale, from the same list the navbar and footer use. */
export default function sitemap(): MetadataRoute.Sitemap {
	return allPaths().flatMap((path) =>
		routing.locales.map((locale) => ({
			url: `${SITE_URL}/${locale}${path}`,
			changeFrequency: path === "" ? "weekly" : "monthly",
			priority: path === "" ? 1 : path.split("/").length > 2 ? 0.7 : 0.8,
			alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`])) }
		}))
	);
}
