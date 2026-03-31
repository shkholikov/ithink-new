"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { ShieldCheck, MessageSquare, Handshake, Info } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";

const valueIcons = [ShieldCheck, MessageSquare, Handshake];

export default function AboutPage({ locale: _ }: { locale: string }) {
	const t = useTranslations("about");

	const stats = [
		{ value: t("hero.stat1"), label: t("hero.stat1Label") },
		{ value: t("hero.stat2"), label: t("hero.stat2Label") },
		{ value: t("hero.stat3"), label: t("hero.stat3Label") }
	];

	const values = [0, 1, 2].map((i) => ({
		title: t(`values.items.${i}.title`),
		description: t(`values.items.${i}.description`),
		Icon: valueIcons[i]
	}));

	return (
		<div className="pt-24 bg-background">
			<PageHero icon={Info} badge={t("hero.badge")} title={t("hero.title")} subtitle={t("hero.subtitle")} className="py-20 lg:py-28">
				<div className="grid grid-cols-3 gap-6 max-w-xl mx-auto mt-12">
					{stats.map((s, i) => (
						<div key={i} className="text-center sm:text-left">
							<div className="text-3xl sm:text-4xl font-bold gradient-text-blue">{s.value}</div>
							<div className="text-xs text-muted-foreground mt-1">{s.label}</div>
						</div>
					))}
				</div>
			</PageHero>

			{/* Story */}
			<section className="py-20 border-t border-border bg-secondary/20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-12 items-start">
						<m.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5 }}
						>
							<span className="inline-flex items-center px-3 py-1 rounded-full bg-[#f9b934]/10 border border-[#f9b934]/30 text-[#f9b934] dark:text-[#f9b934] text-xs font-medium mb-5">
								{t("story.badge")}
							</span>
							<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">{t("story.title")}</h2>
						</m.div>
						<m.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="space-y-5"
						>
							<p className="text-muted-foreground leading-relaxed">{t("story.p1")}</p>
							<p className="text-muted-foreground leading-relaxed">{t("story.p2")}</p>
						</m.div>
					</div>
				</div>
			</section>

			{/* Values */}
			<section className="py-20 border-t border-border bg-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<m.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<span className="inline-flex items-center px-3 py-1 rounded-full bg-[#377dff]/10 border border-[#377dff]/20 text-[#377dff] text-xs font-medium mb-4">
							{t("values.badge")}
						</span>
						<h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t("values.title")}</h2>
					</m.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
						{values.map((v, i) => (
							<m.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.4, delay: i * 0.1 }}
								className="bg-card border border-border rounded-2xl p-6 hover:border-[#377dff]/30 transition-all"
							>
								<div className="w-10 h-10 rounded-xl bg-[#377dff]/10 flex items-center justify-center mb-4">
									<v.Icon className="w-5 h-5 text-[#377dff]" />
								</div>
								<h3 className="text-sm font-semibold text-foreground mb-2">{v.title}</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">{v.description}</p>
							</m.div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
