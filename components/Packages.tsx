"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileDown, MessageSquareText } from "lucide-react";
import { constructionTiers } from "@/data/packages";
import { useEnquiry } from "@/lib/enquiry-context";
import PackageCard from "@/components/packages/PackageCard";
import PackageCarousel from "@/components/packages/PackageCarousel";
import CategoryNav from "@/components/packages/CategoryNav";
import CategoryTabBar from "@/components/packages/CategoryTabBar";
import { packageCategories, DEFAULT_CATEGORY_ID } from "@/components/packages/categories";

export default function Packages() {
  const { openEnquiry } = useEnquiry();
  // Single shared source of truth — every package card, the desktop
  // sidebar and the mobile tab bar all read/write this one value, so
  // selecting a category updates all four packages simultaneously.
  const [activeCategoryId, setActiveCategoryId] = useState(DEFAULT_CATEGORY_ID);

  return (
    <section id="packages" className="section-py relative bg-mist">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            Transparent Pricing
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="heading-display mt-5 text-3xl sm:text-4xl"
          >
            Construction Packages
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-sm text-ink-soft sm:text-base"
          >
            Four fixed-rate construction tiers — sourced directly from our latest cost
            sheet. Pick a category below and compare all four packages side by side,
            instantly.
          </motion.p>
        </div>

        <div className="mt-14 lg:grid lg:grid-cols-[240px_1fr] lg:items-start lg:gap-10">
          <CategoryNav
            categories={packageCategories}
            activeId={activeCategoryId}
            onSelect={setActiveCategoryId}
          />

          <div>
            <CategoryTabBar
              categories={packageCategories}
              activeId={activeCategoryId}
              onSelect={setActiveCategoryId}
            />

            {/* Desktop / laptop — full side-by-side comparison row */}
            <div className="hidden items-stretch gap-6 lg:grid lg:grid-cols-4">
              {constructionTiers.map((tier, i) => (
                <PackageCard
                  key={tier.id}
                  tier={tier}
                  index={i}
                  activeCategoryId={activeCategoryId}
                />
              ))}
            </div>

            {/* Mobile / tablet — swipeable carousel, one package per screen */}
            <div className="lg:hidden">
              <PackageCarousel tiers={constructionTiers} activeCategoryId={activeCategoryId} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => openEnquiry("General Package Enquiry")}
            className="btn-secondary"
          >
            <MessageSquareText className="h-4 w-4" />
            Send Enquiry
          </button>

          <button
            type="button"
            onClick={() => openEnquiry("Download Brochure Request")}
            className="btn-primary"
          >
            <FileDown className="h-4 w-4" />
            Download Brochure
          </button>
        </div>
      </div>
    </section>
  );
}
