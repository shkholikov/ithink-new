import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Code, Headphones, Network, Funnel, Rocket, Users, CalendarClock } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { Cta, CtaRow } from "@/components/site/cta";
import { FeatureGrid } from "@/components/site/feature-grid";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { GridPattern } from "@/components/ui/grid-pattern";
import { CtaSection } from "@/components/site/cta-section";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "hireUsPage.meta" });
	return pageMetadata({ locale, path: "/hire-us", title: t("title"), description: t("description") });
}

export default async function HireUsRoute({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "hireUsPage" });
	const hire = await getTranslations({ locale, namespace: "hireUs" });
	const nav = await getTranslations({ locale, namespace: "nav" });
	const svc = await getTranslations({ locale, namespace: "home.services" });

	const benefits = [Rocket, Users, CalendarClock].map((icon, i) => ({
		icon,
		title: hire(`benefits.${i}.title`),
		description: hire(`benefits.${i}.description`)
	}));
	const roles = [
		{ key: "dev", icon: Code, href: `/${locale}/services/software-development`, span: "lg:col-span-2" },
		{ key: "network", icon: Network, href: `/${locale}/services/it-infrastructure`, span: "lg:col-span-1" },
		{ key: "crm", icon: Funnel, href: `/${locale}/services/crm-automation`, span: "lg:col-span-1" },
		{ key: "support", icon: Headphones, href: `/${locale}/services/managed-it`, span: "lg:col-span-2" }
	];

	return (
		<>
			<PageHero
				eyebrow={t("hero.eyebrow")}
				title={hire("hero.title")}
				subtitle={hire("hero.subtitle")}
				crumbs={[
					{ href: `/${locale}`, label: nav("home") },
					{ href: `/${locale}/hire-us`, label: nav("hireUs") }
				]}
				actions={
					<CtaRow>
						<Cta href="#lead-form" arrow>
							{t("hero.cta")}
						</Cta>
						<Cta href={`/${locale}/contact`} variant="soft">
							{nav("contactUs")}
						</Cta>
					</CtaRow>
				}
			/>

			<Section>
				<SectionHeading eyebrow={t("benefits.eyebrow")} title={t("benefits.title")} />
				<FeatureGrid items={benefits} />
			</Section>

			<Section tone="muted">
				<SectionHeading eyebrow={t("roles.eyebrow")} title={t("roles.title")} subtitle={t("roles.subtitle")} />
				<BentoGrid className="auto-rows-[15rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
					{roles.map((r) => (
						<BentoCard
							key={r.key}
							name={t(`roles.${r.key}`)}
							description={t(`roles.${r.key}Note`)}
							Icon={r.icon}
							href={r.href}
							cta={svc("more")}
							className={`reveal col-span-1 ${r.span}`}
							background={
								<div aria-hidden="true" className="absolute inset-0">
									<GridPattern width={32} height={32} className="fill-brand/5 stroke-brand/10 [mask-image:radial-gradient(240px_circle_at_top_right,white,transparent)]" />
								</div>
							}
						/>
					))}
				</BentoGrid>
			</Section>

			<CtaSection locale={locale} pageTag="hire_us" title={t("cta.title")} subtitle={t("cta.subtitle")} />
		</>
	);
}
