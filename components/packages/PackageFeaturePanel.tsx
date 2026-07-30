"use client";

import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ConstructionTier } from "@/data/packages";
import { cn } from "@/lib/utils";
import FeatureRow from "./FeatureRow";
import { EXCLUSIONS_ID } from "./categories";

interface PackageFeaturePanelProps {
  tier: ConstructionTier;
  /** Category id currently selected in the shared nav — every panel reads
   *  from this single source of truth so all four packages expand the
   *  same section simultaneously. */
  activeCategoryId: string;
}

/**
 * One column of the desktop/tablet comparison grid: a compact mini-header
 * (package name + price) followed by whichever category is globally
 * selected. Deliberately has NO overflow-hidden — that CSS property
 * silently breaks `position: sticky` on any descendant, and the
 * mini-header needs real sticky behaviour so it stays visible while
 * scrolling through a tall category (e.g. Structure's 9 rows). Rounded
 * corners are handled per-block instead (rounded-t-3xl on the header).
 */
function PackageFeaturePanel({ tier, activeCategoryId }: PackageFeaturePanelProps) {
  const activeSection =
    activeCategoryId === EXCLUSIONS_ID
      ? null
      : tier.sections.find((section) => section.id === activeCategoryId) ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <div
        className={cn(
          "flex h-full flex-col rounded-3xl border bg-white shadow-glass",
          tier.popular ? "border-royal-300 ring-1 ring-royal-100" : "border-black/5"
        )}
      >
        {/* Compact sticky mini-header */}
        <div className="rounded-t-3xl border-b border-black/5 bg-white px-4 py-4 lg:sticky lg:top-28 lg:z-10">
          <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-royal-700">
            {tier.name}
          </p>
          <p className="mt-1 font-display text-base font-semibold text-navy">
            ₹{tier.rate.toLocaleString("en-IN")}
            <span className="text-xs font-normal text-ink-soft"> /sqft</span>
          </p>
        </div>

        {/* Synced category content */}
        <div className="flex-1 px-4 py-4">
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
                      className="rounded-full bg-mist px-2.5 py-1 text-[11px] text-ink-soft shadow-sm"
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
      </div>
    </motion.div>
  );
}

export default memo(PackageFeaturePanel);
