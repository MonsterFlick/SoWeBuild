"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Discover",
    description:
      "Deep technical audit, architecture blueprint, and crystal-clear milestone specifications.",
    duration: "Week 1",
  },
  {
    num: "02",
    title: "Design",
    description:
      "Data schemas, API contracts, and design systems engineered for long-term scalability.",
    duration: "Week 1–2",
  },
  {
    num: "03",
    title: "Dev Server Build",
    description:
      "Dedicated preview server goes live. Real running code tested weekly on your mobile device.",
    duration: "Week 2–5",
  },
  {
    num: "04",
    title: "Launch",
    description:
      "Edge CDN routing, automated health monitoring, and sub-second performance delivery.",
    duration: "Week 5–6",
  },
  {
    num: "05",
    title: "Scale",
    description:
      "Continuous performance iteration, feature roadmap execution, and infrastructure scaling.",
    duration: "Ongoing",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;

    if (!section || !line) return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Animate SVG line drawing on scroll
    const lineLength =
      typeof line.getTotalLength === "function"
        ? line.getTotalLength()
        : section.clientHeight || 800;
    gsap.set(line, { strokeDasharray: lineLength, strokeDashoffset: lineLength });

    if (!isReducedMotion) {
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });
    }

    // Animate nodes
    const nodes = section.querySelectorAll(".process-node");
    nodes.forEach((node, i) => {
      gsap.fromTo(
        node,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: node,
            start: "top 75%",
            once: true,
          },
        }
      );
    });

    // Animate content
    const contents = section.querySelectorAll(".process-content");
    contents.forEach((content) => {
      gsap.fromTo(
        content,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: content,
            start: "top 80%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-padding"
      style={{
        background: "var(--color-bg)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div className="label" style={{ marginBottom: "1.5rem" }}>
            Our Process
          </div>
          <h2 className="heading-xl">
            Five phases from{" "}
            <span className="serif-accent">problem</span>
            <br />
            to production
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
          {/* SVG line */}
          <svg
            style={{
              position: "absolute",
              left: "22px",
              top: 0,
              width: "2px",
              height: "100%",
              overflow: "visible",
            }}
            className="hidden md:block"
          >
            <line
              ref={lineRef}
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="#c6ff3d"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Background line */}
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="#1a1a24"
              strokeWidth="2"
              style={{ zIndex: -1 }}
            />
          </svg>

          {/* Steps */}
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              style={{
                display: "flex",
                gap: "2.5rem",
                marginBottom: i < STEPS.length - 1 ? "4rem" : 0,
                alignItems: "flex-start",
              }}
            >
              {/* Node */}
              <div
                className="process-node"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "2px solid var(--color-accent)",
                  background: "var(--color-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--color-accent)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {step.num}
              </div>

              {/* Content */}
              <div className="process-content" style={{ flex: 1, paddingBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "0.75rem",
                    flexWrap: "wrap",
                  }}
                >
                  <h3 className="heading-sm">{step.title}</h3>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--color-accent)",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "var(--radius-full)",
                      border: "1px solid rgba(198, 255, 61, 0.2)",
                    }}
                  >
                    {step.duration}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    lineHeight: 1.7,
                    color: "var(--color-text-secondary)",
                    maxWidth: "540px",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
