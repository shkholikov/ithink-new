import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, MapPin } from "lucide-react";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Section, SectionHeading } from "@/components/site/section";
import { PARTNER_SLUGS } from "@/lib/site-nav";

export async function PartnersSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home.partners" });
	const p = await getTranslations({ locale, namespace: "partners" });
	const partners = PARTNER_SLUGS.map((slug, i) => ({ slug, name: p(`items.${i}.name`), description: p(`items.${i}.description`) }));
	const inner = partners.slice(0, 3);
	const outer = partners.slice(3);

	return (
		<Section>
			<div className="grid items-center gap-14 lg:grid-cols-2">
				<div>
					<SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} className="mb-10 sm:mb-10" />
					<ul className="reveal grid grid-cols-1 gap-3 sm:grid-cols-2">
						{partners.map((partner) => (
							<li key={partner.slug}>
								<Link
									href={`/${locale}/partners/${partner.slug}`}
									className="group flex h-full flex-col rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand/40"
								>
									<span className="flex items-center justify-between text-sm font-semibold text-foreground">
										{partner.name}
										<ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-text" aria-hidden="true" />
									</span>
									<span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{partner.description}</span>
								</Link>
							</li>
						))}
					</ul>
					<div className="reveal mt-8">
						<p className="text-sm font-semibold text-foreground">{t("marketsTitle")}</p>
						<ul className="mt-3 flex flex-wrap gap-2">
							{["market1", "market2", "market3", "market4"].map((m) => (
								<li key={m} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-sm text-foreground">
									<MapPin className="size-3.5 text-brand-text" aria-hidden="true" />
									{t(m)}
								</li>
							))}
						</ul>
					</div>
				</div>

				<div aria-hidden="true" className="relative mx-auto hidden h-[480px] w-full max-w-[480px] items-center justify-center overflow-hidden sm:flex">
					<div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(55,125,255,0.12),transparent)]" />
					<div className="relative z-10 flex size-28 items-center justify-center rounded-3xl bg-ink shadow-[0_20px_60px_-15px_rgba(37,99,235,0.6)]">
						<Image src="/logo-negative.png" alt="" width={1372} height={440} sizes="80px" className="h-6 w-auto" />
					</div>
					<OrbitingCircles radius={120} iconSize={44} duration={30}>
						{inner.map((partner) => (
							<Chip key={partner.slug} name={partner.name} />
						))}
					</OrbitingCircles>
					<OrbitingCircles radius={205} iconSize={44} duration={40} reverse>
						{outer.map((partner) => (
							<Chip key={partner.slug} name={partner.name} />
						))}
					</OrbitingCircles>
				</div>
			</div>
		</Section>
	);
}

function Chip({ name }: { name: string }) {
	return (
		<span className="whitespace-nowrap rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground shadow-[0_8px_20px_-10px_rgba(10,16,36,0.3)]">
			{name}
		</span>
	);
}
