"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/data/process";
import { REVEAL_FROM, VIEWPORT_ONCE_80, revealTransition } from "@/lib/motion";

export default function Process() {
  return (
    <section id="process" className="section-py bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How We Work</span>
          <h2 className="heading-display mt-5 text-3xl sm:text-4xl">Our six-stage construction process</h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-royal-200 to-transparent lg:block" />
          <div className="space-y-10 lg:space-y-16">
            {processSteps.map((s, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={s.id}
                  initial={REVEAL_FROM}
                  whileInView={{ opacity: 1, y: 0, transition: revealTransition() }}
                  viewport={VIEWPORT_ONCE_80}
                  className={`flex flex-col items-center gap-6 lg:flex-row ${isEven ? "" : "lg:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${isEven ? "lg:text-right" : "lg:text-left"} text-center lg:text-inherit`}>
                    <div className="card-premium inline-block max-w-md p-6 text-left">
                      <p className="font-display text-3xl font-bold text-royal-100" style={{ WebkitTextStroke: "1.5px #1e40af", color: "transparent" }}>
                        {s.step}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-navy">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center">
                    <span className="h-4 w-4 rounded-full bg-royal-gradient shadow-glow-sky" />
                  </div>
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
