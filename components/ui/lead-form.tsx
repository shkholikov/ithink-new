"use client";

import { useId, useState } from "react";
import { Controller, useForm, useWatch, type Control, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Building2, Check, Layers, Plus, User, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useIsDark } from "@/hooks/use-is-dark";
import { getAttribution } from "@/lib/attribution";
import { DEFAULT_PHONE_COUNTRY, formatPhone, toE164, type PhoneCountry } from "@/lib/phone";
import { PhoneField } from "@/components/ui/phone-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TURNSTILE_ENABLED, Turnstile } from "@/components/ui/turnstile";
import { cn } from "@/lib/utils";
import { COMPANY_SIZES, LEAD_SERVICES, LeadFormSchema, telegramLink, type LeadFormValues, type LeadService } from "@/lib/lead";

const INPUT_CLASS =
	"w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:border-[#377dff] focus-visible:ring-2 focus-visible:ring-[#377dff]/40 transition-colors aria-[invalid=true]:border-red-500/60";
const LABEL_CLASS = "block text-sm font-medium text-foreground mb-2";
const ICON_CLASS = "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground";
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
	const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
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
	const phoneCountry = useWatch({ control, name: "phone_country" });

	// Request-level failures go to a toast; field errors stay under their fields.
	const showError = (error: ServerError) => {
		const offerTelegram = error === "rateLimited" || error === "unavailable";
		toast.error(t(`errors.${error}`), {
			duration: 8000,
			action: offerTelegram ? { label: t("telegramCta"), onClick: () => window.open(telegramLink(pageTag), "_blank", "noopener") } : undefined
		});
	};

	const onSubmit = handleSubmit(async (values) => {
		const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;
		if (!endpoint) {
			console.error("NEXT_PUBLIC_LEAD_ENDPOINT is not set.");
			showError("unavailable");
			return;
		}
		if (TURNSTILE_ENABLED && !token) {
			showError("captcha");
			return;
		}

		setStatus("sending");

		const body = {
			service: values.service,
			name: values.name.trim(),
			// The schema has already checked it is valid for the chosen country.
			phone: toE164(values.phone, values.phone_country),
			company_size: values.company_size || undefined,
			description: values.description?.trim() || undefined,
			locale,
			page_url: location.href,
			attribution: getAttribution(),
			event_id: crypto.randomUUID(),
			turnstile_token: token ?? undefined,
			website: values.website
		};

		let res: Response;
		try {
			res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
		} catch {
			setStatus("idle");
			showError("unavailable");
			return;
		}

		// A token is single-use: the next submission, failed or not, needs a new one.
		setResetKey((k) => k + 1);

		if (res.ok) {
			toast.success(t("successTitle"), { description: t("successBody"), duration: 6000 });
			// Clear the form in place for a possible second request; keep the country.
			reset({ ...getValues(), name: "", phone: "", company_size: "", description: "", website: "" });
			setShowComment(false);
			setStatus("sent");
			setTimeout(() => setStatus("idle"), 3000);
			return;
		}

		setStatus("idle");

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
			if (fieldErrors.turnstile_token?.length) showError("captcha");
			else if (!matched) showError("generic");
		} else if (res.status === 403) {
			showError("captcha");
		} else if (res.status === 429) {
			showError("rateLimited");
		} else {
			showError("unavailable");
		}
	});

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

	return (
		<>
			{/* Mounted here, not in the layout, so sonner only loads on pages with a form.
			    Outside the <form> so its live region does not take a row gap. */}
			<Toaster position="bottom-right" closeButton />
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
						<FormSelect
							control={control}
							name="service"
							id={id("service")}
							icon={Layers}
							placeholder={t("selectPlaceholder")}
							items={LEAD_SERVICES.map((slug) => ({ value: slug, label: t(`services.${slug}`) }))}
							// "Other" says nothing about the need, so open the comment field for it.
							onValue={(value) => value === "other" && setShowComment(true)}
							{...a11y("service")}
						/>
						{fieldError("service")}
					</div>
				)}

				<div>
					<label htmlFor={id("company_size")} className={LABEL_CLASS}>
						{t("companySizeLabel")}
						{optional}
					</label>
					<FormSelect
						control={control}
						name="company_size"
						id={id("company_size")}
						icon={Building2}
						placeholder={t("selectPlaceholder")}
						items={COMPANY_SIZES.map((size) => ({ value: size, label: t(`companySizes.${size}`) }))}
					/>
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

				{/* In interaction-only mode the widget is usually 0px tall; -mt-5 cancels the
				    form's row gap so it does not leave an empty band above the button. */}
				<div className="-mt-5">
					<Turnstile locale={locale} theme={isDark ? "dark" : "light"} onToken={setToken} resetKey={resetKey} />
				</div>

				<div className="space-y-3">
					<button
						type="submit"
						disabled={status !== "idle"}
						data-sending={status === "sending"}
						className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#377dff] hover:bg-[#2563eb] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-[#377dff]/30 hover:shadow-lg hover:shadow-[#377dff]/40 hover:scale-[1.02] data-[sending=true]:opacity-60 disabled:hover:scale-100"
					>
						{status === "sent" ? (
							<>
								{t("sent")}
								<Check className="w-4 h-4" />
							</>
						) : (
							<>
								{status === "sending" ? t("sending") : t("submit")}
								<ArrowRight className="w-4 h-4" />
							</>
						)}
					</button>
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
		</>
	);
}

interface FormSelectProps {
	control: Control<LeadFormValues>;
	name: "service" | "company_size";
	id: string;
	icon: LucideIcon;
	placeholder: string;
	items: { value: string; label: string }[];
	onValue?: (value: string) => void;
	"aria-invalid"?: boolean;
	"aria-describedby"?: string;
}

/** shadcn Select bound to the form, styled to match the text inputs. */
function FormSelect({ control, name, id, icon: Icon, placeholder, items, onValue, ...aria }: FormSelectProps) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<Select
					value={field.value || null}
					onValueChange={(value) => {
						field.onChange(value ?? "");
						onValue?.(value ?? "");
					}}
					items={Object.fromEntries(items.map((item) => [item.value, item.label]))}
				>
					<SelectTrigger
						id={id}
						ref={field.ref}
						onBlur={field.onBlur}
						{...aria}
						className="w-full h-auto data-[size=default]:h-auto gap-3 px-4 py-3 rounded-xl border-border bg-background dark:bg-background dark:hover:bg-background text-sm text-foreground focus-visible:border-[#377dff] focus-visible:ring-2 focus-visible:ring-[#377dff]/40 aria-invalid:border-red-500/60 aria-invalid:ring-0"
					>
						<Icon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
					<SelectContent alignItemWithTrigger={false} className="rounded-xl">
						{items.map((item) => (
							<SelectItem key={item.value} value={item.value} className="py-2">
								{item.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		/>
	);
}
