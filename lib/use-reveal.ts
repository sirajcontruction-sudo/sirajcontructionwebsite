"use client";

import { useEffect, type RefObject } from "react";

/**
 * Scroll reveal, replacing framer-motion's `whileInView` on the critical path.
 *
 * Two deliberate choices:
 *
 * 1. ONE observer for the whole document, created lazily and shared by every
 *    section. framer creates an IntersectionObserver per animated element —
 *    this page had roughly forty, which means forty observers each with their
 *    own callback and bookkeeping. A single observer with many targets is
 *    dramatically cheaper for the browser to service.
 *
 * 2. `unobserve` on first intersection. These reveals only ever play once, so
 *    after an element has appeared there is no reason to keep paying to track
 *    it. Once a section has scrolled past, it costs nothing at all.
 *
 * The observer callback only adds a class — no React state, so revealing an
 * element never triggers a re-render anywhere.
 */

let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    // Fire slightly before the element is fully on screen so the transition
    // is already underway by the time the user is looking at it.
    { rootMargin: "0px 0px -12% 0px", threshold: 0.01 }
  );

  return sharedObserver;
}

/**
 * Observes every `[data-reveal]` descendant of `ref`. Call once per section.
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    const observer = getObserver();

    // No IntersectionObserver (or reduced motion): show everything immediately
    // rather than leaving it stuck at opacity 0.
    if (!observer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    targets.forEach((el) => observer.observe(el));
    return () => targets.forEach((el) => observer.unobserve(el));
  }, [ref]);
}
