import { getTranslations } from "next-intl/server";
import { Bot, Code, Funnel, Handshake, LifeBuoy, Mail, Plus, Scale, Send, Server, ShieldCheck, Users } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { FeatureGrid } from "@/components/site/feature-grid";
import { Cta, CtaRow } from "@/components/site/cta";
import { CONTACT } from "@/lib/contact";

/** mailto with the localized subject ("Резюме", "CV", "Rezyume") filled in. */
export function cvMailto(subject: string) {
	return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;
}

/** Who the team is: the facts the site already states, heading left and text right. */
export async function TeamSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "careerPage.team" });
	return (
		<Section>
			<div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
				<SectionHeading eyebrow={t("eyebrow")} title={t("title")} className="mb-0 sm:mb-0" />
				<div className="reveal space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg lg:pt-10">
					<p>{t("p1")}</p>
					<p>{t("p2")}</p>
				</div>
			</div>
		</Section>
	);
}

const DIRECTION_ICONS = [Server, Funnel, Bot, Code, LifeBuoy, Plus];

/** The five service directions a candidate can join, plus a "something else" card. */
export async function DirectionsSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "careerPage.directions" });
	const items = DIRECTION_ICONS.map((icon, i) => ({ icon, title: t(`items.${i}.title`), description: t(`items.${i}.description`) }));
	return (
		<Section tone="muted">
			<SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
			<FeatureGrid items={items} />
		</Section>
	);
}

const VALUE_ICONS = [ShieldCheck, Scale, Handshake];

/** The company values from `about.values`, plus the in-house-team principle from `company.why`. */
export async function PrinciplesSection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "careerPage.values" });
	const values = await getTranslations({ locale, namespace: "about.values" });
	const items = [
		...VALUE_ICONS.map((icon, i) => ({ icon, title: values(`items.${i}.title`), description: values(`items.${i}.description`) })),
		{ icon: Users, title: t("extra.title"), description: t("extra.description") }
	];
	return (
		<Section>
			<SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
			<FeatureGrid items={items} columns={4} />
		</Section>
	);
}

/** The open application: three numbered steps. */
export async function ApplySection({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "careerPage.apply" });
	const steps = [0, 1, 2].map((i) => ({
		title: t(`steps.${i}.title`),
		description: t(`steps.${i}.description`, { email: CONTACT.email, telegram: CONTACT.telegram })
	}));
	return (
		<Section tone="muted">
			<SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
			<ol className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				{steps.map((s, i) => (
					<li key={s.title} className="reveal rounded-3xl border border-border bg-card p-6 sm:p-7">
						<span className="text-sm font-semibold tabular-nums text-brand-text">{String(i + 1).padStart(2, "0")}</span>
						<h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
						<p className="mt-2 break-words text-sm leading-relaxed text-muted-foreground">{s.description}</p>
					</li>
				))}
			</ol>
		</Section>
	);
}

/** Two contact actions, email and Telegram. Used in the hero and the closing ink band. */
export async function ApplyActions({ locale, onInk = true }: { locale: string; onInk?: boolean }) {
	const t = await getTranslations({ locale, namespace: "careerPage" });
	return (
		<CtaRow>
			<Cta href={cvMailto(t("apply.subject"))}>
				<Mail className="size-4" aria-hidden="true" />
				{t("hero.ctaEmail")}
			</Cta>
			<Cta href={CONTACT.telegramHref} variant={onInk ? "soft" : "ghost"}>
				<Send className="size-4" aria-hidden="true" />
				{t("hero.ctaTelegram")}
			</Cta>
		</CtaRow>
	);
}

/** Closing ink band: the call to send a CV, with the address and handle spelled out. */
export async function ApplyBand({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "careerPage.band" });
	return (
		<Section tone="ink">
			<div className="reveal mx-auto max-w-3xl text-center">
				<h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">{t("title")}</h2>
				<p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">{t("subtitle")}</p>
				<div className="mt-10 flex justify-center">
					<ApplyActions locale={locale} />
				</div>
				<p className="mt-6 text-sm text-ink-muted">
					{CONTACT.email} · {CONTACT.telegram}
				</p>
			</div>
		</Section>
	);
}
