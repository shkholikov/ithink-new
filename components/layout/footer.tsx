import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Mail, Phone, Send } from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { SERVICE_SLUGS } from "@/lib/services";
import { LICENSE_SLUGS, SOLUTION_SLUGS, TRAINING_SLUGS } from "@/lib/site-nav";
import { CONTACT } from "@/lib/contact";

export default async function Footer({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "footer" });
	const nav = await getTranslations({ locale, namespace: "nav" });

	const columns = [
		{
			title: t("services"),
			links: SERVICE_SLUGS.map((s) => ({ href: `/${locale}/services/${s}`, label: nav(`items.services.${s}.title`) }))
		},
		{
			title: t("products"),
			links: [
				...LICENSE_SLUGS.map((s) => ({ href: `/${locale}/licenses/${s}`, label: nav(`items.licenses.${s}.title`) })),
				...TRAINING_SLUGS.map((s) => ({ href: `/${locale}/training/${s}`, label: nav(`items.training.${s}.title`) }))
			]
		},
		{
			title: t("company"),
			links: [
				{ href: `/${locale}/company`, label: nav("companyPage") },
				{ href: `/${locale}/customers`, label: nav("clients") },
				{ href: `/${locale}/partners`, label: nav("partners") },
				{ href: `/${locale}/hire-us`, label: nav("hireUs") },
				{ href: `/${locale}/career`, label: nav("career") },
				...SOLUTION_SLUGS.map((s) => ({ href: `/${locale}/solutions/${s}`, label: nav(`items.solutions.${s}.title`) }))
			]
		}
	];

	const channels = [
		{ href: CONTACT.phoneHref, label: CONTACT.phone, icon: Phone },
		{ href: CONTACT.telegramHref, label: `Telegram ${CONTACT.telegram}`, icon: Send },
		{ href: `mailto:${CONTACT.email}`, label: CONTACT.email, icon: Mail },
		{ href: CONTACT.instagramHref, label: `Instagram ${CONTACT.instagram}`, icon: InstagramIcon }
	];

	return (
		<footer className="ink-scene relative overflow-hidden border-t border-ink-foreground/10 text-ink-foreground">
			<div aria-hidden="true" className="ink-grid pointer-events-none absolute inset-0 opacity-60" />
			<div className="relative mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
				<div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
					<div className="max-w-sm">
						<Image src="/logo.png" alt="ITHINK" width={1372} height={440} sizes="112px" className="h-8 w-auto dark:hidden" />
						<Image src="/logo-negative.png" alt="ITHINK" width={1372} height={440} sizes="112px" className="h-8 w-auto hidden dark:block" />
						<p className="mt-6 text-sm leading-relaxed text-ink-muted">{t("about")}</p>
						<ul className="mt-8 space-y-3">
							{channels.map((c) => (
								<li key={c.href}>
									<a
										href={c.href}
										target={c.href.startsWith("http") ? "_blank" : undefined}
										rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
										className="inline-flex items-center gap-3 text-sm text-ink-foreground/85 transition-colors hover:text-ink-foreground"
									>
										<span className="flex size-9 items-center justify-center rounded-xl border border-ink-foreground/10 bg-ink-foreground/5">
											<c.icon className="size-4" aria-hidden="true" />
										</span>
										{c.label}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div className="grid gap-10 sm:grid-cols-3">
						{columns.map((col) => (
							<nav key={col.title} aria-label={col.title}>
								<p className="text-sm font-semibold text-ink-foreground">{col.title}</p>
								<ul className="mt-4 space-y-2.5">
									{col.links.map((l) => (
										<li key={l.href}>
											<Link href={l.href} className="text-sm text-ink-muted transition-colors hover:text-ink-foreground">
												{l.label}
											</Link>
										</li>
									))}
								</ul>
							</nav>
						))}
					</div>
				</div>
				<div className="mt-16 flex flex-col gap-3 border-t border-ink-foreground/10 pt-8 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
					<p>
						© {new Date().getFullYear()} ITHINK. {t("rights")}.
					</p>
					<p>
						{t("slogan")} · {t("location")}
					</p>
				</div>
			</div>
		</footer>
	);
}
