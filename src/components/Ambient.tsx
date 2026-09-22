"use client";

import { useEffect, useRef, useState } from "react";

/** Cursor-reactive ambient light. Active only on fine pointers (desktop mouse). */
export function CursorLight() {
  const ref = useRef<HTMLDivElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    setIsFinePointer(isFine);
    if (!isFine) return;

    let frameId: number;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (!ref.current) return;
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        ref.current.style.background = `radial-gradient(550px 550px at ${x.toFixed(1)}% ${y.toFixed(1)}%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)`;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  if (!isFinePointer) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 will-change-[background]"
      style={{
        background: `radial-gradient(550px 550px at 50% 35%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)`,
      }}
    />
  );
}

export function Starfield() {
  // 24 optimized, GPU-accelerated stars
  const dots = Array.from({ length: 24 }, (_, i) => ({
    left: ((i * 41) % 96) + 2,
    top: ((i * 59) % 94) + 3,
    s: (i % 3) * 0.5 + 1.2,
    d: 7 + (i % 5) * 1.8,
  }));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-40">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary-glow"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.s,
            height: d.s,
            animation: `drift ${d.d}s ${i * 0.2}s infinite`,
            transform: "translate3d(0,0,0)",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
