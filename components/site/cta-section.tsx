import { getTranslations } from "next-intl/server";
import { Mail, Phone, Send } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { LazyLeadForm } from "@/components/site/lazy-lead-form";
import { Section, Eyebrow } from "@/components/site/section";
import { CONTACT } from "@/lib/contact";
import type { LeadService } from "@/lib/lead";

/**
 * The closing call to action used by the homepage and every inner page: copy and direct channels
 * on the left, the lead form in a border-beam panel on the right.
 */
export async function CtaSection({
	locale,
	pageTag,
	service,
	title,
	subtitle,
	id = "lead-form",
	className
}: {
	locale: string;
	pageTag: string;
	service?: LeadService;
	title?: string;
	subtitle?: string;
	id?: string;
	className?: string;
}) {
	const t = await getTranslations({ locale, namespace: "home.cta" });
	const channels = [
		{ href: CONTACT.telegramHref, label: CONTACT.telegram, icon: Send },
		{ href: CONTACT.phoneHref, label: CONTACT.phone, icon: Phone },
		{ href: `mailto:${CONTACT.email}`, label: CONTACT.email, icon: Mail }
	];

	return (
		<Section tone="ink" id={id} className={className}>
			<div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
				<div className="reveal">
					<Eyebrow onInk>{t("eyebrow")}</Eyebrow>
					<h2 className="text-3xl font-semibold tracking-tight text-ink-foreground sm:text-5xl sm:leading-[1.05]">{title ?? t("title")}</h2>
					<p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">{subtitle ?? t("subtitle")}</p>
					<p className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-foreground">
						<span className="relative flex size-1.5">
							<span className="led absolute animate-ping text-emerald-500 opacity-60" />
							<span className="led relative text-emerald-500" />
						</span>
						{t("response")}
					</p>
					<p className="mt-10 text-sm text-ink-muted">{t("direct")}</p>
					<ul className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
						{channels.map((c) => (
							<li key={c.href}>
								<a
									href={c.href}
									target={c.href.startsWith("http") ? "_blank" : undefined}
									rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
									className="inline-flex items-center gap-2 rounded-xl border border-ink-foreground/12 bg-ink-foreground/5 px-4 py-2.5 text-sm text-ink-foreground transition-colors hover:bg-ink-foreground/10"
								>
									<c.icon className="size-4" aria-hidden="true" />
									{c.label}
								</a>
							</li>
						))}
					</ul>
				</div>
				<div className="relative overflow-hidden rounded-3xl border border-ink-foreground/10 bg-card p-6 text-foreground shadow-2xl sm:p-8">
					<LazyLeadForm pageTag={pageTag} service={service} />
					<BorderBeam size={260} duration={10} colorFrom="#377dff" colorTo="#f9b934" borderWidth={2} />
				</div>
			</div>
		</Section>
	);
}
