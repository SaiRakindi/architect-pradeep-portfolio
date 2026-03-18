"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".contact-left",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-grid", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".contact-right",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-grid", start: "top 85%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full bg-transparent border-b py-3 font-sans text-sm text-bone placeholder-concrete/40 outline-none transition-all duration-400 ${
      focused === field ? "border-steel" : "border-white/15"
    }`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-48 bg-graphite overflow-hidden"
    >
      <div className="absolute inset-0 blueprint-bg opacity-15 pointer-events-none" />

      {/* Large bg text */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 font-display text-[20vw] font-light text-white/2 select-none pointer-events-none leading-none opacity-[0.1]">
        HELLO
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        {/* Header */}
        <div className="contact-title opacity-0 mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-steel tracking-ultra-wide uppercase">
              06 — Contact
            </span>
            <div className="flex-1 h-px bg-steel/20" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-bone">
            Let&apos;s Build
            <br />
            <span className="italic text-steel">Something</span>
            <br />
            Remarkable
          </h2>
        </div>

        <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — info */}
          <div className="contact-left opacity-0 space-y-12">
            <p className="font-sans text-base text-concrete leading-relaxed max-w-md">
              Whether you have a specific project in mind or just want to
              explore possibilities — I&apos;m always open to a conversation
              about great architecture.
            </p>

            {/* Contact details */}
            <div className="space-y-6">
              {[
                {
                  label: "Email",
                  value: "pradeep@architects.com",
                  href: "mailto:pradeep@architects.com",
                },
                {
                  label: "Phone",
                  value: "+1 (604) 555-0192",
                  href: "tel:+16045550192",
                },
                { label: "Studio", value: "Vancouver, BC, Canada", href: "#" },
              ].map((item) => (
                <div key={item.label} className="group">
                  <p className="font-mono text-xs text-steel/60 tracking-wider uppercase mb-1">
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    className="font-sans text-base text-bone group-hover:text-steel transition-colors duration-300"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-3 border border-white/10 px-5 py-3">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-xs text-concrete tracking-wider">
                Available for 2025 Projects
              </span>
            </div>

            {/* Social */}
            <div className="flex gap-6">
              {["LinkedIn", "Instagram", "Behance", "ISSUU"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-mono text-xs text-concrete/50 hover:text-bone tracking-wider uppercase transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="border-l-2 border-steel/40 pl-5">
              <p className="font-display text-xl italic text-concrete/70 leading-relaxed">
                &ldquo;Architecture begins where engineering ends.&rdquo;
              </p>
              <cite className="font-mono text-xs text-concrete/40 mt-2 block">
                — Walter Gropius
              </cite>
            </blockquote>
          </div>

          {/* Right — form */}
          <div className="contact-right opacity-0">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 border border-steel/40 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-6 h-6 text-steel"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-3xl text-bone mb-3">
                  Message Received
                </h3>
                <p className="font-sans text-concrete text-sm leading-relaxed max-w-xs">
                  Thank you for reaching out. I&apos;ll review your project and
                  respond within 48 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 font-mono text-xs text-steel/60 hover:text-steel tracking-wider uppercase transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-xs text-steel/60 tracking-wider uppercase block mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={inputClass("name")}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-steel/60 tracking-wider uppercase block mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={inputClass("email")}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-xs text-steel/60 tracking-wider uppercase block mb-2">
                      Project Type
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          projectType: e.target.value,
                        })
                      }
                      onFocus={() => setFocused("type")}
                      onBlur={() => setFocused(null)}
                      className={`${inputClass("type")} cursor-pointer`}
                    >
                      <option value="" className="bg-graphite">
                        Select type
                      </option>
                      <option value="residential" className="bg-graphite">
                        Residential
                      </option>
                      <option value="commercial" className="bg-graphite">
                        Commercial
                      </option>
                      <option value="urban" className="bg-graphite">
                        Urban / Masterplan
                      </option>
                      <option value="interior" className="bg-graphite">
                        Interior Design
                      </option>
                      <option value="consultation" className="bg-graphite">
                        Consultation
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-xs text-steel/60 tracking-wider uppercase block mb-2">
                      Budget Range
                    </label>
                    <select
                      value={formState.budget}
                      onChange={(e) =>
                        setFormState({ ...formState, budget: e.target.value })
                      }
                      onFocus={() => setFocused("budget")}
                      onBlur={() => setFocused(null)}
                      className={`${inputClass("budget")} cursor-pointer`}
                    >
                      <option value="" className="bg-graphite">
                        Select range
                      </option>
                      <option value="under50k" className="bg-graphite">
                        Under $50K
                      </option>
                      <option value="50-150k" className="bg-graphite">
                        $50K – $150K
                      </option>
                      <option value="150-500k" className="bg-graphite">
                        $150K – $500K
                      </option>
                      <option value="500k+" className="bg-graphite">
                        $500K+
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-steel/60 tracking-wider uppercase block mb-2">
                    Tell Me About Your Project
                  </label>
                  <textarea
                    placeholder="Describe your vision, site, timeline, and any specific requirements..."
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    rows={5}
                    className={`${inputClass("message")} resize-none`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-3 bg-steel text-bone font-sans text-xs tracking-widest uppercase py-4 hover:bg-bone hover:text-obsidian transition-all duration-500"
                >
                  <span>Send Message</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>

                <p className="font-mono text-xs text-concrete/40 text-center">
                  I respond to all enquiries within 48 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
