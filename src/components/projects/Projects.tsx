"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Meridian House",
    category: "Residential Design",
    year: "2024",
    location: "Vancouver, BC",
    description: "A family residence carved from concrete and glass — exploring the tension between shelter and openness. Natural light choreographed through seasonal sun angles.",
    tags: ["Concrete", "Passive Solar", "5,200 sqft"],
    color: "#4A6FA5",
  },
  {
    id: "02",
    title: "The Foundry",
    category: "Commercial Space",
    year: "2023",
    location: "Seattle, WA",
    description: "Industrial heritage reborn as a creative workspace. Exposed steel bones celebrate the building's past while new glass volumes pierce the original façade.",
    tags: ["Adaptive Reuse", "Mixed-Use", "32,000 sqft"],
    color: "#8B6F47",
  },
  {
    id: "03",
    title: "Canopy District",
    category: "Urban Planning",
    year: "2023",
    location: "Portland, OR",
    description: "A masterplan for a walkable micro-district weaving green infrastructure with high-density living. 40% green coverage. Zero net carbon target.",
    tags: ["Urban Design", "Biophilic", "12 Acres"],
    color: "#5a7a5a",
  },
  {
    id: "04",
    title: "Veil Interior",
    category: "Interior Design",
    year: "2024",
    location: "Toronto, ON",
    description: "A private penthouse conceived as a series of layered planes — screens, surfaces, and light that shift the spatial perception hour by hour.",
    tags: ["Residential Interior", "Parametric", "4,800 sqft"],
    color: "#9a8a6a",
  },
  {
    id: "05",
    title: "Threshold Pavilion",
    category: "Installation / Conceptual",
    year: "2024",
    location: "Exhibited — Venice",
    description: "An academic investigation into liminal architecture: a pavilion of threshold moments that questions where inside ends and outside begins.",
    tags: ["Conceptual", "Exhibition", "Award Winner"],
    color: "#4A6FA5",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!section || !track || !container) return;

    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        ".projects-title",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      // Horizontal scroll
      const totalWidth = track.scrollWidth - container.offsetWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth + window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Card entrances on horizontal scroll
      const cards = track.querySelectorAll(".project-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.92, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: `top+=${i * 150} top`,
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative bg-graphite overflow-hidden">
      <div className="absolute inset-0 blueprint-bg opacity-20 pointer-events-none" />

      {/* Sticky inner content */}
      <div ref={containerRef} className="relative h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="projects-title opacity-0 flex items-end justify-between px-6 md:px-16 mb-12">
          <div>
            <p className="font-mono text-xs text-steel tracking-ultra-wide uppercase mb-3">02 — Selected Work</p>
            <h2 className="font-display text-4xl md:text-6xl font-light text-bone">
              Projects
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-concrete text-sm font-mono">
            <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Scroll to explore
          </div>
        </div>

        {/* Cards track */}
        <div
          ref={trackRef}
          className="horizontal-scroll-container items-stretch px-6 md:px-16 gap-6"
          style={{ paddingRight: "8rem" }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card flex-none w-[85vw] sm:w-[65vw] md:w-[45vw] lg:w-[38vw] group relative"
              data-cursor-expand
            >
              <div className="relative h-[55vh] min-h-[400px] bg-obsidian overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-700">
                {/* Project visual — SVG architectural render */}
                <div className="absolute inset-0">
                  <ProjectVisual id={project.id} color={project.color} />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 to-transparent" />

                {/* Number */}
                <div className="absolute top-6 right-6 font-mono text-xs text-white/20">{project.id}</div>

                {/* Category tag */}
                <div className="absolute top-6 left-6">
                  <span
                    className="font-mono text-xs tracking-widest uppercase px-3 py-1.5 border"
                    style={{ color: project.color, borderColor: `${project.color}40` }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-display text-3xl md:text-4xl font-light text-bone mb-3 group-hover:text-steel transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="font-sans text-sm text-concrete/80 leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 flex-wrap">
                      {project.tags.map((tag) => (
                        <span key={tag} className="font-mono text-xs text-concrete/60 bg-white/5 px-2 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs text-concrete/50">{project.year}</p>
                      <p className="font-mono text-xs text-concrete/40">{project.location}</p>
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <div className="mt-5 flex items-center gap-2 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0"
                    style={{ color: project.color }}>
                    <span>View Project</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* End card — CTA */}
          <div className="project-card flex-none w-72 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 border border-steel/30 flex items-center justify-center mx-auto mb-6 rotate-45">
                <svg className="-rotate-45 w-6 h-6 text-steel" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="font-display text-2xl text-bone mb-4">Have a project?</p>
              <p className="font-sans text-sm text-concrete mb-6">Let&apos;s create something remarkable together.</p>
              <a
                href="#contact"
                className="inline-block border border-steel text-steel text-xs tracking-widest uppercase px-6 py-3 hover:bg-steel hover:text-bone transition-all duration-400"
              >
                Start Conversation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Inline SVG architectural project visuals
function ProjectVisual({ id, color }: { id: string; color: string }) {
  const visuals: Record<string, React.ReactNode> = {
    "01": (
      <svg viewBox="0 0 500 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg01" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d1520" />
            <stop offset="100%" stopColor="#080d14" />
          </linearGradient>
        </defs>
        <rect width="500" height="400" fill="url(#bg01)" />
        {/* Sky gradient */}
        <rect width="500" height="220" fill="#0d1828" opacity="0.5" />
        {/* Ground */}
        <rect y="310" width="500" height="90" fill="#060a0e" />
        {/* Main house - horizontal concrete box */}
        <rect x="60" y="160" width="380" height="150" fill="#111820" stroke={color} strokeWidth="0.5" />
        {/* Roof overhang */}
        <rect x="40" y="150" width="420" height="15" fill="#0e1520" />
        {/* Large glass panels */}
        <rect x="80" y="175" width="80" height="100" fill={color} opacity="0.15" stroke={color} strokeWidth="0.5" />
        <rect x="170" y="175" width="120" height="100" fill={color} opacity="0.2" stroke={color} strokeWidth="0.5" />
        <rect x="300" y="175" width="100" height="100" fill={color} opacity="0.12" stroke={color} strokeWidth="0.5" />
        {/* Vertical structural fins */}
        {[80, 160, 240, 300, 400].map((x, i) => (
          <line key={i} x1={x} y1="150" x2={x} y2="310" stroke={color} strokeWidth="0.3" opacity="0.3" />
        ))}
        {/* Trees */}
        {[30, 460].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="280" x2={x} y2="310" stroke="#1a2a1a" strokeWidth="2" />
            <ellipse cx={x} cy="260" rx="18" ry="25" fill="#0a150a" />
          </g>
        ))}
        {/* Reflection */}
        <rect x="60" y="310" width="380" height="30" fill={color} opacity="0.04" />
        {/* Blueprint grid overlay */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={i * 70} y1="0" x2={i * 70} y2="400" stroke={color} strokeWidth="0.15" opacity="0.15" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 70} x2="500" y2={i * 70} stroke={color} strokeWidth="0.15" opacity="0.15" />
        ))}
      </svg>
    ),
    "02": (
      <svg viewBox="0 0 500 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="400" fill="#0a0c0e" />
        {/* Industrial building base */}
        <rect x="50" y="100" width="400" height="240" fill="#0f1214" stroke="#8B6F47" strokeWidth="0.5" />
        {/* Steel structure */}
        {[50, 130, 210, 290, 370, 450].map((x, i) => (
          <line key={i} x1={x} y1="100" x2={x} y2="340" stroke="#8B6F47" strokeWidth="1" opacity="0.4" />
        ))}
        {[100, 150, 200, 250, 300].map((y, i) => (
          <line key={i} x1="50" y1={y} x2="450" y2={y} stroke="#8B6F47" strokeWidth="0.5" opacity="0.3" />
        ))}
        {/* Glass insertion */}
        <rect x="130" y="130" width="240" height="150" fill="#8B6F47" opacity="0.12" stroke="#8B6F47" strokeWidth="0.8" />
        {/* Industrial details */}
        <rect x="50" y="95" width="400" height="10" fill="#1a1410" />
        <rect x="155" y="280" width="60" height="60" fill="#0a0c0e" stroke="#8B6F47" strokeWidth="0.5" opacity="0.5" />
        <circle cx="400" cy="160" r="20" fill="none" stroke="#8B6F47" strokeWidth="1" opacity="0.4" />
        <circle cx="400" cy="160" r="8" fill="#8B6F47" opacity="0.3" />
        {/* Ground */}
        <rect y="340" width="500" height="60" fill="#06080a" />
      </svg>
    ),
    "03": (
      <svg viewBox="0 0 500 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="400" fill="#080e08" />
        {/* Urban grid */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1={i * 100} y1="0" x2={i * 100} y2="400" stroke="#5a7a5a" strokeWidth="0.3" opacity="0.4" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 100} x2="500" y2={i * 100} stroke="#5a7a5a" strokeWidth="0.3" opacity="0.4" />
        ))}
        {/* Blocks */}
        {[
          [10, 10, 80, 80], [100, 10, 90, 80], [200, 10, 90, 80], [300, 10, 90, 80], [400, 10, 90, 80],
          [10, 100, 80, 90], [200, 100, 190, 90], [400, 100, 90, 90],
          [10, 200, 90, 90], [110, 200, 80, 90], [300, 200, 190, 90],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="#0d1a0d" stroke="#5a7a5a" strokeWidth="0.5" opacity="0.7" />
        ))}
        {/* Green canopy circles */}
        {[[100, 200], [300, 100], [150, 310], [380, 280]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="30" fill="#5a7a5a" opacity="0.2" />
        ))}
        {/* Highlight path */}
        <path d="M0 200 Q125 180 250 200 Q375 220 500 200" stroke="#5a7a5a" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="5 5" />
      </svg>
    ),
    "04": (
      <svg viewBox="0 0 500 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="400" fill="#0e0c0a" />
        {/* Interior planes */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={40 + i * 40} y={40 + i * 20} width={420 - i * 80} height={320 - i * 40}
            fill="none" stroke="#9a8a6a" strokeWidth="0.4" opacity={0.6 - i * 0.1} />
        ))}
        {/* Feature wall */}
        <rect x="80" y="80" width="180" height="240" fill="#12100d" stroke="#9a8a6a" strokeWidth="0.8" />
        {/* Light strips */}
        {[100, 130, 160, 190, 220].map((y, i) => (
          <line key={i} x1="80" y1={y} x2="260" y2={y} stroke="#9a8a6a" strokeWidth="0.5" opacity="0.4" />
        ))}
        {/* Furniture suggestion */}
        <rect x="290" y="200" width="160" height="80" fill="#0f0d0a" stroke="#9a8a6a" strokeWidth="0.5" opacity="0.6" />
        <rect x="310" y="220" width="60" height="40" fill="#9a8a6a" opacity="0.1" />
        {/* Ceiling planes */}
        <polygon points="40,40 460,40 420,120 80,120" fill="#100e0c" stroke="#9a8a6a" strokeWidth="0.5" opacity="0.4" />
      </svg>
    ),
    "05": (
      <svg viewBox="0 0 500 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glow05" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4A6FA5" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#4A6FA5" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="500" height="400" fill="#08090d" />
        <circle cx="250" cy="200" r="180" fill="url(#glow05)" />
        {/* Pavilion threshold structure */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x1 = 250 + Math.cos(angle) * 60;
          const y1 = 200 + Math.sin(angle) * 60;
          const x2 = 250 + Math.cos(angle) * 170;
          const y2 = 200 + Math.sin(angle) * 170;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4A6FA5" strokeWidth="0.6" opacity="0.5" />;
        })}
        {[40, 80, 120, 160].map((r, i) => (
          <circle key={i} cx="250" cy="200" r={r} fill="none" stroke="#4A6FA5" strokeWidth="0.5" opacity={0.5 - i * 0.08} />
        ))}
        {/* Central threshold */}
        <rect x="220" y="120" width="60" height="160" fill="none" stroke="#4A6FA5" strokeWidth="1" opacity="0.7" />
        <rect x="230" y="110" width="40" height="180" fill="#4A6FA5" opacity="0.05" />
        {/* Ground circle */}
        <ellipse cx="250" cy="350" rx="120" ry="15" fill="#4A6FA5" opacity="0.04" />
      </svg>
    ),
  };

  return <>{visuals[id] || visuals["01"]}</>;
}
