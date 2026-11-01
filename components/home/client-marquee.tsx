import { getTranslations } from "next-intl/server";
import { Marquee } from "@/components/ui/marquee";

/** Client names as wordmarks until real logos (with permission) arrive. */
export const CLIENT_NAMES = [
	"Crayton & Vilt",
	"OBBO",
	"AslZar",
	"Kredit Market",
	"Penostyle",
	"Avtozet",
	"SOKOLOV",
	"UDirect",
	"ParadiseWall",
	"Mobicenter",
	"Chudo Tovary"
];

export async function ClientMarquee({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home.clients" });
	return (
		<section className="border-b border-border bg-background py-12">
			<p className="mx-auto max-w-7xl px-4 text-center text-sm font-medium text-muted-foreground sm:px-6 lg:px-8">{t("caption")}</p>
			<div className="relative mt-8 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
				<Marquee pauseOnHover repeat={3} className="[--duration:45s] [--gap:3.5rem]">
					{CLIENT_NAMES.map((name) => (
						<span key={name} className="whitespace-nowrap text-xl font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground sm:text-2xl">
							{name}
						</span>
					))}
				</Marquee>
			</div>
		</section>
	);
}
