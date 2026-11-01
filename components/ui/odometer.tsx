"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Digit-roll number: each digit is a 0–9 column moved with a CSS transform, so the roll runs on the
 * compositor. The server renders the final value; JavaScript only resets the columns to 0 while the
 * number is below the fold and lets them roll when it scrolls into view. Reduced motion: no roll.
 * Same props idea as @cult-ui/rolling-number (value, format), different rendering.
 */
export function Odometer({ value, className }: { value: number; className?: string }) {
	const ref = useRef<HTMLSpanElement>(null)
	const [armed, setArmed] = useState(false)
	const text = String(value)

	useEffect(() => {
		const el = ref.current
		if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
		const r = el.getBoundingClientRect()
		if (r.top < window.innerHeight && r.bottom > 0) return
		// Below the fold: park the columns at 0, roll them when the number appears.
		const park = requestAnimationFrame(() => setArmed(true))
		let roll: ReturnType<typeof setTimeout> | undefined
		const io = new IntersectionObserver(
			([e]) => {
				if (!e.isIntersecting) return
				io.disconnect()
				roll = setTimeout(() => setArmed(false), 120)
			},
			{ threshold: 0.6 }
		)
		io.observe(el)
		return () => {
			cancelAnimationFrame(park)
			clearTimeout(roll)
			io.disconnect()
		}
	}, [])

	return (
		<span ref={ref} className={className}>
			<span className="sr-only">{text}</span>
			<span aria-hidden="true" className="inline-flex leading-none tabular-nums">
				{text.split("").map((ch, i) => {
					const d = Number(ch)
					return (
						<span key={i} className="relative inline-block h-[1em] overflow-hidden">
							{/* Digits 0–9 come from CSS (.odo-col::before), so page text holds only the real value. */}
							<span
								className="odo-col block transition-transform duration-[1600ms] ease-[cubic-bezier(.2,.75,.1,1)]"
								style={{
									transform: `translateY(${armed ? 0 : -d * 10}%)`,
									transitionDelay: `${(text.length - 1 - i) * 90}ms`,
									transitionDuration: armed ? "0ms" : undefined
								}}
							/>
						</span>
					)
				})}
			</span>
		</span>
	)
}
