"use client";

import { useState, useEffect, useCallback, useMemo, useRef, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  EASE_PREMIUM,
  REVEAL_FROM,
  VIEWPORT_ONCE_60,
  hoverLift,
  revealTransition,
  tapPress,
} from "@/lib/motion";

type Category = "Construction" | "Interior";

type Project = {
  id: string;
  title: string;
  category: Category;
  image: string;
  /**
   * `object-position` for the grid thumbnail. Cards are a fixed height and the
   * artwork is `object-cover`, so a portrait source gets cropped top and
   * bottom. Default centre framing is right for almost everything; this exists
   * for the shots where the meaningful content is not in the middle.
   */
  focus?: string;
};

/**
 * Every file in /public/projects/Construction, in order.
 *
 * 1-3 were already here; 4-6 were sitting in the folder unreferenced, so they
 * never rendered anywhere on the site. Titles are written from the actual
 * photographs rather than the filenames, since `construction-N.jpeg` carries
 * no project association to preserve — and the title doubles as the `alt`
 * text, so it is doing accessibility and SEO work too.
 */
const constructionProjects: Project[] = [
  { id: "c1", title: "Premium Duplex Residence", category: "Construction", image: "/projects/Construction/construction-1.jpeg" },
  { id: "c2", title: "Modern Family Residence", category: "Construction", image: "/projects/Construction/construction-2.jpeg" },
  { id: "c3", title: "Contemporary Luxury Home", category: "Construction", image: "/projects/Construction/construction-3.jpeg" },
  { id: "c4", title: "Twilight Villa Elevation", category: "Construction", image: "/projects/Construction/construction-4.jpeg" },
  { id: "c5", title: "Cantilevered Modern Residence", category: "Construction", image: "/projects/Construction/construction-5.jpeg" },
  {
    id: "c6",
    title: "Renovation — Before & After",
    category: "Construction",
    image: "/projects/Construction/construction-6.jpeg",
    // A portrait before/after split with the BEFORE and AFTER captions burned
    // into the top of the frame. At 825x1024 inside a ~378x320 card,
    // `object-cover` scales to 0.458 and crops 699px vertically — centred,
    // that removes ~162px off the top and takes both captions with it, which
    // is the entire point of the image. Anchoring to the top keeps them and
    // crops the driveway instead. The lightbox uses `object-contain`, so the
    // full frame is always available on click.
    focus: "object-top",
  },
];

const interiorProjects: Project[] = [
  { id: "i1", title: "Designer TV Unit", category: "Interior", image: "/projects/Interior/interior-1.jpg" },
  { id: "i2", title: "Luxury Living Room", category: "Interior", image: "/projects/Interior/interior-2.jpg" },
  { id: "i3", title: "Modern Living Lounge", category: "Interior", image: "/projects/Interior/interior-3.jpg" },
  { id: "i4", title: "Compact Modular Kitchen", category: "Interior", image: "/projects/Interior/interior-4.jpg" },
  { id: "i5", title: "Contemporary Modular Kitchen", category: "Interior", image: "/projects/Interior/interior-5.jpg" },
  { id: "i6", title: "Modern Kitchen Interior", category: "Interior", image: "/projects/Interior/interior-6.jpg" },
  { id: "i7", title: "Master Bedroom Interior", category: "Interior", image: "/projects/Interior/interior-7.jpg" },
  { id: "i8", title: "Premium Sliding Wardrobe", category: "Interior", image: "/projects/Interior/interior-8.jpg" },
  { id: "i9", title: "Master bedroom wardrobes", category: "Interior", image: "/projects/Interior/interior-9.jpg" },
  { id: "i10", title: "Bedroom Wardrobe Design", category: "Interior", image: "/projects/Interior/interior-10.jpg" },
  { id: "i11", title: "Contemporary Bedroom", category: "Interior", image: "/projects/Interior/interior-11.jpg" },
  { id: "i12", title: "Luxury Wardrobe Design", category: "Interior", image: "/projects/Interior/interior-12.jpg" },
];

const INTERIOR_PREVIEW_COUNT = 6;

/** Next's default allowed quality. Kept in one place so the preload URL
 *  below and the <Image> components below it can never drift apart — a
 *  mismatch would silently make every preload a cache miss. */
const IMAGE_QUALITY = 75; // must appear in `images.qualities` in next.config.mjs

/* ---------------- Preload cache (module-level, survives re-renders) ---------------- */

const preloadedUrls = new Set<string>();

