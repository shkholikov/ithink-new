"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import type { LeadForm as LeadFormType } from "@/components/ui/lead-form";

const LeadForm = dynamic(() => import("@/components/ui/lead-form").then((mod) => mod.LeadForm), { ssr: false });

/**
 * Loads the lead form (zod, the phone field, Turnstile) only when it is 600 px from the viewport,
 * so pages that open on a hero do not pay for it up front. The placeholder holds the form's height
 * to keep the layout still while it loads.
 */
export function LazyLeadForm(props: ComponentProps<typeof LeadFormType>) {
	const ref = useRef<HTMLDivElement>(null);
	const [show, setShow] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShow(true);
					io.disconnect();
				}
			},
			{ rootMargin: "600px" }
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<div ref={ref} className="min-h-[540px]">
			{show && <LeadForm {...props} />}
		</div>
	);
}
