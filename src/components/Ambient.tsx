"use client";

import { useEffect, useRef } from "react";

/** Cursor-reactive ambient light. Purely decorative. */
export function CursorLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (!ref.current) return;
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        ref.current.style.background = `radial-gradient(600px 600px at ${x}% ${y}%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-[background] duration-300"
      style={{
        background: `radial-gradient(600px 600px at 50% 35%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)`,
      }}
    />
  );
}

export function Starfield() {
  const dots = Array.from({ length: 46 }, (_, i) => ({
    left: ((i * 37) % 100) + (i % 3),
    top: ((i * 53) % 100) + (i % 5),
    s: (i % 4) * 0.4 + 1,
    d: 6 + (i % 7) * 1.6,
  }));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-50">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary-glow"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.s,
            height: d.s,
            animation: `drift ${d.d}s ${i * 0.13}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
