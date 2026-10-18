"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const counter = counterRef.current;
    const progressFill = progressFillRef.current;
    const wordmark = wordmarkRef.current;
    const tagline = taglineRef.current;
    const curtain = curtainRef.current;

    if (!container || !counter || !progressFill || !wordmark || !curtain) return;

    const duration = 1.35;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Counter count-up from 000 to 100 + bottom hairline progress bar
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: duration,
        ease: "power2.inOut",
        onUpdate: function () {
          const v = Math.round(this.targets()[0].val);
          counter.textContent = String(v).padStart(3, "0");
          progressFill.style.width = `${v}%`;
        },
      }
    );

    // 2. Dramatic staggered reveal of SOWEBUILD wordmark
    tl.fromTo(
      wordmark.querySelectorAll(".preloader-letter"),
      { y: "115%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        stagger: 0.035,
        duration: 0.6,
        ease: "power4.out",
      },
      duration * 0.3
    );

    // 3. Studio tagline fade & slide up
    if (tagline) {
      tl.fromTo(
        tagline,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        duration * 0.6
      );
    }

    // 4. Smooth curtain wipe upward revealing the site
    tl.to(
      curtain,
      {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      },
      duration + 0.15
    );

    tl.to(
      container,
      {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      },
      duration + 0.15
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const wordmarkLetters = "SOWEBUILD".split("");

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#07070a",
      }}
    >
      {/* Counter */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(2rem, 4vw, 3rem)",
          right: "clamp(1.5rem, 4vw, 3rem)",
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(0.875rem, 1vw, 1rem)",
          color: "#8a8a99",
          letterSpacing: "0.1em",
        }}
      >
        <span ref={counterRef}>000</span>
        <span style={{ color: "#55555f" }}> / 100</span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "2px",
          background: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <div
          ref={progressFillRef}
          style={{
            height: "100%",
            background: "var(--color-accent)",
            boxShadow: "0 0 12px var(--color-accent)",
            width: "0%",
          }}
        />
      </div>

      {/* Wordmark */}
      <div
        ref={wordmarkRef}
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          overflow: "hidden",
          maxWidth: "100%",
          padding: "0 1rem",
        }}
      >
        {wordmarkLetters.map((letter, i) => (
          <span
            key={i}
            className="preloader-letter"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 7.5vw, 5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#f3efe6",
              transform: "translateY(115%)",
            }}
          >
            {letter}
          </span>
        ))}
        <span
          className="preloader-letter"
          style={{
            display: "inline-block",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 7.5vw, 5rem)",
            fontWeight: 800,
            color: "var(--color-accent)",
            transform: "translateY(115%)",
          }}
        >
          .
        </span>
      </div>

      {/* Tagline */}
      <div
        ref={taglineRef}
        style={{
          marginTop: "0.75rem",
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(0.625rem, 0.8vw, 0.75rem)",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "#8a8a99",
          opacity: 0,
        }}
      >
        Technology Development Studio
      </div>

      {/* Curtain */}
      <div
        ref={curtainRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#07070a",
          zIndex: -1,
        }}
      />
    </div>
  );
}
