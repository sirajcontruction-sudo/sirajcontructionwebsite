"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, ShieldCheck, Building2 } from "lucide-react";
import { useEnquiry } from "@/lib/enquiry-context";

const stats = [
  { value: 12, suffix: "+", label: "Years of Building" },
  { value: 180, suffix: "+", label: "Projects Delivered" },
  { value: 6, suffix: "L+", label: "Sqft Constructed" },
  { value: 4, suffix: "", label: "Service Regions" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (el) el.textContent = Math.round(obj.val).toString();
      },
    });
    return () => {
      tween.kill();
    };
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
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-royal-600/30 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-sky/20 blur-[130px]" />

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
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-light backdrop-blur"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Chennai&apos;s Trusted Civil Contractor
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-medium leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          >
            We build homes that
            <span className="block shimmer-text">stand for Generations.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            SRAJ Construction &amp; Interior delivers civil contracting, architecture and
            turnkey construction across Kolathur, Ambattur, Madhavaram and Chennai —
            engineered with transparent, fixed-rate packages from foundation to final finish.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
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
            transition={{ duration: 0.8, delay: 0.5 }}
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
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto hidden aspect-[4/5] w-full max-w-md lg:block"
        >
          <div className="absolute inset-0 rounded-4xl border border-white/10 bg-white/[0.04] backdrop-blur-xl" />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-8 flex items-center justify-center rounded-3xl bg-royal-gradient shadow-glow-sky"
          >
            <div className="relative h-40 w-40">
              <Image src="/logo.png" alt="SRAJ Construction & Interior" fill className="object-contain drop-shadow-2xl" />
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="glass absolute -left-6 bottom-10 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-glass"
          >
            <Building2 className="h-5 w-5 text-royal-700" />
            <div>
              <p className="text-xs font-semibold text-navy">Turnkey Ready</p>
              <p className="text-[10px] text-ink-soft">Design to Handover</p>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass absolute -right-4 top-8 rounded-2xl px-4 py-3 shadow-glass"
          >
            <p className="text-xs font-semibold text-navy">4 Package Tiers</p>
            <p className="text-[10px] text-ink-soft">₹2,299 – ₹2,999 /sqft</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
