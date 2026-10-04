"use client";

import type { InputHTMLAttributes } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { PHONE_COUNTRIES, type PhoneCountry } from "@/lib/phone";
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
 * others: `[☎ UZ +998 ▾ | 90 123 45 67]`. The number is formatted by the caller.
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
			<Phone className="ml-4 w-4 h-4 shrink-0 text-muted-foreground" aria-hidden="true" />
			<div className="relative shrink-0">
				<select
					aria-label={countryLabel}
					value={country}
					onChange={(e) => onCountryChange(e.target.value as PhoneCountry)}
					className="appearance-none bg-transparent pl-3 pr-7 py-3 text-sm font-medium text-foreground focus:outline-none cursor-pointer [&>option]:bg-background"
				>
					{PHONE_COUNTRIES.map((c) => (
						<option key={c.code} value={c.code}>
							{c.code} +{c.dial}
						</option>
					))}
				</select>
				<ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
			</div>
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
