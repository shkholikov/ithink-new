import { z } from "zod";
import { PHONE_COUNTRIES, toE164, type PhoneCountry } from "@/lib/phone";
import type { ServiceSlug as SitePageSlug } from "@/lib/services";

/**
 * The lead intake contract, mirrored from the endpoint's schema
 * (ithink-miniapp `packages/types/src/lead.ts`, `SiteLeadSubmissionSchema`).
 * The server validates again; this copy only lets the form catch mistakes
 * before a round trip. Keep the two in step when either changes.
 *
 * Error messages are keys into the `leadForm.errors` namespace.
 */

export const LEAD_SERVICES = [
	"it-infrastructure",
	"managed-it-services",
	"crm-sales-automation",
	"business-process-automation",
	"custom-software-development",
	"it-audit-consulting",
	"software-licenses",
	"corporate-training",
	// Last in the list: for requests that fit none of the above; the comment field opens with it.
	"other"
] as const;

export type LeadService = (typeof LEAD_SERVICES)[number];

export const COMPANY_SIZES = ["1_10", "11_50", "51_200", "200_plus"] as const;

/** The site's service page slugs are shorter than the CRM's service slugs. */
export const PAGE_TO_LEAD_SERVICE: Record<SitePageSlug, LeadService> = {
	"it-infrastructure": "it-infrastructure",
	"managed-it": "managed-it-services",
	"crm-automation": "crm-sales-automation",
	"process-automation": "business-process-automation",
	"software-development": "custom-software-development",
	"it-audit": "it-audit-consulting"
};

/** The ITHINK bot, tagged with the page the visitor came from (`/start site_<tag>`). */
export function telegramLink(pageTag: string) {
	return `https://t.me/ithinkuzbot?start=site_${pageTag.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 59)}`;
}

export const LeadFormSchema = z
	.object({
		service: z.enum(LEAD_SERVICES, { error: "service" }),
		name: z.string().trim().min(2, "name").max(80, "name"),
		phone_country: z.enum(PHONE_COUNTRIES.map((c) => c.code) as [PhoneCountry, ...PhoneCountry[]]),
		phone: z.string(),
		company_size: z.union([z.enum(COMPANY_SIZES), z.literal("")]).optional(),
		description: z.string().trim().max(2000, "description").optional(),
		website: z.string().optional()
	})
	// `when` runs this even if other fields failed, so a bad phone is reported in
	// the same pass as an empty name instead of only after it is fixed.
	.refine((v) => typeof v.phone === "string" && !!toE164(v.phone, v.phone_country as PhoneCountry), {
		path: ["phone"],
		message: "phone",
		when: () => true
	});

export type LeadFormValues = z.input<typeof LeadFormSchema>;
