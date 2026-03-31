import type { Metadata } from "next";
import PartnerItgrixPage from "@/components/pages/partner-itgrix-page";

type Props = { params: Promise<{ locale: string; slug: string }> };

const partnerData: Record<string, { name: string; description: string }> = {
	amocrm: {
		name: "amoCRM",
		description: "Sales-focused CRM built for fast-growing teams. We implement, customize, and train your staff."
	},
	bitrix24: {
		name: "Bitrix24",
		description: "All-in-one platform combining CRM, project management, HR, and communications."
	},
	"online-pbx": {
		name: "onlinePBX",
		description: "Cloud telephony and call center solutions integrated with your CRM and workflows."
	},
	wazzup: {
		name: "Wazzup",
		description: "Omnichannel messaging — WhatsApp, Telegram, Instagram — all inside your CRM."
	},
	megacount: {
		name: "MEGACOUNT",
		description: "AI-powered visitor counting and retail analytics for physical business locations."
	},
	itgrix: {
		name: "Itgrix",
		description: "Reliable Asterisk IP telephony integration for Bitrix24 and amoCRM. 3000+ installations in 20 countries since 2017."
	}
};

export async function generateStaticParams() {
	return Object.keys(partnerData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	const partner = partnerData[slug];
	const title = partner?.name ?? slug;
	return {
		title,
		description: partner?.description,
		alternates: {
			canonical: `https://ithink.uz/${locale}/partners/${slug}`,
			languages: {
				uz: `https://ithink.uz/uz/partners/${slug}`,
				ru: `https://ithink.uz/ru/partners/${slug}`,
				en: `https://ithink.uz/en/partners/${slug}`
			}
		}
	};
}

export default async function PartnerPage({ params }: Props) {
	const { locale, slug } = await params;

	if (slug === "itgrix") {
		return <PartnerItgrixPage locale={locale} />;
	}

	const partner = partnerData[slug];

	const comingSoon: Record<string, string> = {
		uz: "Tez orada...",
		ru: "Скоро...",
		en: "Coming soon..."
	};

	return (
		<div className="pt-24 min-h-screen bg-background flex items-center justify-center">
			<div className="text-center max-w-lg mx-auto px-4">
				<p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">Partner</p>
				<h1 className="text-4xl font-bold text-foreground mb-4">{partner?.name ?? slug}</h1>
				{partner?.description && <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{partner.description}</p>}
				<p className="text-muted-foreground">{comingSoon[locale] ?? comingSoon.en}</p>
			</div>
		</div>
	);
}
