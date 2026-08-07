"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MotionConfig,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { EASE_PREMIUM } from "@/lib/motion";

/**
 * Hero showcase — the building on a lit podium inside a dark glass panel.
 *
 * NO ROTATING GEOMETRY, NO HARD BEAMS. The orbit rings went first; the
 * raking light shafts that replaced them went next, because a beam has edges
 * and edges read as a drawn artefact rather than as light. Depth now comes
 * entirely from soft sources: three wide ambient blooms with no discernible
 * boundary, a radial backlight, a drifting wash and a particle field, each
 * breathing at its own phase. Nothing rotates, nothing has a hard edge.
 *
 * EVERY DIMENSION IS A PERCENTAGE, NOT A PIXEL
 * --------------------------------------------
 * The right column is NOT 448px wide at every breakpoint. `max-w-md` only
 * binds from xl up; at lg the 0.9fr track resolves to roughly 389px. Because
 * the panel's aspect is locked at 4:5, a percentage scales correctly across
 * that whole range while a pixel value would drift the composition apart.
 *
 * COMPOSITION — solved against the real alpha mask, not eyeballed
 * --------------------------------------------------------------
 * Referenced at the 448x560 upper bound:
 *
 *   building   w-[89%]  399x357  top 13.93%  translateX(-53.4%)
 *   podium     w-[78%]  349x60   top 75.89%  ellipse ry 10, side 40
 *   nameplate  w-[72%]  30px visible front face, rendered last
 *   cards      150x44,  inset 22px from every edge (was 14px)
 *
 * The building silhouette and both podium ellipses were rasterised into panel
 * space and every card rectangle checked against the union: zero overlapping
 * pixels, minimum clearance 9px. The building's base sits at the centre of
 * the podium's top ellipse, which is what makes it read as standing on the
 * disc rather than hovering over it. Shallowing the podium is what bought the
 * cards their extra 8px of edge padding without crowding the building.
 *
 * WHAT RUNS WHERE
 * ---------------
 * CSS owns every infinite loop — float, blooms, glow, ambient, sweep, sheen,
 * particles, podium rim, brand glow, card drift — handed to the compositor
 * once, zero main-thread cost per frame. framer owns pointer parallax, the
 * entrance stagger and hover. Every animated property either side is
 * `transform` or `opacity`.
 */

/**
 * Ambient blooms. These replaced the raking light shafts, which read as hard
 * artificial streaks — a beam has edges, and edges look drawn.
 *
 * Each is a wide, soft radial with no discernible boundary, breathing at its
 * own phase. Two of the three sit left of centre on purpose: that corner was
 * the emptiest part of the composition, and light is the way to fill it
 * without adding clutter.
 */
const BLOOMS = [
  // Low-left — the fill for the dead corner.
  { cx: "18%", cy: "62%", size: "78%", tint: "56,189,248", min: 0.22, max: 0.46, dur: 15, delay: 0 },
  // Upper-left shoulder, cooler and fainter.
  { cx: "30%", cy: "22%", size: "62%", tint: "125,211,252", min: 0.14, max: 0.3, dur: 18, delay: 4.5 },
  // Right counterweight, deep blue so it reads as distance not glare.
  { cx: "82%", cy: "44%", size: "66%", tint: "37,99,235", min: 0.18, max: 0.36, dur: 16, delay: 8 },
] as const;

