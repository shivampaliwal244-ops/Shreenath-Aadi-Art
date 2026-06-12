"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader, Reveal } from "@/components/ui/motion";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = useCallback(
    (dir: "prev" | "next") => {
      setDirection(dir === "next" ? 1 : -1);
      setCurrent((prev) => {
        const len = TESTIMONIALS.length;
        return dir === "next" ? (prev + 1) % len : (prev - 1 + len) % len;
      });
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(() => navigate("next"), 6000);
    return () => clearInterval(timer);
  }, [navigate]);

  const testimonial = TESTIMONIALS[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="Client Stories"
          subtitle="Trusted by thousands of families, temples, and businesses across India."
        />

        <Reveal>
          <div className="relative mx-auto max-w-3xl">
            <GlassCard className="overflow-hidden p-8 sm:p-12" glow="purple">
              <Quote className="mb-6 h-8 w-8 text-gold/40" />

              <div className="relative min-h-[180px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Stars */}
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-gold text-gold"
                          />
                        )
                      )}
                    </div>

                    <p className="mb-6 text-base leading-relaxed text-white/70 italic sm:text-lg">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    <div>
                      <p className="font-display text-lg text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-white/40">
                        {testimonial.location}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > current ? 1 : -1);
                        setCurrent(i);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === current
                          ? "w-8 bg-gold"
                          : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate("prev")}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-colors hover:text-white"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => navigate("next")}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-colors hover:text-white"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
