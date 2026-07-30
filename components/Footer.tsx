import Image from "next/image";
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin } from "lucide-react";
import { SITE } from "@/lib/utils";

const quickLinks = [
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "#packages", label: "Packages" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const serviceLinks = [
  "Civil Contracting",
  "Residential Construction",
  "Architecture & Design",
  "Interior Design",
  "Turnkey Construction",
  "Renovation",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy pt-20">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-40" />
      <div className="container-px relative mx-auto max-w-7xl">
        <div className="grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="relative h-10 w-10">
                <Image
                  src="/logo.png"
                  alt="SRAJ Construction & Interior logo"
                  fill
                  sizes="40px"
                  loading="lazy"
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-display text-base font-semibold text-white">SRAJ</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/50">Construction &amp; Interior</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              Civil contracting, construction, architecture, interior design and turnkey
              builds across Chennai, Trichy and Tirunelveli — engineered with transparent,
              fixed-rate packages.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-sky hover:text-sky-light"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display text-sm font-semibold text-white">Quick Links</p>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/55 transition-colors hover:text-sky-light">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold text-white">Our Services</p>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((s) => (
                <li key={s} className="text-sm text-white/55">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold text-white">Contact</p>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/55">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-light" />
                {SITE.address}
              </li>
              <li className="flex items-center gap-3 text-sm text-white/55">
                <Phone className="h-4 w-4 shrink-0 text-sky-light" />
                <a href={`tel:+${SITE.phoneRaw}`} className="hover:text-sky-light">{SITE.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/55">
                <Mail className="h-4 w-4 shrink-0 text-sky-light" />
                <a href={`mailto:${SITE.email}`} className="hover:text-sky-light">{SITE.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Serving {SITE.serviceAreas.join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
