"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-obsidian border-t border-white/5 py-12 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <p className="font-display text-2xl text-bone tracking-wider">
              ARIA<span className="text-steel">.</span>SOLANO
            </p>
            <p className="font-mono text-xs text-concrete/50 tracking-wider mt-1">
              Graduate Architect — Vancouver, BC
            </p>
          </div>

          {/* Center links */}
          <div className="flex justify-center gap-8">
            {["About", "Projects", "Services", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-mono text-xs text-concrete/50 hover:text-bone tracking-wider uppercase transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="text-right">
            <p className="font-mono text-xs text-concrete/40 tracking-wider">
              © {year} Aria Solano. All rights reserved.
            </p>
            <p className="font-mono text-xs text-concrete/30 mt-1">
              Designed & built with precision.
            </p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500/80 rounded-full animate-pulse" />
            <span className="font-mono text-xs text-concrete/40">Available for projects</span>
          </div>
          <p className="font-mono text-xs text-concrete/25">
            Built with Next.js · TypeScript · GSAP · Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
