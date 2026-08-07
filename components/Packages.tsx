"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  REVEAL_FROM,
  REVEAL_FROM_SM,
  VIEWPORT_ONCE,
  revealTransition,
} from "@/lib/motion";
import { constructionTiers } from "@/data/packages";
import PackageHeaderCard from "@/components/packages/PackageHeaderCard";
import PackageComparisonGrid from "@/components/packages/PackageComparisonGrid";
import PackageCarousel from "@/components/packages/PackageCarousel";
import CategoryNav from "@/components/packages/CategoryNav";
import CategoryTabBar from "@/components/packages/CategoryTabBar";
import { packageCategories, DEFAULT_CATEGORY_ID } from "@/components/packages/categories";

// Tablet shows two packages side by side, so the four tiers are split into
// two aligned comparison blocks. Hoisted to module scope so the slices keep a
// stable identity between renders.
const TABLET_TIER_GROUPS = [constructionTiers.slice(0, 2), constructionTiers.slice(2)];

export default function Packages() {
  // Single shared source of truth — every package panel, the desktop
  // sidebar and the mobile tab bar all read/write this one value, so
  // selecting a category updates all four packages simultaneously.
  const [activeCategoryId, setActiveCategoryId] = useState(DEFAULT_CATEGORY_ID);

  return (
    <section id="packages" className="section-py relative bg-mist">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          {/* All four previously animated without a resolvable transition —
              `{ delay: n }` alone is stripped by framer's
              `isTransitionDefined()`, so `y` fell back to a main-thread
              under-damped spring and `opacity` to a 300ms tween on an
              unrelated curve. Same rise, same stagger, now on the site's one
              240ms curve with both properties finishing together. */}
          <motion.span
            initial={REVEAL_FROM_SM}
            whileInView={{ opacity: 1, y: 0, transition: revealTransition() }}
            viewport={VIEWPORT_ONCE}
            className="eyebrow"
          >
            Transparent Pricing
          </motion.span>

          <motion.h2
            initial={REVEAL_FROM}
            whileInView={{ opacity: 1, y: 0, transition: revealTransition(0.05) }}
            viewport={VIEWPORT_ONCE}
            className="heading-display mt-5 text-3xl sm:text-4xl"
          >
            Construction Packages
          </motion.h2>

          <motion.p
            initial={REVEAL_FROM}
            whileInView={{ opacity: 1, y: 0, transition: revealTransition(0.08) }}
            viewport={VIEWPORT_ONCE}
            className="mt-4 text-base font-semibold text-navy sm:text-lg"
          >
            Choose the perfect package for your dream home.
          </motion.p>

          <motion.p
            initial={REVEAL_FROM}
            whileInView={{ opacity: 1, y: 0, transition: revealTransition(0.12) }}
            viewport={VIEWPORT_ONCE}
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
        <div className="mt-16 lg:grid lg:grid-cols-[204px_1fr] lg:items-start lg:gap-8">
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

            {/* Tablet: two aligned 2-up blocks. */}
            <div className="hidden space-y-5 md:block lg:hidden">
              {TABLET_TIER_GROUPS.map((group, i) => (
                <PackageComparisonGrid
                  key={i}
                  tiers={group}
                  activeCategoryId={activeCategoryId}
                  gapClassName="gap-x-5"
                />
              ))}
            </div>

            {/* Desktop (lg+): all four packages in one row-aligned grid. */}
            <div className="hidden lg:block">
              <PackageComparisonGrid
                tiers={constructionTiers}
                activeCategoryId={activeCategoryId}
                gapClassName="gap-x-3"
              />
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
