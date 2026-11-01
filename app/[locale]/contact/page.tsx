import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Bot, Mail, MapPin, Phone, Send } from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { PageHero } from "@/components/site/page-hero";
import { CtaSection } from "@/components/site/cta-section";
import { CONTACT } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "contactPage.meta" });
	return pageMetadata({ locale, path: "/contact", title: t("title"), description: t("description") });
}

export default async function ContactRoute({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "contactPage" });
	const nav = await getTranslations({ locale, namespace: "nav" });

	const channels = [
		{ key: "telegram", href: CONTACT.telegramHref, value: CONTACT.telegram, icon: Send },
		{ key: "phone", href: CONTACT.phoneHref, value: CONTACT.phone, icon: Phone },
		{ key: "email", href: `mailto:${CONTACT.email}`, value: CONTACT.email, icon: Mail },
		{ key: "bot", href: `${CONTACT.botHref}?start=site_contact`, value: CONTACT.bot, icon: Bot },
		{ key: "instagram", href: CONTACT.instagramHref, value: CONTACT.instagram, icon: InstagramIcon }
	];

	return (
		<>
			<PageHero
				eyebrow={t("hero.eyebrow")}
				title={t("hero.title")}
				subtitle={t("hero.subtitle")}
				crumbs={[
					{ href: `/${locale}`, label: nav("home") },
					{ href: `/${locale}/contact`, label: nav("contactUs") }
				]}
			>
				<p className="appear appear-3 mt-8 inline-flex items-center gap-2 text-sm text-ink-muted">
					<MapPin className="size-4 text-ink-accent" aria-hidden="true" />
					<span>
						<span className="font-medium text-ink-foreground">{t("office.title")}</span> · {t("office.note")}
					</span>
				</p>
			</PageHero>

			<section className="relative -mt-10 pb-4 sm:-mt-14">
				<ul className="relative mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
					{channels.map((c) => (
						<li key={c.key}>
							<a
								href={c.href}
								target={c.href.startsWith("http") ? "_blank" : undefined}
								rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
								className="block h-full rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
							>
								<div className="blueprint-hover group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-colors duration-300 hover:border-brand/50">
									<span className="flex items-center justify-between">
										<span className="tag">{t(`${c.key}.label`)}</span>
										<c.icon className="size-5 text-muted-foreground/70 transition-colors group-hover:text-brand-text" aria-hidden="true" />
									</span>
									<span className="mt-10 break-all text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand-text">{c.value}</span>
									<span className="mt-2 text-sm text-muted-foreground">{t(`${c.key}.note`)}</span>
								</div>
							</a>
						</li>
					))}
				</ul>
			</section>

			<CtaSection locale={locale} pageTag="contact" title={t("formTitle")} subtitle={t("formSubtitle")} className="mt-16 sm:mt-20" />
		</>
	);
}
