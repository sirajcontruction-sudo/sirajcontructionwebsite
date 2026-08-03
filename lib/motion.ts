/**
 * Shared motion primitives.
 *
 * Two reasons this file exists:
 *
 * 1. Consistency. Every reveal, hover and press across the site now uses one
 *    easing curve and one of three durations, which is what makes motion
 *    read as designed rather than incidental.
 *
 * 2. Referential stability. Transition and variant objects declared inline in
 *    JSX are re-created on every render, so framer-motion sees a "new" config
 *    each time and re-runs its diffing. Hoisting them to module scope means
 *    the identity never changes.
 */

/** Fast departure, soft settle. Matches --ease-premium in globals.css. */
export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fade: 0.18,
  button: 0.18,
  hover: 0.2,
  card: 0.24,
  page: 0.3,
} as const;

/**
 * Per-item stagger for grids. Capped at 4 items' worth of delay so a long
 * row never leaves the last card visibly lagging behind the first.
 */
export function staggerDelay(index: number, step = 0.05, max = 4) {
  return Math.min(index, max) * step;
}

/** Card lift on hover. Transform-only, so it stays on the compositor.
 *  Above-the-fold sections use the `.hover-lift` CSS class instead — this is
 *  for the below-fold sections that still run framer. */
export const hoverLift = { y: -6 };
