"use client"

/**
 * Adapted from @cult-ui/globe (DefaultShowcaseGlobe). Kept: the COBE canvas, drag with inertia,
 * auto-rotation and the pause when off-screen. Removed: the 13 demo presets, the motion dependency
 * and the CSS colour probing; two fixed palettes follow the site theme.
 *
 * Scroll cost: markers and arcs go to COBE without ids, because with ids COBE rewrites a :root
 * style tag every frame and the whole page recalculates style. Labels are placed here with
 * transforms instead (compositor only). The buffer is size × DPR (max 1.5), and drawing pauses
 * while the page scrolls or the globe is off-screen. The WebGL context is created once.
 */

import * as React from "react"
import createGlobe from "cobe"

import { cn } from "@/lib/utils"
import { useIsDark } from "@/hooks/use-is-dark"

export type GlobeMarker = { id: string; location: [number, number]; label: string; home?: boolean; side?: "top" | "bottom" | "left" | "right" }
export type GlobeArc = { id: string; from: [number, number]; to: [number, number] }

type CobeHandle = { update: (state: Record<string, unknown>) => void; destroy: () => void }

// Offset of a label from its marker, applied after the marker translate.
const SIDE: Record<NonNullable<GlobeMarker["side"]>, string> = {
	top: "translate(-50%, calc(-100% - 6px))",
	bottom: "translate(-50%, 6px)",
	left: "translate(calc(-100% - 8px), -50%)",
	right: "translate(8px, -50%)"
}

/** COBE's projection: [lat, lng] to a point on the unit sphere. */
function toSphere([lat, lng]: [number, number]): [number, number, number] {
	const r = (lat * Math.PI) / 180
	const a = (lng * Math.PI) / 180 - Math.PI
	const o = Math.cos(r)
	return [-o * Math.cos(a), Math.sin(r), o * Math.sin(a)]
}

/** COBE's screen mapping for scale 1, no offset: fractions of the canvas box, and whether the point faces the viewer. */
function project(p: [number, number, number], phi: number, theta: number) {
	const ct = Math.cos(theta), cp = Math.cos(phi), st = Math.sin(theta), sp = Math.sin(phi)
	const x = cp * p[0] + sp * p[2]
	const y = sp * st * p[0] + ct * p[1] - cp * st * p[2]
	const z = -sp * ct * p[0] + st * p[1] + cp * ct * p[2]
	return { x: (x + 1) / 2, y: (-y + 1) / 2, visible: z >= 0 || x * x + y * y >= 0.64 }
}

