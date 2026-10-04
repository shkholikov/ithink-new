"use client";

import { useId, useState } from "react";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Building2, CheckCircle, ChevronDown, Layers, Plus, User } from "lucide-react";
import { useIsDark } from "@/hooks/use-is-dark";
import { getAttribution } from "@/lib/attribution";
import { DEFAULT_PHONE_COUNTRY, formatPhone, toE164, type PhoneCountry } from "@/lib/phone";
import { PhoneField } from "@/components/ui/phone-field";
import { Turnstile } from "@/components/ui/turnstile";
import { cn } from "@/lib/utils";
import { COMPANY_SIZES, LEAD_SERVICES, LeadFormSchema, telegramLink, type LeadFormValues, type LeadService } from "@/lib/lead";

const INPUT_CLASS =
	"w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:border-[#377dff] focus-visible:ring-2 focus-visible:ring-[#377dff]/40 transition-colors aria-[invalid=true]:border-red-500/60";
const SELECT_CLASS = `${INPUT_CLASS} appearance-none pl-11 pr-10 cursor-pointer [&>option]:text-foreground`;
const LABEL_CLASS = "block text-sm font-medium text-foreground mb-2";
const ICON_CLASS = "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground";
const CHEVRON_CLASS = "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground";
const ERROR_CLASS = "mt-1.5 text-xs text-red-600 dark:text-red-400";

/** Fields the endpoint can reject by name; anything else is shown as a form-level error. */
const FIELDS = ["service", "name", "phone", "company_size", "description"] as const;
type Field = (typeof FIELDS)[number];

type ServerError = "captcha" | "rateLimited" | "unavailable" | "generic";

interface LeadFormProps {
	/** Preselects the service: the select is replaced by a chip naming it (service pages). */
	service?: LeadService;
	/** Identifies the page in the Telegram deep link, e.g. `managed_it`. */
	pageTag: string;
}

/**
 * The one lead form on the site. Posts to the intake endpoint in ithink-miniapp,
 * which creates the amoCRM deal — so never point a dev build at the live URL and
 * submit: every submission is a real deal.
 */
