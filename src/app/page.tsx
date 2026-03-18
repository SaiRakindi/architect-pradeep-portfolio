"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Education from "@/components/education/Education";
import Services from "@/components/services/Services";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/ui/Footer";

const Projects = dynamic(() => import("@/components/projects/Projects"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <main className="relative bg-obsidian overflow-hidden">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Education />
          <Services />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