export function Globe({
	markers,
	arcs,
	size = 520,
	focus = [41.3, 69.24],
	className
}: {
	markers: GlobeMarker[]
	arcs: GlobeArc[]
	size?: number
	/** [lat, lng] turned towards the viewer on first paint. Defaults to Tashkent. */
	focus?: [number, number]
	className?: string
}) {
	const canvasRef = React.useRef<HTMLCanvasElement>(null)
	const rootRef = React.useRef<HTMLDivElement>(null)
	// Built once, on first approach; afterwards the loop only pauses while off-screen.
	const [started, setStarted] = React.useState(false)
	const visible = React.useRef(false)
	const isDark = useIsDark()
	// Longitude to phi: COBE puts phi 0 at longitude -90.
	const startPhi = -((focus[1] + 90) * Math.PI) / 180
	const phi = React.useRef(startPhi)
	const drag = React.useRef<{ x: number; y: number } | null>(null)
	const offset = React.useRef({ phi: 0, theta: 0 })
	const dragDelta = React.useRef({ phi: 0, theta: 0 })
	const velocity = React.useRef(0)
	const lastX = React.useRef<{ x: number; t: number } | null>(null)
	const labelRefs = React.useRef<(HTMLSpanElement | null)[]>([])

	React.useEffect(() => {
		const el = rootRef.current
		if (!el) return
		const io = new IntersectionObserver(
			([e]) => {
				visible.current = e.isIntersecting
				if (e.isIntersecting) setStarted(true)
			},
			{ rootMargin: "120px" }
		)
		io.observe(el)
		return () => io.disconnect()
	}, [])

	React.useEffect(() => {
		const move = (e: PointerEvent) => {
			if (!drag.current) return
			dragDelta.current = { phi: (e.clientX - drag.current.x) / 300, theta: (e.clientY - drag.current.y) / 1000 }
			const now = performance.now()
			if (lastX.current) velocity.current = Math.max(-0.12, Math.min(0.12, ((e.clientX - lastX.current.x) / Math.max(now - lastX.current.t, 1)) * 0.3))
			lastX.current = { x: e.clientX, t: now }
		}
		const up = () => {
			if (!drag.current) return
			offset.current.phi += dragDelta.current.phi
			offset.current.theta = Math.max(-0.4, Math.min(0.4, offset.current.theta + dragDelta.current.theta))
			dragDelta.current = { phi: 0, theta: 0 }
			drag.current = null
			lastX.current = null
			if (canvasRef.current) canvasRef.current.style.cursor = "grab"
		}
		window.addEventListener("pointermove", move, { passive: true })
		window.addEventListener("pointerup", up, { passive: true })
		// touch-pan-y: a vertical swipe scrolls the page and the browser cancels the drag.
		window.addEventListener("pointercancel", up, { passive: true })
		return () => {
			window.removeEventListener("pointermove", move)
			window.removeEventListener("pointerup", up)
			window.removeEventListener("pointercancel", up)
		}
	}, [])

	React.useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas || !started) return
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
		// COBE multiplies width by devicePixelRatio, so width is in CSS pixels.
		const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
		const cobeMarkers = markers.map((mk) => ({ location: mk.location, size: mk.home ? 0.06 : 0.035 }))
		const cobeArcs = arcs.map((a) => ({ from: a.from, to: a.to }))
		const points = markers.map((mk) => toSphere(mk.location).map((v) => v * 0.82) as [number, number, number])
		const shown = markers.map(() => false)
		let box = canvas.clientWidth
		const ro = new ResizeObserver(() => (box = canvas.clientWidth))
		ro.observe(canvas)
		let lastScroll = 0
		const onScroll = () => (lastScroll = performance.now())
		window.addEventListener("scroll", onScroll, { passive: true })
		const headStyles = new Set(document.head.querySelectorAll("style"))
		const globe = createGlobe(canvas, {
			devicePixelRatio: dpr,
			width: size,
			height: size,
			phi: phi.current,
			theta: 0.45,
			...(isDark
				? { dark: 1, diffuse: 1.4, mapBrightness: 5.5, baseColor: [0.11, 0.17, 0.36], glowColor: [0.13, 0.27, 0.62], arcColor: [0.45, 0.66, 1] }
				: { dark: 0, diffuse: 1.2, mapBrightness: 7, baseColor: [1, 1, 1], glowColor: [0.82, 0.88, 1], arcColor: [0.15, 0.39, 0.92] }),
			mapSamples: 16_000,
			markerColor: [0.98, 0.73, 0.2],
			arcWidth: 0.6,
			arcHeight: 0.3,
			markerElevation: 0.02, // label points use 0.8 + 0.02
			opacity: 0.9,
			scale: 1,
			offset: [0, 0],
			markers: cobeMarkers,
			arcs: cobeArcs
		} as never) as unknown as CobeHandle
		// COBE appends a <style> to <head> and rewrites it every frame for anchor labels. Labels are
		// placed here instead, so detach it: writes to a detached node trigger no style recalc.
		// Only a style tag that appeared during createGlobe is COBE's; other libraries' tags stay.
		document.head.querySelectorAll("style").forEach((el) => {
			if (!headStyles.has(el) && !el.hasAttribute("data-precedence") && !el.id) el.remove()
		})

		let raf = 0
		let odd = false
		const tick = () => {
			raf = requestAnimationFrame(tick)
			if (!visible.current) return
			// Draw at 30 fps: every other frame, with double the step. Halves CPU and GPU work.
			odd = !odd
			if (odd) return
			// Skip drawing while the page scrolls; resume 150 ms after the last scroll event.
			if (performance.now() - lastScroll < 150 && !drag.current) return
			if (!drag.current) {
				if (!reduce) phi.current += 0.005
				if (Math.abs(velocity.current) > 0.0001) {
					offset.current.phi += velocity.current
					velocity.current *= 0.9
				}
			}
			const p = phi.current + offset.current.phi + dragDelta.current.phi
			const th = 0.45 + offset.current.theta + dragDelta.current.theta
			globe.update({ phi: p, theta: th })
			points.forEach((pt, i) => {
				const el = labelRefs.current[i]
				if (!el) return
				const q = project(pt, p, th)
				el.style.transform = `translate3d(${q.x * box}px, ${q.y * box}px, 0) ${SIDE[markers[i].side ?? "top"]}`
				if (q.visible !== shown[i]) {
					shown[i] = q.visible
					el.style.opacity = q.visible ? "1" : "0"
				}
			})
		}
		raf = requestAnimationFrame(tick)
		return () => {
			cancelAnimationFrame(raf)
			ro.disconnect()
			window.removeEventListener("scroll", onScroll)
			globe.destroy()
		}
	}, [started, markers, arcs, size, isDark])

	return (
		<div ref={rootRef} className={cn("relative mx-auto aspect-square w-full", className)} style={{ maxWidth: size }}>
			<div aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand)_28%,transparent),transparent)]" />
			<canvas
				ref={canvasRef}
				aria-hidden
				width={size * 2}
				height={size * 2}
				className="relative block size-full cursor-grab touch-pan-y opacity-0 transition-opacity duration-700 data-[ready=true]:opacity-100"
				data-ready={started}
				style={{ contain: "layout paint size" }}
				onPointerDown={(e) => {
					drag.current = { x: e.clientX, y: e.clientY }
					velocity.current = 0
					e.currentTarget.style.cursor = "grabbing"
				}}
			/>
			{markers.map((mk, i) => (
				<span
					key={mk.id}
					ref={(el) => {
						labelRefs.current[i] = el
					}}
					style={{ opacity: 0, transition: "opacity 0.3s ease" }}
					className={cn(
						"pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-lg will-change-transform",
						mk.home ? "border-accent-yellow/60 bg-accent-yellow text-[#050a1c]" : "border-ink-foreground/15 bg-ink text-ink-foreground"
					)}
				>
					{mk.label}
				</span>
			))}
		</div>
	)
}
