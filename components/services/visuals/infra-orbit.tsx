import { Cctv, CloudUpload, HardDrive, Lock, Monitor, Phone, Router, Server, ShieldCheck, Wifi, type LucideIcon } from "lucide-react";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { StatusTable, VisualFrame } from "./frame";

const OUTER: LucideIcon[] = [Wifi, ShieldCheck, CloudUpload, Cctv, Phone, Router];
const INNER: LucideIcon[] = [Monitor, Lock, HardDrive];

// `animate-orbit` is the only thing that positions the icons. Reduced motion cuts the animation to
// 0.01 ms, so the final frame has to stick (fill-mode) or every icon would fall back to the centre.
const ITEM = "[animation-fill-mode:both]";

/** Server-rendered, CSS-only: office systems orbit the central server. Two sizes so phones get a smaller ring. */
export function InfraOrbit({ labels }: { labels: { status: string; systems: string[] } }) {
	return (
		<VisualFrame>
			<div className="relative mx-auto flex size-[290px] items-center justify-center sm:hidden">
				<Orbit outer={124} inner={70} icon={40} />
			</div>
			<div className="relative mx-auto hidden size-[400px] items-center justify-center sm:flex">
				<Orbit outer={172} inner={98} icon={48} />
			</div>
			<StatusTable className="mt-2 border-t border-ink-foreground/10/60" rows={labels.systems.map((name) => ({ name }))} status={labels.status} />
		</VisualFrame>
	);
}

function Orbit({ outer, inner, icon }: { outer: number; inner: number; icon: number }) {
	return (
		<>
			<span className="relative z-10 flex size-20 items-center justify-center rounded-3xl bg-[#2563eb] shadow-[0_0_0_10px_rgba(55,125,255,0.12),0_0_60px_rgba(55,125,255,0.45)] sm:size-24">
				<Server className="size-8 text-white sm:size-10" />
			</span>
			<OrbitingCircles radius={outer} iconSize={icon} duration={36} className={ITEM}>
				{OUTER.map((Icon, i) => (
					<Tile key={i} icon={Icon} accent={i === 1} />
				))}
			</OrbitingCircles>
			<OrbitingCircles radius={inner} iconSize={icon - 6} duration={24} reverse className={ITEM}>
				{INNER.map((Icon, i) => (
					<Tile key={i} icon={Icon} />
				))}
			</OrbitingCircles>
		</>
	);
}

function Tile({ icon: Icon, accent = false }: { icon: LucideIcon; accent?: boolean }) {
	return (
		<span className="flex size-full items-center justify-center rounded-xl border border-ink-foreground/10 bg-card shadow-[0_6px_18px_-8px_rgba(10,16,36,0.25)]">
			<Icon className={accent ? "size-5 text-accent-yellow-text" : "size-5 text-brand-text"} />
		</span>
	);
}
