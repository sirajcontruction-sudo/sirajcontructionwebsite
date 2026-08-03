"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      // `willChange: transform` keeps this bar on its own compositor layer.
      // Without it the browser can re-promote/demote it as the spring runs,
      // and a fixed element at the top of the page repainting mid-scroll
      // invalidates a strip across the entire viewport on every frame.
      style={{ scaleX, willChange: "transform" }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-sky-gradient"
      aria-hidden="true"
    />
  );
}
