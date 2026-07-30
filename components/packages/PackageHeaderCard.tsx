"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ConstructionTier } from "@/data/packages";
import { useEnquiry } from "@/lib/enquiry-context";
import { cn } from "@/lib/utils";

interface PackageHeaderCardProps {
  tier: ConstructionTier;
  index: number;
}

/**
 * The top "choose your package" row — name, price, short description,
 * popular badge and the two package-level CTAs. Deliberately has no
 * feature/accordion content of its own; the detailed, synchronized
 * comparison lives in PackageFeaturePanel below.
 */
function PackageHeaderCard({ tier, index }: PackageHeaderCardProps) {
  const { openEnquiry } = useEnquiry();

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

      <div
        className={cn(
          "flex h-full flex-col rounded-3xl border bg-white p-7 shadow-glass transition-shadow duration-300 hover:shadow-premium",
          tier.popular ? "border-royal-300 ring-1 ring-royal-100" : "border-black/5"
        )}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-700">
          {tier.name}
        </p>
        <p className="mt-3 flex items-baseline gap-1.5">
          <span className="font-display text-4xl font-semibold text-navy">
            ₹{tier.rate.toLocaleString("en-IN")}
          </span>
          <span className="text-sm font-medium text-ink-soft">/sqft</span>
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{tier.tagline}</p>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => openEnquiry(`Book Consultation — ${tier.name} Package`)}
            className="btn-primary w-full"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(PackageHeaderCard);
