"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

import { useCallback, useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  /** Company shown on the card stack. ITHINK has no client photos yet, so the stack shows company tiles. */
  company: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  prevLabel,
  nextLabel,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  prevLabel: string;
  nextLabel: string;
}) => {
  const [active, setActive] = useState(0);

  const count = testimonials.length;
  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % count);
  }, [count]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  // Fixed tilt per card: Math.random() here gives different values on the server and client.
  const tilt = (index: number) => [-7, 5, -3, 8, -5][index % 5];
  return (
    <div className="mx-auto max-w-sm antialiased md:max-w-5xl">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <m.div
                  key={testimonial.name}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: tilt(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : tilt(index),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: tilt(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <div
                    aria-hidden="true"
                    className="ink-scene relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border border-ink-foreground/10 p-8 text-ink-foreground shadow-2xl"
                  >
                    <div className="ink-grid absolute inset-0" />
                    <span className="relative flex size-16 items-center justify-center rounded-2xl bg-ink-foreground/10 text-2xl font-semibold backdrop-blur">
                      {testimonial.company.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="relative">
                      <span className="block text-3xl font-semibold tracking-tight">{testimonial.company}</span>
                                          </span>
                  </div>
                </m.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <m.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-semibold text-foreground">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {testimonials[active].designation}
            </p>
            <m.p className="mt-8 text-lg leading-relaxed text-foreground/80">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <m.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </m.span>
              ))}
            </m.p>
          </m.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={prevLabel}
              className="group/button flex size-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-brand/40"
            >
              <ArrowLeft className="size-5 text-foreground transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={nextLabel}
              className="group/button flex size-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-brand/40"
            >
              <ArrowRight className="size-5 text-foreground transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
