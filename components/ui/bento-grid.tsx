import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRight as ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card",
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
        <span className="mb-3 flex size-11 origin-left items-center justify-center rounded-xl bg-brand/10 text-brand-text transition-transform duration-300 group-hover:scale-90"><Icon className="size-5" aria-hidden="true" /></span>
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
        <Button variant="link" size="sm" className="pointer-events-auto p-0 font-semibold text-brand-text" render={<a href={href} />} nativeButton={false}>{cta}<ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" /></Button>
      </div>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 z-10 hidden w-full translate-y-10 transform-gpu flex-row items-center px-6 pb-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
      )}
    >
      <Button variant="link" size="sm" className="pointer-events-auto p-0 font-semibold text-brand-text" render={<a href={href} />} nativeButton={false}>{cta}<ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" /></Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-brand/[0.03]" />
  </div>
)

export { BentoCard, BentoGrid }
