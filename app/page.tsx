import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import Projects from "@/components/Projects";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import GoogleMap from "@/components/GoogleMap";

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
      <Testimonials />
      <FAQ />
      <Contact />
      <GoogleMap />
    </main>
  );
}
