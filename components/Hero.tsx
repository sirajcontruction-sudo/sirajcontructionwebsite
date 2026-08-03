"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useEnquiry } from "@/lib/enquiry-context";
import { EASE_PREMIUM } from "@/lib/motion";

const stats = [
  { value: 5, suffix: "+", label: "Years of Building" },
  { value: 20, suffix: "+", label: "Projects Delivered" }
];

const COUNTER_DURATION = 1400;

/**
 * Count-up animation driven by a plain rAF loop.
 *
 * This previously pulled in GSAP (~70KB gzipped) to tween a single number.
 * The easing below is `power2.out` — the exact curve GSAP was using — so
 * the motion is unchanged, but the dependency is gone from the bundle
 * entirely. Writes go straight to `textContent`, never to React state, so
 * the animation causes zero re-renders.
 */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = value.toString();
      return;
    }

    let rafId = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min((now - start) / COUNTER_DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 2); // power2.out
      el.textContent = Math.round(eased * value).toString();
      if (t < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [value]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export default function Hero() {
  const { openEnquiry } = useEnquiry();

  return (
    <section id="top" className="relative overflow-hidden bg-navy pb-24 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-80" />
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-royal-600/30 blur-[55px] sm:blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-sky/20 blur-[65px] sm:blur-[130px]" />

      {/* Blueprint grid overlay */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M 44 0 L 0 0 0 44" fill="none" stroke="white" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="container-px relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: EASE_PREMIUM }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-light backdrop-blur"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Trusted Civil Contractor — Chennai, Trichy &amp; Tirunelveli
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay: 0.06, ease: EASE_PREMIUM }}
            className="mt-6 font-display text-4xl font-medium leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          >
            We build homes that
            <span className="block shimmer-text">stand for Generations.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay: 0.12, ease: EASE_PREMIUM }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Premium construction, architecture &amp; interior solutions across Chennai,
            Trichy and Tirunelveli — engineered with transparent, fixed-rate packages
            from foundation to final finish.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay: 0.18, ease: EASE_PREMIUM }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button onClick={() => openEnquiry("Free Consultation")} className="btn-primary">
              Book Free Consultation <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#packages" className="btn-ghost-light">
              View Packages
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.36, delay: 0.24, ease: EASE_PREMIUM }}
            className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-white/55">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.36, delay: 0.2, ease: EASE_PREMIUM }}
          className="relative mx-auto hidden aspect-[4/5] w-full max-w-md lg:block"
        >
          {/* Outer glass frame. The fill is a flat translucent white rather
              than `backdrop-blur`: a backdrop filter forces the compositor to
              keep a live snapshot of everything painted behind a 448x560
              region and re-blur it whenever the compositing structure changes,
              which is one of the costlier things you can put in a hero. The
              same trick `.nav-glass` already uses below the sm breakpoint —
              slightly more opaque fill, no filter, reads the same. */}
          <div className="absolute inset-0 rounded-4xl border border-white/[0.08] bg-white/[0.045]" />

          {/* Card is now static — the float moved onto the logo. `group` here
              makes the whole card the hover target, so the pointer doesn't
              have to land precisely on the artwork. */}
          {/* Card darkened toward the reference. A glow only reads as light if
              the surface behind it is dark — the previous gradient climbed to
              #162c8f, which was bright enough to swallow the halo. */}
          <div className="group absolute inset-8 flex items-center justify-center overflow-hidden rounded-3xl border border-white/[0.07] bg-[linear-gradient(135deg,#03060f_0%,#081027_55%,#0b1738_100%)] shadow-[0_0_28px_-4px_rgba(56,189,248,0.16)]">
            {/* Static star texture — one painted background, zero per-frame cost. */}
            <div aria-hidden="true" className="hero-starfield pointer-events-none absolute inset-0 z-0" />
            {/* Ambient blue glow, sitting behind the logo (z-0 vs the logo's
                z-10) and centred on it by the same flex box that centres the
                artwork — so the light always originates from behind the middle
                of the mark, at any card width.

                Two nested elements on purpose: the breathing `opacity` lives on
                the inner gradient, and hover scales the outer wrapper. A
                running keyframe animation overrides the element's own opacity
                declaration, so a hover opacity transition on the same node
                would simply be ignored. Scaling the wrapper is a transform, so
                the two never collide — and both stay on the compositor.

                Sized as a share of the card rather than a fixed pixel value, so
                it tracks the card across breakpoints. The gradient reaches full
                transparency at 80% of its radius, well inside the card's
                rounded corners, so `overflow-hidden` never clips a visible
                edge. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center transition-transform duration-[165ms] ease-premium group-hover:scale-105"
            >
              <div className="logo-glow aspect-square w-[88%] rounded-full" />
            </div>

            {/* Hover transform lives on this wrapper, not on the logo itself.
                A running CSS animation wins over the element's own `transform`
                declaration, so hover and float have to sit on separate
                elements — the two transforms then compose. `transform-gpu`
                emits translate3d, which promotes the layer without the
                `backface-visibility: hidden` hack. Tailwind's
                `hoverOnlyWhenSupported` compiles `group-hover:` inside
                `@media (hover: hover)`, so touch devices get none of this. */}
            {/* Three nested layers, each owning exactly one thing:
                  span  — hover transform (transition)
                  div   — idle float (keyframe transform)
                  imgs  — halo + crisp logo (keyframe opacity on the halo)
                A running animation overrides an element's own transform, so
                hover and float cannot share a node; the transforms compose. */}
            <span className="relative z-10 transform-gpu translate-y-0 scale-100 transition-transform duration-[165ms] ease-premium group-hover:-translate-y-0.5 group-hover:scale-[1.02]">
              <div className="logo-float relative">
                {/* Glowing duplicate, behind. Carries the drop-shadow filter so
                    the visible copy below stays filter-free and sharp. Same
                    src, so it resolves to the same optimised URL — one network
                    request, one decode, two paints. */}
                <Image
                  src="/logo.png"
                  alt=""
                  aria-hidden="true"
                  width={200}
                  height={221}
                  sizes="200px"
                  quality={90}
                  className="logo-halo pointer-events-none absolute inset-0 h-auto w-[200px] select-none"
                />
                {/* Intrinsic width/height rather than `fill`, so the element is
                    laid out at its natural size instead of being stretched to a
                    container box, and no filter of any kind on this copy. */}
                <Image
                  src="/logo.png"
                  alt="SRAJ Construction & Interior"
                  width={200}
                  height={221}
                  sizes="200px"
                  quality={90}
                  priority
                  className="relative block h-auto w-[200px] select-none"
                />
              </div>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
