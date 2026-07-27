# SRAJ Construction & Interior — Premium Website

Production-ready Next.js 15 (App Router) website for SRAJ Construction & Interior, Chennai.

## Tech Stack
- Next.js 15 · React 19 · TypeScript
- Tailwind CSS (custom Royal Blue / Navy / Sky design system derived from the SRAJ logo)
- Framer Motion (scroll reveals, hover/tap micro-interactions, page-level transitions)
- GSAP (hero stat counters)
- Lenis (buttery smooth scroll + smooth anchor navigation)
- React Hook Form (Contact + Enquiry Modal forms)
- Lucide Icons

## Getting Started
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Before Going Live — Please Update
1. **Phone number** — `lib/utils.ts` → `SITE.phone` / `SITE.phoneRaw` currently has a placeholder. This number powers Call, WhatsApp and all enquiry buttons.
2. **Project photography** — `data/projects.ts` currently uses styled gradient placeholders since no project photos were supplied. Add real images to `public/projects/` and swap the `gradient` field for an `image` field + `next/image`.
3. **Domain** — `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` reference `https://www.srajconstruction.com` as a placeholder — update once your domain is live.
4. **Social links** — `components/Footer.tsx` has placeholder `#` hrefs for Instagram/Facebook/LinkedIn.
5. **Brochure** — "Download Brochure" currently opens the WhatsApp enquiry flow (no PDF was supplied). If you have a PDF brochure, add it to `/public` and link it directly.

## Structure
- `app/` — routes, layout, global styles, SEO (sitemap/robots)
- `components/` — all page sections (Navbar, Hero, About, Services, Packages, Projects, WhyChooseUs, Process, Testimonials, FAQ, Contact, GoogleMap, Footer, FloatingButtons, EnquiryModal)
- `data/` — structured content, including the full construction package specification (from `Construction_cost_packages_13_07_2026.xlsx`, Sheet 1) and interior plywood/laminate rate card (Sheet 2)
- `lib/` — `utils.ts` (site constants, `cn` helper), `lenis-provider.tsx` (smooth scroll), `enquiry-context.tsx` (shared enquiry modal state)

## Notes
- All forms route through WhatsApp (`wa.me`) since no backend/CRM was specified — swap `onSubmit` in `Contact.tsx` / `EnquiryModal.tsx` for an API call if you add one later.
- Construction package specs and interior rates are pulled verbatim from your Excel cost sheet and are fully editable in `data/packages.ts` and `data/interior-rates.ts`.
