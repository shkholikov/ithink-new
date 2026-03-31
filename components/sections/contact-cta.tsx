"use client";

import { useTranslations } from "next-intl";
import { MessageSquare } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactBlock } from "@/components/ui/contact-block";

export default function ContactCta() {
	const t = useTranslations("cta");

	return (
		<section id="contact" className="py-24 lg:py-32 border-t border-border bg-background relative overflow-hidden">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-[#377dff]/5 rounded-full blur-[120px]" />
				<div className="absolute top-0 right-1/4 w-[400px] h-[200px] bg-purple-600/5 rounded-full blur-[100px]" />
			</div>

			<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<SectionHeader icon={MessageSquare} badge="Contact" title={t("title")} subtitle={t("subtitle")} className="mb-12" />

				<ContactBlock
					strings={{
						infoTitle: t("contactTitle"),
						infoSubtitle: t("contactSubtitle"),
						phone: t("phoneValue"),
						telegramUrl: t("telegramValue"),
						telegramLabel: "@ithinkteam",
						email: t("emailValue"),
						responseTime: t("responseNote"),
						name: t("name"),
						emailPlaceholder: t("email"),
						phonePlaceholder: t("phone"),
						message: t("message"),
						submit: t("submit"),
						sending: t("sending"),
						success: t("success"),
						error: t("error")
					}}
				/>
			</div>
		</section>
	);
}
