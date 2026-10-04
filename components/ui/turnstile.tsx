"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

type TurnstileApi = {
	render: (el: HTMLElement, options: Record<string, unknown>) => string;
	reset: (widgetId: string) => void;
	remove: (widgetId: string) => void;
};

declare global {
	interface Window {
		turnstile?: TurnstileApi;
	}
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface TurnstileProps {
	locale: string;
	theme: "light" | "dark";
	onToken: (token: string | null) => void;
	/** Bump to discard the current token and show a fresh challenge (after a 403). */
	resetKey: number;
}

/**
 * Cloudflare Turnstile — the lead endpoint rejects any submission without a
 * valid token. The script loads only on pages that render a form.
 */
export function Turnstile({ locale, theme, onToken, resetKey }: TurnstileProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const widgetRef = useRef<string | null>(null);
	const onTokenRef = useRef(onToken);
	// The script may already be on the page from an earlier client navigation,
	// in which case <Script onLoad> does not fire again. It only gates an effect,
	// so reading window here cannot cause a hydration mismatch.
	const [loaded, setLoaded] = useState(() => typeof window !== "undefined" && !!window.turnstile);

	useEffect(() => {
		onTokenRef.current = onToken;
	});

	useEffect(() => {
		const el = containerRef.current;
		if (!loaded || !el || !window.turnstile || !SITE_KEY) return;
		const id = window.turnstile.render(el, {
			sitekey: SITE_KEY,
			theme,
			language: locale,
			size: "flexible",
			callback: (token: string) => onTokenRef.current(token),
			"expired-callback": () => onTokenRef.current(null),
			"error-callback": () => onTokenRef.current(null)
		});
		widgetRef.current = id;
		return () => {
			window.turnstile?.remove(id);
			widgetRef.current = null;
		};
	}, [loaded, locale, theme]);

	useEffect(() => {
		if (resetKey && widgetRef.current) {
			window.turnstile?.reset(widgetRef.current);
			onTokenRef.current(null);
		}
	}, [resetKey]);

	if (!SITE_KEY) {
		if (process.env.NODE_ENV !== "production") console.warn("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set — the lead form cannot be submitted.");
		return null;
	}

	return (
		<>
			<Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="lazyOnload" onLoad={() => setLoaded(true)} />
			<div ref={containerRef} className="min-h-[65px]" />
		</>
	);
}
