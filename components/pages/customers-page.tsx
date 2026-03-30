"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";

export default function CustomersPage({ locale: _ }: { locale: string }) {
	const t = useTranslations("customers");

	const clients = Array.from({ length: 11 }, (_, i) => ({
		name: t(`items.${i}.name`),
		industry: t(`items.${i}.industry`),
		description: t(`items.${i}.description`),
		services: [0, 1, 2]
			.map((j) => {
				try {
					return t(`items.${i}.services.${j}`);
				} catch {
					return null;
				}
			})
			.filter(Boolean) as string[]
	}));

	const allLabel = "All";
	const allIndustries = [allLabel, ...Array.from(new Set(clients.map((c) => c.industry)))];
	const [active, setActive] = useState(allLabel);

	const filtered = active === allLabel ? clients : clients.filter((c) => c.industry === active);

	return (
		<div className="pt-24 bg-background">
			{/* Hero */}
			<section className="py-20 lg:py-24 relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#377dff]/8 rounded-full blur-[120px]" />
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

			<section className="pb-24 border-t border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
					{/* Filter */}
					<div className="flex flex-wrap gap-2 mb-10">
						{allIndustries.map((ind) => (
							<button
								key={ind}
								onClick={() => setActive(ind)}
								className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
									active === ind
										? "bg-[#377dff] text-white"
										: "bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border"
								}`}
							>
								{ind}
							</button>
						))}
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{filtered.map((client, i) => (
							<m.div
								key={client.name}
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3, delay: i * 0.05 }}
								className="group bg-card border border-border hover:border-[#377dff]/25 rounded-2xl p-6 transition-all duration-300"
							>
								<div className="w-12 h-12 rounded-xl bg-[#377dff]/10 flex items-center justify-center mb-4">
									<span className="text-base font-bold text-[#377dff]">{client.name.slice(0, 2).toUpperCase()}</span>
								</div>

								<div className="flex items-start justify-between mb-3">
									<h3 className="text-sm font-semibold text-foreground">{client.name}</h3>
									<span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full ml-2 whitespace-nowrap flex-shrink-0">
										{client.industry}
									</span>
								</div>

								<p className="text-xs text-muted-foreground leading-relaxed mb-4">{client.description}</p>

								<div className="flex flex-wrap gap-1.5">
									{client.services.map((s) => (
										<span key={s} className="text-[10px] text-[#377dff] bg-[#377dff]/10 px-2 py-0.5 rounded-full">
											{s}
										</span>
									))}
								</div>
							</m.div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
