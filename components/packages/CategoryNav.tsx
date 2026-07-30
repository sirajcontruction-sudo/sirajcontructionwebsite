"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavCategory } from "./categories";

interface CategoryNavProps {
  categories: NavCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}

/**
 * Desktop vertical sidebar — the single source of truth for which category
 * is expanded. Selecting a category here updates the shared state that
 * every package card reads from, so all four cards open the same section
 * simultaneously.
 */
export default function CategoryNav({ categories, activeId, onSelect }: CategoryNavProps) {
  return (
    <nav aria-label="Package feature categories" className="hidden self-start lg:sticky lg:top-28 lg:block">
      <ul className="space-y-1">
        {categories.map((category) => {
          const isActive = category.id === activeId;
          const Icon = category.icon;
          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onSelect(category.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-200",
                  isActive ? "text-white" : "text-ink-soft hover:bg-white/70 hover:text-navy"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="category-nav-highlight"
                    className="absolute inset-0 rounded-xl bg-royal-gradient shadow-premium"
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative z-10 flex min-w-0 flex-1 items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{category.title}</span>
                </span>
                <ChevronRight
                  className={cn(
                    "relative z-10 h-4 w-4 shrink-0 transition-all duration-200",
                    isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                  )}
                  aria-hidden="true"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
