"use client";

import { m } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import { cn } from "@/lib/utils";

interface PageHeroProps {
	icon: LucideIcon;
	badge: string;
	badgeVariant?: "blue" | "yellow";
	title: string;
	subtitle?: string;
	children?: React.ReactNode;
	className?: string;
}

export function PageHero({ icon, badge, badgeVariant = "blue", title, subtitle, children, className }: PageHeroProps) {
	return (
		<section className={cn("py-16 lg:py-20 relative overflow-hidden", className)}>
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#377dff]/8 rounded-full blur-[120px]" />
			</div>
			<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
					<SectionBadge icon={icon} label={badge} variant={badgeVariant} className="mb-6" />
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">{title}</h1>
					{subtitle && <p className="text-base text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
					{children}
				</m.div>
			</div>
		</section>
	);
}
