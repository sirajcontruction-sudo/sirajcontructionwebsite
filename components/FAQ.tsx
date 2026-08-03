"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className="section-py bg-white">
      <div className="container-px mx-auto max-w-3xl">
        <div className="text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="heading-display mt-5 text-3xl sm:text-4xl">Frequently asked questions</h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f) => {
            const isOpen = open === f.id;
            return (
              <div key={f.id} className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-glass">
                <button
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-medium text-navy">{f.question}</span>
                  <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-royal-50 transition-transform duration-200 ease-premium", isOpen && "rotate-45 bg-royal-gradient")}>
                    <Plus className={cn("h-4 w-4", isOpen ? "text-white" : "text-royal-700")} />
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: EASE_PREMIUM }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-ink-soft">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
