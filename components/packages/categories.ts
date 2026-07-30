import {
  Ban,
  Boxes,
  ChefHat,
  ClipboardList,
  Construction,
  DoorOpen,
  Droplets,
  LayoutGrid,
  PaintBucket,
  PenTool,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { constructionTiers } from "@/data/packages";

export interface NavCategory {
  id: string;
  title: string;
  icon: LucideIcon;
}

export const EXCLUSIONS_ID = "__exclusions";

// Purely presentational — maps each existing accordion section id to an
// icon for the shared navigator. No section data is added/removed/renamed.
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  design: PenTool,
  projectManagement: ClipboardList,
  structure: Construction,
  bathroomPlumbing: Droplets,
  flooring: LayoutGrid,
  kitchenDining: ChefHat,
  doorsWindowsRailings: DoorOpen,
  painting: PaintBucket,
  electrical: Zap,
  otherInclusions: Boxes,
};

// Every tier shares the exact same section ids/titles in the same order
// (see data/packages.ts — SECTION_TITLES), so the shared category
// navigator only needs to be derived once, from any single tier.
export const packageCategories: NavCategory[] = [
  ...constructionTiers[0].sections.map((section) => ({
    id: section.id,
    title: section.title,
    icon: CATEGORY_ICONS[section.id] ?? Boxes,
  })),
  { id: EXCLUSIONS_ID, title: "What's Not Included", icon: Ban },
];

export const DEFAULT_CATEGORY_ID = packageCategories[0].id;
