"use client";

import { motion } from "framer-motion";
import { BadgeIndianRupee, Clock, FileCheck2, Wrench } from "lucide-react";
import {
  REVEAL_FROM,
  VIEWPORT_ONCE_80,
  hoverLift,
  revealTransition,
  staggerDelay,
} from "@/lib/motion";

const reasons = [
  { icon: BadgeIndianRupee, title: "Fixed, Transparent Pricing", desc: "Every package is itemised down to the brand and grade — the quoted rate is the final rate." },
  { icon: Clock, title: "On-Time Delivery", desc: "Milestone-based scheduling with weekly progress updates keeps your project on track." },
  { icon: FileCheck2, title: "Certified Engineering", desc: "Structural, electrical and plumbing drawings reviewed by qualified engineers before execution." },
  { icon: Wrench, title: "One Team, Every Trade", desc: "Civil, MEP and interior teams work under a single project manager — no coordination gaps." },
];

export default function WhyChooseUs() {
  return (
    <section className="section-py relative overflow-hidden bg-navy">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
      <div className="container-px relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow border-white/15 bg-white/5 text-sky-light">Why SRAJ</span>
          <h2 className="mt-5 font-display text-3xl font-medium text-white sm:text-4xl">
            Built on process, not promises
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={REVEAL_FROM}
              // Stagger lives on the reveal target, NOT on a component-level
              // `transition` prop — a prop-level delay is inherited by
              // `whileHover`, so the last card in this row sat still for
              // 240ms after the pointer arrived before it began to lift.
              whileInView={{ opacity: 1, y: 0, transition: revealTransition(staggerDelay(i, 0.06)) }}
              viewport={VIEWPORT_ONCE_80}
              whileHover={hoverLift}
              className="rounded-3xl border border-white/10 bg-white/[0.055] p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-gradient">
                <r.icon className="h-5 w-5 text-navy" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-white">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
