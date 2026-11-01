import { getTranslations } from "next-intl/server";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Section, SectionHeading } from "@/components/site/section";
import { SERVICE_SLUGS } from "@/lib/services";
import { SERVICE_ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils";

// Rows on desktop: 2+1, 1+1+1, 3. On tablets: 2, 1+1, 1+1, 2. No empty cells at either size.
const SPANS = ["sm:col-span-2 lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-1", "lg:col-span-1", "sm:col-span-2 lg:col-span-3"];

export async function ServicesBento({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home.services" });
	const items = await getTranslations({ locale, namespace: "services" });

	return (
		<Section id="services">
			<SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
			<BentoGrid className="auto-rows-[19rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{SERVICE_SLUGS.map((slug, i) => (
					<BentoCard
						key={slug}
						name={items(`items.${i}.title`)}
						description={items(`items.${i}.description`)}
						Icon={SERVICE_ICONS[slug]}
						href={`/${locale}/services/${slug}`}
						cta={t("more")}
						className={cn("reveal col-span-1", SPANS[i])}
						background={<CardBackground index={i} tag={items(`items.${i}.tag`)} />}
					/>
				))}
			</BentoGrid>
		</Section>
	);
}

function CardBackground({ index, tag }: { index: number; tag: string }) {
	return (
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
			<span className="absolute right-5 top-5 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
				{tag}
			</span>
		</div>
	);
}
