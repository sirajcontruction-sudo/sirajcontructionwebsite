"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` makes framer-motion read the OS setting and
 * automatically skip transform/layout animations for users who ask for
 * reduced motion, while still letting opacity cross-fades through so
 * nothing appears or disappears abruptly.
 *
 * The CSS side of this lives in globals.css; this covers the animations
 * framer drives from JS, which that media query cannot reach.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
