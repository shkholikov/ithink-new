"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { Globe, MessageCircle, Phone, Send, Users, Workflow } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { cn } from "@/lib/utils";

type Labels = { website: string; phone: string; hub: string; team: string };

/** Magic UI animated beams: five lead channels flow into the CRM, the CRM hands leads to the sales team. */
export function CrmBeam({ labels }: { labels: Labels }) {
	const container = useRef<HTMLDivElement>(null);
	const hub = useRef<HTMLDivElement>(null);
	const team = useRef<HTMLDivElement>(null);
	const r1 = useRef<HTMLDivElement>(null);
	const r2 = useRef<HTMLDivElement>(null);
	const r3 = useRef<HTMLDivElement>(null);
	const r4 = useRef<HTMLDivElement>(null);
	const r5 = useRef<HTMLDivElement>(null);

	const beam = { containerRef: container, toRef: hub, duration: 4, pathColor: "var(--border)", pathOpacity: 1, gradientStartColor: "#377dff", gradientStopColor: "#f9b934" };

	// Written out node by node: the React compiler lint rejects refs read from an array during render.
	return (
		<div ref={container} className="relative flex w-full items-center justify-between gap-6 rounded-3xl border border-border bg-card p-6 sm:p-10">
			<div className="flex flex-col gap-4">
				<Node nodeRef={r1} label="WhatsApp">
					<MessageCircle className="size-5 text-emerald-500" />
				</Node>
				<Node nodeRef={r2} label="Telegram">
					<Send className="size-5 text-sky-500" />
				</Node>
				<Node nodeRef={r3} label="Instagram">
					<InstagramIcon className="size-5 text-pink-500" />
				</Node>
				<Node nodeRef={r4} label={labels.phone}>
					<Phone className="size-5 text-brand-text" />
				</Node>
				<Node nodeRef={r5} label={labels.website}>
					<Globe className="size-5 text-foreground/70" />
				</Node>
			</div>
			<Node nodeRef={hub} label={labels.hub} size="lg" sub="amoCRM · Bitrix24">
				<Workflow className="size-7 text-white" />
			</Node>
			<Node nodeRef={team} label={labels.team}>
				<Users className="size-5 text-brand-text" />
			</Node>

			<AnimatedBeam {...beam} fromRef={r1} curvature={48} />
			<AnimatedBeam {...beam} fromRef={r2} curvature={24} delay={0.4} />
			<AnimatedBeam {...beam} fromRef={r3} delay={0.8} />
			<AnimatedBeam {...beam} fromRef={r4} curvature={-24} delay={1.2} />
			<AnimatedBeam {...beam} fromRef={r5} curvature={-48} delay={1.6} />
			<AnimatedBeam containerRef={container} fromRef={hub} toRef={team} duration={4} pathColor="var(--border)" pathOpacity={1} gradientStartColor="#377dff" gradientStopColor="#f9b934" />
		</div>
	);
}

function Node({
	nodeRef,
	label,
	sub,
	size = "md",
	children
}: {
	nodeRef: RefObject<HTMLDivElement | null>;
	label: string;
	sub?: string;
	size?: "md" | "lg";
	children: ReactNode;
}) {
	return (
		<div className="relative z-10 flex flex-col items-center gap-2">
			<div
				ref={nodeRef}
				className={cn(
					"flex items-center justify-center rounded-2xl border shadow-[0_8px_24px_-8px_rgba(10,16,36,0.18)]",
					size === "lg" ? "size-20 border-brand/40 bg-[#2563eb] sm:size-24" : "size-12 border-border bg-background"
				)}
			>
				{children}
			</div>
			<span className={cn("text-center text-xs font-medium text-muted-foreground", size === "lg" && "text-sm font-semibold text-foreground")}>{label}</span>
			{sub && <span className="-mt-1.5 text-[11px] text-muted-foreground">{sub}</span>}
		</div>
	);
}
