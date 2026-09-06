import { getTranslations } from "next-intl/server";
import { ShieldCheck, Puzzle, TrendingUp, Award } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";

const icons = [ShieldCheck, Puzzle, TrendingUp];

export default async function WhyUs({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "whyUs" });

	const items = [0, 1, 2].map((i) => ({
		title: t(`items.${i}.title`),
		description: t(`items.${i}.description`),
		Icon: icons[i]
	}));

	return (
		<section className="py-24 lg:py-32 border-t border-border bg-background relative overflow-hidden">
			{/* Subtle background glow */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#377dff]/5 rounded-full blur-[100px]" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<SectionHeader icon={Award} badge={t("badge")} badgeVariant="yellow" title={t("title")} subtitle={t("subtitle")} />

				{/* Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{items.map((item, i) => (
						<FadeIn key={i} delay={i * 0.1} duration={0.4} className="group bg-card border border-border hover:border-[#377dff]/30 rounded-2xl p-7 transition-all duration-300 hover:shadow-lg hover:shadow-[#377dff]/5">
							<div className="w-12 h-12 rounded-xl bg-[#377dff]/10 flex items-center justify-center mb-5 group-hover:bg-[#377dff]/20 transition-colors">
								<item.Icon className="w-5 h-5 text-[#377dff]" />
							</div>
							<h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
						</FadeIn>
					))}
				</div>
			</div>
		</section>
	);
}