/**
 * Warms the browser cache for an image.
 *
 * The critical detail is `/_next/image?...`. This used to point `new
 * Image().src` straight at the raw file in /public, which bypasses Next's
 * optimizer completely — so every "preload" pulled the full-size original
 * rather than the resized AVIF/WebP the page actually renders. With twelve
 * ~3.5MB source photos that was tens of megabytes fetched on mount, on the
 * main thread, competing with hydration. It is also wasted work: the
 * browser caches the raw URL, and the <Image> component then requests a
 * completely different URL, so nothing was reused.
 *
 * Requesting the optimizer URL with the same width/quality the grid uses
 * means the preload populates the exact cache entry the render needs.
 */
function preloadImage(src: string, width = 640) {
  if (!src || typeof window === "undefined") return;
  const url = `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${IMAGE_QUALITY}`;
  if (preloadedUrls.has(url)) return;
  preloadedUrls.add(url);
  const img = new window.Image();
  img.decoding = "async";
  img.src = url;
}

/* ---------------- Image with fallback ---------------- */

const ProjectImage = memo(function ProjectImage({
  src,
  alt,
  priority = false,
  sizes,
  className,
  onLoad,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  onLoad?: () => void;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-royal-800 via-navy to-royal-600 text-white/70">
        <ImageOff className="h-8 w-8" />
        <span className="text-xs font-medium">Image coming soon</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      quality={IMAGE_QUALITY}
      className={className}
      onError={() => setErrored(true)}
      onLoad={onLoad}
    />
  );
});

/* ---------------- Project Card ---------------- */

const ProjectCard = memo(function ProjectCard({
  project,
  priority = false,
  onOpen,
}: {
  project: Project;
  priority?: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => preloadImage(project.image, 1200)}
      // `layout` removed deliberately. A layout animation makes framer
      // measure this element's box on every frame of every animation it
      // participates in — including the hover lift — which forces a
      // synchronous style+layout pass per frame per card. With 6-12 cards
      // that is the single most expensive thing on this page. The reveal
      // and hover below are pure transform/opacity and need no measurement.
      //
      // Reveal, hover and press each carry their own transition. Sharing one
      // component-level `transition` prop meant hover and tap both inherited
      // the reveal's 240ms card duration, which is noticeably slow for direct
      // pointer feedback — press now matches `.btn-primary:active` (180ms)
      // and hover matches the `.hover-lift` class used above the fold (200ms).
      initial={REVEAL_FROM}
      whileInView={{ opacity: 1, y: 0, transition: revealTransition() }}
      viewport={VIEWPORT_ONCE_60}
      whileHover={hoverLift}
      whileTap={tapPress}
      className="group relative block w-full overflow-hidden rounded-3xl text-left shadow-glass focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-600"
    >
      <div className="relative h-72 w-full overflow-hidden sm:h-80">
        <ProjectImage
          src={project.image}
          alt={project.title}
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "object-cover transition-transform duration-300 ease-premium group-hover:scale-[1.06]",
            project.focus
          )}
        />

        {/* Static gradient. It previously carried `transition-opacity` plus a
            `group-hover:from-navy/95` colour change — but opacity never
            changed, and gradient colour stops are not interpolable by CSS
            transitions, so the declaration animated nothing while still
            forcing a repaint of the full card area on hover. */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />

        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
            {project.category}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
          <h3 className="font-display text-lg font-semibold text-white">{project.title}</h3>

          <span
            className={cn(
              "w-fit rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white",
              // Explicit property list instead of `transition-all`, which
              // makes the browser watch every animatable property for change.
              "opacity-0 translate-y-2 duration-200 ease-premium",
              "transition-[opacity,transform,background-color,color]",
              "group-hover:opacity-100 group-hover:translate-y-0",
              "group-hover:bg-white group-hover:text-navy"
            )}
          >
            View Project
          </span>
        </div>
      </div>
    </motion.button>
  );
});

/* ---------------- Lightbox ---------------- */

