import Link from "next/link";
import { routing } from "@/i18n/routing";
import messages from "@/messages/ru.json";

/**
 * Root-level 404 fallback.
 *
 * Most misses never reach here: the proxy prefixes an unknown path with a
 * locale, so `/nonsense` becomes `/ru/nonsense` and is caught by
 * `app/[locale]/not-found.tsx`, which has the navbar, footer and translations.
 * This handles what slips past the proxy matcher — a path containing a dot,
 * for example — where no locale has been resolved yet.
 *
 * Copy comes from the default locale via a static import rather than
 * `getTranslations`, which would read headers() and make this route dynamic.
 */
export default function RootNotFound() {
	const t = messages.notFound;
	const home = `/${routing.defaultLocale}`;

	return (
		<div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
			<span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-[#377dff]/10 border border-[#377dff]/20 text-[#377dff]">
				{t.badge}
			</span>
			<h1 className="text-4xl sm:text-5xl font-bold text-foreground">{t.title}</h1>
			<p className="text-base text-muted-foreground max-w-xl">{t.subtitle}</p>
			<Link
				href={home}
				className="mt-2 inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#377dff] hover:bg-[#2563eb] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-[#377dff]/30 hover:shadow-lg hover:shadow-[#377dff]/40 hover:scale-[1.02]"
			>
				{t.home}
			</Link>
		</div>
	);
}
