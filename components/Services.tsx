"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/use-reveal";

import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="services" className="section-py mesh-bg relative">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span data-reveal className="reveal eyebrow">
            What We Do
          </span>
          <h2
            data-reveal
            style={{ transitionDelay: "50ms" }}
            className="reveal heading-display mt-5 text-3xl sm:text-4xl"
          >
            Full-spectrum construction &amp; design services
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.id}
              data-reveal
              style={{ transitionDelay: `${(i % 3) * 60}ms` }}
              className="reveal hover-lift group card-premium relative overflow-hidden p-7"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-royal-50 transition-transform duration-[240ms] ease-premium group-hover:scale-[1.4]" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal-gradient">
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
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-royal-700"
                >
                  Enquire
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
