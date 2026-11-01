import {
	AppWindow,
	Archive,
	BookOpen,
	Box,
	CalendarClock,
	ClipboardCheck,
	ClipboardList,
	Cpu,
	FileCheck2,
	Film,
	Funnel,
	Headphones,
	KeyRound,
	Layers,
	ListChecks,
	MonitorCog,
	Network,
	Palette,
	RefreshCw,
	ScanSearch,
	Server,
	ShieldCheck,
	ShieldHalf,
	SlidersHorizontal,
	Target,
	Users,
	Wifi,
	Workflow,
	type LucideIcon
} from "lucide-react";
import type { LeadService } from "@/lib/lead";
import type { ServiceSlug } from "@/lib/services";
import { LICENSE_SLUGS, SOLUTION_SLUGS, TRAINING_SLUGS } from "@/lib/site-nav";
import { LICENSE_ICONS, SOLUTION_ICONS, TRAINING_ICONS } from "@/lib/icons";

/**
 * The nine product pages under /licenses, /training and /solutions. Copy lives in
 * `productPages.<group>.<slug>`; this file holds what is not copy: icons, links and the lead service.
 */
export const PRODUCT_GROUPS = {
	licenses: { slugs: LICENSE_SLUGS, icons: LICENSE_ICONS as Record<string, LucideIcon>, lead: "software-licenses" },
	training: { slugs: TRAINING_SLUGS, icons: TRAINING_ICONS as Record<string, LucideIcon>, lead: "corporate-training" },
	solutions: { slugs: SOLUTION_SLUGS, icons: SOLUTION_ICONS as Record<string, LucideIcon>, lead: undefined }
} satisfies Record<string, { slugs: readonly string[]; icons: Record<string, LucideIcon>; lead: LeadService | undefined }>;

export type ProductGroup = keyof typeof PRODUCT_GROUPS;

export function isProductSlug(group: ProductGroup, slug: string): boolean {
	return (PRODUCT_GROUPS[group].slugs as readonly string[]).includes(slug);
}

/** A path under the locale, e.g. "/services/managed-it" or "/licenses/microsoft". */
type PagePath = `/services/${ServiceSlug}` | `/licenses/${string}` | `/training/${string}`;

type ProductConfig = {
	/** One icon per `included.items` entry, same order. */
	included: LucideIcon[];
	/** Solutions only: where each `included.items` entry links, same order. */
	includedHref?: PagePath[];
	/** Service pages linked in the related block, after the other two pages of the group. */
	relatedServices: ServiceSlug[];
};

export const PRODUCT_CONFIG: Record<ProductGroup, Record<string, ProductConfig>> = {
	licenses: {
		microsoft: { included: [ListChecks, AppWindow, MonitorCog, FileCheck2, SlidersHorizontal, RefreshCw], relatedServices: ["it-infrastructure", "managed-it"] },
		security: { included: [ScanSearch, ShieldHalf, Network, Archive, SlidersHorizontal, RefreshCw], relatedServices: ["it-audit", "managed-it"] },
		design: { included: [ListChecks, Palette, Box, Film, Cpu, RefreshCw], relatedServices: ["it-infrastructure", "managed-it"] }
	},
	training: {
		courses: { included: [Server, Funnel, Workflow, ShieldCheck, CalendarClock, BookOpen], relatedServices: ["crm-automation", "process-automation"] },
		certification: { included: [Target, ClipboardList, Layers, ClipboardCheck, Users, Headphones], relatedServices: ["it-infrastructure", "it-audit"] },
		corporate: { included: [Funnel, Server, ShieldCheck, Workflow, SlidersHorizontal, Users], relatedServices: ["crm-automation", "process-automation"] }
	},
	solutions: {
		business: {
			included: [Funnel, Workflow, Headphones, ScanSearch],
			includedHref: ["/services/crm-automation", "/services/process-automation", "/services/managed-it", "/services/it-audit"],
			relatedServices: ["software-development"]
		},
		education: {
			included: [Server, Wifi, KeyRound, Users],
			includedHref: ["/services/it-infrastructure", "/services/it-infrastructure", "/licenses/microsoft", "/training/corporate"],
			relatedServices: ["managed-it", "it-audit"]
		},
		enterprise: {
			included: [Server, ScanSearch, Headphones, AppWindow],
			includedHref: ["/services/it-infrastructure", "/services/it-audit", "/services/managed-it", "/services/software-development"],
			relatedServices: ["process-automation", "crm-automation"]
		}
	}
};
