"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Send, Phone } from "lucide-react";
import { useIsDark } from "@/hooks/use-is-dark";
import { InstagramIcon } from "@/components/ui/instagram-icon";

interface FooterProps {
	locale: string;
}

export default function Footer({ locale }: FooterProps) {
	const t = useTranslations("footer");
	const nav = useTranslations("nav");
	const isDark = useIsDark();
	const year = new Date().getFullYear();

	const columns = [
		{
			heading: nav("services"),
			links: [
				{ label: "CRM & Sales Automation", href: `/${locale}/services/crm` },
				{ label: "Software Development", href: `/${locale}/services/software` },
				{ label: "IT Infrastructure", href: `/${locale}/services/infrastructure` },
				{ label: t("links.hireUs"), href: `/${locale}/hire-us` },
				{ label: t("links.websites"), href: `/${locale}/websites` }
			]
		},
		{
			heading: nav("solutions"),
			links: [
				{ label: "For Business", href: `/${locale}/solutions/business` },
				{ label: "For Education", href: `/${locale}/solutions/education` },
				{ label: "For Enterprise", href: `/${locale}/solutions/enterprise` },
				{ label: nav("licenses"), href: `/${locale}/licenses/microsoft` },
				{ label: nav("training"), href: `/${locale}/training/courses` }
			]
		},
		{
			heading: nav("company"),
			links: [
				{ label: t("links.about"), href: `/${locale}/about` },
				{ label: t("links.customers"), href: `/${locale}/customers` },
				{ label: t("links.partners"), href: `/${locale}/partners` },
				{ label: nav("career"), href: `/${locale}/career` },
				{ label: nav("blog"), href: `/${locale}/blog` }
			]
		}
	];

	return (
		<footer className="bg-card border-t border-border">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
					{/* Brand */}
					<div className="sm:col-span-2 lg:col-span-2">
						<Link href={`/${locale}`}>
							<Image src={isDark ? "/logo-negative.png" : "/logo.png"} alt="ITHINK" width={110} height={34} className="h-8 w-auto mb-4" />
						</Link>
						<p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-5">{t("slogan")}</p>
						<div className="flex items-center gap-2">
							<a
								href="https://instagram.com/ithinkuz"
								target="_blank"
								rel="noopener noreferrer"
								className="w-9 h-9 rounded-xl bg-secondary hover:bg-[#e1306c]/10 hover:border-[#e1306c]/30 flex items-center justify-center transition-all duration-200 border border-border group"
								aria-label="Instagram"
							>
								<InstagramIcon className="w-4 h-4 text-muted-foreground group-hover:text-[#e1306c] transition-colors" />
							</a>
							<a
								href="https://t.me/ithinkteam"
								target="_blank"
								rel="noopener noreferrer"
								className="w-9 h-9 rounded-xl bg-secondary hover:bg-[#229ed9]/10 hover:border-[#229ed9]/30 flex items-center justify-center transition-all duration-200 border border-border group"
								aria-label="Telegram"
							>
								<Send className="w-4 h-4 text-muted-foreground group-hover:text-[#229ed9] transition-colors" />
							</a>
							<a
								href="tel:+997951717101"
								className="w-9 h-9 rounded-xl bg-secondary hover:bg-[#377dff]/10 hover:border-[#377dff]/30 flex items-center justify-center transition-all duration-200 border border-border group"
								aria-label="Phone"
							>
								<Phone className="w-4 h-4 text-muted-foreground group-hover:text-[#377dff] transition-colors" />
							</a>
						</div>
					</div>

					{/* Nav columns */}
					{columns.map((col, i) => (
						<div key={i} className="text-left sm:text-right">
							<p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">{col.heading}</p>
							<ul className="space-y-2.5">
								{col.links.map((link) => (
									<li key={link.href}>
										<Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Contact bar */}
				<div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-xs text-muted-foreground">
						© {year} ITHINK. {t("rights")}.
					</p>
					<div className="flex items-center gap-4 text-xs text-muted-foreground">
						<a href="mailto:team@ithink.uz" className="hover:text-foreground transition-colors">
							team@ithink.uz
						</a>
						<span className="text-border">·</span>
						<a href="tel:+997951717101" className="hover:text-foreground transition-colors">
							+997 95 171-71-01
						</a>
						<span className="text-border">·</span>
						<Link href={`/${locale}/contact`} className="hover:text-foreground transition-colors">
							{t("links.contactPage")}
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
