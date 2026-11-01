import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/components/site/section";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export async function TestimonialsSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home.testimonials" });
	const items = await getTranslations({ locale, namespace: "testimonials" });
	const testimonials = [0, 1, 2].map((i) => ({
		quote: items(`items.${i}.quote`),
		name: items(`items.${i}.name`),
		designation: `${items(`items.${i}.role`)}, ${items(`items.${i}.company`)}`,
		company: items(`items.${i}.company`)
	}));
	return (
		<Section tone="muted" className="overflow-x-clip">
			<SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
			<div className="reveal">
				<AnimatedTestimonials testimonials={testimonials} prevLabel={t("prev")} nextLabel={t("next")} />
			</div>
		</Section>
	);
}
