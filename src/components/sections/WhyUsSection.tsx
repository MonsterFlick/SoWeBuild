"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpotlightCard from "../SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

const DIFFERENTIATORS = [
  {
    title: "Dedicated Dev Servers",
    description:
      "Live preview URL on day one. Test real running software on your mobile device, not static Figma mockups.",
    icon: "🖥️",
    span: "md:col-span-3",
  },
  {
    title: "Instant Prototypes",
    description:
      "Working code from week one. Continuous iterations delivered via weekly preview builds.",
    icon: "⚡",
    span: "md:col-span-3",
  },
  {
    title: "AI Built for ROI",
    description:
      "Autonomous AI agents and automation flows designed for actual operational margins.",
    icon: "🤖",
    span: "md:col-span-2",
  },
  {
    title: "Clean Ownership",
    description:
      "100% IP ownership. Clean Git repository, full documentation, zero vendor lock-in.",
    icon: "🔑",
    span: "md:col-span-2",
  },
  {
    title: "Direct Engineering",
    description:
      "Direct communication with the engineers writing your code. Zero account-manager telephone.",
    icon: "🎯",
    span: "md:col-span-2",
  },
];

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) {
      gsap.set([header, grid.children], { opacity: 1, y: 0 });
      return;
    }

    // Smooth header reveal
    gsap.fromTo(
      header,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          once: true,
        },
      }
    );

    // Natural staggered card reveal (no weird sticky overlap or scaling)
    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="section-padding"
      style={{
        background: "var(--color-surface)",
        position: "relative",
      }}
    >
      <div className="container-wide">
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            maxWidth: "720px",
            marginBottom: "3.5rem",
            opacity: 0,
          }}
        >
          <div className="label" style={{ marginBottom: "1.25rem" }}>
            Why SoWeBuild
          </div>
          <h2 className="heading-xl" style={{ marginBottom: "1.25rem" }}>
            We don&apos;t just{" "}
            <span className="serif-accent">build.</span>
            <br />
            We ship ownership.
          </h2>
          <p
            className="body-lg"
            style={{
              color: "var(--color-text-secondary)",
              lineHeight: 1.65,
              maxWidth: "520px",
            }}
          >
            Production codebases, continuous deployment pipelines, and zero vendor lock-in. Built to last.
          </p>
        </div>

        {/* Bento Grid (Clean, responsive, natural scroll) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-6 gap-6"
        >
          {DIFFERENTIATORS.map((item) => (
            <div key={item.title} className={`${item.span} opacity-0`}>
              <SpotlightCard className="h-full">
                <div
                  style={{
                    padding: "2.25rem 2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    minHeight: "190px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.35rem",
                        lineHeight: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "var(--radius-md)",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      {item.icon}
                    </span>
                    <h3 className="heading-sm" style={{ margin: 0 }}>
                      {item.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: "var(--color-text-secondary)",
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
