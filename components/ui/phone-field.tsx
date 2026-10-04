"use client";

import type { InputHTMLAttributes } from "react";
import { PHONE_COUNTRIES, dialOf, flagOf, type PhoneCountry } from "@/lib/phone";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
 * Country code and number in one box, so it reads as a single field like the
 * others: `[🇺🇿 +998 ▾ | 90 123 45 67]`. The number is formatted by the caller.
 */
export function PhoneField({ id, country, onCountryChange, countryLabel, invalid, inputProps }: PhoneFieldProps) {
	const placeholder = PHONE_COUNTRIES.find((c) => c.code === country)!.placeholder;

	return (
		<div
			className={cn(
				"flex items-center w-full bg-background border rounded-xl transition-colors focus-within:border-[#377dff] focus-within:ring-2 focus-within:ring-[#377dff]/40",
				invalid ? "border-red-500/60" : "border-border"
			)}
		>
			<Select value={country} onValueChange={(value) => value && onCountryChange(value as PhoneCountry)}>
				<SelectTrigger
					aria-label={countryLabel}
					className="h-auto data-[size=default]:h-auto border-0 bg-transparent dark:bg-transparent dark:hover:bg-transparent rounded-l-xl rounded-r-none pl-4 pr-2 py-3 gap-1.5 text-sm font-medium focus-visible:ring-0"
				>
					<SelectValue>
						{(value: PhoneCountry) => (
							<span className="flex items-center gap-1.5">
								<span aria-hidden="true">{flagOf(value)}</span>+{dialOf(value)}
							</span>
						)}
					</SelectValue>
				</SelectTrigger>
				<SelectContent alignItemWithTrigger={false} align="start" className="rounded-xl min-w-44">
					{PHONE_COUNTRIES.map((c) => (
						<SelectItem key={c.code} value={c.code} className="py-2">
							<span aria-hidden="true">{flagOf(c.code)}</span>
							<span>{c.code}</span>
							<span className="text-muted-foreground">+{c.dial}</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<span className="w-px h-5 bg-border shrink-0" aria-hidden="true" />
			<input
				id={id}
				type="tel"
				inputMode="tel"
				autoComplete="tel-national"
				placeholder={placeholder}
				{...inputProps}
				className="flex-1 min-w-0 bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
			/>
		</div>
	);
}