export function LeadForm({ service, pageTag }: LeadFormProps) {
	const t = useTranslations("leadForm");
	const locale = useLocale();
	const isDark = useIsDark();
	const uid = useId();
	const id = (field: string) => `${uid}-${field}`;
	const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
	const [serverError, setServerError] = useState<ServerError | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [resetKey, setResetKey] = useState(0);
	const [showComment, setShowComment] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		getValues,
		control,
		reset,
		formState: { errors }
	} = useForm<LeadFormValues>({
		resolver: zodResolver(LeadFormSchema),
		// "" leaves a select on its placeholder; the schema rejects an empty service on submit.
		defaultValues: {
			service: service ?? ("" as LeadService),
			name: "",
			phone_country: DEFAULT_PHONE_COUNTRY,
			phone: "",
			company_size: "",
			description: "",
			website: ""
		}
	});

	// useWatch rather than watch(): the React Compiler skips components that call watch().
	const [serviceValue, companySize, phoneCountry] = useWatch({ control, name: ["service", "company_size", "phone_country"] });

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
			// The schema has already checked it is valid for the chosen country.
			phone: toE164(values.phone, values.phone_country),
			company_size: values.company_size || undefined,
			description: values.description?.trim() || undefined,
			// Clicking the button is the consent; the note under it says so.
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

	const fieldError = (name: Field) => {
		const message = errors[name]?.message;
		return message ? (
			<p id={id(`${name}-error`)} className={ERROR_CLASS}>
				{t(`errors.${message}`)}
			</p>
		) : null;
	};

	const a11y = (name: Field) => ({
		"aria-invalid": errors[name] ? true : undefined,
		"aria-describedby": errors[name] ? id(`${name}-error`) : undefined
	});

	const optional = <span className="font-normal text-muted-foreground"> ({t("optional")})</span>;

	const phone = register("phone");
	const offerTelegram = serverError === "rateLimited" || serverError === "unavailable";

	return (
		<form onSubmit={onSubmit} noValidate className="space-y-5">
			{service && (
				<span className="inline-flex text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full border border-border">
					{t(`services.${service}`)}
				</span>
			)}

			<div>
				<label htmlFor={id("name")} className={LABEL_CLASS}>
					{t("nameLabel")}
				</label>
				<div className="relative">
					<User className={ICON_CLASS} aria-hidden="true" />
					<input
						id={id("name")}
						type="text"
						autoComplete="name"
						placeholder={t("namePlaceholder")}
						{...register("name")}
						{...a11y("name")}
						className={cn(INPUT_CLASS, "pl-11")}
					/>
				</div>
				{fieldError("name")}
			</div>

			<div>
				<label htmlFor={id("phone")} className={LABEL_CLASS}>
					{t("phoneLabel")}
				</label>
				<PhoneField
					id={id("phone")}
					country={phoneCountry as PhoneCountry}
					countryLabel={t("countryLabel")}
					onCountryChange={(country) => {
						setValue("phone_country", country);
						setValue("phone", formatPhone(getValues("phone"), country));
					}}
					invalid={!!errors.phone}
					inputProps={{
						...phone,
						...a11y("phone"),
						onChange: (e) => {
							e.target.value = formatPhone(e.target.value, phoneCountry as PhoneCountry);
							return phone.onChange(e);
						}
					}}
				/>
				{fieldError("phone")}
			</div>

			{!service && (
				<div>
					<label htmlFor={id("service")} className={LABEL_CLASS}>
						{t("serviceLabel")}
					</label>
					<div className="relative">
						<Layers className={ICON_CLASS} aria-hidden="true" />
						<select
							id={id("service")}
							{...register("service")}
							{...a11y("service")}
							aria-required="true"
							className={cn(SELECT_CLASS, !serviceValue && "text-muted-foreground")}
						>
							<option value="" disabled>
								{t("selectPlaceholder")}
							</option>
							{LEAD_SERVICES.map((slug) => (
								<option key={slug} value={slug}>
									{t(`services.${slug}`)}
								</option>
							))}
						</select>
						<ChevronDown className={CHEVRON_CLASS} aria-hidden="true" />
					</div>
					{fieldError("service")}
				</div>
			)}

			<div>
				<label htmlFor={id("company_size")} className={LABEL_CLASS}>
					{t("companySizeLabel")}
					{optional}
				</label>
				<div className="relative">
					<Building2 className={ICON_CLASS} aria-hidden="true" />
					<select id={id("company_size")} {...register("company_size")} className={cn(SELECT_CLASS, !companySize && "text-muted-foreground")}>
						<option value="">{t("selectPlaceholder")}</option>
						{COMPANY_SIZES.map((size) => (
							<option key={size} value={size}>
								{t(`companySizes.${size}`)}
							</option>
						))}
					</select>
					<ChevronDown className={CHEVRON_CLASS} aria-hidden="true" />
				</div>
			</div>

			{showComment ? (
				<div>
					<label htmlFor={id("description")} className={LABEL_CLASS}>
						{t("commentLabel")}
						{optional}
					</label>
					<textarea
						id={id("description")}
						rows={3}
						autoFocus
						placeholder={t("commentPlaceholder")}
						{...register("description")}
						{...a11y("description")}
						className={cn(INPUT_CLASS, "resize-none")}
					/>
					{fieldError("description")}
				</div>
			) : (
				<button
					type="button"
					onClick={() => setShowComment(true)}
					className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-text hover:underline underline-offset-2"
				>
					<Plus className="w-4 h-4" />
					{t("addComment")}
				</button>
			)}

			{/* Honeypot: invisible to people, filled in by naive bots. */}
			<div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
				<input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
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

			<div className="space-y-3">
				<button
					type="submit"
					disabled={status === "sending"}
					className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#377dff] hover:bg-[#2563eb] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-[#377dff]/30 hover:shadow-lg hover:shadow-[#377dff]/40 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
				>
					{status === "sending" ? t("sending") : t("submit")}
					<ArrowRight className="w-4 h-4" />
				</button>

				<p className="text-xs text-muted-foreground text-center leading-relaxed">
					{t.rich("consentNote", {
						link: (chunks) => (
							<a href={`/${locale}/privacy`} target="_blank" className="text-brand-text underline underline-offset-2 hover:no-underline">
								{chunks}
							</a>
						)
					})}
				</p>
			</div>

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
