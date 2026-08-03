// ============================================================================
// data/packages.ts
// Source of truth: Construction_cost_packages_13_07_2026.xlsx — Sheet1
// Every value below is copied directly from the sheet — nothing invented.
// Each tier (Budget / Economic / Premium / Luxury) owns its OWN independent
// set of accordion rows. There is no shared/common specification table.
// ============================================================================

export type TierId = "budget" | "economic" | "premium" | "luxury";

/** A single "label: value" line inside an accordion section */
export interface SpecLine {
  label: string;
  value: string;
}

/** One accordion section (e.g. "Structure") for a single tier */
export interface AccordionSection {
  id: string;
  title: string;
  lines: SpecLine[];
}

/** Card-level summary info shown above the accordions */
export interface ConstructionTier {
  id: TierId;
  name: string;
  rate: number; // ₹ per sqft
  tagline: string;
  popular?: boolean;
  /** Fully independent accordion data — only this tier's own values */
  sections: AccordionSection[];
  /** Tier-specific exclusions / add-on costs */
  exclusions: string[];
}

// ----------------------------------------------------------------------------
// Reusable section id/title map so every tier renders sections in the same
// order with the same headings, while the underlying values stay independent.
// ----------------------------------------------------------------------------
const SECTION_TITLES = {
  design: "Design",
  structure: "Structure",
  bathroomPlumbing: "Bathroom",
  flooring: "Flooring",
  kitchenDining: "Kitchen",
  doorsWindowsRailings: "Joinery",
  painting: "Painting",
  electrical: "Electrical",
  otherInclusions: "Other Inclusions",
} as const;

// ============================================================================
// BUDGET
// ============================================================================
const budgetSections: AccordionSection[] = [
  {
    id: "design",
    title: SECTION_TITLES.design,
    lines: [
      { label: "2D Architectural Layout", value: "Included" },
      { label: "Elevation", value: "Included" },
      { label: "3D Elevation", value: "Included" },
      { label: "Structural Design", value: "Included" },
      { label: "Electrical Drawings", value: "Not Included" },
      { label: "Plumbing Drawings", value: "Not Included" },
      { label: "Furniture Plan Drawings", value: "Not Included" },
    ],
  },
  {
    id: "structure",
    title: SECTION_TITLES.structure,
    lines: [
      { label: "Basement", value: "Up to 3 ft from ground level" },
      { label: "Steel", value: "Pulkit or Equivalent" },
      { label: "Cement", value: "53 Grade Dalmia / Zuari or Equivalent" },
      { label: "Aggregate", value: "20mm & 40mm Blue metal" },
      { label: "Red Brick", value: "9\" exterior / 4.5\" internal wall" },
      { label: "Sand", value: "M-sand brick work, P-sand plastering" },
      { label: "RCC", value: "M20 / M25 Grade" },
      { label: "Water Proofing", value: "Dr. Fixit / Fosroc" },
      { label: "Ceiling Height", value: "10 ft clear height" },
    ],
  },
  {
    id: "bathroomPlumbing",
    title: SECTION_TITLES.bathroomPlumbing,
    lines: [
      { label: "7 ft Ht Wall Dado", value: "Up to ₹45/sqft" },
      { label: "Sanitary & CP Fittings", value: "Up to ₹17,000/bath — Hindware / Parryware" },
      { label: "CPVC Pipe", value: "Astral or Equivalent" },
      { label: "Doors", value: "Water-proof flush / WPC" },
      { label: "Accessories", value: "Not Included" },
    ],
  },
  {
    id: "flooring",
    title: SECTION_TITLES.flooring,
    lines: [
      { label: "Living & Dining", value: "Tiles up to ₹60/sqft" },
      { label: "Rooms & Kitchen", value: "Tiles up to ₹50/sqft" },
      { label: "Balcony & Open Area", value: "Anti-skid Tiles up to ₹45/sqft" },
      { label: "Staircase", value: "Granite up to ₹70/sqft" },
      { label: "Parking Tiles", value: "Anti-skid Tiles up to ₹45/sqft" },
    ],
  },
  {
    id: "kitchenDining",
    title: SECTION_TITLES.kitchenDining,
    lines: [
      { label: "2 ft Ceramic Wall Dado", value: "Up to ₹45/sqft" },
      { label: "Sink Faucet", value: "Up to ₹2,000" },
      { label: "Kitchen Sink", value: "SS up to ₹3,000" },
      { label: "Kitchen Granite Slab", value: "Up to ₹100/sqft" },
    ],
  },
  {
    id: "doorsWindowsRailings",
    title: SECTION_TITLES.doorsWindowsRailings,
    lines: [
      { label: "Window", value: "Aluminium sliding, glass shutter — Jindal" },
      { label: "Main Door", value: "Teak Wood Door with Frame (5\" × 3\"), up to ₹25,000" },
      { label: "Internal Doors", value: "Membrane / Flush, Sal wood frame, up to ₹8,000" },
      { label: "Pooja Room Door", value: "Not Included" },
      { label: "Hand Rail", value: "MS with enamel paint" },
      { label: "Window Grill", value: "MS with enamel paint" },
    ],
  },
  {
    id: "painting",
    title: SECTION_TITLES.painting,
    lines: [
      { label: "Internal Paint", value: "Asian Primer + Putty + Tractor Emulsion" },
      { label: "External Paint", value: "Primer + Ace Exterior Emulsion" },
    ],
  },
  {
    id: "electrical",
    title: SECTION_TITLES.electrical,
    lines: [
      { label: "Wires", value: "Kundan or Equivalent" },
      { label: "Switches & Sockets", value: "Anchor Ziva or Equivalent" },
    ],
  },
  {
    id: "otherInclusions",
    title: SECTION_TITLES.otherInclusions,
    lines: [
      { label: "Overhead Tank", value: "1000L — Sunplast" },
      { label: "Parapet Wall", value: "4.5\" thick, up to 3 ft" },
      { label: "Loft & Shelves", value: "1 each — bed/kitchen/pooja" },
    ],
  },
];

