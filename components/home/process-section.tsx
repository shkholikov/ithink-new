import { getTranslations } from "next-intl/server";
import { ClipboardList, Headset, MessagesSquare, Rocket } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { Stepper } from "@/components/site/stepper";

const ICONS = [MessagesSquare, ClipboardList, Rocket, Headset];

export async function ProcessSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home.process" });
	const how = await getTranslations({ locale, namespace: "howItWorks" });
	const steps = ICONS.map((icon, i) => ({ icon, title: how(`items.${i}.title`), description: how(`items.${i}.description`) }));
	return (
		<Section>
			<SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
			<Stepper steps={steps} />
		</Section>
	);
}
