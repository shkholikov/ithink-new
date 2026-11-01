import { Check, CreditCard, FileText, MessageCircle, Send, ShoppingCart, Users, Workflow } from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import type { TileVisual } from "./config";
import { cn } from "@/lib/utils";

/** Small CSS-only illustrations for the wide bento tiles. No text beyond product names already in the copy. */
export function FeatureVisual({ kind }: { kind: TileVisual }) {
	return (
		<div aria-hidden="true" className="relative flex h-40 items-center overflow-hidden rounded-2xl border border-border bg-secondary/70 p-4">
			{VISUALS[kind]()}
		</div>
	);
}

const bar = "rounded-full bg-foreground/10";

const VISUALS: Record<TileVisual, () => React.ReactNode> = {
	rack: () => (
		<div className="w-full space-y-2">
			{[0, 1, 2, 3].map((r) => (
				<div key={r} className="flex h-7 items-center gap-2 rounded-lg border border-border bg-card px-3">
					<span className="size-1.5 animate-pulse rounded-[2px] bg-emerald-500" style={{ animationDelay: `${r * 0.35}s` }} />
					<span className="size-1.5 rounded-[2px] bg-brand/60" />
					<span className="ml-2 flex flex-1 gap-1">
						{Array.from({ length: 10 }, (_, i) => (
							<span key={i} className="h-2.5 flex-1 rounded-[2px] bg-foreground/[0.07]" />
						))}
					</span>
				</div>
			))}
		</div>
	),
	snapshots: () => (
		<div className="grid w-full grid-cols-7 items-end gap-2">
			{[60, 72, 64, 80, 70, 88, 76].map((h, i) => (
				<div key={i} className="flex flex-col items-center gap-2">
					<span className={cn("w-full rounded-lg", i === 6 ? "animate-pulse bg-brand/50" : "bg-brand/25")} style={{ height: `${h}px` }} />
					<span className={cn("flex size-5 items-center justify-center rounded-full", i === 6 ? "bg-brand/15 text-brand-text" : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400")}>
						<Check className="size-3" />
					</span>
				</div>
			))}
		</div>
	),
	uptime: () => (
		<div className="w-full space-y-3">
			{[11, 4, 19].map((incident, r) => (
				<div key={r} className="flex h-6 gap-[3px]">
					{Array.from({ length: 24 }, (_, i) => (
						<span key={i} className={cn("min-w-0 flex-1 rounded-[3px]", i === incident ? "mt-auto h-3/5 bg-accent-yellow" : "bg-emerald-500/75")} />
					))}
				</div>
			))}
		</div>
	),
	report: () => (
		<div className="flex h-full w-full items-end gap-2.5">
			{[38, 52, 46, 64, 58, 76, 70, 88].map((h, i) => (
				<span key={i} className="flex-1 rounded-t-lg bg-linear-to-t from-brand/20 to-brand/60" style={{ height: `${h}%` }} />
			))}
		</div>
	),
	kanban: () => (
		<div className="grid w-full grid-cols-3 gap-2.5">
			{[3, 2, 1].map((cards, c) => (
				<div key={c} className="space-y-2 rounded-xl border border-border bg-card p-2.5">
					<span className={cn("block h-1.5 w-1/2", bar, c === 2 && "bg-emerald-500/50")} />
					{Array.from({ length: cards }, (_, i) => (
						<div key={i} className="space-y-1.5 rounded-lg border border-border bg-background p-2">
							<span className={cn("block h-1.5 w-4/5", bar)} />
							<span className={cn("block h-1.5 w-1/2", bar)} />
						</div>
					))}
				</div>
			))}
		</div>
	),
	channels: () => (
		<div className="flex w-full items-center justify-between gap-3">
			<div className="flex flex-col gap-2">
				<Chip icon={<MessageCircle className="size-3.5 text-emerald-600 dark:text-emerald-400" />}>WhatsApp</Chip>
				<Chip icon={<Send className="size-3.5 text-sky-600 dark:text-sky-400" />}>Telegram</Chip>
				<Chip icon={<InstagramIcon className="size-3.5 text-pink-600 dark:text-pink-400" />}>Instagram</Chip>
			</div>
			<span className="h-px flex-1 bg-linear-to-r from-border via-brand/50 to-border" />
			<span className="flex flex-col items-center gap-1.5">
				<span className="flex size-11 items-center justify-center rounded-lg border border-brand/60 bg-card text-brand-text">
					<Workflow className="size-4" />
				</span>
				<span className="text-[11px] font-medium text-muted-foreground">Wazzup</span>
			</span>
		</div>
	),
	flow: () => (
		<div className="flex w-full items-center">
			{[FileText, Workflow, Users].map((Icon, i) => (
				<div key={i} className="flex flex-1 items-center last:flex-none">
					<span className={cn("flex size-11 shrink-0 items-center justify-center rounded-lg border bg-card", i === 1 ? "border-brand/60 text-brand-text" : "border-border text-muted-foreground")}>
						<Icon className="size-4" />
					</span>
					{i < 2 && <span className="mx-2 h-0 flex-1 border-t-2 border-dashed border-brand/40" />}
				</div>
			))}
		</div>
	),
	code: () => (
		<div className="w-full space-y-2 font-mono">
			{[
				["w-1/4 bg-brand/50", "w-1/3 bg-foreground/10"],
				["ml-4 w-1/5 bg-accent-yellow/60", "w-2/5 bg-foreground/10"],
				["ml-8 w-1/3 bg-emerald-500/50", "w-1/4 bg-foreground/10"],
				["ml-8 w-1/4 bg-foreground/10", "w-1/5 bg-brand/40"],
				["ml-4 w-1/6 bg-accent-yellow/60", ""],
				["w-1/12 bg-brand/50", ""]
			].map((parts, i) => (
				<div key={i} className="flex gap-2">
					{parts.filter(Boolean).map((p, j) => (
						<span key={j} className={cn("block h-2 rounded-full", p)} />
					))}
				</div>
			))}
		</div>
	),
	checkout: () => (
		<div className="flex w-full items-center gap-4">
			<div className="flex-1 space-y-2">
				{[0, 1].map((i) => (
					<div key={i} className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-2">
						<span className="size-8 shrink-0 rounded-lg bg-brand/15" />
						<span className="flex-1 space-y-1.5">
							<span className={cn("block h-1.5 w-3/4", bar)} />
							<span className={cn("block h-1.5 w-1/3", bar)} />
						</span>
					</div>
				))}
				<span className="flex items-center justify-center gap-1.5 rounded-xl bg-[#2563eb] py-2 text-white">
					<ShoppingCart className="size-3.5" />
					<span className="h-1.5 w-12 rounded-full bg-white/60" />
				</span>
			</div>
			<div className="flex flex-col gap-2">
				<Chip icon={<CreditCard className="size-3.5 text-brand-text" />}>Payme</Chip>
				<Chip icon={<CreditCard className="size-3.5 text-brand-text" />}>Click</Chip>
			</div>
		</div>
	),
	checklist: () => (
		<div className="w-full space-y-2">
			{["ok", "warn", "ok", "risk"].map((s, i) => (
				<div key={i} className="flex h-7 items-center gap-2.5 rounded-lg border border-border bg-card px-3">
					<span
						className={cn(
							"size-2 shrink-0 rounded-[2px]",
							s === "ok" && "bg-emerald-500",
							s === "warn" && "bg-accent-yellow",
							s === "risk" && "animate-pulse bg-destructive"
						)}
					/>
					<span className={cn("block h-1.5", bar)} style={{ width: `${[64, 48, 72, 40][i]}%` }} />
				</div>
			))}
		</div>
	),
	roadmap: () => (
		<div className="w-full">
			<div className="flex gap-2">
				<span className="h-3 w-1/4 rounded-full bg-emerald-500/60" />
				<span className="h-3 w-1/3 rounded-full bg-brand/50" />
				<span className="h-3 flex-1 rounded-full bg-accent-yellow/60" />
			</div>
			<div className="mt-4 grid grid-cols-3 gap-2">
				{["bg-emerald-500", "bg-brand", "bg-accent-yellow"].map((dot, i) => (
					<div key={i} className="space-y-1.5 rounded-xl border border-border bg-card p-2.5">
						<span className={cn("block size-2 rounded-[2px]", dot)} />
						<span className={cn("block h-1.5 w-4/5", bar)} />
						<span className={cn("block h-1.5 w-1/2", bar)} />
					</div>
				))}
			</div>
		</div>
	)
};

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
	return (
		<span className="tag bg-card text-foreground">
			{icon}
			{children}
		</span>
	);
}