// ============================================================================
// ECONOMIC
// ============================================================================
const economicSections: AccordionSection[] = [
  {
    id: "design",
    title: SECTION_TITLES.design,
    lines: [
      { label: "2D Architectural Layout", value: "Included" },
      { label: "Elevation", value: "Included" },
      { label: "3D Elevation", value: "Included" },
      { label: "Structural Design", value: "Included" },
      { label: "Electrical Drawings", value: "Included" },
      { label: "Plumbing Drawings", value: "Included" },
      { label: "Furniture Plan Drawings", value: "Not Included" },
    ],
  },
  {
    id: "structure",
    title: SECTION_TITLES.structure,
    lines: [
      { label: "Basement", value: "Up to 3.5 ft from ground level" },
      { label: "Steel", value: "ARS or Equivalent" },
      { label: "Cement", value: "53 Grade Ramco or Equivalent" },
      { label: "Aggregate", value: "20mm & 40mm Blue metal" },
      { label: "Red Brick", value: "9\" exterior / 4.5\" internal wall" },
      { label: "Sand", value: "M-sand brick work, P-sand plastering" },
      { label: "RCC", value: "M20 / M25 Grade" },
      { label: "Water Proofing", value: "Dr. Fixit / Fosroc" },
      { label: "Ceiling Height", value: "10 ft clear height" },
    ],
  },
  {
    id: "bathroomPlumbing",
    title: SECTION_TITLES.bathroomPlumbing,
    lines: [
      { label: "7 ft Ht Wall Dado", value: "Up to ₹60/sqft" },
      { label: "Sanitary & CP Fittings", value: "Up to ₹25,000/bath — Parryware" },
      { label: "CPVC Pipe", value: "Ashirwad / Supreme" },
      { label: "Doors", value: "Water-proof flush / WPC" },
      { label: "Accessories", value: "Not Included" },
    ],
  },
  {
    id: "flooring",
    title: SECTION_TITLES.flooring,
    lines: [
      { label: "Living & Dining", value: "Tiles up to ₹80/sqft" },
      { label: "Rooms & Kitchen", value: "Tiles up to ₹70/sqft" },
      { label: "Balcony & Open Area", value: "Anti-skid Tiles up to ₹60/sqft" },
      { label: "Staircase", value: "Granite up to ₹80/sqft" },
      { label: "Parking Tiles", value: "Anti-skid Tiles up to ₹55/sqft" },
    ],
  },
  {
    id: "kitchenDining",
    title: SECTION_TITLES.kitchenDining,
    lines: [
      { label: "2 ft Ceramic Wall Dado", value: "Up to ₹60/sqft" },
      { label: "Sink Faucet", value: "Up to ₹2,500" },
      { label: "Kitchen Sink", value: "SS up to ₹4,000" },
      { label: "Kitchen Granite Slab", value: "Up to ₹120/sqft" },
    ],
  },
  {
    id: "doorsWindowsRailings",
    title: SECTION_TITLES.doorsWindowsRailings,
    lines: [
      { label: "Window", value: "UPVC sliding, glass shutter — Venesta" },
      { label: "Main Door", value: "Teak Wood Door with Frame (5\" × 3\"), up to ₹35,000" },
      { label: "Internal Doors", value: "Membrane / Flush, Sal wood frame, up to ₹10,000" },
      { label: "Pooja Room Door", value: "Not Included" },
      { label: "Hand Rail", value: "MS with enamel paint" },
      { label: "Window Grill", value: "MS with enamel paint" },
    ],
  },
  {
    id: "painting",
    title: SECTION_TITLES.painting,
    lines: [
      { label: "Internal Paint", value: "Asian Primer + Putty + Tractor Shyne Emulsion" },
      { label: "External Paint", value: "Primer + Apex Exterior Emulsion" },
    ],
  },
  {
    id: "electrical",
    title: SECTION_TITLES.electrical,
    lines: [
      { label: "Wires", value: "Orbit or Equivalent" },
      { label: "Switches & Sockets", value: "Anchor Roma or Equivalent" },
    ],
  },
  {
    id: "otherInclusions",
    title: SECTION_TITLES.otherInclusions,
    lines: [
      { label: "Overhead Tank", value: "1500L — Sunplast" },
      { label: "Parapet Wall", value: "4.5\" thick, up to 3 ft" },
      { label: "Loft & Shelves", value: "1 each — bed/kitchen/pooja" },
    ],
  },
];

