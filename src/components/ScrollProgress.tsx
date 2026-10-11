"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    gsap.set(bar, { scaleX: 0 });
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "2px",
        background: "var(--color-accent)",
        transformOrigin: "left",
        zIndex: 101,
        transform: "scaleX(0)",
      }}
    />
  );
}
