import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string; rest: string[] }> };

/**
 * Catch-all so unmatched paths still resolve the locale segment.
 *
 * Without this, `/ru/nope` matches no route under `[locale]`, so Next falls
 * back to the *root* not-found — rendering outside the locale layout, with no
 * navbar, no footer and no translations. Matching here means
 * `app/[locale]/not-found.tsx` is used instead, inside the full chrome, in the
 * visitor's own language.
 *
 * Specific routes always win over a catch-all, so this shadows nothing.
 */
export default async function CatchAll({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	notFound();
}
