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
  hidden: { opacity: 0, y: 14, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -14,
    filter: "blur(2px)",
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const },
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

  // Entrance animation — Instant visibility to ensure site never looks empty on start
  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const scrollHint = scrollHintRef.current;

    if (!section || !headline || !subtitle || !scrollHint) return;

    // Immediately present all core elements with zero blank delay
    gsap.set([subtitle, scrollHint], { opacity: 1, y: 0 });
    const inners = headline.querySelectorAll(".hero-line-inner");
    gsap.set(inners, { y: "0%", opacity: 1 });
    setIsLoaded(true);

    // Parallax on desktop scroll only (avoid scroll lag on phones)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let parallaxTween: gsap.core.Tween | null = null;
    if (!isTouch) {
      parallaxTween = gsap.to(headline, {
        y: -120,
        scale: 0.94,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }

    return () => {
      if (parallaxTween) {
        parallaxTween.kill();
        parallaxTween.scrollTrigger?.kill();
      }
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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-section"
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
              rgba(124, 58, 237, 0.055) 0%,
              transparent 65%
            ),
            var(--color-bg)
          `,
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <div
        className="w-full max-w-[1600px] mx-auto relative z-[2] flex flex-col items-center sm:items-start text-center sm:text-left"
      >
        {/* Label */}
        <div
          className="label mb-3 sm:mb-4 inline-flex items-center gap-2"
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--color-neon, #c6ff3d)",
              boxShadow: "0 0 8px rgba(198, 255, 61, 0.6)",
              display: "inline-block",
            }}
          />
          Technology Development Studio
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="w-full text-center sm:text-left" style={{ userSelect: "none" }}>
          {/* Brand Studio Title */}
          <div className="hero-line w-full text-center sm:text-left" style={{ overflow: "visible", display: "block" }}>
            <h1
              className="hero-line-inner heading-display text-center sm:text-left"
              style={{
                display: "block",
                letterSpacing: "-0.04em",
                color: "var(--color-text)",
                lineHeight: 0.98,
                margin: 0,
                padding: 0,
              }}
            >
              SoWeBuild<span style={{ color: "var(--color-neon, #c6ff3d)" }}>.</span>
            </h1>
          </div>

          {/* Changing Deliverable Animation (Tight, Natural Line Gap) */}
          <div
            className="hero-line w-full text-center sm:text-left"
            style={{
              overflow: "visible",
              display: "block",
              marginTop: "clamp(0.05rem, 0.4vw, 0.25rem)",
            }}
          >
            <div
              className="hero-line-inner heading-display flex items-baseline justify-center sm:justify-start flex-wrap w-full"
              style={{
                color: "var(--color-accent)",
                lineHeight: 0.98,
                margin: 0,
                padding: 0,
              }}
            >
              <span
                style={{
                  display: "inline-grid",
                  gridTemplateAreas: "'stack'",
                  overflow: "visible",
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
                      display: "inline-block",
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
          className="body-lg text-center sm:text-left mx-auto sm:mx-0 max-w-[560px] text-[#5A5068]"
          style={{
            marginTop: "clamp(0.875rem, 1.8vw, 1.5rem)",
            opacity: 1,
            lineHeight: 1.6,
          }}
        >
          We design and engineer bespoke web applications, flagship digital products, and automated software for ambitious brands worldwide.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
          <a href="#contact" className="btn-primary w-full sm:w-auto text-center justify-center">
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
          <a href="#work" className="btn-outline w-full sm:w-auto text-center justify-center">
            <span>Explore selected work</span>
          </a>
        </div>

        {/* Studio Credential Strip: Balanced 3-column grid across mobile */}
        <div
          className="w-full mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-[var(--color-border)] grid grid-cols-3 gap-2 sm:gap-8 text-center sm:text-left"
        >
          {[
            { val: "99.9%", lbl: "System Reliability" },
            { val: "100%", lbl: "Code Ownership" },
            { val: "1-on-1", lbl: "Senior Lead" },
          ].map((stat) => (
            <div key={stat.lbl} className="flex flex-col items-center sm:items-start">
              <div
                className="font-display text-base sm:text-xl font-bold text-[var(--color-text)] leading-tight"
              >
                {stat.val}
              </div>
              <div
                className="label text-[8px] sm:text-[10px] text-[var(--color-text-muted)] mt-1 tracking-tight sm:tracking-wider leading-tight"
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
        className="hidden lg:flex"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
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
