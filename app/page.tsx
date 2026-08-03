import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";

// Hero / About / Services are the critical path and ship in the initial
// bundle. None of them import framer-motion any more — their reveals are CSS —
// so the initial JS is React plus a handful of lucide icons.
//
// Everything else is one deferred chunk (see components/BelowFold.tsx). It
// still renders on the server, so the markup, LCP text and SEO content are
// identical; only the JS download and hydration are deferred.
const BelowFold = dynamic(() => import("@/components/BelowFold"));

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <BelowFold />
    </main>
  );
}
