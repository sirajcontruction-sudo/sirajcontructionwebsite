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

/**
 * Reveal transition, built once per (duration, delay) pair.
 *
 * MUST be spread into the variant target itself, not passed as the
 * component's `transition` prop — see `hoverLift` below for why.
 *
 * `duration` + `ease` both have to be present. framer's
 * `isTransitionDefined()` strips orchestration-only keys (`delay`, `when`,
 * `repeat`, ...) before deciding whether a transition was supplied, so a
 * transition of `{ delay: 0.05 }` counts as *no* transition: `y` silently
 * falls back to an under-damped spring and `opacity` to a 300ms
 * `[0.25, 0.1, 0.35, 1]` tween. Two different curves, two different
 * durations, on the same element — and a spring has no fixed end time, so
 * it integrates on the main thread until it settles.
 */
export function revealTransition(delay = 0) {
  return { duration: DURATION.card, delay, ease: EASE_PREMIUM };
}

/**
 * Card lift on hover. Transform-only, so it stays on the compositor.
 * Above-the-fold sections use the `.hover-lift` CSS class instead — this is
 * for the below-fold sections that still run framer.
 *
 * The embedded `transition` is the important part.
 *
 * framer resolves a variant's transition as `target.transition ??
 * props.transition` (VisualElement.getDefaultTransition). A card whose
 * `transition` prop carries the reveal's stagger — `delay:
 * staggerDelay(i, 0.06)` — therefore hands that same delay to `whileHover`,
 * because a bare `{ y: -6 }` brings no transition of its own. The fourth
 * card in a row waited 180ms before it began to lift, and another 180ms
 * before it began to drop. That is the hover lag.
 *
 * Carrying its own transition makes hover independent of whatever the
 * reveal is doing, and 200ms/EASE_PREMIUM is exactly what the `.hover-lift`
 * CSS class uses above the fold, so both halves of the site now lift
 * identically.
 */
export const hoverLift = {
  y: -6,
  transition: { duration: DURATION.hover, ease: EASE_PREMIUM },
} as const;

/** Press feedback. Matches `.btn-primary:active` (180ms) rather than
 *  inheriting the 240ms reveal duration. */
export const tapPress = {
  scale: 0.985,
  transition: { duration: DURATION.button, ease: EASE_PREMIUM },
} as const;

/* -------------------------------------------------------------------------
   Viewport configs.

   Hoisted for the same reason as everything else in this file: framer's
   viewport feature re-runs `startObserver()` — tearing down and re-creating
   the IntersectionObserver registration — whenever `margin`, `amount` or
   `root` change between renders. Sharing one frozen object per config also
   means every element with the same margin lands in the same pooled
   observer instead of a new one.
------------------------------------------------------------------------- */

export const VIEWPORT_ONCE = { once: true } as const;
export const VIEWPORT_ONCE_60 = { once: true, margin: "-60px" } as const;
export const VIEWPORT_ONCE_80 = { once: true, margin: "-80px" } as const;

/** Shared reveal targets. Identical geometry to the `.reveal` CSS class
 *  (16px rise, 240ms, EASE_PREMIUM) so framer and CSS reveals match. */
export const REVEAL_FROM = { opacity: 0, y: 16 } as const;
export const REVEAL_FROM_SM = { opacity: 0, y: 10 } as const;
