"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  "the solution.",
  "flagship websites.",
  "web applications.",
  "AI systems.",
  "WhatsApp bots.",
  "mobile apps.",
  "custom software.",
];

const wordVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(4px)",
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function HeroSection({ ready = true }: { ready?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // Deliverables word rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!ready) return;

    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const scrollHint = scrollHintRef.current;

    if (!section || !headline || !subtitle || !scrollHint) return;

    const tl = gsap.timeline();

    // Split headline into lines
    const lines = headline.querySelectorAll(".hero-line");
    lines.forEach((line) => {
      const inner = line.querySelector(".hero-line-inner");
      if (inner) {
        gsap.set(inner, { y: "110%" });
      }
    });

    tl.to(headline.querySelectorAll(".hero-line-inner"), {
      y: "0%",
      stagger: 0.12,
      duration: 1.2,
      ease: "power4.out",
    });

    tl.fromTo(
      subtitle,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
      "-=0.6"
    );

    tl.fromTo(
      scrollHint,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" },
      "-=0.3"
    );

    // Parallax on scroll
    gsap.to(headline, {
      y: -150,
      scale: 0.9,
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    setIsLoaded(true);

    return () => {
      tl.kill();
    };
  }, [ready]);

  // Mouse-reactive gradient background
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const xTo = gsap.quickTo(bg, "--gx", { duration: 1.5, ease: "power3.out" });
    const yTo = gsap.quickTo(bg, "--gy", { duration: 1.5, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      xTo(x);
      yTo(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        padding: "var(--space-gutter)",
      }}
    >
      {/* Interactive gradient background */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(
              ellipse 70% 50% at var(--gx, 50%) var(--gy, 50%),
              rgba(198, 255, 61, 0.035) 0%,
              transparent 65%
            ),
            var(--color-bg)
          `,
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1600px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Label */}
        <div
          className="label"
          style={{
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#c6ff3d",
              display: "inline-block",
            }}
          />
          Technology Development Studio
        </div>

        {/* Headline */}
        <div ref={headlineRef} style={{ userSelect: "none" }}>
          {/* Brand Studio Title */}
          <div className="hero-line" style={{ overflow: "hidden", display: "block" }}>
            <h1
              className="hero-line-inner heading-display"
              style={{
                display: "block",
                letterSpacing: "-0.04em",
                color: "var(--color-text)",
              }}
            >
              SoWeBuild<span style={{ color: "var(--color-accent)" }}>.</span>
            </h1>
          </div>

          {/* Changing Deliverable Animation */}
          <div
            className="hero-line"
            style={{
              overflow: "hidden",
              display: "block",
              marginTop: "clamp(0.2rem, 0.8vw, 0.5rem)",
            }}
          >
            <div
              className="hero-line-inner heading-display"
              style={{
                display: "flex",
                alignItems: "baseline",
                flexWrap: "wrap",
                color: "var(--color-accent)",
                lineHeight: 1,
              }}
            >
              <span
                style={{
                  display: "inline-grid",
                  gridTemplateAreas: "'stack'",
                  minWidth: "min(340px, 85vw)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={WORDS[wordIndex]}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{
                      gridArea: "stack",
                      whiteSpace: "nowrap",
                      willChange: "transform, opacity, filter",
                      color: "var(--color-accent)",
                    }}
                  >
                    {WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="body-lg"
          style={{
            maxWidth: "560px",
            marginTop: "2.25rem",
            opacity: 0,
            color: "var(--color-text-secondary)",
            lineHeight: 1.65,
          }}
        >
          We design and engineer bespoke web applications, flagship digital products, and automated software for ambitious brands worldwide.
        </p>

        {/* CTA */}
        <div style={{ marginTop: "2.75rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="#contact" className="btn-primary">
            <span>Start a project</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{ marginLeft: "0.25rem" }}
            >
              <path
                d="M3 8h10m0 0L9 4m4 4L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#work" className="btn-outline">
            <span>Explore selected work</span>
          </a>
        </div>

        {/* Studio Credential Strip */}
        <div
          style={{
            marginTop: "3.5rem",
            display: "flex",
            alignItems: "center",
            gap: "clamp(1.5rem, 3.5vw, 3.5rem)",
            flexWrap: "wrap",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          {[
            { val: "99.9%", lbl: "System Reliability" },
            { val: "100%", lbl: "Code & Design Ownership" },
            { val: "1-on-1", lbl: "Direct Senior Engineering" },
          ].map((stat) => (
            <div key={stat.lbl}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  lineHeight: 1.1,
                }}
              >
                {stat.val}
              </div>
              <div
                className="label"
                style={{
                  fontSize: "0.5625rem",
                  color: "var(--color-text-muted)",
                  marginTop: "0.25rem",
                }}
              >
                {stat.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0,
          zIndex: 2,
        }}
      >
        <span
          className="label"
          style={{ fontSize: "0.5625rem" }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "var(--color-border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "40%",
              background: "var(--color-accent)",
              animation: "scrollLine 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes wordSwap {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(250%); }
        }
      `}</style>
    </section>
  );
}
