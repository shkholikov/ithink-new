"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { m } from "framer-motion";

interface HeroProps {
	locale: string;
}

export default function Hero({ locale }: HeroProps) {
	const t = useTranslations("hero");

	const stats = [
		{ value: t("stat1"), label: t("stat1Label") },
		{ value: t("stat2"), label: t("stat2Label") },
		{ value: t("stat3"), label: t("stat3Label") }
	];

	return (
		<section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 bg-background">
			{/* Gradient blobs — more visible in dark, subtle in light */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#377dff]/8 dark:bg-[#377dff]/15 rounded-full blur-[120px] animate-blob" />
				<div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
				<div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
			</div>

			{/* Grid overlay */}
			<div
				className="absolute inset-0 dark:opacity-[0.03] opacity-[0.04]"
				style={{
					backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
					backgroundSize: "60px 60px"
				}}
			/>

			<div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				{/* Badge */}
				<m.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#377dff]/10 border border-[#377dff]/20 text-[#377dff] text-xs font-medium mb-8"
				>
					<Sparkles className="w-3 h-3" />
					{t("badge")}
				</m.div>

				{/* Headline */}
				<m.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
				>
					<span className="text-foreground">{t("title1")}</span>
					<br />
					<span className="gradient-text">{t("title2")}</span>
					<br />
					<span className="text-foreground">{t("title3")}</span>
				</m.h1>

				{/* Subtitle */}
				<m.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
				>
					{t("subtitle")}
				</m.p>

				{/* CTAs */}
				<m.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="flex flex-col sm:flex-row items-center justify-center gap-3"
				>
					{/* Primary — shimmer + pulsing ring */}
					<div className="relative group">
						<span className="absolute inset-0 rounded-xl border-2 border-[#377dff]/50 scale-100 opacity-100 group-hover:scale-[1.12] group-hover:opacity-0 transition-all duration-500 pointer-events-none" />
						<Link
							href={`/${locale}/hire-us`}
							className="relative inline-flex items-center gap-2 px-7 py-3.5 bg-[#377dff] hover:bg-[#2563eb] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[#377dff]/30 hover:shadow-xl hover:shadow-[#377dff]/40 hover:scale-[1.03] overflow-hidden"
						>
							<span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500" />
							<span className="relative z-10">{t("cta1")}</span>
							<ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
						</Link>
					</div>

					{/* Secondary — hover color shift + chevron */}
					<Link
						href="#services"
						className="group inline-flex items-center gap-2 px-6 py-3.5 bg-secondary/50 hover:bg-accent text-foreground hover:text-[#377dff] text-sm font-medium rounded-xl border border-border hover:border-[#377dff]/40 transition-all duration-200"
					>
						{t("cta2")}
						<ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
					</Link>
				</m.div>

				{/* Trust note */}
				<m.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.45 }}
					className="text-[11px] text-muted-foreground/50 mt-3"
				>
					{t("trustNote")}
				</m.p>

				{/* Stats */}
				<m.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12"
				>
					{stats.map((stat, i) => (
						<div key={i} className="text-center">
							<div className="text-3xl sm:text-4xl font-bold gradient-text-blue">{stat.value}</div>
							<div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
						</div>
					))}
				</m.div>
			</div>

			{/* Scroll indicator */}
			<m.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
			>
				<div className="w-px h-8 bg-gradient-to-b from-border to-transparent" />
			</m.div>
		</section>
	);
}
