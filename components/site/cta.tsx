import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassButton, type ButtonSize, type ButtonVariant } from "@/components/glassyui/glass-button";
import { cn } from "@/lib/utils";

type CtaProps = {
	href: string;
	children: React.ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	arrow?: boolean;
	className?: string;
};

/**
 * The site's call-to-action link: a GlassyUI glass button rendered as a Next link.
 * `prominent` is the filled primary action, `ghost` the secondary one beside it.
 */
export function Cta({ href, children, variant = "prominent", size = "lg", arrow = false, className }: CtaProps) {
	const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
	const label = (
		<>
			{children}
			{arrow && <ArrowRight className="size-4" aria-hidden="true" />}
		</>
	);
	return (
		<GlassButton asChild variant={variant} size={size} className={cn("gap-2 font-semibold", className)}>
			{external ? (
				<a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
					{label}
				</a>
			) : (
				<Link href={href}>{label}</Link>
			)}
		</GlassButton>
	);
}

/** Two actions side by side, stacked on phones. */
export function CtaRow({ children, className }: { children: React.ReactNode; className?: string }) {
	return <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center", className)}>{children}</div>;
}
