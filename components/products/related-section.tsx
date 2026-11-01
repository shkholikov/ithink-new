import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { PRODUCT_GROUPS, type ProductGroup } from "@/components/products/config";
import { SERVICE_ICONS } from "@/lib/icons";
import type { ServiceSlug } from "@/lib/services";
import { cn } from "@/lib/utils";

/** The other two pages of the group, then one or two service pages. Titles and lines come from the menu copy. */
export async function RelatedSection({
	locale,
	group,
	slug,
	services,
	eyebrow,
	title
}: {
	locale: string;
	group: ProductGroup;
	slug: string;
	services: ServiceSlug[];
	eyebrow: string;
	title: string;
}) {
	const nav = await getTranslations({ locale, namespace: "nav.items" });
	const { slugs, icons } = PRODUCT_GROUPS[group];
	const links: { href: string; title: string; description: string; icon: LucideIcon }[] = [
		...slugs
			.filter((s) => s !== slug)
			.map((s) => ({ href: `/${locale}/${group}/${s}`, title: nav(`${group}.${s}.title`), description: nav(`${group}.${s}.description`), icon: icons[s] })),
		...services.map((s) => ({
			href: `/${locale}/services/${s}`,
			title: nav(`services.${s}.title`),
			description: nav(`services.${s}.description`),
			icon: SERVICE_ICONS[s]
		}))
	];

	return (
		<Section id="related">
			<SectionHeading eyebrow={eyebrow} title={title} />
			<ul className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", links.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
				{links.map((l) => (
					<li key={l.href} className="reveal">
						<Link
							href={l.href}
							className="group flex h-full flex-col gap-5 rounded-3xl border border-border bg-card p-6 transition-colors hover:border-brand/40"
						>
							<span className="flex items-center justify-between">
								<span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand-text">
									<l.icon className="size-5" aria-hidden="true" />
								</span>
								<ArrowUpRight
									className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-text"
									aria-hidden="true"
								/>
							</span>
							<span>
								<span className="block text-base font-semibold tracking-tight text-foreground">{l.title}</span>
								<span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">{l.description}</span>
							</span>
						</Link>
					</li>
				))}
			</ul>
		</Section>
	);
}
