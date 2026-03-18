"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Line reveal
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        {
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Text stagger
      const textEls = textRef.current?.querySelectorAll(".animate-text");
      if (textEls) {
        gsap.fromTo(
          textEls,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Parallax on image
      gsap.to(imageRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48 bg-obsidian overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 blueprint-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-20">
          <span className="font-mono text-xs text-steel tracking-ultra-wide uppercase">
            01 — About
          </span>
          <div
            ref={lineRef}
            className="flex-1 h-px bg-steel/30 origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Portrait */}
          <div
            ref={imageRef}
            className="relative"
            style={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
          >
            {/* Architectural frame */}
            <div className="relative aspect-[3/4] overflow-hidden bg-graphite">
              {/* Silhouette / placeholder portrait */}
              <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
                {/* Generative architectural portrait */}
                <svg
                  viewBox="0 0 400 533"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="portraitGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#1a1a2e" />
                      <stop offset="100%" stopColor="#0A0A0A" />
                    </linearGradient>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1a2a4a" />
                      <stop offset="100%" stopColor="#0d1a2e" />
                    </linearGradient>
                  </defs>
                  {/* Sky */}
                  <rect width="400" height="533" fill="url(#skyGrad)" />
                  {/* Ground */}
                  <rect y="400" width="400" height="133" fill="#080808" />
                  {/* Moon */}
                  <circle
                    cx="320"
                    cy="80"
                    r="25"
                    fill="none"
                    stroke="#4A6FA5"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                  <circle
                    cx="320"
                    cy="80"
                    r="20"
                    fill="#1a2a3a"
                    opacity="0.8"
                  />
                  {/* Architect silhouette */}
                  <g opacity="0.9">
                    {/* Body */}
                    <ellipse cx="200" cy="350" rx="40" ry="50" fill="#0f1520" />
                    {/* Head */}
                    <circle cx="200" cy="270" r="28" fill="#151e2d" />
                    {/* Hair */}
                    <path
                      d="M172 262 Q200 238 228 262 Q220 245 200 242 Q180 245 172 262Z"
                      fill="#0a0f1a"
                    />
                    {/* Shoulder outline */}
                    <path
                      d="M155 355 Q180 320 200 315 Q220 320 245 355 Q240 360 200 362 Q160 360 155 355Z"
                      fill="#0a0f18"
                    />
                    {/* Face detail */}
                    <path
                      d="M188 278 Q200 275 212 278"
                      stroke="#4A6FA5"
                      strokeWidth="0.5"
                      fill="none"
                      opacity="0.5"
                    />
                  </g>
                  {/* Blueprint city behind */}
                  <g
                    opacity="0.5"
                    stroke="#4A6FA5"
                    strokeWidth="0.5"
                    fill="none"
                  >
                    {/* Buildings */}
                    <rect x="20" y="200" width="40" height="200" />
                    <rect x="70" y="250" width="30" height="150" />
                    <rect x="110" y="180" width="50" height="220" />
                    <rect x="300" y="220" width="35" height="180" />
                    <rect x="345" y="260" width="45" height="140" />
                    {/* Grid lines */}
                    <line x1="0" y1="400" x2="400" y2="400" />
                    <line x1="20" y1="0" x2="20" y2="400" opacity="0.3" />
                    <line x1="380" y1="0" x2="380" y2="400" opacity="0.3" />
                  </g>
                  {/* Steel blue glow at base */}
                  <ellipse
                    cx="200"
                    cy="410"
                    rx="120"
                    ry="20"
                    fill="#4A6FA5"
                    opacity="0.08"
                  />
                  {/* Name plate */}
                  <text
                    x="200"
                    y="490"
                    textAnchor="middle"
                    fontFamily="Georgia"
                    fontSize="11"
                    fill="#4A6FA5"
                    opacity="0.6"
                    letterSpacing="4"
                  >
                    Pradeep Mathangi
                  </text>
                  <text
                    x="200"
                    y="510"
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontSize="8"
                    fill="#8C8C8C"
                    opacity="0.5"
                    letterSpacing="2"
                  >
                    ARCHITECT
                  </text>
                </svg>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
            </div>

            {/* Decorative frame lines */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-l border-t border-steel/50" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b border-steel/50" />

            {/* Years badge */}
            <div className="absolute top-6 -right-4 md:-right-8 bg-obsidian border border-steel/30 px-4 py-3 text-center">
              <p className="font-display text-3xl text-steel font-light">6+</p>
              <p className="font-mono text-xs text-concrete tracking-wider mt-1">
                Years Study
              </p>
            </div>
          </div>

          {/* Text content */}
          <div ref={textRef} className="space-y-8">
            <h2 className="animate-text font-display text-4xl md:text-5xl lg:text-6xl font-light text-bone leading-tight">
              Where Structure Meets{" "}
              <span className="italic text-steel">Soul</span>
            </h2>

            <p className="animate-text font-sans text-base text-concrete leading-relaxed">
              I am Pradeep Mathangi, a graduate architect from the University of
              British Columbia School of Architecture. My practice exists at the
              intersection of structural rigor and human experience — designing
              spaces that feel as precise as they do profound.
            </p>

            <p className="animate-text font-sans text-base text-concrete leading-relaxed">
              Trained in both computational design and traditional
              draftsmanship, I approach each project as an act of translation:
              turning a client&apos;s vision into built form that resonates
              beyond function.
            </p>

            <div className="animate-text grid grid-cols-2 gap-6 pt-4">
              {[
                { label: "Specialization", value: "Residential + Commercial" },
                { label: "Location", value: "Vancouver, BC" },
                { label: "Software", value: "Revit, Rhino, V-Ray" },
                { label: "Philosophy", value: "Form follows feeling" },
              ].map((item) => (
                <div key={item.label} className="border-l border-steel/30 pl-4">
                  <p className="font-mono text-xs text-steel tracking-wider uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="font-sans text-sm text-bone">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="animate-text flex gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-steel text-bone text-xs tracking-widest uppercase px-6 py-3 hover:bg-bone hover:text-obsidian transition-all duration-400"
              >
                Work With Me
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 border border-white/20 text-bone text-xs tracking-widest uppercase px-6 py-3 hover:border-bone transition-all duration-400"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
