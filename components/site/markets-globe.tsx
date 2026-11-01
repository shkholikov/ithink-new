"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import type { GlobeArc, GlobeMarker } from "@/components/ui/globe";

// COBE and WebGL load only on the client, after the page is interactive.
const Globe = dynamic(() => import("@/components/ui/globe").then((m) => m.Globe), {
	ssr: false,
	loading: () => <div className="mx-auto aspect-square w-full max-w-[520px]" />
});

const TASHKENT: [number, number] = [41.31, 69.24];
const CITIES: { id: string; location: [number, number]; side: GlobeMarker["side"] }[] = [
	{ id: "kz", location: [43.24, 76.89], side: "right" },
	{ id: "tj", location: [38.56, 68.77], side: "bottom" },
	{ id: "us", location: [29.76, -95.37], side: "top" }
];

const ARCS: GlobeArc[] = CITIES.map((c) => ({ id: `arc-${c.id}`, from: TASHKENT, to: c.location }));

/** The four markets on a rotating globe: Tashkent as home, arcs to Almaty, Dushanbe and Houston. */
export function MarketsGlobe({ labels, className }: { labels: { uz: string; kz: string; tj: string; us: string }; className?: string }) {
	const { uz, kz, tj, us } = labels;
	// Stable arrays: the globe rebuilds its WebGL context whenever these change.
	const markers = useMemo<GlobeMarker[]>(() => {
		const names = { kz, tj, us };
		return [{ id: "uz", location: TASHKENT, label: uz, home: true, side: "left" }, ...CITIES.map((c) => ({ ...c, label: names[c.id as keyof typeof names] }))];
	}, [uz, kz, tj, us]);
	return <Globe markers={markers} arcs={ARCS} className={className} />;
}
