// ============================================================================
// data/interior-packages.ts
// Source of truth: Construction_cost_packages_13_07_2026.xlsx — "Sheet1 (2)"
// ("INTERIOR WORK RATES"). Every value below is copied directly from the
// sheet — nothing invented. This is a completely SEPARATE data source from
// data/packages.ts (construction) and must never be merged with it.
//
// The sheet is organised as a rate card (Material Type / Laminate Type /
// Cost Per Sqft) rather than four named tiers, so it is modeled here as two
// independent "packages" — one per carcass material family found in the
// sheet — each broken into accordion sections by laminate finish, exactly
// mirroring the shape the existing <TierCard>/<TierAccordion> UI expects
// (id, name, rate, tagline, sections[], exclusions[]).
// ============================================================================

/** A single "label: value" line inside an accordion section */
export interface SpecLine {
  label: string;
  value: string;
}

/** One accordion section (e.g. a laminate finish) for a single interior package */
export interface AccordionSection {
  id: string;
  title: string;
  lines: SpecLine[];
}

export type InteriorPackageId = "fully-plywood" | "hdhmr-carcass";

/** Card-level summary info shown above the accordions — same shape as ConstructionTier */
export interface InteriorPackage {
  id: InteriorPackageId;
  name: string;
  rate: number; // ₹ per sqft — starting/entry rate for this package family
  tagline: string;
  popular?: boolean;
  sections: AccordionSection[];
  exclusions: string[];
}

// ----------------------------------------------------------------------------
// FULLY PLYWOOD — box type & frame type, across three laminate finishes
// ----------------------------------------------------------------------------
const fullyPlywoodSections: AccordionSection[] = [
  {
    id: "laminate-08mm",
    title: "0.8mm Thick Laminate",
    lines: [
      { label: "MR Grade (Non Branded) Box Type", value: "₹1,400/sqft" },
      { label: "MR Grade (Non Branded) Frame Type", value: "₹700/sqft" },
      { label: "BWP Grade (Non Branded) Box Type", value: "₹1,550/sqft" },
      { label: "BWP Grade (Non Branded) Frame Type", value: "₹800/sqft" },
      { label: "MR Grade (Century Brand) Box Type", value: "₹1,700/sqft" },
      { label: "MR Grade (Century Brand) Frame Type", value: "₹900/sqft" },
      { label: "BWP Grade (Century Brand) Box Type", value: "₹1,850/sqft" },
      { label: "BWP Grade (Century Brand) Frame Type", value: "₹1,000/sqft" },
    ],
  },
  {
    id: "laminate-10mm",
    title: "1.0mm Thick Laminate",
    lines: [
      { label: "MR Grade (Non Branded) Box Type", value: "₹1,550/sqft" },
      { label: "MR Grade (Non Branded) Frame Type", value: "₹800/sqft" },
      { label: "BWP Grade (Non Branded) Box Type", value: "₹1,600/sqft" },
      { label: "BWP Grade (Non Branded) Frame Type", value: "₹900/sqft" },
      { label: "MR Grade (Century Brand) Box Type", value: "₹1,800/sqft" },
      { label: "MR Grade (Century Brand) Frame Type", value: "₹950/sqft" },
      { label: "BWP Grade (Century Brand) Box Type", value: "₹1,950/sqft" },
      { label: "BWP Grade (Century Brand) Frame Type", value: "₹1,050/sqft" },
    ],
  },
  {
    id: "laminate-acrylic",
    title: "Acrylic Laminate",
    lines: [
      { label: "MR Grade (Non Branded) Box Type", value: "₹1,750/sqft" },
      { label: "MR Grade (Non Branded) Frame Type", value: "₹950/sqft" },
      { label: "BWP Grade (Non Branded) Box Type", value: "₹1,900/sqft" },
      { label: "BWP Grade (Non Branded) Frame Type", value: "₹1,050/sqft" },
      { label: "MR Grade (Century Brand) Box Type", value: "₹2,050/sqft" },
      { label: "MR Grade (Century Brand) Frame Type", value: "₹1,100/sqft" },
      { label: "BWP Grade (Century Brand) Box Type", value: "₹2,200/sqft" },
      { label: "BWP Grade (Century Brand) Frame Type", value: "₹1,200/sqft" },
    ],
  },
];

