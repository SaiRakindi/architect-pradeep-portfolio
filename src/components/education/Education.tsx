"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "2018",
    title: "Bachelor of Environmental Design",
    institution: "University of British Columbia",
    location: "Vancouver, BC",
    description: "Foundational studies in architectural theory, structural systems, and environmental design. First place in the annual design studio competition.",
    tags: ["Foundation", "Theory", "Design Studio"],
    type: "education",
  },
  {
    year: "2020",
    title: "Summer Studio — Barcelona",
    institution: "Escola Tècnica Superior d'Arquitectura",
    location: "Barcelona, Spain",
    description: "Intensive study of Mediterranean urbanism, Catalan Modernisme, and public space design. Thesis proposal cited by faculty as outstanding.",
    tags: ["International", "Urbanism", "Exhibition"],
    type: "award",
  },
  {
    year: "2021",
    title: "Architecture Internship",
    institution: "Dialog Architecture Studio",
    location: "Vancouver, BC",
    description: "Production drawings, BIM coordination, and site visits for a 12-storey mixed-use development in downtown Vancouver. Contributed to award-winning facade design.",
    tags: ["Industry", "BIM", "Commercial"],
    type: "work",
  },
  {
    year: "2022",
    title: "AIA Student Award",
    institution: "American Institute of Architects",
    location: "National",
    description: "Awarded for the project 'Threshold Pavilion' — an experimental installation exploring liminal space and the phenomenology of architectural boundaries.",
    tags: ["Award", "Recognition", "Publication"],
    type: "award",
  },
  {
    year: "2023",
    title: "Master of Architecture",
    institution: "University of British Columbia",
    location: "Vancouver, BC",
    description: "Thesis: 'The Emotional Grammar of Space — How Architectural Proportion Shapes Human Experience.' Graduated with distinction. Dean's Honor List.",
    tags: ["M.Arch", "Thesis", "Distinction"],
    type: "education",
  },
  {
    year: "2024",
    title: "Graduate Architect",
    institution: "Independent Practice",
    location: "Vancouver, BC",
    description: "Launching independent practice focused on residential and cultural projects. Currently accepting commissions for 2024–2025.",
    tags: ["Practice", "Independent", "Open"],
    type: "current",
  },
];

const typeConfig = {
  education: { color: "#4A6FA5", label: "Education" },
  work: { color: "#8B6F47", label: "Work" },
  award: { color: "#9a8a6a", label: "Award" },
  current: { color: "#5a9a5a", label: "Current" },
};

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(
        ".edu-title",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      // Vertical timeline line grows
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 2,
            ease: "power2.out",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 0.5,
            },
          }
        );
      }

      // Timeline items stagger
      const items = section.querySelectorAll(".timeline-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Node dot
        const dot = item.querySelector(".timeline-dot");
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="education" className="relative py-32 md:py-48 bg-graphite overflow-hidden">
      <div className="absolute inset-0 blueprint-bg opacity-15 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="edu-title opacity-0 mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-steel tracking-ultra-wide uppercase">04 — Journey</span>
            <div className="flex-1 h-px bg-steel/20" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-light text-bone">
            Education &<br /><span className="italic text-steel">Experience</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-steel via-steel/50 to-transparent origin-top"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-0">
            {timeline.map((item, index) => {
              const cfg = typeConfig[item.type as keyof typeof typeConfig];
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item.year}
                  className={`timeline-item relative flex items-start opacity-0 pb-12 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Left/Right spacer */}
                  <div className="hidden md:block flex-1" />

                  {/* Center dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1 z-10">
                    <div
                      className="timeline-dot w-3 h-3 rounded-full border-2 border-obsidian"
                      style={{ backgroundColor: cfg.color, transform: "scale(0)" }}
                    />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ml-12 md:ml-0 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="group border border-white/8 bg-obsidian/50 p-6 hover:border-steel/30 transition-all duration-500">
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <span
                          className="font-mono text-xs px-2 py-1 tracking-wider uppercase"
                          style={{ color: cfg.color, backgroundColor: `${cfg.color}15` }}
                        >
                          {cfg.label}
                        </span>
                        <span className="font-mono text-lg font-bold" style={{ color: cfg.color }}>
                          {item.year}
                        </span>
                      </div>

                      <h3 className="font-display text-xl md:text-2xl font-light text-bone mb-1 group-hover:text-steel transition-colors duration-400">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-concrete/70 mb-3">
                        {item.institution} — {item.location}
                      </p>
                      <p className="font-sans text-sm text-concrete/80 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="font-mono text-xs text-white/30 bg-white/5 px-2 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
