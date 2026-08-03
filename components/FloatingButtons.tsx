"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { SITE } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";

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
        // Guard on a ref rather than calling setState every frame. React
        // bails out of same-value updates, but it still has to enter the
        // scheduler to find that out — 60 times a second, for the whole
        // scroll. This crosses the React boundary twice per page instead.
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
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.18, ease: EASE_PREMIUM }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white shadow-premium"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={`tel:+${SITE.phoneRaw}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.24, ease: EASE_PREMIUM }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-royal-gradient text-white shadow-premium"
        aria-label="Call SRAJ Construction"
      >
        <Phone className="h-5 w-5" />
      </motion.a>

      <motion.a
        href={`https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(
          "Hi SRAJ Construction, I'd like to enquire about your construction / interior packages."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.28, duration: 0.24, ease: EASE_PREMIUM }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-premium"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" fill="white" strokeWidth={0} />
      </motion.a>
    </div>
  );
}
