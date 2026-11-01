import type { ServiceSlug } from "@/lib/services";

/** Mini illustrations drawn inside the two wide bento tiles. CSS only, see `feature-visuals.tsx`. */
export type TileVisual = "rack" | "snapshots" | "uptime" | "report" | "kanban" | "channels" | "flow" | "code" | "checkout" | "checklist" | "roadmap";

type ServiceConfig = {
	/** The two features drawn as wide tiles: one from items 0..2 and one from 3..5, so both bento rows stay full. */
	wide: [{ index: number; visual: TileVisual }, { index: number; visual: TileVisual }];
	/** Indices into the shared `faq.items` list that fit this service. */
	faq: number[];
};

export const SERVICE_CONFIG: Record<ServiceSlug, ServiceConfig> = {
	"it-infrastructure": {
		wide: [
			{ index: 0, visual: "rack" },
			{ index: 5, visual: "snapshots" }
		],
		faq: [0, 3, 5, 6]
	},
	"managed-it": {
		wide: [
			{ index: 0, visual: "uptime" },
			{ index: 5, visual: "report" }
		],
		// faq.items.4 (support SLA) is left out: its 2–4 h figure disagrees with this page's 1–2 h outcome.
		faq: [0, 1, 5, 6]
	},
	"crm-automation": {
		wide: [
			{ index: 0, visual: "kanban" },
			{ index: 3, visual: "channels" }
		],
		faq: [3, 1, 5, 6]
	},
	"process-automation": {
		wide: [
			{ index: 0, visual: "flow" },
			{ index: 4, visual: "report" }
		],
		faq: [2, 3, 5, 6]
	},
	"software-development": {
		wide: [
			{ index: 0, visual: "code" },
			{ index: 5, visual: "checkout" }
		],
		faq: [2, 3, 7, 5]
	},
	"it-audit": {
		wide: [
			{ index: 1, visual: "checklist" },
			{ index: 5, visual: "roadmap" }
		],
		faq: [1, 0, 5, 6]
	}
};

export const range = (n: number) => Array.from({ length: n }, (_, i) => i);
