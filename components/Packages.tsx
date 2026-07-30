"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { constructionTiers } from "@/data/packages";
import PackageHeaderCard from "@/components/packages/PackageHeaderCard";
import PackageFeaturePanel from "@/components/packages/PackageFeaturePanel";
import PackageCarousel from "@/components/packages/PackageCarousel";
import CategoryNav from "@/components/packages/CategoryNav";
import CategoryTabBar from "@/components/packages/CategoryTabBar";
import { packageCategories, DEFAULT_CATEGORY_ID } from "@/components/packages/categories";

export default function Packages() {
  // Single shared source of truth — every package panel, the desktop
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
            transition={{ delay: 0.08 }}
            className="mt-4 text-base font-semibold text-navy sm:text-lg"
          >
            Choose the perfect package for your dream home.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="mt-2 text-sm text-ink-soft sm:text-base"
          >
            Compare every package side-by-side with complete transparency.
          </motion.p>
        </div>

        {/* Choose your package */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {constructionTiers.map((tier, i) => (
            <PackageHeaderCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>

        {/* Compare packages — synced category nav + comparison grid */}
        <div className="mt-16 lg:grid lg:grid-cols-[200px_1fr] lg:items-start lg:gap-10">
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

            {/* Tablet: 2-up grid. Desktop (lg+): full 4-up row. */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:items-stretch lg:gap-4">
              {constructionTiers.map((tier) => (
                <PackageFeaturePanel
                  key={tier.id}
                  tier={tier}
                  activeCategoryId={activeCategoryId}
                />
              ))}
            </div>

            {/* Mobile: swipeable single-card carousel */}
            <div className="md:hidden">
              <PackageCarousel tiers={constructionTiers} activeCategoryId={activeCategoryId} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
