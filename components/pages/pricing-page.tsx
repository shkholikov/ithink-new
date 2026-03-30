"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PricingPage({ locale }: { locale: string }) {
	const t = useTranslations("pricing");

	const plans = [0, 1, 2].map((i) => ({
		name: t(`plans.${i}.name`),
		price: t(`plans.${i}.price`),
		period: t(`plans.${i}.period`),
		description: t(`plans.${i}.description`),
		features: [0, 1, 2, 3, 4, 5]
			.map((j) => {
				try {
					return t(`plans.${i}.features.${j}`);
				} catch {
					return null;
				}
			})
			.filter(Boolean) as string[],
		popular: i === 2
	}));

	const faqItems = [0, 1, 2, 3].map((i) => ({
		q: t(`faq.items.${i}.q`),
		a: t(`faq.items.${i}.a`)
	}));

	return (
		<div className="pt-24 bg-background">
			{/* Hero */}
			<section className="py-20 lg:py-24 relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#377dff]/8 rounded-full blur-[120px]" />
				</div>
				<div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<span className="inline-flex items-center px-3 py-1 rounded-full bg-[#377dff]/10 border border-[#377dff]/20 text-[#377dff] text-xs font-medium mb-6">
							{t("hero.badge")}
						</span>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">{t("hero.title")}</h1>
						<p className="text-base text-muted-foreground">{t("hero.subtitle")}</p>
					</m.div>
				</div>
			</section>

			<section className="pb-24 border-t border-border">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
						{plans.map((plan, i) => (
							<m.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.4, delay: i * 0.1 }}
								className={`relative rounded-2xl p-7 flex flex-col ${
									plan.popular ? "bg-[#377dff] border border-[#377dff] shadow-lg shadow-[#377dff]/20" : "bg-card border border-border"
								}`}
							>
								{plan.popular && (
									<div className="absolute -top-3 left-1/2 -translate-x-1/2">
										<span className="inline-flex items-center gap-1 px-3 py-1 bg-[#f9b934] text-black text-xs font-bold rounded-full">
											<Zap className="w-3 h-3" />
											{t("popular")}
										</span>
									</div>
								)}

								<div className="mb-6">
									<h3 className={`text-base font-semibold mb-1 ${plan.popular ? "text-white" : "text-foreground"}`}>{plan.name}</h3>
									<p className={`text-xs mb-5 ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>{plan.description}</p>
									<div className="flex items-baseline gap-1">
										<span className={`text-4xl font-black ${plan.popular ? "text-white" : "text-foreground"}`}>{plan.price}</span>
										<span className={`text-xs ${plan.popular ? "text-white/60" : "text-muted-foreground"}`}>{plan.period}</span>
									</div>
								</div>

								<ul className="space-y-2.5 flex-1 mb-7">
									{plan.features.map((f, j) => (
										<li key={j} className="flex items-center gap-2 text-xs">
											<Check className={`w-3.5 h-3.5 flex-shrink-0 ${plan.popular ? "text-white" : "text-[#377dff]"}`} />
											<span className={plan.popular ? "text-white/80" : "text-muted-foreground"}>{f}</span>
										</li>
									))}
								</ul>

								<Link
									href={`/${locale}/hire-us`}
									className={`block text-center py-2.5 text-sm font-medium rounded-xl transition-colors ${
										plan.popular ? "bg-white text-[#377dff] hover:bg-white/90" : "bg-[#377dff] text-white hover:bg-[#2563eb]"
									}`}
								>
									{t("getStarted")}
								</Link>
							</m.div>
						))}
					</div>

					{/* FAQ */}
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="mt-20"
					>
						<h2 className="text-2xl font-bold text-foreground mb-8">{t("faq.title")}</h2>
						<Accordion className="space-y-3">
							{faqItems.map((item, i) => (
								<AccordionItem key={i} className="bg-card border border-border rounded-xl px-5 data-open:border-[#377dff]/30">
									<AccordionTrigger className="text-sm text-foreground hover:no-underline py-4">{item.q}</AccordionTrigger>
									<AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">{item.a}</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</m.div>
				</div>
			</section>
		</div>
	);
}
