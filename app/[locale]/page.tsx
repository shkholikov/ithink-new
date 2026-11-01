import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { HomeHero } from "@/components/home/hero";
import { ClientMarquee } from "@/components/home/client-marquee";
import { ServicesBento } from "@/components/home/services-bento";
import { StatsBand } from "@/components/home/stats-band";
import { ProcessSection } from "@/components/home/process-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { PartnersSection } from "@/components/home/partners-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/site/cta-section";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

// Only the three locales are valid here. A path the proxy skips (anything with
// a dot, e.g. `/foo.txt`) would otherwise reach the locale layout, which is the
// root layout and has no not-found page above it. Returning 404 at routing time
// sends it to app/global-not-found.tsx instead.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "home.meta" });
	return pageMetadata({ locale, path: "", title: t("title"), description: t("description"), absoluteTitle: true });
}

export default async function HomePage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	return (
		<>
			<HomeHero locale={locale} />
			<ClientMarquee locale={locale} />
			<ServicesBento locale={locale} />
			<StatsBand locale={locale} />
			<ProcessSection locale={locale} />
			<TestimonialsSection locale={locale} />
			<PartnersSection locale={locale} />
			<FaqSection locale={locale} />
			<CtaSection locale={locale} pageTag="home" />
		</>
	);
}
