"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
	Menu,
	X,
	Sun,
	Moon,
	Database,
	Code2,
	Server,
	Shield,
	Lock,
	Layers,
	BookOpen,
	Award,
	Users2,
	Briefcase,
	GraduationCap,
	Building2,
	TrendingUp,
	LayoutGrid,
	Phone,
	MessageCircle,
	BarChart2,
	CalendarCheck
} from "lucide-react";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const locales = ["uz", "ru", "en"] as const;

const dropdownGroups = [
	{
		key: "services" as const,
		section: "services",
		items: [
			{ icon: Database, title: "CRM Integration", description: "Automate your sales pipeline with modern CRM systems.", slug: "crm" },
			{ icon: Code2, title: "Software Development", description: "Custom web and mobile apps tailored to your business.", slug: "software" },
			{ icon: Server, title: "IT Infrastructure", description: "Networks, servers, and managed IT for your operations.", slug: "infrastructure" }
		]
	},
	{
		key: "licenses" as const,
		section: "licenses",
		items: [
			{ icon: Shield, title: "Microsoft", description: "Official Microsoft licenses for business and enterprise.", slug: "microsoft" },
			{ icon: Lock, title: "Security Software", description: "Antivirus and endpoint protection solutions.", slug: "security" },
			{ icon: Layers, title: "Design Tools", description: "Creative software licenses for your team.", slug: "design" }
		]
	},
	{
		key: "training" as const,
		section: "training",
		items: [
			{ icon: BookOpen, title: "Online Courses", description: "Self-paced learning programs for IT professionals.", slug: "courses" },
			{ icon: Award, title: "Certifications", description: "Recognized certifications to validate your skills.", slug: "certification" },
			{ icon: Users2, title: "Corporate Training", description: "Tailored training programs for your team.", slug: "corporate" }
		]
	},
	{
		key: "solutions" as const,
		section: "solutions",
		items: [
			{ icon: Briefcase, title: "For Business", description: "End-to-end IT solutions for growing companies.", slug: "business" },
			{ icon: GraduationCap, title: "For Education", description: "Technology tools for schools and universities.", slug: "education" },
			{ icon: Building2, title: "For Enterprise", description: "Scalable infrastructure for large organizations.", slug: "enterprise" }
		]
	},
	{
		key: "partners" as const,
		section: "partners",
		items: [
			{ icon: TrendingUp, title: "amoCRM", description: "Sales-focused CRM built for fast-growing teams.", slug: "amocrm" },
			{ icon: LayoutGrid, title: "Bitrix24", description: "All-in-one CRM, project management and HR.", slug: "bitrix24" },
			{ icon: Phone, title: "onlinePBX", description: "Cloud telephony and call center solutions.", slug: "online-pbx" },
			{ icon: MessageCircle, title: "Wazzup", description: "Omnichannel messaging inside your CRM.", slug: "wazzup" },
			{ icon: BarChart2, title: "MEGACOUNT", description: "AI-powered visitor counting and retail analytics.", slug: "megacount" }
		]
	}
];

