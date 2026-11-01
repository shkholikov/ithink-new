import { Section, SectionHeading } from "@/components/site/section";
import { Stepper } from "@/components/site/stepper";

/** "How it works": the shared stepper, the same block as the homepage process. */
export function StepsSection({ eyebrow, title, steps }: { eyebrow: string; title: string; steps: { title: string; description: string }[] }) {
	return (
		<Section tone="muted">
			<SectionHeading eyebrow={eyebrow} title={title} />
			<Stepper steps={steps} />
		</Section>
	);
}
