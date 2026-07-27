"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus, Plus, MessageSquareText, FileDown } from "lucide-react";
import { constructionTiers, type ConstructionTier } from "@/data/packages";
import { cn } from "@/lib/utils";
import { useEnquiry } from "@/lib/enquiry-context";

const SUMMARY_FEATURES = [
  "Design & Drawings",
  "Structure",
  "Kitchen & Bathroom",
  "Flooring & Electrical",
];

const EXCLUSIONS_ROW_ID = "__exclusions";

// ============================================================================
// AccordionRow — a single collapsible row (header + animated content).
// Reused for every spec section AND for "What's Not Included", so all rows
// in a card share identical spacing, borders and open/close behaviour.
// ============================================================================
interface AccordionRowProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}

function AccordionRow({ id, title, isOpen, onToggle, children }: AccordionRowProps) {
  return (
    <div>
      <button
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors",
          isOpen ? "bg-royal-50/60" : "hover:bg-mist"
        )}
      >
        <span className="text-sm font-semibold text-navy">{title}</span>
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
            isOpen ? "border-royal-700 bg-royal-700 text-white" : "border-ink/20 text-ink-soft"
          )}
        >
          {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// TierAccordion — the full stack of rows for one package. Only one row
// (including "What's Not Included") can be open at a time, and this state
// is scoped to this single component instance, so every card's accordion
// is fully independent from every other card's.
// ============================================================================
interface TierAccordionProps {
  tier: ConstructionTier;
}

function TierAccordion({ tier }: TierAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="divide-y divide-black/5 rounded-2xl border border-black/5 bg-white overflow-hidden">
      {tier.sections.map((section) => (
        <AccordionRow
          key={section.id}
          id={section.id}
          title={section.title}
          isOpen={openId === section.id}
          onToggle={toggle}
        >
          <ul className="space-y-2.5 bg-mist/60 px-5 py-4">
            {section.lines.map((line) => (
              <li
                key={line.label}
                className="grid grid-cols-1 gap-0.5 text-sm sm:grid-cols-[180px_1fr] sm:gap-3"
              >
                <span className="font-medium text-navy">{line.label}</span>
                <span
                  className={cn(
                    "text-ink-soft",
                    line.value === "Not Included" && "italic text-ink-soft/60"
                  )}
                >
                  {line.value}
                </span>
              </li>
            ))}
          </ul>
        </AccordionRow>
      ))}

      <AccordionRow
        id={EXCLUSIONS_ROW_ID}
        title="What's Not Included"
        isOpen={openId === EXCLUSIONS_ROW_ID}
        onToggle={toggle}
      >
        <div className="flex flex-wrap gap-2 bg-mist/60 px-5 py-4">
          {tier.exclusions.map((e) => (
            <span
              key={e}
              className="rounded-full bg-white px-3 py-1.5 text-xs text-ink-soft shadow-sm"
            >
              {e}
            </span>
          ))}
        </div>
      </AccordionRow>
    </div>
  );
}

// ============================================================================
// TierCard — price / summary panel + its own accordion below
// ============================================================================
interface TierCardProps {
  tier: ConstructionTier;
  index: number;
}

function TierCard({ tier, index }: TierCardProps) {
  const { openEnquiry } = useEnquiry();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col"
    >
      {/* Price / summary panel */}
      <div className="relative flex flex-col rounded-3xl border border-black/5 bg-white p-6 shadow-glass transition-all duration-300">
        {tier.popular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-royal-gradient px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
            Most Popular
          </span>
        )}

        <p className="text-sm font-semibold uppercase tracking-wide text-royal-700">
          {tier.name}
        </p>

        <p className="mt-2 font-display text-3xl font-semibold text-navy">
          ₹{tier.rate.toLocaleString("en-IN")}
          <span className="text-sm font-normal text-ink-soft"> /sqft</span>
        </p>

        <p className="mt-2 text-sm text-ink-soft">{tier.tagline}</p>

        <ul className="mt-5 space-y-2">
          {SUMMARY_FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-ink">
              <Check className="h-4 w-4 shrink-0 text-royal-600" />
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={() => openEnquiry(`Book Now — ${tier.name} Package`)}
          className="mt-6 w-full rounded-full bg-royal-gradient px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          Book Now
        </button>
      </div>

      <div className="mt-4">
        <TierAccordion tier={tier} />
      </div>
    </motion.div>
  );
}

// ============================================================================
// Top-level section
// ============================================================================
export default function Packages() {
  const { openEnquiry } = useEnquiry();

  return (
    <section id="packages" className="section-py bg-mist relative">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Transparent Pricing</span>
          <h2 className="heading-display mt-5 text-3xl sm:text-4xl">
            Construction packages
          </h2>
          <p className="mt-4 text-sm text-ink-soft sm:text-base">
            Four fixed-rate construction tiers — sourced directly from our latest cost sheet, with
            every specification broken down package by package so you know exactly what you&apos;re
            paying for.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {constructionTiers.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => openEnquiry("General Package Enquiry")} className="btn-secondary">
            <MessageSquareText className="h-4 w-4" /> Send Enquiry
          </button>
          <button onClick={() => openEnquiry("Download Brochure Request")} className="btn-primary">
            <FileDown className="h-4 w-4" /> Download Brochure
          </button>
        </div>
      </div>
    </section>
  );
}
