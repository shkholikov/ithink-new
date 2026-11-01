import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// The lead form posts cross-origin; allow only that origin. Falls back to production when the env is unset.
const leadOrigin = (() => {
	try {
		return new URL(process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "").origin;
	} catch {
		return "https://miniapp.ithink.uz";
	}
})();

const isDev = process.env.NODE_ENV === "development";

// Pages are statically generated, so a per-request nonce is not possible; inline scripts stay allowed.
// Turnstile needs challenges.cloudflare.com; vercel.live is the toolbar on preview deployments.
const csp = [
	"default-src 'self'",
	`script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com https://vercel.live`,
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data: blob:",
	"font-src 'self' data:",
	`connect-src 'self' ${leadOrigin} https://challenges.cloudflare.com https://vercel.live`,
	"frame-src https://challenges.cloudflare.com https://vercel.live",
	"frame-ancestors 'none'",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"upgrade-insecure-requests"
].join("; ");

const securityHeaders = [
	{ key: "Content-Security-Policy", value: csp },
	{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "X-Frame-Options", value: "DENY" },
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
		return [{ source: "/:path*", headers: securityHeaders }];
	}
};

export default withNextIntl(nextConfig);
