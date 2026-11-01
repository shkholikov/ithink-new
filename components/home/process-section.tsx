import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/components/site/section";
import { ProcessTimeline } from "@/components/home/process-timeline";

export async function ProcessSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home.process" });
	const how = await getTranslations({ locale, namespace: "howItWorks" });
	const steps = [0, 1, 2, 3].map((i) => ({
		step: how(`items.${i}.step`),
		title: how(`items.${i}.title`),
		description: how(`items.${i}.description`)
	}));
	return (
		<Section>
			<SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} className="mb-0 sm:mb-0" />
			<ProcessTimeline steps={steps} />
		</Section>
	);
}
