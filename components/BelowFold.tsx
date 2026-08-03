"use client";

import { MotionConfig } from "framer-motion";
import Packages from "@/components/Packages";
import Projects from "@/components/Projects";
import ServiceLocations from "@/components/ServiceLocations";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import GoogleMap from "@/components/GoogleMap";

/**
 * Everything below the fold, in one lazily-loaded chunk.
 *
 * Two things are going on here.
 *
 * First, this is the only place framer-motion is imported from any more. The
 * hero, navbar, scroll bar and floating buttons were all converted to CSS, so
 * framer no longer sits on the critical path — it now downloads and parses
 * with this chunk, after first paint, instead of before it.
 *
 * Second, these eight sections used to be eight separate `next/dynamic` calls,
 * which meant eight chunk requests. On a phone, request overhead and
 * per-chunk compression loss are worse than one slightly larger download for
 * content the visitor will scroll through anyway.
 *
 * `MotionConfig reducedMotion="user"` lives here rather than in the root
 * layout for the same reason — putting it in the layout dragged framer into
 * every page's initial bundle purely to set one option. It still wraps every
 * remaining framer component, so the accessibility behaviour is unchanged.
 */
export default function BelowFold() {
  return (
    <MotionConfig reducedMotion="user">
      <Packages />
      <Projects />
      <ServiceLocations />
      <WhyChooseUs />
      <Process />
      <FAQ />
      <Contact />
      <GoogleMap />
    </MotionConfig>
  );
}
