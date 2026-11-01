import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ChevronDown, Handshake, type LucideIcon } from "lucide-react";
import { SERVICE_SLUGS } from "@/lib/services";
import { LICENSE_SLUGS, PARTNER_SLUGS, SOLUTION_SLUGS, TRAINING_SLUGS } from "@/lib/site-nav";
import { LICENSE_ICONS, SERVICE_ICONS, SOLUTION_ICONS, TRAINING_ICONS } from "@/lib/icons";
import { Cta } from "@/components/site/cta";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LocaleSwitch } from "@/components/layout/locale-switch";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { cn } from "@/lib/utils";
import { BorderBeamTrain } from "@/components/ui/border-beam-train";

type Item = { href: string; title: string; description?: string; icon?: LucideIcon };

/**
 * Server-rendered navbar. Desktop dropdowns open on hover and keyboard focus with CSS only;
 * the client islands are the theme toggle, the locale switch and the mobile menu's close-on-navigate.
 * The bar is a dark glass pill in both themes, so it reads the same over the navy heroes and the light body.
 */
export default async function Navbar({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "nav" });
	const item = (group: string, slug: string, icon?: LucideIcon): Item => ({
		href: `/${locale}/${group}/${slug}`,
		title: t(`items.${group}.${slug}.title`),
		description: t(`items.${group}.${slug}.description`),
		icon
	});

	const services = SERVICE_SLUGS.map((s) => item("services", s, SERVICE_ICONS[s]));
	const solutions = SOLUTION_SLUGS.map((s) => item("solutions", s, SOLUTION_ICONS[s]));
	const licenses = LICENSE_SLUGS.map((s) => item("licenses", s, LICENSE_ICONS[s]));
	const training = TRAINING_SLUGS.map((s) => item("training", s, TRAINING_ICONS[s]));
	const partners = PARTNER_SLUGS.map((s) => item("partners", s));
	const company: Item[] = [
		{ href: `/${locale}/company`, title: t("companyPage") },
		{ href: `/${locale}/customers`, title: t("clients") },
		{ href: `/${locale}/hire-us`, title: t("hireUs") },
		{ href: `/${locale}/career`, title: t("career") },
		{ href: `/${locale}/contact`, title: t("contactUs") }
	];

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
			>
				{t("skip")}
			</a>
			<div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-3xl border border-ink-foreground/10 bg-ink/70 pl-6 pr-2.5 shadow-[0_8px_40px_rgba(2,6,23,0.35)] backdrop-blur-xl">
				{/* Magic UI border beam as a train of 28 px squares, so the trail bends round the bar's ends. */}
				<BorderBeamTrain duration={10} />
				<Link href={`/${locale}`} aria-label={t("home")} className="shrink-0">
					<Image src="/logo.png" alt="ITHINK" width={1372} height={440} priority sizes="96px" className="h-7 w-auto dark:hidden" />
					<Image src="/logo-negative.png" alt="ITHINK" width={1372} height={440} loading="eager" fetchPriority="low" sizes="96px" className="h-7 w-auto hidden dark:block" />
				</Link>

				<nav aria-label={t("services")} className="hidden items-center gap-1 lg:flex">
					<Dropdown label={t("services")} wide>
						<div className="grid grid-cols-[1.6fr_1fr] gap-6">
							<ItemGrid items={services} />
							<div className="border-l border-border pl-6">
								<p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("solutions")}</p>
								<ItemList items={solutions} />
							</div>
						</div>
					</Dropdown>
					<Dropdown label={t("products")} wide>
						<div className="grid grid-cols-2 gap-6">
							<div>
								<p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("licenses")}</p>
								<ItemList items={licenses} />
							</div>
							<div>
								<p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("training")}</p>
								<ItemList items={training} />
							</div>
						</div>
					</Dropdown>
					<Dropdown label={t("partners")}>
						<div className="grid grid-cols-2 gap-1">
							{partners.map((p) => (
								<Link key={p.href} href={p.href} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent">
									{p.title}
								</Link>
							))}
						</div>
						<Link
							href={`/${locale}/partners`}
							className="mt-3 flex items-center gap-2 border-t border-border px-3 pt-3 text-sm font-semibold text-brand-text hover:underline"
						>
							<Handshake className="size-4" aria-hidden="true" />
							{t("allPartners")}
						</Link>
					</Dropdown>
					<Dropdown label={t("company")}>
						<div className="flex flex-col">
							{company.map((c) => (
								<Link key={c.href} href={c.href} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent">
									{c.title}
								</Link>
							))}
						</div>
					</Dropdown>
				</nav>

				<div className="flex items-center gap-1.5">
					<LocaleSwitch locale={locale} label={t("language")} className="hidden sm:flex" />
					<ThemeToggle labelDark={t("darkMode")} labelLight={t("lightMode")} />
					<Cta href={`/${locale}/contact`} size="sm" className="hidden sm:inline-flex">
						{t("consult")}
					</Cta>
					<MobileMenu openLabel={t("openMenu")} closeLabel={t("closeMenu")}>
						<MobileGroup title={t("services")} items={services} />
						<MobileGroup title={t("solutions")} items={solutions} />
						<MobileGroup title={t("licenses")} items={licenses} />
						<MobileGroup title={t("training")} items={training} />
						<MobileGroup title={t("partners")} items={[...partners, { href: `/${locale}/partners`, title: t("allPartners") }]} />
						<MobileGroup title={t("company")} items={company} />
						<div className="mt-4 flex items-center justify-between gap-3 border-t border-ink-foreground/10 pt-4">
							<LocaleSwitch locale={locale} label={t("language")} />
							<Cta href={`/${locale}/contact`} size="sm">
								{t("consult")}
							</Cta>
						</div>
					</MobileMenu>
				</div>
			</div>
		</header>
	);
}