interface NavbarProps {
	locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
	const t = useTranslations("nav");
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const isDark = !mounted || theme === "dark";

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				scrolled
					? isDark
						? "bg-[#0d0d14]/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
						: "bg-white/90 backdrop-blur-md border-b border-black/5 shadow-lg shadow-black/10"
					: "bg-transparent"
			)}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 lg:h-18">
					{/* Logo */}
					<Link href={`/${locale}`} className="flex-shrink-0">
						<Image src={isDark ? "/logo-negative.png" : "/logo.png"} alt="ITHINK" width={120} height={36} className="h-8 w-auto" priority />
					</Link>

					{/* Desktop Nav */}
					<nav className="hidden lg:flex items-center">
						<NavigationMenu>
							<NavigationMenuList>
								{dropdownGroups.map((group) => (
									<NavigationMenuItem key={group.key}>
										<NavigationMenuTrigger className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 bg-transparent hover:bg-accent data-open:bg-accent">
											{t(group.key)}
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="w-72 p-2">
												{group.items.map((item) => (
													<li key={item.slug}>
														<Link
															href={`/${locale}/${group.section}/${item.slug}`}
															className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent transition-colors"
														>
															<div className="mt-0.5 shrink-0 rounded-md bg-[#377dff]/10 p-2">
																<item.icon className="size-4 text-[#377dff]" />
															</div>
															<div>
																<p className="text-sm font-medium text-foreground">{item.title}</p>
																<p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.description}</p>
															</div>
														</Link>
													</li>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								))}

								<NavigationMenuItem>
									<Link
										href={`/${locale}/company`}
										className={cn(navigationMenuTriggerStyle(), "text-sm text-muted-foreground hover:text-foreground px-3 py-2 bg-transparent")}
									>
										{t("company")}
									</Link>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<Link
										href={`/${locale}/career`}
										className={cn(navigationMenuTriggerStyle(), "text-sm text-muted-foreground hover:text-foreground px-3 py-2 bg-transparent")}
									>
										{t("career")}
									</Link>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</nav>

					{/* Right side */}
					<div className="hidden lg:flex items-center gap-3">
						{/* Free Consultation CTA */}
						<Link
							href={`/${locale}/contact`}
							className="relative inline-flex items-center gap-2 px-4 py-2 bg-[#377dff] hover:bg-[#2563eb] text-white text-xs font-semibold rounded-xl transition-all duration-200 shadow-md shadow-[#377dff]/30 hover:shadow-lg hover:shadow-[#377dff]/40 hover:scale-[1.02] overflow-hidden group"
						>
							<span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-in-out" />
							<CalendarCheck className="w-3.5 h-3.5 relative z-10" />
							<span className="relative z-10">{t("freeCta")}</span>
						</Link>

						<div className="flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
							{locales.map((l) => (
								<Link
									key={l}
									href={`/${l}`}
									className={cn(
										"px-2.5 py-1 text-xs font-medium rounded-md transition-all uppercase",
										l === locale ? "bg-[#377dff] text-white" : "text-muted-foreground hover:text-foreground"
									)}
								>
									{l}
								</Link>
							))}
						</div>

						<button
							onClick={() => setTheme(isDark ? "light" : "dark")}
							className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
							aria-label="Toggle theme"
						>
							{mounted && !isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
						</button>
					</div>

					{/* Mobile */}
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
							{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
						</SheetTrigger>
						<SheetContent side="right" className="w-full sm:w-80 bg-background border-l border-border p-0">
							<div className="flex flex-col h-full">
								<div className="flex items-center p-4 border-b border-white/5">
									<Image src={isDark ? "/logo-negative.png" : "/logo.png"} alt="ITHINK" width={100} height={30} className="h-7 w-auto" />
								</div>

								<nav className="flex-1 overflow-y-auto p-4">
									<Accordion className="space-y-0.5">
										{dropdownGroups.map((group) => (
											<AccordionItem key={group.key}>
												<AccordionTrigger className="px-3 text-sm font-medium text-foreground hover:no-underline py-2.5">
													{t(group.key)}
												</AccordionTrigger>
												<AccordionContent>
													<div className="pl-2 pb-1 space-y-0.5">
														{group.items.map((item) => (
															<Link
																key={item.slug}
																href={`/${locale}/${group.section}/${item.slug}`}
																onClick={() => setOpen(false)}
																className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors"
															>
																<item.icon className="size-4 text-[#377dff] shrink-0" />
																{item.title}
															</Link>
														))}
													</div>
												</AccordionContent>
											</AccordionItem>
										))}
									</Accordion>

									<div className="mt-3 space-y-0.5">
										{(["company", "career"] as const).map((key) => (
											<Link
												key={key}
												href={`/${locale}/${key}`}
												onClick={() => setOpen(false)}
												className="block px-3 py-2.5 text-sm text-foreground hover:bg-accent rounded-lg transition-colors"
											>
												{t(key)}
											</Link>
										))}
									</div>
								</nav>

								<div className="p-4 border-t border-white/5 space-y-3">
									<Link
										href={`/${locale}/contact`}
										onClick={() => setOpen(false)}
										className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#377dff] hover:bg-[#2563eb] text-white text-sm font-semibold rounded-xl transition-colors"
									>
										<CalendarCheck className="w-4 h-4" />
										{t("freeCta")}
									</Link>

									<div className="flex items-center gap-1 bg-muted rounded-lg p-1">
										{locales.map((l) => (
											<Link
												key={l}
												href={`/${l}`}
												onClick={() => setOpen(false)}
												className={cn(
													"flex-1 text-center py-1.5 text-xs font-medium rounded-md transition-all uppercase",
													l === locale ? "bg-[#377dff] text-white" : "text-muted-foreground hover:text-foreground"
												)}
											>
												{l}
											</Link>
										))}
									</div>
									<button
										onClick={() => setTheme(isDark ? "light" : "dark")}
										className="w-full p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 text-sm"
										aria-label="Toggle theme"
									>
										{mounted && !isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
										{mounted && !isDark ? "Light mode" : "Dark mode"}
									</button>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
