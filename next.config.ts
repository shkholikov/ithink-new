import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
	experimental: {
		// The root layout is app/[locale]/layout.tsx, so unmatched URLs need app/global-not-found.tsx.
		globalNotFound: true,
		optimizePackageImports: ["lucide-react", "@base-ui/react"]
	}
};

export default withNextIntl(nextConfig);
