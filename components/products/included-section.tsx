import type { LucideIcon } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { GridPattern } from "@/components/ui/grid-pattern";
import { FeatureGrid } from "@/components/site/feature-grid";
import { Section, SectionHeading } from "@/components/site/section";
import { cn } from "@/lib/utils";

type Item = { title: string; description: string; icon: LucideIcon; href?: string };

// Four linked cards: 2+1 then 1+2 on desktop, 2, 1+1, 2 on tablets. No empty cells at either size.
const SPANS = ["sm:col-span-2 lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "sm:col-span-2 lg:col-span-2"];

/**
 * "What's included". Licence and training pages list features in a FeatureGrid; solution pages
 * bundle existing services, so each card is a bento card linking to that service's page.
 */
export function IncludedSection({ eyebrow, title, subtitle, items, more }: { eyebrow: string; title: string; subtitle: string; items: Item[]; more: string }) {
	const linked = items.every((i) => i.href);
	return (
		<Section>
			<SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
			{linked ? (
				<BentoGrid className="auto-rows-[18rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
					{items.map((item, i) => (
						<BentoCard
							key={item.title}
							name={item.title}
							description={item.description}
							Icon={item.icon}
							href={item.href!}
							cta={more}
							className={cn("reveal col-span-1", SPANS[i % SPANS.length])}
							background={
								<div aria-hidden="true" className="absolute inset-0">
									<GridPattern
										width={32}
										height={32}
										className="fill-brand/5 stroke-brand/10 [mask-image:radial-gradient(260px_circle_at_top_right,white,transparent)]"
									/>
									<div className="absolute -right-16 -top-16 size-48 rounded-full bg-brand/10 blur-3xl transition-transform duration-500 group-hover:scale-125" />
								</div>
							}
						/>
					))}
				</BentoGrid>
			) : (
				<FeatureGrid items={items} />
			)}
		</Section>
	);
}
