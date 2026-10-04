"use client";

import { useState } from "react";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Send, CheckCircle, ChevronDown } from "lucide-react";
import { useIsDark } from "@/hooks/use-is-dark";
import { getAttribution } from "@/lib/attribution";
import { Turnstile } from "@/components/ui/turnstile";
import { cn } from "@/lib/utils";
import {
	BUDGET_RANGES,
	LEAD_SERVICES,
	LeadFormSchema,
	formatPhone,
	normalizePhone,
	telegramLink,
	type LeadFormValues,
	type LeadService
} from "@/lib/lead";

const INPUT_CLASS =
	"w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:border-[#377dff] focus-visible:ring-2 focus-visible:ring-[#377dff]/40 transition-colors aria-[invalid=true]:border-red-500/60";

const ERROR_CLASS = "mt-1.5 text-xs text-red-600 dark:text-red-400";

/** Fields the endpoint can reject by name; anything else is shown as a form-level error. */
const FIELDS = ["service", "name", "phone", "email", "telegram", "budget", "description", "consent"] as const;

type ServerError = "captcha" | "rateLimited" | "unavailable" | "generic";

interface LeadFormProps {
	/** Preselects the service and hides the select — used on the service pages. */
	service?: LeadService;
	/** Shows the budget select (/hire-us). */
	showBudget?: boolean;
	/** Identifies the page in the Telegram deep link, e.g. `managed_it`. */
	pageTag: string;
	messageRows?: number;
}

/**
 * The one lead form on the site. Posts to the intake endpoint in ithink-miniapp,
 * which creates the amoCRM deal — so never point a dev build at the live URL and
 * submit: every submission is a real deal.
 */
