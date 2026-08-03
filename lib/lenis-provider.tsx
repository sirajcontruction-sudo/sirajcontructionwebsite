"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Desktop-only smooth scrolling.
 *
 * Lenis replaces native scrolling with a requestAnimationFrame loop that
 * writes `transform`/`scrollTop` every frame. On a desktop mouse wheel that
 * is a clear win — it turns discrete wheel notches into weighted, continuous
 * motion, which is most of what makes a site feel expensive.
 *
 * On touch it is the opposite. Native touch scrolling runs on the
 * compositor thread and keeps up with your finger even while the main
 * thread is busy; routing it through JS puts it back on the main thread,
 * behind React renders and image decodes. That is the classic "scrolling
 * feels slightly laggy on my phone" symptom.
 *
 * So: `(hover: hover) and (pointer: fine)` gates Lenis to real pointer
 * devices, and Lenis itself is imported dynamically so touch visitors never
 * download the library at all.
 */
export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isPointerDevice = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    // Anchor links still need to work on touch and for reduced-motion users,
    // so that handler is registered independently of Lenis below.
    if (prefersReducedMotion || !isPointerDevice) {
      const handleNativeAnchor = (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest("a[href^='#']");
        if (!target) return;
        const href = target.getAttribute("href");
        if (!href || href === "#") return;
        const el = document.querySelector(href);
        if (!el) return;
        e.preventDefault();
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      };
      document.addEventListener("click", handleNativeAnchor);
      return () => document.removeEventListener("click", handleNativeAnchor);
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      let rafId = 0;
      let running = false;

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      const start = () => {
        if (running) return;
        running = true;
        rafId = requestAnimationFrame(raf);
      };

      const stop = () => {
        if (!running) return;
        running = false;
        cancelAnimationFrame(rafId);
      };

      start();

      // Don't burn a frame callback (and battery) while the tab is hidden.
      const handleVisibility = () => (document.hidden ? stop() : start());
      document.addEventListener("visibilitychange", handleVisibility);

      const handleClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest("a[href^='#']");
        if (!target) return;
        const href = target.getAttribute("href");
        if (!href || href === "#") return;
        const el = document.querySelector(href);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      };
      document.addEventListener("click", handleClick);

      cleanup = () => {
        stop();
        document.removeEventListener("visibilitychange", handleVisibility);
        document.removeEventListener("click", handleClick);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
