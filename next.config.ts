import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// The lead form posts cross-origin; connect-src allows only that origin. A malformed value fails the build,
// because a CSP pointing at a different origin than LeadForm posts to would block every submission.
const leadOrigin = (() => {
	const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;
	if (!endpoint) return "https://miniapp.ithink.uz";
	try {
		return new URL(endpoint).origin;
	} catch {
		throw new Error(`NEXT_PUBLIC_LEAD_ENDPOINT is not a valid URL: "${endpoint}"`);
	}
})();

const isDev = process.env.NODE_ENV === "development";
// The Vercel toolbar runs on preview deployments only; production does not allow its origins.
const isPreview = process.env.VERCEL_ENV === "preview";
const toolbar = (...origins: string[]) => (isPreview ? ` ${origins.join(" ")}` : "");

// Pages are statically generated, so a per-request nonce is not possible; inline scripts stay allowed.
// Turnstile needs challenges.cloudflare.com.
const csp = [
	"default-src 'self'",
	`script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com${toolbar("https://vercel.live")}`,
	`style-src 'self' 'unsafe-inline'${toolbar("https://vercel.live")}`,
	`img-src 'self' data: blob:${toolbar("https://vercel.live", "https://vercel.com")}`,
	`font-src 'self' data:${toolbar("https://vercel.live", "https://assets.vercel.com")}`,
	`connect-src 'self' ${leadOrigin} https://challenges.cloudflare.com${toolbar("https://vercel.live", "wss://ws-us3.pusher.com")}`,
	`frame-src https://challenges.cloudflare.com${toolbar("https://vercel.live")}`,
	"frame-ancestors 'none'",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	// In dev it would rewrite http://<LAN IP>:3000 asset requests to https and break the page.
	...(isDev ? [] : ["upgrade-insecure-requests"])
].join("; ");

const securityHeaders = [
	{ key: "Content-Security-Policy", value: csp },
	// One year, www only: no includeSubDomains or preload, so http-only hosts on other subdomains stay reachable.
	{ key: "Strict-Transport-Security", value: "max-age=31536000" },
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" }
];

const nextConfig: NextConfig = {
	poweredByHeader: false,
	experimental: {
		// The root layout is app/[locale]/layout.tsx, so unmatched URLs need app/global-not-found.tsx.
		globalNotFound: true,
		optimizePackageImports: ["lucide-react", "@base-ui/react"]
	},
	async headers() {
		// Pages only: static chunks, optimized images and the favicon do not need a CSP.
		return [{ source: "/((?!_next/static|_next/image|favicon.ico).*)", headers: securityHeaders }];
	}
};

export default withNextIntl(nextConfig);
