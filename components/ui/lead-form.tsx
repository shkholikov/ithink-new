"use client";

import { useId, useRef, useState } from "react";
import { Controller, useForm, useWatch, type Control, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Building2, Check, Layers, Plus, User, type LucideIcon } from "lucide-react";
import { GlassToaster, useGlassToasts } from "@/components/ui/glass-toaster";
import { useIsDark } from "@/hooks/use-is-dark";
import { getAttribution } from "@/lib/attribution";
import { DEFAULT_PHONE_COUNTRY, formatPhone, toE164, type PhoneCountry } from "@/lib/phone";
import { PhoneField } from "@/components/ui/phone-field";
import { GlassInput } from "@/components/glassyui/glass-input";
import { GlassTextarea } from "@/components/glassyui/glass-textarea";
import { GlassButton } from "@/components/glassyui/glass-button";
import { GlassSpinner } from "@/components/glassyui/glass-spinner";
import { GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue } from "@/components/glassyui/glass-select";
import { TURNSTILE_ENABLED, Turnstile } from "@/components/ui/turnstile";
import { cn } from "@/lib/utils";
import { COMPANY_SIZES, LEAD_SERVICES, LeadFormSchema, telegramLink, type LeadFormValues, type LeadService } from "@/lib/lead";

/* GlassyUI's lg-input carries the recessed glass, focus fill and aria-invalid ring; these size it and add the
   keyboard focus outline GlassyUI leaves out. */
const INPUT_CLASS =
	"rounded-xl px-4 py-3 text-base sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const LABEL_CLASS = "block text-sm font-medium text-foreground mb-2";
const ICON_CLASS = "pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 w-4 h-4 text-muted-foreground";
const ERROR_CLASS = "mt-1.5 text-xs text-red-600 dark:text-red-300";

