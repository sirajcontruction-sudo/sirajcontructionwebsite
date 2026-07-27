import type { LucideIcon } from "lucide-react";
import { Building2, HardHat, PencilRuler, Sofa, KeyRound, Hammer } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
};

export const services: Service[] = [
  {
    id: "civil-contracting",
    title: "Civil Contracting",
    description:
      "End-to-end civil execution with certified engineers, quality materials and disciplined site management.",
    icon: HardHat,
    points: ["Foundation to finishing", "Quality-checked materials", "Dedicated site supervisor"],
  },
  {
    id: "construction",
    title: "Residential Construction",
    description:
      "Individual homes and villas built on structural precision, transparent costing and on-time delivery.",
    icon: Building2,
    points: ["Vastu-friendly planning", "4-tier package options", "Fixed-rate contracts"],
  },
  {
    id: "architecture",
    title: "Architecture & Design",
    description:
      "2D layouts, 3D elevations and structural drawings crafted to balance aesthetics with buildability.",
    icon: PencilRuler,
    points: ["3D elevation walkthroughs", "Structural + MEP drawings", "Approval-ready documentation"],
  },
  {
    id: "interior-design",
    title: "Interior Design",
    description:
      "Modular kitchens, wardrobes and full-home interiors in premium plywood, laminates and finishes.",
    icon: Sofa,
    points: ["Modular kitchen & wardrobes", "Century Ply certified work", "3D interior visualisation"],
  },
  {
    id: "turnkey",
    title: "Turnkey Construction",
    description:
      "One partner from design to handover — structure, MEP, finishing and interiors under a single roof.",
    icon: KeyRound,
    points: ["Single point of contact", "Design-to-handover", "Transparent milestone billing"],
  },
  {
    id: "renovation",
    title: "Renovation & Remodelling",
    description:
      "Structural retrofits, façade upgrades and interior remodels that modernise without the rebuild.",
    icon: Hammer,
    points: ["Structural retrofitting", "Façade & elevation upgrade", "Minimal-disruption execution"],
  },
];
