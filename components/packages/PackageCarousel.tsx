"use client";

import { useEffect, useRef, useState } from "react";
import type { ConstructionTier } from "@/data/packages";
import { cn } from "@/lib/utils";
import PackageCard from "./PackageCard";

interface PackageCarouselProps {
  tiers: ConstructionTier[];
  /** Shared category id — passed straight through to every card so they
   *  all expand the same section as the user taps the tab bar above. */
  activeCategoryId: string;
}

/**
 * Mobile/tablet package comparison: a swipeable, snap-scrolling carousel
 * (one package occupies almost the full screen width) with a dot indicator
 * that tracks whichever card is currently centred in view.
 */
export default function PackageCarousel({ tiers, activeCategoryId }: PackageCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!mostVisible) return;
        const idx = cardRefs.current.findIndex((el) => el === mostVisible.target);
        if (idx !== -1) setActiveIndex(idx);
      },
      { root: track, threshold: [0.5, 0.75, 1] }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [tiers.length]);

  const scrollToIndex = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div>
      <div
        ref={trackRef}
        data-lenis-prevent
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 pl-1 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tiers.map((tier, i) => (
          <div
            key={tier.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="w-[86vw] shrink-0 snap-center sm:w-[380px]"
          >
            <PackageCard tier={tier} index={i} activeCategoryId={activeCategoryId} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {tiers.map((tier, i) => (
          <button
            key={tier.id}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to ${tier.name} package`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === activeIndex ? "w-6 bg-royal-700" : "w-1.5 bg-royal-200"
            )}
          />
        ))}
      </div>
    </div>
  );
}
