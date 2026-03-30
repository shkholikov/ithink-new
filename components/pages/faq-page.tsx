"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FaqPage({ locale }: { locale: string }) {
	const t = useTranslations("faq");
	const [query, setQuery] = useState("");

	const allItems = Array.from({ length: 8 }, (_, i) => ({
		q: t(`items.${i}.q`),
		a: t(`items.${i}.a`)
	}));

	const filtered = query.trim()
		? allItems.filter((item) => item.q.toLowerCase().includes(query.toLowerCase()) || item.a.toLowerCase().includes(query.toLowerCase()))
		: allItems;

	return (
		<div className="pt-24 bg-background">
			<section className="py-20 lg:py-24 relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#377dff]/8 rounded-full blur-[100px]" />
				</div>
				<div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<span className="inline-flex items-center px-3 py-1 rounded-full bg-[#377dff]/10 border border-[#377dff]/20 text-[#377dff] text-xs font-medium mb-6">
							{t("hero.badge")}
						</span>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">{t("hero.title")}</h1>
						<p className="text-base text-muted-foreground mb-8">{t("hero.subtitle")}</p>

						<div className="relative max-w-lg mx-auto">
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
							<input
								type="text"
								placeholder={t("searchPlaceholder")}
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#377dff]/50 transition-colors"
							/>
						</div>
					</m.div>
				</div>
			</section>

			<section className="pb-24 border-t border-border">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
					<Accordion className="space-y-3">
						{filtered.map((item, i) => (
							<m.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
								<AccordionItem className="bg-card border border-border rounded-xl px-5 data-open:border-[#377dff]/30">
									<AccordionTrigger className="text-sm text-foreground hover:no-underline py-4 text-left">{item.q}</AccordionTrigger>
									<AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">{item.a}</AccordionContent>
								</AccordionItem>
							</m.div>
						))}
					</Accordion>

					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.5 }}
						className="mt-14 text-center p-8 bg-[#377dff]/5 border border-[#377dff]/20 rounded-2xl"
					>
						<h3 className="text-lg font-bold text-foreground mb-2">{t("stillQuestions")}</h3>
						<Link
							href={`/${locale}/contact`}
							className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-[#377dff] hover:text-[#2563eb] transition-colors"
						>
							{t("contactUs")}
							<ArrowRight className="w-4 h-4" />
						</Link>
					</m.div>
				</div>
			</section>
		</div>
	);
}
