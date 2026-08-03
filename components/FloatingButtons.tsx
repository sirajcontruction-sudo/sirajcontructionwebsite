"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { SITE } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * No framer-motion here any more — this sits in the root layout, so importing
 * it forced the whole library into the initial bundle for every visitor.
 *
 * The back-to-top button stays mounted and toggles opacity/scale via a class
 * instead of being added and removed by AnimatePresence. Keeping it in the DOM
 * costs one always-composited 44px node; mounting and unmounting it costs a
 * React render plus a layout pass every time the user crosses the threshold.
 * `pointer-events-none` + `aria-hidden` keep it properly inert while hidden.
 */
export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const showTopRef = useRef(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const next = window.scrollY > 600;
        // Guard on a ref rather than calling setState every frame. React bails
        // out of same-value updates, but it still has to enter the scheduler to
        // find that out — 60 times a second, for the whole scroll. This crosses
        // the React boundary twice per page instead.
        if (next === showTopRef.current) return;
        showTopRef.current = next;
        setShowTop(next);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white shadow-premium",
          "transition-[opacity,transform] duration-[180ms] ease-premium",
          showTop
            ? "scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-75 opacity-0"
        )}
      >
        <ArrowUp className="h-4 w-4" />
      </button>

      <a
        href={`tel:+${SITE.phoneRaw}`}
        aria-label="Call SRAJ Construction"
        className="enter-fade flex h-14 w-14 items-center justify-center rounded-full bg-royal-gradient text-white shadow-premium transition-transform duration-[180ms] ease-premium hover:scale-105 active:scale-95 [--enter-delay:400ms]"
      >
        <Phone className="h-5 w-5" />
      </a>

      <a
        href={`https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(
          "Hi SRAJ Construction, I'd like to enquire about your construction / interior packages."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="enter-fade flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-premium transition-transform duration-[180ms] ease-premium hover:scale-105 active:scale-95 [--enter-delay:280ms]"
      >
        <MessageCircle className="h-6 w-6" fill="white" strokeWidth={0} />
      </a>
    </div>
  );
}
