import { getTranslations } from "next-intl/server";
import { Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";

export default async function Testimonials({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "testimonials" });

	const items = [0, 1, 2].map((i) => ({
		quote: t(`items.${i}.quote`),
		name: t(`items.${i}.name`),
		company: t(`items.${i}.company`),
		role: t(`items.${i}.role`)
	}));

	return (
		<section className="py-24 lg:py-32 border-t border-border bg-secondary/20 relative overflow-hidden">
			{/* Background accent */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-purple-600/5 rounded-full blur-[100px]" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<SectionHeader icon={Star} badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

				{/* Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{items.map((item, i) => (
						<FadeIn key={i} delay={i * 0.1} duration={0.45} y={24} className="group relative bg-card border border-border hover:border-[#377dff]/30 rounded-2xl p-7 transition-all duration-300 hover:shadow-lg hover:shadow-[#377dff]/5">
							{/* Quote icon */}
							<div className="w-10 h-10 rounded-xl bg-[#377dff]/10 flex items-center justify-center mb-5 group-hover:bg-[#377dff]/20 transition-colors">
								<Quote className="w-4 h-4 text-[#377dff]" />
							</div>

							{/* Quote text */}
							<p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">&ldquo;{item.quote}&rdquo;</p>

							{/* Author */}
							<div className="flex items-center gap-3">
								{/* Avatar placeholder */}
								<div className="w-10 h-10 rounded-full bg-[#377dff]/10 border border-[#377dff]/20 flex items-center justify-center flex-shrink-0">
									<span className="text-xs font-bold text-[#377dff]">
										{item.name
											.split(" ")
											.map((n) => n[0])
											.join("")
											.slice(0, 2)}
									</span>
								</div>
								<div>
									<div className="text-sm font-semibold text-foreground">{item.name}</div>
									<div className="text-xs text-muted-foreground">
										{item.role} · {item.company}
									</div>
								</div>
							</div>
						</FadeIn>
					))}
				</div>
			</div>
		</section>
	);
}