export function LeadForm({ service, showBudget = false, pageTag, messageRows = 5 }: LeadFormProps) {
	const t = useTranslations("leadForm");
	const locale = useLocale();
	const isDark = useIsDark();
	const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
	const [serverError, setServerError] = useState<ServerError | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [resetKey, setResetKey] = useState(0);

	const {
		register,
		handleSubmit,
		setError,
		control,
		reset,
		formState: { errors }
	} = useForm<LeadFormValues>({
		resolver: zodResolver(LeadFormSchema),
		// "" leaves the select on its placeholder; the schema rejects it on submit.
		defaultValues: { service: service ?? ("" as LeadService), name: "", phone: "+998 ", email: "", telegram: "", budget: "", description: "", website: "" }
	});

	// useWatch rather than watch(): the React Compiler skips components that call watch().
	const [serviceValue, budgetValue] = useWatch({ control, name: ["service", "budget"] });

	const onSubmit = handleSubmit(async (values) => {
		const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;
		if (!endpoint || !token) {
			if (!endpoint) console.error("NEXT_PUBLIC_LEAD_ENDPOINT is not set.");
			setServerError(token ? "unavailable" : "captcha");
			return;
		}

		setStatus("sending");
		setServerError(null);

		const body = {
			service: values.service,
			name: values.name.trim(),
			phone: normalizePhone(values.phone),
			email: values.email?.trim() || undefined,
			telegram: values.telegram?.trim() || undefined,
			budget: values.budget || undefined,
			description: values.description.trim(),
			consent: true,
			locale,
			page_url: location.href,
			attribution: getAttribution(),
			event_id: crypto.randomUUID(),
			turnstile_token: token,
			website: values.website
		};

		let res: Response;
		try {
			res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
		} catch {
			setStatus("idle");
			setServerError("unavailable");
			return;
		}

		setStatus("idle");
		if (res.ok) {
			setStatus("success");
			reset();
			return;
		}

		// A token is single-use: whatever went wrong, the next attempt needs a new one.
		setResetKey((k) => k + 1);

		if (res.status === 400) {
			const data = await res.json().catch(() => null);
			const fieldErrors: Record<string, string[] | undefined> = data?.issues?.fieldErrors ?? {};
			let matched = false;
			for (const field of FIELDS) {
				if (fieldErrors[field]?.length) {
					setError(field as FieldPath<LeadFormValues>, { message: field });
					matched = true;
				}
			}
			if (fieldErrors.turnstile_token?.length) setServerError("captcha");
			else if (!matched) setServerError("generic");
		} else if (res.status === 403) {
			setServerError("captcha");
		} else if (res.status === 429) {
			setServerError("rateLimited");
		} else {
			setServerError("unavailable");
		}
	});

	if (status === "success") {
		return (
			<div role="status" className="flex flex-col items-center justify-center gap-3 py-12">
				<CheckCircle className="w-12 h-12 text-green-500" />
				<p className="text-foreground font-medium text-center">{t("success")}</p>
			</div>
		);
	}

	const fieldError = (name: (typeof FIELDS)[number]) => {
		const message = errors[name]?.message;
		return message ? (
			<p id={`${pageTag}-${name}-error`} className={ERROR_CLASS}>
				{t(`errors.${message}`)}
			</p>
		) : null;
	};

	const a11y = (name: (typeof FIELDS)[number]) => ({
		"aria-invalid": errors[name] ? true : undefined,
		"aria-describedby": errors[name] ? `${pageTag}-${name}-error` : undefined
	});

	const phone = register("phone");
	const offerTelegram = serverError === "rateLimited" || serverError === "unavailable";

	return (
		<form onSubmit={onSubmit} noValidate className="space-y-4">
			{!service && (
				<div>
					<label className="relative block">
						<span className="sr-only">{t("service")}</span>
						<select {...register("service")} {...a11y("service")} aria-required="true" className={cn(INPUT_CLASS, "appearance-none pr-10 [&>option]:text-foreground", !serviceValue && "text-muted-foreground")}>
							<option value="" disabled>
								{t("service")}
							</option>
							{LEAD_SERVICES.map((slug) => (
								<option key={slug} value={slug}>
									{t(`services.${slug}`)}
								</option>
							))}
						</select>
						<ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
					</label>
					{fieldError("service")}
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label className="block">
						<span className="sr-only">{t("name")}</span>
						<input type="text" autoComplete="name" placeholder={t("name")} {...register("name")} {...a11y("name")} className={INPUT_CLASS} />
					</label>
					{fieldError("name")}
				</div>
				<div>
					<label className="block">
						<span className="sr-only">{t("phone")}</span>
						<input
							type="tel"
							inputMode="tel"
							autoComplete="tel"
							placeholder={t("phone")}
							{...phone}
							onChange={(e) => {
								e.target.value = formatPhone(e.target.value);
								return phone.onChange(e);
							}}
							{...a11y("phone")}
							className={INPUT_CLASS}
						/>
					</label>
					{fieldError("phone")}
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div>
					<label className="block">
						<span className="sr-only">{t("email")}</span>
						<input type="email" autoComplete="email" placeholder={t("email")} {...register("email")} {...a11y("email")} className={INPUT_CLASS} />
					</label>
					{fieldError("email")}
				</div>
				<div>
					<label className="block">
						<span className="sr-only">{t("telegram")}</span>
						<input type="text" autoComplete="off" placeholder={t("telegram")} {...register("telegram")} {...a11y("telegram")} className={INPUT_CLASS} />
					</label>
					{fieldError("telegram")}
				</div>
			</div>

			{showBudget && (
				<div>
					<label className="relative block">
						<span className="sr-only">{t("budget")}</span>
						<select {...register("budget")} className={cn(INPUT_CLASS, "appearance-none pr-10 [&>option]:text-foreground", !budgetValue && "text-muted-foreground")}>
							<option value="" disabled>
								{t("budget")}
							</option>
							{BUDGET_RANGES.map((range) => (
								<option key={range} value={range}>
									{t(`budgets.${range}`)}
								</option>
							))}
						</select>
						<ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
					</label>
				</div>
			)}

			<div>
				<label className="block">
					<span className="sr-only">{t("description")}</span>
					<textarea
						placeholder={t("description")}
						rows={messageRows}
						{...register("description")}
						{...a11y("description")}
						className={cn(INPUT_CLASS, "resize-none")}
					/>
				</label>
				{fieldError("description")}
			</div>

			{/* Honeypot: invisible to people, filled in by naive bots. */}
			<div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
				<input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
			</div>

			<div>
				<label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
					<input type="checkbox" {...register("consent")} {...a11y("consent")} className="mt-0.5 w-4 h-4 shrink-0 accent-[#377dff]" />
					<span>
						{t.rich("consent", {
							link: (chunks) => (
								<a href={`/${locale}/privacy`} target="_blank" className="text-brand-text underline underline-offset-2 hover:no-underline">
									{chunks}
								</a>
							)
						})}
					</span>
				</label>
				{fieldError("consent")}
			</div>

			<Turnstile locale={locale} theme={isDark ? "dark" : "light"} onToken={setToken} resetKey={resetKey} />

			{serverError && (
				<div role="alert" className="text-sm text-red-600 dark:text-red-400">
					<p>{t(`errors.${serverError}`)}</p>
					{offerTelegram && (
						<a href={telegramLink(pageTag)} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-brand-text underline underline-offset-2">
							{t("telegramCta")}
						</a>
					)}
				</div>
			)}

			<button
				type="submit"
				disabled={status === "sending"}
				className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#377dff] hover:bg-[#2563eb] disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-[#377dff]/25"
			>
				<Send className="w-4 h-4" />
				{status === "sending" ? t("sending") : t("submit")}
			</button>

			<p className="text-xs text-muted-foreground text-center">
				{t.rich("telegramPrompt", {
					link: (chunks) => (
						<a href={telegramLink(pageTag)} target="_blank" rel="noopener noreferrer" className="text-brand-text hover:underline">
							{chunks}
						</a>
					)
				})}
			</p>
		</form>
	);
}
