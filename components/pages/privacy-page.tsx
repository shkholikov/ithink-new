import { getTranslations } from "next-intl/server";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";

/** Number of entries in `privacy.sections` — identical across the three locales. */
const SECTION_COUNT = 9;

export default async function PrivacyPage({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "privacy" });

	const sections = Array.from({ length: SECTION_COUNT }, (_, i) => ({
		title: t(`sections.${i}.title`),
		paragraphs: t(`sections.${i}.body`).split("\n\n")
	}));

	return (
		<div className="pt-24 bg-background">
			<PageHero icon={ShieldCheck} badge={t("hero.badge")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

			<section className="py-20 border-t border-border">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
					<p className="text-sm text-muted-foreground mb-10">{t("updated")}</p>
					<div className="space-y-10">
						{sections.map((section, i) => (
							<div key={i}>
								<h2 className="text-xl font-semibold text-foreground mb-3">
									{i + 1}. {section.title}
								</h2>
								<div className="space-y-3">
									{section.paragraphs.map((p, j) => (
										<p key={j} className="text-base text-muted-foreground leading-relaxed">
											{p}
										</p>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
