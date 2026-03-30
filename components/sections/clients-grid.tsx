"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ClientsGridProps {
	locale: string;
}

export default function ClientsGrid({ locale }: ClientsGridProps) {
	const t = useTranslations("clients");
	const ct = useTranslations("customers");

	const clients = Array.from({ length: 11 }, (_, i) => ({
		name: ct(`items.${i}.name`),
		industry: ct(`items.${i}.industry`),
		description: ct(`items.${i}.description`)
	}));

	const allLabel = "All";
	const allIndustries = [allLabel, ...Array.from(new Set(clients.map((c) => c.industry)))];
	const [activeTab, setActiveTab] = useState(allLabel);

	const filtered = activeTab === allLabel ? clients : clients.filter((c) => c.industry === activeTab);

	return (
		<section className="py-24 lg:py-32 border-t border-border bg-secondary/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<m.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{ duration: 0.5 }}
					className="mb-10"
				>
					<span className="inline-flex items-center px-3 py-1 rounded-full bg-[#377dff]/10 border border-[#377dff]/20 text-[#377dff] text-xs font-medium mb-4">
						{t("badge")}
					</span>
					<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">{t("title")}</h2>
						<p className="text-muted-foreground max-w-md text-sm">{t("subtitle")}</p>
					</div>
				</m.div>

				{/* Industry Tabs */}
				<m.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{ duration: 0.4, delay: 0.1 }}
					className="flex flex-wrap gap-2 mb-8"
				>
					{allIndustries.map((industry) => (
						<button
							key={industry}
							onClick={() => setActiveTab(industry)}
							className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
								activeTab === industry
									? "bg-[#377dff] text-white"
									: "bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border"
							}`}
						>
							{industry}
						</button>
					))}
				</m.div>

				{/* Clients Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
					{filtered.map((client, i) => (
						<m.div
							key={client.name}
							initial={{ opacity: 0, scale: 0.97 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: i * 0.05 }}
							className="group bg-card hover:bg-accent border border-border hover:border-[#377dff]/20 rounded-xl p-4 transition-all duration-300"
						>
							<div className="w-10 h-10 rounded-xl bg-[#377dff]/10 flex items-center justify-center mb-3 group-hover:bg-[#377dff]/20 transition-colors">
								<span className="text-sm font-bold text-[#377dff]">{client.name.slice(0, 2).toUpperCase()}</span>
							</div>
							<h3 className="text-sm font-semibold text-foreground mb-1">{client.name}</h3>
							<span className="inline-block text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full mb-2">{client.industry}</span>
							<p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{client.description}</p>
						</m.div>
					))}
				</div>

				{/* CTA */}
				<m.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{ duration: 0.4, delay: 0.2 }}
					className="mt-8 text-center"
				>
					<Link
						href={`/${locale}/customers`}
						className="inline-flex items-center gap-2 text-sm text-[#377dff] hover:text-[#2563eb] transition-colors"
					>
						{t("viewAll")}
						<ArrowRight className="w-4 h-4" />
					</Link>
				</m.div>
			</div>
		</section>
	);
}
