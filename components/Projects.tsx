"use client";

import { useState, useEffect, useCallback, useMemo, useRef, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "Construction" | "Interior";

type Project = {
  id: string;
  title: string;
  category: Category;
  image: string;
};

const constructionProjects: Project[] = [
  { id: "c1", title: "Premium Duplex Residence", category: "Construction", image: "/projects/construction/construction-1.jpeg" },
  { id: "c2", title: "Modern Family Residence", category: "Construction", image: "/projects/construction/construction-2.jpeg" },
  { id: "c3", title: "Contemporary Luxury Home", category: "Construction", image: "/projects/construction/construction-3.jpeg" },
];

const interiorProjects: Project[] = [
  { id: "i1", title: "Designer TV Unit", category: "Interior", image: "/projects/interior/interior-1.jpg" },
  { id: "i2", title: "Luxury Living Room", category: "Interior", image: "/projects/interior/interior-2.jpg" },
  { id: "i3", title: "Modern Living Lounge", category: "Interior", image: "/projects/interior/interior-3.jpg" },
  { id: "i4", title: "Compact Modular Kitchen", category: "Interior", image: "/projects/interior/interior-4.jpg" },
  { id: "i5", title: "Contemporary Modular Kitchen", category: "Interior", image: "/projects/interior/interior-5.jpg" },
  { id: "i6", title: "Modern Kitchen Interior", category: "Interior", image: "/projects/interior/interior-6.jpg" },
  { id: "i7", title: "Master Bedroom Interior", category: "Interior", image: "/projects/interior/interior-7.jpg" },
  { id: "i8", title: "Premium Sliding Wardrobe", category: "Interior", image: "/projects/interior/interior-8.jpg" },
  { id: "i9", title: "Master bedroom wardrobes", category: "Interior", image: "/projects/interior/interior-9.jpg" },
  { id: "i10", title: "Bedroom Wardrobe Design", category: "Interior", image: "/projects/interior/interior-10.jpg" },
  { id: "i11", title: "Contemporary Bedroom", category: "Interior", image: "/projects/interior/interior-11.jpg" },
  { id: "i12", title: "Luxury Wardrobe Design", category: "Interior", image: "/projects/interior/interior-12.jpg" },
];

const INTERIOR_PREVIEW_COUNT = 6;

/* ---------------- Preload cache (module-level, survives re-renders) ---------------- */

const preloadedUrls = new Set<string>();

function preloadImage(src: string) {
  if (!src || preloadedUrls.has(src)) return;
  preloadedUrls.add(src);
  const img = new window.Image();
  img.src = src;
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
      quality={80}
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
      onMouseEnter={() => preloadImage(project.image)}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group relative block w-full overflow-hidden rounded-3xl text-left shadow-glass focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-600"
    >
      <div className="relative h-72 w-full overflow-hidden sm:h-80">
        <ProjectImage
          src={project.image}
          alt={project.title}
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent transition-opacity duration-500 group-hover:from-navy/95" />

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
              "opacity-0 translate-y-2 transition-all duration-300",
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
      if (p) preloadImage(p.image);
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
      transition={{ duration: 0.25 }}
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
        transition={{ duration: 0.3, ease: "easeOut" }}
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
                quality={80}
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

  // Warm the cache for the first few images of each gallery as soon as the section mounts
  useEffect(() => {
    constructionProjects.forEach((p) => preloadImage(p.image));
    interiorProjects.slice(0, INTERIOR_PREVIEW_COUNT).forEach((p) => preloadImage(p.image));
  }, []);

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
            Selected projects across Chennai
          </h2>
        </div>

        {/* Construction Section */}
        <div className="mt-14">
          <h3 className="font-display text-2xl font-semibold text-navy">Construction</h3>
          <motion.div layout className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {constructionProjects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                priority={i === 0}
                onOpen={() => openLightbox(constructionProjects, p)}
              />
            ))}
          </motion.div>
        </div>

        {/* Interior Section */}
        <div className="mt-16">
          <h3 className="font-display text-2xl font-semibold text-navy">Interior</h3>
          <motion.div layout className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleInterior.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  priority={i === 0}
                  onOpen={() => openLightbox(interiorProjects, p)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {interiorProjects.length > INTERIOR_PREVIEW_COUNT && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllInterior((prev) => !prev)}
                className="rounded-full bg-royal-gradient px-8 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-300 hover:scale-105"
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