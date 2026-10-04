import { z } from "zod";
import type { ServiceSlug as SitePageSlug } from "@/components/pages/service-page";

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
	"corporate-training"
] as const;

export type LeadService = (typeof LEAD_SERVICES)[number];

export const BUDGET_RANGES = ["lt_1k", "1k_5k", "5k_15k", "gt_15k", "unknown"] as const;

/** The site's service page slugs are shorter than the CRM's service slugs. */
export const PAGE_TO_LEAD_SERVICE: Record<SitePageSlug, LeadService> = {
	"it-infrastructure": "it-infrastructure",
	"managed-it": "managed-it-services",
	"crm-automation": "crm-sales-automation",
	"process-automation": "business-process-automation",
	"software-development": "custom-software-development",
	"it-audit": "it-audit-consulting"
};

/** `+` followed by digits only — what the CRM stores and dials. */
export function normalizePhone(value: string) {
	return "+" + value.replace(/\D/g, "");
}

/**
 * Formats as the visitor types. Uzbek numbers get the familiar
 * `+998 (90) 123-45-67` mask; other country codes (clients in KZ and TJ) are
 * left as `+` and digits, since their groupings differ.
 */
export function formatPhone(value: string) {
	const digits = value.replace(/\D/g, "").slice(0, 15);
	if (!digits) return "+";
	if (!digits.startsWith("998")) return "+" + digits;

	const rest = digits.slice(3, 12);
	let out = "+998";
	if (rest.length > 0) out += " (" + rest.slice(0, 2);
	if (rest.length >= 2) out += ")";
	if (rest.length > 2) out += " " + rest.slice(2, 5);
	if (rest.length > 5) out += "-" + rest.slice(5, 7);
	if (rest.length > 7) out += "-" + rest.slice(7, 9);
	return out;
}

/** The ITHINK bot, tagged with the page the visitor came from (`/start site_<tag>`). */
export function telegramLink(pageTag: string) {
	return `https://t.me/ithinkuzbot?start=site_${pageTag.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 59)}`;
}

const optionalText = (schema: z.ZodString) => z.union([schema, z.literal("")]).optional();

export const LeadFormSchema = z.object({
	service: z.enum(LEAD_SERVICES, { error: "service" }),
	name: z.string().trim().min(2, "name").max(80, "name"),
	phone: z
		.string()
		.trim()
		.refine((v) => {
			const digits = v.replace(/\D/g, "");
			// A started-but-unfinished Uzbek number is the common mistake.
			if (digits.startsWith("998")) return digits.length === 12;
			return digits.length >= 9 && digits.length <= 15;
		}, "phone"),
	email: optionalText(z.string().trim().max(120).email("email")),
	telegram: optionalText(z.string().trim().regex(/^@?[A-Za-z0-9_]{4,32}$/, "telegram")),
	budget: z.union([z.enum(BUDGET_RANGES), z.literal("")]).optional(),
	description: z.string().trim().min(10, "description").max(2000, "description"),
	consent: z.literal(true, { error: "consent" }),
	website: z.string().optional()
});

export type LeadFormValues = z.input<typeof LeadFormSchema>;
