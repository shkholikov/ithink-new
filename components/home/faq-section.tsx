import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/components/site/section";
import { FaqList } from "@/components/site/faq-list";

const FAQ_COUNT = 8;

/** Site-wide FAQ; the list is `FaqList` (native <details> on glass). */
export async function FaqSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home.faq" });
	const faq = await getTranslations({ locale, namespace: "faq" });
	const items = Array.from({ length: FAQ_COUNT }, (_, i) => ({ q: faq(`items.${i}.q`), a: faq(`items.${i}.a`) }));

	return (
		<Section tone="muted">
			<div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
				<SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} className="lg:sticky lg:top-28 lg:self-start" />
				<FaqList items={items} />
			</div>
		</Section>
	);
}
