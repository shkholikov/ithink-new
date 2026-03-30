"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function WebsitesPage({ locale: _ }: { locale: string }) {
	const t = useTranslations("websites");

	const steps = [0, 1, 2, 3].map((i) => ({
		step: t(`process.steps.${i}.step`),
		title: t(`process.steps.${i}.title`),
		description: t(`process.steps.${i}.description`)
	}));

	const faqItems = [0, 1, 2, 3].map((i) => ({
		q: t(`faq.items.${i}.q`),
		a: t(`faq.items.${i}.a`)
	}));

	return (
		<div className="pt-24 bg-background">
			<section className="py-20 lg:py-24 relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#377dff]/8 rounded-full blur-[100px]" />
				</div>
				<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<span className="inline-flex items-center px-3 py-1 rounded-full bg-[#377dff]/10 border border-[#377dff]/20 text-[#377dff] text-xs font-medium mb-6">
							{t("hero.badge")}
						</span>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">{t("hero.title")}</h1>
						<p className="text-base text-muted-foreground max-w-xl">{t("hero.subtitle")}</p>
					</m.div>
				</div>
			</section>

			{/* Process */}
			<section className="py-20 border-t border-border bg-secondary/20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.5 }}
						className="mb-12"
					>
						<h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t("process.title")}</h2>
					</m.div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
						{steps.map((step, i) => (
							<m.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.4, delay: i * 0.1 }}
								className="relative bg-card border border-border rounded-2xl p-6"
							>
								{i < 3 && <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-[#377dff]/30 z-10" />}
								<span className="text-4xl font-black text-[#377dff]/20 block mb-3 leading-none">{step.step}</span>
								<h3 className="text-sm font-semibold text-foreground mb-2">{step.title}</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
							</m.div>
						))}
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="pb-24 border-t border-border bg-background">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.5 }}
						className="mb-8"
					>
						<h2 className="text-2xl font-bold text-foreground">{t("faq.title")}</h2>
					</m.div>
					<Accordion className="space-y-3">
						{faqItems.map((item, i) => (
							<AccordionItem key={i} className="bg-card border border-border rounded-xl px-5 data-open:border-[#377dff]/30">
								<AccordionTrigger className="text-sm text-foreground hover:no-underline py-4">{item.q}</AccordionTrigger>
								<AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">{item.a}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>
		</div>
	);
}
