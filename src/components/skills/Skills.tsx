"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    category: "Design & Visualization",
    skills: [
      { name: "AutoCAD", level: 95, unit: "Drafting" },
      { name: "Revit BIM", level: 90, unit: "BIM" },
      { name: "Rhino 3D", level: 88, unit: "3D Modeling" },
      { name: "SketchUp", level: 92, unit: "Visualization" },
      { name: "V-Ray Rendering", level: 82, unit: "Rendering" },
    ],
  },
  {
    category: "Creative & Ideation",
    skills: [
      { name: "Grasshopper", level: 78, unit: "Parametric" },
      { name: "Adobe Suite", level: 88, unit: "Presentation" },
      { name: "Hand Drafting", level: 85, unit: "Technical" },
      { name: "Physical Modeling", level: 80, unit: "Craft" },
      { name: "Concept Development", level: 94, unit: "Strategy" },
    ],
  },
  {
    category: "Architecture Domains",
    skills: [
      { name: "Residential Design", level: 93, unit: "Domain" },
      { name: "Commercial Spaces", level: 80, unit: "Domain" },
      { name: "Urban Planning", level: 75, unit: "Domain" },
      { name: "Interior Design", level: 88, unit: "Domain" },
      { name: "Sustainable Design", level: 82, unit: "Domain" },
    ],
  },
];

const tools = [
  "Revit", "AutoCAD", "Rhino 3D", "SketchUp", "V-Ray",
  "Grasshopper", "Lumion", "Photoshop", "InDesign", "Illustrator",
  "Enscape", "Blender", "ArchiCAD", "LEED", "Passive House",
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(
        ".skills-title",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      // Blueprint bars
      const bars = section.querySelectorAll(".skill-bar-fill");
      bars.forEach((bar) => {
        const level = (bar as HTMLElement).dataset.level || "0";
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: Number(level) / 100,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 90%", toggleActions: "play none none reverse" },
          }
        );
      });

      // Skill cards stagger
      gsap.fromTo(
        ".skill-category",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".skills-grid", start: "top 85%" },
        }
      );

      // Tool tags
      gsap.fromTo(
        ".tool-tag",
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: ".tools-section", start: "top 85%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 md:py-48 bg-obsidian overflow-hidden">
      <div className="absolute inset-0 blueprint-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="skills-title opacity-0 mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-steel tracking-ultra-wide uppercase">03 — Expertise</span>
            <div className="flex-1 h-px bg-steel/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <h2 className="font-display text-4xl md:text-6xl font-light text-bone">
              Skills &<br /><span className="italic text-steel">Capabilities</span>
            </h2>
            <p className="font-sans text-base text-concrete leading-relaxed self-end">
              A multidisciplinary toolkit built over six years of architectural education,
              combining technical precision with creative vision.
            </p>
          </div>
        </div>

        {/* Skills grid */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {skillCategories.map((cat) => (
            <div key={cat.category} className="skill-category opacity-0">
              <div className="border border-white/8 p-6 md:p-8 bg-graphite/30 hover:border-steel/30 transition-colors duration-500">
                <h3 className="font-sans text-xs text-steel tracking-widest uppercase mb-8">{cat.category}</h3>
                <div className="space-y-6">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-sans text-sm text-bone">{skill.name}</span>
                        <span className="font-mono text-xs text-concrete">{skill.level}%</span>
                      </div>
                      {/* Blueprint bar */}
                      <div className="relative h-px bg-white/8 overflow-hidden">
                        {/* Tick marks */}
                        {[25, 50, 75].map((tick) => (
                          <div
                            key={tick}
                            className="absolute top-0 bottom-0 w-px bg-white/15"
                            style={{ left: `${tick}%` }}
                          />
                        ))}
                        {/* Fill */}
                        <div
                          className="skill-bar-fill absolute top-0 left-0 h-full bg-steel origin-left"
                          data-level={skill.level}
                          style={{ transform: "scaleX(0)" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tools section */}
        <div className="tools-section">
          <p className="font-mono text-xs text-steel tracking-ultra-wide uppercase mb-8">Software & Tools</p>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="tool-tag opacity-0 font-mono text-xs text-concrete border border-white/10 px-4 py-2 hover:border-steel/50 hover:text-bone transition-all duration-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Architectural diagram accent */}
        <div className="mt-24 grid grid-cols-3 gap-4">
          {[
            { label: "Design", icon: "◈", value: "Form + Function" },
            { label: "Compute", icon: "⬡", value: "Parametric" },
            { label: "Build", icon: "◻", value: "Technical" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center p-6 border border-white/5 group hover:border-steel/20 transition-all duration-500">
              <span className="text-2xl text-steel/40 group-hover:text-steel transition-colors duration-500 mb-3">{item.icon}</span>
              <p className="font-sans text-xs tracking-widest uppercase text-concrete mb-1">{item.label}</p>
              <p className="font-mono text-xs text-white/30">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