// ============================================================================
// PREMIUM
// ============================================================================
const premiumSections: AccordionSection[] = [
  {
    id: "design",
    title: SECTION_TITLES.design,
    lines: [
      { label: "2D Architectural Layout", value: "Included" },
      { label: "Elevation", value: "Included" },
      { label: "3D Elevation", value: "Included" },
      { label: "Structural Design", value: "Included" },
      { label: "Electrical Drawings", value: "Included" },
      { label: "Plumbing Drawings", value: "Included" },
      { label: "Furniture Plan Drawings", value: "Not Included" },
    ],
  },
  {
    id: "structure",
    title: SECTION_TITLES.structure,
    lines: [
      { label: "Basement", value: "Up to 4 ft from ground level" },
      { label: "Steel", value: "JSW or Equivalent" },
      { label: "Cement", value: "53 Grade Coromandel / Ultratech" },
      { label: "Aggregate", value: "20mm & 40mm Blue metal" },
      { label: "Red Brick", value: "9\" exterior / 4.5\" internal wall" },
      { label: "Sand", value: "M-sand brick work, River sand plastering" },
      { label: "RCC", value: "M20 / M25 Grade" },
      { label: "Water Proofing", value: "Dr. Fixit / Fosroc" },
      { label: "Ceiling Height", value: "10.5 ft clear height" },
    ],
  },
  {
    id: "bathroomPlumbing",
    title: SECTION_TITLES.bathroomPlumbing,
    lines: [
      { label: "7 ft Ht Wall Dado", value: "Up to ₹75/sqft" },
      { label: "Sanitary & CP Fittings", value: "Up to ₹32,000/bath — Jaguar" },
      { label: "CPVC Pipe", value: "Ashirwad / Supreme" },
      { label: "Doors", value: "Water-proof flush / WPC" },
      { label: "Accessories", value: "Mirror, Soap dish, Towel rail — up to ₹7,000/1000 sqft" },
    ],
  },
  {
    id: "flooring",
    title: SECTION_TITLES.flooring,
    lines: [
      { label: "Living & Dining", value: "Tiles / Granite / Marble up to ₹120/sqft" },
      { label: "Rooms & Kitchen", value: "Tiles / Granite / Marble up to ₹100/sqft" },
      { label: "Balcony & Open Area", value: "Anti-skid Tiles up to ₹80/sqft" },
      { label: "Staircase", value: "Granite up to ₹110/sqft" },
      { label: "Parking Tiles", value: "Anti-skid Tiles up to ₹70/sqft" },
    ],
  },
  {
    id: "kitchenDining",
    title: SECTION_TITLES.kitchenDining,
    lines: [
      { label: "2 ft Ceramic Wall Dado", value: "Up to ₹80/sqft" },
      { label: "Sink Faucet", value: "Up to ₹3,000" },
      { label: "Kitchen Sink", value: "SS / Granite up to ₹6,000" },
      { label: "Kitchen Granite Slab", value: "Up to ₹140/sqft" },
    ],
  },
  {
    id: "doorsWindowsRailings",
    title: SECTION_TITLES.doorsWindowsRailings,
    lines: [
      { label: "Window", value: "UPVC, glass + mesh shutter — Prominance" },
      { label: "Main Door", value: "Teak Wood Door with Frame (5\" × 3.5\"), up to ₹45,000" },
      { label: "Internal Doors", value: "Membrane / Flush, Sal wood frame, up to ₹12,000" },
      { label: "Pooja Room Door", value: "Teak wood, up to ₹15,000" },
      { label: "Hand Rail", value: "SS Grade 304" },
      { label: "Window Grill", value: "MS with enamel paint" },
    ],
  },
  {
    id: "painting",
    title: SECTION_TITLES.painting,
    lines: [
      { label: "Internal Paint", value: "Asian Primer + Putty + Apcolite Premium Emulsion" },
      { label: "External Paint", value: "Primer + Apex Exterior Emulsion" },
    ],
  },
  {
    id: "electrical",
    title: SECTION_TITLES.electrical,
    lines: [
      { label: "Wires", value: "Finolex or Equivalent" },
      { label: "Switches & Sockets", value: "Legrand Lyncus / GM Modular" },
    ],
  },
  {
    id: "otherInclusions",
    title: SECTION_TITLES.otherInclusions,
    lines: [
      { label: "Overhead Tank", value: "2000L — Sintex" },
      { label: "Parapet Wall", value: "4.5\" thick, up to 3 ft" },
      { label: "Loft & Shelves", value: "1 each — bed/kitchen/pooja" },
    ],
  },
];

