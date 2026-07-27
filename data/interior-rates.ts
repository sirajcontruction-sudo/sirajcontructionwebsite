export type InteriorRateRow = {
  category: string;
  materialType: string;
  laminateType: string;
  boxType: number;
  frameType: number;
};

export type InteriorRateSection = {
  section: string;
  rows: InteriorRateRow[];
};

// Sourced from Construction_cost_packages_13_07_2026.xlsx — Interior Work Rates sheet
export const interiorRateSections: InteriorRateSection[] = [
  {
    section: "Fully Plywood",
    rows: [
      { category: "MR Grade (Non Branded)", materialType: "Plywood", laminateType: "0.8mm Thick Laminate", boxType: 1400, frameType: 700 },
      { category: "BWP Grade (Non Branded)", materialType: "Plywood", laminateType: "0.8mm Thick Laminate", boxType: 1550, frameType: 800 },
      { category: "MR Grade (Century Brand)", materialType: "Plywood", laminateType: "0.8mm Thick Laminate", boxType: 1700, frameType: 900 },
      { category: "BWP Grade (Century Brand)", materialType: "Plywood", laminateType: "0.8mm Thick Laminate", boxType: 1850, frameType: 1000 },
      { category: "MR Grade (Non Branded)", materialType: "Plywood", laminateType: "1.0mm Thick Laminate", boxType: 1550, frameType: 800 },
      { category: "BWP Grade (Non Branded)", materialType: "Plywood", laminateType: "1.0mm Thick Laminate", boxType: 1600, frameType: 900 },
      { category: "MR Grade (Century Brand)", materialType: "Plywood", laminateType: "1.0mm Thick Laminate", boxType: 1800, frameType: 950 },
      { category: "BWP Grade (Century Brand)", materialType: "Plywood", laminateType: "1.0mm Thick Laminate", boxType: 1950, frameType: 1050 },
      { category: "MR Grade (Non Branded)", materialType: "Plywood", laminateType: "Acrylic Laminate", boxType: 1750, frameType: 950 },
      { category: "BWP Grade (Non Branded)", materialType: "Plywood", laminateType: "Acrylic Laminate", boxType: 1900, frameType: 1050 },
      { category: "MR Grade (Century Brand)", materialType: "Plywood", laminateType: "Acrylic Laminate", boxType: 2050, frameType: 1100 },
      { category: "BWP Grade (Century Brand)", materialType: "Plywood", laminateType: "Acrylic Laminate", boxType: 2200, frameType: 1200 },
    ],
  },
  {
    section: "HDHMR Doors & Plywood Carcass",
    rows: [
      { category: "MR Grade", materialType: "Plywood Carcass", laminateType: "0.8mm Thick Laminate", boxType: 1400, frameType: 650 },
      { category: "BWP Grade", materialType: "Plywood Carcass", laminateType: "0.8mm Thick Laminate", boxType: 1550, frameType: 750 },
      { category: "MR Grade (Branded)", materialType: "Carcass Plywood", laminateType: "0.8mm Thick Laminate", boxType: 1650, frameType: 850 },
      { category: "BWP Grade (Branded)", materialType: "Carcass Plywood", laminateType: "0.8mm Thick Laminate", boxType: 1800, frameType: 950 },
      { category: "MR Grade", materialType: "Plywood Carcass", laminateType: "1.0mm Thick Laminate", boxType: 1500, frameType: 700 },
      { category: "BWP Grade", materialType: "Plywood Carcass", laminateType: "1.0mm Thick Laminate", boxType: 1650, frameType: 800 },
      { category: "MR Grade (Branded)", materialType: "Carcass Plywood", laminateType: "1.0mm Thick Laminate", boxType: 1750, frameType: 900 },
      { category: "BWP Grade (Branded)", materialType: "Carcass Plywood", laminateType: "1.0mm Thick Laminate", boxType: 1900, frameType: 1000 },
      { category: "MR Grade", materialType: "Plywood Carcass", laminateType: "Acrylic Laminate", boxType: 1650, frameType: 900 },
      { category: "BWP Grade", materialType: "Plywood Carcass", laminateType: "Acrylic Laminate", boxType: 1850, frameType: 1000 },
      { category: "MR Grade (Branded)", materialType: "Carcass Plywood", laminateType: "Acrylic Laminate", boxType: 2000, frameType: 1050 },
      { category: "BWP Grade (Branded)", materialType: "Carcass Plywood", laminateType: "Acrylic Laminate", boxType: 2150, frameType: 1150 },
    ],
  },
];

export const interiorRateNotes: string[] = [
  "Kitchen cabinet tandem, lighting, accessories and mirrors will be additional cost.",
  "Century Ply carries a 15-year warranty.",
];
