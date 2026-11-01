import type { ServiceSlug } from "@/lib/services";

/**
 * Which client gets which case layout, and where each service chip links.
 * `name` matches `customers.items[].name` (identical in all three locales); `key` is the entry in
 * `customersPage.cases.items`. `services` runs parallel to that client's `customers.items[].services`
 * labels: one slug per label, in the same order.
 */
export const CASES = [
	{ key: "mobicenter", name: "Mobicenter", featured: true, services: ["it-infrastructure", "it-infrastructure", "managed-it"] },
	{ key: "obbo", name: "OBBO", featured: true, services: ["software-development", "crm-automation"] },
	{ key: "avtozet", name: "Avtozet", featured: true, services: ["crm-automation", "process-automation"] },
	{ key: "craytonVilt", name: "Crayton & Vilt", featured: false, services: ["managed-it", "it-infrastructure"] },
	{ key: "aslzar", name: "AslZar", featured: false, services: ["software-development", "software-development"] },
	{ key: "kreditMarket", name: "Kredit Market", featured: false, services: ["process-automation", "crm-automation"] },
	{ key: "penostyle", name: "Penostyle", featured: false, services: ["it-infrastructure", "it-infrastructure"] },
	{ key: "sokolov", name: "SOKOLOV", featured: false, services: ["managed-it"] },
	{ key: "udirect", name: "UDirect", featured: false, services: ["process-automation", "software-development"] },
	{ key: "paradiseWall", name: "ParadiseWall", featured: false, services: ["software-development", "software-development"] },
	{ key: "chudoTovary", name: "Chudo Tovary", featured: false, services: ["software-development", "crm-automation"] }
] as const satisfies readonly { key: string; name: string; featured: boolean; services: readonly ServiceSlug[] }[];

/**
 * A measured outcome. The owner's figures go in `customersPage.cases.items.<key>.metrics` in all
 * three messages files, e.g. `{ "value": 30, "suffix": "%", "label": "..." }`. Until then the arrays
 * are empty and no metric slot renders: the page never shows an invented or placeholder number.
 */
export type Metric = { value: number; prefix?: string; suffix?: string; label: string };

export type ServiceLink = { label: string; href: string };

/** Fields every client shows: name, industry, the original description and linked service chips. */
type CaseBase = { key: string; name: string; industry: string; description: string; services: ServiceLink[]; metrics: Metric[] };

export type FeaturedCase = CaseBase & { challenge: string; steps: string[]; results: string[]; stack: string[] };
export type CompactCase = CaseBase & { challenge: string; solution: string; result: string };

/** Two letters for the tile: the first letters of the first two words, or the first two of a single word. */
export function initials(name: string) {
	const words = name.split(/\s+/).filter((w) => /^[\p{L}\p{N}]/u.test(w));
	return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
}
