"use client";

/**
 * Last resort: this replaces the root layout when it is the layout itself that
 * failed, so it cannot rely on any provider, stylesheet or font from the app
 * and has to render its own <html> and <body>. Styles are inline for the same
 * reason — globals.css may be exactly what did not load.
 *
 * Deliberately English-only: if the layout is down, so is the i18n provider.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<html lang="en">
			<body
				style={{
					minHeight: "100vh",
					margin: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: "1rem",
					padding: "2rem",
					textAlign: "center",
					background: "#0d0d14",
					color: "#e2e8f0",
					fontFamily: "system-ui, -apple-system, sans-serif"
				}}
			>
				<h1 style={{ fontSize: "1.75rem", margin: 0, fontWeight: 700 }}>Something went wrong</h1>
				<p style={{ color: "#8892a4", margin: 0, maxWidth: "34rem", lineHeight: 1.6 }}>
					The page could not be loaded. Please try again, or contact us at{" "}
					<a href="mailto:team@ithink.uz" style={{ color: "#5b96ff" }}>
						team@ithink.uz
					</a>
					.
				</p>
				{error.digest && <p style={{ color: "#5c6b81", margin: 0, fontSize: "0.75rem" }}>Reference: {error.digest}</p>}
				<button
					type="button"
					onClick={reset}
					style={{
						marginTop: "0.5rem",
						background: "#377dff",
						color: "#fff",
						border: 0,
						borderRadius: "0.75rem",
						padding: "0.875rem 1.75rem",
						fontSize: "0.875rem",
						fontWeight: 600,
						cursor: "pointer"
					}}
				>
					Try again
				</button>
			</body>
		</html>
	);
}
