"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ConstructionTier } from "@/data/packages";
import { useEnquiry } from "@/lib/enquiry-context";
import { cn } from "@/lib/utils";
import { DURATION, EASE_PREMIUM } from "@/lib/motion";
import FeatureRow from "./FeatureRow";
import { EXCLUSIONS_ID } from "./categories";

interface MobilePackageCardProps {
  tier: ConstructionTier;
  activeCategoryId: string;
}

/**
 * Mobile can't split "selection card" and "comparison panel" into two
 * separate rows the way desktop/tablet do — there's only room for one
 * card per swipe. So this combines name/price/description/badge, the
 * globally-selected category's content, and both CTAs into one
 * self-contained card used inside PackageCarousel.
 */
function MobilePackageCard({ tier, activeCategoryId }: MobilePackageCardProps) {
  const { openEnquiry } = useEnquiry();

  const activeSection =
    activeCategoryId === EXCLUSIONS_ID
      ? null
      : tier.sections.find((section) => section.id === activeCategoryId) ?? null;

  return (
    <div className="relative h-full">
      {tier.popular && (
        <span className="absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-royal-gradient px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white shadow-md">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          Most Popular
        </span>
      )}

      <div
        className={cn(
          "flex h-full flex-col rounded-3xl border bg-white shadow-glass",
          tier.popular ? "border-royal-300 ring-1 ring-royal-100" : "border-black/5"
        )}
      >
        {/* Header */}
        <div className="rounded-t-3xl border-b border-black/5 px-6 pb-5 pt-7">
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

        {/* Synced category content */}
        <div className="flex-1 px-6 py-5">
          {/* `layout` + `popLayout` removed: this is the mobile path, where
              FLIP measurement is most expensive and least affordable. The
              card's height changes with the category either way — animating
              that change forced a layout pass per frame on every visible
              card. Keying on the category replays the same fade/rise. */}
          <div>
            <motion.div
              key={activeCategoryId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.card, ease: EASE_PREMIUM }}
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
                    <FeatureRow key={line.label} className="min-h-[3.25rem]" {...line} />
                  ))}
                </ul>
              ) : null}
            </motion.div>
          </div>
        </div>

        {/* CTA — always reachable, large touch target */}
        <div className="border-t border-black/5 px-6 py-5">
          <button
            type="button"
            onClick={() => openEnquiry(`Book Consultation — ${tier.name} Package`)}
            className="btn-primary w-full"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(MobilePackageCard);
