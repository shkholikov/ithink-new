"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PartnersPage({ locale }: { locale: string }) {
	const t = useTranslations("partners");
	const ct = useTranslations("contact");

	const partners = [0, 1, 2, 3, 4].map((i) => ({
		name: t(`items.${i}.name`),
		description: t(`items.${i}.description`)
	}));

	const accents = [
		{ icon: "bg-blue-500/10 border-blue-500/20 text-blue-500" },
		{ icon: "bg-orange-500/10 border-orange-500/20 text-orange-500" },
		{ icon: "bg-green-500/10 border-green-500/20 text-green-500" },
		{ icon: "bg-teal-500/10 border-teal-500/20 text-teal-500" },
		{ icon: "bg-purple-500/10 border-purple-500/20 text-purple-500" }
	];

	return (
		<div className="pt-24 bg-background">
			{/* Hero */}
			<section className="py-20 lg:py-24 relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#f9b934]/5 rounded-full blur-[120px]" />
				</div>
				<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<span className="inline-flex items-center px-3 py-1 rounded-full bg-[#f9b934]/10 border border-[#f9b934]/30 text-[#f9b934] dark:text-[#f9b934] text-xs font-medium mb-6">
							{t("badge")}
						</span>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">{t("title")}</h1>
						<p className="text-base text-muted-foreground max-w-2xl">{t("subtitle")}</p>
					</m.div>
				</div>
			</section>

			<section className="pb-24 border-t border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
						{partners.map((p, i) => (
							<m.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.4, delay: i * 0.08 }}
								className="bg-card border border-border hover:border-[#377dff]/25 rounded-2xl p-7 transition-all duration-300"
							>
								<div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 ${accents[i].icon}`}>
									<span className="text-lg font-black">{p.name.slice(0, 2).toUpperCase()}</span>
								</div>

								<div className="flex items-center gap-2 mb-3">
									<h3 className="text-base font-semibold text-foreground">{p.name}</h3>
									<span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
										<CheckCircle2 className="w-2.5 h-2.5 text-[#377dff]" />
										{t("officialPartner")}
									</span>
								</div>

								<p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
							</m.div>
						))}
					</div>

					{/* CTA */}
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="mt-14 text-center p-10 bg-[#377dff]/5 border border-[#377dff]/20 rounded-3xl"
					>
						<h3 className="text-2xl font-bold text-foreground mb-3">{ct("hero.title")}</h3>
						<p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">{ct("hero.subtitle")}</p>
						<Link
							href={`/${locale}/contact`}
							className="inline-flex items-center gap-2 px-6 py-3 bg-[#377dff] hover:bg-[#2563eb] text-white text-sm font-medium rounded-xl transition-colors"
						>
							{ct("hero.badge")}
							<ArrowRight className="w-4 h-4" />
						</Link>
					</m.div>
				</div>
			</section>
		</div>
	);
}