// ============================================================================
// LUXURY
// ============================================================================
const luxurySections: AccordionSection[] = [
  {
    id: "design",
    title: SECTION_TITLES.design,
    lines: [
      { label: "2D Architectural Layout", value: "Included" },
      { label: "Elevation", value: "Included" },
      { label: "3D Elevation", value: "Included" },
      { label: "Structural Design", value: "Included" },
      { label: "Electrical Drawings", value: "Included" },
      { label: "Plumbing Drawings", value: "Included" },
      { label: "Furniture Plan Drawings", value: "Included" },
    ],
  },
  {
    id: "structure",
    title: SECTION_TITLES.structure,
    lines: [
      { label: "Basement", value: "Up to 4.5 ft from ground level" },
      { label: "Steel", value: "Vizag / Tata or Equivalent" },
      { label: "Cement", value: "53 Grade Coromandel / Ultratech" },
      { label: "Aggregate", value: "20mm & 40mm Blue metal" },
      { label: "Red Brick", value: "9\" exterior / 4.5\" internal wall" },
      { label: "Sand", value: "M-sand brick work, River sand plastering" },
      { label: "RCC", value: "M20 / M25 Grade" },
      { label: "Water Proofing", value: "Dr. Fixit / Fosroc" },
      { label: "Ceiling Height", value: "10.5 ft clear height" },
    ],
  },
  {
    id: "bathroomPlumbing",
    title: SECTION_TITLES.bathroomPlumbing,
    lines: [
      { label: "7 ft Ht Wall Dado", value: "Up to ₹90/sqft" },
      { label: "Sanitary & CP Fittings", value: "Up to ₹40,000/bath — Jaguar" },
      { label: "CPVC Pipe", value: "Ashirwad / Supreme" },
      { label: "Doors", value: "Water-proof flush / WPC" },
      { label: "Accessories", value: "Mirror, Soap dish, Towel rail — up to ₹7,000/1000 sqft" },
    ],
  },
  {
    id: "flooring",
    title: SECTION_TITLES.flooring,
    lines: [
      { label: "Living & Dining", value: "Tiles / Granite / Marble up to ₹160/sqft" },
      { label: "Rooms & Kitchen", value: "Tiles / Granite / Marble up to ₹140/sqft" },
      { label: "Balcony & Open Area", value: "Anti-skid Tiles up to ₹90/sqft" },
      { label: "Staircase", value: "Granite up to ₹140/sqft" },
      { label: "Parking Tiles", value: "Anti-skid Tiles up to ₹80/sqft" },
    ],
  },
  {
    id: "kitchenDining",
    title: SECTION_TITLES.kitchenDining,
    lines: [
      { label: "2 ft Ceramic Wall Dado", value: "Up to ₹90/sqft" },
      { label: "Sink Faucet", value: "Up to ₹3,500" },
      { label: "Kitchen Sink", value: "SS / Granite up to ₹8,000" },
      { label: "Kitchen Granite Slab", value: "Up to ₹160/sqft" },
    ],
  },
  {
    id: "doorsWindowsRailings",
    title: SECTION_TITLES.doorsWindowsRailings,
    lines: [
      { label: "Window", value: "UPVC, glass + mesh shutter — Fenesta" },
      { label: "Main Door", value: "Teak Wood Door with Frame (5\" × 3.5\"), up to ₹55,000" },
      { label: "Internal Doors", value: "Membrane / Flush, Sal wood frame, up to ₹15,000" },
      { label: "Pooja Room Door", value: "Teak wood, up to ₹25,000" },
      { label: "Hand Rail", value: "SS + Glass, Grade 304" },
      { label: "Window Grill", value: "MS with enamel paint" },
    ],
  },
  {
    id: "painting",
    title: SECTION_TITLES.painting,
    lines: [
      { label: "Internal Paint", value: "Asian Primer + Putty + Royal Luxury Emulsion" },
      { label: "External Paint", value: "Primer + Apex Ultima Exterior Emulsion" },
    ],
  },
  {
    id: "electrical",
    title: SECTION_TITLES.electrical,
    lines: [
      { label: "Wires", value: "Finolex or Equivalent" },
      { label: "Switches & Sockets", value: "Legrand Myrius or Equivalent" },
    ],
  },
  {
    id: "otherInclusions",
    title: SECTION_TITLES.otherInclusions,
    lines: [
      { label: "Overhead Tank", value: "2000L — Sintex" },
      { label: "Parapet Wall", value: "4.5\" thick, up to 3 ft" },
      { label: "Loft & Shelves", value: "1 each — bed/kitchen/pooja" },
    ],
  },
];