const Lightbox = memo(function Lightbox({
  gallery,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  gallery: Project[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const project = gallery[index];
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const loadedRef = useRef(loaded);
  loadedRef.current = loaded;

  const markLoaded = useCallback((src: string) => {
    setLoaded((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
  }, []);

  // Preload current + neighbors the instant index/gallery changes
  useEffect(() => {
    if (!gallery.length) return;
    const prevIdx = index === 0 ? gallery.length - 1 : index - 1;
    const nextIdx = index === gallery.length - 1 ? 0 : index + 1;
    [gallery[index], gallery[prevIdx], gallery[nextIdx]].forEach((p) => {
      if (p) preloadImage(p.image, 1200);
    });
  }, [gallery, index]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = original;
    };
  }, [handleKeyDown]);

  if (!project) return null;

  const isLoaded = !!loaded[project.image];

  return (
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE_PREMIUM }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous project"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 sm:left-6"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next project"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 sm:right-6"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      <motion.div
        key={project.id}
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: EASE_PREMIUM }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-navy shadow-2xl"
      >
        <div className="relative h-[60vh] w-full sm:h-[70vh]">
          {/* Skeleton / spinner shown until image finishes loading */}
          <AnimatePresence>
            {!isLoaded && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-[1] flex items-center justify-center bg-navy/60"
              >
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 via-white/10 to-white/5" />
                <Loader2 className="relative h-8 w-8 animate-spin text-white/70" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={false}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <ProjectImage
              src={project.image}
              alt={project.title}
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-contain"
              onLoad={() => markLoaded(project.image)}
            />
          </motion.div>
        </div>

        <div className="flex flex-col gap-1 border-t border-white/10 bg-navy/80 px-6 py-4">
          <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            {project.category}
          </span>
          <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>
        </div>

        {/* Hidden preloaders for prev/next so they're ready before the user navigates */}
        <div className="hidden">
          {[
            gallery[index === 0 ? gallery.length - 1 : index - 1],
            gallery[index === gallery.length - 1 ? 0 : index + 1],
          ]
            .filter(Boolean)
            .map((p) => (
              <Image
                key={`preload-${p.id}`}
                src={p.image}
                alt=""
                width={800}
                height={600}
                quality={IMAGE_QUALITY}
                onLoad={() => markLoaded(p.image)}
              />
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
});

/* ---------------- Main Section ---------------- */

export default function Projects() {
  const [showAllInterior, setShowAllInterior] = useState(false);
  const [activeGallery, setActiveGallery] = useState<Project[] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleInterior = useMemo(
    () => (showAllInterior ? interiorProjects : interiorProjects.slice(0, INTERIOR_PREVIEW_COUNT)),
    [showAllInterior]
  );

  // Deliberately no mount-time preloading.
  //
  // This used to eagerly fetch nine images the moment the section mounted.
  // Every one of those is already rendered by an <Image> in the grid below
  // with `loading="lazy"`, so the preload duplicated work the browser was
  // going to do anyway — except it ran immediately, during hydration, and
  // ignored whether the section was even on screen. Lazy loading plus the
  // hover/lightbox preloads below cover every real navigation path without
  // competing with first paint.

  const openLightbox = useCallback((gallery: Project[], project: Project) => {
    const idx = gallery.findIndex((p) => p.id === project.id);
    setActiveGallery(gallery);
    setActiveIndex(idx === -1 ? 0 : idx);
  }, []);

  const closeLightbox = useCallback(() => setActiveGallery(null), []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (!activeGallery) return prev;
      return prev === 0 ? activeGallery.length - 1 : prev - 1;
    });
  }, [activeGallery]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (!activeGallery) return prev;
      return prev === activeGallery.length - 1 ? 0 : prev + 1;
    });
  }, [activeGallery]);

  return (
    <section id="projects" className="section-py bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-xl text-center sm:text-left">
          <span className="eyebrow">Our Portfolio</span>
          <h2 className="heading-display mt-5 text-3xl sm:text-4xl">
            Selected projects across Chennai, Trichy &amp; Tirunelveli
          </h2>
        </div>

        {/* Construction Section */}
        <div className="mt-14">
          <h3 className="font-display text-2xl font-semibold text-navy">Construction</h3>
          {/* Plain div: the grid is a fixed list, so there was nothing for a
              `layout` animation to animate — it only added measurement cost.

              No `priority` on any card any more. `priority` emits an
              unconditional <link rel="preload"> and forces eager loading, but
              this whole section renders far below the fold — the two preloads
              it was emitting competed with the hero for bandwidth on first
              paint. Every card is lazy now, which is what `loading="lazy"`
              in ProjectImage already resolves to; the browser fetches them as
              the visitor approaches. The lightbox keeps `priority`, because
              there the visitor has explicitly asked for the image. */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {constructionProjects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onOpen={() => openLightbox(constructionProjects, p)}
              />
            ))}
          </div>
        </div>

        {/* Interior Section */}
        <div className="mt-16">
          <h3 className="font-display text-2xl font-semibold text-navy">Interior</h3>
          {/* "View More" only ever appends rows — nothing reflows position —
              so `popLayout` was paying for full FLIP measurement of every
              card to animate a change that doesn't move anything. The new
              cards animate themselves in via their own reveal transition. */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleInterior.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onOpen={() => openLightbox(interiorProjects, p)}
              />
            ))}
          </div>

          {interiorProjects.length > INTERIOR_PREVIEW_COUNT && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllInterior((prev) => !prev)}
                className="rounded-full bg-royal-gradient px-8 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-[180ms] ease-premium hover:scale-[1.03] active:scale-[0.98]"
              >
                {showAllInterior ? "Show Less" : "View More"}
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {activeGallery && (
          <Lightbox
            gallery={activeGallery}
            index={activeIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}