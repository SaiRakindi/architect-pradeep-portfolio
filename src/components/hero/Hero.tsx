"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/lib/SplitText";
import WebGLScene from "./WebGLScene";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Overlay fade
    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 0, duration: 1.5, ease: "power2.inOut" }, 0);
    }

    // Grid lines appear
    if (gridLinesRef.current) {
      const lines = gridLinesRef.current.querySelectorAll(".h-line, .v-line");
      tl.fromTo(lines, { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, duration: 1.5, stagger: 0.1, ease: "power3.out" }, 0.5);
    }

    // Headline split text
    if (headlineRef.current) {
      const split = new SplitText(headlineRef.current);
      tl.fromTo(
        split.lines,
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" },
        0.8
      );
    }

    // Subtitle
    if (subRef.current) {
      tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 1.6);
    }

    // Tags
    if (tagsRef.current) {
      const tags = tagsRef.current.querySelectorAll(".tag-item");
      tl.fromTo(tags, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 1.8);
    }

    // CTAs
    if (ctaRef.current) {
      const btns = ctaRef.current.querySelectorAll("a, button");
      tl.fromTo(btns, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }, 2.1);
    }

    // Scroll indicator
    if (scrollIndicatorRef.current) {
      tl.fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, 2.5);
      // Infinite bounce
      gsap.to(scrollIndicatorRef.current.querySelector(".scroll-dot"), {
        y: 12,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
        delay: 3,
      });
    }

    // Parallax on scroll
    if (heroRef.current) {
      const webglWrap = heroRef.current.querySelector(".webgl-wrap");
      if (webglWrap) {
        gsap.to(webglWrap, {
          y: "25%",
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      const content = heroRef.current.querySelector(".hero-content");
      if (content) {
        gsap.to(content, {
          y: "15%",
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "30% top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleScroll = () => {
    const about = document.querySelector("#about");
    if (about) {
      const win = window as typeof window & { lenis?: { scrollTo: (el: Element, opts: object) => void } };
      if (win.lenis) win.lenis.scrollTo(about, { duration: 2 });
      else about.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-screen min-h-[600px] flex items-end overflow-hidden noise-overlay"
    >
      {/* Initial black overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-obsidian z-20 pointer-events-none" />

      {/* WebGL background */}
      <div className="webgl-wrap absolute inset-0 z-0">
        <WebGLScene />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/10 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-obsidian/70 via-transparent to-transparent pointer-events-none" />

      {/* Architectural grid lines */}
      <div ref={gridLinesRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="h-line absolute left-0 right-0 top-1/3 h-px bg-steel/20 origin-left" style={{ transform: "scaleX(0)" }} />
        <div className="h-line absolute left-0 right-0 top-2/3 h-px bg-steel/10 origin-left" style={{ transform: "scaleX(0)" }} />
        <div className="v-line absolute top-0 bottom-0 left-1/4 w-px bg-steel/10 origin-top" style={{ transform: "scaleY(0)" }} />
        <div className="v-line absolute top-0 bottom-0 right-1/4 w-px bg-steel/10 origin-top" style={{ transform: "scaleY(0)" }} />
        {/* Corner bracket top-left */}
        <div className="absolute top-16 left-8 md:left-16 w-10 h-10 border-l border-t border-steel/40" />
        {/* Corner bracket top-right */}
        <div className="absolute top-16 right-8 md:right-16 w-10 h-10 border-r border-t border-steel/40" />
        {/* Corner bracket bottom-left */}
        <div className="absolute bottom-24 left-8 md:left-16 w-10 h-10 border-l border-b border-steel/40" />
        {/* Corner bracket bottom-right */}
        <div className="absolute bottom-24 right-8 md:right-16 w-10 h-10 border-r border-b border-steel/40" />
      </div>

      {/* Coordinate label */}
      <div className="absolute top-20 right-8 md:right-20 z-20 font-mono text-xs text-concrete/50 tracking-widest">
        <span>49.2827° N</span><br />
        <span>123.1207° W</span>
      </div>

      {/* Hero Content */}
      <div className="hero-content relative z-20 w-full px-6 md:px-16 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Label */}
          <p className="font-mono text-xs text-steel tracking-ultra-wide uppercase mb-6 opacity-0" ref={tagsRef}>
            <span className="tag-item inline-block">Architecture Graduate</span>
            <span className="tag-item inline-block mx-4 text-concrete">—</span>
            <span className="tag-item inline-block">Class of 2024</span>
          </p>

          {/* Main headline */}
          <div className="overflow-hidden mb-4">
            <h1
              ref={headlineRef}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-[0.92] text-bone tracking-tight"
            >
              Designing Spaces<br />
              <span className="italic text-steel">That Inspire</span><br />
              Human Experience
            </h1>
          </div>

          {/* Subtitle */}
          <p
            ref={subRef}
            className="font-sans text-sm md:text-base text-concrete max-w-lg mt-6 leading-relaxed opacity-0"
          >
            Graduate architect with a vision for blending structural precision with emotional resonance.
            Every space tells a story — I help write yours.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mt-10">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="group relative inline-flex items-center gap-3 bg-steel text-bone text-xs tracking-widest uppercase px-8 py-4 hover:bg-bone hover:text-obsidian transition-all duration-500 opacity-0"
            >
              <span>View Projects</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-3 border border-bone/30 text-bone text-xs tracking-widest uppercase px-8 py-4 hover:border-bone transition-all duration-400 opacity-0"
            >
              Start a Project
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14 pt-8 border-t border-white/8">
            {[
              { value: "12+", label: "Projects Completed" },
              { value: "4", label: "Awards Received" },
              { value: "3", label: "Firms Collaborated" },
            ].map((stat) => (
              <div key={stat.label} className="tag-item opacity-0">
                <p className="font-display text-3xl md:text-4xl font-light text-bone">{stat.value}</p>
                <p className="font-sans text-xs text-concrete tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer opacity-0"
        onClick={handleScroll}
      >
        <span className="font-mono text-xs text-concrete/60 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-white/10 relative overflow-hidden">
          <div className="scroll-dot absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-steel to-transparent" />
        </div>
      </div>
    </section>
  );
}
