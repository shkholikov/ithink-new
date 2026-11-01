import { getTranslations } from "next-intl/server";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Section, SectionHeading } from "@/components/site/section";
import { SERVICE_SLUGS } from "@/lib/services";
import { SERVICE_ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { FeatureVisual } from "@/components/services/feature-visuals";
import type { TileVisual } from "@/components/services/config";

// Rows on desktop: 2+1, 1+1+1, 3. On tablets: 2, 1+1, 1+1, 2. No empty cells at either size.
const SPANS = ["sm:col-span-2 lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-1", "lg:col-span-1", "sm:col-span-2 lg:col-span-3"];

export async function ServicesBento({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home.services" });
	const items = await getTranslations({ locale, namespace: "services" });

	return (
		<Section id="services">
			<SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
			<BentoGrid className="auto-rows-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{SERVICE_SLUGS.map((slug, i) => (
					<BentoCard
						key={slug}
						name={items(`items.${i}.title`)}
						description={items(`items.${i}.description`)}
						Icon={SERVICE_ICONS[slug]}
						index={i + 1}
						href={`/${locale}/services/${slug}`}
						cta={t("more")}
						className={cn("reveal col-span-1", SPANS[i])}
						background={<CardBackground index={i} tag={items(`items.${i}.tag`)} visual={VISUAL[slug]} />}
					/>
				))}
			</BentoGrid>
		</Section>
	);
}

/** The same CSS mini visuals as each service page's feature tiles, as a preview at the top of the card. */
const VISUAL: Record<(typeof SERVICE_SLUGS)[number], TileVisual> = {
	"it-infrastructure": "rack",
	"managed-it": "uptime",
	"crm-automation": "channels",
	"process-automation": "flow",
	"software-development": "code",
	"it-audit": "checklist"
};

function CardBackground({ index, tag, visual }: { index: number; tag: string; visual: TileVisual }) {
	return (
		<>
			<div aria-hidden="true" className="absolute inset-0">
				<GridPattern
					width={32}
					height={32}
					className={cn(
						"fill-brand/5 stroke-brand/10 [mask-image:radial-gradient(260px_circle_at_top_right,white,transparent)]",
						index % 2 === 1 && "[mask-image:radial-gradient(220px_circle_at_top_left,white,transparent)]"
					)}
				/>
				<div className="absolute -right-16 -top-16 size-48 rounded-full bg-brand/10 blur-3xl transition-transform duration-500 group-hover:scale-125" />
				<span className="tag absolute right-5 top-5 bg-background/80 backdrop-blur">{tag}</span>
			</div>
			{/* In the card's flow, above the text, so it never overlaps the copy. */}
			<div aria-hidden="true" className="relative px-6 pt-16 transition-transform duration-500 group-hover:-translate-y-1">
				<FeatureVisual kind={visual} />
			</div>
		</>
	);
}
