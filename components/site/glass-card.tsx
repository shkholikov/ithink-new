import { cn } from "@/lib/utils";

type GlassCardProps<T extends React.ElementType> = {
	/** The element to render: a div by default, `Link` or `a` for clickable cards. */
	as?: T;
	/** GlassyUI material preset. `standard` for cards, `subtle` for quiet tiles, `prominent` for panels. */
	preset?: "subtle" | "standard" | "prominent";
	/** Brightens the surface a touch on hover (GlassyUI `interactive`). */
	interactive?: boolean;
	/** Blueprint grid that fades in on hover; the card needs the `group` class. */
	blueprint?: boolean;
	/** Grain layer. Turn it off where the element may hold only certain children (a dt/dd group in a dl). */
	noise?: boolean;
	className?: string;
	children?: React.ReactNode;
} & Omit<React.ComponentPropsWithRef<T>, "as" | "className" | "children">;

/**
 * GlassyUI glass as a server component: the same markup `GlassPanel` renders with the lens and
 * generated refraction off, so it costs no client JS and works on links. Use `GlassPanel` only where
 * the Chromium edge lens is wanted (hero showcase panels).
 *
 * Put text in an element (`<span>`), never as a bare child: GlassyUI lifts element children above the
 * frost layer, but a bare text node paints under it and comes out blurred.
 */
export function GlassCard<T extends React.ElementType = "div">({
	as,
	preset = "standard",
	interactive = false,
	blueprint = false,
	noise = true,
	className,
	children,
	...rest
}: GlassCardProps<T>) {
	const Component = (as ?? "div") as React.ElementType;
	return (
		<Component
			data-lg-generated-refraction="false"
			data-lg-interactive={interactive ? "true" : "false"}
			data-lg-preset={preset}
			data-lg-refraction="none"
			data-lg-refraction-background-space="local"
			className={cn("lg-glass-surface lg-panel--card", className)}
			{...rest}
		>
			{noise && <span className="lg-noise" aria-hidden="true" />}
			{blueprint && <span className="blueprint-layer" aria-hidden="true" />}
			{children}
		</Component>
	);
}
