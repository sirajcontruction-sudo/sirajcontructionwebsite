"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { SITE } from "@/lib/utils";
import { useEnquiry } from "@/lib/enquiry-context";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#packages", label: "Packages" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { openEnquiry } = useEnquiry();

  return (
    <header className="fixed inset-x-0 top-0 z-50 py-4">
      <div className="container-px mx-auto max-w-7xl">
        <div className="nav-glass flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-2.5 shadow-xl">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5">
            <div className="relative h-11 w-11 shrink-0">
              <Image
                src="/logo.png"
                alt="SRAJ Construction logo"
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </div>

            <div className="leading-tight">
              <p className="font-display text-base font-semibold text-navy">
                SRAJ
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-soft">
                Construction &amp; Interior
              </p>
            </div>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink/80 transition-colors hover:text-royal-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:+${SITE.phoneRaw}`}
              className="flex items-center gap-2 text-sm font-semibold text-navy"
            >
              <Phone className="h-4 w-4 text-royal-700" />
              {SITE.phone}
            </a>

            <button
              onClick={() => openEnquiry("General Enquiry")}
              className="btn-primary !px-5 !py-2.5 !text-xs"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="container-px mx-auto max-w-7xl overflow-hidden lg:hidden"
          >
            <div className="nav-glass mt-2 rounded-2xl border border-slate-200 p-4 shadow-xl">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-sm font-medium text-ink hover:bg-royal-50 hover:text-royal-700"
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-3 border-t border-slate-200 pt-3">
                <a
                  href={`tel:+${SITE.phoneRaw}`}
                  className="flex items-center gap-2 text-sm font-semibold text-navy"
                >
                  <Phone className="h-4 w-4 text-royal-700" />
                  {SITE.phone}
                </a>

                <button
                  onClick={() => {
                    setOpen(false);
                    openEnquiry("General Enquiry");
                  }}
                  className="btn-primary mt-4 w-full"
                >
                  Get Free Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}