/** Fields the endpoint can reject by name; anything else is shown as a form-level error. */
// In on-screen order: the first invalid one gets focus.
const FIELDS = ["name", "phone", "service", "company_size", "description"] as const;
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
	// Set synchronously, so two submits in the same tick (Enter plus click) cannot both send a lead.
	const busy = useRef(false);
	const [token, setToken] = useState<string | null>(null);
	const [resetKey, setResetKey] = useState(0);
	const [showComment, setShowComment] = useState(false);
	const toasts = useGlassToasts();

	const {
		register,
		handleSubmit,
		setError,
		setFocus,
		setValue,
		getValues,
		control,
		reset,
		formState: { errors }
	} = useForm<LeadFormValues>({
		resolver: zodResolver(LeadFormSchema),
		// Focus is set by onInvalid in on-screen order; react-hook-form would pick registration order (phone first).
		shouldFocusError: false,
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
		toasts.show({
			tone: "error",
			title: t(`errors.${error}`),
			duration: 8000,
			action: offerTelegram
				? { label: t("telegramCta"), altText: t("telegramAlt"), onClick: () => window.open(telegramLink(pageTag), "_blank", "noopener") }
				: undefined
		});
	};

	const focusFirst = (invalid: Partial<Record<string, unknown>>) => {
		const first = FIELDS.find((f) => invalid[f]);
		if (first) setFocus(first);
	};

	const finish = (next: "idle" | "sent") => {
		setStatus(next);
		if (next === "idle") busy.current = false;
	};

	const send = async (values: LeadFormValues) => {
		if (busy.current) return;
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

		busy.current = true;
		setStatus("sending");

		// Building the body can throw too (crypto.randomUUID is missing on plain-http origins and
		// old WebViews), so it sits in the same try as the request: the button must never stay on "sending".
		let res: Response;
		try {
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
			res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
		} catch (error) {
			console.error("Lead request failed before a response:", error);
			// The server may have verified the token before the connection failed; get a fresh one.
			setResetKey((k) => k + 1);
			finish("idle");
			showError("unavailable");
			return;
		}

		// A token is single-use: the next submission, failed or not, needs a new one.
		setResetKey((k) => k + 1);

		if (res.ok) {
			toasts.show({ tone: "success", title: t("successTitle"), description: t("successBody"), duration: 6000 });
			// Clear the form in place for a possible second request; keep the country and the service.
			reset({ ...getValues(), name: "", phone: "", company_size: "", description: "", website: "" });
			setShowComment(false);
			finish("sent");
			setTimeout(() => finish("idle"), 3000);
			return;
		}

		finish("idle");

		if (res.status === 400) {
			const data = await res.json().catch(() => null);
			console.error("Lead rejected:", res.status, data);
			const fieldErrors: Record<string, string[] | undefined> = data?.issues?.fieldErrors ?? {};
			let matched = false;
			let focused = false;
			for (const field of FIELDS) {
				if (fieldErrors[field]?.length) {
					setError(field as FieldPath<LeadFormValues>, { message: field }, { shouldFocus: !focused });
					focused = true;
					if (field === "description") setShowComment(true);
					// On service pages the service is a fixed chip with no error slot: fall back to the toast.
					if (!(field === "service" && service)) matched = true;
				}
			}
			// Without a widget on the page the visitor cannot pass a captcha: that is a setup problem, not theirs.
			if (fieldErrors.turnstile_token?.length) showError(TURNSTILE_ENABLED ? "captcha" : "unavailable");
			else if (!matched) showError("generic");
		} else if (res.status === 403) {
			console.error("Lead rejected:", res.status);
			showError(TURNSTILE_ENABLED ? "captcha" : "unavailable");
		} else if (res.status === 429) {
			showError("rateLimited");
		} else {
			console.error("Lead rejected:", res.status);
			showError("unavailable");
		}
	};

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

	const submitContent = {
		idle: (
			<>
				{t("submit")}
				<ArrowRight className="size-4 shrink-0" aria-hidden="true" />
			</>
		),
		sending: (
			<>
				{t("sending")}
				<GlassSpinner size="sm" aria-hidden="true" />
			</>
		),
		sent: (
			<>
				{t("sent")}
				<Check className="size-4" aria-hidden="true" />
			</>
		)
	}[status];

	return (
		<>
			{/* Mounted here, not in the layout, so the toast code only loads on pages with a form.
			    Outside the <form> so its live region does not take a row gap. */}
			<GlassToaster items={toasts.items} close={toasts.close} closeLabel={t("closeToast")} label={t("toastLabel")} />
			<form onSubmit={(e) => handleSubmit(send, focusFirst)(e)} noValidate className="flex flex-col gap-5">
				{service && <span className="tag">{t(`services.${service}`)}</span>}

				<div>
					<label htmlFor={id("name")} className={LABEL_CLASS}>
						{t("nameLabel")}
					</label>
					<div className="relative">
						<User className={ICON_CLASS} aria-hidden="true" />
						<GlassInput
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
						{...a11y("company_size")}
					/>
					{fieldError("company_size")}
				</div>

				{showComment ? (
					<div>
						<label htmlFor={id("description")} className={LABEL_CLASS}>
							{t("commentLabel")}
							{optional}
						</label>
						<GlassTextarea
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
						className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-brand-text hover:underline underline-offset-2"
					>
						<Plus className="w-4 h-4" />
						{t("addComment")}
					</button>
				)}

				{/* Honeypot: invisible to people, filled in by naive bots. */}
				<div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
					<input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
				</div>

				{/* In interaction-only mode the widget is usually 0px tall; -mt-5 cancels its row gap so it
				    leaves no empty band above the button. Flex gap, not space-y: v4's space-y margins collapse
				    through this empty box and the button would touch the comment field. */}
				<div className="-mt-5">
					<Turnstile locale={locale} theme={isDark ? "dark" : "light"} onToken={setToken} resetKey={resetKey} />
				</div>

				<div className="space-y-3">
					<GlassButton
						type="submit"
						variant="prominent"
						size="lg"
						// aria-disabled, not disabled: a disabled button drops keyboard focus to <body> when a request fails.
						// The busy ref blocks repeat submits.
						aria-disabled={status !== "idle"}
						aria-busy={status === "sending"}
						className={cn("w-full gap-2 font-semibold text-balance max-sm:px-5 max-sm:text-base", status === "sending" && "cursor-progress opacity-80")}
					>
						{submitContent}
					</GlassButton>
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

/** GlassyUI select bound to the form, styled to match the text inputs. */
function FormSelect({ control, name, id, icon: Icon, placeholder, items, onValue, ...aria }: FormSelectProps) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<GlassSelect
					// Radix shows the placeholder for "", so a form reset clears the select too (undefined would
					// make it uncontrolled and keep the last choice).
					value={field.value ?? ""}
					onValueChange={(value) => {
						field.onChange(value);
						onValue?.(value);
					}}
				>
					<GlassSelectTrigger id={id} ref={field.ref} onBlur={field.onBlur} {...aria} className={INPUT_CLASS}>
						<span className="flex min-w-0 items-center gap-3">
							<Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
							<span className="truncate">
								<GlassSelectValue placeholder={placeholder} />
							</span>
						</span>
					</GlassSelectTrigger>
					<GlassSelectContent collisionPadding={16} className="glass-dense max-w-[calc(100vw-2rem)]">
						{items.map((item) => (
							<GlassSelectItem key={item.value} value={item.value}>
								{item.label}
							</GlassSelectItem>
						))}
					</GlassSelectContent>
				</GlassSelect>
			)}
		/>
	);
}
