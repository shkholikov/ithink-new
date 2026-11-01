import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

export const alt = "ITHINK — IT infrastructure, CRM and automation for business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered once per locale at build time.
export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

/** One share image for every page, rendered at build time. Latin text only: the bundled OG font has no Cyrillic. */
export default async function Image() {
	const logo = await readFile(path.join(process.cwd(), "public/logo-negative.png"));
	const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
	const tags = ["IT infrastructure", "CRM", "Automation", "Software", "Managed IT"];

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "72px 80px",
					backgroundColor: "#050a1c",
					backgroundImage:
						"radial-gradient(60% 60% at 10% 0%, rgba(55,125,255,0.45), transparent 70%), radial-gradient(45% 50% at 95% 30%, rgba(124,92,255,0.25), transparent 70%)",
					color: "white"
				}}
			>
				<img src={logoSrc} width={300} height={96} alt="" />
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, maxWidth: 900 }}>IT that works for your business growth</div>
					<div style={{ display: "flex", gap: 14, marginTop: 36 }}>
						{tags.map((t) => (
							<div
								key={t}
								style={{
									display: "flex",
									fontSize: 26,
									padding: "10px 22px",
									borderRadius: 999,
									border: "1px solid rgba(255,255,255,0.18)",
									backgroundColor: "rgba(255,255,255,0.06)",
									color: "#c9d6ff"
								}}
							>
								{t}
							</div>
						))}
					</div>
				</div>
				<div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a8b4cf" }}>
					<span>www.ithink.uz</span>
					<span>Tashkent · since 2020 · 50+ clients</span>
				</div>
			</div>
		),
		size
	);
}
