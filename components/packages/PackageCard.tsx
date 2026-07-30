"use client";

import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import type { ConstructionTier } from "@/data/packages";
import { useEnquiry } from "@/lib/enquiry-context";
import { cn } from "@/lib/utils";
import FeatureRow from "./FeatureRow";
import { EXCLUSIONS_ID } from "./categories";

const SUMMARY_FEATURES = [
  "Design & Drawings",
  "Structure",
  "Kitchen & Bathroom",
  "Flooring & Electrical",
];

interface PackageCardProps {
  tier: ConstructionTier;
  index: number;
  /** Category id currently selected in the shared nav — every card reads
   *  from this single source of truth so all four packages stay in sync. */
  activeCategoryId: string;
}

function PackageCard({ tier, index, activeCategoryId }: PackageCardProps) {
  const { openEnquiry } = useEnquiry();

  const activeSection =
    activeCategoryId === EXCLUSIONS_ID
      ? null
      : tier.sections.find((section) => section.id === activeCategoryId) ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="relative flex h-full flex-col"
    >
      {tier.popular && (
        <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-royal-gradient px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white shadow-md">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          Most Popular
        </span>
      )}

      {/* `layout` lets the card smoothly resize (~250ms) as the shared
          category changes swap in shorter/taller content, instead of
          jumping. */}
      <motion.div
        layout
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-glass transition-shadow duration-300 hover:shadow-premium",
          tier.popular ? "border-royal-300 ring-1 ring-royal-100" : "border-black/5"
        )}
      >
        {/* Header — name, price, tagline. Never scrolls away. */}
        <div className="border-b border-black/5 px-6 pb-5 pt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-700">
            {tier.name}
          </p>
          <p className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-semibold text-navy">
              ₹{tier.rate.toLocaleString("en-IN")}
            </span>
            <span className="text-sm font-medium text-ink-soft">/sqft</span>
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{tier.tagline}</p>
        </div>

        {/* Body — quick summary + whichever category is globally selected */}
        <div className="flex-1 px-6 py-5">
          <ul className="mb-5 space-y-2.5 border-b border-black/5 pb-5">
            {SUMMARY_FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-ink">
                <Check className="h-4 w-4 shrink-0 text-royal-600" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeCategoryId}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeCategoryId === EXCLUSIONS_ID ? (
                <div className="flex flex-wrap gap-2">
                  {tier.exclusions.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-mist px-3 py-1.5 text-xs text-ink-soft shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : activeSection ? (
                <ul className="divide-y divide-black/5">
                  {activeSection.lines.map((line) => (
                    <FeatureRow key={line.label} {...line} />
                  ))}
                </ul>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer CTA — always reachable */}
        <div className="border-t border-black/5 px-6 py-5">
          <button
            type="button"
            onClick={() => openEnquiry(`Book Now — ${tier.name} Package`)}
            className="btn-primary w-full"
          >
            Book Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default memo(PackageCard);
