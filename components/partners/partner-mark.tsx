import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PartnerSlug } from "@/lib/site-nav";

/** Official brand marks, taken from each vendor's website (public/partners). */
const MARKS: Record<PartnerSlug, { src: string; pad: string }> = {
	amocrm: { src: "/partners/amocrm.png", pad: "p-0" },
	bitrix24: { src: "/partners/bitrix24.svg", pad: "p-0" },
	"online-pbx": { src: "/partners/online-pbx.svg", pad: "p-[14%]" },
	wazzup: { src: "/partners/wazzup.png", pad: "p-0" },
	megacount: { src: "/partners/megacount.svg", pad: "p-[18%]" },
	itgrix: { src: "/partners/itgrix.png", pad: "p-[8%]" }
};

/** A partner's logo on a white rounded tile, so it reads the same on light and dark backgrounds. */
export function PartnerMark({ slug, name, className }: { slug: PartnerSlug; name: string; className?: string }) {
	const mark = MARKS[slug];
	return (
		<span className={cn("relative inline-flex size-11 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5", className)}>
			<span className={cn("relative size-full", mark.pad)}>
				<span className="relative block size-full">
					<Image src={mark.src} alt={name} fill sizes="96px" className="object-contain" />
				</span>
			</span>
		</span>
	);
}
