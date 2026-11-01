import { SERVICE_SLUGS } from "@/lib/services";

/**
 * Every routed slug on the site, in menu order. The navbar, the footer and app/sitemap.ts read
 * this, so a menu link can never point at a page that does not exist.
 */
export const SOLUTION_SLUGS = ["business", "education", "enterprise"] as const;
export const LICENSE_SLUGS = ["microsoft", "security", "design"] as const;
export const TRAINING_SLUGS = ["courses", "certification", "corporate"] as const;
export const PARTNER_SLUGS = ["amocrm", "bitrix24", "online-pbx", "wazzup", "megacount", "itgrix"] as const;

export type SolutionSlug = (typeof SOLUTION_SLUGS)[number];
export type LicenseSlug = (typeof LICENSE_SLUGS)[number];
export type TrainingSlug = (typeof TRAINING_SLUGS)[number];
export type PartnerSlug = (typeof PARTNER_SLUGS)[number];

/** Top-level pages without a slug. */
export const STATIC_PAGES = ["", "company", "customers", "partners", "hire-us", "career", "contact"] as const;

/** Every path under a locale, for the sitemap. */
export function allPaths(): string[] {
	return [
		...STATIC_PAGES.map((p) => (p ? `/${p}` : "")),
		...SERVICE_SLUGS.map((s) => `/services/${s}`),
		...SOLUTION_SLUGS.map((s) => `/solutions/${s}`),
		...LICENSE_SLUGS.map((s) => `/licenses/${s}`),
		...TRAINING_SLUGS.map((s) => `/training/${s}`),
		...PARTNER_SLUGS.map((s) => `/partners/${s}`)
	];
}
