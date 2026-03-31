"use client";

import { m } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
	icon?: LucideIcon;
	badge?: string;
	badgeVariant?: "blue" | "yellow";
	title: string;
	subtitle?: string;
	align?: "center" | "left";
	className?: string;
}

export function SectionHeader({ icon, badge, badgeVariant = "blue", title, subtitle, align = "center", className }: SectionHeaderProps) {
	return (
		<m.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.5 }}
			className={cn(align === "center" ? "text-center" : "text-left", "mb-14", className)}
		>
			{badge && icon && <SectionBadge icon={icon} label={badge} variant={badgeVariant} />}
			{badge && !icon && (
				<span
					className={cn(
						"inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4",
						badgeVariant === "yellow"
							? "bg-[#f9b934]/10 border border-[#f9b934]/30 text-[#f9b934]"
							: "bg-[#377dff]/10 border border-[#377dff]/20 text-[#377dff]"
					)}
				>
					{badge}
				</span>
			)}
			<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">{title}</h2>
			{subtitle && <p className={cn("text-muted-foreground text-sm", align === "center" && "max-w-xl mx-auto")}>{subtitle}</p>}
		</m.div>
	);
}
