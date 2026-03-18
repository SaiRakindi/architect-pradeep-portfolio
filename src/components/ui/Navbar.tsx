"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.2, delay: 2.5, ease: "power3.out" }
    );

    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const win = window as typeof window & {
        lenis?: { scrollTo: (el: Element, opts: object) => void };
      };
      if (win.lenis) {
        win.lenis.scrollTo(el, { offset: -80, duration: 2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-700 opacity-0 ${
        scrolled
          ? "bg-obsidian/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick("#");
        }}
        className="font-display text-xl tracking-wider text-bone hover:text-steel transition-colors"
      >
        PRADEEP<span className="text-steel">.</span>MATHANGI
      </a>

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <li key={link.label}>
            <button
              onClick={() => handleNavClick(link.href)}
              className="font-sans text-xs tracking-widest uppercase text-concrete hover:text-bone transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-steel group-hover:w-full transition-all duration-500" />
            </button>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick("#contact");
        }}
        className="hidden md:flex items-center gap-2 border border-steel/50 text-steel text-xs tracking-widest uppercase px-6 py-2.5 hover:bg-steel hover:text-bone transition-all duration-400"
      >
        Hire Me
      </a>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-px bg-bone transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-4 h-px bg-bone transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-px bg-bone transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-obsidian z-40 flex flex-col justify-center items-center gap-10 transition-all duration-700 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link, i) => (
          <button
            key={link.label}
            onClick={() => handleNavClick(link.href)}
            className="font-display text-4xl text-bone hover:text-steel transition-colors"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {link.label}
          </button>
        ))}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#contact");
          }}
          className="mt-4 border border-steel text-steel text-sm tracking-widest uppercase px-8 py-3"
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}
