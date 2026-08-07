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
 *
 * THE SCROLLABLE HEIGHT IS CACHED. This is the whole point of the rewrite
 * below and the single most expensive thing that was happening during a
 * scroll.
 *
 * `documentElement.scrollHeight` is a layout-forcing read: the browser
 * cannot answer it without flushing every pending style and layout
 * invalidation first. Reading it inside the scroll frame meant a forced
 * synchronous layout of the *entire* document on every frame of every
 * scroll — and this document is large (the package comparison table alone
 * renders its ~12 spec rows across three separate breakpoint layouts, all
 * present in the DOM at once). Meanwhile framer's reveals were writing
 * inline transforms and `useReveal` was adding classes as sections entered,
 * so layout was reliably dirty each time we asked.
 *
 * A full relayout costs several milliseconds on a mid-range phone. At 60fps
 * the entire frame budget is 16.7ms, and Lenis, the compositor and image
 * decoding all need a share of it — so this one read was enough on its own
 * to drop frames for the whole duration of a scroll. That is the "scrolling
 * feels janky" symptom.
 *
 * Document height only changes when content or the viewport changes, never
 * because the user scrolled. So it is measured once and re-measured from a
 * ResizeObserver (content growth: lazy images landing, the FAQ accordion,
 * "View More" appending project rows) and on resize/orientation change.
 * ResizeObserver delivers after layout has already been computed, so reading
 * there is free. The scroll frame itself now touches only `window.scrollY`.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const doc = document.documentElement;

    let ticking = false;
    let last = -1;
    // Cached scrollable distance. Recomputed only when the document or the
    // viewport actually changes size — never from inside a scroll frame.
    let max = 0;

    const measure = () => {
      max = doc.scrollHeight - doc.clientHeight;
    };

    const update = () => {
      ticking = false;
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

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // Catches height changes that don't fire `resize`: lazy images landing,
    // the FAQ accordion opening, "View More" appending project rows.
    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(onResize);
      observer.observe(doc);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
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
