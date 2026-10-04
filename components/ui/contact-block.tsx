"use client";

import { m } from "framer-motion";
import { Phone, Send, Mail, Clock } from "lucide-react";
import { LeadForm } from "@/components/ui/lead-form";

interface ContactBlockStrings {
	// Info panel
	infoTitle: string;
	infoSubtitle: string;
	phone: string;
	telegramUrl: string;
	telegramLabel: string;
	email: string;
	responseTime: string;
}

interface ContactBlockProps {
	strings: ContactBlockStrings;
	/** Identifies the page in the form's Telegram deep link. */
	pageTag: string;
}

export function ContactBlock({ strings, pageTag }: ContactBlockProps) {
	const contacts = [
		{ icon: Phone, label: "PHONE", value: strings.phone, href: `tel:${strings.phone.replace(/[^\d+]/g, "")}`, external: false },
		{ icon: Send, label: "TELEGRAM", value: strings.telegramLabel, href: strings.telegramUrl, external: true },
		{ icon: Mail, label: "EMAIL", value: strings.email, href: `mailto:${strings.email}`, external: false }
	];

	return (
		<div className="grid lg:grid-cols-2 gap-6">
			{/* Info */}
			<m.div
				initial={{ opacity: 0, x: -20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true, margin: "-50px" }}
				transition={{ duration: 0.5 }}
				className="bg-card border border-border rounded-2xl p-8 flex flex-col gap-6"
			>
				<div>
					<h2 className="text-xl font-bold text-foreground mb-1">{strings.infoTitle}</h2>
					<p className="text-sm text-muted-foreground">{strings.infoSubtitle}</p>
				</div>

				<div className="flex flex-col gap-3">
					{contacts.map(({ icon: Icon, label, value, href, external }) => (
						<a
							key={label}
							href={href}
							target={external ? "_blank" : undefined}
							rel={external ? "noopener noreferrer" : undefined}
							className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-[#377dff]/30 transition-colors group"
						>
							<div className="w-10 h-10 rounded-lg bg-[#377dff]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#377dff]/20 transition-colors">
								<Icon className="w-4 h-4 text-brand-text" />
							</div>
							<div>
								<p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">{label}</p>
								<p className="text-sm font-medium text-foreground group-hover:text-brand-text transition-colors">{value}</p>
							</div>
						</a>
					))}
				</div>

				<div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
					<Clock className="w-3.5 h-3.5 text-brand-text flex-shrink-0" />
					{strings.responseTime}
				</div>
			</m.div>

			{/* Form */}
			<m.div
				initial={{ opacity: 0, x: 20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true, margin: "-50px" }}
				transition={{ duration: 0.5 }}
				className="bg-card border border-border rounded-2xl p-8"
			>
				<LeadForm pageTag={pageTag} />
			</m.div>
		</div>
	);
}
