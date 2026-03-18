"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: string;
  start?: string;
  stagger?: number;
}

export function useScrollAnimation(
  selector: string,
  options: UseScrollAnimationOptions = {}
) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        options.from ?? { y: 40, opacity: 0 },
        {
          ...(options.to ?? { y: 0, opacity: 1, duration: 1, ease: "power3.out" }),
          stagger: options.stagger ?? 0.1,
          scrollTrigger: {
            trigger: container,
            start: options.start ?? "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [selector, options]);

  return containerRef;
}
