"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const counter = counterRef.current;
    const wordmark = wordmarkRef.current;
    const curtain = curtainRef.current;

    if (!container || !counter || !wordmark || !curtain) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Counter from 0 to 100
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: function () {
          setCount(Math.round(this.targets()[0].val));
        },
      }
    );

    // Reveal wordmark
    tl.fromTo(
      wordmark.querySelectorAll(".preloader-letter"),
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        stagger: 0.03,
        duration: 0.5,
        ease: "power4.out",
      },
      0.6
    );

    // Curtain wipe
    tl.to(
      curtain,
      {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      },
      1.4
    );

    tl.to(
      container,
      {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      },
      1.4
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
          bottom: "3rem",
          right: "3rem",
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(0.875rem, 1vw, 1rem)",
          color: "#8a8a99",
          letterSpacing: "0.1em",
        }}
      >
        <span ref={counterRef}>{String(count).padStart(3, "0")}</span>
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
          background: "#1a1a24",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "#c6ff3d",
            width: `${count}%`,
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* Wordmark */}
      <div
        ref={wordmarkRef}
        style={{
          display: "flex",
          overflow: "hidden",
        }}
      >
        {wordmarkLetters.map((letter, i) => (
          <span
            key={i}
            className="preloader-letter"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 6vw, 5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#f3efe6",
              transform: "translateY(110%)",
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: "1rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.6875rem",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "#55555f",
        }}
      >
        DEVELOPMENT STUDIO
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
