"use client";

import { useTranslations } from "next-intl";
import { MessageSquare } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { ContactBlock } from "@/components/ui/contact-block";

export default function ContactPage({ locale: _ }: { locale: string }) {
	const t = useTranslations("contact");

	return (
		<div className="pt-24 bg-background">
			<PageHero icon={MessageSquare} badge={t("hero.badge")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

			<section className="pb-24 border-t border-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
					<ContactBlock
						strings={{
							infoTitle: t("info.title"),
							infoSubtitle: t("info.subtitle"),
							phone: t("info.phone"),
							telegramUrl: "https://t.me/ithinkteam",
							telegramLabel: t("info.telegramHandle"),
							email: t("info.email"),
							responseTime: t("info.responseTime"),
							name: t("form.name"),
							emailPlaceholder: t("form.email"),
							phonePlaceholder: t("form.phone"),
							message: t("form.message"),
							submit: t("form.submit"),
							sending: t("form.sending"),
							success: t("form.success"),
							error: t("form.error")
						}}
						messageRows={6}
					/>
				</div>
			</section>
		</div>
	);
}
