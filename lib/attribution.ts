/**
 * First-touch ad attribution for lead forms.
 *
 * The visitor usually lands from an ad on one page and submits a form several
 * pages (or days) later, by which time the utm_* parameters are long gone from
 * the URL. The first visit's parameters are stored for 30 days and sent with
 * every lead, so amoCRM can tell which campaign brought the deal in.
 *
 * First touch wins: a later visit never overwrites the stored values until they
 * expire. Storage can be unavailable (private mode, blocked site data), so every
 * access is guarded and a failure only means the lead goes in without it.
 */

const STORAGE_KEY = "ithink_attribution";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"] as const;

export type Attribution = Partial<Record<(typeof PARAMS)[number], string>> & {
	referrer?: string;
	landing_page?: string;
};

type Stored = { capturedAt: number; data: Attribution };

function read(): Stored | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const stored = JSON.parse(raw) as Stored;
		return Date.now() - stored.capturedAt < TTL_MS ? stored : null;
	} catch {
		return null;
	}
}

/** Referrer only when it is another site — internal navigation is not a source. */
function externalReferrer(): string | undefined {
	try {
		const ref = document.referrer;
		if (!ref) return undefined;
		return new URL(ref).host === location.host ? undefined : ref.slice(0, 2000);
	} catch {
		return undefined;
	}
}

export function captureAttribution() {
	if (read()) return;

	const params = new URLSearchParams(location.search);
	const data: Attribution = { landing_page: location.href.slice(0, 2000) };
	for (const key of PARAMS) {
		const value = params.get(key)?.trim();
		if (value) data[key] = value.slice(0, 500);
	}
	const referrer = externalReferrer();
	if (referrer) data.referrer = referrer;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ capturedAt: Date.now(), data } satisfies Stored));
	} catch {
		// Storage unavailable — the lead is still sent, just without attribution.
	}
}

export function getAttribution(): Attribution | undefined {
	return read()?.data;
}
