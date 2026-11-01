import {
	Award,
	Bot,
	Building2,
	Code,
	Funnel,
	GraduationCap,
	KeyRound,
	Landmark,
	MonitorPlay,
	PenTool,
	ScanSearch,
	Server,
	ShieldCheck,
	ShieldHalf,
	Users,
	type LucideIcon
} from "lucide-react";
import type { ServiceSlug } from "@/lib/services";
import type { LicenseSlug, SolutionSlug, TrainingSlug } from "@/lib/site-nav";

export const SERVICE_ICONS: Record<ServiceSlug, LucideIcon> = {
	"it-infrastructure": Server,
	"managed-it": ShieldCheck,
	"crm-automation": Funnel,
	"process-automation": Bot,
	"software-development": Code,
	"it-audit": ScanSearch
};

export const SOLUTION_ICONS: Record<SolutionSlug, LucideIcon> = {
	business: Building2,
	education: GraduationCap,
	enterprise: Landmark
};

export const LICENSE_ICONS: Record<LicenseSlug, LucideIcon> = {
	microsoft: KeyRound,
	security: ShieldHalf,
	design: PenTool
};

export const TRAINING_ICONS: Record<TrainingSlug, LucideIcon> = {
	courses: MonitorPlay,
	certification: Award,
	corporate: Users
};
