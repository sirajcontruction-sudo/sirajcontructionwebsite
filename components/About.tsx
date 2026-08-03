"use client";

import { motion } from "framer-motion";
import { Award, Users, Compass, HeartHandshake } from "lucide-react";
import { DURATION, EASE_PREMIUM, hoverLift, staggerDelay } from "@/lib/motion";

const pillars = [
  { icon: Compass, title: "Precise Planning", desc: "Every project begins with detailed structural and architectural drawings before a single brick is laid." },
  { icon: Award, title: "Certified Materials", desc: "Steel, cement and fittings sourced from verified brands at every package tier — no compromises." },
  { icon: Users, title: "Dedicated Supervision", desc: "A named site engineer owns your project from foundation to final coat of paint." },
  { icon: HeartHandshake, title: "Honest Contracts", desc: "Fixed-rate, itemised agreements — the price you sign is the price you pay." },
];

export default function About() {
  return (
    <section id="about" className="section-py relative overflow-hidden bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DURATION.card, ease: EASE_PREMIUM }}
          >
            <span className="eyebrow">Who We Are</span>
            <h2 className="heading-display mt-5 text-3xl sm:text-4xl lg:text-[2.75rem]">
              A Chennai-headquartered construction partner, engineered around trust.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              SRAJ Construction &amp; Interior is a civil contracting and interior design
              practice headquartered in Chennai and serving clients across Chennai, Trichy
              and Tirunelveli. We bring together structural engineers, architects and
              interior designers under one roof — so your home moves from concept to
              keys-in-hand without switching contractors, without surprise costs, and
              without compromise on quality.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              From civil contracting and residential construction to architecture, interior
              design, turnkey builds and renovation, our four-tier package system gives every
              client — budget-conscious or luxury-focused — a clearly specified, fixed-rate
              path to their finished home.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <div className="rounded-2xl border border-royal-100 bg-royal-50 px-5 py-4">
                <p className="font-display text-2xl font-semibold text-royal-800">100%</p>
                <p className="text-xs text-ink-soft">Fixed-Rate Contracts</p>
              </div>
              <div className="rounded-2xl border border-royal-100 bg-royal-50 px-5 py-4">
                <p className="font-display text-2xl font-semibold text-royal-800">4</p>
                <p className="text-xs text-ink-soft">Transparent Package Tiers</p>
              </div>
              <div className="rounded-2xl border border-royal-100 bg-royal-50 px-5 py-4">
                <p className="font-display text-2xl font-semibold text-royal-800">1</p>
                <p className="text-xs text-ink-soft">Single Point of Contact</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DURATION.card, ease: EASE_PREMIUM }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: DURATION.card, delay: staggerDelay(i, 0.06), ease: EASE_PREMIUM }}
                whileHover={hoverLift}
                className="card-premium p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-gradient">
                  <p.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
