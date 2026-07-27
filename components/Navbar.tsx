"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn, SITE } from "@/lib/utils";
import { useEnquiry } from "@/lib/enquiry-context";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#packages", label: "Packages" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container-px mx-auto max-w-7xl">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500",
            scrolled
              ? "glass shadow-glass"
              : "bg-transparent border border-transparent"
          )}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <div className="relative h-11 w-11 shrink-0">
              <Image src="/logo.png" alt="SRAJ Construction & Interior logo" fill sizes="44px" className="object-contain" priority />
            </div>
            <div className="leading-tight">
              <p className="font-display text-base font-semibold text-navy">SRAJ</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-soft">Construction &amp; Interior</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-ink/80 transition-colors hover:text-royal-700"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:+${SITE.phoneRaw}`}
              className="flex items-center gap-2 text-sm font-semibold text-navy"
            >
              <Phone className="h-4 w-4 text-royal-700" />
              {SITE.phone}
            </a>
            <button onClick={() => openEnquiry("General Enquiry")} className="btn-primary !px-5 !py-2.5 !text-xs">
              Get Free Quote
            </button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="container-px mx-auto max-w-7xl overflow-hidden lg:hidden"
          >
            <div className="mt-2 flex flex-col gap-1 rounded-2xl glass p-4 shadow-glass">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-royal-50 hover:text-royal-700"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-3 border-t border-ink/10 pt-3">
                <a href={`tel:+${SITE.phoneRaw}`} className="flex items-center gap-2 text-sm font-semibold text-navy">
                  <Phone className="h-4 w-4 text-royal-700" /> {SITE.phone}
                </a>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  openEnquiry("General Enquiry");
                }}
                className="btn-primary mt-2 w-full"
              >
                Get Free Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
