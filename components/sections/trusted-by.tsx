import { getTranslations } from "next-intl/server";
import { Users } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import { FadeIn } from "@/components/ui/fade-in";

const partners = ["amoCRM", "Bitrix24", "onlinePBX", "Wazzup", "MEGACOUNT"];
const clients = [
	"Crayton & Vilt",
	"OBBO",
	"AslZar",
	"Kredit Market",
	"Penostyle",
	"Avtozet",
	"SOKOLOV",
	"UDirect",
	"ParadiseWall",
	"Mobicenter",
	"Chudo Tovary"
];

// Combine for marquee — duplicate for seamless loop
const marqueeItems = [...partners, ...clients];

export default async function TrustedBy({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "trustedBy" });

	return (
		<section className="py-16 lg:py-20 border-t border-border bg-background overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
				<FadeIn y={16} className="text-center">
					<SectionBadge icon={Users} label={t("badge")} className="mb-3" />
					<h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{t("title")}</h2>
					<p className="text-sm text-muted-foreground">{t("subtitle")}</p>
				</FadeIn>
			</div>

			{/* Marquee container */}
			<div className="relative">
				{/* Fade edges */}
				<div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
				<div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

				<div className="flex overflow-hidden">
					<div className="flex gap-4 animate-marquee whitespace-nowrap">
						{[...marqueeItems, ...marqueeItems].map((name, i) => (
							<div
								key={i}
								className="flex-shrink-0 px-5 py-2.5 bg-card border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-[#377dff]/30 transition-colors duration-200 cursor-default"
							>
								{name}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
