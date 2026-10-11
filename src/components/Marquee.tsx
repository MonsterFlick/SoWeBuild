"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  repeat?: number;
}

export default function Marquee({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
  repeat = 4,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    // Wait for render
    requestAnimationFrame(() => {
      const items = track.children;
      if (!items.length) return;

      const totalWidth = track.scrollWidth / repeat;
      const dur = totalWidth / speed;

      const tween = gsap.to(track, {
        x: direction === "left" ? -totalWidth : totalWidth,
        duration: dur,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: number) => {
            return direction === "left"
              ? ((parseFloat(String(x)) % totalWidth) + totalWidth) % totalWidth * -1
              : parseFloat(String(x)) % totalWidth;
          }),
        },
      });

      tweenRef.current = tween;

      // React to scroll velocity
      let scrollVelocity = 0;
      ScrollTrigger.create({
        onUpdate: (self) => {
          scrollVelocity = self.getVelocity();
          const speedMult = 1 + Math.abs(scrollVelocity) / 2000;
          gsap.to(tween, { timeScale: speedMult, duration: 0.3 });
        },
      });

      if (pauseOnHover) {
        container.addEventListener("mouseenter", () => {
          gsap.to(tween, { timeScale: 0.2, duration: 0.5 });
        });
        container.addEventListener("mouseleave", () => {
          gsap.to(tween, { timeScale: 1, duration: 0.5 });
        });
      }
    });

    return () => {
      tweenRef.current?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [speed, direction, pauseOnHover, repeat]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ overflow: "hidden", whiteSpace: "nowrap" }}
    >
      <div
        ref={trackRef}
        className="marquee-track"
        style={{
          display: "flex",
          gap: "2rem",
          width: "max-content",
        }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} style={{ display: "flex", gap: "2rem", flexShrink: 0 }}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
