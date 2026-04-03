"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import {
	Server,
	MonitorCheck,
	TrendingUp,
	Workflow,
	Code2,
	ClipboardList,
	HardDrive,
	Wifi,
	Monitor,
	Cloud,
	Lock,
	Activity,
	Headphones,
	Wrench,
	Shield,
	Package,
	BarChart2,
	GitBranch,
	Phone,
	MessageCircle,
	Zap,
	Users2,
	Map,
	Bot,
	Cpu,
	LayoutGrid,
	Globe,
	Layers,
	Send,
	Link2,
	ShoppingCart,
	ShieldAlert,
	AlertTriangle,
	ListChecks,
	ArrowRight,
	CheckCircle,
	MessageSquare,
	Hammer,
	FileSearch,
	type LucideIcon
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

export type ServiceSlug = "it-infrastructure" | "managed-it" | "crm-automation" | "process-automation" | "software-development" | "it-audit";

interface ServiceConfig {
	heroIcon: LucideIcon;
	featureIcons: LucideIcon[];
	processIcons: LucideIcon[];
}

const serviceConfigs: Record<ServiceSlug, ServiceConfig> = {
	"it-infrastructure": {
		heroIcon: Server,
		featureIcons: [HardDrive, Wifi, Monitor, Cloud, Lock, Server],
		processIcons: [MessageSquare, FileSearch, Hammer, Activity]
	},
	"managed-it": {
		heroIcon: MonitorCheck,
		featureIcons: [Activity, Headphones, Wrench, Shield, Package, BarChart2],
		processIcons: [MessageSquare, Monitor, Wrench, Headphones]
	},
	"crm-automation": {
		heroIcon: TrendingUp,
		featureIcons: [TrendingUp, GitBranch, Phone, MessageCircle, Zap, Users2],
		processIcons: [Users2, GitBranch, Zap, BarChart2]
	},
	"process-automation": {
		heroIcon: Workflow,
		featureIcons: [Map, Bot, Cpu, Cpu, LayoutGrid, BarChart2],
		processIcons: [Map, Bot, Workflow, BarChart2]
	},
	"software-development": {
		heroIcon: Code2,
		featureIcons: [Globe, Layers, Send, LayoutGrid, Link2, ShoppingCart],
		processIcons: [MessageSquare, Layers, Code2, Globe]
	},
	"it-audit": {
		heroIcon: ClipboardList,
		featureIcons: [Server, ShieldAlert, Workflow, Package, AlertTriangle, ListChecks],
		processIcons: [ClipboardList, ShieldAlert, ListChecks, Shield]
	}
};

interface ServicePageProps {
	locale: string;
	slug: ServiceSlug;
}

