"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Residential Design",
    subtitle: "Custom Homes & Renovations",
    description:
      "From intimate family homes to ambitious residential compounds — designing spaces that reflect who you are. Every detail considered, every material chosen with intention.",
    features: ["Custom floor plans", "3D visualizations", "Material selection", "Construction documents"],
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M6 20L24 6l18 14v22H30V28H18v14H6V20z" />
        <path d="M18 28h12" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Commercial Spaces",
    subtitle: "Offices, Retail & Hospitality",
    description:
      "Architecture that works as hard as your business. Environments designed to enhance productivity, attract customers, and communicate your brand with spatial precision.",
    features: ["Space programming", "Brand integration", "Code compliance", "Phased delivery"],
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="6" y="8" width="36" height="36" />
        <line x1="6" y1="20" x2="42" y2="20" />
        <line x1="6" y1="32" x2="42" y2="32" />
        <line x1="18" y1="8" x2="18" y2="44" />
        <line x1="30" y1="8" x2="30" y2="44" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Urban Planning",
    subtitle: "Masterplans & District Design",
    description:
      "Shaping the city at multiple scales. From single-block interventions to comprehensive masterplans — creating connected, sustainable neighbourhoods that endure.",
    features: ["Site analysis", "Zoning strategy", "Public realm design", "Sustainability targets"],
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="4" y="4" width="16" height="16" />
        <rect x="28" y="4" width="16" height="16" />
        <rect x="4" y="28" width="16" height="16" />
        <rect x="28" y="28" width="16" height="16" />
        <line x1="20" y1="4" x2="28" y2="4" opacity="0.4" />
        <line x1="20" y1="44" x2="28" y2="44" opacity="0.4" />
        <line x1="4" y1="20" x2="4" y2="28" opacity="0.4" />
        <line x1="44" y1="20" x2="44" y2="28" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Interior Design",
    subtitle: "Atmosphere & Detail",
    description:
      "Interior architecture as experience design. Crafting rooms that feel inevitable — where every surface, light source, and material composition tells a coherent story.",
    features: ["Space planning", "Material palettes", "Lighting design", "FF&E specification"],
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M4 44V10l20-6 20 6v34" />
        <rect x="14" y="26" width="20" height="18" />
        <line x1="4" y1="10" x2="44" y2="10" opacity="0.4" />
        <path d="M14 26 Q24 20 34 26" opacity="0.5" />
      </svg>
    ),
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-title",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      const cards = section.querySelectorAll(".service-card");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".services-grid", start: "top 85%" },
        }
      );

      // Hover depth effect
      cards.forEach((card) => {
        const el = card as HTMLElement;
        const inner = el.querySelector(".card-inner") as HTMLElement;
        if (!inner) return;

        el.addEventListener("mouseenter", () => {
          gsap.to(inner, { y: -8, duration: 0.4, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(inner, { y: 0, duration: 0.5, ease: "power3.out" });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-32 md:py-48 bg-obsidian overflow-hidden">
      <div className="absolute inset-0 blueprint-bg opacity-20 pointer-events-none" />

      {/* Large background text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[20vw] font-light text-white/2 select-none pointer-events-none leading-none tracking-tighter">
        WORK
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        {/* Header */}
        <div className="services-title opacity-0 mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-steel tracking-ultra-wide uppercase">05 — Services</span>
            <div className="flex-1 h-px bg-steel/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <h2 className="font-display text-4xl md:text-6xl font-light text-bone">
              What I<br /><span className="italic text-steel">Offer</span>
            </h2>
            <p className="font-sans text-base text-concrete leading-relaxed self-end">
              Each engagement is a collaboration. I bring rigorous thinking,
              creative vision, and technical fluency to every project — regardless of scale.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="services-grid grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((service, index) => (
            <div key={service.id} className="service-card opacity-0 group cursor-pointer" data-cursor-expand>
              <div className="card-inner border border-white/8 bg-graphite/20 p-8 md:p-10 h-full hover:border-steel/40 transition-colors duration-500 relative overflow-hidden">
                {/* Background number */}
                <span className="absolute top-4 right-6 font-mono text-5xl text-white/4 font-bold select-none">
                  {service.id}
                </span>

                {/* Icon */}
                <div className="text-steel/60 group-hover:text-steel transition-colors duration-400 mb-6">
                  {service.icon}
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-light text-bone mb-1 group-hover:text-steel transition-colors duration-400">
                  {service.title}
                </h3>
                <p className="font-mono text-xs text-concrete/60 tracking-wider uppercase mb-5">
                  {service.subtitle}
                </p>
                <p className="font-sans text-sm text-concrete leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 font-sans text-sm text-concrete/70">
                      <span className="w-3 h-px bg-steel/50 flex-none" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center gap-2 text-xs text-steel tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                  <span>Enquire</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px bg-steel scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Process section */}
        <div className="mt-24 pt-16 border-t border-white/8">
          <p className="font-mono text-xs text-steel tracking-ultra-wide uppercase mb-10">How It Works</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: "01", label: "Discovery", desc: "We meet, talk through your vision, site, and budget." },
              { step: "02", label: "Concept", desc: "Initial ideas presented as sketches and diagrams." },
              { step: "03", label: "Design", desc: "Developed drawings, models, and material selections." },
              { step: "04", label: "Delivery", desc: "Construction documents and on-site support." },
            ].map((p) => (
              <div key={p.step} className="group">
                <div className="font-mono text-xs text-steel/40 mb-3">{p.step}</div>
                <h4 className="font-display text-lg text-bone mb-2 group-hover:text-steel transition-colors duration-300">{p.label}</h4>
                <p className="font-sans text-xs text-concrete/70 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
