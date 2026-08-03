"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll progress bar without framer-motion.
 *
 * This previously used `useScroll` + `useSpring`, which runs a spring
 * integrator on the main thread for every frame of every scroll — and, more
 * expensively, was one of four components forcing framer into the initial
 * bundle on every page load.
 *
 * The replacement writes `transform: scaleX()` straight to the node from a
 * rAF-coalesced passive scroll listener. No React state, so scrolling never
 * triggers a render; no spring, so each frame is one divide and one style
 * write. `scaleX` on an `origin-left` element stays compositor-only, and
 * `willChange: transform` keeps the bar on its own layer — a fixed element at
 * the top of the page repainting mid-scroll would otherwise invalidate a strip
 * across the whole viewport every frame.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    let last = -1;

    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      // Skip the style write when the value hasn't meaningfully moved, so
      // sub-pixel scroll deltas don't dirty the compositor.
      const rounded = Math.round(progress * 1000) / 1000;
      if (rounded === last) return;
      last = rounded;
      el.style.transform = `scaleX(${rounded})`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transform: "scaleX(0)", willChange: "transform" }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-sky-gradient"
      aria-hidden="true"
    />
  );
}
