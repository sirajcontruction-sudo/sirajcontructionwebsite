"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { NavCategory } from "./categories";

interface CategoryTabBarProps {
  categories: NavCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}

/**
 * Mobile/tablet horizontal sticky tab bar — same shared category state as
 * the desktop sidebar, just presented as a swipeable row of pills so it
 * stays reachable while the user swipes between package cards below it.
 */
export default function CategoryTabBar({ categories, activeId, onSelect }: CategoryTabBarProps) {
  return (
    <div className="sticky top-20 z-30 -mx-6 mb-6 border-b border-black/5 bg-mist/95 px-6 py-3 lg:hidden">
      <div
        data-lenis-prevent
        className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-200",
                isActive ? "text-white" : "text-ink-soft hover:text-navy"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="category-tab-highlight"
                  className="absolute inset-0 rounded-full bg-royal-gradient shadow-md"
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span className="relative z-10">{category.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
