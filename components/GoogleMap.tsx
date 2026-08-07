"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { Navigation, MapPin, Play } from "lucide-react";
import { SITE } from "@/lib/utils";
import { REVEAL_FROM, VIEWPORT_ONCE_80, revealTransition } from "@/lib/motion";

export default function GoogleMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section className="relative bg-white pb-24">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial={REVEAL_FROM}
          whileInView={{ opacity: 1, y: 0, transition: revealTransition() }}
          viewport={VIEWPORT_ONCE_80}
          className="overflow-hidden rounded-3xl border border-black/5 shadow-glass"
        >
          <div className="grid lg:grid-cols-[1fr_1.6fr]">
            {/* Left Content */}
            <div className="flex flex-col justify-center gap-5 bg-royal-gradient p-8 text-white sm:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <p className="font-display text-xl font-semibold">
                  Visit Our Office
                </p>

                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {SITE.address}
                </p>
              </div>

              <a
                href={SITE.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-royal-800 transition-transform duration-[180ms] ease-premium hover:scale-[1.03] active:scale-[0.98]"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </div>

            {/* Google Map — click-to-load facade.

                A Maps embed is the single heaviest thing on this page: roughly
                1.5MB of third-party JavaScript plus tile requests, and it runs
                a lot of scripting on the main thread while it initialises.
                `loading="lazy"` deferred it past first paint, but it still
                fired the moment a scrolling visitor approached the footer,
                which is exactly when a phone can least afford a long task.

                Nothing loads now until the visitor asks for it. Anyone who
                just wants directions taps the button on the left and never
                pays for the embed at all. */}
            <div className="h-72 w-full lg:h-full">
              {mapLoaded ? (
                <iframe
                  title="SRAJ Construction & Interior Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.4590744627044!2d80.18215317469615!3d13.133417187197026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265082916b897%3A0x8a4284302765a57a!2sSRAJ%20Construction%20%26%20Interior%20%7C%20Civil%20contractor%20%7C%20Interior%20Designer%20%7C%20Architecture%20%7C%20Kolathur%20%7C%20Ambattur%20%7C%20Madhavaram!5e0!3m2!1sen!2sin!4v1785179526209!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "100%" }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setMapLoaded(true)}
                  className="group/map relative flex h-full min-h-[18rem] w-full flex-col items-center justify-center gap-3 bg-mist transition-colors duration-200 ease-premium hover:bg-royal-50"
                >
                  {/* Static placeholder — a faint grid so the panel reads as a
                      map rather than an empty box. Pure CSS, no requests. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(30,64,175,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,64,175,0.12)_1px,transparent_1px)] [background-size:32px_32px]"
                  />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-royal-gradient text-white shadow-premium transition-transform duration-200 ease-premium group-hover/map:scale-105">
                    <Play className="h-5 w-5 translate-x-px" fill="currentColor" strokeWidth={0} />
                  </span>
                  <span className="relative text-sm font-semibold text-navy">Load interactive map</span>
                  <span className="relative text-xs text-ink-soft">Tap to open Google Maps here</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}