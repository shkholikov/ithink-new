import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { Cta } from "@/components/site/cta";
import { CrmBeam } from "@/components/home/crm-beam";

export async function CrmSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home.crm" });
	return (
		<Section tone="muted">
			<div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
				<div>
					<SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} className="mb-8 sm:mb-10" />
					<ul className="reveal space-y-3">
						{["point1", "point2", "point3"].map((k) => (
							<li key={k} className="flex items-start gap-3 text-foreground">
								<span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10">
									<Check className="size-3.5 text-brand-text" aria-hidden="true" />
								</span>
								{t(k)}
							</li>
						))}
					</ul>
					<div className="reveal mt-10">
						<Cta href={`/${locale}/services/crm-automation`} variant="prominent" arrow>
							{t("cta")}
						</Cta>
					</div>
				</div>
				<div className="reveal">
					<CrmBeam labels={{ website: t("website"), phone: t("phone"), hub: t("hub"), team: t("team") }} />
				</div>
			</div>
		</Section>
	);
}
