"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="section-py mesh-bg relative">
      <div className="container-px mx-auto max-w-4xl text-center">
        <span className="eyebrow">Client Voices</span>
        <h2 className="heading-display mt-5 text-3xl sm:text-4xl">What our clients say</h2>

        <div className="relative mt-12">
          <Quote className="mx-auto h-10 w-10 text-royal-200" />
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
              className="mx-auto mt-4 max-w-2xl"
            >
              <div className="mb-4 flex justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-sky text-sky" />
                ))}
              </div>
              <p className="font-display text-xl leading-relaxed text-navy sm:text-2xl">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-6 text-sm font-semibold text-navy">{t.name}</p>
              <p className="text-xs text-ink-soft">
                {t.role} · {t.location}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white transition-colors hover:border-royal-600 hover:text-royal-700">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-royal-700" : "w-1.5 bg-royal-200"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white transition-colors hover:border-royal-600 hover:text-royal-700">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
