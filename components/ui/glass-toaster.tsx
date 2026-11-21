"use client";

import { useCallback, useState } from "react";
import {
	GlassToast,
	GlassToastAction,
	GlassToastClose,
	GlassToastDescription,
	GlassToastProvider,
	GlassToastTitle,
	GlassToastViewport
} from "@/components/glassyui/glass-toast";

type ToastInput = {
	title: string;
	description?: string;
	duration?: number;
	/** `altText` tells screen-reader users how to do the same without the button (Radix requirement). */
	action?: { label: string; altText: string; onClick: () => void };
	/** Errors are announced assertively; everything else politely. */
	tone?: "error" | "success";
};

type ToastItem = ToastInput & { id: number; open: boolean };

let nextId = 0;

/** A small toast queue for one component, rendered with GlassyUI's Radix-based toast. */
export function useGlassToasts() {
	const [items, setItems] = useState<ToastItem[]>([]);

	const show = useCallback((toast: ToastInput) => {
		setItems((list) => [...list, { ...toast, id: ++nextId, open: true }]);
	}, []);

	const close = useCallback((id: number) => {
		setItems((list) => list.map((t) => (t.id === id ? { ...t, open: false } : t)));
		// Leave the closing animation time to run before the toast leaves the DOM.
		setTimeout(() => setItems((list) => list.filter((t) => t.id !== id)), 400);
	}, []);

	return { items, show, close };
}

export function GlassToaster({
	items,
	close,
	closeLabel,
	label
}: {
	items: ToastItem[];
	close: (id: number) => void;
	closeLabel: string;
	/** Localised name screen readers use for each toast. */
	label: string;
}) {
	return (
		<GlassToastProvider swipeDirection="right" label={label}>
			{items.map((t) => (
				<GlassToast
					key={t.id}
					open={t.open}
					onOpenChange={(open) => !open && close(t.id)}
					duration={t.duration ?? 6000}
					type={t.tone === "error" ? "foreground" : "background"}
				>
					<div className="flex items-start gap-3">
						<div className="min-w-0 flex-1">
							<GlassToastTitle className={t.tone === "error" ? "text-red-700 dark:text-red-300" : undefined}>{t.title}</GlassToastTitle>
							{t.description && <GlassToastDescription>{t.description}</GlassToastDescription>}
							{t.action && (
								<GlassToastAction altText={t.action.altText} onClick={t.action.onClick} className="mt-3">
									{t.action.label}
								</GlassToastAction>
							)}
						</div>
						<GlassToastClose aria-label={closeLabel} />
					</div>
				</GlassToast>
			))}
			{/* Under the navbar on phones and tablets, where a bottom toast covers the form's submit button. */}
			<GlassToastViewport className="top-24 lg:top-auto lg:bottom-4" />
		</GlassToastProvider>
	);
}
