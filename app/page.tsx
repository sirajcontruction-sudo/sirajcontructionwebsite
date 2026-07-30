import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";

// Below-the-fold sections are code-split into their own chunks so the
// critical path (Hero/About/Services) parses and hydrates faster on
// mobile. They still render on the server (ssr defaults to true) so LCP
// and SEO content are unaffected — only the JS download/parse is deferred.
const Packages = dynamic(() => import("@/components/Packages"));
const Projects = dynamic(() => import("@/components/Projects"));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const Process = dynamic(() => import("@/components/Process"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Contact = dynamic(() => import("@/components/Contact"));
const GoogleMap = dynamic(() => import("@/components/GoogleMap"));

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Packages />
      <Projects />
      <WhyChooseUs />
      <Process />
      <FAQ />
      <Contact />
      <GoogleMap />
    </main>
  );
}
