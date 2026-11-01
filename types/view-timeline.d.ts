// Scroll-driven animations API used by Glassy UI; not yet in TypeScript's DOM lib.
interface ViewTimelineOptions {
  subject?: Element
  axis?: "block" | "inline" | "x" | "y"
  inset?: string | Array<string>
}
declare class ViewTimeline extends AnimationTimeline {
  constructor(options?: ViewTimelineOptions)
  readonly subject: Element
  readonly source: Element | null
  readonly startOffset: CSSNumericValue
  readonly endOffset: CSSNumericValue
}
