import type { LeadService } from "@/lib/lead";
import { PARTNER_SLUGS, type PartnerSlug } from "@/lib/site-nav";

/** Partners with a logo file in public/. The others show their PartnerMark tile. */
export const PARTNER_LOGOS: Partial<Record<PartnerSlug, { src: string; width: number; height: number }>> = {
	itgrix: { src: "/images/partners/itgrix.png", width: 2340, height: 1101 }
};

/** The vendor's own site, shown as the secondary hero action. */
export const PARTNER_LINKS: Partial<Record<PartnerSlug, string>> = {
	itgrix: "https://itgrix.com/ru"
};

/** Lead form service per partner page. MEGACOUNT is not a CRM product, so its form has no preset service. */
export const PARTNER_LEAD_SERVICE: Partial<Record<PartnerSlug, LeadService>> = {
	amocrm: "crm-sales-automation",
	bitrix24: "crm-sales-automation",
	"online-pbx": "crm-sales-automation",
	wazzup: "crm-sales-automation",
	itgrix: "crm-sales-automation"
};

export function isPartnerSlug(slug: string): slug is PartnerSlug {
	return (PARTNER_SLUGS as readonly string[]).includes(slug);
}
