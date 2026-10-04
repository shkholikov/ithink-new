/**
 * The six service pages, in the order their cards appear on the homepage.
 * Both the homepage grid and the [slug] route read this, so a card can never
 * point at a page that does not exist.
 *
 * Kept in its own module, away from `components/pages/service-page.tsx`: the
 * footer reads it on every page, and importing it from the page component
 * dragged the lead form (zod, libphonenumber, sonner, Turnstile) into every
 * route's JavaScript, even pages with no form.
 */
export const SERVICE_SLUGS = [
	"it-infrastructure",
	"managed-it",
	"crm-automation",
	"process-automation",
	"software-development",
	"it-audit"
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
