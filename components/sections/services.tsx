import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Server, MonitorCheck, TrendingUp, Workflow, Code2, Search, Layers } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { SERVICE_SLUGS } from "@/components/pages/service-page";
import { FadeIn } from "@/components/ui/fade-in";

const serviceIcons = [Server, MonitorCheck, TrendingUp, Workflow, Code2, Search];

interface ServicesProps {
	locale: string;
}

export default async function Services({ locale }: ServicesProps) {
	const t = await getTranslations({ locale, namespace: "services" });

	const services = SERVICE_SLUGS.map((slug, i) => ({
		slug,
		title: t(`items.${i}.title`),
		description: t(`items.${i}.description`),
		tag: t(`items.${i}.tag`),
		Icon: serviceIcons[i]
	}));

	return (
		<section id="services" className="py-24 lg:py-32 bg-background relative">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<SectionHeader icon={Layers} badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

				{/* Service Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{services.map((service, i) => (
						<FadeIn
							key={service.slug}
							delay={i * 0.07}
							duration={0.4}
							className="group relative bg-card hover:bg-accent border border-border hover:border-[#377dff]/40 rounded-2xl transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#377dff] focus-within:border-[#377dff]/40"
						>
							{/* The whole card is the link — padding lives here so the entire
							    surface is clickable, not just the text block. */}
							<Link
								href={`/${locale}/services/${service.slug}`}
								className="block p-6 focus:outline-none"
								aria-label={`${service.title}: ${t("learnMore")}`}
							>
								{/* Hover glow */}
								<div className="absolute inset-0 bg-gradient-to-br from-[#377dff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

								<div className="relative z-10">
								{/* Icon */}
								<div className="w-12 h-12 rounded-xl bg-[#377dff]/10 border border-[#377dff]/20 flex items-center justify-center mb-5 group-hover:bg-[#377dff]/20 group-hover:border-[#377dff]/40 group-hover:shadow-lg group-hover:shadow-[#377dff]/20 transition-all duration-300">
									<service.Icon className="w-5 h-5 text-[#377dff]" />
								</div>

								{/* Title */}
								<h3 className="text-base font-semibold text-foreground mb-2">{service.title}</h3>

								{/* Description */}
								<p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>

									{/* Footer */}
									<div className="flex items-center justify-between">
										<span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full border border-border">
											{service.tag}
										</span>
										<span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-[#377dff] transition-colors">
											{t("learnMore")}
											<ArrowUpRight className="w-3 h-3" />
										</span>
									</div>
								</div>
							</Link>
						</FadeIn>
					))}
				</div>
			</div>
		</section>
	);
}
