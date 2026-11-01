import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import Link from "next/link"
import { ArrowRight as ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
  /** Shown as a large 01, 02… numeral above the title. */
  index?: number
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  index,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "blueprint-hover group relative col-span-3 cursor-pointer flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card transition-colors duration-300 hover:border-brand/40",
      // light styles
      "[box-shadow:0_1px_2px_rgba(10,16,36,.04),0_12px_32px_-12px_rgba(10,16,36,.12)]",
      // dark styles
      "transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff14_inset]",
      className
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="relative z-10 p-6">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
        {/* Index numeral in place of the registry's icon tile; the icon stays small beside it. */}
        <span className="mb-4 flex items-end gap-3">
          {index !== undefined && (
            <span className="text-5xl font-light leading-none tracking-tight text-muted-foreground/45 tabular-nums transition-colors duration-300 group-hover:text-brand-text">
              {String(index).padStart(2, "0")}
            </span>
          )}
          <Icon className="mb-1 size-5 text-muted-foreground/70 transition-colors duration-300 group-hover:text-brand-text" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {name}
        </h3>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
        )}
      >
        <span aria-hidden="true" className="inline-flex items-center text-sm font-semibold text-brand-text">{cta}<ArrowRightIcon className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" /></span>
      </div>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 z-10 hidden w-full translate-y-10 transform-gpu flex-row items-center px-6 pb-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
      )}
    >
      <span aria-hidden="true" className="inline-flex items-center text-sm font-semibold text-brand-text">{cta}<ArrowRightIcon className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" /></span>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-brand/[0.03]" />
    {/* The whole card is the link; the visible "more" line above is decoration. */}
    <Link
      href={href}
      aria-label={name}
      className="absolute inset-0 z-20 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    />
  </div>
)

export { BentoCard, BentoGrid }
