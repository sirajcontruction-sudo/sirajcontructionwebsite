"use client";

import { useEffect, useRef, useState } from "react";
import type { ConstructionTier } from "@/data/packages";
import { cn } from "@/lib/utils";
import MobilePackageCard from "./MobilePackageCard";

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
            <MobilePackageCard tier={tier} activeCategoryId={activeCategoryId} />
          </div>
        ))}
      </div>

      {/* The indicator previously animated each dot's `width` between 6px and
          24px. That runs layout on every frame, and because the row is
          centred, the whole strip re-centred as the active dot grew — a
          visible horizontal shift on every swipe.

          Each dot now occupies a fixed 24px slot and the pill inside is
          scaled with `transform`, so the row's geometry never changes: no
          layout, no shift, and the animation stays on the compositor. The
          fixed slot doubles as a 24x24 touch target, up from 6x6. */}
      <div className="mt-5 flex items-center justify-center gap-1">
        {tiers.map((tier, i) => (
          <button
            key={tier.id}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to ${tier.name} package`}
            aria-current={i === activeIndex ? "true" : undefined}
            className="flex h-6 w-6 shrink-0 items-center justify-center"
          >
            <span
              className={cn(
                "h-1.5 w-6 origin-center rounded-full transition-[transform,background-color] duration-200 ease-premium",
                i === activeIndex ? "scale-x-100 bg-royal-700" : "scale-x-[0.25] bg-royal-200"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