/** Opens on hover and on focus-within, so it works with the keyboard and without JavaScript. */
function Dropdown({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
	return (
		<div className="group/dd relative">
			<button
				type="button"
				aria-haspopup="true"
				className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink-foreground/75 transition-colors hover:bg-ink-foreground/10 hover:text-ink-foreground group-focus-within/dd:text-ink-foreground"
			>
				{label}
				<ChevronDown className="size-3.5 opacity-70 transition-transform group-hover/dd:rotate-180" aria-hidden="true" />
			</button>
			<div
				className={cn(
					"invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200",
					"group-hover/dd:visible group-hover/dd:opacity-100 group-focus-within/dd:visible group-focus-within/dd:opacity-100",
					wide ? "w-[760px]" : "w-80"
				)}
			>
				<div className="rounded-2xl border border-border bg-popover p-4 text-popover-foreground shadow-[0_24px_60px_rgba(2,6,23,0.25)]">
					{children}
				</div>
			</div>
		</div>
	);
}

function ItemGrid({ items }: { items: Item[] }) {
	return (
		<div className="grid grid-cols-2 gap-1">
			{items.map((i) => (
				<Link key={i.href} href={i.href} className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-accent">
					{i.icon && (
						<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand-text">
							<i.icon className="size-[18px]" aria-hidden="true" />
						</span>
					)}
					<span>
						<span className="block text-sm font-semibold text-foreground">{i.title}</span>
						{i.description && <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{i.description}</span>}
					</span>
				</Link>
			))}
		</div>
	);
}

function ItemList({ items }: { items: Item[] }) {
	return (
		<div className="flex flex-col gap-1">
			{items.map((i) => (
				<Link key={i.href} href={i.href} className="group/item flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent">
					{i.icon && <i.icon className="size-4 shrink-0 text-brand-text" aria-hidden="true" />}
					<span className="text-sm font-medium text-foreground">{i.title}</span>
					<ArrowRight
						className="ml-auto size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover/item:opacity-100"
						aria-hidden="true"
					/>
				</Link>
			))}
		</div>
	);
}

function MobileGroup({ title, items }: { title: string; items: Item[] }) {
	return (
		<div className="border-b border-ink-foreground/10 py-3 last:border-0">
			<p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-ink-foreground/50">{title}</p>
			<div className="grid grid-cols-2 gap-x-2">
				{items.map((i) => (
					<Link key={i.href} href={i.href} className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink-foreground/85 hover:bg-ink-foreground/10">
						{i.title}
					</Link>
				))}
			</div>
		</div>
	);
}
