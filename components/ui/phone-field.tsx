"use client";

import type { InputHTMLAttributes } from "react";
import { PHONE_COUNTRIES, dialOf, flagOf, type PhoneCountry } from "@/lib/phone";
import { GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue } from "@/components/glassyui/glass-select";
import { cn } from "@/lib/utils";

interface PhoneFieldProps {
	id: string;
	country: PhoneCountry;
	onCountryChange: (country: PhoneCountry) => void;
	countryLabel: string;
	invalid?: boolean;
	inputProps: InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> };
}

/**
 * Country code and number in one recessed glass field, so it reads as a single field like the
 * others: `[🇺🇿 +998 ▾ | 90 123 45 67]`. The number is formatted by the caller. The outer box
 * borrows GlassyUI's `lg-input` look; the two controls inside are bare.
 */
export function PhoneField({ id, country, onCountryChange, countryLabel, invalid, inputProps }: PhoneFieldProps) {
	const placeholder = PHONE_COUNTRIES.find((c) => c.code === country)!.placeholder;

	return (
		<div
			className={cn(
				"lg-input flex items-center rounded-xl p-0 focus-within:bg-[var(--lg-control-surface-hover)] has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-brand",
				// The input inside carries aria-invalid; the box shows the same red ring lg-input uses.
				invalid && "border-[var(--lg-invalid)] shadow-[0_0_0_1px_var(--lg-invalid)]"
			)}
		>
			<GlassSelect value={country} onValueChange={(value) => value && onCountryChange(value as PhoneCountry)}>
				<GlassSelectTrigger
					aria-label={countryLabel}
					className="w-auto shrink-0 gap-1.5 rounded-l-xl rounded-r-none border-0 bg-transparent py-3 pl-4 pr-2 text-base font-medium shadow-none backdrop-blur-none sm:text-sm"
				>
					<span className="flex items-center gap-1.5">
						<GlassSelectValue>
							<span aria-hidden="true">{flagOf(country)}</span>+{dialOf(country)}
						</GlassSelectValue>
					</span>
				</GlassSelectTrigger>
				<GlassSelectContent align="start" className="glass-dense min-w-44">
					{PHONE_COUNTRIES.map((c) => (
						<GlassSelectItem key={c.code} value={c.code}>
							<span className="flex items-center gap-2">
								<span aria-hidden="true">{flagOf(c.code)}</span>
								<span>{c.code}</span>
								<span className="text-muted-foreground">+{c.dial}</span>
							</span>
						</GlassSelectItem>
					))}
				</GlassSelectContent>
			</GlassSelect>
			<span className="h-5 w-px shrink-0 bg-[var(--lg-border)]" aria-hidden="true" />
			<input
				id={id}
				type="tel"
				inputMode="tel"
				autoComplete="tel-national"
				placeholder={placeholder}
				{...inputProps}
				className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-[var(--lg-foreground)] placeholder:text-muted-foreground focus:outline-none sm:text-sm"
			/>
		</div>
	);
}
