"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Magic UI border-beam (components/ui/border-beam.tsx) split into a train of small squares, for
 * short bars where one long beam cannot bend round the ends. Each square rides the same rounded
 * offset-path inside the same border-only mask, a fixed distance behind the one ahead, and paints
 * its slice of the registry gradient (colorFrom head, colorTo middle, transparent tail), so the
 * squares join into one trail that turns corners as smoothly as the beam on a large panel.
 * Uses the `beam-run` keyframes in globals.css.
 */
export function BorderBeamTrain({
	length = 280,
	segment = 28,
	duration = 10,
	colorFrom = "#377dff",
	colorTo = "#f9b934",
	borderWidth = 2
}: {
	length?: number
	segment?: number
	duration?: number
	colorFrom?: string
	colorTo?: string
	borderWidth?: number
}) {
	const ref = useRef<HTMLDivElement>(null)
	const [shape, setShape] = useState<{ perimeter: number; radius: number } | null>(null)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		const measure = () => {
			const w = el.offsetWidth
			const h = el.offsetHeight
			const radius = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, h / 2, w / 2)
			setShape({ perimeter: 2 * (w + h) - 8 * radius + 2 * Math.PI * radius, radius })
		}
		measure()
		const ro = new ResizeObserver(measure)
		ro.observe(el)
		return () => ro.disconnect()
	}, [])

	const count = Math.round(length / segment)
	// Registry gradient along the trail: t = 0 head, 0.5 colorTo, 1 transparent tail.
	const colorAt = (t: number) =>
		t <= 0.5
			? `color-mix(in oklab, ${colorTo} ${Math.round(t * 200)}%, ${colorFrom})`
			: `color-mix(in oklab, transparent ${Math.round((t - 0.5) * 200)}%, ${colorTo})`

	return (
		<div
			ref={ref}
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"
			style={{ "--border-beam-width": `${borderWidth}px` } as React.CSSProperties}
		>
			{shape &&
				Array.from({ length: count }, (_, i) => (
					<div
						key={i}
						className="beam-run absolute"
						style={{
							width: segment,
							height: segment,
							offsetPath: `rect(0 auto auto 0 round ${shape.radius}px)`,
							// Front of the square (right side, direction of travel) to back.
							background: `linear-gradient(to left, ${colorAt(i / count)}, ${colorAt((i + 1) / count)})`,
							animationDuration: `${duration}s`,
							// Square i trails the head by i segments.
							animationDelay: `${(-((count - i) * segment) / shape.perimeter) * duration}s`
						}}
					/>
				))}
		</div>
	)
}
