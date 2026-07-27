export type ProcessStep = {
  id: string;
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  { id: "s1", step: "01", title: "Consultation & Site Visit", description: "We understand your requirements, budget and visit your plot to assess feasibility." },
  { id: "s2", step: "02", title: "Design & 3D Elevation", description: "Our architects prepare 2D layouts and photorealistic 3D elevations for your approval." },
  { id: "s3", step: "03", title: "Package Selection & Contract", description: "Choose from Budget to Luxury tiers with a transparent, fixed-rate written agreement." },
  { id: "s4", step: "04", title: "Structural Execution", description: "Foundation, RCC framework and masonry executed with certified engineers on-site." },
  { id: "s5", step: "05", title: "Finishing & Interiors", description: "Flooring, paint, joineries, electrical and modular interiors brought to life." },
  { id: "s6", step: "06", title: "Quality Check & Handover", description: "Final inspection against specification sheet, followed by keys-in-hand handover." },
];