const PARTICLES = [
  { top: "16%", left: "11%", x: "22px", y: "-68px", s: 4, d: 11, delay: 0, peak: 0.7 },
  { top: "27%", left: "24%", x: "-26px", y: "-56px", s: 3, d: 13, delay: 1.6, peak: 0.55 },
  { top: "63%", left: "7%", x: "30px", y: "-82px", s: 5, d: 15, delay: 3.1, peak: 0.45 },
  { top: "74%", left: "85%", x: "-18px", y: "-74px", s: 4, d: 12, delay: 0.9, peak: 0.6 },
  { top: "50%", left: "13%", x: "-34px", y: "-46px", s: 3, d: 14, delay: 4.2, peak: 0.45 },
  { top: "23%", left: "59%", x: "14px", y: "-60px", s: 3, d: 10, delay: 2.4, peak: 0.6 },
  { top: "80%", left: "37%", x: "-22px", y: "-88px", s: 4, d: 16, delay: 5.5, peak: 0.5 },
  { top: "54%", left: "4%", x: "38px", y: "-52px", s: 3, d: 12, delay: 6.3, peak: 0.55 },
  { top: "36%", left: "29%", x: "-12px", y: "-68px", s: 5, d: 13, delay: 3.8, peak: 0.4 },
  { top: "68%", left: "69%", x: "20px", y: "-78px", s: 3, d: 11, delay: 1.2, peak: 0.6 },
  { top: "39%", left: "17%", x: "26px", y: "-58px", s: 4, d: 15, delay: 7.1, peak: 0.45 },
  { top: "84%", left: "55%", x: "-30px", y: "-64px", s: 3, d: 12, delay: 2.9, peak: 0.5 },
  { top: "13%", left: "20%", x: "16px", y: "-50px", s: 3, d: 14, delay: 8.4, peak: 0.45 },
  { top: "58%", left: "47%", x: "-24px", y: "-86px", s: 4, d: 17, delay: 4.9, peak: 0.35 },
] as const;

/** Corners unchanged, as requested. Only the inset grew (14px -> 22px, which
 *  the shallower podium paid for) plus the glass, shadow and glow treatment. */
const CARDS = [
  {
    id: "architecture",
    icon: "📐",
    title: "Architectural Excellence",
    pos: "left-[22px] top-[22px]",
    from: { x: -22, y: -14 },
    travel: "-8px",
    dur: 6.4,
    delay: 0,
    order: 0,
  },
  {
    id: "quality",
    icon: "🛡",
    title: "Quality Assured",
    pos: "right-[22px] top-[22px]",
    from: { x: 22, y: -14 },
    travel: "7px",
    dur: 7.2,
    delay: 1.1,
    order: 1,
  },
  {
    id: "projects",
    icon: "🏗",
    title: "20+ Projects Delivered",
    pos: "left-[22px] bottom-[22px]",
    from: { x: -22, y: 14 },
    travel: "7px",
    dur: 6.8,
    delay: 2.3,
    order: 2,
  },
  {
    id: "ontime",
    icon: "⏱",
    title: "On-Time Delivery",
    pos: "right-[22px] bottom-[22px]",
    from: { x: 22, y: 14 },
    travel: "-8px",
    dur: 7.6,
    delay: 0.6,
    order: 3,
  },
] as const;

const MAX_TILT = 6;
const MAX_SHIFT = 10;
const SPRING = { stiffness: 110, damping: 20, mass: 0.6 } as const;

