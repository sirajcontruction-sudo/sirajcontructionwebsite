"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="section-py mesh-bg relative">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="heading-display mt-5 text-3xl sm:text-4xl"
          >
            Full-spectrum construction &amp; design services
          </motion.h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8 }}
              className="group card-premium relative overflow-hidden p-7"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-royal-50 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-gradient shadow-glow-sky/20">
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{s.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-ink-soft">
                      <span className="h-1 w-1 rounded-full bg-sky" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-royal-700 transition-all group-hover:gap-2"
                >
                  Enquire <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
