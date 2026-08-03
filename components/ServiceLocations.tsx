"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MapPin } from "lucide-react";
import { serviceLocations } from "@/data/locations";
import { DURATION, EASE_PREMIUM, hoverLift, staggerDelay } from "@/lib/motion";

export default function ServiceLocations() {
  return (
    <section id="locations" className="section-py relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-50" />
      <div className="container-px relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            <MapPin className="h-3.5 w-3.5" />
            Where We Build
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="heading-display mt-5 text-3xl sm:text-4xl"
          >
            Serving Chennai, Trichy &amp; Tirunelveli
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base"
          >
            One team, one standard of quality — construction, architecture and interior
            design delivered with the same fixed-rate transparency across all three cities.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {serviceLocations.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: DURATION.card, delay: staggerDelay(i, 0.06), ease: EASE_PREMIUM }}
              whileHover={hoverLift}
              className="group card-premium relative overflow-hidden p-7"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-royal-50 transition-transform duration-[240ms] ease-premium group-hover:scale-[1.4]" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-gradient">
                  <loc.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-navy">
                  {loc.city}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-royal-700">
                  {loc.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {loc.description}
                </p>

                <ul className="mt-5 grid grid-cols-2 gap-2.5">
                  {loc.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-1.5 text-xs font-medium text-ink"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-royal-600" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