export default function ServicePage({ locale, slug }: ServicePageProps) {
	const t = useTranslations("servicePages");
	const config = serviceConfigs[slug];

	const features = [0, 1, 2, 3, 4, 5].map((i) => ({
		title: t(`${slug}.features.items.${i}.title`),
		description: t(`${slug}.features.items.${i}.description`),
		Icon: config.featureIcons[i]
	}));

	const processItems = [0, 1, 2, 3].map((i) => ({
		step: t(`${slug}.process.items.${i}.step`),
		title: t(`${slug}.process.items.${i}.title`),
		description: t(`${slug}.process.items.${i}.description`),
		Icon: config.processIcons[i]
	}));

	const outcomes = [0, 1, 2].map((i) => ({
		title: t(`${slug}.outcomes.items.${i}.title`),
		description: t(`${slug}.outcomes.items.${i}.description`)
	}));

	return (
		<div className="pt-24 bg-background">
			{/* Hero */}
			<PageHero icon={config.heroIcon} badge={t(`${slug}.hero.badge`)} title={t(`${slug}.hero.title`)} subtitle={t(`${slug}.hero.subtitle`)}>
				<div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
					<Link
						href={`/${locale}/contact`}
						className="inline-flex items-center gap-2 px-6 py-3 bg-[#377dff] hover:bg-[#2563eb] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-[#377dff]/30 hover:shadow-lg hover:shadow-[#377dff]/40 hover:scale-[1.02]"
					>
						{t(`${slug}.cta.title`)}
						<ArrowRight className="w-4 h-4" />
					</Link>
					<Link
						href={`/${locale}/#services`}
						className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border hover:border-[#377dff]/40 hover:bg-accent text-foreground text-sm font-medium rounded-xl transition-all duration-200"
					>
						{t("common.allServices")}
					</Link>
				</div>
			</PageHero>

			{/* Features */}
			<section className="py-20 border-t border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeader icon={LayoutGrid} badge={t(`${slug}.features.badge`)} title={t(`${slug}.features.title`)} />

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
						{features.map((feature, i) => (
							<m.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.4, delay: i * 0.07 }}
								className="group bg-card border border-border hover:border-[#377dff]/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#377dff]/5 relative overflow-hidden"
							>
								<div className="absolute inset-0 bg-gradient-to-br from-[#377dff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
								<div className="relative z-10">
									<div className="w-11 h-11 rounded-xl bg-[#377dff]/10 border border-[#377dff]/20 flex items-center justify-center mb-4 group-hover:bg-[#377dff]/20 group-hover:border-[#377dff]/40 transition-all duration-300">
										<feature.Icon className="w-5 h-5 text-[#377dff]" />
									</div>
									<h3 className="text-sm font-semibold text-foreground mb-2">{feature.title}</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
								</div>
							</m.div>
						))}
					</div>
				</div>
			</section>

			{/* Process */}
			<section className="py-24 border-y border-border bg-secondary/20 relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#377dff]/4 rounded-full blur-[120px]" />
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeader
						icon={Workflow}
						badge={t(`${slug}.process.badge`)}
						title={t(`${slug}.process.title`)}
						badgeVariant="yellow"
						className="mb-16"
					/>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
						{/* Connector line — desktop only */}
						<div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

						{processItems.map((item, i) => (
							<m.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.45, delay: i * 0.1 }}
								className="relative flex flex-col items-center text-center"
							>
								<m.div
									whileHover={{ scale: 1.08 }}
									transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
									className="relative w-20 h-20 rounded-2xl bg-card border border-border hover:border-[#377dff]/40 flex items-center justify-center mb-5 shadow-sm hover:shadow-[#377dff]/10 hover:shadow-lg transition-all duration-300 z-10"
								>
									<item.Icon className="w-7 h-7 text-[#377dff]" />
									<span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#377dff] text-white text-[10px] font-bold flex items-center justify-center">
										{item.step}
									</span>
								</m.div>
								<h3 className="text-sm font-semibold text-foreground mb-2">{item.title}</h3>
								<p className="text-xs text-muted-foreground leading-relaxed max-w-[180px]">{item.description}</p>
							</m.div>
						))}
					</div>
				</div>
			</section>

			{/* Outcomes */}
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeader icon={TrendingUp} badge={t(`${slug}.outcomes.badge`)} title={t(`${slug}.outcomes.title`)} />

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
						{outcomes.map((outcome, i) => (
							<m.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.4, delay: i * 0.1 }}
								className={cn(
									"relative rounded-2xl p-7 overflow-hidden border",
									i === 1 ? "bg-[#377dff] border-[#377dff] text-white shadow-xl shadow-[#377dff]/30" : "bg-card border-border"
								)}
							>
								<div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-5", i === 1 ? "bg-white/20" : "bg-[#377dff]/10")}>
									<CheckCircle className={cn("w-5 h-5", i === 1 ? "text-white" : "text-[#377dff]")} />
								</div>
								<h3 className={cn("text-base font-semibold mb-2", i === 1 ? "text-white" : "text-foreground")}>{outcome.title}</h3>
								<p className={cn("text-sm leading-relaxed", i === 1 ? "text-white/80" : "text-muted-foreground")}>{outcome.description}</p>
							</m.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 border-t border-border">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
						<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t(`${slug}.cta.title`)}</h2>
						<p className="text-muted-foreground mb-8 text-base leading-relaxed">{t(`${slug}.cta.subtitle`)}</p>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
							<Link
								href={`/${locale}/contact`}
								className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#377dff] hover:bg-[#2563eb] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-[#377dff]/30 hover:shadow-lg hover:shadow-[#377dff]/40 hover:scale-[1.02]"
							>
								{t("common.getConsultation")}
								<ArrowRight className="w-4 h-4" />
							</Link>
							<Link
								href={`/${locale}/hire-us`}
								className="inline-flex items-center gap-2 px-7 py-3.5 bg-card border border-border hover:border-[#377dff]/40 hover:bg-accent text-foreground text-sm font-medium rounded-xl transition-all duration-200"
							>
								{t("common.hireTeam")}
							</Link>
						</div>
					</m.div>
				</div>
			</section>
		</div>
	);
}
