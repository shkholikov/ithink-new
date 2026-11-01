import { getLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/site/page-hero";
import { Cta, CtaRow } from "@/components/site/cta";

/**
 * 404 inside the locale chrome. Catches every `notFound()` thrown under `[locale]`:
 * an unknown locale, an invalid slug, or a mistyped URL.
 */
export default async function LocaleNotFound() {
	const locale = await getLocale();
	const t = await getTranslations({ locale, namespace: "notFound" });

	return (
		<PageHero
			eyebrow={t("badge")}
			title={t("title")}
			subtitle={t("subtitle")}
			className="min-h-[70vh]"
			actions={
				<CtaRow>
					<Cta href={`/${locale}`} arrow>
						{t("home")}
					</Cta>
					<Cta href={`/${locale}/contact`} variant="soft">
						{t("contact")}
					</Cta>
				</CtaRow>
			}
		/>
	);
}
