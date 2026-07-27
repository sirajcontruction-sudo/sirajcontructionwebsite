"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, MapPin, Ruler } from "lucide-react";
import { projects, projectCategories } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function Projects() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-py bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl text-center sm:text-left">
            <span className="eyebrow">Our Portfolio</span>
            <h2 className="heading-display mt-5 text-3xl sm:text-4xl">Selected projects across Chennai</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {projectCategories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition-all",
                  filter === c ? "bg-royal-gradient text-white" : "border border-black/10 text-ink-soft hover:border-royal-600 hover:text-royal-700"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl shadow-glass"
              >
                <div className={cn("relative flex h-64 flex-col justify-between bg-gradient-to-br p-6", p.gradient)}>
                  <div className="absolute inset-0 bg-navy/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id={`grid-${p.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
                          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#grid-${p.id})`} />
                    </svg>
                  </div>
                  <div className="relative flex items-start justify-between">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                      {p.category}
                    </span>
                    <Building2 className="h-6 w-6 text-white/70 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="relative">
                    <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
                    <div className="mt-2 flex items-center gap-4 text-xs text-white/75">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {p.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Ruler className="h-3.5 w-3.5" /> {p.area}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