export default function HeroVisual() {
  const frameRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, SPRING);
  const springY = useSpring(pointerY, SPRING);

  const rotateY = useTransform(springX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]);
  const shiftX = useTransform(springX, [-0.5, 0.5], [-MAX_SHIFT, MAX_SHIFT]);
  const shiftY = useTransform(springY, [-0.5, 0.5], [-MAX_SHIFT, MAX_SHIFT]);

  /* Cards drift AGAINST the panel and less far. Opposed motion at a different
     magnitude is what reads as depth; matched motion just slides the whole
     composition like a flat sheet. */
  const cardX = useTransform(springX, [-0.5, 0.5], [7, -7]);
  const cardY = useTransform(springY, [-0.5, 0.5], [5, -5]);

  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setParallaxEnabled(canHover.matches && !reduced.matches);
    sync();
    canHover.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      canHover.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  /* getBoundingClientRect forces a layout flush, so it never runs per
     mousemove. Measured on enter and cached; scroll/resize only NULL the
     cache (no measuring of their own) and the next move re-measures lazily.
     Without that invalidation the stale viewport-relative rect makes the tilt
     drift off-centre as the hero scrolls. */
  const rectRef = useRef<DOMRect | null>(null);

  const handleEnter = useCallback(() => {
    rectRef.current = frameRef.current?.getBoundingClientRect() ?? null;
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      let rect = rectRef.current;
      if (!rect) {
        rect = frameRef.current?.getBoundingClientRect() ?? null;
        rectRef.current = rect;
        if (!rect) return;
      }
      if (!rect.width || !rect.height) return;
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [pointerX, pointerY]
  );

  const handleLeave = useCallback(() => {
    rectRef.current = null;
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  useEffect(() => {
    if (!parallaxEnabled) return;
    const invalidate = () => {
      rectRef.current = null;
    };
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate, { passive: true });
    return () => {
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
    };
  }, [parallaxEnabled]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={frameRef}
        onMouseEnter={parallaxEnabled ? handleEnter : undefined}
        onMouseMove={parallaxEnabled ? handleMove : undefined}
        onMouseLeave={parallaxEnabled ? handleLeave : undefined}
        className="relative h-full w-full [perspective:1400px]"
      >
        {/* Outer bloom, outside the glass — light spilling onto the hero
            behind the panel, so the panel never reads as a rectangle pasted
            on top of the section. */}
        <div
          aria-hidden="true"
          className="hv-fade-in pointer-events-none absolute inset-0 z-0 flex items-center justify-center [--hv-delay:200ms]"
        >
          <div className="hv-glow aspect-square w-[130%] rounded-full" />
        </div>

        {/* ===================== PANEL =====================
            No `preserve-3d` here. It previously put the panel into a 3D
            rendering context, which let it sort above the later sibling
            holding the cards — that was why the cards appeared cut off. */}
        <motion.div
          style={{ rotateX, rotateY, x: shiftX, y: shiftY }}
          className="absolute inset-0 z-10"
        >
          <div className="hv-enter h-full w-full [--hv-delay:80ms]">
            {/* Rim and clip are separate nodes: `.hv-rim::after` paints the
                pulsing glow just outside the panel at inset:-1px and would be
                erased if it shared a node with `overflow-hidden`. */}
            <div className="hv-rim relative h-full w-full rounded-[28px] shadow-[0_30px_60px_-24px_rgba(2,6,23,0.85),0_60px_120px_-40px_rgba(12,28,84,0.7)]">
              <div className="relative h-full w-full overflow-hidden rounded-[28px] p-[1.5px]">
                {/* Border light sweep — one conic gradient rotated, so the
                    travelling highlight costs a compositor transform instead
                    of repainting the border box every frame. */}
                <div
                  aria-hidden="true"
                  className="hv-sweep absolute left-1/2 top-1/2 aspect-square w-[150%]"
                />

                {/* Dark glass. Translucent navy, never white, and no
                    `backdrop-filter` — a backdrop blur would re-sample and
                    re-blur every frame, because the blooms, particles and
                    ambient wash are all moving behind it. */}
                <div className="relative h-full w-full overflow-hidden rounded-[26.5px] bg-[linear-gradient(157deg,rgba(24,42,96,0.82)_0%,rgba(11,20,52,0.60)_46%,rgba(7,13,36,0.86)_100%)]">
                  {/* Ambient wash — slow drift so the glass is never evenly
                      lit. */}
                  <div
                    aria-hidden="true"
                    className="hv-ambient pointer-events-none absolute inset-[-20%] z-0"
                  />

                  {/* Ambient blooms — what the raking light shafts became.
                      A beam has edges, and edges read as a drawn artefact
                      rather than as light. These are wide radials with no
                      discernible boundary, breathing at different phases, two
                      of them weighted left to fill the empty corner. */}
                  <div
                    aria-hidden="true"
                    className="hv-fade-in pointer-events-none absolute inset-0 z-0 overflow-hidden [--hv-delay:420ms]"
                  >
                    {BLOOMS.map((b, i) => (
                      // Two nodes: the outer one owns the centring translate,
                      // the inner one owns the breathing keyframe. A running
                      // animation replaces an element's own transform
                      // outright, so sharing a node would drop the centring
                      // the moment the animation started.
                      <div
                        key={i}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: b.cx, top: b.cy, width: b.size, aspectRatio: "1 / 1" }}
                      >
                        <div
                          className="hv-bloom h-full w-full rounded-full"
                          style={
                            {
                              background: `radial-gradient(circle, rgba(${b.tint},0.55) 0%, rgba(${b.tint},0.2) 38%, transparent 70%)`,
                              "--hv-bloom-min": b.min,
                              "--hv-bloom-max": b.max,
                              "--hv-bloom-duration": `${b.dur}s`,
                              "--hv-bloom-delay": `${b.delay}s`,
                            } as React.CSSProperties
                          }
                        />
                      </div>
                    ))}
                  </div>

                  {/* Radial backlight, centred on the building so the
                      silhouette separates from the glass. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-[6%] z-0 flex h-[72%] items-center justify-center"
                  >
                    <div className="hv-glow aspect-square w-[82%] rounded-full" />
                  </div>

                  {/* Particles. */}
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
                    {PARTICLES.map((p, i) => (
                      <span
                        key={i}
                        className="hv-particle absolute rounded-full"
                        style={
                          {
                            top: p.top,
                            left: p.left,
                            width: p.s,
                            height: p.s,
                            "--hv-p-x": p.x,
                            "--hv-p-y": p.y,
                            "--hv-p-duration": `${p.d}s`,
                            "--hv-p-delay": `${p.delay}s`,
                            "--hv-p-peak": p.peak,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>

                  {/* ============ PODIUM + BUILDING ============
                      Both inside one `.hv-float` node so they rise and settle
                      together — float them separately and the building
                      visibly detaches from the disc it is meant to be
                      standing on. */}
                  <div className="hv-float absolute inset-0 z-10">
                    {/* Ground pool — light bleeding out from under the disc,
                        which is what seats the whole assembly in the scene. */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-[74%] h-[18%] w-[104%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(56,189,248,0.42)_0%,rgba(37,99,235,0.2)_40%,transparent_72%)]"
                    />

                    {/* --- PODIUM ---
                        A short cylinder: top ellipse (the surface the building
                        stands on), a side wall carrying the brand plate, and a
                        bottom cap. `aspect-[349/62]` locks the proportions so
                        the disc keeps its foreshortening at every column
                        width. Shallower than the first pass, which freed the
                        vertical room the cards needed for real padding.

                        Every surface is substantially lighter than before —
                        the podium was reading as a dark smudge rather than a
                        lit, machined object. */}
                    <div className="absolute left-1/2 top-[75.89%] aspect-[349/60] w-[78%] -translate-x-1/2">
                      {/* Bottom cap, drawn first so the side wall overlaps its
                          upper half. */}
                      <div className="absolute inset-x-0 top-[66.67%] h-[33.33%] rounded-[50%] bg-[linear-gradient(180deg,rgba(18,32,78,0.98)_0%,rgba(6,11,30,1)_100%)]" />

                      {/* Side wall — the front face, and the brand plate.
                          Three stops rather than a flat fill: a lit upper
                          bevel, a mid tone, and a shadowed foot. That vertical
                          falloff is what makes a flat rectangle read as a
                          curved metal band. */}
                      <div className="absolute inset-x-0 top-[16.67%] h-[66.67%] overflow-hidden bg-[linear-gradient(180deg,rgba(86,124,208,0.98)_0%,rgba(46,76,158,0.99)_30%,rgba(28,50,116,1)_58%,rgba(13,24,62,1)_84%,rgba(7,13,34,1)_100%)]">
                        {/* Specular sweep across the metal — brightest at the
                            centre, falling to nothing at the ends, so the wall
                            catches light like a machined curve. */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(148,197,255,0.16)_28%,rgba(186,230,253,0.24)_50%,rgba(148,197,255,0.16)_72%,transparent_100%)]"
                        />
                        {/* Brushed-metal banding: hairlines catching light at
                            the top and bottom edges of the wall. */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(186,230,253,0.85),transparent)]"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.6),transparent)]"
                        />
                        {/* Backing wash across the wall. Breathes with the
                            podium rim. */}
                        <span
                          aria-hidden="true"
                          className="hv-brand-halo pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(96,165,250,0.45)_0%,rgba(56,189,248,0.2)_44%,transparent_74%)]"
                        />
                      </div>

                      {/* Top ellipse — the surface. Lightest of the three so it
                          reads as facing up into the light, with a bright
                          specular hot-spot toward the back where the key light
                          sits. */}
                      <div className="hv-podium-rim absolute inset-x-0 top-0 h-[33.33%] rounded-[50%] bg-[radial-gradient(ellipse_at_50%_28%,rgba(176,209,255,0.72)_0%,rgba(86,127,214,0.6)_30%,rgba(38,66,146,0.72)_58%,rgba(11,20,54,0.98)_100%)] ring-1 ring-inset ring-sky/60" />

                      {/* AMBIENT OCCLUSION — the tight, dark contact ring where
                          the building meets the disc. Real objects darken
                          sharply at contact; without this the building looks
                          pasted on top of the podium rather than resting in
                          it. */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-[4%] h-[26%] w-[54%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(1,4,16,0.92)_0%,rgba(1,4,16,0.55)_44%,transparent_74%)]"
                      />

                      {/* ============ ENGRAVED NAMEPLATE ============
                          RENDERED LAST, so nothing can paint over it. That was
                          the actual defect: the brand sat inside the side-wall
                          div, and the top ellipse — a later sibling — painted
                          across the upper 41% of that wall and buried the
                          "SRAJ" line entirely.

                          It is also positioned against the front face that is
                          genuinely visible. On a cylinder the wall only shows
                          BELOW the top ellipse's lowest point, so the usable
                          band is `side - ry`, not `side`. Flattening the
                          ellipse (ry 14 -> 10) grew that from 20px to 30px
                          without the podium getting any deeper — and a flatter
                          ellipse implies a lower camera, which is exactly the
                          angle that would show more front face, so the
                          proportions stay coherent.

                          A recessed dark pill gives the lettering a surface to
                          be cut into: white type on the bright disc was ~2:1,
                          on this it is ~19:1. The inset shadow is the groove;
                          the hairline under the top edge is the light catching
                          the bevel. */}
                      <div className="hv-plate absolute left-1/2 top-[33.33%] h-[50%] w-[72%] -translate-x-1/2">
                        <div className="relative flex h-full w-full flex-col items-center justify-center gap-[4%] rounded-full bg-[linear-gradient(180deg,rgba(3,8,24,0.94)_0%,rgba(6,13,36,0.88)_55%,rgba(12,24,62,0.82)_100%)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.85),inset_0_-1px_0_rgba(125,211,252,0.35),0_1px_0_rgba(148,197,255,0.28)]">
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-[12%] top-px h-px rounded-full bg-[linear-gradient(90deg,transparent,rgba(186,230,253,0.5),transparent)]"
                          />
                          <span className="hv-brand font-display font-bold leading-none">
                            SRAJ
                          </span>
                          <span className="hv-brand-sub font-bold uppercase leading-none">
                            Construction &amp; Interior
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* --- BUILDING ---
                        Size unchanged at 89% of panel width.

                        OPTICALLY CENTRED, NOT BOX CENTRED. The alpha bounding
                        box is not centred on the building's mass: the trees
                        extend it leftward, so the centroid sits +3.4% right of
                        the box centre. Centring the box therefore pushes the
                        building visibly right — about 14px — which is what
                        made it look shifted and left the left side feeling
                        empty. `translateX(-53.4%)` is -50% for the usual
                        centring plus -3.4% to put the mass, not the box, on
                        the panel's axis and over the podium's centre.

                        The drop-shadow is a STATIC filter: rasterised once
                        with the layer, so the float costs nothing extra. Three
                        layers now — a tight contact shadow, a deep soft one
                        for weight, and a faint blue rim to tie it to the scene
                        lighting. */}
                    <div
                      className="absolute left-1/2 top-[13.93%] w-[89%]"
                      style={{ transform: "translateX(-53.4%)" }}
                    >
                      <div className="relative [filter:drop-shadow(0_10px_10px_rgba(1,4,16,0.55))_drop-shadow(0_28px_30px_rgba(2,6,23,0.7))_drop-shadow(0_2px_14px_rgba(56,189,248,0.3))]">
                        <Image
                          src="/hero-building.png"
                          alt="SRAJ Construction & Interior — modern multi-storey residential build"
                          width={1155}
                          height={1032}
                          sizes="(min-width: 1280px) 400px, 350px"
                          quality={90}
                          loading="lazy"
                          className="h-auto w-full select-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Glass sheen, above everything in the panel. Mostly idle,
                      crosses quickly — a sheen that sweeps constantly reads as
                      a loading skeleton. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[26.5px]"
                  >
                    <div className="hv-sheen absolute inset-y-[-30%] left-0 w-[45%]" />
                  </div>

                  {/* Inner edge highlight — the glass lip. Static. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-20 rounded-[26.5px] ring-1 ring-inset ring-white/[0.18]"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===================== CARDS =====================
            A sibling of the panel, painted after it, higher z-index, and with
            no 3D context anywhere between them — so they can no longer be
            sorted behind the glass. */}
        <motion.div
          style={{ x: cardX, y: cardY }}
          className="pointer-events-none absolute inset-0 z-30"
        >
          {CARDS.map((card) => (
            <InfoCard key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </MotionConfig>
  );
}

/**
 * Info card. Three nested nodes, each owning exactly one transform, because a
 * running CSS animation wins over an element's own transform declaration:
 *
 *   motion.div     -> entrance + hover   (framer, inline transform)
 *   .hv-card-drift -> idle float         (CSS keyframe transform)
 *   surface        -> none
 *
 * `whileHover` carries its own transition. Without one it inherits the
 * component's transition — including the entrance stagger — and the card
 * would sit still for up to 350ms after the pointer arrived before lifting.
 */
function InfoCard({ card }: { card: (typeof CARDS)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: card.from.x, y: card.from.y }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.55,
          delay: 0.8 + card.order * 0.12,
          ease: EASE_PREMIUM,
        },
      }}
      whileHover={{
        scale: 1.07,
        transition: { duration: 0.22, ease: EASE_PREMIUM },
      }}
      className={`pointer-events-auto absolute ${card.pos} w-[150px]`}
    >
      <div
        className="hv-card-drift"
        style={
          {
            "--hv-card-travel": card.travel,
            "--hv-card-duration": `${card.dur}s`,
            "--hv-card-delay": `${card.delay}s`,
          } as React.CSSProperties
        }
      >
        {/* No `backdrop-blur`: four of these drift continuously over three
            blooms and a particle field, so a backdrop filter would be re-blurred
            every frame, four times over. A denser fill over the navy reads as
            glass on its own — the substitution `.nav-glass` already makes below
            the sm breakpoint. */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/[0.22] bg-[linear-gradient(145deg,rgba(255,255,255,0.19)_0%,rgba(146,180,255,0.07)_52%,rgba(255,255,255,0.045)_100%)] px-3 py-2 shadow-[0_14px_30px_-12px_rgba(1,4,16,0.95),0_2px_6px_-2px_rgba(1,4,16,0.7),inset_0_1px_0_rgba(255,255,255,0.28)]">
          {/* Hover glow — an opacity cross-fade on a pre-painted shadow, never
              an interpolated box-shadow. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[0_16px_50px_-8px_rgba(56,189,248,1),inset_0_0_0_1px_rgba(125,211,252,0.55)] transition-opacity duration-300 ease-premium group-hover:opacity-100"
          />
          <div className="relative flex items-center gap-2.5">
            <span
              className="shrink-0 text-[13px] leading-none drop-shadow-[0_1px_2px_rgba(2,6,23,0.8)]"
              aria-hidden="true"
            >
              {card.icon}
            </span>
            <span className="text-[11px] font-semibold leading-[1.3] tracking-[0.005em] text-white">
              {card.title}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
