"use client";

import { motion } from "framer-motion";
import { Navigation, MapPin } from "lucide-react";
import { SITE } from "@/lib/utils";

export default function GoogleMap() {
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    SITE.mapEmbedQuery
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="relative bg-white pb-24">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-3xl border border-black/5 shadow-glass"
        >
          <div className="grid lg:grid-cols-[1fr_1.6fr]">
            <div className="flex flex-col justify-center gap-5 bg-royal-gradient p-8 text-white sm:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-xl font-semibold">Visit Our Office</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{SITE.address}</p>
              </div>
              <a
                href={SITE.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-royal-800 transition-transform hover:scale-[1.03]"
              >
                <Navigation className="h-4 w-4" /> Get Directions
              </a>
            </div>
            <div className="h-72 w-full lg:h-full">
              <iframe
                title="SRAJ Construction & Interior — Location Map"
                src={embedSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "100%" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
