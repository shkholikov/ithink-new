import { getTranslations } from "next-intl/server";
import { CrmBeam } from "@/components/home/crm-beam";
import type { ServiceSlug } from "@/lib/services";
import { range } from "../config";
import { InfraOrbit } from "./infra-orbit";
import { MonitoringBoard } from "./monitoring-board";
import { AutomationFeed } from "./automation-feed";
import { DeployTerminal } from "./deploy-terminal";
import { AuditScorecard } from "./audit-scorecard";

/**
 * The live visual in each service hero. Server side: picks the visual and reads its copy, so only
 * that one client island ships on the page (the orbit ships none).
 */
export async function ServiceHeroVisual({ locale, slug }: { locale: string; slug: ServiceSlug }) {
	const t = await getTranslations({ locale, namespace: `servicePages.${slug}` });
	const common = await getTranslations({ locale, namespace: "servicePages.common" });
	const monitor = await getTranslations({ locale, namespace: "home.hero.monitor" });
	const systems = [monitor("servers"), monitor("network"), monitor("backup")];

	switch (slug) {
		case "it-infrastructure":
			return <InfraOrbit labels={{ status: monitor("status"), systems }} />;
		case "managed-it":
			return (
				<MonitoringBoard
					labels={{
						title: monitor("title"),
						status: monitor("status"),
						systems,
						tickets: common("tickets"),
						resolved: common("resolved"),
						items: range(6).map((i) => t(`visual.tickets.${i}`)),
						example: common("example")
					}}
				/>
			);
		case "crm-automation": {
			const crm = await getTranslations({ locale, namespace: "home.crm" });
			return (
				<div aria-hidden="true" className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto">
					<div className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(55,125,255,0.28),transparent)] blur-2xl" />
					<div className="relative rounded-3xl shadow-[0_24px_60px_-28px_rgba(10,16,36,0.35)]">
						<CrmBeam labels={{ website: crm("website"), phone: crm("phone"), hub: crm("hub"), team: crm("team") }} />
					</div>
				</div>
			);
		}
		case "process-automation":
			return (
				<AutomationFeed
					labels={{
						title: t("visual.title"),
						auto: common("auto"),
						example: common("example"),
						events: range(6).map((i) => ({ title: t(`visual.events.${i}.title`), source: t(`visual.events.${i}.source`) }))
					}}
				/>
			);
		case "software-development":
			return <DeployTerminal labels={{ done: t("visual.done") }} />;
		case "it-audit":
			return (
				<AuditScorecard
					labels={{
						title: t("visual.title"),
						example: common("exampleReport"),
						areas: range(4).map((i) => t(`visual.areas.${i}`)),
						findings: range(2).map((i) => ({ text: t(`visual.findings.${i}.text`), risk: t(`visual.findings.${i}.risk`) }))
					}}
				/>
			);
	}
}