// ----------------------------------------------------------------------------
// HDHMR DOORS AND PLYWOOD CARCASS — box type & frame type, across three
// laminate finishes
// ----------------------------------------------------------------------------
const hdhmrCarcassSections: AccordionSection[] = [
  {
    id: "laminate-08mm",
    title: "0.8mm Thick Laminate",
    lines: [
      { label: "MR Grade Carcass Box Type", value: "₹1,400/sqft" },
      { label: "MR Grade Carcass Frame Type", value: "₹650/sqft" },
      { label: "BWP Grade Carcass Box Type", value: "₹1,550/sqft" },
      { label: "BWP Grade Carcass Frame Type", value: "₹750/sqft" },
      { label: "MR Grade (Branded) Carcass Box Type", value: "₹1,650/sqft" },
      { label: "MR Grade (Branded) Carcass Frame Type", value: "₹850/sqft" },
      { label: "BWP Grade (Branded) Carcass Box Type", value: "₹1,800/sqft" },
      { label: "BWP Grade (Branded) Carcass Frame Type", value: "₹950/sqft" },
    ],
  },
  {
    id: "laminate-10mm",
    title: "1.0mm Thick Laminate",
    lines: [
      { label: "MR Grade Carcass Box Type", value: "₹1,500/sqft" },
      { label: "MR Grade Carcass Frame Type", value: "₹700/sqft" },
      { label: "BWP Grade Carcass Box Type", value: "₹1,650/sqft" },
      { label: "BWP Grade Carcass Frame Type", value: "₹800/sqft" },
      { label: "MR Grade (Branded) Carcass Box Type", value: "₹1,750/sqft" },
      { label: "MR Grade (Branded) Carcass Frame Type", value: "₹900/sqft" },
      { label: "BWP Grade (Branded) Carcass Box Type", value: "₹1,900/sqft" },
      { label: "BWP Grade (Branded) Carcass Frame Type", value: "₹1,000/sqft" },
    ],
  },
  {
    id: "laminate-acrylic",
    title: "Acrylic Laminate",
    lines: [
      { label: "MR Grade Carcass Box Type", value: "₹1,650/sqft" },
      { label: "MR Grade Carcass Frame Type", value: "₹900/sqft" },
      { label: "BWP Grade Carcass Box Type", value: "₹1,850/sqft" },
      { label: "BWP Grade Carcass Frame Type", value: "₹1,000/sqft" },
      { label: "MR Grade (Branded) Carcass Box Type", value: "₹2,000/sqft" },
      { label: "MR Grade (Branded) Carcass Frame Type", value: "₹1,050/sqft" },
      { label: "BWP Grade (Branded) Carcass Box Type", value: "₹2,150/sqft" },
      { label: "BWP Grade (Branded) Carcass Frame Type", value: "₹1,150/sqft" },
    ],
  },
];

// ----------------------------------------------------------------------------
// "What's Not Included" — notes from the bottom of the interior rate sheet
// ----------------------------------------------------------------------------
const interiorExclusions: string[] = [
  "Kitchen cabinet tandem",
  "Lighting",
  "Accessories",
  "Mirrors",
];

// ============================================================================
// FINAL EXPORT — array of interior packages, same shape as constructionTiers
// ============================================================================
export const interiorPackages: InteriorPackage[] = [
  {
    id: "fully-plywood",
    name: "Fully Plywood",
    rate: 700,
    tagline: "Complete plywood box & frame construction, non-branded to Century",
    popular: true,
    sections: fullyPlywoodSections,
    exclusions: interiorExclusions,
  },
  {
    id: "hdhmr-carcass",
    name: "HDHMR Carcass",
    rate: 650,
    tagline: "HDHMR doors with plywood carcass, box & frame construction",
    sections: hdhmrCarcassSections,
    exclusions: interiorExclusions,
  },
];
