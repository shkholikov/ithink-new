import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import messages from "@/messages/ru.json";
import "./globals.css";
import "@/components/glassyui/styles/liquid.css";
import { Cta } from "@/components/site/cta";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin", "cyrillic"]
});

export const metadata: Metadata = {
	title: `${messages.notFound.title} | ITHINK`
};

/**
 * Root-level 404 fallback, rendered without any layout.
 *
 * Most misses never reach here: the proxy prefixes an unknown path with a
 * locale, so `/nonsense` becomes `/ru/nonsense` and is caught by
 * `app/[locale]/not-found.tsx`, which has the navbar, footer and translations.
 * This handles what slips past the proxy matcher — a path containing a dot,
 * for example — where no locale has been resolved yet.
 *
 * Copy comes from the default locale via a static import rather than
 * `getTranslations`, which would read headers() and make this route dynamic.
 *
 * The root layout lives under `[locale]` so <html lang> can follow the URL, so
 * this page has no layout above it and brings its own document, styles and
 * font (see next.config.ts `globalNotFound`). No theme provider runs here, so
 * the page is light and says so to the glass tokens itself.
 */
export default function GlobalNotFound() {
	const t = messages.notFound;
	const home = `/${routing.defaultLocale}`;

	return (
		<html lang="ru" className={`${inter.variable} h-full`} data-lg-theme="light">
			<body className="min-h-full flex flex-col bg-background text-foreground antialiased">
				<div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
					<span className="tag">{t.badge}</span>
					<h1 className="text-4xl sm:text-5xl font-bold text-foreground">{t.title}</h1>
					<p className="text-base text-muted-foreground max-w-xl">{t.subtitle}</p>
					<Cta href={home} arrow className="mt-2">
						{t.home}
					</Cta>
				</div>
			</body>
		</html>
	);
}
