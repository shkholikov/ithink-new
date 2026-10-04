"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Records the visitor's first-touch utm/click ids once per visit; renders nothing. */
export default function AttributionCapture() {
	useEffect(() => {
		captureAttribution();
	}, []);

	return null;
}
