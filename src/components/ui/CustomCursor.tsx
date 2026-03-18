"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1, ease: "none" });
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;
      gsap.set(follower, { x: followerX, y: followerY });
      requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => follower.classList.add("expanded");
    const onMouseLeaveLink = () => follower.classList.remove("expanded");

    document.addEventListener("mousemove", onMouseMove);
    animate();

    const links = document.querySelectorAll("a, button, [data-cursor-expand]");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={followerRef} className="cursor-follower hidden md:block" />
    </>
  );
}
