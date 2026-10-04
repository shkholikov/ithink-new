"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { DollarSign, Users, Repeat, Briefcase } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { LeadForm } from "@/components/ui/lead-form";

const benefitIcons = [DollarSign, Users, Repeat];

export default function HireUsPage({ locale: _ }: { locale: string }) {
	const t = useTranslations("hireUs");

	const benefits = [0, 1, 2].map((i) => ({
		title: t(`benefits.${i}.title`),
		description: t(`benefits.${i}.description`),
		Icon: benefitIcons[i]
	}));

	return (
		<div className="pt-24 bg-background">
			<PageHero icon={Briefcase} badge={t("hero.badge")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

			<section className="pb-24 border-t border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
					<div className="grid lg:grid-cols-2 gap-12">
						{/* Benefits */}
						<m.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5 }}
							className="space-y-5"
						>
							{benefits.map((b, i) => (
								<div key={i} className="flex gap-4 bg-card border border-border rounded-2xl p-5">
									<div className="w-10 h-10 rounded-xl bg-[#377dff]/10 flex items-center justify-center flex-shrink-0">
										<b.Icon className="w-5 h-5 text-brand-text" />
									</div>
									<div>
										<h3 className="text-sm font-semibold text-foreground mb-1">{b.title}</h3>
										<p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
									</div>
								</div>
							))}
						</m.div>

						{/* Form */}
						<m.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5 }}
							className="bg-card border border-border rounded-2xl p-7"
						>
							<LeadForm showBudget pageTag="hire_us" messageRows={4} />
						</m.div>
					</div>
				</div>
			</section>
		</div>
	);
}