// ----------------------------------------------------------------------------
// "What's Not Included" — common exclusions from the sheet, attached to
// every tier (each tier still owns its own copy of the array).
// ----------------------------------------------------------------------------
const commonExclusions: string[] = [
  "Compound wall @ ₹450/sqft",
  "EB, water connection & Govt. approval charges",
  "UG Sump @ ₹30/litre",
  "Septic Tank @ ₹25/litre",
  "OHT RCC tank @ ₹35/litre",
  "Roof cooling tiles",
  "Bore well",
  "Soak pit",
  "Setback area development",
  "Main gate & safety gates",
  "Elevation works",
];

// ============================================================================
// FINAL EXPORT — array of fully independent tiers
// ============================================================================
export const constructionTiers: ConstructionTier[] = [
  {
    id: "budget",
    name: "Budget",
    rate: 2299,
    tagline: "Smart essentials, honest quality,improve your living ",
    sections: budgetSections,
    exclusions: commonExclusions,
  },
  {
    id: "economic",
    name: "Economic",
    rate: 2499,
    tagline: "Balanced value for growing families",
    popular: true,
    sections: economicSections,
    exclusions: commonExclusions,
  },
  {
    id: "premium",
    name: "Premium",
    rate: 2799,
    tagline: "Elevated finishes, refined detailing",
    sections: premiumSections,
    exclusions: commonExclusions,
  },
  {
    id: "luxury",
    name: "Luxury",
    rate: 2999,
    tagline: "Signature craftsmanship, top-tier brands",
    sections: luxurySections,
    exclusions: commonExclusions,
  },
];
