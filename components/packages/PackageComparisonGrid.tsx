"use client";

import { motion } from "framer-motion";
import type { ConstructionTier } from "@/data/packages";
import { cn } from "@/lib/utils";
import FeatureRow from "./FeatureRow";
import { EXCLUSIONS_ID } from "./categories";

interface PackageComparisonGridProps {
  tiers: ConstructionTier[];
  /** Category id currently selected in the shared nav — every column reads
   *  from this single source of truth so all packages show the same section
   *  simultaneously. */
  activeCategoryId: string;
  /** Horizontal gap between package columns, kept in sync across the three
   *  stacked grids below. Must stay x-only — a row gap would break the rows
   *  apart from their hairline dividers. */
  gapClassName?: string;
}

/**
 * The desktop/tablet package comparison table.
 *
 * WHY ONE GRID INSTEAD OF ONE CARD PER PACKAGE
 * --------------------------------------------
 * Previously each package rendered its own independent card containing its
 * own <ul> of rows. Because every package's value text wraps to a different
 * number of lines ("M20 / M25 Grade" vs "Membrane / Flush, Sal wood frame,
 * up to ₹15,000"), the Nth row was a different height in every column and
 * the table lost horizontal alignment — exactly the thing a comparison
 * table exists to provide.
 *
 * The fix is structural, not cosmetic: all cells now live in a SINGLE CSS
 * grid and are auto-placed row-major, so the Nth row of every package is
 * literally the same grid row track. A grid row track is sized to its
 * tallest cell and grid items stretch to fill it, so corresponding rows are
 * guaranteed to be identical in height and to line up perfectly — at every
 * viewport width, with no JavaScript measurement and nothing to keep in
 * sync manually.
 *
 * Because the cells are grid items, the per-package card styling can't live
 * on a wrapping element any more. It's rendered instead as a non-interactive
 * chrome layer (one rounded card per column) positioned behind the cells,
 * using the same column template and gap — so the visual design is
 * unchanged while the alignment is now correct by construction.
 */
export default function PackageComparisonGrid({
  tiers,
  activeCategoryId,
  gapClassName = "gap-x-3",
}: PackageComparisonGridProps) {
  const columnStyle = { gridTemplateColumns: `repeat(${tiers.length}, minmax(0, 1fr))` };
  const gridClassName = cn("grid gap-y-0", gapClassName);

  const showExclusions = activeCategoryId === EXCLUSIONS_ID;

  // Every tier declares the same row labels in the same order for a given
  // section (see data/packages.ts), so the row template can be read from the
  // first tier. Tiers are still free to differ in their values.
  const rowLabels = showExclusions
    ? []
    : tiers[0]?.sections.find((section) => section.id === activeCategoryId)?.lines.map((l) => l.label) ??
      [];

  return (
    <div className="relative">
      {/* Card chrome — purely decorative backdrop for each package column. */}
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0", gridClassName)}
        style={columnStyle}
      >
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              "rounded-3xl border bg-white shadow-glass",
              tier.popular ? "border-royal-300 ring-1 ring-royal-100" : "border-black/5"
            )}
          />
        ))}
      </div>

      {/* Sticky header row — the mini-headers travel together so the package
          name and price stay visible while scrolling a tall category.
          A header cell sits exactly on top of its chrome column, so a solid
          background would paint over the card's own border. `border-transparent`
          + `bg-clip-padding` reserves that 1px edge and lets the chrome's
          border show through, keeping the outline a consistent single hairline
          all the way down the card. */}
      <div
        className={cn("relative z-10 lg:sticky lg:top-28", gridClassName)}
        style={columnStyle}
      >
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              "rounded-t-3xl border border-x-transparent border-t-transparent bg-white bg-clip-padding px-4 py-4",
              tier.popular ? "border-b-royal-200" : "border-b-black/[0.06]"
            )}
          >
            <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-royal-700">
              {tier.name}
            </p>
            <p className="mt-1 font-display text-base font-semibold text-navy">
              ₹{tier.rate.toLocaleString("en-IN")}
              <span className="text-xs font-normal text-ink-soft"> /sqft</span>
            </p>
          </div>
        ))}
      </div>

      {/* Rows. Keyed on the category so switching replays the same short
          fade/rise the panels used before. */}
      <motion.div
        key={activeCategoryId}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn("relative pb-3", gridClassName)}
        style={columnStyle}
      >
        {showExclusions
          ? tiers.map((tier) => (
              <div key={tier.id} className="flex flex-wrap content-start gap-2 px-4 py-4">
                {tier.exclusions.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-mist px-2.5 py-1 text-[11px] leading-snug text-ink-soft shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ))
          : rowLabels.map((label, rowIndex) =>
              tiers.map((tier) => {
                const line = tier.sections
                  .find((section) => section.id === activeCategoryId)
                  ?.lines.find((l) => l.label === label);

                return (
                  <FeatureRow
                    key={`${tier.id}-${label}`}
                    as="div"
                    label={label}
                    value={line?.value ?? "—"}
                    className={cn(
                      "min-h-[3.25rem] px-4",
                      rowIndex > 0 && "border-t border-black/5"
                    )}
                  />
                );
              })
            )}
      </motion.div>
    </div>
  );
}
