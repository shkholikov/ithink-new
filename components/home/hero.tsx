import { getTranslations } from "next-intl/server";
import { Activity, Bot, CheckCircle2, Funnel, Send } from "lucide-react";
import { GlassPanel } from "@/components/glassyui/glass-panel";
import { Spotlight } from "@/components/ui/spotlight-new";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Cta, CtaRow } from "@/components/site/cta";

/**
 * Home hero on the ink backdrop. The heading block uses the CSS `appear` entrance, so the LCP text
 * paints with the HTML. The glass cards on the right are decoration and are hidden from assistive tech.
 */
export async function HomeHero({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "home.hero" });

	return (
		<section data-lg-theme="dark" className="ink-scene relative overflow-hidden text-white">
			<div aria-hidden="true" className="ink-grid pointer-events-none absolute inset-0" />
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
				<Spotlight />
			</div>
			<div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-36 sm:px-6 sm:pb-28 sm:pt-44 lg:grid-cols-[1.15fr_1fr] lg:px-8">
				<div>
					<p className="appear mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium backdrop-blur">
						<span className="size-1.5 rounded-full bg-accent-yellow" aria-hidden="true" />
						<AnimatedShinyText className="mx-0 text-white/80 via-white dark:text-white/80">{t("eyebrow")}</AnimatedShinyText>
					</p>
					<h1 className="appear appear-1 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
						{t("titleLead")} <span className="text-[#9cc0ff]">{t("titleAccent")}</span>
					</h1>
					<p className="appear appear-2 mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">{t("subtitle")}</p>
					<CtaRow className="appear appear-3 mt-10">
						<Cta href={`/${locale}/contact`} arrow>
							{t("ctaPrimary")}
						</Cta>
						<Cta href={`/${locale}#services`} variant="soft">
							{t("ctaSecondary")}
						</Cta>
					</CtaRow>
					<p className="appear appear-3 mt-6 text-sm text-ink-muted">{t("note")}</p>
				</div>

				<HeroVisual
					labels={{
						pipeline: t("pipeline.title"),
						stages: [t("pipeline.stage1"), t("pipeline.stage2"), t("pipeline.stage3")],
						lead: t("pipeline.lead"),
						source: t("pipeline.source"),
						monitor: t("monitor.title"),
						status: t("monitor.status"),
						systems: [t("monitor.servers"), t("monitor.network"), t("monitor.backup")],
						bot: t("bot.title"),
						botMessage: t("bot.message")
					}}
				/>
			</div>
		</section>
	);
}

type VisualLabels = {
	pipeline: string;
	stages: string[];
	lead: string;
	source: string;
	monitor: string;
	status: string;
	systems: string[];
	bot: string;
	botMessage: string;
};

function HeroVisual({ labels }: { labels: VisualLabels }) {
	const counts = [12, 7, 4];
	return (
		<div aria-hidden="true" className="appear appear-2 relative mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto">
			<div className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(55,125,255,0.35),transparent)] blur-2xl" />

			<GlassPanel preset="prominent" className="relative rounded-3xl p-5 sm:p-6">
				<div className="flex items-center justify-between">
					<span className="inline-flex items-center gap-2 text-sm font-semibold">
						<Funnel className="size-4 text-[#9cc0ff]" />
						{labels.pipeline}
					</span>
					<span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300">amoCRM</span>
				</div>
				<div className="mt-5 grid grid-cols-3 gap-2.5">
					{labels.stages.map((stage, i) => (
						<div key={stage} className="rounded-2xl border border-white/10 bg-white/5 p-3">
							<p className="truncate text-[11px] text-white/60">{stage}</p>
							<p className="mt-1 text-xl font-semibold tabular-nums">{counts[i]}</p>
							<div className="mt-3 space-y-1.5">
								{Array.from({ length: 3 - i }).map((_, j) => (
									<div key={j} className="h-1.5 rounded-full bg-white/15" style={{ width: `${90 - j * 22}%` }} />
								))}
							</div>
						</div>
					))}
				</div>
				<div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
					<span className="flex size-9 items-center justify-center rounded-xl bg-[#377dff]/25">
						<Send className="size-4 text-[#9cc0ff]" />
					</span>
					<div className="min-w-0">
						<p className="truncate text-sm font-medium">{labels.lead}</p>
						<p className="truncate text-xs text-white/60">{labels.source}</p>
					</div>
					<span className="ml-auto size-2 animate-pulse rounded-full bg-accent-yellow" />
				</div>
			</GlassPanel>

			<GlassPanel preset="standard" className="relative -mt-6 ml-auto w-[78%] rounded-3xl p-4 sm:-mt-8 sm:w-[70%] lg:-mr-6">
				<div className="flex items-center gap-2 text-sm font-semibold">
					<Activity className="size-4 text-emerald-300" />
					{labels.monitor}
				</div>
				<p className="mt-1 flex items-center gap-1.5 text-xs text-emerald-300">
					<CheckCircle2 className="size-3.5" />
					{labels.status}
				</p>
				<div className="mt-3 flex h-10 items-end gap-1">
					{[40, 55, 48, 70, 62, 80, 74, 88, 76, 92, 85, 95, 90, 97].map((h, i) => (
						<div key={i} className="flex-1 rounded-sm bg-emerald-300/60" style={{ height: `${h}%` }} />
					))}
				</div>
				<div className="mt-3 flex flex-wrap gap-1.5">
					{labels.systems.map((s) => (
						<span key={s} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/70">
							{s}
						</span>
					))}
				</div>
			</GlassPanel>

			<GlassPanel preset="standard" className="absolute -left-4 bottom-6 hidden w-56 rounded-2xl p-3.5 sm:block lg:-left-12">
				<div className="flex items-center gap-2.5">
					<span className="flex size-8 items-center justify-center rounded-full bg-[#2aabee]/30">
						<Bot className="size-4 text-white" />
					</span>
					<div className="min-w-0">
						<p className="text-xs font-semibold">{labels.bot}</p>
						<p className="text-[11px] leading-snug text-white/65">{labels.botMessage}</p>
					</div>
				</div>
			</GlassPanel>
		</div>
	);
}
